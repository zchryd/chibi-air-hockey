// ── NPC (1-player AI) ────────────────────────────────────────────────
const NPC_SPEED=5.6; // base value; NPC_SPEED_EFF is the effective (options-adjusted) value
function updateNPC(){
  if(!RM.alive){RM.vx=0;RM.vy=0;return;}
  if(!pucks.length)return;
  // Track whichever puck is most threatening (highest vx toward RM)
  const p=pucks.reduce((b,pk)=>pk.vx>b.vx?pk:b,pucks[0]);
  let targetY;
  if(p.vx>0.5){
    // Predict puck Y when it reaches RM.x
    const t=Math.max(0,(RM.x-PUCK_R-p.x)/Math.max(p.vx,0.1));
    let py=p.y+p.vy*t;
    // Simple wall-bounce prediction
    const range=H-BW*2; py-=BW;
    py=((py%(range*2))+(range*2))%(range*2);
    if(py>range)py=range*2-py;
    py+=BW;
    const hp=1-RM.hits/MAX_HITS;
    const inGoal=py>gRT&&py<gRB;
    if(!inGoal&&hp<0.65){
      // Puck is heading toward the wall, not the goal — it will bounce back on its own.
      // When health is depleted, avoid the unnecessary hit and let the wall do the work.
      const clearance=RM.r+PUCK_R+6;
      targetY=py<H/2 ? Math.max(py+clearance,H/2) : Math.min(py-clearance,H/2);
    }else{
      targetY=py;
    }
  }else{
    // Puck moving away — drift back to centre
    targetY=H/2;
  }
  const dy=targetY-RM.y;
  RM.vy=Math.max(-NPC_SPEED_EFF,Math.min(NPC_SPEED_EFF,dy*0.14));
  // Move toward puck when it's incoming, retreat to defensive X otherwise
  const targetX=p.vx>0.5 ? Math.min(MALLET_XR, p.x+80) : MALLET_XR-MALLET_XRANGE*0.3;
  const dx=targetX-RM.x;
  RM.vx=Math.max(-NPC_SPEED_EFF,Math.min(NPC_SPEED_EFF,dx*0.14));
}
const keys={};
window.addEventListener('keydown',e=>{
  getAC();
  if(state==='landing'){showMainMenu();e.preventDefault();return;}
  if(state==='mainmenu'){
    if(e.key==='ArrowUp'||e.key==='w'||e.key==='W')mainMenuSel=(mainMenuSel-1+3)%3;
    else if(e.key==='ArrowDown'||e.key==='s'||e.key==='S')mainMenuSel=(mainMenuSel+1)%3;
    else if(e.key==='ArrowLeft'||e.key==='a'||e.key==='A')mainMenuSel=(mainMenuSel-1+3)%3;
    else if(e.key==='ArrowRight'||e.key==='d'||e.key==='D')mainMenuSel=(mainMenuSel+1)%3;
    else if(e.key==='Enter'||e.key===' '){
      if(mainMenuSel===0){gameMode='1p';showModeSelect();}
      else if(mainMenuSel===1){gameMode='2p';showModeSelect();}
      else showOptions();
    }else if(e.key==='1'){gameMode='1p';showModeSelect();}
    else if(e.key==='2'){gameMode='2p';showModeSelect();}
    else if(e.key==='Escape')showLanding();
    else if(e.key==='f'||e.key==='F')toggleFullscreen();
    e.preventDefault();return;
  }
  if(state==='options'){
    const OPT_MAX=[25,5,5,10],OPT_MIN=[5,-5,-5,1],OPT_STEP=[1,1,1,1];
    const vals=[optHP,optMalletSpeed,optSplitFreq,optGoals];
    const keys2=['optHP','optMalletSpeed','optSplitFreq','optGoals'];
    if(e.key==='ArrowUp'||e.key==='w'||e.key==='W')optSel=(optSel-1+4)%4;
    else if(e.key==='ArrowDown'||e.key==='s'||e.key==='S')optSel=(optSel+1)%4;
    else if(e.key==='ArrowLeft'||e.key==='a'||e.key==='A'){
      if(optSel===0)optHP=Math.max(OPT_MIN[0],optHP-OPT_STEP[0]);
      else if(optSel===1)optMalletSpeed=Math.max(OPT_MIN[1],optMalletSpeed-OPT_STEP[1]);
      else if(optSel===2)optSplitFreq=Math.max(OPT_MIN[2],optSplitFreq-OPT_STEP[2]);
      else optGoals=Math.max(OPT_MIN[3],optGoals-OPT_STEP[3]);
    }else if(e.key==='ArrowRight'||e.key==='d'||e.key==='D'){
      if(optSel===0)optHP=Math.min(OPT_MAX[0],optHP+OPT_STEP[0]);
      else if(optSel===1)optMalletSpeed=Math.min(OPT_MAX[1],optMalletSpeed+OPT_STEP[1]);
      else if(optSel===2)optSplitFreq=Math.min(OPT_MAX[2],optSplitFreq+OPT_STEP[2]);
      else optGoals=Math.min(OPT_MAX[3],optGoals+OPT_STEP[3]);
    }else if(e.key==='Escape')showMainMenu();
    else if(e.key==='f'||e.key==='F')toggleFullscreen();
    e.preventDefault();return;
  }
  if(state==='modesel'){
    if(e.key==='ArrowLeft'||e.key==='a'||e.key==='A')modeSelSel=0;
    else if(e.key==='ArrowRight'||e.key==='d'||e.key==='D')modeSelSel=1;
    else if(e.key==='Enter'||e.key===' '){
      if(modeSelSel===0)quickStart();
      else showStageSelect();
    }else if(e.key==='Escape')showMainMenu();
    else if(e.key==='f'||e.key==='F')toggleFullscreen();
    e.preventDefault();return;
  }
  if(state==='stagesel'){
    const N=STAGES.length;
    if(stageSelBtn===0){
      if(e.key==='ArrowUp'||e.key==='w'||e.key==='W'){stageSel=(stageSel-1+N)%N;}
      else if(e.key==='ArrowDown'||e.key==='s'||e.key==='S'){stageSel=(stageSel+1)%N;}
      else if(e.key==='ArrowRight'||e.key==='d'||e.key==='D'){stageSelBtn=1;}
      else if(e.key==='Enter'||e.key===' '){confirmStage();getAC();}
      else if(e.key==='Escape'){showModeSelect();}
    }else{
      if(e.key==='ArrowUp'||e.key==='w'||e.key==='W'){stageSelBtn=stageSelBtn===2?1:1;}
      else if(e.key==='ArrowDown'||e.key==='s'||e.key==='S'){stageSelBtn=stageSelBtn===1?2:2;}
      else if(e.key==='ArrowLeft'||e.key==='a'||e.key==='A'){stageSelBtn=0;}
      else if(e.key==='Enter'||e.key===' '){confirmStage();getAC();}
      else if(e.key==='Escape'){showModeSelect();}
    }
    if(e.key==='f'||e.key==='F')toggleFullscreen();
    e.preventDefault();return;
  }
  if(state==='charsel'){
    if(e.key==='Escape'){showModeSelect();e.preventDefault();return;}
    const _cols=charSelCard(0).cols;
    if(!p1Ready){
      if(e.key==='a'||e.key==='A')p1CharSel=(p1CharSel-1+CHARS.length)%CHARS.length;
      if(e.key==='d'||e.key==='D')p1CharSel=(p1CharSel+1)%CHARS.length;
      if(e.key==='w'||e.key==='W'){const n=p1CharSel-_cols;p1CharSel=n>=0?n:(p1CharSel+_cols<CHARS.length?p1CharSel+_cols:p1CharSel);}
      if(e.key==='s'||e.key==='S'){const n=p1CharSel+_cols;p1CharSel=n<CHARS.length?n:(p1CharSel-_cols>=0?p1CharSel-_cols:p1CharSel);}
      if(gameMode==='1p'){
        if(e.key==='ArrowLeft')p1CharSel=(p1CharSel-1+CHARS.length)%CHARS.length;
        if(e.key==='ArrowRight')p1CharSel=(p1CharSel+1)%CHARS.length;
        if(e.key==='ArrowUp'){const n=p1CharSel-_cols;p1CharSel=n>=0?n:(p1CharSel+_cols<CHARS.length?p1CharSel+_cols:p1CharSel);}
        if(e.key==='ArrowDown'){const n=p1CharSel+_cols;p1CharSel=n<CHARS.length?n:(p1CharSel-_cols>=0?p1CharSel-_cols:p1CharSel);}
        if(e.key==='Enter'||e.key===' ')confirmP1Char();
      }else{
        if(e.key===' ')confirmP1Char();
      }
    }
    if(gameMode==='2p'&&!p2Ready){
      if(e.key==='ArrowLeft')p2CharSel=(p2CharSel-1+CHARS.length)%CHARS.length;
      if(e.key==='ArrowRight')p2CharSel=(p2CharSel+1)%CHARS.length;
      if(e.key==='ArrowUp'){const n=p2CharSel-_cols;p2CharSel=n>=0?n:(p2CharSel+_cols<CHARS.length?p2CharSel+_cols:p2CharSel);}
      if(e.key==='ArrowDown'){const n=p2CharSel+_cols;p2CharSel=n<CHARS.length?n:(p2CharSel-_cols>=0?p2CharSel-_cols:p2CharSel);}
      if(e.key==='Enter')confirmP2Char();
    }
    if(e.key==='f'||e.key==='F')toggleFullscreen();
    e.preventDefault();return;
  }
  if(perfectT>0&&perfectT<PERFECT_DUR){e.preventDefault();return;} // block input during perfect animation
  if(e.key==='r'||e.key==='R')startGame();
  if(e.key==='Escape'||e.key==='m'||e.key==='M'){if(state==='playing')paused=!paused;else showMainMenu();}
  if(e.key==='f'||e.key==='F')toggleFullscreen();
  keys[e.key]=true;
  e.preventDefault();
});
window.addEventListener('keyup',e=>{keys[e.key]=false;});

