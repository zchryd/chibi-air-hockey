// ── Draw: mallet shadow ───────────────────────────────────────────────
function drawMalletShadow(m){
  if(!m.alive)return;
  ctx.save();
  ctx.filter='blur(7px)';
  ctx.fillStyle='rgba(0,0,0,0.32)';
  ctx.beginPath();ctx.ellipse(m.x+6,m.y+9,m.r*.9,m.r*.45,0,0,Math.PI*2);ctx.fill();
  ctx.restore();
}

// ── Draw: floating texts ──────────────────────────────────────────────
function drawFloatTexts(){
  ctx.save();
  ctx.textAlign='center';
  for(const ft of floatTexts){
    ctx.globalAlpha=ft.life;
    ctx.font='bold 26px Nunito,monospace';
    ctx.strokeStyle='rgba(0,0,0,0.7)';ctx.lineWidth=5;
    ctx.strokeText(ft.txt,ft.x,ft.y);
    ctx.fillStyle=ft.col;ctx.fillText(ft.txt,ft.x,ft.y);
  }
  ctx.globalAlpha=1;ctx.restore();
}

// ── Draw: puck ───────────────────────────────────────────────────────
function drawPuck(p){
  // Tapered ribbon trail
  if(p.trail.length>=2){
    for(let i=1;i<p.trail.length;i++){
      const t0=p.trail[i-1],t1=p.trail[i],f=i/p.trail.length;
      const w=PUCK_R*f*.55;
      const dx=t1.x-t0.x,dy=t1.y-t0.y,len=Math.hypot(dx,dy)||1;
      const nx=-dy/len,ny=dx/len;
      ctx.beginPath();
      ctx.moveTo(t0.x+nx*w*.6,t0.y+ny*w*.6);ctx.lineTo(t1.x+nx*w,t1.y+ny*w);
      ctx.lineTo(t1.x-nx*w,t1.y-ny*w);ctx.lineTo(t0.x-nx*w*.6,t0.y-ny*w*.6);
      ctx.closePath();ctx.fillStyle=`rgba(210,190,255,${f*.18})`;ctx.fill();
    }
  }
  // Velocity-direction shadow
  const spd=Math.hypot(p.vx,p.vy),sang=Math.atan2(p.vy,p.vx),slen=Math.min(spd*1.8,18);
  ctx.fillStyle='rgba(0,0,0,0.22)';
  ctx.beginPath();ctx.ellipse(p.x+Math.cos(sang)*slen*.4,p.y+Math.sin(sang)*slen*.4+5,PUCK_R+slen*.25,PUCK_R*.38,sang,0,Math.PI*2);ctx.fill();
  // Puck sprite (clipped)
  ctx.save();
  ctx.beginPath();ctx.arc(p.x,p.y,PUCK_R,0,Math.PI*2);ctx.clip();
  PT[p.typeIdx].d(ctx,p.x,p.y,PUCK_R);
  ctx.restore();
  // Rim highlight
  ctx.strokeStyle='rgba(255,255,255,0.18)';ctx.lineWidth=2;
  ctx.beginPath();ctx.arc(p.x-PUCK_R*.15,p.y-PUCK_R*.15,PUCK_R*.7,Math.PI*1.1,Math.PI*1.8);ctx.stroke();
}

// ── Draw: particles & rings ──────────────────────────────────────────
function drawParts(){
  for(const p of parts){ctx.globalAlpha=p.life;ctx.fillStyle=p.col;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();ctx.fillStyle='#ffffffcc';ctx.beginPath();ctx.arc(p.x,p.y,p.r*.4,0,Math.PI*2);ctx.fill();}
  ctx.globalAlpha=1;
}
function drawRings(){
  for(const ring of rings){ctx.globalAlpha=ring.life*.8;ctx.strokeStyle=`hsl(${ring.hue},100%,65%)`;ctx.lineWidth=6*ring.life;ctx.beginPath();ctx.arc(ring.x,ring.y,ring.r,0,Math.PI*2);ctx.stroke();}
  ctx.globalAlpha=1;ctx.lineWidth=1;
}

