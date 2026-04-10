// ── State ────────────────────────────────────────────────────────────
let LM,RM,pucks,scores,parts,rings,flashT,slowMoTimer,frameN=0,state;
let paused=false,gpPauseDebounce=0;
let camShakeX=0,camShakeY=0,floatTexts,scoreAnim,puckNameT,lastPuckIdx;
let chickenPhase='off',chickenEggTimer=0;
let gpBoosters=[],gpBoosterTimer=0,gpMouth=null,gpMouthPending=[];
let inkClouds=[],sharkBiteTimer=0;
let perfectT=0;const PERFECT_DUR=360;
let gpShieldL={active:false,timer:0,cooldown:300},gpShieldR={active:false,timer:0,cooldown:300};
let powerUp=null,powerUpTimer=0;
let p1CharSel=0,p2CharSel=1,p1Ready=false,p2Ready=false,p1Char=0,p2Char=1,charselCountdown=0;
let gameMode='1p', menuSel=0; // '1p' or '2p'
let mainMenuSel=0, modeSelSel=0, optSel=0;
let optHP=13, optMalletSpeed=0, optSplitFreq=0, optGoals=5;
let gpCursor={x:W/2,y:H/2};
let _menuGpDebounce=0;
let _charselGpDebounce=0;
let _gpPrevConfirm=false; // shared across screens — prevents held-A from firing on next screen
let _optionsGpDebounce=0, _modeSelGpDebounce=0, _landingGpDebounce=0;
let currentStage=0;
let stageSel=0,_stageSelGpDebounce=0,stageIsRandom=false,stageIsInOrder=false,stageSelBtn=0; // 0=list,1=random,2=inOrder
let arcticAngle=0;

function makeMallet(x,charIdx,side){return{x,y:H/2,r:FULL_R,charIdx,side,hits:0,alive:true,vx:0,vy:0,sx:0,sy:0,emote:null,emoteTimer:0,nextEmote:180+Math.floor(Math.random()*300),winkLeft:false};}
function makePuck(){
  const side=Math.random()<.5?0:Math.PI, angle=side+(Math.random()*.5-.25);
  return{x:W/2,y:H/2+(Math.random()*80-40),vx:Math.cos(angle)*SPEED_INIT,vy:Math.sin(angle)*SPEED_INIT,trail:[],spin:0,spinV:0,typeIdx:Math.floor(Math.random()*PT.length),wallHits:0,lastHitter:null};
}
function burst(x,y,col,n=12){for(let i=0;i<n;i++){const a=Math.random()*Math.PI*2,s=2+Math.random()*5;parts.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:1,decay:.03+Math.random()*.04,r:2+Math.random()*3,col});}}
function resetMallet(m){m.hits=0;m.r=FULL_R;m.alive=true;m.sx=0;m.sy=0;burst(m.x,m.y,CHARS[m.charIdx].col,18);}
function splitPuck(p){
  const spd=Math.hypot(p.vx,p.vy),ang=Math.atan2(p.vy,p.vx),sp=.36;
  const mk=(da)=>({x:p.x,y:p.y,vx:Math.cos(ang+da)*spd,vy:Math.sin(ang+da)*spd,trail:[],spin:0,spinV:(Math.random()*2-1)*.3,typeIdx:Math.floor(Math.random()*PT.length),wallHits:0,lastHitter:p.lastHitter});
  return[mk(sp),mk(-sp)];
}
function rainbowBurst(x,y){
  for(let i=0;i<14;i++) rings.push({x,y,r:5,maxR:210+i*28,hue:i*26,life:1,speed:2.5+i*1.2});
  for(let i=0;i<90;i++){const a=Math.random()*Math.PI*2,s=1+Math.random()*9;parts.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:1,decay:.005+Math.random()*.012,r:2+Math.random()*6,col:`hsl(${Math.random()*360},100%,65%)`});}
  slowMoTimer=90;
}
function addShake(amt){const s=amt*0.35;camShakeX=(Math.random()*2-1)*s;camShakeY=(Math.random()*2-1)*s;}
function addFloat(x,y,txt,col){floatTexts.push({x,y,txt,col,life:1,vy:-2.2});}

function showMenu(){ state='menu'; gpCursor={x:W/2,y:H/2}; }
function showLanding(){ state='landing'; }
function showMainMenu(){ state='mainmenu'; mainMenuSel=0; gpCursor={x:W/2,y:H/2}; }
function showOptions(){ state='options'; optSel=0; }
function showModeSelect(){ state='modesel'; modeSelSel=0; }
function showCharSel(){p1CharSel=0;p2CharSel=1;p1Ready=false;p2Ready=false;charselCountdown=0;state='charsel';gpCursor={x:W/2,y:H/2};}
function showStageSelect(){state='stagesel';stageSel=0;stageSelBtn=0;_stageSelGpDebounce=14;gpCursor={x:W/2,y:H/2};}
function applyOptions(){MAX_HITS=optHP;SCORE_TO_WIN=optGoals;NPC_SPEED_EFF=5.6+optMalletSpeed*0.4;SPLIT_THRESHOLD=optSplitFreq<=-5?999:Math.max(3,15-optSplitFreq);}
function quickStart(){applyOptions();SCORE_TO_WIN=3;p1Char=Math.floor(Math.random()*CHARS.length);do{p2Char=Math.floor(Math.random()*CHARS.length);}while(p2Char===p1Char);p1Ready=p2Ready=true;currentStage=Math.floor(Math.random()*STAGES.length);stageIsRandom=false;init();}

