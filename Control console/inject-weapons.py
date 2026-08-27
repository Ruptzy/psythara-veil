# -*- coding: utf-8 -*-
"""
Inject the weapons defined in weapons-src.js into the console.

    python "Control console/inject-weapons.py"

Idempotent: re-running replaces the injected block rather than appending,
so you can edit weapons-src.js and re-run all day.

What it writes into psythara-operative-console.html:
  - a MECH entry per weapon (role, rar, atk, dmg, dtype, rng, hands, sp)
  - a BOOK page per weapon, art embedded as WebP (900px long edge, q88)
  - each id appended to WEAPON_IDS
  - MY_FAULTS rows for any rar:5 weapon (the boot audit requires 4 faults)

It validates against the rarity ladder first and refuses to write if
anything is out of band.
"""
import base64, io, json, os, re, sys, shutil

HERE     = os.path.dirname(os.path.abspath(__file__))
CONSOLE  = os.path.join(HERE, 'psythara-operative-console.html')
SRC      = os.path.join(HERE, 'weapons-src.js')
ART_DIR  = os.path.join(os.path.expanduser('~'), 'Desktop', 'Dnd Weapon Design')

LONG_EDGE, QUALITY = 900, 88
BAND  = {1: 5.3, 2: 8.4, 3: 13.5, 4: 21.6, 5: 34.5}
CEIL  = {1: 16, 2: 24, 3: 34, 4: 56, 5: 999}
FIRST_ID = 69          # ids below this belong to the original catalog


# ----------------------------------------------------------------- parsing
class JSParse:
    """Minimal reader for the object-literal subset weapons-src.js uses:
    comments, single/double quoted strings, 'a'+'b' concatenation,
    unquoted keys, arrays, objects, numbers."""

    def __init__(self, t):
        self.t, self.i = t, 0

    def ws(self):
        while self.i < len(self.t):
            c = self.t[self.i]
            if c in ' \t\r\n':
                self.i += 1
            elif self.t.startswith('/*', self.i):
                e = self.t.find('*/', self.i + 2)
                self.i = len(self.t) if e < 0 else e + 2
            elif self.t.startswith('//', self.i):
                e = self.t.find('\n', self.i)
                self.i = len(self.t) if e < 0 else e + 1
            else:
                return

    def string(self):
        q = self.t[self.i]; self.i += 1
        out = []
        while self.i < len(self.t):
            c = self.t[self.i]
            if c == '\\':
                nxt = self.t[self.i + 1]
                out.append({'n': '\n', 't': '\t', "'": "'", '"': '"',
                            '\\': '\\'}.get(nxt, nxt))
                self.i += 2
            elif c == q:
                self.i += 1
                return ''.join(out)
            else:
                out.append(c); self.i += 1
        raise ValueError('unterminated string')

    def value(self):
        self.ws()
        c = self.t[self.i]
        if c in '"\'':
            s = self.string()
            while True:                      # 'a' + 'b' concatenation
                save = self.i
                self.ws()
                if self.i < len(self.t) and self.t[self.i] == '+':
                    self.i += 1; self.ws()
                    if self.t[self.i] in '"\'':
                        s += self.string(); continue
                self.i = save
                return s
        if c == '[':
            self.i += 1; arr = []
            while True:
                self.ws()
                if self.t[self.i] == ']':
                    self.i += 1; return arr
                arr.append(self.value()); self.ws()
                if self.t[self.i] == ',':
                    self.i += 1
        if c == '{':
            self.i += 1; obj = {}
            while True:
                self.ws()
                if self.t[self.i] == '}':
                    self.i += 1; return obj
                if self.t[self.i] in '"\'':
                    k = self.string()
                else:
                    m = re.match(r'[A-Za-z_$][\w$]*', self.t[self.i:])
                    k = m.group(0); self.i += len(k)
                self.ws()
                assert self.t[self.i] == ':', 'expected : after key %r' % k
                self.i += 1
                obj[k] = self.value(); self.ws()
                if self.t[self.i] == ',':
                    self.i += 1
        m = re.match(r'-?\d+(?:\.\d+)?', self.t[self.i:])
        if m:
            self.i += len(m.group(0))
            return float(m.group(0)) if '.' in m.group(0) else int(m.group(0))
        for lit, val in (('true', True), ('false', False), ('null', None)):
            if self.t.startswith(lit, self.i):
                self.i += len(lit); return val
        raise ValueError('unparseable at %d: %r' % (self.i, self.t[self.i:self.i + 40]))