// ── Draw: scores & labels ────────────────────────────────────────────
function drawScores(){
  const PR=7, GAP=18, Y=20;
  for(let i=0;i<SCORE_TO_WIN;i++){
    // P1 pips — top-left, left to right
    const filled_l=i<scores.l;
    const sl=(i===scores.l-1&&scoreAnim.l>0)?1+0.55*(scoreAnim.l/20):1;
    const pxl=BW+10+i*GAP;
    ctx.save();ctx.translate(pxl,Y);ctx.scale(sl,sl);
    if(filled_l){ctx.save();ctx.shadowColor=C_CAT;ctx.shadowBlur=10;}
    ctx.fillStyle=filled_l?C_CAT:'rgba(255,255,255,0.13)';
    ctx.beginPath();ctx.arc(0,0,PR,0,Math.PI*2);ctx.fill();
    if(filled_l){ctx.fillStyle='rgba(255,255,255,0.45)';ctx.beginPath();ctx.arc(-2.5,-2.5,2.5,0,Math.PI*2);ctx.fill();ctx.restore();}
    ctx.restore();

    // P2 pips — top-right, right to left
    const filled_r=i<scores.r;
    const sr=(i===scores.r-1&&scoreAnim.r>0)?1+0.55*(scoreAnim.r/20):1;
    const pxr=W-BW-10-i*GAP;
    ctx.save();ctx.translate(pxr,Y);ctx.scale(sr,sr);
    if(filled_r){ctx.save();ctx.shadowColor=C_CAPY;ctx.shadowBlur=10;}
    ctx.fillStyle=filled_r?C_CAPY:'rgba(255,255,255,0.13)';
    ctx.beginPath();ctx.arc(0,0,PR,0,Math.PI*2);ctx.fill();
    if(filled_r){ctx.fillStyle='rgba(255,255,255,0.45)';ctx.beginPath();ctx.arc(-2.5,-2.5,2.5,0,Math.PI*2);ctx.fill();ctx.restore();}
    ctx.restore();
  }
}
function drawHitLabels(){}
function drawPuckName(){
  if(!pucks.length)return;
  const alpha=Math.min(1,puckNameT/30)*Math.max(0,Math.min(1,(puckNameT)/20));
  if(alpha<=0)return;
  const name=PT[pucks[0].typeIdx].n;
  const cw=ctx.measureText(name).width+28,ch=26,cx=W/2,cy=H-BW-12;
  ctx.save();ctx.globalAlpha=alpha;
  ctx.fillStyle='rgba(0,0,0,0.52)';
  roundRect(ctx,cx-cw/2,cy-ch/2,cw,ch,8);ctx.fill();
  ctx.font='bold 13px Nunito,monospace';ctx.textAlign='center';ctx.fillStyle='rgba(255,255,255,0.92)';
  ctx.fillText(name,cx,cy+5);
  ctx.restore();
}
function charSelCard(i){
  const cardW=108,cardH=148,gap=12,rowGap=14;
  const cols=Math.ceil(CHARS.length/2),rows=CHARS.length>cols?2:1;
  const totalW=cols*cardW+(cols-1)*gap;
  const totalH=rows*cardH+(rows-1)*rowGap;
  const sx=(W-totalW)/2,sy=H/2-totalH/2+10;
  const row=Math.floor(i/cols),col=i%cols;
  // Center the bottom row if it has fewer items
  const itemsInRow=row===0?cols:CHARS.length-cols;
  const rowW=itemsInRow*cardW+(itemsInRow-1)*gap;
  const rowSx=(W-rowW)/2;
  return{x:rowSx+col*(cardW+gap),y:sy+row*(cardH+rowGap),w:cardW,h:cardH,cols};
}
function drawCharSel(){
  ctx.clearRect(0,0,W,H);
  drawTable();
  ctx.fillStyle='rgba(8,4,20,0.84)';ctx.fillRect(0,0,W,H);

  ctx.textAlign='center';
  ctx.font='900 40px Nunito,monospace';
  ctx.strokeStyle='rgba(0,0,0,0.6)';ctx.lineWidth=7;
  ctx.strokeText('CHOOSE YOUR FIGHTER',W/2,60);
  const tg=ctx.createLinearGradient(0,28,0,64);
  tg.addColorStop(0,'#ffe566');tg.addColorStop(1,'#ff8c3a');
  ctx.fillStyle=tg;ctx.fillText('CHOOSE YOUR FIGHTER',W/2,60);

  CHARS.forEach((ch,i)=>{
    const c=charSelCard(i);
    const cx=c.x,cardY=c.y,cardW=c.w,cardH=c.h;
    const p1s=p1CharSel===i,p2s=gameMode==='2p'&&p2CharSel===i;
    const p1r=p1Ready&&p1Char===i,p2r=p2Ready&&p2Char===i;
    const sel=p1s||p2s;
    // Glow
    if(sel){ctx.save();ctx.shadowColor=p1s&&p2s?'rgba(255,180,255,0.55)':p1s?'rgba(255,210,60,0.55)':'rgba(80,180,255,0.55)';ctx.shadowBlur=26;}
    ctx.fillStyle=sel?'rgba(255,255,255,0.13)':'rgba(255,255,255,0.06)';
    roundRect(ctx,cx,cardY,cardW,cardH,14);ctx.fill();
    if(sel)ctx.restore();
    // Border(s)
    if(p1s){ctx.strokeStyle=p1Ready?'#44ff88':'#ffcc44';ctx.lineWidth=3;roundRect(ctx,cx,cardY,cardW,cardH,14);ctx.stroke();}
    if(p2s&&gameMode==='2p'){ctx.strokeStyle=p2Ready?'#44ff88':'#66aaff';ctx.lineWidth=p1s?2:3;roundRect(ctx,cx+2,cardY+2,cardW-4,cardH-4,12);ctx.stroke();}
    if(!sel){ctx.strokeStyle='rgba(255,255,255,0.1)';ctx.lineWidth=1.5;roundRect(ctx,cx,cardY,cardW,cardH,14);ctx.stroke();}
    // Character preview
    const pm={x:cx+cardW/2,y:cardY+60,r:28,charIdx:i,hits:0,alive:true,vx:0,vy:0,sx:0,sy:0,side:'l',preview:true};
    drawMalletShadow(pm);
    CHARS[i].draw(pm);
    // Name
    ctx.font='bold 12px Nunito,monospace';ctx.textAlign='center';
    ctx.fillStyle='rgba(255,255,255,0.88)';
    ctx.fillText(ch.name,cx+cardW/2,cardY+cardH-28);
    // Ready badge
    if(p1r||p2r){ctx.font='bold 11px Nunito,monospace';ctx.fillStyle='#44ff88';ctx.fillText('READY!',cx+cardW/2,cardY+cardH-14);}
    // P label
    const labs=[];
    if(p1s)labs.push({t:'P1',c:'#ffcc44'});
    if(p2s&&gameMode==='2p')labs.push({t:'P2',c:'#66aaff'});
    ctx.font='bold 11px Nunito,monospace';
    labs.forEach((l,li)=>{ctx.fillStyle=l.c;ctx.fillText(l.t,cx+cardW/2+(li-(labs.length-1)/2)*24,cardY+cardH+14);});
  });

  // "Get Ready!" countdown overlay
  if(charselCountdown>0){
    const a=Math.min(1,charselCountdown/15);
    ctx.save();ctx.globalAlpha=a;
    ctx.font='900 52px Nunito,monospace';ctx.textAlign='center';
    ctx.strokeStyle='rgba(0,0,0,0.6)';ctx.lineWidth=8;ctx.strokeText('GET READY!',W/2,H/2+20);
    ctx.fillStyle='#ffe566';ctx.fillText('GET READY!',W/2,H/2+20);
    ctx.restore();
  }

  // Instructions
  ctx.textAlign='center';
  if(gameMode==='1p'){
    ctx.font='bold 13px Nunito,monospace';ctx.fillStyle='rgba(255,200,80,0.72)';
    ctx.fillText('A / D  or  ← →  to browse  ·  Space or Enter to confirm  ·  Esc — back',W/2,H-28);
  }else{
    ctx.font='bold 13px Nunito,monospace';ctx.fillStyle='rgba(255,200,80,0.72)';
    ctx.fillText('P1: A/D to browse · Space to confirm',W/2,H-46);
    ctx.fillStyle='rgba(100,180,255,0.72)';
    ctx.fillText('P2: ← → to browse · Enter to confirm  ·  Esc — back',W/2,H-26);
  }
  // Gamepad virtual cursor + debug overlay
  {const gps=navigator.getGamepads?[...navigator.getGamepads()]:[];const gp=gps.find(g=>g);if(gp){ctx.save();ctx.beginPath();ctx.arc(gpCursor.x,gpCursor.y,9,0,Math.PI*2);ctx.fillStyle='rgba(255,200,80,0.92)';ctx.shadowColor='rgba(255,220,80,0.7)';ctx.shadowBlur=14;ctx.fill();ctx.strokeStyle='rgba(0,0,0,0.5)';ctx.lineWidth=2;ctx.stroke();ctx.restore();}}
}
function drawStageSelect(){
  ctx.clearRect(0,0,W,H);
  const selSt=STAGES[stageSel];
  const bg=ctx.createLinearGradient(0,0,W,H);
  bg.addColorStop(0,'#060310');bg.addColorStop(1,selSt?selSt.felt1+'cc':'#060310');
  ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);

  const N=STAGES.length;
  const stageEmojis=['🏒','🚀','🌋','❄️','🕹️','🍔','💎','🌊','⚙️','🔺','🏛️','🌀','🔷','🔵','🍀','🌀','💎','🌊','🐔','🏎️','🔮','🦈'];
  const listX=24,listW=266,listY=60,listItemH=22;
  const maxVis=Math.floor((H-listY-40)/listItemH); // visible rows that fit
  const scrollOff=Math.max(0,Math.min(stageSel-Math.floor(maxVis/2),N-maxVis));

  // Title
  ctx.textAlign='center';ctx.font='900 30px Nunito,monospace';
  ctx.strokeStyle='rgba(0,0,0,0.7)';ctx.lineWidth=5;ctx.strokeText('SELECT STAGE',W/2,38);
  const hg=ctx.createLinearGradient(0,16,0,40);hg.addColorStop(0,'#ffe566');hg.addColorStop(1,'#ff8c3a');
  ctx.fillStyle=hg;ctx.fillText('SELECT STAGE',W/2,38);

  // ── Left panel: scrollable list ──
  const visCount=Math.min(maxVis,N);
  const panelH=visCount*listItemH+8;
  ctx.fillStyle='rgba(0,0,0,0.42)';roundRect(ctx,listX-4,listY-4,listW+8,panelH,10);ctx.fill();
  ctx.strokeStyle=stageSelBtn===0?'rgba(255,220,80,0.25)':'rgba(255,255,255,0.08)';ctx.lineWidth=1;
  roundRect(ctx,listX-4,listY-4,listW+8,panelH,10);ctx.stroke();

  // Scroll indicators
  if(scrollOff>0){
    ctx.fillStyle='rgba(255,220,80,0.4)';ctx.textAlign='center';ctx.font='10px Nunito,monospace';
    ctx.fillText('▲ more',listX+listW/2,listY-6);
  }
  if(scrollOff+maxVis<N){
    ctx.fillStyle='rgba(255,220,80,0.4)';ctx.textAlign='center';ctx.font='10px Nunito,monospace';
    ctx.fillText('▼ more',listX+listW/2,listY+panelH+4);
  }

  ctx.save();
  ctx.beginPath();ctx.rect(listX-4,listY-4,listW+8,panelH);ctx.clip();
  for(let vi=0;vi<visCount;vi++){
    const i=vi+scrollOff;
    if(i>=N)break;
    const iy=listY+vi*listItemH;
    const sel=stageSel===i&&stageSelBtn===0;
    const st=STAGES[i];
    if(sel){
      ctx.fillStyle=`${st.felt0}99`;roundRect(ctx,listX-2,iy,listW+4,listItemH,5);ctx.fill();
      ctx.strokeStyle=st.borderLtCol||'#ffcc44';ctx.lineWidth=1.5;
      roundRect(ctx,listX-2,iy,listW+4,listItemH,5);ctx.stroke();
    }
    const em=stageEmojis[i]||'⬜';
    ctx.font='11px serif';ctx.textAlign='center';ctx.fillText(em,listX+10,iy+listItemH-5);
    ctx.font=`${sel?'bold':'normal'} 12px Nunito,monospace`;
    ctx.fillStyle=sel?(st.gpostLt||'#ffe566'):(stageSel===i?'rgba(255,255,255,0.85)':'rgba(255,255,255,0.6)');
    ctx.textAlign='left';
    ctx.fillText(st.name,listX+24,iy+listItemH-5);
    // Number label
    ctx.font='10px Nunito,monospace';ctx.fillStyle='rgba(255,255,255,0.25)';ctx.textAlign='right';
    ctx.fillText(String(i+1),listX+listW-4,iy+listItemH-5);
  }
  ctx.restore();

  // ── Right side: preview on top, buttons below ──
  const px=listX+listW+20,pw=W-px-20,py=listY;
  const prevH=Math.min(180,Math.round((H-listY-40)*0.42));
  // Stage preview box
  if(selSt){
    const g=ctx.createLinearGradient(px,py,px,py+prevH);
    g.addColorStop(0,selSt.felt0);g.addColorStop(1,selSt.felt1);
    ctx.fillStyle=g;roundRect(ctx,px,py,pw,prevH,10);ctx.fill();
    ctx.save();ctx.shadowColor=selSt.borderGlow||'transparent';ctx.shadowBlur=16;
    ctx.strokeStyle=selSt.borderLtCol||'rgba(255,255,255,0.2)';ctx.lineWidth=2.5;
    roundRect(ctx,px,py,pw,prevH,10);ctx.stroke();ctx.restore();
    // Mini table layout
    const mp=14,mw=pw-mp*2,mh=prevH-mp*2,mx2=px+mp,my2=py+mp;
    const mShape=selSt.shape||'rect';
    ctx.strokeStyle=selSt.lineCol||'rgba(255,255,255,0.15)';ctx.lineWidth=1.5;
    if(mShape==='oval'){ctx.beginPath();ctx.ellipse(mx2+mw/2,my2+mh/2,mw/2,mh/2,0,0,Math.PI*2);ctx.stroke();}
    else if(mShape==='oct'||mShape==='morph'){
      const octC=(selSt.octCut||70)*(mw/(W-BW*2));
      ctx.beginPath();ctx.moveTo(mx2+octC,my2);ctx.lineTo(mx2+mw-octC,my2);ctx.lineTo(mx2+mw,my2+octC);
      ctx.lineTo(mx2+mw,my2+mh-octC);ctx.lineTo(mx2+mw-octC,my2+mh);ctx.lineTo(mx2+octC,my2+mh);
      ctx.lineTo(mx2,my2+mh-octC);ctx.lineTo(mx2,my2+octC);ctx.closePath();ctx.stroke();
    }else{roundRect(ctx,mx2,my2,mw,mh,4);ctx.stroke();}
    ctx.strokeStyle=selSt.lineCol||'rgba(255,255,255,0.1)';ctx.lineWidth=1;
    ctx.beginPath();ctx.moveTo(mx2+mw/2,my2);ctx.lineTo(mx2+mw/2,my2+mh);ctx.stroke();
    ctx.beginPath();ctx.arc(mx2+mw/2,my2+mh/2,mh*.18,0,Math.PI*2);ctx.stroke();
    const gh=mh*0.3,gt=my2+mh/2-gh/2;
    ctx.strokeStyle=selSt.gpostCol||'rgba(255,100,100,0.6)';ctx.lineWidth=3;
    ctx.beginPath();ctx.moveTo(mx2,gt);ctx.lineTo(mx2,gt+gh);ctx.stroke();
    ctx.beginPath();ctx.moveTo(mx2+mw,gt);ctx.lineTo(mx2+mw,gt+gh);ctx.stroke();
    ctx.fillStyle=selSt.gpostLt||'#ff9090';
    for(const[gx,gy]of[[mx2,gt],[mx2,gt+gh],[mx2+mw,gt],[mx2+mw,gt+gh]]){ctx.beginPath();ctx.arc(gx,gy,3,0,Math.PI*2);ctx.fill();}
    // Obstacles
    const obs=selSt.obstacles;
    if(obs.length){
      ctx.save();
      for(let oi=0;oi<obs.length;oi++){
        const o=obs[oi];let ox2,oy2;
        if(o.motion){const p2=obsPos(o,oi);ox2=mx2+(p2.x-BW)/(W-BW*2)*mw;oy2=my2+(p2.y-BW)/(H-BW*2)*mh;}
        else if(o.rx!==undefined){ox2=mx2+o.rx*mw;oy2=my2+o.ry*mh;}
        else if(o.cx!==undefined){ox2=mx2+o.cx*mw;oy2=my2+o.cy*mh;}
        if(ox2!==undefined&&!isNaN(ox2)){
          const obsR=Math.max(4,(o.r??o.size??20)*(mw/(W-BW*2)));
          ctx.shadowColor=o.glowCol||'transparent';ctx.shadowBlur=8;
          ctx.fillStyle=o.ltCol||'#fff';ctx.beginPath();ctx.arc(ox2,oy2,obsR,0,Math.PI*2);ctx.fill();
        }
      }
      ctx.restore();
    }
    const em2=stageEmojis[stageSel]||'⬜';
    ctx.textAlign='left';ctx.font='bold 16px Nunito,monospace';
    ctx.fillStyle=selSt.gpostLt||'#ffe566';ctx.strokeStyle='rgba(0,0,0,0.8)';ctx.lineWidth=3;
    ctx.strokeText(em2+'  '+selSt.name,px+12,py+prevH-12);
    ctx.fillText(em2+'  '+selSt.name,px+12,py+prevH-12);
  }

  // Description
  const descY=py+prevH+18;
  const desc=STAGE_DESC[stageSel]||'';
  ctx.textAlign='left';ctx.font='13px Nunito,monospace';ctx.fillStyle='rgba(255,255,255,0.78)';
  ctx.save();ctx.beginPath();ctx.rect(px,descY-14,pw,20);ctx.clip();
  ctx.fillText(desc,px,descY);
  ctx.restore();

  // Tags
  if(selSt){
    const tags=[];
    if(selSt.shape==='oval')tags.push('Oval Arena');
    else if(selSt.shape==='oct')tags.push('Octagon Arena');
    else if(selSt.shape==='morph')tags.push('Morphing Arena');
    else tags.push('Rectangular Arena');
    if(selSt.goalShift)tags.push('Shifting Goals');
    if(selSt.goalScale)tags.push('Breathing Goals');
    const obs=selSt.obstacles;
    if(obs.length){
      if(obs[0].type==='turntable'&&obs.length>1)tags.push('Nested Turntables');
      else if(obs[0].type==='turntable')tags.push('Turntable');
      else if(obs[0].type==='chicken')tags.push('Giant Chicken');
      else if(obs[0].type==='ladybug')tags.push('Moving Obstacles');
      else if(obs[0].motion==='orbit')tags.push(`${obs.length} Orbiting Bumper${obs.length>1?'s':''}`);
      else if(obs[0].motion==='swing_v')tags.push('Swinging Pendulums');
      else if(obs[0].motion==='figure8')tags.push('Figure-8 Bumpers');
      else if(obs[0].type)tags.push(obs[0].type.charAt(0).toUpperCase()+obs[0].type.slice(1));
      else tags.push(`${obs.length} Bumper${obs.length>1?'s':''}`);
    }else{tags.push('Open Field');}
    let tx=px;const tagY=descY+22;
    ctx.font='bold 10px Nunito,monospace';
    tags.forEach(tag=>{
      const tw=ctx.measureText(tag).width+14;
      ctx.fillStyle='rgba(255,255,255,0.1)';roundRect(ctx,tx,tagY-12,tw,18,5);ctx.fill();
      ctx.strokeStyle='rgba(255,255,255,0.18)';ctx.lineWidth=1;roundRect(ctx,tx,tagY-12,tw,18,5);ctx.stroke();
      ctx.fillStyle=selSt.gpostLt||'rgba(255,220,100,0.9)';ctx.textAlign='left';ctx.fillText(tag,tx+7,tagY+1);
      tx+=tw+6;
    });
  }

  // ── Mode buttons (right side, below tags) ──
  const btnW=pw,btnH=48,btnX=px;
  const btnStartY=py+prevH+76;
  const btns=[
    {id:1,label:'🎲  Random',sub:'New random stage each game',col1:'#2a1855',col2:'#120830',glow:'rgba(255,180,40,0.5)',accent:'#ffcc44'},
    {id:2,label:'📋  In Order',sub:'Play all stages 1 → '+N,col1:'#0a2840',col2:'#051018',glow:'rgba(80,180,255,0.5)',accent:'#66bbff'},
  ];
  btns.forEach((b,bi)=>{
    const by=btnStartY+bi*(btnH+10);
    const sel=stageSelBtn===b.id;
    const g2=ctx.createLinearGradient(btnX,by,btnX,by+btnH);
    g2.addColorStop(0,b.col1);g2.addColorStop(1,b.col2);
    ctx.fillStyle=g2;roundRect(ctx,btnX,by,btnW,btnH,10);ctx.fill();
    if(sel){
      ctx.save();ctx.shadowColor=b.glow;ctx.shadowBlur=18;
      ctx.strokeStyle=b.accent;ctx.lineWidth=2.5;roundRect(ctx,btnX,by,btnW,btnH,10);ctx.stroke();
      ctx.restore();
      // Animated highlight
      const shimmer=0.08+0.06*Math.sin(frameN*0.06);
      ctx.fillStyle=`rgba(255,255,255,${shimmer})`;roundRect(ctx,btnX,by,btnW,btnH,10);ctx.fill();
    }else{
      ctx.strokeStyle='rgba(255,255,255,0.12)';ctx.lineWidth=1;roundRect(ctx,btnX,by,btnW,btnH,10);ctx.stroke();
    }
    ctx.textAlign='left';
    ctx.font=`${sel?'bold':''} 15px Nunito,monospace`;ctx.fillStyle=sel?b.accent:'rgba(255,255,255,0.75)';
    ctx.fillText(b.label,btnX+14,by+22);
    ctx.font='10px Nunito,monospace';ctx.fillStyle=sel?'rgba(255,255,255,0.6)':'rgba(255,255,255,0.35)';
    ctx.fillText(b.sub,btnX+14,by+38);
  });

  // Footer
  ctx.textAlign='center';ctx.font='bold 11px Nunito,monospace';ctx.fillStyle='rgba(255,200,80,0.45)';
  ctx.fillText(`${stageSel+1} / ${N}  ·  ↑↓ navigate  ·  ←→ buttons  ·  Enter to confirm  ·  Esc — back`,W/2,H-12);
}