function init(){
  LM=makeMallet(MALLET_XL,p1Char,'l'); RM=makeMallet(MALLET_XR,p2Char,'r');
  const isChicken=STAGES[currentStage].name==='Chicken Coop';
  chickenPhase=isChicken?'waiting':'off';
  chickenEggTimer=isChicken?300:0;
  pucks=isChicken?[]:[makePuck()]; scores={l:0,r:0};
  parts=[]; rings=[]; flashT=0; slowMoTimer=0; frameN=0; state='playing'; paused=false; gpPauseDebounce=0;
  powerUp=null; powerUpTimer=900; // first spawn at ~15s (full HP at start)
  floatTexts=[]; scoreAnim={l:0,r:0};
  puckNameT=isChicken?0:90; lastPuckIdx=isChicken?-1:pucks[0].typeIdx;
  arcticAngle=0;
  // Reset wander obstacle state so ladybugs/chicken start fresh each game
  for(const o of STAGES[currentStage].obstacles){
    if(o.motion==='wander'){o.wx=undefined;o.wy=undefined;o.flapT=0;o.dropVY=undefined;}
  }
  // Grand Prix stage state
  inkClouds=[];sharkBiteTimer=0;perfectT=0;
  gpBoosters=[];gpBoosterTimer=90;
  gpMouth=null; gpMouthPending=[];
  gpShieldL={active:false,timer:0,cooldown:240+Math.floor(Math.random()*180)};
  gpShieldR={active:false,timer:0,cooldown:180+Math.floor(Math.random()*240)};
  floatTexts.push({x:W/2,y:H/2-60,txt:STAGES[currentStage].name,col:'#ffe88a',life:1.4,vy:-1.0});
}


// ── Physics ──────────────────────────────────────────────────────────
function clampM(m){
  m.y=Math.max(BW+m.r,Math.min(H-BW-m.r,m.y));
  const halfIn=m.r*0.5; // allow up to 50% of body inside the goal
  if(m.side==='l') m.x=Math.max(BW-halfIn,Math.min(MALLET_XL+MALLET_XRANGE,m.x));
  else             m.x=Math.max(MALLET_XR-MALLET_XRANGE,Math.min(W-BW+halfIn,m.x));
}
function hitMallet(m,p){
  const dx=p.x-m.x,dy=p.y-m.y,dist=Math.hypot(dx,dy),minD=PUCK_R+m.r;
  if(dist>=minD||dist<.1)return;
  const nx=dx/dist,ny=dy/dist;
  p.x=m.x+nx*(minD+1);p.y=m.y+ny*(minD+1);
  const rvx=p.vx-m.vx,rvy=p.vy-m.vy,rd=rvx*nx+rvy*ny;
  p.vx=(rvx-2*rd*nx)+m.vx;p.vy=(rvy-2*rd*ny)+m.vy;
  if(m.x<W/2&&p.vx<0)p.vx=Math.abs(p.vx);
  if(m.x>W/2&&p.vx>0)p.vx=-Math.abs(p.vx);
  const spd=Math.min(SPEED_MAX,Math.hypot(p.vx,p.vy)+SPEED_INC);
  const ang=Math.atan2(p.vy,p.vx)+(Math.random()*2-1)*HRAND;
  p.vx=Math.cos(ang)*spd;p.vy=Math.sin(ang)*spd;p.spinV=(Math.random()*2-1)*.35;
  p.lastHitter=m;
  m.hits++;m.r=Math.max(9,FULL_R*(1-m.hits/MAX_HITS));
  if(m.hits>=MAX_HITS)m.alive=false;
  m.sx=(Math.random()*7-3.5);m.sy=(Math.random()*7-3.5);
  burst(p.x,p.y,CHARS[m.charIdx].col,14);
  addShake(2.5+m.hits*.2);playHit();
  if(Math.random()<0.3&&!m.emote)triggerEmote(m,'surprised',40);
}
function wallBounce(p,axis,flip){
  const spd=Math.hypot(p.vx,p.vy);
  if(axis==='x')p.vx=flip*Math.abs(p.vx); else p.vy=flip*Math.abs(p.vy);
  const ang=Math.atan2(p.vy,p.vx)+(Math.random()*2-1)*WRAND;
  p.vx=Math.cos(ang)*spd;p.vy=Math.sin(ang)*spd;p.spinV=(Math.random()*2-1)*.35;
  p.wallHits++;playWall();addShake(1.2);
  if(p.wallHits>=SPLIT_THRESHOLD){addShake(5);return true;}
  return false;
}

function gpBtn(gp,i){return !!(gp.buttons[i]?.pressed||gp.buttons[i]?.value>0.5);}
function gpConfirmDown(gp){return gpBtn(gp,1)||gpBtn(gp,9);}  // A(1) or Start(9)
function gpBDown(gp){return gpBtn(gp,2);}  // B button — back/cancel
// Debounced stick axis: returns -1, 0, or +1 and fires debounce when threshold crossed
function gpAxisStep(gp,axisIdx,debounceRef,frames=14){
  const v=gp.axes[axisIdx]??0;
  if(debounceRef.v>0){debounceRef.v--;return 0;}
  if(v<-0.5){debounceRef.v=frames;return -1;}
  if(v>0.5){debounceRef.v=frames;return 1;}
  return 0;
}