def load_src():
    t = open(SRC, encoding='utf-8').read()
    i = t.index('NEW_WEAPONS')
    i = t.index('[', i)
    p = JSParse(t); p.i = i
    return p.value()


# ------------------------------------------------------------- validation
def avg(x):
    tot = 0.0
    for n, d in re.findall(r'(\d+)d(\d+)', str(x)):
        tot += int(n) * (int(d) + 1) / 2.0
    for f in re.findall(r'\+\s*(\d+)(?!\d*d)', str(x)):
        tot += int(f)
    return tot


def baked_plates():
    """id -> the data: URI already sitting in the console, if any.

    Lets either machine re-run the injector for a numbers-only change: the
    art is already embedded, so the source PNG is only needed the first time
    a weapon is added, or when its art actually changes."""
    try:
        html = open(CONSOLE, encoding='utf-8').read()
    except OSError:
        return {}
    return {int(m.group(1)): m.group(2)
            for m in re.finditer(r'\{"k": "item", "n": (\d+),.{0,400}?"img": "(data:[^"]+)"', html, re.S)}


def validate(ws, baked=None):
    baked = baked or {}
    problems, seen = [], set()
    for w in ws:
        nm, rar = w['name'], int(w['rar'])
        if w['id'] in seen:
            problems.append('%s: duplicate id %s' % (nm, w['id']))
        seen.add(w['id'])
        if w['id'] < FIRST_ID:
            problems.append('%s: id %d collides with the original catalog'
                            % (nm, w['id']))
        if not os.path.exists(os.path.join(ART_DIR, w['art'])):
            if w['id'] not in baked:
                problems.append('%s: art not found and no plate in the console -- %s'
                                % (nm, w['art']))
        if not w.get('offScale') and w.get('dmg'):
            mult = 0.85 if w.get('pen') else 0.65
            eff = avg(w['dmg']) * int(w.get('shots', 1)) * mult
            lo, hi = BAND[rar] * 0.55, BAND[rar] * 1.6
            if not (lo <= eff <= hi):
                problems.append('%s: %.1f effective, *%d band is %.1f-%.1f'
                                % (nm, eff, rar, lo, hi))
        for sp in w.get('sp', []):
            dmg = sp.get('dmg') or (sp.get('save') or {}).get('dmg')
            if not dmg:
                continue
            raw = avg(dmg) * int(sp.get('shots', 1))
            if raw > CEIL[rar]:
                problems.append('%s: special "%s" raw %.0f > *%d ceiling %d'
                                % (nm, sp['n'], raw, rar, CEIL[rar]))
        if rar == 5 and len(w.get('faults', [])) != 4:
            problems.append('%s: rar 5 needs exactly 4 faults, has %d'
                            % (nm, len(w.get('faults', []))))
    return problems


# -------------------------------------------------------------------- art
def art_uri(fn):
    from PIL import Image
    im = Image.open(os.path.join(ART_DIR, fn)); im.load()
    w, h = im.size
    sc = LONG_EDGE / float(max(w, h))
    if sc < 1:
        im = im.resize((int(round(w * sc)), int(round(h * sc))), Image.LANCZOS)
    kw = {'quality': QUALITY, 'method': 6}
    if im.mode in ('RGBA', 'LA'):
        kw['alpha_quality'] = 100
    else:
        im = im.convert('RGB')
    buf = io.BytesIO(); im.save(buf, 'WEBP', **kw)
    return 'data:image/webp;base64,' + base64.b64encode(buf.getvalue()).decode(), len(buf.getvalue())


