/* =====================================================================
   NEW WEAPONS — editable source
   ---------------------------------------------------------------------
   Edit THIS file, not the console. Then run:

       python "Control console/inject-weapons.py"

   ...and the console is rewritten from whatever is below. Re-running is
   safe and idempotent — it replaces the block, it never appends.

   Each entry becomes a MECH entry + a BOOK page + a WEAPON_IDS number.
   Art comes from `art` in Dnd Weapon Design, converted to WebP
   (900px long edge, q88) on the way in.

   NAMES AND TYPES COME FROM THE FILENAMES. The spec sheets printed on
   the art are NOT used — the pictures are artwork only. Every number
   below is designed against the ladder, not lifted from a card.

   THE LADDER — the boot audit flags anything outside these:
     rar 1  band  5.3   pass 2.9-8.5    special ceiling 16
     rar 2  band  8.4   pass 4.6-13.4   special ceiling 24
     rar 3  band 13.5   pass 7.4-21.6   special ceiling 34
     rar 4  band 21.6   pass 11.9-34.6  special ceiling 56
     rar 5  band 34.5   pass 19.0-55.2  special ceiling 999

   effective = avg(dmg) x shots x mult,  mult = 0.65 hit / 0.85 pen /
   0.75 save-for-half / 1.0 noAtk;  x0.66 if dis, x0.95 if jam.
   `dmg` is PER SHOT. `shots` multiplies it. (The Dual Vipers lesson.)
   Special dice are RAW (no mult) and must stay under the ceiling.

   HOW TO EDIT
     - `dmg` / `shots`   retune damage (watch the band)
     - `rar`             moves tier AND changes which band it must hit
     - `sp:[...]`        its specials; a `save` block prints a DC for the DM
     - `name`            rename freely, nothing else keys off it
     - `offScale:1`      exempt from the ladder check, for a weapon whose
                         value is control rather than damage
   ===================================================================== */