const _menuAxX={v:0};
function updateMenuGamepad(){
  const gps=navigator.getGamepads?[...navigator.getGamepads()]:[];
  const gp=gps.find(g=>g);if(!gp){_gpPrevConfirm=false;return;}
  const aDown=gpConfirmDown(gp);
  const bDown=gpBDown(gp);
  if(_menuGpDebounce>0){_menuGpDebounce--;_gpPrevConfirm=aDown;return;}
  // Left stick X or D-pad left/right to move between cards
  const stepX=gpAxisStep(gp,0,_menuAxX);
  if(stepX<0||gpBtn(gp,14)){mainMenuSel=(mainMenuSel-1+3)%3;_menuGpDebounce=6;_gpPrevConfirm=aDown;return;}
  if(stepX>0||gpBtn(gp,15)){mainMenuSel=(mainMenuSel+1)%3;_menuGpDebounce=6;_gpPrevConfirm=aDown;return;}
  if(bDown){showLanding();_menuGpDebounce=30;_gpPrevConfirm=aDown;return;}
  if(aDown&&!_gpPrevConfirm){
    if(mainMenuSel===0){gameMode='1p';showModeSelect();}
    else if(mainMenuSel===1){gameMode='2p';showModeSelect();}
    else showOptions();
    _menuGpDebounce=30;getAC();
  }
  _gpPrevConfirm=aDown;
}

function updateOverGamepad(){
  const gps=navigator.getGamepads?[...navigator.getGamepads()]:[];
  const gp=gps.find(g=>g);
  const aDown=gp?gpConfirmDown(gp):false;
  const menuDown=gp?(gpBtn(gp,8)||gpBDown(gp)):false; // Select or B — back to menu
  if(_menuGpDebounce>0){_menuGpDebounce--;_gpPrevConfirm=aDown;return;}
  if(aDown&&!_gpPrevConfirm){startGame();_menuGpDebounce=40;getAC();}
  else if(menuDown){showMainMenu();_menuGpDebounce=40;}
  _gpPrevConfirm=aDown;
}

function updateLandingGamepad(){
  const gps=navigator.getGamepads?[...navigator.getGamepads()]:[];
  const gp=gps.find(g=>g);if(!gp)return;
  if(_landingGpDebounce>0){_landingGpDebounce--;return;}
  // Any face button or Start advances to main menu
  if(gpConfirmDown(gp)||gpBDown(gp)||gpBtn(gp,0)||gpBtn(gp,3)){
    showMainMenu();_landingGpDebounce=40;_gpPrevConfirm=false;
  }
}

const _optAxY={v:0},_optAxX={v:0};
function updateOptionsGamepad(){
  const gps=navigator.getGamepads?[...navigator.getGamepads()]:[];
  const gp=gps.find(g=>g);if(!gp){_gpPrevConfirm=false;return;}
  const aDown=gpConfirmDown(gp);
  const bDown=gpBDown(gp);
  if(_optionsGpDebounce>0){_optionsGpDebounce--;_gpPrevConfirm=aDown;return;}
  // Up/Down on stick or D-pad to change selected slider
  const stepY=gpAxisStep(gp,1,_optAxY);
  if(stepY<0||gpBtn(gp,12)){optSel=(optSel-1+4)%4;_optionsGpDebounce=6;_gpPrevConfirm=aDown;return;}
  if(stepY>0||gpBtn(gp,13)){optSel=(optSel+1)%4;_optionsGpDebounce=6;_gpPrevConfirm=aDown;return;}
  // Left/Right on stick or D-pad to adjust slider value
  const OPT_MAX=[25,5,5,10],OPT_MIN=[5,-5,-5,1];
  const stepX=gpAxisStep(gp,0,_optAxX);
  if(stepX<0||gpBtn(gp,14)){
    if(optSel===0)optHP=Math.max(OPT_MIN[0],optHP-1);
    else if(optSel===1)optMalletSpeed=Math.max(OPT_MIN[1],optMalletSpeed-1);
    else if(optSel===2)optSplitFreq=Math.max(OPT_MIN[2],optSplitFreq-1);
    else optGoals=Math.max(OPT_MIN[3],optGoals-1);
    _optionsGpDebounce=6;_gpPrevConfirm=aDown;return;
  }
  if(stepX>0||gpBtn(gp,15)){
    if(optSel===0)optHP=Math.min(OPT_MAX[0],optHP+1);
    else if(optSel===1)optMalletSpeed=Math.min(OPT_MAX[1],optMalletSpeed+1);
    else if(optSel===2)optSplitFreq=Math.min(OPT_MAX[2],optSplitFreq+1);
    else optGoals=Math.min(OPT_MAX[3],optGoals+1);
    _optionsGpDebounce=6;_gpPrevConfirm=aDown;return;
  }
  if(bDown){showMainMenu();_optionsGpDebounce=30;_gpPrevConfirm=aDown;return;}
  if(aDown&&!_gpPrevConfirm){showMainMenu();_optionsGpDebounce=30;getAC();}
  _gpPrevConfirm=aDown;
}

const _modeAxX={v:0};
function updateModeSelGamepad(){
  const gps=navigator.getGamepads?[...navigator.getGamepads()]:[];
  const gp=gps.find(g=>g);if(!gp){_gpPrevConfirm=false;return;}
  const aDown=gpConfirmDown(gp);
  const bDown=gpBDown(gp);
  if(_modeSelGpDebounce>0){_modeSelGpDebounce--;_gpPrevConfirm=aDown;return;}
  // Left/Right on stick or D-pad to choose card
  const stepX=gpAxisStep(gp,0,_modeAxX);
  if(stepX<0||gpBtn(gp,14)){modeSelSel=0;_modeSelGpDebounce=6;_gpPrevConfirm=aDown;return;}
  if(stepX>0||gpBtn(gp,15)){modeSelSel=1;_modeSelGpDebounce=6;_gpPrevConfirm=aDown;return;}
  if(bDown){showMainMenu();_modeSelGpDebounce=30;_gpPrevConfirm=aDown;return;}
  if(aDown&&!_gpPrevConfirm){
    if(modeSelSel===0)quickStart();
    else showStageSelect();
    _modeSelGpDebounce=30;getAC();
  }
  _gpPrevConfirm=aDown;
}