// ── Landing page helper: draw a static puck ──────────────────────────
function drawStaticPuck(px,py,typeIdx,scale=1){
  const r=PUCK_R*scale;
  ctx.save();ctx.translate(px,py);ctx.beginPath();ctx.arc(0,0,r,0,Math.PI*2);ctx.clip();
  PT[typeIdx].d(ctx,0,0,r);ctx.restore();
  ctx.strokeStyle='rgba(255,255,255,0.35)';ctx.lineWidth=1.5;
  ctx.beginPath();ctx.arc(px,py,r-1,Math.PI*.08,Math.PI*.92);ctx.stroke();
}

// ── Landing page ──────────────────────────────────────────────────────
function drawLanding(){
  ctx.clearRect(0,0,W,H);
  // Background gradient
  const bg=ctx.createRadialGradient(W/2,H/2,40,W/2,H/2,W*.75);
  bg.addColorStop(0,'#0e0828');bg.addColorStop(0.5,'#06091a');bg.addColorStop(1,'#020408');
  ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);
  // Stars
  for(let i=0;i<90;i++){
    const sx=(Math.sin(i*127.3+0.5)*0.5+0.5)*W;
    const sy=(Math.cos(i*93.7+1.2)*0.5+0.5)*H*0.72;
    const sr=0.4+Math.abs(Math.sin(i*43.1))*1.4;
    const sa=0.25+0.5*Math.abs(Math.sin(frameN*0.025+i*0.8));
    ctx.fillStyle=`rgba(255,255,255,${sa})`;
    ctx.beginPath();ctx.arc(sx,sy,sr,0,Math.PI*2);ctx.fill();
  }
  // Character layout: 7 characters across lower portion
  const chars=[
    {ci:0,x:75, y:372,r:50,emote:'happy',winkLeft:false},
    {ci:1,x:210,y:342,r:55,emote:'love', winkLeft:false},
    {ci:2,x:340,y:378,r:53,emote:'wink', winkLeft:true},
    {ci:3,x:480,y:320,r:51,emote:'happy',winkLeft:false},
    {ci:4,x:618,y:375,r:52,emote:'love', winkLeft:false},
    {ci:5,x:748,y:345,r:50,emote:'wink', winkLeft:false},
    {ci:6,x:878,y:374,r:52,emote:'happy',winkLeft:false},
  ];
  // Draw auras behind characters
  for(const c of chars){
    const glow=ctx.createRadialGradient(c.x,c.y,c.r*.2,c.x,c.y,c.r*1.8);
    glow.addColorStop(0,CHARS[c.ci].col+'55');glow.addColorStop(1,'transparent');
    ctx.fillStyle=glow;ctx.beginPath();ctx.arc(c.x,c.y,c.r*1.8,0,Math.PI*2);ctx.fill();
  }
  // Draw pucks scattered between characters (Hockey, Soccer, Donut, Watermelon)
  const pucks=[
    {typeIdx:0, x:148,y:290,scale:1.0},  // Hockey Puck
    {typeIdx:3, x:412,y:438,scale:0.9},  // Soccer Ball
    {typeIdx:17,x:555,y:272,scale:1.0},  // Donut
    {typeIdx:10,x:808,y:290,scale:0.9},  // Watermelon
  ];
  for(const p of pucks){
    ctx.save();ctx.shadowColor='rgba(255,255,255,0.2)';ctx.shadowBlur=10;
    drawStaticPuck(p.x,p.y,p.typeIdx,p.scale);
    ctx.restore();
  }
  // Draw characters
  for(const c of chars){
    const pm={x:c.x,y:c.y,r:c.r,charIdx:c.ci,hits:0,alive:true,vx:0,vy:0,sx:0,sy:0,
              emote:c.emote,emoteTimer:999,nextEmote:9999,winkLeft:c.winkLeft,preview:true};
    drawMalletShadow(pm);CHARS[c.ci].draw(pm);
  }
  // Title
  ctx.textAlign='center';
  ctx.font='900 62px Nunito,monospace';
  const tg=ctx.createLinearGradient(0,38,0,102);
  tg.addColorStop(0,'#ffe566');tg.addColorStop(0.5,'#ff9c3a');tg.addColorStop(1,'#ff5f8a');
  ctx.shadowColor='rgba(255,140,60,0.55)';ctx.shadowBlur=32;
  ctx.strokeStyle='rgba(0,0,0,0.65)';ctx.lineWidth=9;
  ctx.strokeText('CHIBI AIR HOCKEY',W/2,88);
  ctx.fillStyle=tg;ctx.fillText('CHIBI AIR HOCKEY',W/2,88);
  ctx.shadowBlur=0;
  // "Press A to Start" — pulsing opacity
  const pulse=0.45+0.55*Math.abs(Math.sin(frameN*0.038));
  ctx.globalAlpha=pulse;
  ctx.font='bold 22px Nunito,monospace';
  ctx.fillStyle='#ffe566';
  ctx.shadowColor='rgba(255,220,80,0.7)';ctx.shadowBlur=18;
  ctx.fillText('PRESS ANY KEY TO START',W/2,H-38);
  ctx.globalAlpha=1;ctx.shadowBlur=0;
}