export const NEW_WEAPONS = [

/* ============ RARITY 1 — COMMON ====================================
   The catalog had ZERO common weapons. This is the bottom rung.       */

{ id:69, name:'G18', tag:'Pistol', art:'G18 Pistol dnd.png',
  rar:1, atk:['DEX'], dmg:'2d6', shots:1, dtype:'ballistic', rng:'40/120 ft', hands:1,
  role:'Standard sidearm — issued, reliable, always loaded.',
  flavour:'The gun you carry because everyone carries one.',
  sp:[{n:'Double Tap', rest:'short', u:2, dmg:'2d6', shots:2,
       t:'Two rounds into one target as a single action.'}] },

{ id:70, name:'Mauler', tag:'Pistol', art:'Mauler pistol dnd.png',
  rar:1, atk:['DEX'], dmg:'2d6', shots:1, dtype:'force', rng:'30/90 ft', hands:1,
  role:'Concussive sidearm — shears the footing out from under a target.',
  flavour:'Short barrel, heavy discharge. Built to stagger, not to kill.',
  sp:[{n:'Shear', rest:'short', u:1, save:{st:'STR', dmg:'2d6', half:0},
       t:'On a failed STR save the target is knocked prone.'}] },

{ id:71, name:'Aureole', tag:'Pistol', art:'Aureole Pistol Dnd.png',
  rar:1, atk:['DEX'], dmg:'2d8', shots:1, dtype:'energy', rng:'50/150 ft', hands:1,
  role:'Close support sidearm — clean, quick, forgiving.',
  flavour:'A service pulse pistol with no bad habits and no surprises.',
  sp:[{n:'Pulse Chain', rest:'short', u:1, dmg:'2d6', shots:2,
       t:'Two pulses, which may go to two targets within 15 ft of each other.'}] },

/* ============ RARITY 2 — STANDARD ================================== */

{ id:72, name:'Plasma Pistol', tag:'Pistol', art:'Plasma pistol dnd.png',
  rar:2, atk:['DEX'], dmg:'3d8', shots:1, dtype:'force', rng:'30/90 ft', hands:1,
  role:'Anti-shield sidearm — eats barriers, armour and synthetics.',
  flavour:'Overcharges into a slow, heavy bolt that shields simply fail to read.',
  sp:[{n:'Overcharge', rest:'long', u:1, dmg:'4d8',
       t:'Ignores all shields, barriers and temporary HP. Against a synthetic '+
         'or construct, roll 5d8 instead.'}] },

{ id:73, name:'Needler', tag:'Pistol', art:'Needler psitol dnd.png',
  rar:2, atk:['DEX'], dmg:'2d8', shots:2, dtype:'force', rng:'30/90 ft', hands:1,
  role:'Shard pistol — stacks slivers in a target, then detonates them.',
  flavour:'The shards keep travelling after they land. That is the point.',
  sp:[{n:'Supercombine', rest:'long', u:1, save:{st:'CON', dmg:'3d8', half:1, area:'10 ft'},
       t:'Detonate every shard in a target. On a failed CON save the blast '+
         'catches everything within 10 ft of it.'}] },

{ id:74, name:'Raffica', tag:'Pistol', art:'Raffica Pistol Dnd.png',
  rar:2, atk:['DEX'], dmg:'2d6', shots:2, dtype:'ballistic', rng:'40/120 ft', hands:1,
  role:'Burst sidearm — fires in fixed bursts, never single.',
  flavour:'A stock folds out of the grip. Discipline built into the trigger group.',
  sp:[{n:'Full Burst', rest:'short', u:2, dmg:'2d6', shots:3,
       t:'A three-round burst into one target, each round rolling to hit separately.'}] },

{ id:75, name:'Wingy', tag:'Hand Cannon', art:'Wingy Pistol Dnd.png',
  rar:2, atk:['DEX','STR'], dmg:'4d8', shots:1, dtype:'ballistic', rng:'50/150 ft', hands:1,
  role:'Hand cannon — one heavy round, and you had better mean it.',
  flavour:'Six chambers, no burst, and a recoil that decides your next turn for you.',
  sp:[{n:'Hammerfall', rest:'short', u:2, dmg:'5d8',
       t:'A single aimed round. On a hit the target is pushed 10 ft.'}] },

{ id:76, name:'Kestrel', tag:'Grenade Launcher', art:'Grenade launcher kestrel dnd.png',
  rar:2, atk:['DEX'], dmg:'3d8', shots:1, dtype:'fire', rng:'60/180 ft', hands:2,
  role:'Light launcher — area damage without the Obliterator on your back.',
  flavour:'A breech-loaded tube for people who want a blast radius and still '+
          'want to run afterwards.',
  sp:[{n:'Airburst', rest:'long', u:2, save:{st:'DEX', dmg:'4d8', half:1, area:'15 ft radius'},
       t:'Detonates above the target. Cover does not apply against it.'}] },

/* ============ RARITY 3 — RARE ====================================== */

{ id:77, name:'Maddox', tag:'SMG', art:'Maddox SMG dnd.png',
  rar:3, atk:['DEX'], dmg:'3d6', shots:2, dtype:'energy', rng:'40/120 ft', hands:2,
  role:'Saturation SMG — relentless pressure at close range.',
  flavour:'Empties fast, reloads faster, and asks nothing of your aim.',
  sp:[{n:'Saturate', rest:'long', u:1, save:{st:'DEX', dmg:'6d6', half:1, area:'15 ft cone'},
       t:'Empty the magazine into a cone. Failed DEX save takes it all.'}] },

{ id:78, name:'Ak', tag:'Assault Rifle', art:'Ak AR Dnd.png',
  rar:3, atk:['DEX'], dmg:'4d10', shots:1, dtype:'fire', rng:'80/240 ft', hands:2,
  role:'Frontline rifle — burns through cover and keeps burning.',
  flavour:'Crude, hot, and it has never once failed to fire.',
  sp:[{n:'Cinderburn', rest:'long', u:1, dmg:'5d10',
       t:'The target takes 1d10 fire at the start of each of its turns for 2 '+
         'rounds unless it spends an action smothering the flame.'}] },

{ id:79, name:'M8', tag:'Assault Rifle', art:'M8 AR.png',
  rar:3, atk:['DEX'], dmg:'4d10', shots:1, dtype:'energy', rng:'80/240 ft', hands:2,
  role:'All-round assault rifle — no weakness, no signature strength.',
  flavour:'What the armoury hands you when it has no opinion about you yet.',
  sp:[{n:'Controlled Pairs', rest:'short', u:2, dmg:'3d10', shots:2,
       t:'Two aimed shots as one action. If both hit, the second crits on 19-20.'}] },

{ id:80, name:'R301', tag:'Assault Rifle', art:'R301 AR Dnd.png',
  rar:3, atk:['DEX'], dmg:'3d8', shots:2, dtype:'ballistic', rng:'100/300 ft', hands:2,
  role:'Marksman-pattern AR — reaches further than a rifle should.',
  flavour:'Long receiver, stabilised rail. Built for the shot after the one '+
          'that gave you away.',
  sp:[{n:'Range Discipline', rest:'long', u:1, dmg:'3d10', shots:2,
       t:'Two shots at long range with no disadvantage, each ignoring half cover.'}] },

{ id:81, name:'Aa-12', tag:'Shotgun', art:'Aa-12 Shotgun Dnd.png',
  rar:3, atk:['DEX'], dmg:'3d6', shots:2, dtype:'ballistic', rng:'20/60 ft', hands:2,
  role:'Automatic shotgun — volume of fire instead of aim.',
  flavour:'Drum-fed and fully automatic. The frame was not designed for this '+
          'and the handling shows it.',
  sp:[{n:'Drum Dump', rest:'long', u:1, dmg:'3d6', shots:3,
       t:'Three shells in one action, each rolled separately, all at -2 to hit.'}] },

{ id:82, name:'PK', tag:'Shotgun', art:'Pk shotgun DnD.png',
  rar:3, atk:['DEX'], dmg:'5d8', shots:1, dtype:'lightning', rng:'30/90 ft', hands:2, pen:1,
  role:'Rail shotgun — a slug that does not care what is in the way.',
  flavour:'One rail, one slug, and a high-energy warning stencilled on the '+
          'receiver for a reason.',
  sp:[{n:'Overcharge Slug', rest:'long', u:1, dmg:'6d8',
       t:'A single slug in a 60 ft line. Every creature in the line is hit; '+
         'each rolls its own attack against it.'}] },

{ id:83, name:'Flail', tag:'Melee', art:'Flail Melee DnD.png',
  rar:3, atk:['STR','DEX'], dmg:'4d10', shots:1, dtype:'lightning', rng:'melee, 10 ft chain', hands:1,
  role:'Disruptor flail — the head keeps swinging after the arc lands.',
  flavour:'The tether is arc, not chain, and it jumps to whatever is closest '+
          'when it breaks.',
  sp:[{n:'Arc Lash', rest:'short', u:2, save:{st:'DEX', dmg:'4d10', half:1},
       t:'The arc leaps to a second target within 15 ft of the first.'},
      {n:'Disrupt', rest:'long', u:1, save:{st:'CON', dmg:'3d10', half:0},
       t:'On a failed CON save the target cannot take reactions and its shields '+
         'do not regenerate until the end of its next turn.'}] },

/* ============ RARITY 4 — HIGH-POWER ================================
   GRAVITY HAMMER is the first rarity-4 MELEE weapon in the game.
   Melee previously went *3 -> *5 with nothing in between.              */

{ id:84, name:'Gravity Hammer', tag:'Melee', art:'Gravity hammer melee dnd.png',
  rar:4, atk:['STR'], dmg:'6d10', shots:1, dtype:'bludgeoning', rng:'melee, 10 ft shockwave', hands:2,
  role:'Heavy impact mace — when shields fail, impact decides.',
  flavour:'It does not swing so much as fall, and the ground answers for it.',
  sp:[{n:'Kinetic Shockwave', rest:'long', u:1,
       save:{st:'STR', dmg:'8d10', half:1, area:'10 ft radius'},
       t:'A radial concussive pulse. A failed STR save is also knocked prone '+
         'and has disadvantage on its next attack.'},
      {n:'Shieldbreak', rest:'short', u:2, dmg:'5d10',
       t:'Double damage to shields, barriers and temporary HP, and to objects '+
         'and structures.'}] },

{ id:85, name:'Mastiff', tag:'Shotgun', art:'Mastiff SHOTGUN DnD.png',
  rar:4, atk:['DEX','STR'], dmg:'6d10', shots:1, dtype:'energy', rng:'20/40 ft', hands:2,
  role:'Close-quarters shotgun — devastating inside 20 ft, useless past it.',
  flavour:'Throws a fixed star pattern. There is no choke and no apology.',
  sp:[{n:'Point Blank', rest:'short', u:2, dmg:'8d10',
       t:'Against a target within 10 ft. On a hit it is pushed 10 ft and '+
         'knocked prone.'}] },

{ id:86, name:'DMR', tag:'Marksman Rifle', art:'DMR.png',
  rar:4, atk:['DEX'], dmg:'6d10', shots:1, dtype:'energy', rng:'200/600 ft', hands:2,
  role:'Precision rifle — the band between assault rifle and sniper.',
  flavour:'Semi-automatic, heavy barrel. Fills the gap nothing else in the '+
          'armoury covers.',
  sp:[{n:'First-Shot Certainty', rest:'short', u:2, dmg:'6d10',
       t:'The first shot you take in an encounter has advantage and crits on 19-20.'},
      {n:'Chain Fire', rest:'long', u:1, dmg:'7d10',
       t:'On a kill, immediately fire again at another target within 60 ft.'}] },

{ id:87, name:'Glasswing', tag:'Sniper', art:'Glasswing sniper dnd.png',
  rar:4, atk:['DEX'], dmg:'5d10', shots:1, dtype:'radiant', rng:'400/1200 ft', hands:2, pen:1,
  role:'Phase sniper — clarity through distance, and through walls.',
  flavour:'A tightly phased lance. High penetration, minimal dispersion, and a '+
          'charge time you learn to count.',
  sp:[{n:'Phase Lance', rest:'long', u:1, dmg:'7d10',
       t:'The shot passes through cover, armour and the first creature in the '+
         'way. Everything in a 200 ft line rolls DEX or takes it in full.'},
      {n:'Hold Breath', rest:'short', u:1,
       t:'Skip your movement. Your next shot this turn cannot miss anything you '+
         'can see within 400 ft.'}] },

{ id:88, name:'LMG', tag:'LMG', art:'LMG dnd.png',
  rar:4, atk:['STR','DEX'], dmg:'4d10', shots:2, dtype:'force', rng:'150/450 ft', hands:2,
  role:'Heavy support cannon — when the line must hold.',
  flavour:'You do not carry this and move. You choose a spot and you make it '+
          'expensive.',
  sp:[{n:'Hold The Line', rest:'long', u:1,
       save:{st:'DEX', dmg:'6d10', half:1, area:'30 ft cone'},
       t:'Sustained fire across a cone. Anything that fails cannot move closer '+
         'to you until the end of its next turn.'}] },

{ id:89, name:'Sax 42', tag:'LMG', art:'sax 42 LMG dnd.png',
  rar:4, atk:['DEX'], dmg:'3d10', shots:3, dtype:'energy', rng:'120/360 ft', hands:2,
  role:'Area suppression — anchors a battleline and denies ground.',
  flavour:'A smart-feed drum keeps the discharge stable for as long as you '+
          'hold the trigger.',
  sp:[{n:'Deny Ground', rest:'long', u:1,
       save:{st:'DEX', dmg:'5d10', half:1, area:'20 ft line'},
       t:'Saturate a line. It becomes difficult terrain for 2 rounds and '+
         'anything crossing it rolls the save again.'}] },

{ id:90, name:'Arc 07', tag:'LMG', art:'Arc 07 LMG DnD.png',
  rar:4, atk:['STR','INT'], dmg:'5d10', shots:1, dtype:'lightning', rng:'100/300 ft', hands:2, pen:1,
  role:'Arc projector — sustained fire where others overheat.',
  flavour:'Inductor rails and a heat-siphon housing. Where sparks fall, control '+
          'is claimed.',
  sp:[{n:'Arc Cascade', rest:'long', u:1, dmg:'6d10',
       t:'The arc jumps to up to three more targets within 15 ft of each other, '+
         'at half damage each after the first.'},
      {n:'Heat Siphon', rest:'short', u:2,
       t:'Vent stored heat. Your next shot this cryo cycle ignores resistance to '+
         'lightning.'}] },

/* ============ RARITY 5 — MYTHIC ====================================
   A rar:5 entry ALSO needs 4 faults in MY_FAULTS or the boot audit
   flags it. The injector writes those from `faults` below.             */

{ id:91, name:'Iron Clad', tag:'Mythic', art:'Iron clad LMG dnd design.png',
  rar:5, atk:['STR'], dmg:'6d12', shots:1, dtype:'force', rng:'200/600 ft', hands:2, pen:1,
  role:'Mythic heavy cannon — a mounted weapon someone decided to carry.',
  flavour:'Reinforced frame, capacitive drum, and a reload that costs you a '+
          'whole action. Built to endure.',
  sp:[{n:'Fortress Breaker', rest:'short', u:2, dmg:'8d12',
       t:'Ignores half cover entirely and deals double damage to objects, '+
         'structures and emplacements.'},
      {n:'Relentless', rest:'long', u:1, dmg:'6d12', shots:2,
       t:'Two sustained bursts in one action. You cannot move on your next '+
         'turn — the drum needs re-seating.'}],
  faults:[
    'The drum jams: your next attack this encounter is lost re-seating it.',
    'Heat-warp in the rails: -2 to hit until the end of the encounter.',
    'A cell ruptures: take 2d10 force, and it deals half damage for 1 round.',
    'The frame cracks: two-handed only, and -10 ft speed until the next cryo cycle.'] },

{ id:92, name:'Radiation', tag:'Mythic', art:'Radiation weapon dnd.png',
  rar:5, atk:['DEX','INT'], dmg:'8d12', shots:1, dtype:'radiant', rng:'120/360 ft', hands:2,
  role:'Mythic area denial — poisons the ground and everything on it.',
  flavour:'It does not kill the room so much as make the room uninhabitable, '+
          'and it does not stop when you do.',
  sp:[{n:'Fallout Field', rest:'long', u:1,
       save:{st:'CON', dmg:'6d12', half:1, area:'20 ft radius'},
       t:'The zone stays irradiated for 3 rounds. Anything starting its turn '+
         'inside takes 2d10 radiant and cannot regain HP that turn.'},
      {n:'Degrade', rest:'short', u:2, dmg:'8d12',
       t:'The target\'s AC drops by 2 for the rest of the encounter as its '+
         'armour breaks down. Stacks twice.'}],
  faults:[
    'Containment slips: you take 2d12 radiant at the start of your next turn.',
    'The cell clouds: -2 to hit until the end of the encounter.',
    'Leakage: allies within 10 ft take 1d12 radiant when you fire.',
    'Core fatigue: Fallout Field costs two charges instead of one until repaired.'] },

];

/* =====================================================================
   NOTES — decisions I made that you may want to overrule
   ---------------------------------------------------------------------
   NAMES came from the filenames, as you said. Two are placeholders more
   than names and probably want renaming: `LMG` (id 88) and `Radiation`
   (id 92).

   WHAT THIS BATCH CLOSES, against ARSENAL-GAPS.md:
     - the SHOTGUN hole        Aa-12 *3, PK *3, Mastiff *4
     - the LMG hole            LMG *4, Sax 42 *4, Arc 07 *4, Iron Clad *5
     - the *1 COMMON hole      G18, Mauler, Aureole  (was zero weapons)
     - the *4 MELEE hole       Gravity Hammer  (melee went *3 -> *5)
     - the MARKSMAN band       DMR at 200/600, between AR 80/240 and
                               sniper 400/1200
     - single SIDEARM          seven pistols; there was only the twin-wield
                               Dual Vipers before

   STILL OPEN after this batch — no art for these yet:
     - caster arms: staff, rod, orb, spike, censer  (the biggest hole —
       it is why WIS and CHA still scale nothing)
     - sword / dagger / knife
     - cold, psychic, sonic and acid damage types
   ===================================================================== */