function confirmP1Char(){
  if(p1Ready)return;
  p1Char=p1CharSel;p1Ready=true;
  if(gameMode==='1p'){
    const opts=CHARS.map((_,i)=>i).filter(i=>i!==p1Char);
    p2Char=opts[Math.floor(Math.random()*opts.length)];
    charselCountdown=55;
  }else if(p2Ready){charselCountdown=55;}
}
function confirmP2Char(){
  if(p2Ready||gameMode==='1p')return;
  p2Char=p2CharSel;p2Ready=true;
  if(p1Ready)charselCountdown=55;
}
function confirmStage(){
  if(stageSelBtn===1){stageIsRandom=true;stageIsInOrder=false;currentStage=Math.floor(Math.random()*STAGES.length);}
  else if(stageSelBtn===2){stageIsRandom=false;stageIsInOrder=true;currentStage=0;}
  else{stageIsRandom=false;stageIsInOrder=false;currentStage=stageSel;}
  showCharSel();
}
function startGame(){
  if(stageIsRandom)currentStage=Math.floor(Math.random()*STAGES.length);
  else if(stageIsInOrder)currentStage=(currentStage+1)%STAGES.length;
  init();
}
const _stageAxY={v:0};
let _gpPrevB=false;
function updateStageSelGamepad(){
  const gps=navigator.getGamepads?[...navigator.getGamepads()]:[];
  const gp=gps.find(g=>g);if(!gp){_gpPrevConfirm=false;_gpPrevB=false;return;}
  const aDown=gpConfirmDown(gp);
  const bDown=gpBDown(gp);
  if(_stageSelGpDebounce>0){_stageSelGpDebounce--;_gpPrevConfirm=aDown;_gpPrevB=bDown;return;}
  const N=STAGES.length;
  const stepY=gpAxisStep(gp,1,_stageAxY);
  if(stageSelBtn===0){
    if(stepY<0){stageSel=(stageSel-1+N)%N;_gpPrevConfirm=aDown;_gpPrevB=bDown;return;}
    if(stepY>0){stageSel=(stageSel+1)%N;_gpPrevConfirm=aDown;_gpPrevB=bDown;return;}
    if(gpBtn(gp,12)){stageSel=(stageSel-1+N)%N;_stageSelGpDebounce=14;_gpPrevConfirm=aDown;_gpPrevB=bDown;return;}
    if(gpBtn(gp,13)){stageSel=(stageSel+1)%N;_stageSelGpDebounce=14;_gpPrevConfirm=aDown;_gpPrevB=bDown;return;}
    if(gpBtn(gp,15)){stageSelBtn=1;_stageSelGpDebounce=14;_gpPrevConfirm=aDown;_gpPrevB=bDown;return;}
  }else{
    if(stepY<0||gpBtn(gp,12)){stageSelBtn=stageSelBtn===2?1:1;_stageSelGpDebounce=14;_gpPrevConfirm=aDown;_gpPrevB=bDown;return;}
    if(stepY>0||gpBtn(gp,13)){stageSelBtn=stageSelBtn===1?2:2;_stageSelGpDebounce=14;_gpPrevConfirm=aDown;_gpPrevB=bDown;return;}
    if(gpBtn(gp,14)){stageSelBtn=0;_stageSelGpDebounce=14;_gpPrevConfirm=aDown;_gpPrevB=bDown;return;}
  }
  if(bDown&&!_gpPrevB){showModeSelect();_stageSelGpDebounce=30;_gpPrevConfirm=aDown;_gpPrevB=bDown;return;}
  if(aDown&&!_gpPrevConfirm){confirmStage();_stageSelGpDebounce=30;getAC();}
  _gpPrevConfirm=aDown;_gpPrevB=bDown;
}
function updateCharSelGamepad(){
  const [gp0,gp1]=getPlayerGPs();  // Joy-Con (L)→P1, Joy-Con (R)→P2
  // Left stick moves virtual cursor (P1 controller)
  if(gp0){
    const ax=Math.abs(gp0.axes[0])>0.15?gp0.axes[0]:0;
    const ay=Math.abs(gp0.axes[1])>0.15?gp0.axes[1]:0;
    gpCursor.x=Math.max(0,Math.min(W,gpCursor.x+ax*8));
    gpCursor.y=Math.max(0,Math.min(H,gpCursor.y+ay*8));
  }
  // Cursor hover selects a character card for P1
  if(gp0&&!p1Ready){
    for(let i=0;i<CHARS.length;i++){const c=charSelCard(i);if(gpCursor.x>=c.x&&gpCursor.x<=c.x+c.w&&gpCursor.y>=c.y&&gpCursor.y<=c.y+c.h)p1CharSel=i;}
  }
  const aDown=gp0?gpConfirmDown(gp0):false;
  const bDown=gp0?gpBDown(gp0):false;
  if(_charselGpDebounce>0){_charselGpDebounce--;_gpPrevConfirm=aDown;return;}
  if(bDown&&!p1Ready){showStageSelect();_charselGpDebounce=30;_gpPrevConfirm=aDown;return;}
  const _gcols=charSelCard(0).cols;
  if(gp0&&!p1Ready){
    if(gpBtn(gp0,14)){p1CharSel=(p1CharSel-1+CHARS.length)%CHARS.length;_charselGpDebounce=14;_gpPrevConfirm=aDown;return;}
    if(gpBtn(gp0,15)){p1CharSel=(p1CharSel+1)%CHARS.length;_charselGpDebounce=14;_gpPrevConfirm=aDown;return;}
    if(gpBtn(gp0,12)){const n=p1CharSel-_gcols;if(n>=0)p1CharSel=n;_charselGpDebounce=14;_gpPrevConfirm=aDown;return;}
    if(gpBtn(gp0,13)){const n=p1CharSel+_gcols;if(n<CHARS.length)p1CharSel=n;_charselGpDebounce=14;_gpPrevConfirm=aDown;return;}
    if(aDown&&!_gpPrevConfirm){confirmP1Char();_charselGpDebounce=30;getAC();}
  }
  _gpPrevConfirm=aDown;
  if(gameMode==='2p'&&gp1&&!p2Ready){
    if(gpBtn(gp1,14)||(gp1.axes[0]<-0.5)){p2CharSel=(p2CharSel-1+CHARS.length)%CHARS.length;_charselGpDebounce=14;return;}
    if(gpBtn(gp1,15)||(gp1.axes[0]>0.5)){p2CharSel=(p2CharSel+1)%CHARS.length;_charselGpDebounce=14;return;}
    if(gpBtn(gp1,12)||(gp1.axes[1]<-0.5)){const n=p2CharSel-_gcols;if(n>=0)p2CharSel=n;_charselGpDebounce=14;return;}
    if(gpBtn(gp1,13)||(gp1.axes[1]>0.5)){const n=p2CharSel+_gcols;if(n<CHARS.length)p2CharSel=n;_charselGpDebounce=14;return;}
    if(gpConfirmDown(gp1)){confirmP2Char();_charselGpDebounce=30;getAC();}
  }
}