// ── Main menu ─────────────────────────────────────────────────────────
function drawMainMenu(){
  ctx.clearRect(0,0,W,H);
  // Reuse landing bg
  const bg=ctx.createRadialGradient(W/2,H/2,40,W/2,H/2,W*.75);
  bg.addColorStop(0,'#0e0828');bg.addColorStop(0.5,'#06091a');bg.addColorStop(1,'#020408');
  ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);
  // Subtle stars
  for(let i=0;i<50;i++){
    const sx=(Math.sin(i*127.3+0.5)*0.5+0.5)*W,sy=(Math.cos(i*93.7+1.2)*0.5+0.5)*H;
    ctx.fillStyle=`rgba(255,255,255,${0.1+0.15*Math.abs(Math.sin(i*43.1))})`;
    ctx.beginPath();ctx.arc(sx,sy,0.6+Math.abs(Math.sin(i*43.1))*1.0,0,Math.PI*2);ctx.fill();
  }
  // Title
  ctx.textAlign='center';
  ctx.font='900 48px Nunito,monospace';
  const tg=ctx.createLinearGradient(0,50,0,96);
  tg.addColorStop(0,'#ffe566');tg.addColorStop(1,'#ff8c3a');
  ctx.strokeStyle='rgba(0,0,0,0.6)';ctx.lineWidth=7;ctx.strokeText('CHIBI AIR HOCKEY',W/2,88);
  ctx.fillStyle=tg;ctx.fillText('CHIBI AIR HOCKEY',W/2,88);
  // Subtitle
  ctx.font='bold 15px Nunito,monospace';ctx.fillStyle='rgba(255,255,255,0.35)';
  ctx.fillText('choose your mode',W/2,114);
  // Three cards: 1 Player, 2 Players, Options
  const items=[
    {title:'1 PLAYER',  sub:'vs CPU',           icon:'🎮', hint:'Press 1'},
    {title:'2 PLAYERS', sub:'Local Co-op',       icon:'👥', hint:'Press 2'},
    {title:'OPTIONS',   sub:'Adjust settings',   icon:'⚙️', hint:''},
  ];
  const cw=140,ch=130,gap=20,startX=W/2-(cw*3+gap*2)/2;
  items.forEach((m,i)=>{
    const cx=startX+i*(cw+gap),cy=180,sel=(mainMenuSel===i);
    if(sel){ctx.save();ctx.shadowColor='rgba(255,210,60,0.5)';ctx.shadowBlur=28;}
    ctx.fillStyle=sel?'rgba(255,200,60,0.18)':'rgba(255,255,255,0.07)';
    roundRect(ctx,cx,cy,cw,ch,16);ctx.fill();
    ctx.strokeStyle=sel?'#ffcc44':'rgba(255,255,255,0.14)';ctx.lineWidth=sel?3:1.5;
    roundRect(ctx,cx,cy,cw,ch,16);ctx.stroke();
    if(sel)ctx.restore();
    ctx.font='28px serif';ctx.fillText(m.icon,cx+cw/2,cy+42);
    ctx.font=`bold ${sel?20:17}px Nunito,monospace`;
    ctx.fillStyle=sel?'#ffe566':'rgba(255,255,255,0.78)';
    ctx.fillText(m.title,cx+cw/2,cy+72);
    ctx.font='bold 12px Nunito,monospace';
    ctx.fillStyle=sel?'rgba(255,220,100,0.7)':'rgba(255,255,255,0.32)';
    ctx.fillText(m.sub,cx+cw/2,cy+90);
    if(m.hint){ctx.font='bold 11px Nunito,monospace';ctx.fillStyle='rgba(255,255,255,0.22)';ctx.fillText(m.hint,cx+cw/2,cy+ch-12);}
  });
  // Controls hint
  ctx.font='bold 12px Nunito,monospace';ctx.fillStyle='rgba(255,255,255,0.25)';
  ctx.fillText('← → navigate  ·  Enter to select  ·  Esc — back  ·  F — fullscreen',W/2,H-28);
  // Gamepad cursor
  {const gps=navigator.getGamepads?[...navigator.getGamepads()]:[];const gp=gps.find(g=>g);if(gp){ctx.save();ctx.beginPath();ctx.arc(gpCursor.x,gpCursor.y,9,0,Math.PI*2);ctx.fillStyle='rgba(255,200,80,0.92)';ctx.shadowColor='rgba(255,220,80,0.7)';ctx.shadowBlur=14;ctx.fill();ctx.strokeStyle='rgba(0,0,0,0.5)';ctx.lineWidth=2;ctx.stroke();ctx.restore();}}
}