// ── Gamepad support ───────────────────────────────────────────────────
// Returns {x, y} axis input from a gamepad, combining left stick + d-pad.
// Dead zone of 0.15 applied to analog sticks.
const DEAD = 0.15;
// Joy-Con aware player assignment using a single getGamepads() snapshot.
//   P1 → Joy-Con (L) by name, else first active gamepad
//   P2 → Joy-Con (R) by name, else first active gamepad that isn't P1's
function getPlayerGPs(){
  const gps=navigator.getGamepads?[...navigator.getGamepads()]:[];
  const active=gps.filter(g=>g);
  // Individual Joy-Cons connected separately
  const joyL=active.find(g=>/Joy-Con \(L\)/.test(g.id));
  const joyR=active.find(g=>/Joy-Con \(R\)/.test(g.id));
  if(joyL&&joyR) return [joyL,joyR];
  if(joyL)       return [joyL, active.find(g=>g.index!==joyL.index)||null];
  if(joyR)       return [active.find(g=>g.index!==joyR.index)||null, joyR];
  // Combined Joy-Con pair (L/R or L+R): left stick=P1, right stick=P2.
  // Return [combinedGP, null] so the split-stick path in getGPInput() activates.
  const joyLR=active.find(g=>/Joy-Con \(L\/R\)|Joy-Con L\+R/i.test(g.id));
  if(joyLR) return [joyLR, null];
  return [active[0]||null, active[1]||null];
}
function getP1GP(){ return getPlayerGPs()[0]; }
function getP2GP(){ return getPlayerGPs()[1]; }
function gpAxis(gp, axisIdx, negBtn, posBtn){
  if(!gp) return 0;
  let v = gp.axes[axisIdx] ?? 0;
  // Re-normalize so dead-zone edge = 0 and full deflection = ±1,
  // matching the ±1 that keyboard input always produces.
  if(Math.abs(v) < DEAD) v = 0;
  else v = Math.sign(v) * (Math.abs(v) - DEAD) / (1 - DEAD);
  if(gp.buttons[negBtn]?.pressed) v = -1;
  if(gp.buttons[posBtn]?.pressed) v =  1;
  return v;
}
// Each player can be assigned a gamepad index (null = keyboard only).
// Joy-Con (L) → player 1 (Cat/LM), Joy-Con (R) → player 2 (Capybara/RM).
// If only one controller is connected it controls both (split by sticks).
function getGPInput(){
  const [gp0,gp1] = getPlayerGPs();

  // Single controller: left stick → Cat, right stick → Capybara
  const one = !gp1 && gp0;
  return {
    lx: gp0 ? gpAxis(gp0, 0, 14, 15) : 0,   // left stick X  + d-pad L/R
    ly: gp0 ? gpAxis(gp0, 1, 12, 13) : 0,   // left stick Y  + d-pad U/D
    rx: one  ? gpAxis(gp0, 2, 14, 15)
             : gp1 ? gpAxis(gp1, 0, 14, 15) : 0,
    ry: one  ? gpAxis(gp0, 3, 12, 13)
             : gp1 ? gpAxis(gp1, 1, 12, 13) : 0,
    restart: (gp0?.buttons[9]?.pressed) || (gp1?.buttons[9]?.pressed), // Start button
  };
}

