const C=document.getElementById('c'), ctx=C.getContext('2d');
const dpr=window.devicePixelRatio||1, W=960, H=540;
C.width=W*dpr; C.height=H*dpr; ctx.scale(dpr,dpr);

// ── Constants ────────────────────────────────────────────────────────
const BW=26, GOAL_H=Math.round(H*0.30), GOAL_TOP=H/2-GOAL_H/2, GOAL_BOT=H/2+GOAL_H/2;
// Dynamic goal edges (left and right sides updated per tick; equal to constants by default)
let gLT=GOAL_TOP, gLB=GOAL_BOT, gRT=GOAL_TOP, gRB=GOAL_BOT;
const MALLET_XL=76, MALLET_XR=W-76, MALLET_XRANGE=W*0.20;
const FULL_R=38; let MAX_HITS=13, SCORE_TO_WIN=5, SPLIT_THRESHOLD=15, NPC_SPEED_EFF=5.6;
const PUCK_R=22, SPEED_INIT=7.5, SPEED_MAX=17, SPEED_INC=0.28;
const WRAND=0.28, HRAND=0.32;
const C_BG='#0d1520',C_TABLE='#0b4a3c',C_TABLELT='#0d5546',C_BORDER='#7a4f1f',C_BORDERLT='#c4832f';
const C_GOAL='#051810',C_GPOST='#ff3a3a',C_CAT='#ff8c3a',C_CATDK='#c95f10',C_CATPINK='#ffb3a0';
const C_CAPY='#b07030',C_CAPYDK='#7a4a10',C_CAPYNOSE='#c4906a';
const C_BEAR='#8b5e3c',C_BEARDK='#5a3a1e',C_OUTLINE='#0d1520';
const C_BUN='#f2e4ee',C_BUNDK='#c8a0b8',C_BUNPINK='#ffb0c8';
const C_AXO='#ffb3c6',C_AXODK='#c2607a',C_AXOGILL='#ff4d80',C_AXOBELLY='#ffd6e4';
const C_CHIBI='#ffd0b0',C_CHIBIDK='#d9956a';
const C_CBGHR='#dd70cc',C_CBGHRDK='#9e3898';
const C_CBBYHR='#4488d0',C_CBBYHRDK='#1a4a8a';
const C_MOLE='#4a3a30',C_MOLEDK='#2a1a12',C_MOLENOSE='#ff7090',C_MOLECLAW='#c4a882';

// ── Characters ───────────────────────────────────────────────────────
const CHARS=[
  {id:'cat',     name:'Cat',      col:C_CAT,      emoji:'🐱', uniqueEmote:'sassy', draw:(m)=>drawCat(m), perfectAnim:(x,y,r,t)=>drawCatPerfect(x,y,r,t)},
  {id:'capybara',name:'Capybara', col:C_CAPY,     emoji:'🦫', uniqueEmote:'zen', draw:(m)=>drawCapybara(m), perfectAnim:(x,y,r,t)=>drawCapybaraPerfect(x,y,r,t)},
  {id:'bear',    name:'Bear',     col:C_BEAR,     emoji:'🐻', uniqueEmote:'fierce', draw:(m)=>drawBearMallet(m), perfectAnim:(x,y,r,t)=>drawBearPerfect(x,y,r,t)},
  {id:'bunny',   name:'Bunny',    col:C_BUNPINK,  emoji:'🐰', uniqueEmote:'starry', draw:(m)=>drawBunny(m), perfectAnim:(x,y,r,t)=>drawBunnyPerfect(x,y,r,t)},
  {id:'axolotl',  name:'Axolotl',   col:C_AXO,     emoji:'🦎', uniqueEmote:'derp', draw:(m)=>drawAxolotl(m), perfectAnim:(x,y,r,t)=>drawAxolotlPerfect(x,y,r,t)},
  {id:'chibigirl',name:'Luna',     col:C_CBGHR,   emoji:'👧', uniqueEmote:'pouty', draw:(m)=>drawChibiGirl(m), perfectAnim:(x,y,r,t)=>drawChibiGirlPerfect(x,y,r,t)},
  {id:'chibiboy', name:'Kai',      col:C_CBBYHR,  emoji:'👦', uniqueEmote:'smug', draw:(m)=>drawChibiBoy(m), perfectAnim:(x,y,r,t)=>drawChibiBoyPerfect(x,y,r,t)},
  {id:'mole',     name:'Star Mole', col:C_MOLENOSE, emoji:'🐀', uniqueEmote:'sniff', draw:(m)=>drawMole(m), perfectAnim:(x,y,r,t)=>drawMolePerfect(x,y,r,t)},
];

// ── Helpers ───────────────────────────────────────────────────────────
function roundRect(c,x,y,w,h,r){c.beginPath();c.moveTo(x+r,y);c.lineTo(x+w-r,y);c.quadraticCurveTo(x+w,y,x+w,y+r);c.lineTo(x+w,y+h-r);c.quadraticCurveTo(x+w,y+h,x+w-r,y+h);c.lineTo(x+r,y+h);c.quadraticCurveTo(x,y+h,x,y+h-r);c.lineTo(x,y+r);c.quadraticCurveTo(x,y,x+r,y);c.closePath();}