// ── Options menu ──────────────────────────────────────────────────────
function drawOptions(){
  ctx.clearRect(0,0,W,H);
  const bg=ctx.createRadialGradient(W/2,H/2,40,W/2,H/2,W*.75);
  bg.addColorStop(0,'#0e0828');bg.addColorStop(0.5,'#06091a');bg.addColorStop(1,'#020408');
  ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);
  ctx.textAlign='center';
  ctx.font='900 40px Nunito,monospace';
  ctx.strokeStyle='rgba(0,0,0,0.6)';ctx.lineWidth=7;ctx.strokeText('OPTIONS',W/2,76);
  const tg=ctx.createLinearGradient(0,44,0,80);tg.addColorStop(0,'#ffe566');tg.addColorStop(1,'#ff8c3a');
  ctx.fillStyle=tg;ctx.fillText('OPTIONS',W/2,76);
  const sliders=[
    {label:'HP',               val:optHP,          min:5,  max:25, def:13, unit:''},
    {label:'Mallet Speed',     val:optMalletSpeed, min:-5, max:5,  def:0,  unit:''},
    {label:'Puck Split Freq',  val:optSplitFreq,   min:-5, max:5,  def:0,  unit:''},
    {label:'Goals to Win',     val:optGoals,       min:1,  max:10, def:5,  unit:''},
  ];
  const sw=500,sh=52,sx=W/2-sw/2,startY=130;
  sliders.forEach((s,i)=>{
    const sy=startY+i*(sh+22),sel=(optSel===i);
    // Row bg
    ctx.fillStyle=sel?'rgba(255,200,60,0.12)':'rgba(255,255,255,0.05)';
    roundRect(ctx,sx-16,sy-4,sw+32,sh+8,12);ctx.fill();
    if(sel){ctx.strokeStyle='rgba(255,200,60,0.4)';ctx.lineWidth=1.5;roundRect(ctx,sx-16,sy-4,sw+32,sh+8,12);ctx.stroke();}
    // Label
    ctx.textAlign='left';ctx.font=`bold ${sel?17:15}px Nunito,monospace`;
    ctx.fillStyle=sel?'#ffe566':'rgba(255,255,255,0.72)';
    ctx.fillText(s.label,sx,sy+20);
    // Value display
    ctx.textAlign='center';ctx.font=`900 ${sel?26:22}px Nunito,monospace`;
    const vStr=(s.val>0&&s.min<0?'+':'')+s.val+s.unit;
    ctx.fillStyle=sel?'#ffe566':'rgba(255,255,255,0.88)';
    ctx.fillText(vStr,W/2,sy+26);
    // Slider track
    const tr=sw*.55, tx=W/2-tr/2;
    ctx.fillStyle='rgba(255,255,255,0.12)';roundRect(ctx,tx,sy+36,tr,8,4);ctx.fill();
    const frac=(s.val-s.min)/(s.max-s.min);
    const trackCol=sel?'#ffcc44':'rgba(255,200,60,0.55)';
    ctx.fillStyle=trackCol;roundRect(ctx,tx,sy+36,tr*frac,8,4);ctx.fill();
    // Arrows
    ctx.font=`bold ${sel?18:15}px Nunito,monospace`;ctx.fillStyle=sel?'rgba(255,200,60,0.9)':'rgba(255,255,255,0.3)';
    ctx.textAlign='center';
    ctx.fillText('◀',tx-18,sy+26);ctx.fillText('▶',tx+tr+18,sy+26);
    // Default indicator
    if(s.val===s.def){ctx.font='11px Nunito,monospace';ctx.fillStyle='rgba(100,255,180,0.5)';ctx.fillText('default',tx+tr+50,sy+26);}
  });
  ctx.textAlign='center';ctx.font='bold 12px Nunito,monospace';ctx.fillStyle='rgba(255,255,255,0.25)';
  ctx.fillText('↑ ↓ select  ·  ← → adjust  ·  Esc — back',W/2,H-28);
}