C.addEventListener('click',e=>{
  if(state==='stagesel'){
    const rect=C.getBoundingClientRect();
    const mx=(e.clientX-rect.left)*(W/rect.width),my=(e.clientY-rect.top)*(H/rect.height);
    const listX=24,listW=266,listY=60,listItemH=22,N=STAGES.length;
    const maxVis=Math.floor((H-listY-40)/listItemH);
    const scrollOff=Math.max(0,Math.min(stageSel-Math.floor(maxVis/2),N-maxVis));
    for(let vi=0;vi<maxVis&&vi+scrollOff<N;vi++){
      const i=vi+scrollOff;
      const iy=listY+vi*listItemH;
      if(mx>=listX&&mx<=listX+listW&&my>=iy&&my<=iy+listItemH){stageSel=i;stageSelBtn=0;confirmStage();getAC();return;}
    }
    // Check button clicks
    const btnX=W-180,btnW=156,btnH=52;
    const btnRandY=H/2-btnH-10,btnOrderY=H/2+10;
    if(mx>=btnX&&mx<=btnX+btnW){
      if(my>=btnRandY&&my<=btnRandY+btnH){stageSelBtn=1;confirmStage();getAC();return;}
      if(my>=btnOrderY&&my<=btnOrderY+btnH){stageSelBtn=2;confirmStage();getAC();return;}
    }
    return;
  }
  if(state==='charsel'){
    const rect2=C.getBoundingClientRect();
    const mx2=(e.clientX-rect2.left)*(W/rect2.width);
    const my2=(e.clientY-rect2.top)*(H/rect2.height);
    CHARS.forEach((_,i)=>{
      const c=charSelCard(i);
      if(mx2>=c.x&&mx2<=c.x+c.w&&my2>=c.y&&my2<=c.y+c.h){
        p1CharSel=i;confirmP1Char();getAC();
      }
    });
    return;
  }
  if(state==='landing'){showMainMenu();return;}
  if(state==='mainmenu'){
    const rect=C.getBoundingClientRect();
    const mx=(e.clientX-rect.left)*(W/rect.width),my=(e.clientY-rect.top)*(H/rect.height);
    const items=[{x:W/2-160,y:200,w:140,h:110},{x:W/2-160+160,y:200,w:140,h:110},{x:W/2+20+140-160+160,y:200,w:140,h:110}];
    const cw=140,ch=110,gap=20,startX=W/2-(cw*3+gap*2)/2;
    for(let i=0;i<3;i++){const cx=startX+i*(cw+gap);if(mx>=cx&&mx<=cx+cw&&my>=200&&my<=200+ch){mainMenuSel=i;if(i===0){gameMode='1p';showModeSelect();}else if(i===1){gameMode='2p';showModeSelect();}else showOptions();}}
    return;
  }
  if(state==='modesel'){
    const rect=C.getBoundingClientRect();
    const mx=(e.clientX-rect.left)*(W/rect.width),my=(e.clientY-rect.top)*(H/rect.height);
    const cw=220,ch=140,gap=40,startX=W/2-(cw*2+gap)/2;
    for(let i=0;i<2;i++){const cx=startX+i*(cw+gap);if(mx>=cx&&mx<=cx+cw&&my>=190&&my<=190+ch){modeSelSel=i;if(i===0)quickStart();else showStageSelect();}}
    return;
  }
});
// ── Fullscreen ────────────────────────────────────────────────────────
const fsBtn=document.getElementById('fsBtn');
const wrap=document.getElementById('wrap');
const _isIOS=/iPad|iPhone|iPod/.test(navigator.userAgent)||
  (navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
function toggleFullscreen(){
  if(_isIOS){
    // iOS doesn't support Fullscreen API — scroll to hide Safari's URL bar
    window.scrollTo(0,1);
    return;
  }
  if(!document.fullscreenElement&&!document.webkitFullscreenElement){
    (wrap.requestFullscreen||wrap.webkitRequestFullscreen).call(wrap);
  }else{
    (document.exitFullscreen||document.webkitExitFullscreen).call(document);
  }
}
// Hide the fullscreen button on iOS since it can't do real fullscreen
if(_isIOS) fsBtn.style.display='none';
function updateFsIcon(){
  const inFs=!!(document.fullscreenElement||document.webkitFullscreenElement);
  fsBtn.textContent=inFs?'✕ exit':'⛶';
  fsBtn.title=inFs?'Exit fullscreen (F)':'Fullscreen (F)';
}
fsBtn.addEventListener('click',()=>{toggleFullscreen();getAC();});
document.addEventListener('fullscreenchange',updateFsIcon);
document.addEventListener('webkitfullscreenchange',updateFsIcon);

window.addEventListener('gamepadconnected',    e => { showGPToast(`🎮 Controller ${e.gamepad.index+1} connected`); console.log('GP connected:', e.gamepad.index, JSON.stringify(e.gamepad.id)); document.body.style.cursor='none'; C.style.cursor='none'; });
window.addEventListener('gamepaddisconnected', e => { showGPToast(`🎮 Controller ${e.gamepad.index+1} disconnected`); document.body.style.cursor=''; C.style.cursor=''; });
document.addEventListener('mousemove', ()=>{ document.body.style.cursor=''; C.style.cursor=''; });

// ── Touch controls ───────────────────────────────────────────────────
// Converts a touch/pointer screen position to game-canvas coordinates.
function touchToGame(tx, ty){
  const r=C.getBoundingClientRect();
  return { x:(tx-r.left)/r.width*W, y:(ty-r.top)/r.height*H };
}
// Active touch targets: touchL = {x,y} for left mallet, touchR for right
let touchL=null, touchR=null;
// Track which touch ID controls which side
const touchMap={}; // touchId → 'l' | 'r'
// Offset so the player's finger sits in the letterbox margin, not over the character.
// P1 finger is left of mallet, P2 finger is right of mallet.
const TOUCH_OFFSET_X=100;

// Listen on wrap (not just canvas) so touches in the letterbox margins are captured
wrap.addEventListener('touchstart', e=>{
  e.preventDefault(); getAC();
  for(const t of e.changedTouches){
    const g=touchToGame(t.clientX, t.clientY);

    // ── Menu / non-playing states: treat as tap ──
    if(state==='landing'){showMainMenu(); return;}
    if(state==='mainmenu'){handleMenuTap(g); return;}
    if(state==='options'){handleOptionsTap(g); return;}
    if(state==='modesel'){handleModeSelTap(g); return;}
    if(state==='stagesel'){handleStageSelTap(g); return;}
    if(state==='charsel'){handleCharSelTap(g); return;}
    if(state==='over'){startGame(); return;}
    if(state==='playing'&&paused){paused=false; return;}

    // ── Gameplay: assign touch to a mallet side ──
    if(state==='playing'){
      const side=g.x<W/2?'l':'r';
      touchMap[t.identifier]=side;
      const og={x:g.x+(side==='l'?TOUCH_OFFSET_X:-TOUCH_OFFSET_X), y:g.y};
      if(side==='l') touchL=og;
      else           touchR=og;
    }
  }
}, {passive:false});

wrap.addEventListener('touchmove', e=>{
  e.preventDefault();
  for(const t of e.changedTouches){
    const g=touchToGame(t.clientX, t.clientY);
    const side=touchMap[t.identifier];
    const og={x:g.x+(side==='l'?TOUCH_OFFSET_X:-TOUCH_OFFSET_X), y:g.y};
    if(side==='l') touchL=og;
    else if(side==='r') touchR=og;
  }
}, {passive:false});

wrap.addEventListener('touchend', e=>{
  for(const t of e.changedTouches){
    const side=touchMap[t.identifier];
    if(side==='l') touchL=null;
    else if(side==='r') touchR=null;
    delete touchMap[t.identifier];
  }
});
wrap.addEventListener('touchcancel', e=>{
  for(const t of e.changedTouches){
    const side=touchMap[t.identifier];
    if(side==='l') touchL=null;
    else if(side==='r') touchR=null;
    delete touchMap[t.identifier];
  }
});

// ── Touch tap handlers for menus ─────────────────────────────────────
function handleMenuTap(g){
  // Main menu: 3 cards at y=180, each 140×130
  const cw=140,ch=130,gap=20,startX=W/2-(cw*3+gap*2)/2;
  for(let i=0;i<3;i++){
    const cx=startX+i*(cw+gap),cy=180;
    if(g.x>=cx&&g.x<=cx+cw&&g.y>=cy&&g.y<=cy+ch){
      mainMenuSel=i;
      if(i===0){gameMode='1p';showModeSelect();}
      else if(i===1){gameMode='2p';showModeSelect();}
      else showOptions();
      return;
    }
  }
}

function handleOptionsTap(g){
  const sw=500,sx=W/2-sw/2,startY=130,sh=52;
  for(let i=0;i<4;i++){
    const sy=startY+i*(sh+22);
    if(g.y>=sy-4&&g.y<=sy+sh+4){
      optSel=i;
      // Left half decreases, right half increases
      const OPT_MAX=[25,5,5,10],OPT_MIN=[5,-5,-5,1];
      if(g.x<W/2){
        if(i===0)optHP=Math.max(OPT_MIN[0],optHP-1);
        else if(i===1)optMalletSpeed=Math.max(OPT_MIN[1],optMalletSpeed-1);
        else if(i===2)optSplitFreq=Math.max(OPT_MIN[2],optSplitFreq-1);
        else optGoals=Math.max(OPT_MIN[3],optGoals-1);
      }else{
        if(i===0)optHP=Math.min(OPT_MAX[0],optHP+1);
        else if(i===1)optMalletSpeed=Math.min(OPT_MAX[1],optMalletSpeed+1);
        else if(i===2)optSplitFreq=Math.min(OPT_MAX[2],optSplitFreq+1);
        else optGoals=Math.min(OPT_MAX[3],optGoals+1);
      }
      return;
    }
  }
  // Tap outside sliders = back
  if(g.y>startY+4*(sh+22)) showMainMenu();
}

function handleModeSelTap(g){
  const cw=220,ch=180,gap=40,startX=W/2-(cw*2+gap)/2;
  for(let i=0;i<2;i++){
    const cx=startX+i*(cw+gap),cy=140;
    if(g.x>=cx&&g.x<=cx+cw&&g.y>=cy&&g.y<=cy+ch){
      modeSelSel=i;
      if(i===0) quickStart();
      else showStageSelect();
      return;
    }
  }
  // Tap below cards = back
  if(g.y>340) showMainMenu();
}

function handleStageSelTap(g){
  // Left panel: stage list
  const listX=24,listW=266,listY=60,listItemH=22;
  const N=STAGES.length;
  const maxVis=Math.floor((H-listY-40)/listItemH);
  const scrollOff=Math.max(0,Math.min(stageSel-Math.floor(maxVis/2),N-maxVis));
  if(g.x>=listX-4&&g.x<=listX+listW+4&&g.y>=listY&&g.y<=listY+maxVis*listItemH){
    const vi=Math.floor((g.y-listY)/listItemH);
    const idx=vi+scrollOff;
    if(idx>=0&&idx<N){stageSel=idx;stageSelBtn=0;}
    return;
  }
  // Right side buttons — look for "PLAY" area (bottom right)
  const px=listX+listW+20,pw=W-px-20;
  if(g.x>=px&&g.x<=px+pw&&g.y>=H-120){
    confirmStage(); getAC();
    return;
  }
  // Top-left tap = back
  if(g.y<50&&g.x<100) showModeSelect();
}

function handleCharSelTap(g){
  for(let i=0;i<CHARS.length;i++){
    const c=charSelCard(i);
    if(g.x>=c.x&&g.x<=c.x+c.w&&g.y>=c.y&&g.y<=c.y+c.h){
      if(!p1Ready){
        p1CharSel=i; confirmP1Char();
        if(gameMode==='1p') return;
      }
      if(gameMode==='2p'&&!p2Ready){
        p2CharSel=i; confirmP2Char();
      }
      return;
    }
  }
}
function showGPToast(msg){
  const t=document.createElement('div');
  Object.assign(t.style,{position:'fixed',bottom:'28px',left:'50%',transform:'translateX(-50%)',
    background:'rgba(0,0,0,.75)',color:'#fff',padding:'8px 18px',borderRadius:'20px',
    fontFamily:'Nunito,monospace',fontSize:'14px',pointerEvents:'none',zIndex:99,transition:'opacity .5s'});
  t.textContent=msg; document.body.appendChild(t);
  setTimeout(()=>t.style.opacity='0',2000); setTimeout(()=>t.remove(),2600);
}