# ------------------------------------------------------------- generation
def js_str(s):
    return "'" + s.replace('\\', '\\\\').replace("'", "\\'").replace('\n', ' ') + "'"


def mech_entry(w):
    p = ["role:%s" % js_str(w['role']), "rar:%d" % w['rar']]
    if w.get('atk'):
        p.append("atk:[%s]" % ','.join(js_str(a) for a in w['atk']))
    for k in ('dmg', 'dtype', 'rng'):
        if w.get(k):
            p.append("%s:%s" % (k, js_str(w[k])))
    for k in ('shots', 'hands', 'pen', 'dis', 'jam', 'offScale'):
        if w.get(k):
            p.append("%s:%s" % (k, int(w[k])))
    sps = []
    for sp in w.get('sp', []):
        q = ["n:%s" % js_str(sp['n'])]
        if sp.get('rest'):
            q.append("rest:%s" % js_str(sp['rest']))
        if sp.get('u') is not None:
            q.append("u:%d" % int(sp['u']))
        if sp.get('dmg'):
            q.append("dmg:%s" % js_str(sp['dmg']))
        if sp.get('shots'):
            q.append("shots:%d" % int(sp['shots']))
        if sp.get('save'):
            sv = sp['save']
            r = ["st:%s" % js_str(sv['st'])]
            for kk in ('dmg', 'area'):
                if sv.get(kk):
                    r.append("%s:%s" % (kk, js_str(sv[kk])))
            if sv.get('half'):
                r.append("half:1")
            q.append("save:{%s}" % ','.join(r))
        q.append("t:%s" % js_str(sp['t']))
        sps.append('{' + ','.join(q) + '}')
    if sps:
        p.append("sp:[%s]" % ',\n      '.join(sps))
    return " %d:{%s}" % (w['id'], ',\n    '.join(p))


def book_entry(w, uri):
    body = w['flavour']
    return {"k": "item", "n": w['id'], "name": w['name'], "tag": w['tag'],
            "sec": "Mythic Arsenal" if w['rar'] == 5 else "Weapons",
            "body": [body], "img": uri}