// ── Mode select (Quick Start / Level Select) ──────────────────────────
function drawModeSelect(){
  ctx.clearRect(0,0,W,H);
  const bg=ctx.createRadialGradient(W/2,H/2,40,W/2,H/2,W*.75);
  bg.addColorStop(0,'#0e0828');bg.addColorStop(0.5,'#06091a');bg.addColorStop(1,'#020408');
  ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);
  ctx.textAlign='center';
  ctx.font='900 38px Nunito,monospace';
  ctx.strokeStyle='rgba(0,0,0,0.6)';ctx.lineWidth=7;ctx.strokeText('HOW TO PLAY?',W/2,78);
  const tg=ctx.createLinearGradient(0,44,0,80);tg.addColorStop(0,'#ffe566');tg.addColorStop(1,'#ff8c3a');
  ctx.fillStyle=tg;ctx.fillText('HOW TO PLAY?',W/2,78);
  ctx.font='bold 14px Nunito,monospace';ctx.fillStyle='rgba(255,255,255,0.32)';
  ctx.fillText(gameMode==='1p'?'1 Player  vs  CPU':'2 Player  Local',W/2,106);
  const modes=[
    {title:'QUICK START',icon:'⚡',
     lines:['Random character','Random stage','First to 3 goals wins'],
     col:'#ffcc44'},
    {title:'LEVEL SELECT',icon:'🗺️',
     lines:['Choose your stage','Choose your character','Custom goals to win'],
     col:'#66aaff'},
  ];
  const cw=220,ch=180,gap=40,startX=W/2-(cw*2+gap)/2;
  modes.forEach((m,i)=>{
    const cx=startX+i*(cw+gap),cy=140,sel=(modeSelSel===i);
    if(sel){ctx.save();ctx.shadowColor=m.col+'88';ctx.shadowBlur=32;}
    ctx.fillStyle=sel?`${m.col}22`:'rgba(255,255,255,0.06)';
    roundRect(ctx,cx,cy,cw,ch,18);ctx.fill();
    ctx.strokeStyle=sel?m.col:'rgba(255,255,255,0.12)';ctx.lineWidth=sel?3:1.5;
    roundRect(ctx,cx,cy,cw,ch,18);ctx.stroke();
    if(sel)ctx.restore();
    ctx.font='36px serif';ctx.textAlign='center';ctx.fillText(m.icon,cx+cw/2,cy+52);
    ctx.font=`bold ${sel?22:18}px Nunito,monospace`;
    ctx.fillStyle=sel?m.col:'rgba(255,255,255,0.78)';
    ctx.fillText(m.title,cx+cw/2,cy+80);
    ctx.font='13px Nunito,monospace';ctx.fillStyle=sel?'rgba(255,255,255,0.72)':'rgba(255,255,255,0.36)';
    m.lines.forEach((l,li)=>ctx.fillText(l,cx+cw/2,cy+104+li*20));
  });
  ctx.textAlign='center';ctx.font='bold 12px Nunito,monospace';ctx.fillStyle='rgba(255,255,255,0.25)';
  ctx.fillText('← → navigate  ·  Enter to select  ·  Esc — back',W/2,H-28);
}