function update(){
  if(state==='landing'){frameN++;updateLandingGamepad();return;}
  if(state==='mainmenu'){frameN++;updateMenuGamepad();return;}
  if(state==='options'){frameN++;updateOptionsGamepad();return;}
  if(state==='modesel'){frameN++;updateModeSelGamepad();return;}
  if(state==='menu'){updateMenuGamepad();return;}
  if(state==='over'){if(perfectT>0&&perfectT<PERFECT_DUR){perfectT++;frameN++;return;}updateOverGamepad();return;}
  if(state==='stagesel'){frameN++;updateStageSelGamepad();return;}
  if(state==='charsel'){
    frameN++;
    updateCharSelGamepad();
    if(charselCountdown>0){charselCountdown--;if(charselCountdown===0){applyOptions();init();}}
    return;
  }
  if(state!=='playing')return;
  // Pause toggle — Start button or Escape
  if(gpPauseDebounce>0)gpPauseDebounce--;
  {const _gp=getP1GP()??getP2GP();
   if(_gp?.buttons[9]?.pressed&&gpPauseDebounce===0){paused=!paused;gpPauseDebounce=22;}}
  if(paused)return;
  frameN++;
  arcticAngle+=0.004;
  // Morph shape: update octCut each tick so walls and collision stay in sync
  const _mst=STAGES[currentStage];
  if(_mst.shape==='morph')_mst.octCut=(_mst.maxOctCut||88)*0.5*(1-Math.cos(arcticAngle*(_mst.morphSpeed||0.32)));
  if(_mst.goalScale){
    // Goal grows and shrinks ±30% at medium rate
    const sc=1+_mst.goalScale*Math.sin(arcticAngle*(_mst.goalScaleSpeed||1.0));
    const gh=GOAL_H*sc,mid=H/2;
    gLT=mid-gh/2;gLB=mid+gh/2;gRT=mid-gh/2;gRB=mid+gh/2;
  }else if(_mst.goalShift){const _off=_mst.goalShift*Math.sin(arcticAngle*(_mst.goalShiftSpeed||1.0));gLT=GOAL_TOP+_off;gLB=GOAL_BOT+_off;gRT=GOAL_TOP-_off;gRB=GOAL_BOT-_off;}else{gLT=GOAL_TOP;gLB=GOAL_BOT;gRT=GOAL_TOP;gRB=GOAL_BOT;}
  tickWanderObs();
  tickChicken();
  tickGrandPrix();
  // Update ink clouds (Deep Blue octopus)
  for(const ic of inkClouds){ic.x+=ic.vx;ic.y+=ic.vy;ic.vx*=0.96;ic.vy*=0.96;ic.r+=0.4;ic.life-=ic.decay;}
  inkClouds=inkClouds.filter(ic=>ic.life>0);
  // Update camera shake
  camShakeX*=0.72;camShakeY*=0.72;
  if(Math.abs(camShakeX)<0.05)camShakeX=0;if(Math.abs(camShakeY)<0.05)camShakeY=0;
  // Update score pip animation
  if(scoreAnim.l>0)scoreAnim.l--;if(scoreAnim.r>0)scoreAnim.r--;
  // Update floating texts
  for(const ft of floatTexts){ft.y+=ft.vy;ft.vy*=0.93;ft.life-=0.013;}
  floatTexts=floatTexts.filter(ft=>ft.life>0);
  // Update puck name timer
  if(puckNameT>0)puckNameT--;
  // Track new puck type for name card
  if(pucks.length&&pucks[0].typeIdx!==lastPuckIdx){lastPuckIdx=pucks[0].typeIdx;puckNameT=90;}

  // slow-mo: only run physics every 5th frame
  if(slowMoTimer>0){
    slowMoTimer--;
    for(const ring of rings){ring.r+=ring.speed*.3;ring.hue+=2;ring.life=Math.max(0,1-ring.r/ring.maxR);}
    rings=rings.filter(r=>r.life>0);
    for(const p of parts){p.x+=p.vx*.2;p.y+=p.vy*.2;p.vy+=.02;p.life-=p.decay*.2;}
    parts=parts.filter(p=>p.life>0);
    if(flashT>0)flashT--;
    if(frameN%5!==0)return;
  }else{
    for(const ring of rings){ring.r+=ring.speed;ring.hue+=3;ring.life=Math.max(0,1-ring.r/ring.maxR);}
    rings=rings.filter(r=>r.life>0);
  }

  const MS=7.2+optMalletSpeed*0.4;
  const gp=getGPInput();
  // Left mallet — WASD or gamepad or touch
  const lky=(keys['w']||keys['W'])?-1:(keys['s']||keys['S'])?1:0;
  const lkx=(keys['a']||keys['A'])?-1:(keys['d']||keys['D'])?1:0;
  if(touchL&&LM.alive){
    // Move toward touch point — speed scales with distance
    const tdx=touchL.x-LM.x, tdy=touchL.y-LM.y, td=Math.hypot(tdx,tdy);
    const ts=Math.min(MS,td*0.2);
    LM.vx=td>2?tdx/td*ts:0; LM.vy=td>2?tdy/td*ts:0;
  }else{
    LM.vy=(lky||gp.ly)*MS; LM.vx=(lkx||gp.lx)*MS;
  }
  // Right mallet — NPC in 1P mode, human input (keys/gamepad/touch) in 2P mode
  if(gameMode==='1p'){
    if(touchR&&RM.alive){
      // In 1P, let the player use right-side touch to override NPC (play both sides)
      const tdx=touchR.x-RM.x, tdy=touchR.y-RM.y, td=Math.hypot(tdx,tdy);
      const ts=Math.min(MS,td*0.2);
      RM.vx=td>2?tdx/td*ts:0; RM.vy=td>2?tdy/td*ts:0;
    }else{
      updateNPC();
    }
  }else{
    if(touchR&&RM.alive){
      const tdx=touchR.x-RM.x, tdy=touchR.y-RM.y, td=Math.hypot(tdx,tdy);
      const ts=Math.min(MS,td*0.2);
      RM.vx=td>2?tdx/td*ts:0; RM.vy=td>2?tdy/td*ts:0;
    }else{
      const rky=(keys['ArrowUp'])?-1:(keys['ArrowDown'])?1:0;
      const rkx=(keys['ArrowLeft'])?-1:(keys['ArrowRight'])?1:0;
      RM.vy=(rky||gp.ry)*MS; RM.vx=(rkx||gp.rx)*MS;
    }
  }
  if(LM.alive){LM.x+=LM.vx;LM.y+=LM.vy;clampM(LM);LM.sx*=.65;LM.sy*=.65;}
  if(RM.alive){RM.x+=RM.vx;RM.y+=RM.vy;clampM(RM);RM.sx*=.65;RM.sy*=.65;}

  // Emote ticks + random triggers
  for(const m of[LM,RM]){
    if(m.emoteTimer>0){m.emoteTimer--;if(m.emoteTimer===0)m.emote=null;}
    if(!m.emote){
      if(m.nextEmote>0)m.nextEmote--;
      else{const ue=CHARS[m.charIdx].uniqueEmote;const opts=ue?['wink','wink','surprised','happy',ue]:['wink','wink','surprised','happy'];m.emote=opts[Math.floor(Math.random()*opts.length)];m.emoteTimer=m.emote==='wink'?50:m.emote==='surprised'?45:65;m.winkLeft=Math.random()<0.5;m.nextEmote=240+Math.floor(Math.random()*240);}
    }
  }

  // Power-up spawn timer — earlier when players are hurting, later at full HP
  if(!powerUp){
    if(powerUpTimer>0){powerUpTimer--;}
    else{
      const px=W/2+(Math.random()*2-1)*W*.14;
      const py=H*.22+Math.random()*H*.56;
      powerUp={x:px,y:py,r:PUCK_R*1.4,glimmerT:0};
    }
  }

  const next=[];let scored=false;
  for(const p of pucks){
    p.trail.push({x:p.x,y:p.y});
    if(p.trail.length>10)p.trail.shift();
    p.vx+=(Math.random()-.5)*.18;p.vy+=(Math.random()-.5)*.18;
    // Lava Lamp terrain: globs act as 3D hills that deflect the puck
    if(STAGES[currentStage].texture==='lavaglob'){
      const globs=_lavaGlobs();
      for(const g of globs){
        const dx=p.x-g.x,dy=p.y-g.y,dist=Math.hypot(dx,dy);
        if(dist<g.r*1.3&&dist>1){
          // Strength peaks at glob edge, falls off outside — like rolling off a dome
          const t=dist/(g.r*1.3);
          const force=0.35*Math.sin(t*Math.PI); // bell curve: 0 at center, peak at ~half, 0 at edge
          p.vx+=dx/dist*force;
          p.vy+=dy/dist*force;
        }
      }
    }
    let spd=Math.hypot(p.vx,p.vy);
    if(spd>SPEED_MAX){p.vx*=SPEED_MAX/spd;p.vy*=SPEED_MAX/spd;}
    if(spd<3.5){p.vx*=3.5/spd;p.vy*=3.5/spd;}
    p.x+=p.vx;p.y+=p.vy;p.spin+=p.spinV;p.spinV*=.97;

    let doSplit=false;
    const stShape=STAGES[currentStage].shape||'rect';
    if(stShape==='oval'){
      // Ellipse boundary — handles all four sides + goal detection
      const a=W/2-BW-PUCK_R, b=H/2-BW-PUCK_R;
      const dx=p.x-W/2, dy=p.y-H/2;
      if((dx/a)*(dx/a)+(dy/b)*(dy/b)>1){
        if(dx<0&&p.y>gLT&&p.y<gLB){
          if(!scored){scores.r++;scoreAnim.r=20;burst(p.x,p.y,'#ff5555',22);resetMallet(RM);resetMallet(LM);rainbowBurst(RM.x,RM.y);flashT=22;scored=true;addShake(8);playGoal();addFloat(W/2,H/2-30,'GOAL!',C_CAPY);puckNameT=90;triggerEmote(RM,'love',120);triggerEmote(LM,'surprised',80);if(scores.r>=SCORE_TO_WIN){state='over';if(scores.l===0)perfectT=1;}}
          continue;
        }
        if(dx>0&&p.y>gRT&&p.y<gRB){
          if(!scored){scores.l++;scoreAnim.l=20;burst(p.x,p.y,'#5588ff',22);resetMallet(LM);resetMallet(RM);rainbowBurst(LM.x,LM.y);flashT=22;scored=true;addShake(8);playGoal();addFloat(W/2,H/2-30,'GOAL!',C_CAT);puckNameT=90;triggerEmote(LM,'love',120);triggerEmote(RM,'surprised',80);if(scores.l>=SCORE_TO_WIN){state='over';if(scores.r===0)perfectT=1;}}
          continue;
        }
        const theta=Math.atan2(dy/b,dx/a);
        p.x=W/2+Math.cos(theta)*a; p.y=H/2+Math.sin(theta)*b;
        const gx=(p.x-W/2)/(a*a),gy=(p.y-H/2)/(b*b),gl=Math.hypot(gx,gy);
        const nx=gx/gl,ny=gy/gl,dot=p.vx*nx+p.vy*ny;
        if(dot>0){p.vx-=2*dot*nx;p.vy-=2*dot*ny;}
        const spd2=Math.hypot(p.vx,p.vy);
        if(spd2>0.1){const ang=Math.atan2(p.vy,p.vx)+(Math.random()*2-1)*WRAND;p.vx=Math.cos(ang)*spd2;p.vy=Math.sin(ang)*spd2;}
        p.spinV=(Math.random()*2-1)*.35;
        p.wallHits++;playWall();addShake(1.2);
        if(p.wallHits>=SPLIT_THRESHOLD){addShake(5);doSplit=true;}
      }
    }else{
      // Rectangular top/bottom walls
      if(p.y-PUCK_R<BW){p.y=BW+PUCK_R;doSplit=wallBounce(p,'y',1)||doSplit;}
      if(p.y+PUCK_R>H-BW){p.y=H-BW-PUCK_R;doSplit=wallBounce(p,'y',-1)||doSplit;}
      // Left wall + goal
      if(p.x-PUCK_R<BW){
        if(p.y>gLT&&p.y<gLB&&!gpShieldBlock(p)){
          if(!scored){scores.r++;scoreAnim.r=20;burst(p.x,p.y,'#ff5555',22);resetMallet(RM);resetMallet(LM);rainbowBurst(RM.x,RM.y);flashT=22;scored=true;addShake(8);playGoal();addFloat(W/2,H/2-30,'GOAL!',C_CAPY);puckNameT=90;triggerEmote(RM,'love',120);triggerEmote(LM,'surprised',80);if(scores.r>=SCORE_TO_WIN){state='over';if(scores.l===0)perfectT=1;}}
          continue;
        }else if(!(p.y>gLT&&p.y<gLB)){p.x=BW+PUCK_R;doSplit=wallBounce(p,'x',1)||doSplit;}
      }
      // Right wall + goal
      if(p.x+PUCK_R>W-BW){
        if(p.y>gRT&&p.y<gRB&&!gpShieldBlock(p)){
          if(!scored){scores.l++;scoreAnim.l=20;burst(p.x,p.y,'#5588ff',22);resetMallet(LM);resetMallet(RM);rainbowBurst(LM.x,LM.y);flashT=22;scored=true;addShake(8);playGoal();addFloat(W/2,H/2-30,'GOAL!',C_CAT);puckNameT=90;triggerEmote(LM,'love',120);triggerEmote(RM,'surprised',80);if(scores.l>=SCORE_TO_WIN){state='over';if(scores.r===0)perfectT=1;}}
          continue;
        }else if(!(p.y>gRT&&p.y<gRB)){p.x=W-BW-PUCK_R;doSplit=wallBounce(p,'x',-1)||doSplit;}
      }
      // Octagon corner diagonal bounces
      if(stShape==='oct'||stShape==='morph')doSplit=octCornerBounce(p)||doSplit;
    }

    if(LM.alive)hitMallet(LM,p);
    if(RM.alive)hitMallet(RM,p);
    STAGES[currentStage].obstacles.forEach((o,oi)=>hitObstacle(o,oi,p));
    gpBoosterHit(p);

    // Power-up collision
    if(powerUp&&Math.hypot(p.x-powerUp.x,p.y-powerUp.y)<PUCK_R+powerUp.r){
      const m=p.lastHitter;
      if(m&&m.alive){
        m.hits=Math.max(0,m.hits-5);
        m.r=Math.max(9,FULL_R*(1-m.hits/MAX_HITS));
        addFloat(powerUp.x,powerUp.y-36,'+5',CHARS[m.charIdx].col);
        triggerEmote(m,'love',90);
        burst(powerUp.x,powerUp.y,CHARS[m.charIdx].col,24);
      }else{burst(powerUp.x,powerUp.y,'#40ffcc',20);}
      addShake(3.5);
      // Next spawn: HP-aware (10–15s): lower HP → sooner
      const avgHp=1-(LM.hits+RM.hits)/(MAX_HITS*2);
      powerUpTimer=Math.round(600+avgHp*300);
      powerUp=null;
    }

    if(doSplit){
      if(isGrandPrix()&&!gpMouth){
        // Wall mouth eats the puck instead of normal split
        const side=p.x<W/2?'l':'r';
        const mx=side==='l'?BW:W-BW;
        gpMouth={x:mx,y:Math.max(BW+50,Math.min(H-BW-50,p.y)),side:side,t:0,lastHitter:p.lastHitter};
        burst(p.x,p.y,'#ff4444',16);addShake(5);addFloat(p.x,p.y-30,'NOM!','#ff4444');
        // Puck is consumed — don't push to next
      }else{burst(p.x,p.y,'#ffffff',18);next.push(...splitPuck(p));}
    }else next.push(p);
  }
  if(STAGES[currentStage].name==='Chicken Coop'&&chickenPhase!=='off'){
    if(scored){chickenEggTimer=Math.min(chickenEggTimer,180);} // quick next egg after goal
    pucks=next.length?next:[];
  }else if(isGrandPrix()&&gpMouth){
    // Wall mouth is chewing — don't auto-spawn, mouth will spit pucks out
    pucks=scored?[makePuck()]:(next.length?next:[]);
  }else{
    pucks=scored?[makePuck()]:(next.length?next:[makePuck()]);
  }

  // Puck-to-puck elastic collisions
  for(let i=0;i<pucks.length;i++){
    for(let j=i+1;j<pucks.length;j++){
      const a=pucks[i],b=pucks[j];
      const dx=b.x-a.x,dy=b.y-a.y,dist=Math.hypot(dx,dy),minD=PUCK_R*2;
      if(dist>=minD||dist<0.01)continue;
      // Separate
      const overlap=(minD-dist)/2,nx=dx/dist,ny=dy/dist;
      a.x-=nx*overlap;a.y-=ny*overlap;
      b.x+=nx*overlap;b.y+=ny*overlap;
      // Exchange velocity along collision normal (equal-mass elastic)
      const dvx=a.vx-b.vx,dvy=a.vy-b.vy;
      const dot=dvx*nx+dvy*ny;
      if(dot<=0)continue; // already separating
      a.vx-=dot*nx;a.vy-=dot*ny;
      b.vx+=dot*nx;b.vy+=dot*ny;
      playWall();addShake(1.0);
    }
  }

  for(const p of parts){p.x+=p.vx;p.y+=p.vy;p.vy+=.12;p.life-=p.decay;}
  parts=parts.filter(p=>p.life>0);
  if(flashT>0)flashT--;
}

