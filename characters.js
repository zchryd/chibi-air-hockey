// ── Draw: mallets ────────────────────────────────────────────────────
// ── Emote helpers ────────────────────────────────────────────────────
function triggerEmote(m,type,dur){m.emote=type;m.emoteTimer=dur;m.winkLeft=Math.random()<0.5;m.nextEmote=dur+180+Math.floor(Math.random()*180);}
function drawMiniHeart(x,y,s,col){
  ctx.fillStyle=col;ctx.save();ctx.translate(x,y);
  ctx.beginPath();ctx.arc(-s*.25,0,s*.28,0,Math.PI*2);ctx.fill();
  ctx.beginPath();ctx.arc(s*.25,0,s*.28,0,Math.PI*2);ctx.fill();
  ctx.beginPath();ctx.moveTo(-s*.5,s*.18);ctx.lineTo(s*.5,s*.18);ctx.lineTo(0,s*.82);ctx.closePath();ctx.fill();
  ctx.restore();
}
function emoteEyes(m,x,y,r,ex,ey){
  const t=m.emoteTimer>0?m.emote:null;if(!t)return false;
  if(t==='happy'||t==='love'){
    ctx.strokeStyle=C_OUTLINE;ctx.lineWidth=2.4;
    for(const ox of[x-ex,x+ex]){ctx.beginPath();ctx.arc(ox,ey+r*.06,r*.13,Math.PI,2*Math.PI);ctx.stroke();}
    if(t==='love'){for(const ox of[x-ex,x+ex])drawMiniHeart(ox,ey-r*.1,r*.13,'#ff4477');}
    return true;
  }
  if(t==='surprised'){
    ctx.fillStyle=C_OUTLINE;
    ctx.beginPath();ctx.arc(x-ex,ey,r*.19,0,Math.PI*2);ctx.fill();
    ctx.beginPath();ctx.arc(x+ex,ey,r*.19,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='#fff';
    ctx.beginPath();ctx.arc(x-ex+r*.04,ey-r*.05,r*.08,0,Math.PI*2);ctx.fill();
    ctx.beginPath();ctx.arc(x+ex+r*.04,ey-r*.05,r*.08,0,Math.PI*2);ctx.fill();
    return true;
  }
  if(t==='wink'){
    const[openX,closedX]=m.winkLeft?[x+ex,x-ex]:[x-ex,x+ex];
    ctx.fillStyle=C_OUTLINE;ctx.beginPath();ctx.arc(openX,ey,r*.14,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(openX+r*.05,ey-r*.05,r*.055,0,Math.PI*2);ctx.fill();
    ctx.strokeStyle=C_OUTLINE;ctx.lineWidth=2.4;
    ctx.beginPath();ctx.arc(closedX,ey+r*.05,r*.12,Math.PI,2*Math.PI);ctx.stroke();
    return true;
  }
  // ── Unique character emotes (eyes) ──
  if(t==='sassy'){
    // Half-lidded eyes — flat top lid cutting across round eye
    for(const ox of[x-ex,x+ex]){
      ctx.fillStyle=C_OUTLINE;ctx.beginPath();ctx.arc(ox,ey,r*.14,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(ox+r*.04,ey+r*.02,r*.055,0,Math.PI*2);ctx.fill();
      // Heavy drooping lid
      ctx.fillStyle=CHARS[m.charIdx].col;ctx.beginPath();ctx.ellipse(ox,ey-r*.06,r*.18,r*.1,0,0,Math.PI);ctx.fill();
    }
    return true;
  }
  if(t==='zen'){
    // Peaceful closed eyes — gentle downward curves
    ctx.strokeStyle=C_OUTLINE;ctx.lineWidth=2.4;
    for(const ox of[x-ex,x+ex]){ctx.beginPath();ctx.arc(ox,ey-r*.02,r*.13,0.15,Math.PI-0.15);ctx.stroke();}
    return true;
  }
  if(t==='fierce'){
    // Angry eyes — slanted brows + small intense pupils
    for(const ox of[x-ex,x+ex]){
      const s=ox<x?-1:1;
      ctx.fillStyle=C_OUTLINE;ctx.beginPath();ctx.arc(ox,ey,r*.14,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='#c02020';ctx.beginPath();ctx.arc(ox,ey,r*.07,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(ox+r*.03,ey-r*.04,r*.035,0,Math.PI*2);ctx.fill();
      // Angry brow
      ctx.strokeStyle=C_OUTLINE;ctx.lineWidth=3;
      ctx.beginPath();ctx.moveTo(ox-s*r*.2,ey-r*.22);ctx.lineTo(ox+s*r*.12,ey-r*.14);ctx.stroke();
    }
    return true;
  }
  if(t==='starry'){
    // Sparkle star eyes — 4-pointed stars
    for(const ox of[x-ex,x+ex]){
      const hue=(frameN*4+(ox<x?0:60))%360;
      ctx.fillStyle=`hsl(${hue},100%,65%)`;
      const ss=r*.18;
      ctx.beginPath();
      for(let i=0;i<8;i++){const a=i/8*Math.PI*2-Math.PI/2+frameN*.05,rr=i%2===0?ss:ss*.3;
        i===0?ctx.moveTo(ox+Math.cos(a)*rr,ey+Math.sin(a)*rr):ctx.lineTo(ox+Math.cos(a)*rr,ey+Math.sin(a)*rr);}
      ctx.closePath();ctx.fill();
    }
    return true;
  }
  if(t==='derp'){
    // Eyes looking opposite directions
    ctx.fillStyle=C_OUTLINE;
    ctx.beginPath();ctx.arc(x-ex,ey,r*.16,0,Math.PI*2);ctx.fill();
    ctx.beginPath();ctx.arc(x+ex,ey,r*.16,0,Math.PI*2);ctx.fill();
    // Left eye looks left, right eye looks right
    ctx.fillStyle='#fff';
    ctx.beginPath();ctx.arc(x-ex-r*.06,ey-r*.02,r*.065,0,Math.PI*2);ctx.fill();
    ctx.beginPath();ctx.arc(x+ex+r*.06,ey-r*.06,r*.065,0,Math.PI*2);ctx.fill();
    return true;
  }
  if(t==='pouty'){
    // Furrowed brows + teary sparkle eyes
    for(const ox of[x-ex,x+ex]){
      const s=ox<x?-1:1;
      ctx.fillStyle=C_OUTLINE;ctx.beginPath();ctx.ellipse(ox,ey,r*.14,r*.17,0,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='#6a28b8';ctx.beginPath();ctx.ellipse(ox,ey+r*.02,r*.09,r*.12,0,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(ox+r*.05,ey-r*.05,r*.05,0,Math.PI*2);ctx.fill();
      // Teary shimmer
      ctx.fillStyle='rgba(180,220,255,0.7)';ctx.beginPath();ctx.arc(ox-r*.04,ey+r*.08,r*.03,0,Math.PI*2);ctx.fill();
      // Furrowed brow
      ctx.strokeStyle=C_OUTLINE;ctx.lineWidth=2.5;
      ctx.beginPath();ctx.moveTo(ox-s*r*.18,ey-r*.24);ctx.lineTo(ox+s*r*.1,ey-r*.16);ctx.stroke();
    }
    return true;
  }
  if(t==='smug'){
    // One raised eyebrow, confident half-lidded look
    const[raisedX,lowX]=m.winkLeft?[x+ex,x-ex]:[x-ex,x+ex];
    // Raised-brow eye — wide and confident
    ctx.fillStyle=C_OUTLINE;ctx.beginPath();ctx.arc(raisedX,ey,r*.15,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(raisedX+r*.05,ey-r*.05,r*.06,0,Math.PI*2);ctx.fill();
    // Raised brow
    ctx.strokeStyle=C_OUTLINE;ctx.lineWidth=2.5;
    ctx.beginPath();ctx.moveTo(raisedX-r*.16,ey-r*.2);ctx.quadraticCurveTo(raisedX,ey-r*.32,raisedX+r*.16,ey-r*.22);ctx.stroke();
    // Half-lidded eye
    ctx.fillStyle=C_OUTLINE;ctx.beginPath();ctx.arc(lowX,ey,r*.13,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(lowX+r*.04,ey+r*.01,r*.045,0,Math.PI*2);ctx.fill();
    ctx.fillStyle=CHARS[m.charIdx].col;ctx.beginPath();ctx.ellipse(lowX,ey-r*.06,r*.17,r*.09,0,0,Math.PI);ctx.fill();
    return true;
  }
  if(t==='sniff'){
    // Squeezed shut eyes — sensing with the star nose
    ctx.strokeStyle=C_OUTLINE;ctx.lineWidth=2.4;
    for(const ox of[x-ex,x+ex]){
      ctx.beginPath();ctx.moveTo(ox-r*.1,ey);ctx.lineTo(ox+r*.1,ey);ctx.stroke();
      // Scrunch lines above and below
      ctx.lineWidth=1.2;
      ctx.beginPath();ctx.moveTo(ox-r*.08,ey-r*.08);ctx.lineTo(ox+r*.08,ey-r*.06);ctx.stroke();
      ctx.beginPath();ctx.moveTo(ox-r*.08,ey+r*.08);ctx.lineTo(ox+r*.08,ey+r*.06);ctx.stroke();
      ctx.lineWidth=2.4;
    }
    return true;
  }
  return false;
}
function emoteMouth(m,x,y,r){
  const t=m.emoteTimer>0?m.emote:null;if(!t)return false;
  if(t==='happy'||t==='love'){
    ctx.strokeStyle=C_OUTLINE;ctx.lineWidth=2.2;
    ctx.beginPath();ctx.arc(x,y+r*.15,r*.3,0.15,Math.PI-0.15);ctx.stroke();
    return true;
  }
  if(t==='surprised'){
    ctx.fillStyle=C_OUTLINE;
    ctx.beginPath();ctx.ellipse(x,y+r*.28,r*.1,r*.13,0,0,Math.PI*2);ctx.fill();
    return true;
  }
  if(t==='wink'){
    ctx.strokeStyle=C_OUTLINE;ctx.lineWidth=1.8;
    ctx.beginPath();ctx.arc(x,y+r*.2,r*.22,0.25,Math.PI-0.25);ctx.stroke();
    return true;
  }
  // ── Unique character emotes (mouth) ──
  if(t==='sassy'){
    // Side smirk — asymmetric grin
    ctx.strokeStyle=C_OUTLINE;ctx.lineWidth=2;
    ctx.beginPath();ctx.moveTo(x-r*.12,y+r*.22);ctx.quadraticCurveTo(x+r*.05,y+r*.2,x+r*.22,y+r*.12);ctx.stroke();
    return true;
  }
  if(t==='zen'){
    // Serene gentle smile — subtle flat curve
    ctx.strokeStyle=C_OUTLINE;ctx.lineWidth=1.8;
    ctx.beginPath();ctx.arc(x,y+r*.22,r*.18,0.2,Math.PI-0.2);ctx.stroke();
    return true;
  }
  if(t==='fierce'){
    // Gritted teeth snarl
    ctx.fillStyle='#fff';ctx.beginPath();ctx.ellipse(x,y+r*.28,r*.22,r*.1,0,0,Math.PI*2);ctx.fill();
    ctx.strokeStyle=C_OUTLINE;ctx.lineWidth=1.8;ctx.stroke();
    // Teeth lines
    ctx.lineWidth=1.2;
    for(let i=-2;i<=2;i++){const tx=x+i*r*.08;ctx.beginPath();ctx.moveTo(tx,y+r*.19);ctx.lineTo(tx,y+r*.37);ctx.stroke();}
    return true;
  }
  if(t==='starry'){
    // Tiny open O mouth — awestruck
    ctx.fillStyle=C_OUTLINE;
    ctx.beginPath();ctx.arc(x,y+r*.26,r*.08,0,Math.PI*2);ctx.fill();
    return true;
  }
  if(t==='derp'){
    // Tongue sticking out to the side
    ctx.strokeStyle=C_OUTLINE;ctx.lineWidth=1.8;
    ctx.beginPath();ctx.arc(x,y+r*.2,r*.18,0.2,Math.PI-0.2);ctx.stroke();
    // Tongue
    ctx.fillStyle='#ff7088';ctx.beginPath();ctx.ellipse(x+r*.18,y+r*.3,r*.12,r*.08,0.2,0,Math.PI*2);ctx.fill();
    ctx.strokeStyle=C_OUTLINE;ctx.lineWidth=1.2;ctx.stroke();
    return true;
  }
  if(t==='pouty'){
    // Puffed pout — small downturned frown + puffed cheeks
    ctx.strokeStyle=C_OUTLINE;ctx.lineWidth=2;
    ctx.beginPath();ctx.arc(x,y+r*.34,r*.14,Math.PI+0.3,2*Math.PI-0.3);ctx.stroke();
    return true;
  }
  if(t==='smug'){
    // Confident side grin
    ctx.strokeStyle=C_OUTLINE;ctx.lineWidth=2.2;
    const sx=m.winkLeft?1:-1;
    ctx.beginPath();ctx.moveTo(x-sx*r*.18,y+r*.24);ctx.quadraticCurveTo(x,y+r*.2,x+sx*r*.24,y+r*.14);ctx.stroke();
    return true;
  }
  if(t==='sniff'){
    // Star nose tentacles flare outward — animated wiggle
    const noseY=y+r*.18,nr=r*.32;
    const flare=1+0.3*Math.sin(frameN*0.5);
    for(let i=0;i<11;i++){
      const a=i/11*Math.PI*2-Math.PI/2;
      const wiggle=Math.sin(frameN*0.8+i*1.5)*r*.04;
      const tx=x+Math.cos(a)*nr*flare+wiggle,ty=noseY+Math.sin(a)*nr*flare*0.7+wiggle;
      ctx.fillStyle=C_MOLENOSE;ctx.beginPath();ctx.ellipse(tx,ty,r*.06,r*.04,a,0,Math.PI*2);ctx.fill();
    }
    ctx.fillStyle=C_MOLENOSE;ctx.beginPath();ctx.arc(x,noseY,r*.12,0,Math.PI*2);ctx.fill();
    return true;
  }
  return false;
}

function drawCat(m){
  if(!m.alive)return;
  const breathe=1+0.016*Math.sin(frameN*Math.PI/28);
  const{x,y}=m,r=m.r*breathe,hp=1-m.hits/MAX_HITS,beat=hp<.4;
  ctx.fillStyle=beat?C_CATDK:C_CAT;
  ctx.beginPath();ctx.moveTo(x-r*.48,y-r*.72);ctx.lineTo(x-r*.13,y-r*1.22);ctx.lineTo(x+r*.12,y-r*.72);ctx.closePath();ctx.fill();
  ctx.beginPath();ctx.moveTo(x+r*.48,y-r*.72);ctx.lineTo(x+r*.13,y-r*1.22);ctx.lineTo(x-r*.12,y-r*.72);ctx.closePath();ctx.fill();
  ctx.fillStyle=C_CATPINK;
  ctx.beginPath();ctx.moveTo(x-r*.4,y-r*.76);ctx.lineTo(x-r*.14,y-r*1.1);ctx.lineTo(x+r*.04,y-r*.76);ctx.closePath();ctx.fill();
  ctx.beginPath();ctx.moveTo(x+r*.4,y-r*.76);ctx.lineTo(x+r*.14,y-r*1.1);ctx.lineTo(x-r*.04,y-r*.76);ctx.closePath();ctx.fill();
  const g=ctx.createRadialGradient(x-r*.22,y-r*.22,r*.05,x,y,r);g.addColorStop(0,beat?'#d06020':'#ffaa55');g.addColorStop(1,beat?C_CATDK:C_CAT);
  ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();ctx.strokeStyle=C_OUTLINE;ctx.lineWidth=2.2;ctx.stroke();
  ctx.strokeStyle=C_CATDK;ctx.lineWidth=1.4;
  for(let i=-1;i<=1;i++){ctx.beginPath();ctx.moveTo(x+i*r*.22,y-r*.54);ctx.quadraticCurveTo(x+i*r*.3,y-r*.74,x+i*r*.18,y-r*.84);ctx.stroke();}
  const ey=y-r*.12,ex=r*.36;
  if(!emoteEyes(m,x,y,r,ex,ey)){
    if(!beat){
      ctx.fillStyle='#1a0a2e';ctx.beginPath();ctx.arc(x-ex,ey,r*.14,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.arc(x+ex,ey,r*.14,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='#2a1a0a';ctx.beginPath();ctx.ellipse(x-ex,ey,r*.04,r*.12,0,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.ellipse(x+ex,ey,r*.04,r*.12,0,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(x-ex+r*.05,ey-r*.05,r*.05,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.arc(x+ex+r*.05,ey-r*.05,r*.05,0,Math.PI*2);ctx.fill();
    }else{ctx.strokeStyle=C_OUTLINE;ctx.lineWidth=2.2;for(const ox of[x-ex,x+ex]){const s=r*.12;ctx.beginPath();ctx.moveTo(ox-s,ey-s);ctx.lineTo(ox+s,ey+s);ctx.stroke();ctx.beginPath();ctx.moveTo(ox+s,ey-s);ctx.lineTo(ox-s,ey+s);ctx.stroke();}}
  }
  if(!emoteMouth(m,x,y,r)){
    ctx.fillStyle=C_CATPINK;ctx.beginPath();ctx.moveTo(x,y+r*.14);ctx.lineTo(x-r*.1,y+r*.04);ctx.lineTo(x+r*.1,y+r*.04);ctx.closePath();ctx.fill();
    ctx.strokeStyle=C_OUTLINE;ctx.lineWidth=1.5;
    ctx.beginPath();ctx.moveTo(x,y+r*.14);ctx.quadraticCurveTo(x-r*.18,y+r*.32,x-r*.28,y+r*.24);ctx.stroke();
    ctx.beginPath();ctx.moveTo(x,y+r*.14);ctx.quadraticCurveTo(x+r*.18,y+r*.32,x+r*.28,y+r*.24);ctx.stroke();
  }
  ctx.strokeStyle=`rgba(13,21,32,${beat?.35:.65})`;ctx.lineWidth=1;
  for(let i=-1;i<=1;i++){const wy=y+r*.08+i*r*.13;ctx.beginPath();ctx.moveTo(x-r*.06,wy);ctx.lineTo(x-r*.88,wy+i*r*.06);ctx.stroke();ctx.beginPath();ctx.moveTo(x+r*.06,wy);ctx.lineTo(x+r*.88,wy+i*r*.06);ctx.stroke();}
  drawHpBar(m);
}
function drawCapybara(m){
  if(!m.alive)return;
  const breathe=1+0.016*Math.sin(frameN*Math.PI/32+1.2);
  const{x,y}=m,r=m.r*breathe,hp=1-m.hits/MAX_HITS,beat=hp<.4;
  ctx.fillStyle=beat?C_CAPYDK:C_CAPY;
  ctx.beginPath();ctx.arc(x-r*.62,y-r*.72,r*.3,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.arc(x+r*.62,y-r*.72,r*.3,0,Math.PI*2);ctx.fill();
  ctx.fillStyle=C_CAPYDK;ctx.beginPath();ctx.arc(x-r*.62,y-r*.72,r*.15,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.arc(x+r*.62,y-r*.72,r*.15,0,Math.PI*2);ctx.fill();
  const g=ctx.createRadialGradient(x-r*.18,y-r*.2,r*.05,x,y,r);g.addColorStop(0,beat?'#9a5520':'#d4883a');g.addColorStop(1,beat?C_CAPYDK:C_CAPY);
  ctx.fillStyle=g;ctx.beginPath();ctx.ellipse(x,y,r*1.06,r*.95,0,0,Math.PI*2);ctx.fill();ctx.strokeStyle=C_OUTLINE;ctx.lineWidth=2.2;ctx.stroke();
  ctx.fillStyle=C_CAPYNOSE;ctx.beginPath();ctx.ellipse(x,y+r*.22,r*.56,r*.38,0,0,Math.PI*2);ctx.fill();
  const ey=y-r*.18,ex=r*.28;
  if(!emoteEyes(m,x,y,r,ex,ey)){
    if(!beat){
      ctx.fillStyle=C_OUTLINE;ctx.beginPath();ctx.arc(x-ex,ey,r*.13,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.arc(x+ex,ey,r*.13,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(x-r*.22,ey-r*.04,r*.055,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.arc(x+r*.34,ey-r*.04,r*.055,0,Math.PI*2);ctx.fill();
    }else{ctx.strokeStyle=C_OUTLINE;ctx.lineWidth=2.2;for(const ox of[x-ex,x+ex]){const s=r*.11;ctx.beginPath();ctx.moveTo(ox-s,ey-s);ctx.lineTo(ox+s,ey+s);ctx.stroke();ctx.beginPath();ctx.moveTo(ox+s,ey-s);ctx.lineTo(ox-s,ey+s);ctx.stroke();}}
  }
  ctx.fillStyle=C_CAPYDK;ctx.beginPath();ctx.arc(x-r*.18,y+r*.2,r*.08,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.arc(x+r*.18,y+r*.2,r*.08,0,Math.PI*2);ctx.fill();
  if(!emoteMouth(m,x,y,r)){
    ctx.strokeStyle=C_CAPYDK;ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(x-r*.3,y+r*.42);ctx.quadraticCurveTo(x,y+r*.52,x+r*.3,y+r*.42);ctx.stroke();
  }
  drawHpBar(m);
}
function drawBearMallet(m){
  if(!m.alive)return;
  const breathe=1+0.016*Math.sin(frameN*Math.PI/30+0.5);
  const{x,y}=m,r=m.r*breathe,hp=1-m.hits/MAX_HITS,beat=hp<.4;
  // Ears
  ctx.fillStyle=beat?C_BEARDK:C_BEAR;
  ctx.beginPath();ctx.arc(x-r*.58,y-r*.65,r*.36,0,Math.PI*2);ctx.fill();
  ctx.beginPath();ctx.arc(x+r*.58,y-r*.65,r*.36,0,Math.PI*2);ctx.fill();
  ctx.fillStyle=C_CAPYNOSE;
  ctx.beginPath();ctx.arc(x-r*.58,y-r*.65,r*.18,0,Math.PI*2);ctx.fill();
  ctx.beginPath();ctx.arc(x+r*.58,y-r*.65,r*.18,0,Math.PI*2);ctx.fill();
  // Body
  const g=ctx.createRadialGradient(x-r*.2,y-r*.2,r*.05,x,y,r);
  g.addColorStop(0,beat?'#9a6a3a':'#b07848');g.addColorStop(1,beat?C_BEARDK:C_BEAR);
  ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();
  ctx.strokeStyle=C_OUTLINE;ctx.lineWidth=2.2;ctx.stroke();
  // Snout
  ctx.fillStyle=C_CAPYNOSE;ctx.beginPath();ctx.ellipse(x,y+r*.22,r*.44,r*.32,0,0,Math.PI*2);ctx.fill();
  // Eyes
  const ey=y-r*.14,ex=r*.3;
  if(!emoteEyes(m,x,y,r,ex,ey)){
    if(!beat){
      ctx.fillStyle=C_OUTLINE;ctx.beginPath();ctx.arc(x-ex,ey,r*.13,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.arc(x+ex,ey,r*.13,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(x-ex+r*.05,ey-r*.05,r*.055,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.arc(x+ex+r*.05,ey-r*.05,r*.055,0,Math.PI*2);ctx.fill();
    }else{ctx.strokeStyle=C_OUTLINE;ctx.lineWidth=2.2;for(const ox of[x-ex,x+ex]){const s=r*.11;ctx.beginPath();ctx.moveTo(ox-s,ey-s);ctx.lineTo(ox+s,ey+s);ctx.stroke();ctx.beginPath();ctx.moveTo(ox+s,ey-s);ctx.lineTo(ox-s,ey+s);ctx.stroke();}}
  }
  // Nose & mouth
  ctx.fillStyle=C_BEARDK;ctx.beginPath();ctx.ellipse(x,y+r*.16,r*.13,r*.09,0,0,Math.PI*2);ctx.fill();
  if(!emoteMouth(m,x,y,r)){
    ctx.strokeStyle=C_BEARDK;ctx.lineWidth=1.5;
    ctx.beginPath();ctx.moveTo(x-r*.18,y+r*.3);ctx.quadraticCurveTo(x,y+r*.42,x+r*.18,y+r*.3);ctx.stroke();
  }
  drawHpBar(m);
}

function drawBunny(m){
  if(!m.alive)return;
  const breathe=1+0.016*Math.sin(frameN*Math.PI/26+2);
  const{x,y}=m,r=m.r*breathe,hp=1-m.hits/MAX_HITS,beat=hp<.4;
  // Tall ears
  ctx.fillStyle=beat?C_BUNDK:C_BUN;
  ctx.beginPath();ctx.ellipse(x-r*.3,y-r*1.12,r*.18,r*.56,-.12,0,Math.PI*2);ctx.fill();
  ctx.beginPath();ctx.ellipse(x+r*.3,y-r*1.12,r*.18,r*.56,.12,0,Math.PI*2);ctx.fill();
  ctx.fillStyle=C_BUNPINK;
  ctx.beginPath();ctx.ellipse(x-r*.3,y-r*1.12,r*.09,r*.38,-.12,0,Math.PI*2);ctx.fill();
  ctx.beginPath();ctx.ellipse(x+r*.3,y-r*1.12,r*.09,r*.38,.12,0,Math.PI*2);ctx.fill();
  // Body
  const g=ctx.createRadialGradient(x-r*.2,y-r*.2,r*.05,x,y,r);
  g.addColorStop(0,beat?'#d0b0c0':'#faf0f4');g.addColorStop(1,beat?C_BUNDK:C_BUN);
  ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();
  ctx.strokeStyle=C_OUTLINE;ctx.lineWidth=2.2;ctx.stroke();
  // Blush
  ctx.fillStyle='rgba(255,160,180,0.38)';
  ctx.beginPath();ctx.ellipse(x-r*.38,y+r*.1,r*.22,r*.15,0,0,Math.PI*2);ctx.fill();
  ctx.beginPath();ctx.ellipse(x+r*.38,y+r*.1,r*.22,r*.15,0,0,Math.PI*2);ctx.fill();
  // Eyes
  const ey=y-r*.15,ex=r*.3;
  if(!emoteEyes(m,x,y,r,ex,ey)){
    if(!beat){
      ctx.fillStyle=C_OUTLINE;ctx.beginPath();ctx.arc(x-ex,ey,r*.13,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.arc(x+ex,ey,r*.13,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(x-ex+r*.05,ey-r*.05,r*.055,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.arc(x+ex+r*.05,ey-r*.05,r*.055,0,Math.PI*2);ctx.fill();
    }else{ctx.strokeStyle=C_OUTLINE;ctx.lineWidth=2.2;for(const ox of[x-ex,x+ex]){const s=r*.11;ctx.beginPath();ctx.moveTo(ox-s,ey-s);ctx.lineTo(ox+s,ey+s);ctx.stroke();ctx.beginPath();ctx.moveTo(ox+s,ey-s);ctx.lineTo(ox-s,ey+s);ctx.stroke();}}
  }
  // Nose & mouth
  ctx.fillStyle=C_BUNPINK;ctx.beginPath();ctx.ellipse(x,y+r*.12,r*.1,r*.08,0,0,Math.PI*2);ctx.fill();
  if(!emoteMouth(m,x,y,r)){
    ctx.strokeStyle=C_BUNDK;ctx.lineWidth=1.5;
    ctx.beginPath();ctx.moveTo(x,y+r*.2);ctx.lineTo(x-r*.13,y+r*.33);ctx.stroke();
    ctx.beginPath();ctx.moveTo(x,y+r*.2);ctx.lineTo(x+r*.13,y+r*.33);ctx.stroke();
  }
  // Whiskers
  ctx.strokeStyle=`rgba(180,130,160,${beat?.3:.55})`;ctx.lineWidth=1;
  for(let i=-1;i<=1;i++){const wy=y+r*.08+i*r*.13;ctx.beginPath();ctx.moveTo(x-r*.06,wy);ctx.lineTo(x-r*.84,wy+i*r*.05);ctx.stroke();ctx.beginPath();ctx.moveTo(x+r*.06,wy);ctx.lineTo(x+r*.84,wy+i*r*.05);ctx.stroke();}
  drawHpBar(m);
}
function drawAxolotl(m){
  if(!m.alive)return;
  const breathe=1+0.016*Math.sin(frameN*Math.PI/29+0.8);
  const{x,y}=m,r=m.r*breathe,hp=1-m.hits/MAX_HITS,beat=hp<.4;
  // External gills — 3 feathery stalks on each side
  const gillCol=beat?C_AXODK:C_AXOGILL;
  ctx.strokeStyle=gillCol;ctx.lineWidth=2.8;
  for(let s=-1;s<=1;s+=1){
    const gx=x+(s===0?0:s*r*.78),gBase=y-r*.38;
    const wave=Math.sin(frameN*Math.PI/18+s)*r*.07;
    for(let g=-1;g<=1;g++){
      const ox=gx+g*r*.16,topY=gBase-r*(.55+Math.abs(g)*.12)+wave;
      ctx.beginPath();ctx.moveTo(ox,gBase);ctx.quadraticCurveTo(ox+wave*.6,gBase-r*.28,ox,topY);ctx.stroke();
      // Little gill fringes
      ctx.lineWidth=1.4;
      ctx.beginPath();ctx.moveTo(ox,gBase-r*.18);ctx.lineTo(ox+s*r*.1,gBase-r*.24);ctx.stroke();
      ctx.beginPath();ctx.moveTo(ox,gBase-r*.32);ctx.lineTo(ox+s*r*.1,gBase-r*.38);ctx.stroke();
      ctx.lineWidth=2.8;
    }
  }
  // Body with gradient
  const g=ctx.createRadialGradient(x-r*.2,y-r*.22,r*.04,x,y,r);
  g.addColorStop(0,beat?'#e07090':'#ffccd8');g.addColorStop(1,beat?C_AXODK:C_AXO);
  ctx.fillStyle=g;ctx.beginPath();ctx.ellipse(x,y,r,r*.92,0,0,Math.PI*2);ctx.fill();
  ctx.strokeStyle=C_OUTLINE;ctx.lineWidth=2.2;ctx.stroke();
  // Belly spots
  ctx.fillStyle=`rgba(255,214,228,${beat?.25:.55})`;
  ctx.beginPath();ctx.ellipse(x,y+r*.18,r*.42,r*.28,0,0,Math.PI*2);ctx.fill();
  // Tiny freckles
  ctx.fillStyle=`rgba(194,96,122,${beat?.2:.38})`;
  for(const[fx,fy]of[[-r*.22,-r*.08],[r*.2,-r*.04],[-r*.08,r*.1],[r*.3,r*.06]]){
    ctx.beginPath();ctx.arc(x+fx,y+fy,r*.05,0,Math.PI*2);ctx.fill();
  }
  // Eyes — large and round
  const ey=y-r*.18,ex=r*.32;
  if(!emoteEyes(m,x,y,r,ex,ey)){
    if(!beat){
      ctx.fillStyle='#1a0a2e';ctx.beginPath();ctx.arc(x-ex,ey,r*.16,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.arc(x+ex,ey,r*.16,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(x-ex+r*.06,ey-r*.06,r*.06,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.arc(x+ex+r*.06,ey-r*.06,r*.06,0,Math.PI*2);ctx.fill();
    }else{ctx.strokeStyle=C_OUTLINE;ctx.lineWidth=2.2;for(const ox of[x-ex,x+ex]){const s=r*.12;ctx.beginPath();ctx.moveTo(ox-s,ey-s);ctx.lineTo(ox+s,ey+s);ctx.stroke();ctx.beginPath();ctx.moveTo(ox+s,ey-s);ctx.lineTo(ox-s,ey+s);ctx.stroke();}}
  }
  // Cute wide smile
  if(!emoteMouth(m,x,y,r)){
    ctx.strokeStyle=C_AXODK;ctx.lineWidth=1.8;
    ctx.beginPath();ctx.moveTo(x-r*.26,y+r*.2);ctx.quadraticCurveTo(x,y+r*.42,x+r*.26,y+r*.2);ctx.stroke();
  }
  drawHpBar(m);
}
function drawChibiGirl(m){
  if(!m.alive)return;
  const breathe=1+0.016*Math.sin(frameN*Math.PI/27+1.5);
  const{x,y}=m,r=m.r*breathe,hp=1-m.hits/MAX_HITS,beat=hp<.4;
  const hc=beat?C_CBGHRDK:C_CBGHR;
  // Side buns (behind head)
  ctx.fillStyle=hc;
  ctx.beginPath();ctx.arc(x-r*.76,y-r*.52,r*.34,0,Math.PI*2);ctx.fill();ctx.strokeStyle=C_OUTLINE;ctx.lineWidth=1.6;ctx.stroke();
  ctx.beginPath();ctx.arc(x+r*.76,y-r*.52,r*.34,0,Math.PI*2);ctx.fill();ctx.strokeStyle=C_OUTLINE;ctx.lineWidth=1.6;ctx.stroke();
  // Head
  const g=ctx.createRadialGradient(x-r*.2,y-r*.22,r*.05,x,y,r);
  g.addColorStop(0,beat?'#e09060':'#ffe8d0');g.addColorStop(1,beat?C_CHIBIDK:C_CHIBI);
  ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();ctx.strokeStyle=C_OUTLINE;ctx.lineWidth=2.2;ctx.stroke();
  // Hair bangs on top of head
  ctx.fillStyle=hc;
  ctx.beginPath();
  ctx.moveTo(x-r*.88,y-r*.42);
  ctx.quadraticCurveTo(x-r*.6,y-r*1.2,x,y-r*1.1);
  ctx.quadraticCurveTo(x+r*.6,y-r*1.2,x+r*.88,y-r*.42);
  ctx.quadraticCurveTo(x+r*.55,y-r*.68,x,y-r*.64);
  ctx.quadraticCurveTo(x-r*.55,y-r*.68,x-r*.88,y-r*.42);
  ctx.closePath();ctx.fill();ctx.strokeStyle=C_OUTLINE;ctx.lineWidth=1.5;ctx.stroke();
  // Blush cheeks
  ctx.fillStyle='rgba(255,110,160,0.38)';
  ctx.beginPath();ctx.ellipse(x-r*.44,y+r*.1,r*.22,r*.14,0,0,Math.PI*2);ctx.fill();
  ctx.beginPath();ctx.ellipse(x+r*.44,y+r*.1,r*.22,r*.14,0,0,Math.PI*2);ctx.fill();
  // Eyes — large sparkly chibi eyes
  const ey=y-r*.16,ex=r*.32;
  if(!emoteEyes(m,x,y,r,ex,ey)){
    if(!beat){
      ctx.fillStyle='#fff';ctx.beginPath();ctx.ellipse(x-ex,ey,r*.17,r*.21,0,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.ellipse(x+ex,ey,r*.17,r*.21,0,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='#6a28b8';ctx.beginPath();ctx.ellipse(x-ex,ey+r*.02,r*.11,r*.15,0,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.ellipse(x+ex,ey+r*.02,r*.11,r*.15,0,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='#1a0a2e';ctx.beginPath();ctx.ellipse(x-ex,ey+r*.04,r*.065,r*.09,0,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.ellipse(x+ex,ey+r*.04,r*.065,r*.09,0,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(x-ex+r*.07,ey-r*.05,r*.055,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.arc(x+ex+r*.07,ey-r*.05,r*.055,0,Math.PI*2);ctx.fill();
      ctx.beginPath();ctx.arc(x-ex-r*.04,ey+r*.06,r*.025,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.arc(x+ex-r*.04,ey+r*.06,r*.025,0,Math.PI*2);ctx.fill();
    }else{ctx.strokeStyle=C_OUTLINE;ctx.lineWidth=2.2;for(const ox of[x-ex,x+ex]){const s=r*.12;ctx.beginPath();ctx.moveTo(ox-s,ey-s);ctx.lineTo(ox+s,ey+s);ctx.stroke();ctx.beginPath();ctx.moveTo(ox+s,ey-s);ctx.lineTo(ox-s,ey+s);ctx.stroke();}}
  }
  // Mouth
  if(!emoteMouth(m,x,y,r)){
    ctx.strokeStyle=C_CHIBIDK;ctx.lineWidth=1.8;
    ctx.beginPath();ctx.moveTo(x-r*.16,y+r*.26);ctx.quadraticCurveTo(x,y+r*.4,x+r*.16,y+r*.26);ctx.stroke();
  }
  drawHpBar(m);
}
function drawChibiBoy(m){
  if(!m.alive)return;
  const breathe=1+0.016*Math.sin(frameN*Math.PI/29+0.3);
  const{x,y}=m,r=m.r*breathe,hp=1-m.hits/MAX_HITS,beat=hp<.4;
  const hc=beat?C_CBBYHRDK:C_CBBYHR;
  // Spiky hair (behind head, spikes extend above)
  ctx.fillStyle=hc;
  ctx.beginPath();
  ctx.moveTo(x-r*.84,y-r*.45);
  ctx.lineTo(x-r*.72,y-r*1.3);ctx.lineTo(x-r*.42,y-r*.8);
  ctx.lineTo(x-r*.12,y-r*1.35);ctx.lineTo(x+r*.12,y-r*.8);
  ctx.lineTo(x+r*.42,y-r*1.3);ctx.lineTo(x+r*.72,y-r*.8);
  ctx.lineTo(x+r*.84,y-r*.45);
  ctx.quadraticCurveTo(x+r*.58,y-r*.62,x,y-r*.58);
  ctx.quadraticCurveTo(x-r*.58,y-r*.62,x-r*.84,y-r*.45);
  ctx.closePath();ctx.fill();ctx.strokeStyle=C_OUTLINE;ctx.lineWidth=1.5;ctx.stroke();
  // Head
  const g=ctx.createRadialGradient(x-r*.2,y-r*.22,r*.05,x,y,r);
  g.addColorStop(0,beat?'#e09060':'#ffe8d0');g.addColorStop(1,beat?C_CHIBIDK:C_CHIBI);
  ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();ctx.strokeStyle=C_OUTLINE;ctx.lineWidth=2.2;ctx.stroke();
  // Front hair tuft on forehead
  ctx.fillStyle=hc;
  ctx.beginPath();ctx.moveTo(x-r*.38,y-r*.72);ctx.quadraticCurveTo(x-r*.1,y-r*1.08,x,y-r*.68);ctx.quadraticCurveTo(x+r*.1,y-r*1.08,x+r*.38,y-r*.72);ctx.quadraticCurveTo(x,y-r*.88,x-r*.38,y-r*.72);ctx.closePath();ctx.fill();
  // Freckles
  ctx.fillStyle=`rgba(200,120,80,${beat?.15:.28})`;
  for(const[fx,fy]of[[-r*.22,r*.08],[r*.22,r*.08],[-r*.34,r*.02],[r*.34,r*.02]]){ctx.beginPath();ctx.arc(x+fx,y+fy,r*.04,0,Math.PI*2);ctx.fill();}
  // Eyes — round and bright
  const ey=y-r*.15,ex=r*.32;
  if(!emoteEyes(m,x,y,r,ex,ey)){
    if(!beat){
      ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(x-ex,ey,r*.16,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.arc(x+ex,ey,r*.16,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='#1e5ab0';ctx.beginPath();ctx.arc(x-ex,ey,r*.11,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.arc(x+ex,ey,r*.11,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='#1a0a2e';ctx.beginPath();ctx.arc(x-ex,ey,r*.07,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.arc(x+ex,ey,r*.07,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(x-ex+r*.06,ey-r*.06,r*.04,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.arc(x+ex+r*.06,ey-r*.06,r*.04,0,Math.PI*2);ctx.fill();
    }else{ctx.strokeStyle=C_OUTLINE;ctx.lineWidth=2.2;for(const ox of[x-ex,x+ex]){const s=r*.12;ctx.beginPath();ctx.moveTo(ox-s,ey-s);ctx.lineTo(ox+s,ey+s);ctx.stroke();ctx.beginPath();ctx.moveTo(ox+s,ey-s);ctx.lineTo(ox-s,ey+s);ctx.stroke();}}
  }
  // Mouth
  if(!emoteMouth(m,x,y,r)){
    ctx.strokeStyle=C_CHIBIDK;ctx.lineWidth=1.8;
    ctx.beginPath();ctx.moveTo(x-r*.2,y+r*.27);ctx.quadraticCurveTo(x,y+r*.4,x+r*.2,y+r*.27);ctx.stroke();
  }
  drawHpBar(m);
}
function drawStar4(x,y,s){
  ctx.beginPath();
  for(let i=0;i<8;i++){const a=i/8*Math.PI*2,rr=i%2===0?s:s*.32;i===0?ctx.moveTo(x+Math.cos(a)*rr,y+Math.sin(a)*rr):ctx.lineTo(x+Math.cos(a)*rr,y+Math.sin(a)*rr);}
  ctx.closePath();ctx.fill();
}
function drawPowerUp(){
  if(!powerUp)return;
  const{x,y,r}=powerUp;
  powerUp.glimmerT++;
  const t=powerUp.glimmerT;
  // Soft silver outer glow
  const glow=ctx.createRadialGradient(x,y,r*.2,x,y,r*2.1);
  glow.addColorStop(0,'rgba(220,220,255,0.18)');glow.addColorStop(1,'rgba(200,200,255,0)');
  ctx.fillStyle=glow;ctx.beginPath();ctx.arc(x,y,r*2.1,0,Math.PI*2);ctx.fill();
  // Pulsing outer ring — cycles through rainbow hues
  const ringHue=(t*1.8)%360;
  ctx.strokeStyle=`hsla(${ringHue},100%,75%,${.45+.2*Math.sin(t*.09)})`;ctx.lineWidth=2;
  ctx.beginPath();ctx.arc(x,y,r*(1.14+.07*Math.sin(t*.07)),0,Math.PI*2);ctx.stroke();
  // Translucent silver body
  const g=ctx.createRadialGradient(x-r*.3,y-r*.32,r*.05,x,y,r);
  g.addColorStop(0,'rgba(255,255,255,0.92)');
  g.addColorStop(.35,'rgba(200,208,220,0.78)');
  g.addColorStop(.75,'rgba(160,170,190,0.62)');
  g.addColorStop(1,'rgba(110,120,145,0.55)');
  ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();
  ctx.strokeStyle='rgba(255,255,255,.6)';ctx.lineWidth=1.8;ctx.stroke();
  // Rainbow glimmer rays — each ray a different hue, slowly rotating
  ctx.save();ctx.translate(x,y);ctx.rotate(t*.033);
  for(let i=0;i<8;i++){
    const a=i/8*Math.PI*2;
    const hue=(t*2+i*45)%360;
    const len=r*(.78+.24*Math.sin(t*.085+i*1.1));
    const alpha=.55+.3*Math.sin(t*.07+i);
    ctx.strokeStyle=`hsla(${hue},100%,72%,${alpha})`;ctx.lineWidth=1.8;
    ctx.beginPath();ctx.moveTo(Math.cos(a)*r*.44,Math.sin(a)*r*.44);ctx.lineTo(Math.cos(a)*len,Math.sin(a)*len);ctx.stroke();
  }
  ctx.restore();
  // Chrome inner highlight
  ctx.fillStyle='rgba(255,255,255,.55)';
  ctx.beginPath();ctx.ellipse(x-r*.2,y-r*.24,r*.28,r*.17,-.3,0,Math.PI*2);ctx.fill();
  // Secondary smaller highlight
  ctx.fillStyle='rgba(255,255,255,.25)';
  ctx.beginPath();ctx.ellipse(x+r*.18,y+r*.2,r*.14,r*.09,.4,0,Math.PI*2);ctx.fill();
  // +5 label
  ctx.font=`900 ${Math.round(r*.72)}px Nunito,monospace`;
  ctx.textAlign='center';ctx.textBaseline='middle';
  ctx.strokeStyle='rgba(80,90,120,.55)';ctx.lineWidth=3;ctx.strokeText('+5',x,y+r*.06);
  ctx.fillStyle='#ffffff';ctx.fillText('+5',x,y+r*.06);
  ctx.textBaseline='alphabetic';
  // Orbiting rainbow sparkle stars
  for(let i=0;i<4;i++){
    const a=t*.053+i/4*Math.PI*2;
    const hue=(t*2.5+i*90)%360;
    const ss=r*(.1+.04*Math.sin(t*.11+i*2));
    ctx.fillStyle=`hsla(${hue},100%,78%,${.6+.35*Math.sin(t*.09+i*1.6)})`;
    drawStar4(x+Math.cos(a)*r*1.32,y+Math.sin(a)*r*1.32,ss);
  }
}
function drawHpBar(m){}


// ── Perfect Game: per-character victory animations ────────────────────
function drawCatPerfect(x,y,r,t){
  ctx.save();ctx.translate(x,y);
  const spin=t<0.75?t*12:9+Math.sin(t*8)*0.3;
  const wobble=Math.sin(t*28)*0.08*(1-t);
  ctx.rotate(spin+wobble);
  const sc=t<0.15?t/0.15:1+Math.sin(t*14)*0.08;
  ctx.scale(sc,sc);
  // Body
  const g=ctx.createRadialGradient(-r*.2,-r*.2,r*.05,0,0,r);
  g.addColorStop(0,'#ffcc66');g.addColorStop(1,C_CAT);
  ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,r,0,Math.PI*2);ctx.fill();
  ctx.strokeStyle=C_OUTLINE;ctx.lineWidth=2.5;ctx.stroke();
  // Ears
  for(const s of[-1,1]){ctx.fillStyle=C_CAT;ctx.beginPath();ctx.moveTo(s*r*.48,-r*.72);ctx.lineTo(s*r*.13,-r*1.22);ctx.lineTo(-s*r*.12,-r*.72);ctx.fill();
    ctx.fillStyle=C_CATPINK;ctx.beginPath();ctx.moveTo(s*r*.4,-r*.76);ctx.lineTo(s*r*.14,-r*1.1);ctx.lineTo(-s*r*.04,-r*.76);ctx.fill();}
  // Star eyes
  for(const sx of[-1,1]){
    const ex=sx*r*.36,ey=-r*.12;
    ctx.fillStyle=`hsl(${(t*600+sx*90)%360},100%,65%)`;
    for(let i=0;i<5;i++){const a=i*Math.PI*2/5-Math.PI/2+t*4;
      ctx.beginPath();ctx.moveTo(ex,ey);ctx.lineTo(ex+Math.cos(a)*r*.22,ey+Math.sin(a)*r*.22);ctx.lineTo(ex+Math.cos(a+Math.PI/5)*r*.09,ey+Math.sin(a+Math.PI/5)*r*.09);ctx.fill();}
  }
  // Rainbow whiskers
  for(let i=-1;i<=1;i++){const wy=r*.08+i*r*.13;
    ctx.strokeStyle=`hsl(${(t*400+i*60)%360},100%,60%)`;ctx.lineWidth=2;
    ctx.beginPath();ctx.moveTo(-r*.06,wy);ctx.lineTo(-r*.95,wy+i*r*.08+Math.sin(t*20+i)*r*.15);ctx.stroke();
    ctx.beginPath();ctx.moveTo(r*.06,wy);ctx.lineTo(r*.95,wy+i*r*.08+Math.sin(t*20+i+1)*r*.15);ctx.stroke();}
  // Big open smile
  ctx.strokeStyle=C_OUTLINE;ctx.lineWidth=2.5;ctx.beginPath();ctx.arc(0,r*.15,r*.35,0.1,Math.PI-0.1);ctx.stroke();
  ctx.fillStyle=C_CATPINK;ctx.beginPath();ctx.arc(0,r*.15,r*.33,0.15,Math.PI-0.15);ctx.fill();
  // Swishing tail
  const tailAng=Math.sin(t*18)*0.8;
  ctx.strokeStyle=C_CAT;ctx.lineWidth=r*.2;ctx.lineCap='round';
  ctx.beginPath();ctx.moveTo(0,r*.7);ctx.quadraticCurveTo(r*.6*Math.sin(tailAng),r*1.4,r*Math.sin(tailAng)*1.2,r*1.6);ctx.stroke();
  ctx.lineCap='butt';
  ctx.restore();
}
function drawCapybaraPerfect(x,y,r,t){
  ctx.save();ctx.translate(x,y);
  const sc=t<0.15?t/0.15:1;
  const jelly=1+Math.sin(t*22)*0.12*(1-t*0.5);
  const jellyY=1+Math.sin(t*22+Math.PI/2)*0.12*(1-t*0.5);
  ctx.scale(sc*jelly,sc*jellyY);
  // Body
  const g=ctx.createRadialGradient(-r*.18,-r*.2,r*.05,0,0,r);
  g.addColorStop(0,'#d4883a');g.addColorStop(1,C_CAPY);
  ctx.fillStyle=g;ctx.beginPath();ctx.ellipse(0,0,r*1.06,r*.95,0,0,Math.PI*2);ctx.fill();
  ctx.strokeStyle=C_OUTLINE;ctx.lineWidth=2.5;ctx.stroke();
  // Ears
  for(const s of[-1,1]){ctx.fillStyle=C_CAPY;ctx.beginPath();ctx.arc(s*r*.62,-r*.72,r*.3,0,Math.PI*2);ctx.fill();}
  // Nose patch
  ctx.fillStyle=C_CAPYNOSE;ctx.beginPath();ctx.ellipse(0,r*.22,r*.56,r*.38,0,0,Math.PI*2);ctx.fill();
  // Nose traces circles
  const noseX=Math.sin(t*16)*r*.15,noseY=Math.cos(t*16)*r*.1+r*.2;
  ctx.fillStyle=C_CAPYDK;ctx.beginPath();ctx.arc(noseX-r*.12,noseY,r*.08,0,Math.PI*2);ctx.fill();
  ctx.beginPath();ctx.arc(noseX+r*.12,noseY,r*.08,0,Math.PI*2);ctx.fill();
  // Happy closed eyes (zen)
  ctx.strokeStyle=C_OUTLINE;ctx.lineWidth=2.5;
  for(const s of[-1,1]){ctx.beginPath();ctx.arc(s*r*.28,-r*.18+Math.sin(t*12)*r*.03,r*.14,Math.PI,2*Math.PI);ctx.stroke();}
  // Blissful smile
  ctx.strokeStyle=C_CAPYDK;ctx.lineWidth=2;ctx.beginPath();ctx.arc(0,r*.35,r*.25,0.1,Math.PI-0.1);ctx.stroke();
  ctx.restore();
  // Orbiting mini capybaras
  for(let i=0;i<4;i++){
    const oa=t*6+i*Math.PI/2;
    const od=r*1.8+i*12+Math.sin(t*8+i)*10;
    const mx=x+Math.cos(oa)*od,my=y+Math.sin(oa)*od;
    const mr=r*.28;
    ctx.fillStyle=C_CAPY;ctx.beginPath();ctx.arc(mx,my,mr,0,Math.PI*2);ctx.fill();
    ctx.strokeStyle=C_OUTLINE;ctx.lineWidth=1.5;ctx.stroke();
    ctx.fillStyle=C_CAPYNOSE;ctx.beginPath();ctx.ellipse(mx,my+mr*.3,mr*.45,mr*.3,0,0,Math.PI*2);ctx.fill();
    ctx.fillStyle=C_OUTLINE;ctx.beginPath();ctx.arc(mx-mr*.2,my-mr*.15,mr*.12,0,Math.PI*2);ctx.fill();
    ctx.beginPath();ctx.arc(mx+mr*.2,my-mr*.15,mr*.12,0,Math.PI*2);ctx.fill();
  }
}
function drawBearPerfect(x,y,r,t){
  ctx.save();ctx.translate(x,y);
  const sc=t<0.15?t/0.15:1;
  const flex=1+Math.sin(t*16)*0.15;
  const flexY=1+Math.sin(t*16+Math.PI)*0.1;
  ctx.scale(sc*flex,sc*flexY);
  // Body
  const g=ctx.createRadialGradient(-r*.2,-r*.2,r*.05,0,0,r);
  g.addColorStop(0,'#a87050');g.addColorStop(1,C_BEAR);
  ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,r,0,Math.PI*2);ctx.fill();
  ctx.strokeStyle=C_OUTLINE;ctx.lineWidth=2.5;ctx.stroke();
  // Ears
  for(const s of[-1,1]){ctx.fillStyle=C_BEAR;ctx.beginPath();ctx.arc(s*r*.65,-r*.65,r*.28,0,Math.PI*2);ctx.fill();
    ctx.fillStyle=C_BEARDK;ctx.beginPath();ctx.arc(s*r*.65,-r*.65,r*.15,0,Math.PI*2);ctx.fill();}
  // Muscle bumps
  const mBulge=Math.sin(t*16)*r*.18;
  ctx.fillStyle=C_BEARDK;
  ctx.beginPath();ctx.ellipse(-r*1.05,r*.05,r*.2+mBulge*0.5,r*.3,0,0,Math.PI*2);ctx.fill();
  ctx.beginPath();ctx.ellipse(r*1.05,r*.05,r*.2+mBulge*0.5,r*.3,0,0,Math.PI*2);ctx.fill();
  // Roar mouth — big open
  const mouthOpen=0.3+Math.sin(t*12)*0.15;
  ctx.fillStyle='#3a1a0a';ctx.beginPath();ctx.ellipse(0,r*.25,r*.35,r*mouthOpen,0,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#cc3322';ctx.beginPath();ctx.ellipse(0,r*.3,r*.2,r*mouthOpen*0.4,0,0,Math.PI*2);ctx.fill();
  // Teeth
  ctx.fillStyle='#fff';
  for(let i=-2;i<=2;i++){ctx.beginPath();ctx.moveTo(i*r*.12,r*.25-r*mouthOpen*0.7);ctx.lineTo(i*r*.12-r*.04,r*.25-r*mouthOpen*0.3);ctx.lineTo(i*r*.12+r*.04,r*.25-r*mouthOpen*0.3);ctx.fill();}
  // Fierce eyes
  ctx.fillStyle=C_OUTLINE;
  for(const s of[-1,1]){ctx.beginPath();ctx.arc(s*r*.3,-r*.15,r*.16,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='#ff6622';ctx.beginPath();ctx.arc(s*r*.3,-r*.15,r*.1,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(s*r*.32,-r*.2,r*.04,0,Math.PI*2);ctx.fill();ctx.fillStyle=C_OUTLINE;}
  // Snout
  ctx.fillStyle='#c09060';ctx.beginPath();ctx.ellipse(0,r*.08,r*.28,r*.2,0,0,Math.PI*2);ctx.fill();
  ctx.fillStyle=C_BEARDK;ctx.beginPath();ctx.ellipse(0,-r*.02,r*.1,r*.07,0,0,Math.PI*2);ctx.fill();
  ctx.restore();
  // Shockwave rings
  if(Math.floor(t*12)%2===0){
    const ringR=r*(1.5+(t*6)%1.5);const ringA=0.3*(1-(t*6)%1.5/1.5);
    ctx.strokeStyle=`rgba(255,140,40,${ringA})`;ctx.lineWidth=3;
    ctx.beginPath();ctx.arc(x,y,ringR,0,Math.PI*2);ctx.stroke();
  }
}
function drawBunnyPerfect(x,y,r,t){
  const hop=Math.sin(t*32)*r*0.4*(t<0.8?1:1-(t-0.8)/0.2);
  ctx.save();ctx.translate(x,y+hop);
  const sc=t<0.15?t/0.15:1;
  const dizzy=t>0.6?Math.sin(t*20)*(t-0.6)*3:0;
  ctx.rotate(dizzy);ctx.scale(sc,sc);
  // Body
  const g=ctx.createRadialGradient(-r*.15,-r*.15,r*.05,0,0,r);
  g.addColorStop(0,'#fff');g.addColorStop(1,C_BUN);
  ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,r,0,Math.PI*2);ctx.fill();
  ctx.strokeStyle=C_OUTLINE;ctx.lineWidth=2.5;ctx.stroke();
  // Floppy ears
  for(const s of[-1,1]){
    const earFlop=Math.sin(t*24+s*1.2)*0.5;
    ctx.save();ctx.translate(s*r*.3,-r*.7);ctx.rotate(s*0.2+earFlop);
    ctx.fillStyle=C_BUN;ctx.beginPath();ctx.ellipse(0,-r*.5,r*.2,r*.55,0,0,Math.PI*2);ctx.fill();
    ctx.fillStyle=C_BUNPINK;ctx.beginPath();ctx.ellipse(0,-r*.5,r*.1,r*.42,0,0,Math.PI*2);ctx.fill();
    ctx.strokeStyle=C_OUTLINE;ctx.lineWidth=1.5;ctx.beginPath();ctx.ellipse(0,-r*.5,r*.2,r*.55,0,0,Math.PI*2);ctx.stroke();
    ctx.restore();
  }
  // Pink cheeks
  ctx.fillStyle='rgba(255,160,180,0.5)';
  ctx.beginPath();ctx.arc(-r*.45,r*.1,r*.15,0,Math.PI*2);ctx.fill();
  ctx.beginPath();ctx.arc(r*.45,r*.1,r*.15,0,Math.PI*2);ctx.fill();
  // Happy eyes — big and sparkly
  for(const s of[-1,1]){
    ctx.fillStyle=C_OUTLINE;ctx.beginPath();ctx.arc(s*r*.28,-r*.1,r*.16,0,Math.PI*2);ctx.fill();
    ctx.fillStyle=`hsl(${(t*300+s*60)%360},80%,65%)`;ctx.beginPath();ctx.arc(s*r*.28,-r*.1,r*.11,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(s*r*.3,-r*.15,r*.05,0,Math.PI*2);ctx.fill();
  }
  // Open happy mouth
  ctx.fillStyle=C_BUNPINK;ctx.beginPath();ctx.arc(0,r*.2,r*.2,0,Math.PI);ctx.fill();
  // Buck teeth
  ctx.fillStyle='#fff';ctx.fillRect(-r*.08,r*.12,r*.06,r*.12);ctx.fillRect(r*.02,r*.12,r*.06,r*.12);
  // Nose
  ctx.fillStyle=C_BUNPINK;ctx.beginPath();ctx.ellipse(0,r*.06,r*.08,r*.05,0,0,Math.PI*2);ctx.fill();
  ctx.restore();
  // Confetti bursts
  if(Math.floor(t*20)%3===0&&t<0.85){burst(x+(Math.random()-.5)*r*3,y+(Math.random()-.5)*r*2,`hsl(${Math.random()*360},90%,65%)`,5);}
}
function drawAxolotlPerfect(x,y,r,t){
  ctx.save();ctx.translate(x,y);
  const sc=t<0.15?t/0.15:1;
  // Rubbery stretch
  const strX=1+Math.sin(t*18)*0.15*(1-t*0.4);
  const strY=1+Math.sin(t*18+Math.PI/2)*0.15*(1-t*0.4);
  ctx.scale(sc*strX,sc*strY);
  // Gills — flutter like crazy
  const gillCol=C_AXOGILL;
  ctx.strokeStyle=gillCol;ctx.lineWidth=3;
  for(let s=-1;s<=1;s++){
    const gx=s===0?0:s*r*.78,gBase=-r*.38;
    const wave=Math.sin(t*60+s*2)*r*.14;
    for(let g2=-1;g2<=1;g2++){
      const ox=gx+g2*r*.16,topY=gBase-r*(.55+Math.abs(g2)*.12)+wave;
      ctx.beginPath();ctx.moveTo(ox,gBase);ctx.quadraticCurveTo(ox+wave*.8,gBase-r*.3,ox,topY);ctx.stroke();
      ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(ox,gBase-r*.2);ctx.lineTo(ox+s*r*.12,gBase-r*.28);ctx.stroke();
      ctx.lineWidth=3;
    }
  }
  // Body
  const g=ctx.createRadialGradient(-r*.2,-r*.22,r*.04,0,0,r);
  g.addColorStop(0,'#ffccd8');g.addColorStop(1,C_AXO);
  ctx.fillStyle=g;ctx.beginPath();ctx.ellipse(0,0,r,r*.92,0,0,Math.PI*2);ctx.fill();
  ctx.strokeStyle=C_OUTLINE;ctx.lineWidth=2.5;ctx.stroke();
  // Belly
  ctx.fillStyle=C_AXOBELLY;ctx.beginPath();ctx.ellipse(0,r*.18,r*.42,r*.28,0,0,Math.PI*2);ctx.fill();
  // Giant happy eyes
  for(const s of[-1,1]){
    ctx.fillStyle=C_OUTLINE;ctx.beginPath();ctx.arc(s*r*.32,-r*.18,r*.2,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(s*r*.32,-r*.18,r*.15,0,Math.PI*2);ctx.fill();
    ctx.fillStyle=C_OUTLINE;ctx.beginPath();ctx.arc(s*r*.34,-r*.14,r*.08,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(s*r*.36,-r*.2,r*.04,0,Math.PI*2);ctx.fill();
  }
  // Wide grin
  ctx.strokeStyle=C_AXODK;ctx.lineWidth=2;
  ctx.beginPath();ctx.arc(0,r*.15,r*.32,0.1,Math.PI-0.1);ctx.stroke();
  ctx.fillStyle='rgba(255,77,128,0.3)';ctx.beginPath();ctx.arc(0,r*.15,r*.3,0.15,Math.PI-0.15);ctx.fill();
  ctx.restore();
  // Bubbles from gills
  if(Math.floor(t*40)%2===0){
    for(let i=0;i<2;i++){
      const bx=x+(Math.random()-.5)*r*2,by=y-r*0.5-Math.random()*r*0.5;
      ctx.strokeStyle=`rgba(255,180,210,${0.3+Math.random()*0.3})`;ctx.lineWidth=1;
      ctx.beginPath();ctx.arc(bx,by,3+Math.random()*6,0,Math.PI*2);ctx.stroke();
    }
  }
}
function drawChibiGirlPerfect(x,y,r,t){
  ctx.save();ctx.translate(x,y);
  const sc=t<0.15?t/0.15:1;
  const twirl=t<0.75?t*10:7.5+Math.sin(t*6)*0.2;
  ctx.rotate(twirl);ctx.scale(sc,sc);
  // Hair fans out wider during spin
  const hairW=r*.55+Math.sin(t*14)*r*.15;
  ctx.fillStyle=C_CBGHR;
  ctx.beginPath();ctx.arc(0,0,r*1.1,0,Math.PI*2);ctx.fill();
  // Hair highlights
  ctx.fillStyle=C_CBGHRDK;
  ctx.beginPath();ctx.arc(r*.2,-r*.3,r*.35,0,Math.PI*2);ctx.fill();
  // Face
  ctx.fillStyle=C_CHIBI;ctx.beginPath();ctx.arc(0,r*.05,r*.75,0,Math.PI*2);ctx.fill();
  ctx.strokeStyle=C_OUTLINE;ctx.lineWidth=2;ctx.beginPath();ctx.arc(0,r*.05,r*.75,0,Math.PI*2);ctx.stroke();
  // Big sparkly eyes
  for(const s of[-1,1]){
    ctx.fillStyle=C_OUTLINE;ctx.beginPath();ctx.arc(s*r*.25,0,r*.17,0,Math.PI*2);ctx.fill();
    ctx.fillStyle=`hsl(${(t*500+s*120)%360},80%,60%)`;ctx.beginPath();ctx.arc(s*r*.25,0,r*.12,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(s*r*.27,-r*.05,r*.05,0,Math.PI*2);ctx.fill();
    ctx.beginPath();ctx.arc(s*r*.22,r*.04,r*.03,0,Math.PI*2);ctx.fill();
  }
  // Blush
  ctx.fillStyle='rgba(255,130,160,0.45)';
  ctx.beginPath();ctx.arc(-r*.4,r*.15,r*.12,0,Math.PI*2);ctx.fill();
  ctx.beginPath();ctx.arc(r*.4,r*.15,r*.12,0,Math.PI*2);ctx.fill();
  // Happy mouth
  ctx.strokeStyle=C_OUTLINE;ctx.lineWidth=2;ctx.beginPath();ctx.arc(0,r*.22,r*.18,0.15,Math.PI-0.15);ctx.stroke();
  // Hair bow
  ctx.fillStyle='#ff6699';
  ctx.beginPath();ctx.moveTo(-r*.5,-r*.7);ctx.quadraticCurveTo(-r*.7,-r*1.1,-r*.3,-r*1.0);ctx.quadraticCurveTo(-r*.5,-r*.8,-r*.5,-r*.7);ctx.fill();
  ctx.beginPath();ctx.moveTo(-r*.5,-r*.7);ctx.quadraticCurveTo(-r*.3,-r*1.1,-r*.7,-r*1.0);ctx.quadraticCurveTo(-r*.5,-r*.8,-r*.5,-r*.7);ctx.fill();
  ctx.restore();
  // Sparkle trail + flower petals
  for(let i=0;i<6;i++){
    const pa=t*8+i*Math.PI/3;
    const pd=r*1.5+Math.sin(t*6+i)*r*0.5;
    const px=x+Math.cos(pa)*pd,py=y+Math.sin(pa)*pd;
    // Sparkle diamond
    ctx.fillStyle=`hsla(${(t*400+i*60)%360},90%,75%,${0.5+Math.sin(t*16+i)*0.3})`;
    ctx.save();ctx.translate(px,py);ctx.rotate(t*8+i);
    ctx.beginPath();ctx.moveTo(0,-5);ctx.lineTo(3,0);ctx.lineTo(0,5);ctx.lineTo(-3,0);ctx.fill();
    ctx.restore();
  }
}
function drawChibiBoyPerfect(x,y,r,t){
  const pump=Math.sin(t*18)*r*0.3*(t<0.8?1:1-(t-0.8)/0.2);
  ctx.save();ctx.translate(x,y+pump);
  const sc=t<0.15?t/0.15:1;
  ctx.scale(sc,sc);
  // Energy aura
  const auraR=r*1.4+Math.sin(t*20)*r*0.2;
  const auraG=ctx.createRadialGradient(0,0,r*0.5,0,0,auraR);
  auraG.addColorStop(0,`rgba(60,130,220,${0.15+Math.sin(t*12)*0.1})`);
  auraG.addColorStop(1,'rgba(60,130,220,0)');
  ctx.fillStyle=auraG;ctx.beginPath();ctx.arc(0,0,auraR,0,Math.PI*2);ctx.fill();
  // Hair
  ctx.fillStyle=C_CBBYHR;ctx.beginPath();ctx.arc(0,0,r*1.05,0,Math.PI*2);ctx.fill();
  // Spiky hair top
  for(let i=-2;i<=2;i++){
    const sx2=i*r*.22,sy=-r*.7-Math.abs(i)*r*.08;
    ctx.beginPath();ctx.moveTo(sx2-r*.12,-r*.6);ctx.lineTo(sx2,sy-r*.3-Math.sin(t*14+i)*r*.1);ctx.lineTo(sx2+r*.12,-r*.6);ctx.fill();
  }
  // Face
  ctx.fillStyle=C_CHIBI;ctx.beginPath();ctx.arc(0,r*.05,r*.75,0,Math.PI*2);ctx.fill();
  ctx.strokeStyle=C_OUTLINE;ctx.lineWidth=2;ctx.stroke();
  // Determined eyes
  for(const s of[-1,1]){
    ctx.fillStyle=C_OUTLINE;ctx.beginPath();ctx.arc(s*r*.25,0,r*.16,0,Math.PI*2);ctx.fill();
    ctx.fillStyle=C_CBBYHR;ctx.beginPath();ctx.arc(s*r*.25,0,r*.1,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(s*r*.27,-r*.04,r*.04,0,Math.PI*2);ctx.fill();
    // Eyebrow
    ctx.strokeStyle=C_OUTLINE;ctx.lineWidth=2.5;
    ctx.beginPath();ctx.moveTo(s*r*.12,-r*.2);ctx.lineTo(s*r*.38,-r*.25);ctx.stroke();
  }
  // Grin
  ctx.strokeStyle=C_OUTLINE;ctx.lineWidth=2;ctx.beginPath();ctx.arc(0,r*.2,r*.22,0.1,Math.PI-0.1);ctx.stroke();
  // Fist pump arm
  const fistY=-r*0.5-Math.abs(pump)*1.2;
  ctx.strokeStyle=C_CHIBI;ctx.lineWidth=r*.18;ctx.lineCap='round';
  ctx.beginPath();ctx.moveTo(r*.5,r*.3);ctx.lineTo(r*.7,fistY);ctx.stroke();
  ctx.fillStyle=C_CHIBI;ctx.beginPath();ctx.arc(r*.7,fistY,r*.14,0,Math.PI*2);ctx.fill();
  ctx.strokeStyle=C_CHIBIDK;ctx.lineWidth=1.5;ctx.stroke();
  ctx.lineCap='butt';
  ctx.restore();
  // Lightning bolts
  if(t>0.2&&t<0.8){
    for(let i=0;i<4;i++){
      const la=t*5+i*Math.PI/2,ld=r*1.6+Math.sin(t*10+i)*r*0.3;
      const lx=x+Math.cos(la)*ld,ly=y+Math.sin(la)*ld;
      ctx.strokeStyle=`rgba(100,180,255,${0.5+Math.sin(t*20+i)*0.3})`;ctx.lineWidth=2.5;
      ctx.beginPath();ctx.moveTo(lx,ly-8);ctx.lineTo(lx-4,ly);ctx.lineTo(lx+2,ly);ctx.lineTo(lx-2,ly+8);ctx.stroke();
    }
  }
}

function drawMole(m){
  if(!m.alive)return;
  const breathe=1+0.016*Math.sin(frameN*Math.PI/31+1.8);
  const{x,y}=m,r=m.r*breathe,hp=1-m.hits/MAX_HITS,beat=hp<.4;
  // Digging claws — behind body
  ctx.fillStyle=beat?C_MOLEDK:C_MOLECLAW;
  for(const s of[-1,1]){
    for(let c=0;c<3;c++){
      const ca=s*(0.6+c*0.22),cx2=x+Math.cos(Math.PI/2+ca)*r*1.05,cy2=y+Math.sin(Math.PI/2+ca)*r*0.95;
      ctx.beginPath();ctx.ellipse(cx2,cy2,r*.08,r*.18,ca,0,Math.PI*2);ctx.fill();
    }
  }
  // Body — dark velvety mole
  const g=ctx.createRadialGradient(x-r*.2,y-r*.2,r*.05,x,y,r);
  g.addColorStop(0,beat?'#3a2a20':'#5e4a3c');g.addColorStop(1,beat?C_MOLEDK:C_MOLE);
  ctx.fillStyle=g;ctx.beginPath();ctx.ellipse(x,y,r,r*.94,0,0,Math.PI*2);ctx.fill();
  ctx.strokeStyle=C_OUTLINE;ctx.lineWidth=2.2;ctx.stroke();
  // Velvet sheen — subtle highlight stripe
  ctx.fillStyle=`rgba(120,100,80,${beat?.12:.22})`;
  ctx.beginPath();ctx.ellipse(x,y-r*.2,r*.5,r*.15,0,0,Math.PI*2);ctx.fill();
  // Eyes — tiny beady dots (moles are nearly blind)
  const ey=y-r*.1,ex=r*.26;
  if(!emoteEyes(m,x,y,r,ex,ey)){
    if(!beat){
      ctx.fillStyle=C_OUTLINE;ctx.beginPath();ctx.arc(x-ex,ey,r*.07,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.arc(x+ex,ey,r*.07,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(x-ex+r*.02,ey-r*.02,r*.025,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.arc(x+ex+r*.02,ey-r*.02,r*.025,0,Math.PI*2);ctx.fill();
    }else{ctx.strokeStyle=C_OUTLINE;ctx.lineWidth=2;for(const ox of[x-ex,x+ex]){const s=r*.06;ctx.beginPath();ctx.moveTo(ox-s,ey-s);ctx.lineTo(ox+s,ey+s);ctx.stroke();ctx.beginPath();ctx.moveTo(ox+s,ey-s);ctx.lineTo(ox-s,ey+s);ctx.stroke();}}
  }
  // Star nose — the signature feature! 11 fleshy tentacle rays
  const noseY=y+r*.18,noseR=r*.24;
  for(let i=0;i<11;i++){
    const a=i/11*Math.PI*2-Math.PI/2;
    const wave=Math.sin(frameN*0.15+i*0.9)*r*.015;
    const tx=x+Math.cos(a)*noseR+wave,ty=noseY+Math.sin(a)*noseR*0.65+wave;
    ctx.fillStyle=beat?C_MOLEDK:C_MOLENOSE;ctx.beginPath();ctx.ellipse(tx,ty,r*.05,r*.035,a,0,Math.PI*2);ctx.fill();
  }
  // Nose center
  ctx.fillStyle=beat?'#7a4050':C_MOLENOSE;ctx.beginPath();ctx.arc(x,noseY,r*.1,0,Math.PI*2);ctx.fill();
  ctx.strokeStyle=C_OUTLINE;ctx.lineWidth=1.2;ctx.stroke();
  // Mouth
  if(!emoteMouth(m,x,y,r)){
    ctx.strokeStyle=C_MOLEDK;ctx.lineWidth=1.5;
    ctx.beginPath();ctx.moveTo(x-r*.14,y+r*.34);ctx.quadraticCurveTo(x,y+r*.42,x+r*.14,y+r*.34);ctx.stroke();
  }
  drawHpBar(m);
}
function drawMolePerfect(x,y,r,t){
  ctx.save();ctx.translate(x,y);
  const sc=t<0.15?t/0.15:1;
  const dig=Math.sin(t*16)*r*0.15*(t<0.7?1:1-(t-0.7)/0.3);
  ctx.translate(0,dig);ctx.scale(sc,sc);
  ctx.rotate(Math.sin(t*14)*0.1);
  // Body
  const g=ctx.createRadialGradient(-r*.2,-r*.2,r*.05,0,0,r);
  g.addColorStop(0,'#6a5444');g.addColorStop(1,C_MOLE);
  ctx.fillStyle=g;ctx.beginPath();ctx.ellipse(0,0,r,r*.94,0,0,Math.PI*2);ctx.fill();
  ctx.strokeStyle=C_OUTLINE;ctx.lineWidth=2.5;ctx.stroke();
  // Rainbow star nose — the celebration!
  const noseY2=r*.18;
  for(let i=0;i<11;i++){
    const a=i/11*Math.PI*2-Math.PI/2+t*3;
    const flare=1+0.4*Math.sin(t*12);
    const nr=r*.3*flare;
    const tx=Math.cos(a)*nr,ty=noseY2+Math.sin(a)*nr*0.65;
    ctx.fillStyle=`hsl(${(t*500+i*33)%360},100%,65%)`;
    ctx.beginPath();ctx.ellipse(tx,ty,r*.07,r*.045,a,0,Math.PI*2);ctx.fill();
  }
  ctx.fillStyle=`hsl(${(t*400)%360},90%,70%)`;ctx.beginPath();ctx.arc(0,noseY2,r*.14,0,Math.PI*2);ctx.fill();
  ctx.strokeStyle=C_OUTLINE;ctx.lineWidth=1.5;ctx.stroke();
  // Squeezed happy eyes
  ctx.strokeStyle=C_OUTLINE;ctx.lineWidth=2.4;
  for(const s of[-1,1]){ctx.beginPath();ctx.arc(s*r*.26,-r*.1+r*.05,r*.1,Math.PI,2*Math.PI);ctx.stroke();}
  // Big satisfied grin
  ctx.strokeStyle=C_OUTLINE;ctx.lineWidth=2.2;
  ctx.beginPath();ctx.arc(0,r*.15,r*.28,0.1,Math.PI-0.1);ctx.stroke();
  // Digging claws waving
  ctx.fillStyle=C_MOLECLAW;
  for(const s of[-1,1]){
    const pawA=Math.sin(t*18+s)*0.4;
    ctx.save();ctx.translate(s*r*.8,r*.5);ctx.rotate(pawA*s);
    for(let c=-1;c<=1;c++){ctx.beginPath();ctx.ellipse(c*r*.1,0,r*.06,r*.16,c*0.2,0,Math.PI*2);ctx.fill();}
    ctx.restore();
  }
  ctx.restore();
  // Dirt particles flying
  if(t>0.1&&t<0.85){
    for(let i=0;i<6;i++){
      const da=t*8+i*Math.PI/3,dd=r*1.3+Math.sin(t*12+i*2)*r*0.4;
      const dx=x+Math.cos(da)*dd,dy=y+Math.sin(da)*dd*0.6+r*0.3;
      const ds=r*(0.06+Math.sin(t*10+i)*0.03);
      ctx.fillStyle=`rgba(120,90,50,${0.4+Math.sin(t*15+i)*0.2})`;
      ctx.beginPath();ctx.arc(dx,dy,ds,0,Math.PI*2);ctx.fill();
    }
  }
}