function drawMenu(){
  // Dark overlay over a static table background
  ctx.clearRect(0,0,W,H);
  drawTable();
  ctx.fillStyle='rgba(8,4,20,0.8)';ctx.fillRect(0,0,W,H);

  // Title
  ctx.textAlign='center';
  ctx.font='900 56px Nunito,monospace';
  const tg=ctx.createLinearGradient(0,60,0,118);
  tg.addColorStop(0,'#ffe566');tg.addColorStop(1,'#ff8c3a');
  ctx.strokeStyle='rgba(0,0,0,0.6)';ctx.lineWidth=8;
  ctx.strokeText('CHIBI AIR HOCKEY',W/2,108);
  ctx.fillStyle=tg;ctx.fillText('CHIBI AIR HOCKEY',W/2,108);

  // Subtitle
  ctx.font='bold 16px Nunito,monospace';ctx.fillStyle='rgba(255,255,255,0.38)';
  ctx.fillText('choose your mode',W/2,138);

  // Mode cards
  const cw=220,ch=140,gap=44,startX=W/2-cw-gap/2,cardY=H/2-ch/2-10;
  const modes=[
    {key:'1p',title:'1 PLAYER',sub:'Cat  vs  CPU',hint:'Press 1',icon:'🐱🤖'},
    {key:'2p',title:'2 PLAYERS',sub:'Cat  vs  Capybara',hint:'Press 2',icon:'🐱🦫'},
  ];
  modes.forEach((m,i)=>{
    const cx=startX+i*(cw+gap),sel=(menuSel===i);
    // Glow behind selected card
    if(sel){ctx.save();ctx.shadowColor='rgba(255,210,60,0.45)';ctx.shadowBlur=30;}
    ctx.fillStyle=sel?'rgba(255,200,60,0.18)':'rgba(255,255,255,0.07)';
    roundRect(ctx,cx,cardY,cw,ch,18);ctx.fill();
    ctx.strokeStyle=sel?'#ffcc44':'rgba(255,255,255,0.14)';
    ctx.lineWidth=sel?3:1.5;
    roundRect(ctx,cx,cardY,cw,ch,18);ctx.stroke();
    if(sel)ctx.restore();
    // Icon
    ctx.font='30px serif';ctx.fillText(m.icon,cx+cw/2,cardY+46);
    // Title
    ctx.font=`bold ${sel?26:23}px Nunito,monospace`;
    ctx.fillStyle=sel?'#ffe566':'rgba(255,255,255,0.75)';
    ctx.fillText(m.title,cx+cw/2,cardY+82);
    // Sub
    ctx.font='bold 13px Nunito,monospace';
    ctx.fillStyle=sel?'rgba(255,220,100,0.75)':'rgba(255,255,255,0.35)';
    ctx.fillText(m.sub,cx+cw/2,cardY+104);
    // Key hint
    ctx.font='bold 12px Nunito,monospace';
    ctx.fillStyle=sel?'rgba(255,220,100,0.55)':'rgba(255,255,255,0.22)';
    ctx.fillText(m.hint,cx+cw/2,cardY+ch-14);
  });

  // Controls hint
  ctx.font='bold 13px Nunito,monospace';ctx.fillStyle='rgba(255,255,255,0.28)';
  ctx.fillText('← → to highlight  ·  Enter or click to start  ·  F — fullscreen  ·  Gamepad OK',W/2,H-28);
  // Gamepad virtual cursor + debug overlay
  {const gps=navigator.getGamepads?[...navigator.getGamepads()]:[];const gp=gps.find(g=>g);if(gp){ctx.save();ctx.beginPath();ctx.arc(gpCursor.x,gpCursor.y,9,0,Math.PI*2);ctx.fillStyle='rgba(255,255,255,0.92)';ctx.shadowColor='rgba(255,220,80,0.7)';ctx.shadowBlur=14;ctx.fill();ctx.strokeStyle='rgba(0,0,0,0.5)';ctx.lineWidth=2;ctx.stroke();ctx.restore();}}
}