// ── Render ───────────────────────────────────────────────────────────
function draw(){
  if(state==='landing'){drawLanding();return;}
  if(state==='mainmenu'){drawMainMenu();return;}
  if(state==='options'){drawOptions();return;}
  if(state==='modesel'){drawModeSelect();return;}
  if(state==='menu'){drawMenu();return;}
  if(state==='charsel'){drawCharSel();return;}
  if(state==='stagesel'){drawStageSelect();return;}
  ctx.clearRect(0,0,W,H);
  if(flashT>0){ctx.fillStyle=`rgba(255,240,180,${flashT/22*.25})`;ctx.fillRect(0,0,W,H);}
  // Camera shake wrapper
  ctx.save();
  ctx.translate(camShakeX,camShakeY);
  drawTable();
  drawObstacles();
  // Octopus ink clouds (purely visual)
  for(const ic of inkClouds){
    const ig=ctx.createRadialGradient(ic.x,ic.y,0,ic.x,ic.y,ic.r);
    ig.addColorStop(0,`hsla(${ic.hue},70%,15%,${ic.life*0.45})`);
    ig.addColorStop(0.4,`hsla(${ic.hue},60%,20%,${ic.life*0.3})`);
    ig.addColorStop(1,`hsla(${ic.hue},50%,25%,0)`);
    ctx.fillStyle=ig;ctx.beginPath();ctx.arc(ic.x,ic.y,ic.r,0,Math.PI*2);ctx.fill();
  }
  drawGrandPrix();
  drawPowerUp();
  drawScores();
  drawRings();
  drawParts();
  // Mallet shadows behind everything
  drawMalletShadow(LM);drawMalletShadow(RM);
  ctx.save();ctx.translate(LM.sx,LM.sy);CHARS[LM.charIdx].draw(LM);ctx.restore();
  ctx.save();ctx.translate(RM.sx,RM.sy);CHARS[RM.charIdx].draw(RM);ctx.restore();
  for(const p of pucks)drawPuck(p);
  drawHitLabels();
  drawPuckName();
  drawFloatTexts();
  ctx.restore(); // end camera shake
  if(state==='over')drawOver();
  if(paused){
    ctx.fillStyle='rgba(0,0,0,0.52)';ctx.fillRect(0,0,W,H);
    ctx.save();
    ctx.shadowColor='rgba(255,220,80,0.8)';ctx.shadowBlur=28;
    ctx.font='bold 54px Nunito,monospace';ctx.textAlign='center';ctx.fillStyle='#ffe566';
    ctx.fillText('PAUSED',W/2,H/2-14);
    ctx.restore();
    ctx.font='18px Nunito,monospace';ctx.textAlign='center';ctx.fillStyle='rgba(255,255,255,0.6)';
    ctx.fillText('Start / Esc to resume',W/2,H/2+26);
  }
}

function updateGPDebug(){}

function loop(){update();draw();requestAnimationFrame(loop);}
showLanding();
loop();

// Register service worker for PWA / offline support
if('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js');