# ------------------------------------------------------------------- main
def main():
    ws = load_src()
    print('parsed %d weapons from weapons-src.js' % len(ws))

    baked = baked_plates()
    probs = validate(ws, baked)
    if probs:
        print('\nREFUSING TO WRITE -- %d problem(s):' % len(probs))
        for p in probs:
            print('   ' + p)
        sys.exit(1)
    print('ladder check: all clear')

    s = open(CONSOLE, encoding='utf-8').read()
    before = len(s)
    shutil.copyfile(CONSOLE, CONSOLE + '.bak')

    # ---- art -------------------------------------------------------------
    uris, art_bytes, reused = {}, 0, 0
    for w in ws:
        if os.path.exists(os.path.join(ART_DIR, w['art'])):
            uris[w['id']], n = art_uri(w['art'])
            art_bytes += n
        else:
            uris[w['id']] = baked[w['id']]          # validate() proved it is there
            reused += 1
    print('art: %d fresh, %d reused from the console, %.2f MB embedded'
          % (len(ws) - reused, reused, art_bytes * 4 / 3.0 / 1048576))

    # ---- MECH ------------------------------------------------------------
    i = s.index('const MECH=')
    depth, j, instr, k = 0, s.index('{', i), None, s.index('{', i)
    BS = chr(92)
    while k < len(s):
        c = s[k]
        if instr:
            if c == BS: k += 2; continue
            if c == instr: instr = None
        elif s.startswith('/*', k):
            e = s.find('*/', k + 2); k = len(s) if e < 0 else e + 2; continue
        elif c in '"\'`':
            instr = c
        elif c == '{':
            depth += 1
        elif c == '}':
            depth -= 1
            if depth == 0:
                break
        k += 1
    mech_close = k
    old = re.search(r',?\s*/\*<<NEWWEAPONS>>\*/.*?/\*<</NEWWEAPONS>>\*/\s*',
                    s[j:mech_close], re.S)
    if old:
        s = s[:j + old.start()] + s[j + old.end():mech_close] + s[mech_close:]
        mech_close -= (old.end() - old.start())
    block = ('/*<<NEWWEAPONS>>*/\n' + ',\n'.join(mech_entry(w) for w in ws)
             + '\n/*<</NEWWEAPONS>>*/')
    s = s[:mech_close] + ',\n' + block + '\n' + s[mech_close:]
    print('MECH: %d entries written' % len(ws))

    # ---- BOOK ------------------------------------------------------------
    i = s.index('const BOOK'); j = s.index('[', i)
    book, end = json.JSONDecoder().raw_decode(s, j)
    book = [e for e in book if not (e.get('k') == 'item'
                                    and isinstance(e.get('n'), int)
                                    and e['n'] >= FIRST_ID)]

    # The book reads in PAGE ORDER. A divider opens a section and every entry
    # after it belongs to that section until the next divider. The `sec` field
    # drives bkPowerSort, but the divider is what the reader actually sees, so
    # a page appended at the end reads as part of the last section no matter
    # what its `sec` says. Insert each page at the end of its own section.
    def section_end(label):
        start = next((n for n, e in enumerate(book)
                      if e.get('k') == 'divider' and e.get('label') == label), None)
        if start is None:
            sys.exit('no divider labelled %r in BOOK -- add one, or change `sec`' % label)
        for n in range(start + 1, len(book)):
            if book[n].get('k') in ('divider', 'back'):
                return n
        return len(book)

    bysec = {}
    for w in ws:
        e = book_entry(w, uris[w['id']])
        bysec.setdefault(e['sec'], []).append(e)
    # deepest section first, so earlier insertion points stay valid
    for sec in sorted(bysec, key=section_end, reverse=True):
        at = section_end(sec)
        for off, e in enumerate(bysec[sec]):
            book.insert(at + off, e)
        print('BOOK: %d pages into "%s" at index %d' % (len(bysec[sec]), sec, at))
    s = s[:j] + json.dumps(book, ensure_ascii=False) + s[end:]
    print('BOOK: %d total entries' % len(book))

    # ---- WEAPON_IDS ------------------------------------------------------
    m = re.search(r'const\s+WEAPON_IDS\s*=\s*new\s+Set\(\[', s)
    close = s.index(']);', m.end())
    seg = s[m.end():close]
    seg = re.sub(r',?\s*/\*<<NEWWEAPONS>>\*/.*?/\*<</NEWWEAPONS>>\*/\s*', '', seg, flags=re.S)
    ids = ',\n  '.join('%d  /* %s */' % (w['id'], w['name']) for w in ws)
    s = (s[:m.end()] + seg.rstrip().rstrip(',')
         + ',\n  /*<<NEWWEAPONS>>*/\n  ' + ids + '\n  /*<</NEWWEAPONS>>*/\n'
         + s[close:])
    print('WEAPON_IDS: %d ids added' % len(ws))

    # ---- MY_FAULTS -------------------------------------------------------
    myth = [w for w in ws if w['rar'] == 5]
    if myth:
        m = re.search(r'const\s+MY_FAULTS\s*=', s)
        j2 = s.index('{', m.end() - 1)
        faults, end2 = json.JSONDecoder().raw_decode(s, j2)
        for key in [k for k in faults if int(k) >= FIRST_ID]:
            del faults[key]
        for w in myth:
            faults[str(w['id'])] = {"n": w['name'], "f": w['faults']}
        s = s[:j2] + json.dumps(faults, ensure_ascii=False) + s[end2:]
        print('MY_FAULTS: %d mythic rows' % len(myth))

    open(CONSOLE, 'w', encoding='utf-8', newline='\n').write(s)
    print('\nconsole %.2f MB -> %.2f MB  (backup at .bak)'
          % (before / 1048576.0, len(s) / 1048576.0))


if __name__ == '__main__':
    main()