function drawPerfectAnim(){
  const t=perfectT/PERFECT_DUR; // 0→1
  const cw=scores.l>=SCORE_TO_WIN;
  const winIdx=cw?LM.charIdx:RM.charIdx;
  const ch=CHARS[winIdx];
  // Dark overlay
  ctx.fillStyle=`rgba(8,4,16,${Math.min(0.82,t*3)})`;ctx.fillRect(0,0,W,H);
  // Character animation
  const baseR=64;
  const r=baseR*(t<0.15?t/0.15:1);
  ch.perfectAnim(W/2,H/2+20,r,t);
  // Ambient bursts
  if(frameN%12===0&&t<0.85){burst(W/2+(Math.random()-.5)*300,H/2+(Math.random()-.5)*200,ch.col,6);}
  // Tick + draw particles
  for(const p of parts){p.x+=p.vx;p.y+=p.vy;p.vy+=0.06;p.life-=p.decay;}
  parts=parts.filter(p=>p.life>0);
  for(const p of parts){ctx.globalAlpha=p.life;ctx.fillStyle=p.col;ctx.beginPath();ctx.arc(p.x,p.y,p.r*p.life,0,Math.PI*2);ctx.fill();}
  ctx.globalAlpha=1;
  // Phase 3: text
  if(t>0.75){
    const ta=Math.min(1,(t-0.75)/0.2);
    const playerLabel=cw?'Player 1':'Player 2';
    ctx.textAlign='center';
    // "PERFECT GAME!" — gold gradient
    ctx.save();
    ctx.font='900 52px Nunito,monospace';
    const tg=ctx.createLinearGradient(W/2-180,0,W/2+180,0);
    tg.addColorStop(0,`rgba(255,215,0,${ta})`);tg.addColorStop(0.5,`rgba(255,240,140,${ta})`);tg.addColorStop(1,`rgba(255,180,0,${ta})`);
    ctx.strokeStyle=`rgba(0,0,0,${ta*0.6})`;ctx.lineWidth=6;
    ctx.strokeText('PERFECT GAME!',W/2,H/2-80);
    ctx.fillStyle=tg;ctx.fillText('PERFECT GAME!',W/2,H/2-80);
    // Player label
    ctx.font='bold 26px Nunito,monospace';
    ctx.fillStyle=`rgba(255,255,255,${ta})`;
    ctx.fillText(ch.name+' \u2014 '+playerLabel,W/2,H/2-45);
    ctx.restore();
  }
  // "Press any key" hint after animation ends
  if(t>=0.98){
    ctx.textAlign='center';ctx.font='bold 16px Nunito,monospace';
    ctx.fillStyle=`rgba(180,180,200,${0.5+Math.sin(frameN*0.08)*0.3})`;
    ctx.fillText('Press R to play again \u00B7 M for menu',W/2,H-30);
  }
}
function drawOver(){
  if(perfectT>0&&perfectT<PERFECT_DUR){drawPerfectAnim();return;}
  ctx.fillStyle='rgba(8,4,16,0.72)';ctx.fillRect(0,0,W,H);
  const cw=scores.l>=SCORE_TO_WIN;
  const winChar=cw?LM.charIdx:RM.charIdx;
  const winLabel=CHARS[winChar].name.toUpperCase()+' WINS!';
  ctx.textAlign='center';ctx.font='900 52px Nunito,monospace';ctx.fillStyle=CHARS[winChar].col;
  ctx.strokeStyle='rgba(0,0,0,0.5)';ctx.lineWidth=6;ctx.strokeText(winLabel,W/2,H/2-14);
  ctx.fillText(winLabel,W/2,H/2-14);
  ctx.font='bold 18px Nunito,monospace';ctx.fillStyle='#778';ctx.fillText('A / Start / R — play again  ·  M — menu',W/2,H/2+28);
  const fm={x:W/2,y:H/2+110,r:46,charIdx:winChar,hits:0,alive:true,vx:0,vy:0,sx:0,sy:0,side:'l',preview:true};
  CHARS[winChar].draw(fm);
}
