// ── Puck types ───────────────────────────────────────────────────────
const PT = [
  {n:'Hockey Puck',d(c,x,y,r){c.fillStyle='#1a1a1a';c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill();c.strokeStyle='#444';c.lineWidth=1.5;c.beginPath();c.arc(x,y,r*.65,0,Math.PI*2);c.stroke();c.beginPath();c.arc(x,y,r*.3,0,Math.PI*2);c.stroke();}},
  {n:'Tennis Ball',d(c,x,y,r){c.fillStyle='#b8dc00';c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill();c.strokeStyle='#fff';c.lineWidth=2.5;c.beginPath();c.moveTo(x-r,y);c.bezierCurveTo(x-r*.5,y-r*.6,x+r*.5,y-r*.6,x+r,y);c.stroke();c.beginPath();c.moveTo(x-r,y);c.bezierCurveTo(x-r*.5,y+r*.6,x+r*.5,y+r*.6,x+r,y);c.stroke();}},
  {n:'Baseball',d(c,x,y,r){c.fillStyle='#f5f0e8';c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill();c.strokeStyle='#cc3333';c.lineWidth=2;c.beginPath();c.arc(x-r*.3,y,r*.75,-.7,.7);c.stroke();c.beginPath();c.arc(x+r*.3,y,r*.75,Math.PI-.7,Math.PI+.7);c.stroke();c.lineWidth=1;for(let i=-2;i<=2;i++){c.beginPath();c.moveTo(x-r*.1,y+i*r*.18);c.lineTo(x-r*.35,y+i*r*.18-r*.08);c.stroke();c.beginPath();c.moveTo(x+r*.1,y+i*r*.18);c.lineTo(x+r*.35,y+i*r*.18-r*.08);c.stroke();}}},
  {n:'Soccer Ball',d(c,x,y,r){c.fillStyle='#fff';c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill();c.fillStyle='#111';const penta=(cx,cy,pr)=>{c.beginPath();for(let j=0;j<5;j++){const b=j/5*Math.PI*2-Math.PI/2;j?c.lineTo(cx+Math.cos(b)*pr,cy+Math.sin(b)*pr):c.moveTo(cx+Math.cos(b)*pr,cy+Math.sin(b)*pr);}c.closePath();c.fill();};penta(x,y,r*.38);for(let i=0;i<5;i++){const a=i/5*Math.PI*2+Math.PI/5;penta(x+Math.cos(a)*r*.68,y+Math.sin(a)*r*.68,r*.25);}}},
  {n:'Basketball',d(c,x,y,r){c.fillStyle='#e85c20';c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill();c.strokeStyle='#111';c.lineWidth=2;c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.stroke();c.beginPath();c.moveTo(x-r,y);c.lineTo(x+r,y);c.stroke();c.beginPath();c.arc(x,y,r*.55,Math.PI*1.5,Math.PI*.5);c.stroke();c.beginPath();c.arc(x,y,r*.55,Math.PI*.5,Math.PI*1.5);c.stroke();}},
  {n:'8-Ball',d(c,x,y,r){c.fillStyle='#111';c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill();c.fillStyle='#fff';c.beginPath();c.arc(x,y,r*.45,0,Math.PI*2);c.fill();c.fillStyle='#111';c.font=`bold ${r*.5}px monospace`;c.textAlign='center';c.textBaseline='middle';c.fillText('8',x,y+r*.05);c.textBaseline='alphabetic';}},
  {n:'Golf Ball',d(c,x,y,r){c.fillStyle='#f5f5f5';c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill();c.fillStyle='rgba(0,0,0,0.12)';for(let i=-2;i<=2;i++)for(let j=-2;j<=2;j++){const dx=i*r*.38,dy=j*r*.38+(j%2)*r*.19;if(dx*dx+dy*dy<r*r*.85){c.beginPath();c.arc(x+dx,y+dy,r*.1,0,Math.PI*2);c.fill();}}}},
  {n:'Ping Pong',d(c,x,y,r){const g=c.createRadialGradient(x-r*.3,y-r*.3,r*.1,x,y,r);g.addColorStop(0,'#fff8f0');g.addColorStop(1,'#f0d8c0');c.fillStyle=g;c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill();c.fillStyle='rgba(255,255,255,0.7)';c.beginPath();c.arc(x-r*.25,y-r*.3,r*.22,0,Math.PI*2);c.fill();}},
  {n:'Orange 🍊',d(c,x,y,r){c.fillStyle='#ff8800';c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill();c.strokeStyle='#cc6600';c.lineWidth=1;for(let i=0;i<8;i++){const a=i/8*Math.PI*2;c.beginPath();c.moveTo(x,y);c.lineTo(x+Math.cos(a)*r,y+Math.sin(a)*r);c.stroke();}c.fillStyle='#cc6600';c.beginPath();c.arc(x,y+r*.65,r*.12,0,Math.PI*2);c.fill();c.fillStyle='#3a8a00';c.beginPath();c.ellipse(x+r*.1,y-r*.85,r*.2,r*.12,-.5,0,Math.PI*2);c.fill();}},
  {n:'Apple 🍎',d(c,x,y,r){c.fillStyle='#e02020';c.beginPath();c.arc(x,y+r*.1,r*.95,0,Math.PI*2);c.fill();c.beginPath();c.arc(x-r*.3,y-r*.3,r*.45,0,Math.PI*2);c.fill();c.beginPath();c.arc(x+r*.3,y-r*.3,r*.45,0,Math.PI*2);c.fill();c.strokeStyle='#5a3000';c.lineWidth=2;c.beginPath();c.moveTo(x,y-r*.85);c.quadraticCurveTo(x+r*.3,y-r*1.2,x+r*.4,y-r*.9);c.stroke();c.fillStyle='#3a8a00';c.beginPath();c.ellipse(x+r*.25,y-r*.95,r*.22,r*.12,.6,0,Math.PI*2);c.fill();c.fillStyle='rgba(255,255,255,0.35)';c.beginPath();c.ellipse(x-r*.25,y-r*.2,r*.18,r*.28,-.4,0,Math.PI*2);c.fill();}},
  {n:'Watermelon',d(c,x,y,r){c.fillStyle='#3ab040';c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill();c.fillStyle='#e83050';c.beginPath();c.arc(x,y,r*.78,0,Math.PI*2);c.fill();c.fillStyle='#111';for(let i=0;i<7;i++){const a=i/7*Math.PI*2;c.beginPath();c.ellipse(x+Math.cos(a)*r*.42,y+Math.sin(a)*r*.42,r*.06,r*.1,a,0,Math.PI*2);c.fill();}c.fillStyle='rgba(255,100,120,0.3)';c.beginPath();c.arc(x-r*.2,y-r*.25,r*.35,0,Math.PI*2);c.fill();}},
  {n:'Lemon',d(c,x,y,r){c.fillStyle='#ffe020';c.beginPath();c.ellipse(x,y,r*1.1,r*.85,0,0,Math.PI*2);c.fill();c.strokeStyle='#cca800';c.lineWidth=1;for(let i=0;i<6;i++){const a=i/6*Math.PI*2;c.beginPath();c.moveTo(x,y);c.lineTo(x+Math.cos(a)*r,y+Math.sin(a)*r*.8);c.stroke();}c.fillStyle='#ffe020';c.beginPath();c.arc(x-r*1.0,y,r*.2,0,Math.PI*2);c.fill();c.beginPath();c.arc(x+r*1.0,y,r*.2,0,Math.PI*2);c.fill();}},
  {n:'Strawberry',d(c,x,y,r){c.fillStyle='#e02030';c.beginPath();c.moveTo(x,y+r);c.bezierCurveTo(x+r,y+r*.5,x+r,y-r*.3,x,y-r*.5);c.bezierCurveTo(x-r,y-r*.3,x-r,y+r*.5,x,y+r);c.fill();c.fillStyle='#ffe0a0';for(let i=0;i<8;i++){const a=i/8*Math.PI*2,d=r*.45;c.beginPath();c.arc(x+Math.cos(a)*d,y+Math.sin(a)*d+r*.1,r*.05,0,Math.PI*2);c.fill();}c.fillStyle='#3a9000';for(let i=0;i<4;i++){const a=i/4*Math.PI*2;c.beginPath();c.ellipse(x+Math.cos(a)*r*.35,y-r*.45+Math.sin(a)*r*.15,r*.2,r*.1,a,0,Math.PI*2);c.fill();}}},
  {n:'Cherry',d(c,x,y,r){c.fillStyle='#cc1030';c.beginPath();c.arc(x-r*.28,y+r*.1,r*.7,0,Math.PI*2);c.fill();c.beginPath();c.arc(x+r*.28,y+r*.1,r*.7,0,Math.PI*2);c.fill();c.strokeStyle='#3a6000';c.lineWidth=2;c.beginPath();c.moveTo(x-r*.28,y-r*.55);c.quadraticCurveTo(x,y-r*.9,x+r*.28,y-r*.55);c.stroke();c.fillStyle='rgba(255,100,100,0.4)';c.beginPath();c.arc(x-r*.42,y-r*.05,r*.22,0,Math.PI*2);c.fill();c.beginPath();c.arc(x+r*.42,y-r*.05,r*.22,0,Math.PI*2);c.fill();}},
  {n:'Peach 🍑',d(c,x,y,r){c.fillStyle='#ffaa60';c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill();c.fillStyle='#ff8040';c.beginPath();c.arc(x+r*.3,y+r*.2,r*.6,0,Math.PI*2);c.fill();c.strokeStyle='#cc6030';c.lineWidth=1.5;c.beginPath();c.moveTo(x,y-r*.9);c.quadraticCurveTo(x+r*.1,y+r*.2,x,y+r*.95);c.stroke();c.fillStyle='#3a8000';c.beginPath();c.ellipse(x+r*.1,y-r*.9,r*.25,r*.12,.5,0,Math.PI*2);c.fill();}},
  {n:'Kiwi',d(c,x,y,r){c.fillStyle='#5a3520';c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill();c.fillStyle='#a8d850';c.beginPath();c.arc(x,y,r*.85,0,Math.PI*2);c.fill();c.fillStyle='#e8ffa0';c.beginPath();c.arc(x,y,r*.2,0,Math.PI*2);c.fill();c.strokeStyle='#3a6010';c.lineWidth=1;for(let i=0;i<10;i++){const a=i/10*Math.PI*2;c.beginPath();c.moveTo(x+Math.cos(a)*r*.2,y+Math.sin(a)*r*.2);c.lineTo(x+Math.cos(a)*r*.75,y+Math.sin(a)*r*.75);c.stroke();c.fillStyle='#111';c.beginPath();c.arc(x+Math.cos(a)*r*.55,y+Math.sin(a)*r*.55,r*.05,0,Math.PI*2);c.fill();}}},
  {n:'Blueberry',d(c,x,y,r){c.fillStyle='#3a3080';c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill();c.fillStyle='#5050c0';c.beginPath();c.arc(x,y,r*.65,0,Math.PI*2);c.fill();c.fillStyle='#8880ff';c.beginPath();c.arc(x-r*.2,y-r*.2,r*.35,0,Math.PI*2);c.fill();c.strokeStyle='#1a1050';c.lineWidth=1.5;for(let i=0;i<5;i++){const a=i/5*Math.PI*2;c.beginPath();c.moveTo(x,y-r*.4);c.lineTo(x+Math.cos(a)*r*.25,y-r*.55);c.stroke();}}},
  {n:'Donut 🍩',d(c,x,y,r){c.fillStyle='#ffaacc';c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill();c.fillStyle='#c07840';c.beginPath();c.arc(x,y,r*.7,0,Math.PI*2);c.fill();c.fillStyle='#0b4a3c';c.beginPath();c.arc(x,y,r*.32,0,Math.PI*2);c.fill();const sc=['#ff3399','#33aaff','#ffcc00','#44cc44','#aa44ff'];for(let i=0;i<8;i++){const a=i/8*Math.PI*2,d=r*.55;c.fillStyle=sc[i%5];c.save();c.translate(x+Math.cos(a)*d,y+Math.sin(a)*d);c.rotate(a);c.fillRect(-r*.12,-r*.04,r*.24,r*.08);c.restore();}}},
  {n:'Cookie 🍪',d(c,x,y,r){c.fillStyle='#c88040';c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill();c.fillStyle='#d89050';for(let i=0;i<6;i++){const a=i/6*Math.PI*2+.3;c.beginPath();c.arc(x+Math.cos(a)*r*.45,y+Math.sin(a)*r*.45,r*.22,0,Math.PI*2);c.fill();}c.fillStyle='#111';const ch=[[.3,.1],[-.3,.3],[.1,-.4],[-.4,-.1],[.35,-.35],[-.1,.45]];for(const[cx2,cy2]of ch){c.beginPath();c.ellipse(x+cx2*r,y+cy2*r,r*.1,r*.08,Math.random(),0,Math.PI*2);c.fill();}}},
  {n:'Mochi',d(c,x,y,r){const g=c.createRadialGradient(x-r*.2,y-r*.2,r*.1,x,y,r);g.addColorStop(0,'#fff5f8');g.addColorStop(1,'#ffcce0');c.fillStyle=g;c.beginPath();c.ellipse(x,y,r,r*.85,0,0,Math.PI*2);c.fill();c.strokeStyle='#ffaac0';c.lineWidth=1.5;c.stroke();c.strokeStyle='rgba(255,170,200,0.5)';c.lineWidth=1;c.beginPath();c.moveTo(x-r*.3,y+r*.4);c.quadraticCurveTo(x,y+r*.55,x+r*.3,y+r*.4);c.stroke();c.fillStyle='rgba(255,255,255,0.5)';c.beginPath();c.ellipse(x-r*.15,y-r*.2,r*.3,r*.18,-.3,0,Math.PI*2);c.fill();}},
  {n:'Sushi 🍣',d(c,x,y,r){c.fillStyle='#1a2a1a';c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill();c.fillStyle='#f5f0e8';c.beginPath();c.arc(x,y,r*.8,0,Math.PI*2);c.fill();c.fillStyle='#ff8060';c.beginPath();c.arc(x,y,r*.55,0,Math.PI*2);c.fill();c.fillStyle='#ff9878';c.beginPath();c.arc(x-r*.1,y-r*.15,r*.3,0,Math.PI*2);c.fill();}},
  {n:'Takoyaki',d(c,x,y,r){c.fillStyle='#b07030';c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill();c.fillStyle='#c8882a';c.beginPath();c.arc(x-r*.1,y-r*.1,r*.7,0,Math.PI*2);c.fill();c.strokeStyle='#3a1a00';c.lineWidth=2.5;c.beginPath();c.moveTo(x-r*.5,y-r*.3);c.quadraticCurveTo(x,y+r*.1,x+r*.5,y-r*.2);c.stroke();c.strokeStyle='#fff8e0';c.lineWidth=1.5;c.beginPath();c.moveTo(x-r*.3,y+r*.2);c.quadraticCurveTo(x+r*.1,y+r*.5,x+r*.4,y+r*.1);c.stroke();c.fillStyle='#ffaabb';c.beginPath();c.arc(x+r*.15,y+r*.05,r*.12,0,Math.PI*2);c.fill();}},
  {n:'Macaron',d(c,x,y,r){c.fillStyle='#ffa0c8';c.beginPath();c.ellipse(x,y+r*.25,r,r*.55,0,0,Math.PI*2);c.fill();c.fillStyle='#ff88bb';c.beginPath();c.ellipse(x,y-r*.25,r,r*.55,0,0,Math.PI*2);c.fill();c.fillStyle='#ffe0f0';c.beginPath();c.rect(x-r*.9,y-r*.08,r*1.8,r*.16);c.fill();c.fillStyle='rgba(255,255,255,0.3)';c.beginPath();c.ellipse(x-r*.2,y-r*.55,r*.35,r*.15,-.2,0,Math.PI*2);c.fill();}},
  {n:'Boba',d(c,x,y,r){c.fillStyle='#e8d090';c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill();c.fillStyle='#2a1a10';const pos=[[0,.3],[.3,0],[-.3,.1],[.15,-.3],[-.2,-.25],[.35,.35],[-.35,-.1]];for(const[px,py]of pos){c.beginPath();c.arc(x+px*r,y+py*r,r*.18,0,Math.PI*2);c.fill();}c.fillStyle='#ff88aa';c.fillRect(x+r*.2,y-r*.9,r*.2,r*.7);c.fillStyle='rgba(255,255,255,0.2)';c.fillRect(x+r*.27,y-r*.9,r*.05,r*.7);}},
  {n:'Fried Egg',d(c,x,y,r){c.fillStyle='#fffde8';c.beginPath();c.ellipse(x,y,r*.9,r,0,0,Math.PI*2);c.fill();const yg=c.createRadialGradient(x-r*.1,y-r*.1,r*.05,x,y,r*.42);yg.addColorStop(0,'#ffd040');yg.addColorStop(1,'#ff8800');c.fillStyle=yg;c.beginPath();c.arc(x,y,r*.42,0,Math.PI*2);c.fill();c.fillStyle='rgba(255,255,200,0.4)';c.beginPath();c.arc(x-r*.12,y-r*.12,r*.15,0,Math.PI*2);c.fill();}},
  {n:'Ice Cream 🍦',d(c,x,y,r){c.fillStyle='#ffccaa';c.beginPath();c.arc(x,y-r*.15,r*.85,0,Math.PI*2);c.fill();c.fillStyle='#ffaa88';c.beginPath();c.arc(x+r*.2,y-r*.1,r*.55,0,Math.PI*2);c.fill();c.fillStyle='#ffccaa';c.beginPath();c.ellipse(x-r*.2,y+r*.5,r*.18,r*.3,-.2,0,Math.PI*2);c.fill();c.beginPath();c.ellipse(x+r*.3,y+r*.45,r*.15,r*.28,.3,0,Math.PI*2);c.fill();c.fillStyle='rgba(255,255,255,0.45)';c.beginPath();c.arc(x-r*.3,y-r*.4,r*.2,0,Math.PI*2);c.fill();}},
  {n:'Yarn Ball',d(c,x,y,r){c.fillStyle='#ff4488';c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill();c.strokeStyle='#dd2266';c.lineWidth=2;for(let i=0;i<6;i++){const a=i/6*Math.PI*2;c.beginPath();c.arc(x+Math.cos(a)*r*.2,y+Math.sin(a)*r*.2,r*.7,a,a+Math.PI*1.2);c.stroke();}c.strokeStyle='#ff88bb';c.lineWidth=1.5;for(let i=0;i<4;i++){const a=i/4*Math.PI*2+.5;c.beginPath();c.arc(x+Math.cos(a)*r*.15,y+Math.sin(a)*r*.15,r*.5,a-.5,a+Math.PI);c.stroke();}}},
  {n:'Fish Toy',d(c,x,y,r){c.fillStyle='#ff8844';c.beginPath();c.ellipse(x-r*.1,y,r*.85,r*.6,0,0,Math.PI*2);c.fill();c.beginPath();c.moveTo(x+r*.7,y);c.lineTo(x+r,y-r*.5);c.lineTo(x+r,y+r*.5);c.closePath();c.fill();c.strokeStyle='#cc5522';c.lineWidth=1;for(let i=0;i<4;i++){const ax=x-r*.5+i*r*.28;c.beginPath();c.arc(ax,y+r*.1,r*.2,Math.PI,0);c.stroke();}c.fillStyle='#111';c.beginPath();c.arc(x-r*.6,y-r*.1,r*.12,0,Math.PI*2);c.fill();c.fillStyle='#fff';c.beginPath();c.arc(x-r*.64,y-r*.14,r*.05,0,Math.PI*2);c.fill();}},
  {n:'Cat Face',d(c,x,y,r){c.fillStyle='#ff8c3a';c.beginPath();c.moveTo(x-r*.45,y-r*.72);c.lineTo(x-r*.12,y-r*1.2);c.lineTo(x+r*.1,y-r*.72);c.closePath();c.fill();c.beginPath();c.moveTo(x+r*.45,y-r*.72);c.lineTo(x+r*.12,y-r*1.2);c.lineTo(x-r*.1,y-r*.72);c.closePath();c.fill();c.fillStyle='#ffb3a0';c.beginPath();c.moveTo(x-r*.38,y-r*.76);c.lineTo(x-r*.13,y-r*1.08);c.lineTo(x+r*.03,y-r*.76);c.closePath();c.fill();c.beginPath();c.moveTo(x+r*.38,y-r*.76);c.lineTo(x+r*.13,y-r*1.08);c.lineTo(x-r*.03,y-r*.76);c.closePath();c.fill();c.fillStyle='#ff8c3a';c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill();c.fillStyle='#1a0a2e';c.beginPath();c.arc(x-r*.35,y-r*.1,r*.14,0,Math.PI*2);c.fill();c.beginPath();c.arc(x+r*.35,y-r*.1,r*.14,0,Math.PI*2);c.fill();c.fillStyle='#fff';c.beginPath();c.arc(x-r*.3,y-r*.15,r*.05,0,Math.PI*2);c.fill();c.beginPath();c.arc(x+r*.4,y-r*.15,r*.05,0,Math.PI*2);c.fill();c.fillStyle='#ffb3a0';c.beginPath();c.moveTo(x,y+r*.15);c.lineTo(x-r*.1,y+r*.05);c.lineTo(x+r*.1,y+r*.05);c.closePath();c.fill();c.strokeStyle='rgba(26,10,46,0.6)';c.lineWidth=1;c.beginPath();c.moveTo(x-r*.05,y+r*.1);c.lineTo(x-r*.8,y+r*.05);c.stroke();c.beginPath();c.moveTo(x+r*.05,y+r*.1);c.lineTo(x+r*.8,y+r*.05);c.stroke();}},
  {n:'Capybara Face',d(c,x,y,r){c.fillStyle='#b07030';c.beginPath();c.arc(x-r*.6,y-r*.7,r*.28,0,Math.PI*2);c.fill();c.beginPath();c.arc(x+r*.6,y-r*.7,r*.28,0,Math.PI*2);c.fill();c.beginPath();c.ellipse(x,y,r*1.05,r*.95,0,0,Math.PI*2);c.fill();c.fillStyle='#c4906a';c.beginPath();c.ellipse(x,y+r*.22,r*.55,r*.38,0,0,Math.PI*2);c.fill();c.fillStyle='#1a0a2e';c.beginPath();c.arc(x-r*.27,y-r*.18,r*.12,0,Math.PI*2);c.fill();c.beginPath();c.arc(x+r*.27,y-r*.18,r*.12,0,Math.PI*2);c.fill();c.fillStyle='#fff';c.beginPath();c.arc(x-r*.22,y-r*.22,r*.05,0,Math.PI*2);c.fill();c.beginPath();c.arc(x+r*.32,y-r*.22,r*.05,0,Math.PI*2);c.fill();c.fillStyle='#7a4a10';c.beginPath();c.arc(x-r*.17,y+r*.2,r*.08,0,Math.PI*2);c.fill();c.beginPath();c.arc(x+r*.17,y+r*.2,r*.08,0,Math.PI*2);c.fill();}},
  {n:'Capy + Orange',d(c,x,y,r){c.fillStyle='#b07030';c.beginPath();c.arc(x-r*.6,y-r*.55,r*.25,0,Math.PI*2);c.fill();c.beginPath();c.arc(x+r*.6,y-r*.55,r*.25,0,Math.PI*2);c.fill();c.beginPath();c.ellipse(x,y+r*.1,r*1.0,r*.88,0,0,Math.PI*2);c.fill();c.fillStyle='#c4906a';c.beginPath();c.ellipse(x,y+r*.32,r*.52,r*.35,0,0,Math.PI*2);c.fill();c.fillStyle='#1a0a2e';c.beginPath();c.arc(x-r*.26,y+r*.0,r*.11,0,Math.PI*2);c.fill();c.beginPath();c.arc(x+r*.26,y+r*.0,r*.11,0,Math.PI*2);c.fill();c.fillStyle='#ff8800';c.beginPath();c.arc(x,y-r*.7,r*.35,0,Math.PI*2);c.fill();c.strokeStyle='#cc5500';c.lineWidth=1;for(let i=0;i<6;i++){const a=i/6*Math.PI*2;c.beginPath();c.moveTo(x,y-r*.7);c.lineTo(x+Math.cos(a)*r*.35,y-r*.7+Math.sin(a)*r*.35);c.stroke();}c.fillStyle='#3a7000';c.beginPath();c.ellipse(x+r*.08,y-r*1.05,r*.14,r*.08,-.4,0,Math.PI*2);c.fill();}},
  {n:'Paw Print',d(c,x,y,r){c.fillStyle='#f0c080';c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill();c.fillStyle='#e08040';c.beginPath();c.ellipse(x,y+r*.15,r*.35,r*.3,0,0,Math.PI*2);c.fill();c.beginPath();c.ellipse(x-r*.38,y-r*.22,r*.2,r*.18,-.3,0,Math.PI*2);c.fill();c.beginPath();c.ellipse(x+r*.38,y-r*.22,r*.2,r*.18,.3,0,Math.PI*2);c.fill();c.beginPath();c.ellipse(x-r*.1,y-r*.45,r*.18,r*.16,0,0,Math.PI*2);c.fill();c.beginPath();c.ellipse(x+r*.25,y-r*.38,r*.18,r*.16,.2,0,Math.PI*2);c.fill();}},
  {n:'Hamster',d(c,x,y,r){c.fillStyle='#e8c090';c.beginPath();c.arc(x-r*.55,y-r*.2,r*.55,0,Math.PI*2);c.fill();c.beginPath();c.arc(x+r*.55,y-r*.2,r*.55,0,Math.PI*2);c.fill();c.fillStyle='#d8a870';c.beginPath();c.arc(x,y,r*.75,0,Math.PI*2);c.fill();c.fillStyle='#e8c090';c.beginPath();c.arc(x-r*.45,y-r*.72,r*.3,0,Math.PI*2);c.fill();c.beginPath();c.arc(x+r*.45,y-r*.72,r*.3,0,Math.PI*2);c.fill();c.fillStyle='#ffb3a0';c.beginPath();c.arc(x-r*.45,y-r*.72,r*.16,0,Math.PI*2);c.fill();c.beginPath();c.arc(x+r*.45,y-r*.72,r*.16,0,Math.PI*2);c.fill();c.fillStyle='#1a0a2e';c.beginPath();c.arc(x-r*.25,y-r*.2,r*.13,0,Math.PI*2);c.fill();c.beginPath();c.arc(x+r*.25,y-r*.2,r*.13,0,Math.PI*2);c.fill();c.fillStyle='#fff';c.beginPath();c.arc(x-r*.19,y-r*.25,r*.05,0,Math.PI*2);c.fill();c.beginPath();c.arc(x+r*.31,y-r*.25,r*.05,0,Math.PI*2);c.fill();c.fillStyle='#ffaaaa';c.beginPath();c.ellipse(x,y+r*.05,r*.15,r*.1,0,0,Math.PI*2);c.fill();}},
  {n:'Frog 🐸',d(c,x,y,r){c.fillStyle='#40bb40';c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill();c.fillStyle='#50dd50';c.beginPath();c.arc(x-r*.35,y-r*.65,r*.35,0,Math.PI*2);c.fill();c.beginPath();c.arc(x+r*.35,y-r*.65,r*.35,0,Math.PI*2);c.fill();c.fillStyle='#1a0a2e';c.beginPath();c.arc(x-r*.35,y-r*.65,r*.2,0,Math.PI*2);c.fill();c.beginPath();c.arc(x+r*.35,y-r*.65,r*.2,0,Math.PI*2);c.fill();c.fillStyle='#fff';c.beginPath();c.arc(x-r*.28,y-r*.72,r*.08,0,Math.PI*2);c.fill();c.beginPath();c.arc(x+r*.42,y-r*.72,r*.08,0,Math.PI*2);c.fill();c.strokeStyle='#30a030';c.lineWidth=2;c.beginPath();c.moveTo(x-r*.45,y+r*.1);c.quadraticCurveTo(x,y+r*.5,x+r*.45,y+r*.1);c.stroke();}},
  {n:'Baby Chick',d(c,x,y,r){c.fillStyle='#ffdd00';c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill();c.fillStyle='#ffcc00';c.beginPath();c.arc(x+r*.2,y+r*.1,r*.65,0,Math.PI*2);c.fill();c.fillStyle='#1a0a2e';c.beginPath();c.arc(x-r*.28,y-r*.18,r*.14,0,Math.PI*2);c.fill();c.beginPath();c.arc(x+r*.28,y-r*.18,r*.14,0,Math.PI*2);c.fill();c.fillStyle='#fff';c.beginPath();c.arc(x-r*.22,y-r*.23,r*.06,0,Math.PI*2);c.fill();c.beginPath();c.arc(x+r*.34,y-r*.23,r*.06,0,Math.PI*2);c.fill();c.fillStyle='#ff8800';c.beginPath();c.moveTo(x,y+r*.1);c.lineTo(x-r*.15,y+r*.22);c.lineTo(x+r*.15,y+r*.22);c.closePath();c.fill();c.fillStyle='#ffee44';c.beginPath();c.ellipse(x-r*.55,y+r*.2,r*.3,r*.2,-.5,0,Math.PI*2);c.fill();}},
  {n:'Panda',d(c,x,y,r){c.fillStyle='#f5f5f5';c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill();c.fillStyle='#222';c.beginPath();c.arc(x-r*.55,y-r*.68,r*.3,0,Math.PI*2);c.fill();c.beginPath();c.arc(x+r*.55,y-r*.68,r*.3,0,Math.PI*2);c.fill();c.beginPath();c.ellipse(x-r*.32,y-r*.12,r*.28,r*.22,-.4,0,Math.PI*2);c.fill();c.beginPath();c.ellipse(x+r*.32,y-r*.12,r*.28,r*.22,.4,0,Math.PI*2);c.fill();c.fillStyle='#fff';c.beginPath();c.arc(x-r*.32,y-r*.12,r*.14,0,Math.PI*2);c.fill();c.beginPath();c.arc(x+r*.32,y-r*.12,r*.14,0,Math.PI*2);c.fill();c.fillStyle='#222';c.beginPath();c.arc(x-r*.32,y-r*.1,r*.1,0,Math.PI*2);c.fill();c.beginPath();c.arc(x+r*.32,y-r*.1,r*.1,0,Math.PI*2);c.fill();c.fillStyle='#ddd';c.beginPath();c.ellipse(x,y+r*.22,r*.32,r*.22,0,0,Math.PI*2);c.fill();c.fillStyle='#222';c.beginPath();c.ellipse(x,y+r*.18,r*.1,r*.07,0,0,Math.PI*2);c.fill();}},
  {n:'Bunny 🐰',d(c,x,y,r){c.fillStyle='#f0eae8';c.beginPath();c.ellipse(x-r*.3,y-r*1.1,r*.22,r*.55,-.15,0,Math.PI*2);c.fill();c.beginPath();c.ellipse(x+r*.3,y-r*1.1,r*.22,r*.55,.15,0,Math.PI*2);c.fill();c.fillStyle='#ffaabb';c.beginPath();c.ellipse(x-r*.3,y-r*1.1,r*.12,r*.42,-.15,0,Math.PI*2);c.fill();c.beginPath();c.ellipse(x+r*.3,y-r*1.1,r*.12,r*.42,.15,0,Math.PI*2);c.fill();c.fillStyle='#f0eae8';c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill();c.fillStyle='#1a0a2e';c.beginPath();c.arc(x-r*.3,y-r*.1,r*.14,0,Math.PI*2);c.fill();c.beginPath();c.arc(x+r*.3,y-r*.1,r*.14,0,Math.PI*2);c.fill();c.fillStyle='#fff';c.beginPath();c.arc(x-r*.24,y-r*.15,r*.06,0,Math.PI*2);c.fill();c.beginPath();c.arc(x+r*.36,y-r*.15,r*.06,0,Math.PI*2);c.fill();c.fillStyle='#ffaabb';c.beginPath();c.arc(x,y+r*.15,r*.1,0,Math.PI*2);c.fill();}},
  {n:'Shiba Inu',d(c,x,y,r){c.fillStyle='#e07830';c.beginPath();c.moveTo(x-r*.2,y-r*.7);c.lineTo(x-r*.6,y-r*1.15);c.lineTo(x-r*.05,y-r*.6);c.closePath();c.fill();c.beginPath();c.moveTo(x+r*.2,y-r*.7);c.lineTo(x+r*.6,y-r*1.15);c.lineTo(x+r*.05,y-r*.6);c.closePath();c.fill();c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill();c.fillStyle='#f8e0c0';c.beginPath();c.ellipse(x,y+r*.1,r*.55,r*.42,0,0,Math.PI*2);c.fill();c.fillStyle='#1a0a2e';c.beginPath();c.arc(x-r*.3,y-r*.22,r*.13,0,Math.PI*2);c.fill();c.beginPath();c.arc(x+r*.3,y-r*.22,r*.13,0,Math.PI*2);c.fill();c.fillStyle='#fff';c.beginPath();c.arc(x-r*.24,y-r*.27,r*.05,0,Math.PI*2);c.fill();c.beginPath();c.arc(x+r*.36,y-r*.27,r*.05,0,Math.PI*2);c.fill();c.fillStyle='#111';c.beginPath();c.ellipse(x,y+r*.15,r*.14,r*.1,0,0,Math.PI*2);c.fill();}},
  {n:'Red Panda',d(c,x,y,r){c.fillStyle='#cc4420';c.beginPath();c.moveTo(x-r*.3,y-r*.7);c.lineTo(x-r*.6,y-r*1.1);c.lineTo(x-r*.05,y-r*.55);c.closePath();c.fill();c.beginPath();c.moveTo(x+r*.3,y-r*.7);c.lineTo(x+r*.6,y-r*1.1);c.lineTo(x+r*.05,y-r*.55);c.closePath();c.fill();c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill();c.fillStyle='#f8d890';c.beginPath();c.arc(x,y,r*.7,0,Math.PI*2);c.fill();c.fillStyle='#cc4420';c.beginPath();c.ellipse(x,y+r*.2,r*.35,r*.28,0,0,Math.PI*2);c.fill();c.fillStyle='#1a0a2e';c.beginPath();c.arc(x-r*.3,y-r*.12,r*.14,0,Math.PI*2);c.fill();c.beginPath();c.arc(x+r*.3,y-r*.12,r*.14,0,Math.PI*2);c.fill();c.fillStyle='#fff';c.beginPath();c.arc(x-r*.24,y-r*.17,r*.06,0,Math.PI*2);c.fill();c.beginPath();c.arc(x+r*.36,y-r*.17,r*.06,0,Math.PI*2);c.fill();c.fillStyle='#fff5e8';c.beginPath();c.arc(x-r*.5,y+r*.05,r*.16,0,Math.PI*2);c.fill();c.beginPath();c.arc(x+r*.5,y+r*.05,r*.16,0,Math.PI*2);c.fill();}},
  {n:'Koala',d(c,x,y,r){c.fillStyle='#888';c.beginPath();c.arc(x-r*.52,y-r*.55,r*.38,0,Math.PI*2);c.fill();c.beginPath();c.arc(x+r*.52,y-r*.55,r*.38,0,Math.PI*2);c.fill();c.fillStyle='#aaa';c.beginPath();c.arc(x-r*.52,y-r*.55,r*.22,0,Math.PI*2);c.fill();c.beginPath();c.arc(x+r*.52,y-r*.55,r*.22,0,Math.PI*2);c.fill();c.fillStyle='#888';c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill();c.fillStyle='#ccc';c.beginPath();c.ellipse(x,y+r*.1,r*.48,r*.38,0,0,Math.PI*2);c.fill();c.fillStyle='#555';c.beginPath();c.ellipse(x,y-r*.05,r*.22,r*.16,0,0,Math.PI*2);c.fill();c.fillStyle='#1a0a2e';c.beginPath();c.arc(x-r*.3,y-r*.2,r*.12,0,Math.PI*2);c.fill();c.beginPath();c.arc(x+r*.3,y-r*.2,r*.12,0,Math.PI*2);c.fill();c.fillStyle='rgba(255,255,255,0.4)';c.beginPath();c.arc(x-r*.25,y-r*.25,r*.05,0,Math.PI*2);c.fill();c.beginPath();c.arc(x+r*.35,y-r*.25,r*.05,0,Math.PI*2);c.fill();}},
  {n:'Axolotl',d(c,x,y,r){c.strokeStyle='#ff44aa';c.lineWidth=3;for(let i=-1;i<=1;i++){const gx=x+i*r*.4,gy=y-r*.55;for(let j=0;j<4;j++){const a=-Math.PI/2+j*.35-.5,len=r*.38;c.beginPath();c.moveTo(gx,gy);c.lineTo(gx+Math.cos(a)*len,gy+Math.sin(a)*len);c.stroke();}}c.fillStyle='#ff88cc';c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill();c.fillStyle='#1a0a2e';c.beginPath();c.arc(x-r*.3,y-r*.15,r*.16,0,Math.PI*2);c.fill();c.beginPath();c.arc(x+r*.3,y-r*.15,r*.16,0,Math.PI*2);c.fill();c.fillStyle='#fff';c.beginPath();c.arc(x-r*.23,y-r*.2,r*.07,0,Math.PI*2);c.fill();c.beginPath();c.arc(x+r*.37,y-r*.2,r*.07,0,Math.PI*2);c.fill();c.strokeStyle='#ff44aa';c.lineWidth=2;c.beginPath();c.moveTo(x-r*.3,y+r*.25);c.quadraticCurveTo(x,y+r*.45,x+r*.3,y+r*.25);c.stroke();}},
  {n:'Owl 🦉',d(c,x,y,r){c.fillStyle='#8b6040';c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill();c.beginPath();c.moveTo(x-r*.2,y-r*.75);c.lineTo(x-r*.38,y-r*1.1);c.lineTo(x-r*.02,y-r*.75);c.closePath();c.fill();c.beginPath();c.moveTo(x+r*.2,y-r*.75);c.lineTo(x+r*.38,y-r*1.1);c.lineTo(x+r*.02,y-r*.75);c.closePath();c.fill();c.fillStyle='#d4a870';c.beginPath();c.ellipse(x,y,r*.75,r*.82,0,0,Math.PI*2);c.fill();c.fillStyle='#fff';c.beginPath();c.arc(x-r*.28,y-r*.1,r*.28,0,Math.PI*2);c.fill();c.beginPath();c.arc(x+r*.28,y-r*.1,r*.28,0,Math.PI*2);c.fill();c.fillStyle='#ff8800';c.beginPath();c.arc(x-r*.28,y-r*.1,r*.2,0,Math.PI*2);c.fill();c.beginPath();c.arc(x+r*.28,y-r*.1,r*.2,0,Math.PI*2);c.fill();c.fillStyle='#1a0a2e';c.beginPath();c.arc(x-r*.28,y-r*.08,r*.13,0,Math.PI*2);c.fill();c.beginPath();c.arc(x+r*.28,y-r*.08,r*.13,0,Math.PI*2);c.fill();c.fillStyle='#fff';c.beginPath();c.arc(x-r*.22,y-r*.14,r*.06,0,Math.PI*2);c.fill();c.beginPath();c.arc(x+r*.34,y-r*.14,r*.06,0,Math.PI*2);c.fill();c.fillStyle='#ff8800';c.beginPath();c.moveTo(x,y+r*.15);c.lineTo(x-r*.1,y+r*.28);c.lineTo(x+r*.1,y+r*.28);c.closePath();c.fill();}},
  {n:'Hedgehog',d(c,x,y,r){c.strokeStyle='#3a2010';c.lineWidth=3;for(let i=0;i<16;i++){const a=i/16*Math.PI*2;if(a>Math.PI*.75&&a<Math.PI*1.25)continue;c.beginPath();c.moveTo(x+Math.cos(a)*r*.7,y+Math.sin(a)*r*.7);c.lineTo(x+Math.cos(a)*r*1.05,y+Math.sin(a)*r*1.05);c.stroke();}c.fillStyle='#b07040';c.beginPath();c.arc(x,y,r*.72,0,Math.PI*2);c.fill();c.fillStyle='#d09060';c.beginPath();c.ellipse(x+r*.15,y+r*.1,r*.55,r*.45,.3,0,Math.PI*2);c.fill();c.fillStyle='#1a0a2e';c.beginPath();c.arc(x+r*.05,y-r*.15,r*.13,0,Math.PI*2);c.fill();c.fillStyle='#111';c.beginPath();c.arc(x+r*.4,y+r*.18,r*.14,0,Math.PI*2);c.fill();c.fillStyle='rgba(255,255,255,0.3)';c.beginPath();c.arc(x+r*.35,y+r*.12,r*.06,0,Math.PI*2);c.fill();}},
  {n:'Flower',d(c,x,y,r){const fc=['#ff6699','#ff44aa','#ff88bb','#ee5599','#ff77cc','#ff55aa'];for(let i=0;i<6;i++){const a=i/6*Math.PI*2;c.fillStyle=fc[i%fc.length];c.beginPath();c.ellipse(x+Math.cos(a)*r*.55,y+Math.sin(a)*r*.55,r*.38,r*.28,a,0,Math.PI*2);c.fill();}c.fillStyle='#ffee44';c.beginPath();c.arc(x,y,r*.38,0,Math.PI*2);c.fill();c.fillStyle='#ffcc00';c.beginPath();c.arc(x,y,r*.22,0,Math.PI*2);c.fill();}},
  {n:'Sunflower',d(c,x,y,r){for(let i=0;i<14;i++){const a=i/14*Math.PI*2;c.fillStyle='#ffcc00';c.beginPath();c.ellipse(x+Math.cos(a)*r*.65,y+Math.sin(a)*r*.65,r*.25,r*.4,a,0,Math.PI*2);c.fill();}c.fillStyle='#5a3010';c.beginPath();c.arc(x,y,r*.48,0,Math.PI*2);c.fill();c.fillStyle='#3a2000';for(let i=-1;i<=1;i++)for(let j=-1;j<=1;j++){c.beginPath();c.arc(x+i*r*.22,y+j*r*.22,r*.07,0,Math.PI*2);c.fill();}}},
  {n:'Cherry Blossom',d(c,x,y,r){for(let i=0;i<5;i++){const a=i/5*Math.PI*2-Math.PI/2;c.fillStyle=i%2===0?'#ffb8cc':'#ffcce0';c.beginPath();c.ellipse(x+Math.cos(a)*r*.48,y+Math.sin(a)*r*.48,r*.35,r*.25,a,0,Math.PI*2);c.fill();}c.fillStyle='#fff0f5';c.beginPath();c.arc(x,y,r*.28,0,Math.PI*2);c.fill();c.strokeStyle='#ff6688';c.lineWidth=1.5;for(let i=0;i<8;i++){const a=i/8*Math.PI*2;c.beginPath();c.moveTo(x,y);c.lineTo(x+Math.cos(a)*r*.25,y+Math.sin(a)*r*.25);c.stroke();}}},
  {n:'Mushroom 🍄',d(c,x,y,r){c.fillStyle='#f0e8d8';c.beginPath();c.rect(x-r*.32,y,r*.64,r*.55);c.fill();c.fillStyle='#dd2020';c.beginPath();c.arc(x,y-r*.1,r*.88,Math.PI,0);c.fill();c.beginPath();c.ellipse(x,y-r*.1,r*.88,r*.4,0,0,Math.PI*2);c.fill();c.fillStyle='#fff';c.beginPath();c.arc(x,y-r*.45,r*.22,0,Math.PI*2);c.fill();c.beginPath();c.arc(x-r*.42,y-r*.25,r*.14,0,Math.PI*2);c.fill();c.beginPath();c.arc(x+r*.45,y-r*.28,r*.14,0,Math.PI*2);c.fill();c.beginPath();c.arc(x-r*.18,y-r*.7,r*.1,0,Math.PI*2);c.fill();c.beginPath();c.arc(x+r*.2,y-r*.72,r*.1,0,Math.PI*2);c.fill();}},
  {n:'Snowball',d(c,x,y,r){const g=c.createRadialGradient(x-r*.3,y-r*.3,r*.05,x,y,r);g.addColorStop(0,'#ffffff');g.addColorStop(.6,'#e8f0ff');g.addColorStop(1,'#c8d8f0');c.fillStyle=g;c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill();c.fillStyle='rgba(255,255,255,0.7)';for(let i=0;i<5;i++){const a=Math.PI/6+i*1.1,d=r*(.2+i*.1);c.beginPath();c.arc(x+Math.cos(a)*d,y+Math.sin(a)*d,r*(.08+i*.02),0,Math.PI*2);c.fill();}}},
  {n:'Earth 🌍',d(c,x,y,r){c.fillStyle='#2255cc';c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill();c.fillStyle='#44aa44';c.beginPath();c.ellipse(x-r*.2,y-r*.1,r*.38,r*.48,.3,0,Math.PI*2);c.fill();c.beginPath();c.ellipse(x+r*.25,y-r*.05,r*.32,r*.42,-.2,0,Math.PI*2);c.fill();c.beginPath();c.ellipse(x,y+r*.45,r*.35,r*.22,.1,0,Math.PI*2);c.fill();c.fillStyle='rgba(255,255,255,0.35)';c.beginPath();c.arc(x-r*.2,y-r*.3,r*.32,0,Math.PI*2);c.fill();}},
  {n:'Moon 🌙',d(c,x,y,r){c.fillStyle='#d8d0b0';c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill();c.fillStyle='#b8b098';c.beginPath();c.arc(x-r*.3,y-r*.2,r*.25,0,Math.PI*2);c.fill();c.beginPath();c.arc(x+r*.35,y+r*.3,r*.18,0,Math.PI*2);c.fill();c.beginPath();c.arc(x+r*.1,y-r*.45,r*.15,0,Math.PI*2);c.fill();c.beginPath();c.arc(x-r*.5,y+r*.25,r*.12,0,Math.PI*2);c.fill();c.fillStyle='rgba(255,255,230,0.15)';c.beginPath();c.arc(x-r*.25,y-r*.3,r*.45,0,Math.PI*2);c.fill();}},
  {n:'Sun ☀️',d(c,x,y,r){c.strokeStyle='#ffcc00';c.lineWidth=3;for(let i=0;i<12;i++){const a=i/12*Math.PI*2;c.beginPath();c.moveTo(x+Math.cos(a)*r*.72,y+Math.sin(a)*r*.72);c.lineTo(x+Math.cos(a)*r*1.05,y+Math.sin(a)*r*1.05);c.stroke();}const g=c.createRadialGradient(x-r*.2,y-r*.2,r*.05,x,y,r*.68);g.addColorStop(0,'#fff080');g.addColorStop(1,'#ffaa00');c.fillStyle=g;c.beginPath();c.arc(x,y,r*.68,0,Math.PI*2);c.fill();c.fillStyle='#1a0a2e';c.beginPath();c.arc(x-r*.22,y-r*.1,r*.1,0,Math.PI*2);c.fill();c.beginPath();c.arc(x+r*.22,y-r*.1,r*.1,0,Math.PI*2);c.fill();c.strokeStyle='#ff8800';c.lineWidth=2;c.beginPath();c.moveTo(x-r*.2,y+r*.18);c.quadraticCurveTo(x,y+r*.32,x+r*.2,y+r*.18);c.stroke();}},
  {n:'Eyeball 👁',d(c,x,y,r){c.fillStyle='#f8f8ee';c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill();c.fillStyle='#44aaff';c.beginPath();c.arc(x,y,r*.62,0,Math.PI*2);c.fill();c.fillStyle='#1a0a2e';c.beginPath();c.arc(x,y,r*.38,0,Math.PI*2);c.fill();c.fillStyle='#fff';c.beginPath();c.arc(x+r*.12,y-r*.12,r*.14,0,Math.PI*2);c.fill();c.beginPath();c.arc(x-r*.12,y+r*.12,r*.06,0,Math.PI*2);c.fill();c.strokeStyle='rgba(255,80,80,0.35)';c.lineWidth=1;c.beginPath();c.moveTo(x-r,y+r*.2);c.quadraticCurveTo(x-r*.5,y+r*.4,x-r*.7,y+r*.5);c.stroke();c.beginPath();c.moveTo(x+r*.6,y-r*.5);c.quadraticCurveTo(x+r*.8,y-r*.2,x+r,y+r*.1);c.stroke();}},
  {n:'Crystal Ball',d(c,x,y,r){const g=c.createRadialGradient(x-r*.3,y-r*.3,r*.05,x,y,r);g.addColorStop(0,'#e0d8ff');g.addColorStop(.5,'#8860ff');g.addColorStop(1,'#2a0860');c.fillStyle=g;c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill();c.strokeStyle='rgba(180,140,255,0.4)';c.lineWidth=2;c.beginPath();c.arc(x+r*.1,y+r*.1,r*.45,0,Math.PI*1.5);c.stroke();c.beginPath();c.arc(x-r*.1,y-r*.1,r*.3,Math.PI,Math.PI*2.5);c.stroke();c.fillStyle='rgba(255,255,255,0.6)';c.beginPath();c.arc(x-r*.3,y-r*.35,r*.2,0,Math.PI*2);c.fill();c.fillStyle='rgba(255,255,200,0.7)';for(let i=0;i<5;i++){c.beginPath();c.arc(x+(Math.random()-.5)*r*.8,y+(Math.random()-.5)*r*.8,r*.04,0,Math.PI*2);c.fill();}}},
  {n:'Saturn 🪐',d(c,x,y,r){c.strokeStyle='#c8a870';c.lineWidth=r*.3;c.globalAlpha=.5;c.beginPath();c.ellipse(x,y,r*1.45,r*.35,0,0,Math.PI);c.stroke();c.globalAlpha=1;c.fillStyle='#e8c880';c.beginPath();c.arc(x,y,r*.82,0,Math.PI*2);c.fill();c.strokeStyle='#c8a840';c.lineWidth=r*.1;for(let i=-2;i<=2;i++){c.beginPath();c.moveTo(x-r*.82,y+i*r*.18);c.bezierCurveTo(x-r*.4,y+i*r*.2+r*.04,x+r*.4,y+i*r*.2+r*.04,x+r*.82,y+i*r*.18);c.stroke();}c.strokeStyle='#c8a870';c.lineWidth=r*.3;c.globalAlpha=.5;c.beginPath();c.ellipse(x,y,r*1.45,r*.35,0,Math.PI,Math.PI*2);c.stroke();c.globalAlpha=1;}},
  {n:'Disco Ball',d(c,x,y,r){c.fillStyle='#888';c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill();const cl=['#ff4444','#ffaa00','#44ff44','#44aaff','#aa44ff','#ff44aa','#fff'];let t=0;for(let lat=-4;lat<=4;lat++){const yr2=lat/4*r*.85,rr=Math.sqrt(Math.max(0,r*r*(1-.85*.85*lat*lat/16)));const n=Math.max(3,Math.round(rr/r*12));for(let lon=0;lon<n;lon++){const a=lon/n*Math.PI*2;c.fillStyle=cl[t%cl.length];t++;c.fillRect(x+Math.cos(a)*rr-r*.07,y+yr2-r*.07,r*.14,r*.14);}}c.fillStyle='rgba(255,255,255,0.2)';c.beginPath();c.arc(x-r*.3,y-r*.3,r*.3,0,Math.PI*2);c.fill();}},
  {n:'Bomb 💣',d(c,x,y,r){c.fillStyle='#1a1a1a';c.beginPath();c.arc(x,y+r*.05,r*.92,0,Math.PI*2);c.fill();c.fillStyle='rgba(255,255,255,0.15)';c.beginPath();c.arc(x-r*.28,y-r*.25,r*.32,0,Math.PI*2);c.fill();c.strokeStyle='#aa8840';c.lineWidth=2.5;c.beginPath();c.moveTo(x+r*.4,y-r*.5);c.quadraticCurveTo(x+r*.7,y-r*.9,x+r*.55,y-r*1.1);c.stroke();c.fillStyle='#ffcc00';c.beginPath();c.arc(x+r*.54,y-r*1.12,r*.1,0,Math.PI*2);c.fill();}},
  {n:'Gem 💎',d(c,x,y,r){c.fillStyle='#44aaff';c.beginPath();c.moveTo(x,y-r);c.lineTo(x+r*.7,y-r*.2);c.lineTo(x+r*.5,y+r*.8);c.lineTo(x-r*.5,y+r*.8);c.lineTo(x-r*.7,y-r*.2);c.closePath();c.fill();c.fillStyle='#88ccff';c.beginPath();c.moveTo(x,y-r);c.lineTo(x+r*.7,y-r*.2);c.lineTo(x,y+r*.1);c.closePath();c.fill();c.fillStyle='rgba(255,255,255,0.55)';c.beginPath();c.moveTo(x-r*.15,y-r*.85);c.lineTo(x+r*.25,y-r*.55);c.lineTo(x-r*.05,y-r*.4);c.closePath();c.fill();}},
  {n:'Ghost 👻',d(c,x,y,r){c.fillStyle='#e8e8ff';c.beginPath();c.arc(x,y-r*.1,r*.85,Math.PI,0);c.lineTo(x+r*.85,y+r*.65);for(let i=3;i>=0;i--){const bx=x+r*.85-i*r*.42;c.quadraticCurveTo(bx-r*.21,y+r*(i%2===0?1.0:.8),bx-r*.42,y+r*.65);}c.closePath();c.fill();c.fillStyle='#1a0a2e';c.beginPath();c.arc(x-r*.28,y-r*.2,r*.14,0,Math.PI*2);c.fill();c.beginPath();c.arc(x+r*.28,y-r*.2,r*.14,0,Math.PI*2);c.fill();c.fillStyle='#fff';c.beginPath();c.arc(x-r*.22,y-r*.25,r*.06,0,Math.PI*2);c.fill();c.beginPath();c.arc(x+r*.34,y-r*.25,r*.06,0,Math.PI*2);c.fill();}},
  {n:'Alien 👽',d(c,x,y,r){c.fillStyle='#44dd44';c.beginPath();c.ellipse(x,y,r*.85,r,0,0,Math.PI*2);c.fill();c.fillStyle='#1a1a1a';c.beginPath();c.ellipse(x-r*.3,y-r*.15,r*.3,r*.22,-.3,0,Math.PI*2);c.fill();c.beginPath();c.ellipse(x+r*.3,y-r*.15,r*.3,r*.22,.3,0,Math.PI*2);c.fill();c.fillStyle='#6666ff';c.beginPath();c.ellipse(x-r*.3,y-r*.15,r*.18,r*.14,-.3,0,Math.PI*2);c.fill();c.beginPath();c.ellipse(x+r*.3,y-r*.15,r*.18,r*.14,.3,0,Math.PI*2);c.fill();c.fillStyle='#fff';c.beginPath();c.arc(x-r*.24,y-r*.22,r*.07,0,Math.PI*2);c.fill();c.beginPath();c.arc(x+r*.36,y-r*.22,r*.07,0,Math.PI*2);c.fill();c.strokeStyle='#33bb33';c.lineWidth=2;c.beginPath();c.moveTo(x-r*.3,y+r*.3);c.quadraticCurveTo(x,y+r*.5,x+r*.3,y+r*.3);c.stroke();c.lineWidth=2;c.beginPath();c.moveTo(x-r*.25,y-r*.85);c.lineTo(x-r*.5,y-r*1.2);c.stroke();c.beginPath();c.moveTo(x+r*.25,y-r*.85);c.lineTo(x+r*.5,y-r*1.2);c.stroke();c.fillStyle='#aaffaa';c.beginPath();c.arc(x-r*.5,y-r*1.2,r*.1,0,Math.PI*2);c.fill();c.beginPath();c.arc(x+r*.5,y-r*1.2,r*.1,0,Math.PI*2);c.fill();}},
  {n:'Bubble',d(c,x,y,r){c.strokeStyle='rgba(150,220,255,0.7)';c.lineWidth=2.5;c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.stroke();const bg=c.createRadialGradient(x,y,r*.1,x,y,r);bg.addColorStop(0,'rgba(200,240,255,0.05)');bg.addColorStop(1,'rgba(150,220,255,0.15)');c.fillStyle=bg;c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill();c.fillStyle='rgba(255,255,255,0.6)';c.beginPath();c.arc(x-r*.3,y-r*.32,r*.2,0,Math.PI*2);c.fill();c.beginPath();c.arc(x-r*.18,y-r*.48,r*.1,0,Math.PI*2);c.fill();}},
  {n:'Rainbow Ball',d(c,x,y,r){const h=[0,40,80,150,210,270,320];for(let i=0;i<h.length;i++){c.fillStyle=`hsl(${h[i]},100%,60%)`;c.beginPath();c.moveTo(x,y);c.arc(x,y,r,i/h.length*Math.PI*2,(i+1)/h.length*Math.PI*2);c.closePath();c.fill();}c.fillStyle='rgba(255,255,255,0.45)';c.beginPath();c.arc(x-r*.25,y-r*.3,r*.22,0,Math.PI*2);c.fill();}},
  {n:'Bath Bomb',d(c,x,y,r){const g=c.createRadialGradient(x-r*.3,y-r*.3,r*.05,x,y,r);g.addColorStop(0,'#ffccff');g.addColorStop(.5,'#dd88ff');g.addColorStop(1,'#8844cc');c.fillStyle=g;c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill();c.strokeStyle='rgba(255,200,255,0.5)';c.lineWidth=2.5;c.beginPath();c.arc(x+r*.1,y+r*.1,r*.5,0,Math.PI*1.5);c.stroke();c.beginPath();c.arc(x-r*.1,y-r*.1,r*.35,Math.PI,Math.PI*2.3);c.stroke();c.fillStyle='rgba(255,255,255,0.4)';c.beginPath();c.arc(x-r*.3,y-r*.32,r*.22,0,Math.PI*2);c.fill();c.fillStyle='rgba(255,255,200,0.8)';for(let i=0;i<6;i++){const a=i/6*Math.PI*2;c.beginPath();c.arc(x+Math.cos(a)*r*.55,y+Math.sin(a)*r*.55,r*.05,0,Math.PI*2);c.fill();}}},
  {n:'Clown Nose',d(c,x,y,r){const g=c.createRadialGradient(x-r*.3,y-r*.3,r*.05,x,y,r);g.addColorStop(0,'#ff6666');g.addColorStop(.6,'#ff0000');g.addColorStop(1,'#cc0000');c.fillStyle=g;c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill();c.fillStyle='rgba(255,255,255,0.45)';c.beginPath();c.arc(x-r*.28,y-r*.3,r*.25,0,Math.PI*2);c.fill();}},
  {n:'Gold Coin',d(c,x,y,r){c.fillStyle='#ffa800';c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill();c.fillStyle='#cc8800';c.beginPath();c.arc(x,y,r*.85,0,Math.PI*2);c.fill();c.fillStyle='#ffcc00';c.beginPath();c.arc(x,y,r*.75,0,Math.PI*2);c.fill();c.fillStyle='#cc8800';c.font=`bold ${r*.7}px serif`;c.textAlign='center';c.textBaseline='middle';c.fillText('$',x,y+r*.05);c.textBaseline='alphabetic';}},
  {n:'Star',d(c,x,y,r){c.fillStyle='#ffdd00';const pts=10,ir=r*.45;c.beginPath();for(let i=0;i<pts*2;i++){const a=i/pts*Math.PI-Math.PI/2,rad=i%2===0?r:ir;i===0?c.moveTo(x+Math.cos(a)*rad,y+Math.sin(a)*rad):c.lineTo(x+Math.cos(a)*rad,y+Math.sin(a)*rad);}c.closePath();c.fill();c.fillStyle='#ff8800';c.beginPath();for(let i=0;i<pts*2;i++){const a=i/pts*Math.PI-Math.PI/2,rad=i%2===0?r*.7:ir*.7;i===0?c.moveTo(x+Math.cos(a)*rad,y+Math.sin(a)*rad):c.lineTo(x+Math.cos(a)*rad,y+Math.sin(a)*rad);}c.closePath();c.fill();c.fillStyle='#fff';c.beginPath();c.arc(x,y,r*.18,0,Math.PI*2);c.fill();}},
  {n:'Planet',d(c,x,y,r){c.fillStyle='#4488ff';c.beginPath();c.arc(x,y,r*.85,0,Math.PI*2);c.fill();c.fillStyle='#66aaff';c.beginPath();c.ellipse(x,y+r*.15,r*.85,r*.3,0,0,Math.PI*2);c.fill();c.fillStyle='#2255cc';c.beginPath();c.ellipse(x,y-r*.22,r*.7,r*.2,0,0,Math.PI*2);c.fill();c.strokeStyle='rgba(180,220,255,0.6)';c.lineWidth=r*.12;c.beginPath();c.ellipse(x,y,r*1.35,r*.28,0,0,Math.PI*2);c.stroke();c.fillStyle='rgba(255,255,255,0.35)';c.beginPath();c.arc(x-r*.3,y-r*.3,r*.28,0,Math.PI*2);c.fill();}},
  {n:'Avocado',d(c,x,y,r){c.fillStyle='#2d5a1b';c.beginPath();c.ellipse(x,y,r*.85,r,0,0,Math.PI*2);c.fill();c.fillStyle='#7dc950';c.beginPath();c.ellipse(x,y+r*.05,r*.7,r*.82,0,0,Math.PI*2);c.fill();c.fillStyle='#f5e6a3';c.beginPath();c.ellipse(x,y+r*.12,r*.5,r*.62,0,0,Math.PI*2);c.fill();c.fillStyle='#7a4a20';c.beginPath();c.arc(x,y+r*.1,r*.28,0,Math.PI*2);c.fill();c.fillStyle='#9a6a40';c.beginPath();c.arc(x-r*.06,y+r*.04,r*.16,0,Math.PI*2);c.fill();}},
  {n:'Tangerine',d(c,x,y,r){c.fillStyle='#ff6a00';c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill();c.strokeStyle='#cc4400';c.lineWidth=1;for(let i=0;i<10;i++){const a=i/10*Math.PI*2;c.beginPath();c.moveTo(x,y);c.lineTo(x+Math.cos(a)*r,y+Math.sin(a)*r);c.stroke();}c.fillStyle='#3a8000';c.beginPath();c.ellipse(x,y-r*.8,r*.2,r*.3,0,0,Math.PI*2);c.fill();c.beginPath();c.ellipse(x+r*.2,y-r*.85,r*.22,r*.12,.7,0,Math.PI*2);c.fill();}},
  {n:'Egg',d(c,x,y,r){const g=c.createRadialGradient(x-r*.28,y-r*.34,r*.05,x+r*.08,y+r*.08,r);g.addColorStop(0,'#fffdf4');g.addColorStop(0.5,'#f2e6c8');g.addColorStop(1,'#d8c4a0');c.fillStyle=g;c.beginPath();c.ellipse(x,y+r*.06,r*.72,r,0,0,Math.PI*2);c.fill();c.strokeStyle='rgba(190,155,90,0.30)';c.lineWidth=1.5;c.beginPath();c.ellipse(x,y+r*.06,r*.72,r,0,0,Math.PI*2);c.stroke();c.fillStyle='rgba(255,255,255,0.65)';c.beginPath();c.arc(x-r*.22,y-r*.32,r*.16,0,Math.PI*2);c.fill();c.beginPath();c.arc(x-r*.1,y-r*.48,r*.08,0,Math.PI*2);c.fill();}},
];

const EGG_TYPE_IDX=PT.length-1;

// ── Stages ───────────────────────────────────────────────────────────
function octPath(x,y,w,h,C){
  ctx.beginPath();
  ctx.moveTo(x+C,y);ctx.lineTo(x+w-C,y);ctx.lineTo(x+w,y+C);ctx.lineTo(x+w,y+h-C);
  ctx.lineTo(x+w-C,y+h);ctx.lineTo(x+C,y+h);ctx.lineTo(x,y+h-C);ctx.lineTo(x,y+C);
  ctx.closePath();
}
const STAGES=[
  {name:'Classic',
   borderCol:'#0d3320',borderGlow:'rgba(0,200,140,0.35)',borderLtCol:'rgba(80,255,180,0.25)',
   felt0:'#0f5a48',felt1:'#073430',texture:'dots',
   lineCol:'rgba(255,255,255,0.10)',goalCol:'#051810',gpostCol:'#b0b0c8',gpostLt:'#ff9090',
   obstacles:[]},
  {name:'Space Station',
   borderCol:'#050515',borderGlow:'rgba(80,80,255,0.45)',borderLtCol:'rgba(120,140,255,0.30)',
   felt0:'#0e0e3a',felt1:'#05050f',texture:'stars',
   lineCol:'rgba(150,180,255,0.14)',goalCol:'#0c0c30',gpostCol:'#5566cc',gpostLt:'#aabbff',
   obstacles:[]},
  {name:'Volcano',
   borderCol:'#3a0800',borderGlow:'rgba(255,80,0,0.5)',borderLtCol:'rgba(255,130,30,0.38)',
   felt0:'#5a1500',felt1:'#1a0400',texture:'lava',
   lineCol:'rgba(255,120,0,0.18)',goalCol:'#3a0600',gpostCol:'#cc4400',gpostLt:'#ff8855',
   obstacles:[{type:'pinball',rx:0.5,ry:0.5,r:26,col:'#cc3300',ltCol:'#ff7744',glowCol:'rgba(255,80,0,0.8)',hitTimer:0}]},
  {name:'Arctic',
   borderCol:'#0a1a30',borderGlow:'rgba(100,200,255,0.40)',borderLtCol:'rgba(180,230,255,0.28)',
   felt0:'#1a3560',felt1:'#080f20',texture:'ice',
   lineCol:'rgba(180,220,255,0.14)',goalCol:'#0d2040',gpostCol:'#60aacc',gpostLt:'#aadcff',
   obstacles:[
     {motion:'orbit',cx:0.5,cy:0.5,orbitR:98,speed:1,phase:0,       r:18,col:'#2870a8',ltCol:'#80ccff',glowCol:'rgba(80,190,255,0.7)'},
     {motion:'orbit',cx:0.5,cy:0.5,orbitR:98,speed:1,phase:Math.PI, r:18,col:'#2870a8',ltCol:'#80ccff',glowCol:'rgba(80,190,255,0.7)'}]},
  {name:'Neon Arcade',
   borderCol:'#0a0020',borderGlow:'rgba(200,0,255,0.50)',borderLtCol:'rgba(255,80,255,0.30)',
   felt0:'#160030',felt1:'#050010',texture:'grid',
   lineCol:'rgba(180,0,255,0.22)',goalCol:'#0e0025',gpostCol:'#aa00cc',gpostLt:'#ff44ff',
   obstacles:[
     {rx:0.40,ry:0.5,r:20,col:'#880099',ltCol:'#ee44ff',glowCol:'rgba(220,0,255,0.8)'},
     {rx:0.60,ry:0.5,r:20,col:'#880099',ltCol:'#ee44ff',glowCol:'rgba(220,0,255,0.8)'}]},
  {name:'Retro Diner',shape:'oval',
   borderCol:'#1a0c00',borderGlow:'rgba(200,130,40,0.50)',borderLtCol:'rgba(220,170,70,0.32)',
   felt0:'#2e6a14',felt1:'#163a08',texture:'wood',
   lineCol:'rgba(240,200,80,0.14)',goalCol:'#0c1e08',gpostCol:'#c8a040',gpostLt:'#ffe090',
   obstacles:[]},
  {name:'Crystal Cavern',shape:'oct',octCut:85,
   borderCol:'#050d18',borderGlow:'rgba(0,200,235,0.46)',borderLtCol:'rgba(80,225,245,0.28)',
   felt0:'#081c2e',felt1:'#030a12',texture:'crystal',
   lineCol:'rgba(0,190,220,0.14)',goalCol:'#040c18',gpostCol:'#30a8c8',gpostLt:'#70e0ff',
   obstacles:[]},
  {name:'Deep Sea',
   borderCol:'#020c1a',borderGlow:'rgba(0,80,200,0.46)',borderLtCol:'rgba(40,120,220,0.28)',
   felt0:'#041830',felt1:'#010810',texture:'bubbles',
   lineCol:'rgba(40,120,255,0.12)',goalCol:'#020810',gpostCol:'#2060aa',gpostLt:'#60a0ff',
   obstacles:[
     {rx:0.5, ry:0.26,r:17,col:'#1a4870',ltCol:'#60b0ee',glowCol:'rgba(40,130,255,0.65)'},
     {rx:0.41,ry:0.67,r:17,col:'#1a4870',ltCol:'#60b0ee',glowCol:'rgba(40,130,255,0.65)'},
     {rx:0.59,ry:0.67,r:17,col:'#1a4870',ltCol:'#60b0ee',glowCol:'rgba(40,130,255,0.65)'}]},
  {name:'Clockwork',
   borderCol:'#1a0c00',borderGlow:'rgba(180,100,20,0.55)',borderLtCol:'rgba(220,160,60,0.30)',
   felt0:'#2a1200',felt1:'#0e0500',texture:'hex',
   lineCol:'rgba(200,130,30,0.14)',goalCol:'#180800',gpostCol:'#a07020',gpostLt:'#ffd060',
   obstacles:[
     {motion:'swing_v',cx:0.30,cy:0.5,amp:118,speed:1.7,phase:0,       r:20,col:'#8b4a00',ltCol:'#ffcc44',glowCol:'rgba(220,150,0,0.80)'},
     {motion:'swing_v',cx:0.70,cy:0.5,amp:118,speed:1.7,phase:Math.PI, r:20,col:'#8b4a00',ltCol:'#ffcc44',glowCol:'rgba(220,150,0,0.80)'}]},
  {name:'Bermuda',
   borderCol:'#001020',borderGlow:'rgba(0,180,120,0.50)',borderLtCol:'rgba(40,220,150,0.28)',
   felt0:'#001828',felt1:'#000810',texture:'waves',
   lineCol:'rgba(0,200,140,0.12)',goalCol:'#000c18',gpostCol:'#006644',gpostLt:'#00ffaa',
   obstacles:[
     {motion:'orbit',cx:0.5,cy:0.5,orbitR:106,speed:0.65,phase:0,                   r:21,col:'#003a2a',ltCol:'#00ffaa',glowCol:'rgba(0,220,140,0.78)'},
     {motion:'orbit',cx:0.5,cy:0.5,orbitR:106,speed:0.65,phase:Math.PI*2/3,         r:21,col:'#003a2a',ltCol:'#00ffaa',glowCol:'rgba(0,220,140,0.78)'},
     {motion:'orbit',cx:0.5,cy:0.5,orbitR:106,speed:0.65,phase:Math.PI*4/3,         r:21,col:'#003a2a',ltCol:'#00ffaa',glowCol:'rgba(0,220,140,0.78)'}]},
  {name:'Pyramid',
   borderCol:'#3a1e00',borderGlow:'rgba(210,148,38,0.56)',borderLtCol:'rgba(235,185,80,0.34)',
   felt0:'#b87820',felt1:'#6a3e06',texture:'sand',
   lineCol:'rgba(255,200,80,0.15)',goalCol:'#281200',gpostCol:'#c89428',gpostLt:'#ffe870',
   obstacles:[{type:'pyramid',rx:0.5,ry:0.5,size:72,rotSpeed:0.65}]},
  {name:'Warp Zone',
   borderCol:'#000018',borderGlow:'rgba(0,200,255,0.50)',borderLtCol:'rgba(80,220,255,0.28)',
   felt0:'#000825',felt1:'#000010',texture:'scanlines',
   lineCol:'rgba(0,180,255,0.16)',goalCol:'#000015',gpostCol:'#006688',gpostLt:'#00ccff',
   obstacles:[
     {motion:'figure8',speed:0.9, phase:0,       scaleX:155,scaleY:68,r:18,col:'#004466',ltCol:'#00eeff',glowCol:'rgba(0,220,255,0.82)'},
     {motion:'figure8',speed:1.35,phase:Math.PI, scaleX:118,scaleY:54,r:18,col:'#440044',ltCol:'#ff00ee',glowCol:'rgba(255,0,220,0.82)'}]},
  {name:'Prism',
   borderCol:'#1a0030',borderGlow:'rgba(180,80,255,0.55)',borderLtCol:'rgba(220,140,255,0.32)',
   felt0:'#0d0020',felt1:'#050010',texture:'prism',
   lineCol:'rgba(180,80,255,0.18)',goalCol:'#0a0018',gpostCol:'#8822bb',gpostLt:'#dd88ff',
   obstacles:[{type:'triangle',rx:0.5,ry:0.5,size:62,rotSpeed:0.3,pulseAmp:0.22,pulseSpeed:0.8}]},
  {name:'Flux',
   shape:'morph',maxOctCut:88,octCut:0,morphSpeed:0.72,
   borderCol:'#04060f',borderGlow:'rgba(50,80,220,0.58)',borderLtCol:'rgba(80,120,255,0.30)',
   felt0:'#05081a',felt1:'#020308',texture:'flux',
   lineCol:'rgba(60,80,200,0.15)',goalCol:'#030510',gpostCol:'#223088',gpostLt:'#6688ff',
   obstacles:[{type:'turntable',rx:0.5,ry:0.5,r:54,omega:0.038,spinDir:1,
     col:'#0a0c24',ltCol:'#8899ff',glowCol:'rgba(60,80,200,0.72)'}]},
  {name:'Garden',
   borderCol:'#0a1f06',borderGlow:'rgba(55,160,30,0.50)',borderLtCol:'rgba(100,200,55,0.28)',
   felt0:'#0c2808',felt1:'#060f04',texture:'leaf',
   lineCol:'rgba(90,170,45,0.13)',goalCol:'#071505',gpostCol:'#2a600e',gpostLt:'#88e038',
   obstacles:[
     {type:'ladybug',motion:'wander',initRx:0.33,initRy:0.36,initAngle:1.0,r:22,
      col:'#aa1100',ltCol:'#ff5533',glowCol:'rgba(220,50,10,0.65)'},
     {type:'ladybug',motion:'wander',initRx:0.67,initRy:0.64,initAngle:3.8,r:22,
      col:'#aa1100',ltCol:'#ff5533',glowCol:'rgba(220,50,10,0.65)'}]},
  {name:'Nexus',
   borderCol:'#000c14',borderGlow:'rgba(0,220,180,0.52)',borderLtCol:'rgba(60,255,210,0.30)',
   felt0:'#010f12',felt1:'#000508',texture:'void',
   lineCol:'rgba(0,200,160,0.14)',goalCol:'#000a0c',gpostCol:'#006655',gpostLt:'#00ffcc',
   obstacles:[{type:'portal_tri',rx:0.5,ry:0.5,size:68,rotSpeed:0.22,portalFlash:[0,0,0]}]},
  {name:'Sway',
   goalShift:78, goalShiftSpeed:1.8,
   borderCol:'#020e08',borderGlow:'rgba(20,190,100,0.48)',borderLtCol:'rgba(60,220,140,0.28)',
   felt0:'#041a12',felt1:'#010a07',texture:'crystal',
   lineCol:'rgba(20,190,100,0.11)',goalCol:'#010c06',gpostCol:'#0a5a2e',gpostLt:'#44dd88',
   obstacles:[{type:'hex',cx:0.5,cy:0.5,r:52,rotSpeed:0.2,motion:'swing_v',amp:85,speed:0.6,
     hue:38,col:'#120a02',ltCol:'rgba(255,210,80,0.92)',glowCol:'rgba(255,175,35,0.78)'}]},
  {name:'Drift',
   goalShift:82, goalShiftSpeed:1.0,
   borderCol:'#0c0616',borderGlow:'rgba(150,55,255,0.54)',borderLtCol:'rgba(195,100,255,0.30)',
   felt0:'#090418',felt1:'#040110',texture:'void',
   lineCol:'rgba(150,55,255,0.13)',goalCol:'#070012',gpostCol:'#5e18a0',gpostLt:'#cc66ff',
   obstacles:[
     {type:'turntable',rx:0.5,ry:0.5,r:175,omega:0.022,spinDir:1,
      col:'#12062a',ltCol:'#aa66ff',glowCol:'rgba(140,50,240,0.68)'},
     {type:'turntable',rx:0.5,ry:0.5,r:70,omega:0.058,spinDir:-1,
      col:'#1e083c',ltCol:'#e0aaff',glowCol:'rgba(200,100,255,0.85)'}
   ]},
  {name:'Chicken Coop',
   borderCol:'#3a2200',borderGlow:'rgba(220,175,40,0.55)',borderLtCol:'rgba(255,215,80,0.32)',
   felt0:'#2a5a10',felt1:'#183808',texture:'leaf',
   lineCol:'rgba(200,175,50,0.16)',goalCol:'#1a1000',gpostCol:'#aa7020',gpostLt:'#ffe070',
   obstacles:[
     {type:'chicken',motion:'wander',initRx:0.5,initRy:0.5,initAngle:0.5,r:40,
      col:'#ffffff',ltCol:'#fffde0',glowCol:'rgba(255,240,120,0.6)'}
   ]},
  {name:'Grand Prix',
   borderCol:'#1a1a1a',borderGlow:'rgba(255,40,40,0.50)',borderLtCol:'rgba(255,100,100,0.28)',
   felt0:'#2a2a2a',felt1:'#141414',texture:'racetrack',
   lineCol:'rgba(255,255,255,0.08)',goalCol:'#111111',gpostCol:'#cc2222',gpostLt:'#ff6644',
   obstacles:[]},
  {name:'Lava Lamp',
   goalScale:0.30, goalScaleSpeed:1.4,
   borderCol:'#1a0a04',borderGlow:'rgba(255,100,20,0.45)',borderLtCol:'rgba(255,160,60,0.28)',
   felt0:'#1a0828',felt1:'#08020e',texture:'lavaglob',
   lineCol:'rgba(255,120,60,0.08)',goalCol:'#120410',gpostCol:'#cc5522',gpostLt:'#ff9944',
   obstacles:[]},
  {name:'Deep Blue',
   borderCol:'#031a2e',borderGlow:'rgba(20,80,160,0.55)',borderLtCol:'rgba(60,140,220,0.28)',
   felt0:'#0a2a4a',felt1:'#020e1a',texture:'ocean',
   lineCol:'rgba(100,180,255,0.10)',goalCol:'#041222',gpostCol:'#2266aa',gpostLt:'#66bbff',
   obstacles:[
     {type:'shark',motion:'wander',initRx:0.35,initRy:0.4,initAngle:0.5,r:32,initSpeed:1.8,col:'#556677',ltCol:'#8899aa',glowCol:'rgba(60,80,120,0.6)'},
     {type:'octopus',motion:'wander',initRx:0.65,initRy:0.6,initAngle:3.0,r:28,initSpeed:0.55,col:'#8833aa',ltCol:'#cc66ff',glowCol:'rgba(140,50,200,0.6)'},
     {type:'fish',motion:'wander',initRx:0.25,initRy:0.25,initAngle:1.0,r:12,initSpeed:1.2,col:'#ff8833',ltCol:'#ffbb66',glowCol:'rgba(255,150,50,0.5)'},
     {type:'fish',motion:'wander',initRx:0.75,initRy:0.3,initAngle:2.5,r:12,initSpeed:1.3,col:'#33ccff',ltCol:'#88eeff',glowCol:'rgba(50,200,255,0.5)'},
     {type:'fish',motion:'wander',initRx:0.5,initRy:0.75,initAngle:4.0,r:12,initSpeed:1.1,col:'#ffcc33',ltCol:'#ffee66',glowCol:'rgba(255,220,50,0.5)'}
   ]}
];
const STAGE_DESC=[
  'The original arena. Clean felt, open field — pure hockey.',
  'Zero-gravity vibes. Stars overhead, nowhere to hide.',
  'A pinball bumper erupts from center. Chaos incoming.',
  'Two orbiting ice pucks patrol the field. Stay frosty.',
  'Neon bumpers split the lane. High-voltage hockey.',
  'Oval-shaped arena for curved, unpredictable bounces.',
  'Octagon walls with tight corners. Precision matters here.',
  'Three deep-sea bumpers guard the middle. Navigate carefully.',
  'Pendulum arms swing across the field in perfect rhythm.',
  'Three orbiting obstacles form a deadly triangle.',
  'A spinning pyramid guards center. Deflections are wild.',
  'Two figure-8 obstacles chase the puck across the arena.',
  'A pulsing triangle refracts every shot. Angles are everything.',
  'Morphing walls and a central turntable. Constantly shifting.',
  'Two wandering ladybugs roam freely. Herd them or avoid them.',
  'A portal triangle teleports the puck across the arena.',
  'The goals shift up and down. Timing is everything.',
  'Nested spinning rings and drifting goals. Total mayhem.',
  'A giant chicken crash-lands and lays eggs on the field. Total barnyard chaos.',
  'Rainbow boosters, goal shields, and a hungry wall. Buckle up.',
  'Goopy lava-lamp globs warp the field like a living mini-golf course. The goal breathes.',
  'A shark prowls the depths while an octopus lurks. Watch out for the fishies too.',
];

// ── Draw: table ──────────────────────────────────────────────────────
function drawTableTexture(st,pulse){
  if(st.texture==='dots'){
    ctx.fillStyle=`rgba(255,255,255,${pulse})`;
    for(let x=BW+19;x<W-BW;x+=38)for(let y=BW+19;y<H-BW;y+=38){ctx.beginPath();ctx.arc(x,y,1.8,0,Math.PI*2);ctx.fill();}
  }else if(st.texture==='stars'){
    for(let i=0;i<90;i++){const sx=BW+((i*137+7)%(W-BW*2)),sy=BW+((i*251+13)%(H-BW*2));ctx.globalAlpha=0.25+0.55*(Math.sin(frameN*.022+i*1.3)*.5+.5);ctx.fillStyle=i%5===0?'#aabbff':'#ffffff';ctx.beginPath();ctx.arc(sx,sy,0.6+(i%3)*0.5,0,Math.PI*2);ctx.fill();}
    ctx.globalAlpha=1;
  }else if(st.texture==='lava'){
    ctx.strokeStyle=`rgba(255,140,0,${0.08+pulse*1.5})`;ctx.lineWidth=1.5;
    for(let i=0;i<8;i++){const x0=BW+(i*113+20)%(W-BW*2),y0=BW+(i*79+30)%(H-BW*2);ctx.beginPath();ctx.moveTo(x0,y0);ctx.quadraticCurveTo(x0+(i%3-1)*55+Math.sin(frameN*.01)*15,y0+35,x0+(i%2)*70-20,y0+70);ctx.stroke();}
    for(let i=0;i<5;i++){const px=BW+(i*193+50)%(W-BW*2),py=BW+(i*157+40)%(H-BW*2);const pg=ctx.createRadialGradient(px,py,0,px,py,22);pg.addColorStop(0,`rgba(255,100,0,${0.14+pulse*1.5})`);pg.addColorStop(1,'rgba(255,50,0,0)');ctx.fillStyle=pg;ctx.beginPath();ctx.arc(px,py,22,0,Math.PI*2);ctx.fill();}
  }else if(st.texture==='ice'){
    ctx.strokeStyle=`rgba(180,230,255,${0.07+pulse*.6})`;ctx.lineWidth=1;
    for(let i=0;i<12;i++){const x0=BW+(i*107+10)%(W-BW*2),y0=BW+(i*83+10)%(H-BW*2);ctx.beginPath();ctx.moveTo(x0,y0);ctx.lineTo(x0+(i%5-2)*38,y0+(i%3-1)*28);ctx.stroke();}
    ctx.fillStyle=`rgba(210,240,255,${pulse*.7})`;
    for(let x=BW+28;x<W-BW;x+=52)for(let y=BW+26;y<H-BW;y+=46){ctx.beginPath();ctx.arc(x,y,1.3,0,Math.PI*2);ctx.fill();}
  }else if(st.texture==='grid'){
    ctx.strokeStyle=`rgba(180,0,255,${0.09+pulse*.5})`;ctx.lineWidth=1;
    for(let x=BW+38;x<W-BW;x+=38){ctx.beginPath();ctx.moveTo(x,BW);ctx.lineTo(x,H-BW);ctx.stroke();}
    for(let y=BW+34;y<H-BW;y+=34){ctx.beginPath();ctx.moveTo(BW,y);ctx.lineTo(W-BW,y);ctx.stroke();}
  }else if(st.texture==='wood'){
    // Horizontal wood grain with gentle wave
    for(let i=0;i<28;i++){
      const gy=BW+10+i*(H-BW*2-20)/27;
      ctx.strokeStyle=`rgba(0,0,0,${0.04+0.04*(i%3===0?1:0)})`;ctx.lineWidth=i%4===0?2:1;
      ctx.beginPath();ctx.moveTo(BW,gy);
      for(let x=BW;x<=W-BW;x+=18)ctx.lineTo(x,gy+Math.sin(x*0.04+i*0.7)*2.5);
      ctx.stroke();
    }
    // Subtle knots
    for(const[kx,ky,kr]of[[W/2-180,H/2-60,18],[W/2+140,H/2+50,14],[W/2-80,H/2+80,10]]){
      ctx.strokeStyle='rgba(0,0,0,0.07)';ctx.lineWidth=1.2;
      ctx.beginPath();ctx.ellipse(kx,ky,kr,kr*.55,0.3,0,Math.PI*2);ctx.stroke();
      ctx.beginPath();ctx.ellipse(kx,ky,kr*.55,kr*.3,0.3,0,Math.PI*2);ctx.stroke();
    }
  }else if(st.texture==='crystal'){
    // Slow-spinning crystal facets
    for(let i=0;i<24;i++){
      const sx=BW+((i*173+7)%(W-BW*2)),sy=BW+((i*251+11)%(H-BW*2));
      const sz=3+i%5,ang=frameN*.008+i*0.9;
      ctx.save();ctx.translate(sx,sy);ctx.rotate(ang);
      ctx.strokeStyle=`rgba(120,230,255,${0.15+0.25*(Math.sin(frameN*.025+i)*.5+.5)})`;ctx.lineWidth=1.2;
      ctx.beginPath();ctx.moveTo(0,-sz);ctx.lineTo(0,sz);ctx.moveTo(-sz,0);ctx.lineTo(sz,0);
      ctx.moveTo(-sz*.6,-sz*.6);ctx.lineTo(sz*.6,sz*.6);ctx.moveTo(sz*.6,-sz*.6);ctx.lineTo(-sz*.6,sz*.6);
      ctx.stroke();ctx.restore();
    }
  }else if(st.texture==='bubbles'){
    ctx.lineWidth=1;
    for(let i=0;i<22;i++){
      const bx=BW+((i*137+20)%(W-BW*2)),by=BW+((i*97+15)%(H-BW*2));
      const br=4+i%9,phase=frameN*.008+i*0.6;
      ctx.strokeStyle=`rgba(80,170,255,${0.08+0.12*(Math.sin(phase)*.5+.5)})`;
      ctx.beginPath();ctx.arc(bx,by+Math.sin(phase)*4,br,0,Math.PI*2);ctx.stroke();
    }
  }else if(st.texture==='hex'){
    // Honeycomb — bronze/copper tones
    const hr=16,hh=hr*Math.sqrt(3)/2;
    ctx.strokeStyle=`rgba(180,100,20,${0.09+pulse*.5})`;ctx.lineWidth=1;
    for(let row=-1;row<12;row++){for(let col=-1;col<26;col++){
      const ox=(row%2)*hr*1.5;
      const hx=BW+col*hr*3+ox,hy=BW+row*hh*2;
      ctx.beginPath();
      for(let i=0;i<6;i++){const a=i*Math.PI/3;i===0?ctx.moveTo(hx+Math.cos(a)*hr,hy+Math.sin(a)*hr):ctx.lineTo(hx+Math.cos(a)*hr,hy+Math.sin(a)*hr);}
      ctx.closePath();ctx.stroke();
    }}
  }else if(st.texture==='waves'){
    // Slow rolling ocean waves — eerie green
    ctx.lineWidth=1.5;
    for(let i=0;i<16;i++){
      const wy=BW+14+i*(H-BW*2-28)/15;
      ctx.strokeStyle=`rgba(0,200,130,${0.06+0.07*(i%3===0?1:0)+pulse*.4})`;
      ctx.beginPath();ctx.moveTo(BW,wy);
      for(let x=BW;x<=W-BW;x+=6)ctx.lineTo(x,wy+Math.sin(x*0.025+frameN*0.018+i*0.55)*7);
      ctx.stroke();
    }
  }else if(st.texture==='sand'){
    // Wind-rippled sand dunes
    ctx.lineWidth=1;
    for(let i=0;i<20;i++){
      const wy=BW+10+i*(H-BW*2-20)/19;
      ctx.strokeStyle=`rgba(255,190,60,${0.04+0.07*(i%4===0?1:0)+pulse*.28})`;
      ctx.beginPath();ctx.moveTo(BW,wy);
      for(let x=BW;x<=W-BW;x+=7)ctx.lineTo(x,wy+Math.sin(x*0.032+i*0.75)*3);
      ctx.stroke();
    }
    // Sand grain speckles
    ctx.fillStyle=`rgba(255,215,90,${pulse*.55})`;
    for(let i=0;i<35;i++){const sx=BW+((i*149+17)%(W-BW*2)),sy=BW+((i*97+11)%(H-BW*2));ctx.beginPath();ctx.arc(sx,sy,.8+i%3*.4,0,Math.PI*2);ctx.fill();}
  }else if(st.texture==='flux'){
    // Faint concentric morphing shapes that track the wall shape
    const C2=st.octCut||0;
    for(let i=1;i<=4;i++){
      const sc=i/4.8;
      const fw=(W-BW*2)*sc*.9, fh=(H-BW*2)*sc*.9;
      octPath(W/2-fw/2,H/2-fh/2,fw,fh,C2*sc);
      ctx.strokeStyle=`rgba(70,100,230,${0.04+0.025*(i%2)+pulse*0.025})`;ctx.lineWidth=1;
      ctx.stroke();
    }
    // Subtle star field
    for(let i=0;i<40;i++){
      const sx=BW+((i*173+11)%(W-BW*2)),sy=BW+((i*241+17)%(H-BW*2));
      ctx.globalAlpha=0.08+0.18*(Math.sin(frameN*.02+i*1.5)*.5+.5);
      ctx.fillStyle=i%6===0?'#6688ff':'#aabbff';
      ctx.beginPath();ctx.arc(sx,sy,0.7+(i%3)*.35,0,Math.PI*2);ctx.fill();
    }
    ctx.globalAlpha=1;
  }else if(st.texture==='leaf'){
    // Central vein (gently curved)
    ctx.strokeStyle=`rgba(55,110,25,${0.10+pulse*0.14})`;ctx.lineWidth=2.5;
    ctx.beginPath();ctx.moveTo(W/2,BW+8);
    for(let y=BW+8;y<=H-BW;y+=10)ctx.lineTo(W/2+Math.sin(y*0.022)*14,y);
    ctx.stroke();
    // Lateral veins branching left/right
    ctx.lineWidth=1;
    for(let i=0;i<16;i++){
      const vy=BW+28+i*(H-BW*2-40)/15;
      const vx=W/2+Math.sin(vy*0.022)*14;
      const side=i%2===0?1:-1;
      const len=55+Math.sin(i*1.4)*22;
      ctx.strokeStyle=`rgba(70,140,30,${0.05+0.05*(i%3===0?1:0)+pulse*0.07})`;
      ctx.beginPath();ctx.moveTo(vx,vy);
      ctx.quadraticCurveTo(vx+side*len*.55,vy-13,vx+side*len,vy-4);
      ctx.stroke();
    }
    // Dew-drop sparkles
    for(let i=0;i<14;i++){
      const sx=BW+38+((i*179+17)%(W-BW*2-76));
      const sy=BW+28+((i*131+11)%(H-BW*2-56));
      ctx.fillStyle=`rgba(160,240,90,${0.07+0.07*Math.sin(frameN*.05+i)})`;
      ctx.beginPath();ctx.arc(sx,sy,1.8+i%3*.6,0,Math.PI*2);ctx.fill();
    }
  }else if(st.texture==='void'){
    // Concentric void ripples emanating from center
    const cx2=W/2, cy2=H/2;
    for(let i=0;i<7;i++){
      const phase=(frameN*0.012+i*0.22)%1;
      const rr=40+phase*260;
      ctx.strokeStyle=`rgba(0,200,160,${(1-phase)*0.09+pulse*0.04})`;
      ctx.lineWidth=1.2+i%2;
      ctx.beginPath();ctx.arc(cx2,cy2,rr,0,Math.PI*2);ctx.stroke();
    }
    // Faint dimensional sparks
    for(let i=0;i<30;i++){
      const hue=(i*47+frameN*0.3)%360;
      const sx=BW+((i*211+41)%(W-BW*2)), sy=BW+((i*157+23)%(H-BW*2));
      ctx.fillStyle=`hsla(${hue},80%,70%,${0.06+0.08*Math.sin(frameN*.06+i)})`;
      ctx.beginPath();ctx.arc(sx,sy,1,0,Math.PI*2);ctx.fill();
    }
  }else if(st.texture==='prism'){
    // Diagonal rainbow light shafts
    for(let i=0;i<7;i++){
      const hue=(i*51+frameN*0.35)%360;
      const x0=BW+((i*137+Math.floor(frameN*0.05)*1)%(W-BW*2));
      ctx.strokeStyle=`hsla(${hue},100%,60%,${0.04+pulse*0.05})`;
      ctx.lineWidth=4+i%3;
      ctx.beginPath();ctx.moveTo(x0,BW);ctx.lineTo(x0+90,H-BW);ctx.stroke();
    }
    // Rainbow sparkle dots
    for(let i=0;i<45;i++){
      const hue2=(i*83+frameN*0.45)%360;
      const sx=BW+((i*173+29)%(W-BW*2)),sy=BW+((i*131+47)%(H-BW*2));
      ctx.fillStyle=`hsla(${hue2},100%,78%,${0.12+0.14*Math.sin(frameN*.07+i)})`;
      ctx.beginPath();ctx.arc(sx,sy,1.1+i%3*.4,0,Math.PI*2);ctx.fill();
    }
  }else if(st.texture==='scanlines'){
    // Horizontal cyan scanlines + faint magenta verticals
    ctx.lineWidth=1;
    for(let y=BW+24;y<H-BW;y+=24){
      ctx.strokeStyle=`rgba(0,180,255,${0.07+pulse*.35})`;
      ctx.beginPath();ctx.moveTo(BW,y);ctx.lineTo(W-BW,y);ctx.stroke();
    }
    for(let x=BW+72;x<W-BW;x+=72){
      ctx.strokeStyle=`rgba(255,0,220,${0.04+pulse*.2})`;
      ctx.beginPath();ctx.moveTo(x,BW);ctx.lineTo(x,H-BW);ctx.stroke();
    }
  }else if(st.texture==='racetrack'){
    // Subtle asphalt grain
    for(let i=0;i<60;i++){
      const sx=BW+((i*197+13)%(W-BW*2)),sy=BW+((i*131+7)%(H-BW*2));
      ctx.fillStyle=`rgba(255,255,255,${0.015+0.01*(i%3)})`;
      ctx.beginPath();ctx.arc(sx,sy,0.8+i%2*0.6,0,Math.PI*2);ctx.fill();
    }
    // Dashed lane lines
    ctx.setLineDash([18,14]);ctx.lineWidth=1.5;
    ctx.strokeStyle=`rgba(255,255,255,${0.06+pulse*0.3})`;
    for(const fy of[0.33,0.67]){
      ctx.beginPath();ctx.moveTo(BW,BW+(H-BW*2)*fy);ctx.lineTo(W-BW,BW+(H-BW*2)*fy);ctx.stroke();
    }
    ctx.setLineDash([]);
    // Red-white curb stripes along top and bottom
    const cs=18;
    for(let x=BW;x<W-BW;x+=cs*2){
      const ti=Math.floor(x/cs+frameN*0.02)%2;
      ctx.fillStyle=ti?`rgba(255,40,40,${0.12+pulse*0.4})`:`rgba(255,255,255,${0.08+pulse*0.3})`;
      ctx.fillRect(x,BW,cs,4);
      ctx.fillStyle=ti?`rgba(255,255,255,${0.08+pulse*0.3})`:`rgba(255,40,40,${0.12+pulse*0.4})`;
      ctx.fillRect(x,H-BW-4,cs,4);
    }
  }else if(st.texture==='lavaglob'){
    const globs=_lavaGlobs();
    const iw=W-BW*2, ih=H-BW*2;
    // Warm bottom glow — the "bulb" heating the wax
    const bulb=ctx.createRadialGradient(W/2,H-BW,0,W/2,H-BW,ih*0.75);
    bulb.addColorStop(0,'rgba(255,80,10,0.13)');
    bulb.addColorStop(0.4,'rgba(255,40,5,0.06)');
    bulb.addColorStop(1,'rgba(255,20,0,0)');
    ctx.fillStyle=bulb;ctx.fillRect(BW,BW,iw,ih);
    // Faint top cool zone
    const cool=ctx.createLinearGradient(0,BW,0,BW+ih*0.3);
    cool.addColorStop(0,'rgba(60,20,80,0.10)');
    cool.addColorStop(1,'rgba(60,20,80,0)');
    ctx.fillStyle=cool;ctx.fillRect(BW,BW,iw,ih*0.3);
    // Merge bridges — when two blobs are close, draw a waxy bridge between them
    for(let i=0;i<globs.length;i++){
      for(let j=i+1;j<globs.length;j++){
        const a=globs[i],b=globs[j];
        const dx=b.x-a.x,dy=b.y-a.y,dist=Math.hypot(dx,dy);
        const touch=a.r+b.r;
        if(dist<touch*1.5&&dist>1){
          const t=1-((dist-touch*0.5)/(touch));
          if(t>0){
            const mx=(a.x+b.x)/2,my=(a.y+b.y)/2;
            const mr=Math.min(a.r,b.r)*0.5*Math.min(t,1);
            const mg=ctx.createRadialGradient(mx,my,0,mx,my,mr*2);
            const hMix=(a.hue+b.hue)/2;
            mg.addColorStop(0,`hsla(${hMix},85%,52%,${0.5*Math.min(t,1)})`);
            mg.addColorStop(1,`hsla(${hMix},80%,40%,0)`);
            ctx.fillStyle=mg;ctx.beginPath();ctx.arc(mx,my,mr*2,0,Math.PI*2);ctx.fill();
          }
        }
      }
    }
    // Draw each wax blob
    for(let i=0;i<globs.length;i++){
      const g=globs[i];
      // Soft outer glow (warm halo in the liquid)
      const glo=ctx.createRadialGradient(g.x,g.y,g.r*0.3,g.x,g.y,g.r*1.8);
      glo.addColorStop(0,`hsla(${g.hue},80%,50%,0.14)`);
      glo.addColorStop(0.6,`hsla(${g.hue},70%,35%,0.04)`);
      glo.addColorStop(1,`hsla(${g.hue},60%,25%,0)`);
      ctx.fillStyle=glo;ctx.beginPath();ctx.arc(g.x,g.y,g.r*1.8,0,Math.PI*2);ctx.fill();
      // Main waxy body — stretched vertically for that rising/sinking goopiness
      ctx.save();ctx.translate(g.x,g.y);
      // Stretch based on vertical velocity (rising blobs elongate up)
      const sy=1+0.22*Math.sin(frameN*0.009+i*1.7);
      const sx=1/Math.sqrt(sy); // preserve area
      ctx.scale(sx,sy);
      // Waxy opaque core
      const bg=ctx.createRadialGradient(0,-g.r*0.1,0,0,0,g.r);
      bg.addColorStop(0,`hsla(${g.hue},92%,62%,0.85)`);
      bg.addColorStop(0.35,`hsla(${g.hue},88%,55%,0.75)`);
      bg.addColorStop(0.7,`hsla(${g.hue+8},80%,45%,0.45)`);
      bg.addColorStop(1,`hsla(${g.hue+15},70%,35%,0)`);
      ctx.fillStyle=bg;ctx.beginPath();ctx.arc(0,0,g.r,0,Math.PI*2);ctx.fill();
      // Inner hot core — brighter center like molten wax
      const core=ctx.createRadialGradient(0,-g.r*0.15,0,0,0,g.r*0.45);
      core.addColorStop(0,`hsla(${g.hue+10},95%,75%,0.4)`);
      core.addColorStop(1,`hsla(${g.hue},90%,60%,0)`);
      ctx.fillStyle=core;ctx.beginPath();ctx.arc(0,0,g.r*0.45,0,Math.PI*2);ctx.fill();
      // 3D specular highlight — top-left, like light through glass
      const hl=ctx.createRadialGradient(-g.r*0.25,-g.r*0.35,0,-g.r*0.1,-g.r*0.15,g.r*0.55);
      hl.addColorStop(0,'rgba(255,255,255,0.35)');
      hl.addColorStop(0.4,'rgba(255,255,255,0.10)');
      hl.addColorStop(1,'rgba(255,255,255,0)');
      ctx.fillStyle=hl;ctx.beginPath();ctx.arc(0,0,g.r,0,Math.PI*2);ctx.fill();
      // Bottom shadow — 3D underside
      const sh=ctx.createRadialGradient(g.r*0.08,g.r*0.35,0,0,g.r*0.2,g.r*0.8);
      sh.addColorStop(0,'rgba(0,0,0,0.25)');
      sh.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=sh;ctx.beginPath();ctx.arc(0,0,g.r,0,Math.PI*2);ctx.fill();
      ctx.restore();
    }
    // Small rising wax droplets — tiny blobs drifting upward
    for(let i=0;i<12;i++){
      const sx=BW+40+((i*211+37)%(iw-80));
      const cycle=(frameN*0.4+i*41)%(ih);
      const sy=H-BW-cycle;
      const dr=2.5+i%3*1.5;
      const da=0.3+0.25*Math.sin(i*2.1+frameN*0.02);
      const dHue=_lavaGlobHue(i);
      const dg=ctx.createRadialGradient(sx,sy,0,sx,sy,dr*2);
      dg.addColorStop(0,`hsla(${dHue},85%,58%,${da})`);
      dg.addColorStop(1,`hsla(${dHue},75%,40%,0)`);
      ctx.fillStyle=dg;ctx.beginPath();ctx.arc(sx,sy,dr*2,0,Math.PI*2);ctx.fill();
    }
    // Glass vessel effect — subtle vertical edge darkening
    const edgeL=ctx.createLinearGradient(BW,0,BW+60,0);
    edgeL.addColorStop(0,'rgba(0,0,0,0.12)');edgeL.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=edgeL;ctx.fillRect(BW,BW,60,ih);
    const edgeR=ctx.createLinearGradient(W-BW,0,W-BW-60,0);
    edgeR.addColorStop(0,'rgba(0,0,0,0.12)');edgeR.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=edgeR;ctx.fillRect(W-BW-60,BW,60,ih);
    // Glass reflection — faint vertical highlight stripe
    const refl=ctx.createLinearGradient(BW+iw*0.18,0,BW+iw*0.28,0);
    refl.addColorStop(0,'rgba(255,255,255,0)');
    refl.addColorStop(0.5,'rgba(255,255,255,0.04)');
    refl.addColorStop(1,'rgba(255,255,255,0)');
    ctx.fillStyle=refl;ctx.fillRect(BW+iw*0.18,BW,iw*0.1,ih);
  }else if(st.texture==='ocean'){
    const iw=W-BW*2, ih=H-BW*2;
    // Light rays from surface — diagonal shafts of light
    for(let i=0;i<6;i++){
      const rx=BW+iw*0.1+i*(iw*0.16);
      const sway=Math.sin(frameN*0.008+i*1.3)*30;
      const rw=35+15*Math.sin(frameN*0.012+i*2.1);
      const rg=ctx.createLinearGradient(rx+sway,BW,rx+sway+rw*2,H-BW);
      rg.addColorStop(0,`rgba(120,200,255,${0.06+pulse*0.3})`);
      rg.addColorStop(0.4,`rgba(80,160,220,${0.03+pulse*0.15})`);
      rg.addColorStop(1,'rgba(40,100,180,0)');
      ctx.save();ctx.beginPath();ctx.rect(BW,BW,iw,ih);ctx.clip();
      ctx.fillStyle=rg;
      ctx.beginPath();ctx.moveTo(rx+sway,BW);ctx.lineTo(rx+sway+rw,BW);
      ctx.lineTo(rx+sway+rw*2.5,H-BW);ctx.lineTo(rx+sway+rw*1.5,H-BW);ctx.fill();
      ctx.restore();
    }
    // Rising bubbles
    for(let i=0;i<18;i++){
      const bx=BW+30+((i*137+53)%(iw-60))+Math.sin(frameN*0.02+i*1.7)*12;
      const cycle=(frameN*0.5+i*73)%(ih+40);
      const by=H-BW-cycle;
      const br=2+i%4*1.2;
      const ba=0.15+0.12*Math.sin(i*2.3+frameN*0.03);
      ctx.strokeStyle=`rgba(150,220,255,${ba})`;ctx.lineWidth=1;
      ctx.beginPath();ctx.arc(bx,by,br,0,Math.PI*2);ctx.stroke();
      // Specular dot
      ctx.fillStyle=`rgba(200,240,255,${ba*0.7})`;
      ctx.beginPath();ctx.arc(bx-br*0.3,by-br*0.3,br*0.3,0,Math.PI*2);ctx.fill();
    }
    // Seaweed at bottom
    for(let i=0;i<10;i++){
      const sx=BW+50+i*(iw-100)/9;
      const sh=40+20*Math.sin(i*1.4);
      ctx.strokeStyle=`rgba(30,${120+i*8},60,${0.18+pulse*0.2})`;ctx.lineWidth=3;
      ctx.beginPath();ctx.moveTo(sx,H-BW);
      for(let j=1;j<=4;j++){
        const sy=H-BW-sh*j/4;
        const swx=sx+Math.sin(frameN*0.015+i*0.8+j*0.9)*12;
        ctx.lineTo(swx,sy);
      }
      ctx.stroke();
    }
    // Subtle sandy floor gradient
    const sand=ctx.createLinearGradient(0,H-BW-30,0,H-BW);
    sand.addColorStop(0,'rgba(60,50,30,0)');sand.addColorStop(1,'rgba(60,50,30,0.08)');
    ctx.fillStyle=sand;ctx.fillRect(BW,H-BW-30,iw,30);
  }
}

function _lavaGlobHue(i){
  // Warm lava lamp palette: reds, oranges, magentas, warm yellows
  const palette=[350,10,25,330,15,340,5,20];
  return palette[i%palette.length];
}

// Compute lava lamp glob positions — used by both rendering and physics
function _lavaGlobs(){
  const globs=[];
  // Blobs primarily drift vertically (rising/sinking) with gentle horizontal sway
  const seeds=[
    {bx:0.22,by:0.50,r:75, hIdx:0,xAmp:35,yAmp:150,xSpd:0.003, ySpd:0.0025,phase:0},
    {bx:0.62,by:0.50,r:88, hIdx:1,xAmp:40,yAmp:140,xSpd:0.0025,ySpd:0.003, phase:1.8},
    {bx:0.42,by:0.50,r:62, hIdx:2,xAmp:30,yAmp:130,xSpd:0.004, ySpd:0.0035,phase:3.2},
    {bx:0.78,by:0.50,r:55, hIdx:3,xAmp:28,yAmp:120,xSpd:0.0035,ySpd:0.004, phase:4.8},
    {bx:0.50,by:0.50,r:70, hIdx:4,xAmp:38,yAmp:145,xSpd:0.002, ySpd:0.002, phase:2.5},
    {bx:0.18,by:0.50,r:50, hIdx:5,xAmp:25,yAmp:110,xSpd:0.005, ySpd:0.0045,phase:5.5},
  ];
  for(let i=0;i<seeds.length;i++){
    const s=seeds[i];
    const cx=BW+s.bx*(W-BW*2)+Math.sin(frameN*s.xSpd+s.phase)*s.xAmp;
    const cy=BW+s.by*(H-BW*2)+Math.sin(frameN*s.ySpd+s.phase+0.5)*s.yAmp;
    const rr=s.r+8*Math.sin(frameN*0.006+i*1.4);
    const hue=_lavaGlobHue(s.hIdx)+(Math.sin(frameN*0.003+i)*8);
    globs.push({x:cx,y:cy,r:rr,hue:hue});
  }
  return globs;
}

function drawTableCommon(st){
  // Goals
  ctx.fillStyle=st.goalCol;
  ctx.fillRect(0,gLT,BW+4,gLB-gLT);ctx.fillRect(W-BW-4,gRT,BW+4,gRB-gRT);
  // Center line & circle
  ctx.strokeStyle=st.lineCol;ctx.lineWidth=3;
  ctx.setLineDash([12,10]);ctx.beginPath();ctx.moveTo(W/2,BW);ctx.lineTo(W/2,H-BW);ctx.stroke();ctx.setLineDash([]);
  ctx.beginPath();ctx.arc(W/2,H/2,75,0,Math.PI*2);ctx.stroke();
  // Specular
  const specG=ctx.createRadialGradient(W*.22,H*.18,0,W*.42,H*.38,W*.55);
  specG.addColorStop(0,'rgba(255,255,255,0.13)');specG.addColorStop(.6,'rgba(255,255,255,0.03)');specG.addColorStop(1,'rgba(255,255,255,0)');
  ctx.fillStyle=specG;ctx.fillRect(0,0,W,H);
  // Goal posts
  for(const [gx,yt,yb] of[[BW,gLT,gLB],[W-BW,gRT,gRB]])for(const gy of[yt,yb]){
    ctx.fillStyle=st.gpostCol;ctx.beginPath();ctx.arc(gx,gy,7,0,Math.PI*2);ctx.fill();
    ctx.fillStyle=st.gpostLt;ctx.beginPath();ctx.arc(gx-1.5,gy-1.5,3,0,Math.PI*2);ctx.fill();
  }
}

function drawTableOval(st,pulse){
  const iw=W/2-BW,ih=H/2-BW;
  ctx.fillStyle=st.borderCol;ctx.fillRect(0,0,W,H);
  // Border ellipse glow
  ctx.save();ctx.shadowColor=st.borderGlow;ctx.shadowBlur=32;
  ctx.strokeStyle=st.borderCol;ctx.lineWidth=BW*2.2;
  ctx.beginPath();ctx.ellipse(W/2,H/2,iw+BW*.6,ih+BW*.6,0,0,Math.PI*2);ctx.stroke();
  ctx.restore();
  // Felt clipped to inner ellipse
  ctx.save();
  ctx.beginPath();ctx.ellipse(W/2,H/2,iw,ih,0,0,Math.PI*2);ctx.clip();
  const feltG=ctx.createRadialGradient(W/2,H/2,0,W/2,H/2,W*.6);
  feltG.addColorStop(0,st.felt0);feltG.addColorStop(1,st.felt1);
  ctx.fillStyle=feltG;ctx.fillRect(0,0,W,H);
  drawTableTexture(st,pulse);
  // Specular inside clip
  const specG=ctx.createRadialGradient(W*.22,H*.18,0,W*.42,H*.38,W*.55);
  specG.addColorStop(0,'rgba(255,255,255,0.13)');specG.addColorStop(.6,'rgba(255,255,255,0.03)');specG.addColorStop(1,'rgba(255,255,255,0)');
  ctx.fillStyle=specG;ctx.fillRect(0,0,W,H);
  ctx.restore();
  // Goals, center line, posts (drawn over, partially clipped by canvas edges)
  drawTableCommon(st);
  // Border highlight ellipse
  ctx.strokeStyle=st.borderLtCol;ctx.lineWidth=2.5;
  ctx.beginPath();ctx.ellipse(W/2,H/2,iw,ih,0,0,Math.PI*2);ctx.stroke();
}

function drawTableOct(st,pulse){
  const C=st.octCut||80;
  ctx.fillStyle=st.borderCol;ctx.fillRect(0,0,W,H);
  // Border octagon glow
  ctx.save();ctx.shadowColor=st.borderGlow;ctx.shadowBlur=28;
  ctx.fillStyle=st.borderCol;octPath(0,0,W,H,C+BW);ctx.fill();
  ctx.restore();
  // Felt clipped to inner octagon
  ctx.save();
  octPath(BW,BW,W-BW*2,H-BW*2,C);ctx.clip();
  const feltG=ctx.createRadialGradient(W/2,H/2,0,W/2,H/2,W*.6);
  feltG.addColorStop(0,st.felt0);feltG.addColorStop(1,st.felt1);
  ctx.fillStyle=feltG;ctx.fillRect(0,0,W,H);
  drawTableTexture(st,pulse);
  // Specular inside clip
  const specG=ctx.createRadialGradient(W*.22,H*.18,0,W*.42,H*.38,W*.55);
  specG.addColorStop(0,'rgba(255,255,255,0.13)');specG.addColorStop(.6,'rgba(255,255,255,0.03)');specG.addColorStop(1,'rgba(255,255,255,0)');
  ctx.fillStyle=specG;ctx.fillRect(0,0,W,H);
  ctx.restore();
  // Goals, center line, posts
  drawTableCommon(st);
  // Border highlight octagon
  ctx.strokeStyle=st.borderLtCol;ctx.lineWidth=2.5;
  octPath(1.5,1.5,W-3,H-3,C+BW-1.5);ctx.stroke();
  // Corner trim lines
  ctx.strokeStyle=st.borderLtCol;ctx.lineWidth=2;
  for(const[x1,y1,x2,y2]of[[BW+C,BW,BW,BW+C],[W-BW-C,BW,W-BW,BW+C],[BW+C,H-BW,BW,H-BW-C],[W-BW-C,H-BW,W-BW,H-BW-C]]){
    ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();
  }
}

function drawTableMorph(st,pulse){
  const C=st.octCut||0;
  ctx.fillStyle=st.borderCol;ctx.fillRect(0,0,W,H);
  ctx.save();ctx.shadowColor=st.borderGlow;ctx.shadowBlur=28;
  ctx.fillStyle=st.borderCol;octPath(0,0,W,H,C+BW);ctx.fill();
  ctx.restore();
  ctx.save();
  octPath(BW,BW,W-BW*2,H-BW*2,C);ctx.clip();
  const feltG=ctx.createRadialGradient(W/2,H/2,0,W/2,H/2,W*.6);
  feltG.addColorStop(0,st.felt0);feltG.addColorStop(1,st.felt1);
  ctx.fillStyle=feltG;ctx.fillRect(0,0,W,H);
  drawTableTexture(st,pulse);
  const specG=ctx.createRadialGradient(W*.22,H*.18,0,W*.42,H*.38,W*.55);
  specG.addColorStop(0,'rgba(255,255,255,0.10)');specG.addColorStop(.6,'rgba(255,255,255,0.025)');specG.addColorStop(1,'rgba(255,255,255,0)');
  ctx.fillStyle=specG;ctx.fillRect(0,0,W,H);
  ctx.restore();
  drawTableCommon(st);
  // Morphed border highlight
  ctx.strokeStyle=st.borderLtCol;ctx.lineWidth=2.5;
  octPath(1.5,1.5,W-3,H-3,C+BW-1.5);ctx.stroke();
  // Corner trim lines (fade in with cut)
  if(C>3){
    ctx.strokeStyle=st.borderLtCol;ctx.lineWidth=2;ctx.globalAlpha=Math.min(C/20,1);
    for(const[x1,y1,x2,y2]of[[BW+C,BW,BW,BW+C],[W-BW-C,BW,W-BW,BW+C],[BW+C,H-BW,BW,H-BW-C],[W-BW-C,H-BW,W-BW,H-BW-C]]){
      ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();
    }
    ctx.globalAlpha=1;
  }
}
function drawTable(){
  const st=STAGES[currentStage];
  const pulse=0.04+0.025*Math.sin(frameN*.025);
  const shape=st.shape||'rect';
  if(shape==='oval'){drawTableOval(st,pulse);return;}
  if(shape==='oct'){drawTableOct(st,pulse);return;}
  if(shape==='morph'){drawTableMorph(st,pulse);return;}

  // Border with glow
  ctx.save();
  ctx.shadowColor=st.borderGlow;ctx.shadowBlur=28;
  ctx.fillStyle=st.borderCol;
  roundRect(ctx,0,0,W,H,14);ctx.fill();
  ctx.restore();

  // Felt with radial gradient
  const feltG=ctx.createRadialGradient(W/2,H/2,0,W/2,H/2,W*.6);
  feltG.addColorStop(0,st.felt0);feltG.addColorStop(1,st.felt1);
  ctx.fillStyle=feltG;
  roundRect(ctx,BW,BW,W-BW*2,H-BW*2,8);ctx.fill();

  drawTableTexture(st,pulse);

  drawTableCommon(st);
  // Border highlight (rect)
  ctx.strokeStyle=st.borderLtCol;ctx.lineWidth=2.5;
  roundRect(ctx,1.5,1.5,W-3,H-3,14);ctx.stroke();
}

// Returns the actual screen position of an obstacle, supporting animated motion types.
function obsPos(o,idx){
  const t=arcticAngle;
  if(o.motion==='orbit'){
    const angle=t*(o.speed||1)+(o.phase||0);
    const cx=BW+(o.cx||0.5)*(W-BW*2), cy=BW+(o.cy||0.5)*(H-BW*2);
    return{x:cx+Math.cos(angle)*o.orbitR, y:cy+Math.sin(angle)*o.orbitR};
  }
  if(o.motion==='swing_v'){
    // Vertical pendulum swing
    const cx=BW+o.cx*(W-BW*2), cy=BW+o.cy*(H-BW*2);
    return{x:cx, y:cy+Math.sin(t*(o.speed||1)+(o.phase||0))*o.amp};
  }
  if(o.motion==='figure8'){
    // Lissajous figure-8: x at freq 1, y at freq 2
    const angle=t*(o.speed||1)+(o.phase||0);
    return{x:W/2+Math.cos(angle)*(o.scaleX||100), y:H/2+Math.sin(angle*2)*(o.scaleY||60)};
  }
  if(o.motion==='wander')return{x:o.wx??BW+(o.initRx||0.5)*(W-BW*2), y:o.wy??BW+(o.initRy||0.5)*(H-BW*2)};
  return{x:BW+o.rx*(W-BW*2), y:BW+o.ry*(H-BW*2)};
}

// ── Wander AI (ladybugs meander each physics tick) ────────────────────
function tickWanderObs(){
  const obs=STAGES[currentStage].obstacles;
  for(let oi=0;oi<obs.length;oi++){
    const o=obs[oi];
    if(o.motion!=='wander')continue;
    if(o.type==='chicken')continue; // handled by tickChicken
    // Lazy init
    if(o.wx===undefined){
      o.wx=BW+(o.initRx||0.5)*(W-BW*2);
      o.wy=BW+(o.initRy||0.5)*(H-BW*2);
      o.wangle=o.initAngle!==undefined?o.initAngle:Math.random()*Math.PI*2;
      o.wspeed=o.initSpeed||(0.85+Math.random()*0.55);
    }
    // Random gentle turn
    o.wangle+=(Math.random()-.5)*0.055;
    // Occasional bigger direction change
    if(Math.random()<0.007)o.wangle+=(Math.random()-.5)*1.1;
    // Wall avoidance — steer toward center when getting close to edge
    const margin=68;
    if(o.wx<BW+margin||o.wx>W-BW-margin||o.wy<BW+margin||o.wy>H-BW-margin){
      const ta=Math.atan2(H/2-o.wy,W/2-o.wx);
      let diff=ta-o.wangle;
      while(diff>Math.PI)diff-=Math.PI*2;
      while(diff<-Math.PI)diff+=Math.PI*2;
      o.wangle+=diff*0.07;
    }
    o.wx+=Math.cos(o.wangle)*o.wspeed;
    o.wy+=Math.sin(o.wangle)*o.wspeed;
    // Hard clamp inside field
    o.wx=Math.max(BW+o.r+5,Math.min(W-BW-o.r-5,o.wx));
    o.wy=Math.max(BW+o.r+5,Math.min(H-BW-o.r-5,o.wy));
  }
}

// ── Chicken stage: tick logic ─────────────────────────────────────────
function tickChicken(){
  if(STAGES[currentStage].name!=='Chicken Coop')return;
  const o=STAGES[currentStage].obstacles[0];
  if(chickenPhase==='waiting'){
    chickenEggTimer--;
    if(chickenEggTimer<=0){
      chickenPhase='dropping';
      o.wx=W/2+(Math.random()*120-60); o.wy=-90;
      o.dropVY=0; o.flapT=0; o.wangle=Math.PI/2;
    }
    return;
  }
  if(chickenPhase==='dropping'){
    o.dropVY=(o.dropVY||0)+0.62;
    o.wy+=o.dropVY;
    o.flapT+=5; // frantic wing-flap while falling
    if(o.wy>=H*0.44){
      o.wy=H*0.44; o.dropVY=0;
      chickenPhase='running';
      chickenEggTimer=300;
      o.wangle=Math.random()*Math.PI*2;
      addShake(12);
      burst(o.wx,o.wy,'#fff8a0',28); burst(o.wx,o.wy,'#ffffff',14);
      addFloat(o.wx,o.wy-80,'BAWK!!','#ffee20');
    }
    return;
  }
  if(chickenPhase==='running'){
    o.flapT++;
    // Chaotic movement — much more erratic than ladybugs
    o.wangle+=(Math.random()-.5)*0.24;
    if(Math.random()<0.05)o.wangle+=(Math.random()-.5)*3.0;
    const margin=72;
    if(o.wx<BW+margin||o.wx>W-BW-margin||o.wy<BW+margin||o.wy>H-BW-margin){
      const ta=Math.atan2(H/2-o.wy,W/2-o.wx);
      let diff=ta-o.wangle;
      while(diff>Math.PI)diff-=Math.PI*2; while(diff<-Math.PI)diff+=Math.PI*2;
      o.wangle+=diff*0.16;
    }
    o.wx+=Math.cos(o.wangle)*2.4;
    o.wy+=Math.sin(o.wangle)*2.4;
    o.wx=Math.max(BW+o.r+5,Math.min(W-BW-o.r-5,o.wx));
    o.wy=Math.max(BW+o.r+5,Math.min(H-BW-o.r-5,o.wy));
    // Egg-laying timer
    chickenEggTimer--;
    if(chickenEggTimer<=0){
      const eAngle=o.wangle+Math.PI+(Math.random()-.5)*1.1;
      pucks.push({x:o.wx,y:o.wy,vx:Math.cos(eAngle)*SPEED_INIT,vy:Math.sin(eAngle)*SPEED_INIT,
                  trail:[],spin:0,spinV:0,typeIdx:EGG_TYPE_IDX,wallHits:0,lastHitter:null});
      lastPuckIdx=EGG_TYPE_IDX; puckNameT=90;
      chickenEggTimer=300;
      addShake(4); burst(o.wx,o.wy,'#fffde8',16);
      addFloat(o.wx,o.wy-58,'bock!','#ffe840');
    }
  }
}

// ── Grand Prix stage: boosters, wall mouth, goal shields ──────────────
function isGrandPrix(){return STAGES[currentStage].name==='Grand Prix';}

function tickGrandPrix(){
  if(!isGrandPrix())return;
  const iw=W-BW*2, ih=H-BW*2;
  // ── Boosters: spawn/despawn randomly ──
  gpBoosterTimer--;
  if(gpBoosterTimer<=0){
    // Spawn a new booster at random position/orientation
    const bx=BW+60+Math.random()*(iw-120);
    const by=BW+50+Math.random()*(ih-100);
    const angle=Math.random()*Math.PI*2;
    gpBoosters.push({x:bx,y:by,angle:angle,life:180}); // 3 seconds at 60fps
    gpBoosterTimer=120+Math.floor(Math.random()*120); // next in 2-4s
  }
  for(const b of gpBoosters)b.life--;
  gpBoosters=gpBoosters.filter(b=>b.life>0);

  // ── Goal shields: random activation ──
  for(const sh of[gpShieldL,gpShieldR]){
    if(sh.active){
      sh.timer--;
      if(sh.timer<=0)sh.active=false;
    }else{
      sh.cooldown--;
      if(sh.cooldown<=0){
        sh.active=true;
        sh.timer=120; // 2 seconds
        sh.cooldown=240+Math.floor(Math.random()*300); // 4-9s between activations
      }
    }
  }

  // ── Wall mouth animation ──
  if(gpMouth){
    gpMouth.t++;
    // Phase 0-30: mouth opens (appears, jaw drops)
    // Phase 30-70: chewing (jaw oscillates)
    // Phase 70-90: spit (launch 2 pucks)
    // Phase 90-110: mouth closes and fades
    if(gpMouth.t===72){
      // Spit out 2 pucks from the mouth position
      const mx=gpMouth.x, my=gpMouth.y;
      const dir=gpMouth.side==='l'?1:-1;
      const sp=SPEED_INIT*1.1;
      for(const da of[-0.35,0.35]){
        pucks.push({x:mx+dir*30,y:my,vx:dir*Math.cos(da)*sp,vy:Math.sin(da)*sp,
          trail:[],spin:0,spinV:(Math.random()*2-1)*.3,typeIdx:Math.floor(Math.random()*PT.length),
          wallHits:0,lastHitter:gpMouth.lastHitter});
      }
      burst(mx+dir*20,my,'#ff4444',20);burst(mx+dir*20,my,'#ffcc44',14);
      addShake(6);addFloat(mx+dir*40,my-40,'PTOO!','#ff6644');
    }
    if(gpMouth.t>=110)gpMouth=null;
  }
}

function gpBoosterHit(p){
  if(!isGrandPrix())return;
  for(const b of gpBoosters){
    // V-shape hitbox: check if puck is within booster zone
    const dx=p.x-b.x, dy=p.y-b.y;
    const cos=Math.cos(-b.angle),sin=Math.sin(-b.angle);
    const lx=dx*cos-dy*sin, ly=dx*sin+dy*cos;
    // V shape is ~40 wide, ~50 tall
    if(lx>-25&&lx<25&&ly>-10&&ly<35){
      const halfW=12*(1-ly/50); // V narrows toward tip
      if(Math.abs(lx)<halfW+PUCK_R*0.5){
        // Boost! Accelerate puck along booster's forward direction
        const bDir=b.angle-Math.PI/2; // V points "up" in local space
        const boost=SPEED_MAX*0.85;
        p.vx=Math.cos(bDir)*boost;
        p.vy=Math.sin(bDir)*boost;
        p.spinV=(Math.random()*2-1)*1.5;
        burst(p.x,p.y,'#ffdd44',12);burst(p.x,p.y,'#ff4488',8);
        addShake(3);addFloat(p.x,p.y-30,'BOOST!','#ffee44');
        b.life=Math.min(b.life,8); // booster fades quickly after use
        return;
      }
    }
  }
}

function gpShieldBlock(p){
  if(!isGrandPrix())return false;
  // Left goal shield
  if(gpShieldL.active&&p.x-PUCK_R<BW+20){
    const gMid=(gLT+gLB)/2, gHalf=(gLB-gLT)/2+8;
    const dy=p.y-gMid;
    if(Math.abs(dy)<gHalf&&p.vx<0){
      // Semi-circle shield reflection
      const ny=dy/gHalf;
      const nx2=Math.sqrt(Math.max(0,1-ny*ny));
      p.vx=Math.abs(p.vx)*0.9+nx2*2;
      p.vy+=ny*3;
      p.x=BW+20+PUCK_R;
      burst(BW+10,p.y,'#ff44ff',10);
      addShake(2);
      return true;
    }
  }
  // Right goal shield
  if(gpShieldR.active&&p.x+PUCK_R>W-BW-20){
    const gMid=(gRT+gRB)/2, gHalf=(gRB-gRT)/2+8;
    const dy=p.y-gMid;
    if(Math.abs(dy)<gHalf&&p.vx>0){
      const ny=dy/gHalf;
      const nx2=Math.sqrt(Math.max(0,1-ny*ny));
      p.vx=-Math.abs(p.vx)*0.9-nx2*2;
      p.vy+=ny*3;
      p.x=W-BW-20-PUCK_R;
      burst(W-BW-10,p.y,'#ff44ff',10);
      addShake(2);
      return true;
    }
  }
  return false;
}

function drawGrandPrix(){
  if(!isGrandPrix())return;
  // ── Draw boosters ──
  for(const b of gpBoosters){
    const fade=Math.min(b.life/15,1); // fade in/out
    ctx.save();
    ctx.translate(b.x,b.y);ctx.rotate(b.angle);
    ctx.globalAlpha=fade*0.85;
    // V shape
    const t=frameN*0.08;
    for(let layer=2;layer>=0;layer--){
      const s=1+layer*0.18;
      const hue=(frameN*3+layer*40)%360;
      ctx.strokeStyle=`hsla(${hue},100%,${65+layer*10}%,${(0.7-layer*0.2)*fade})`;
      ctx.lineWidth=4-layer;
      ctx.shadowColor=`hsla(${hue},100%,60%,${0.5*fade})`;
      ctx.shadowBlur=layer===0?14:0;
      ctx.beginPath();
      ctx.moveTo(-20*s,28*s);
      // Left arm of V
      for(let i=0;i<=8;i++){
        const frac=i/8;
        const vx=-20*s*(1-frac);
        const vy=28*s*(1-frac);
        const shimmer=Math.sin(t+frac*6+layer)*2*s;
        ctx.lineTo(vx+shimmer,vy);
      }
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(20*s,28*s);
      // Right arm of V
      for(let i=0;i<=8;i++){
        const frac=i/8;
        const vx=20*s*(1-frac);
        const vy=28*s*(1-frac);
        const shimmer=Math.sin(t+frac*6+layer+Math.PI)*2*s;
        ctx.lineTo(vx+shimmer,vy);
      }
      ctx.stroke();
    }
    // Filled shimmer glow inside V
    const ig=ctx.createLinearGradient(0,30,0,-5);
    const iHue=(frameN*4)%360;
    ig.addColorStop(0,`hsla(${iHue},100%,70%,${0.08*fade})`);
    ig.addColorStop(0.5,`hsla(${(iHue+60)%360},100%,65%,${0.18*fade})`);
    ig.addColorStop(1,`hsla(${(iHue+120)%360},100%,60%,${0.05*fade})`);
    ctx.fillStyle=ig;
    ctx.beginPath();ctx.moveTo(-20,28);ctx.lineTo(0,0);ctx.lineTo(20,28);ctx.closePath();ctx.fill();
    // Arrow chevrons rising inside V
    ctx.strokeStyle=`hsla(${(frameN*5)%360},100%,80%,${0.4*fade})`;ctx.lineWidth=1.5;ctx.shadowBlur=0;
    for(let c=0;c<3;c++){
      const cy=25-((frameN*0.8+c*10)%28);
      const cw=18*(cy/28);
      if(cy>0&&cw>2){
        ctx.beginPath();ctx.moveTo(-cw,cy);ctx.lineTo(0,cy-6);ctx.lineTo(cw,cy);ctx.stroke();
      }
    }
    ctx.restore();
  }

  // ── Draw goal shields ──
  for(const [sh,gx,gt,gb,dir] of [[gpShieldL,BW,gLT,gLB,1],[gpShieldR,W-BW,gRT,gRB,-1]]){
    if(!sh.active)continue;
    const fade=Math.min(sh.timer/15,1)*Math.min((120-sh.timer+15)/15,1);
    const gMid=(gt+gb)/2, gHalf=(gb-gt)/2;
    ctx.save();
    ctx.globalAlpha=fade;
    // Semi-circle rainbow sparkle shield
    for(let layer=2;layer>=0;layer--){
      const hue=(frameN*4+layer*50)%360;
      ctx.strokeStyle=`hsla(${hue},100%,${60+layer*12}%,${0.5-layer*0.12})`;
      ctx.lineWidth=5-layer*1.5;
      ctx.shadowColor=`hsla(${hue},100%,60%,${0.6-layer*0.15})`;
      ctx.shadowBlur=layer===0?18:6;
      ctx.beginPath();
      ctx.arc(gx,gMid,gHalf+4+layer*3,
        dir>0?-Math.PI/2:Math.PI/2,
        dir>0?Math.PI/2:-Math.PI/2);
      ctx.stroke();
    }
    // Sparkle particles along the arc
    for(let i=0;i<10;i++){
      const a=(dir>0?-Math.PI/2:Math.PI/2)+
              (dir>0?1:-1)*(i/10)*Math.PI;
      const sr=gHalf+6+Math.sin(frameN*0.12+i*1.3)*4;
      const sx=gx+Math.cos(a)*sr, sy=gMid+Math.sin(a)*sr;
      const sHue=(frameN*5+i*36)%360;
      ctx.fillStyle=`hsla(${sHue},100%,80%,${0.5+0.4*Math.sin(frameN*0.15+i*2)})`;
      ctx.shadowBlur=0;
      ctx.beginPath();ctx.arc(sx,sy,1.5+Math.sin(frameN*0.1+i)*0.8,0,Math.PI*2);ctx.fill();
    }
    ctx.restore();
  }

  // ── Draw wall mouth ──
  if(gpMouth){
    const m=gpMouth, t=m.t;
    const mx=m.x, my=m.y;
    const dir=m.side==='l'?1:-1;
    // Mouth opening amount
    let jawOpen=0;
    if(t<30)jawOpen=t/30; // opening
    else if(t<70)jawOpen=0.7+0.3*Math.abs(Math.sin(t*0.35)); // chewing
    else if(t<90)jawOpen=0.6; // about to spit
    else jawOpen=Math.max(0,(110-t)/20); // closing
    const jawAng=jawOpen*0.55;
    const mouthR=42;
    ctx.save();
    ctx.translate(mx,my);
    // Upper lip
    ctx.fillStyle='#cc2222';
    ctx.beginPath();
    ctx.arc(0,0,mouthR,-Math.PI/2-jawAng*0.3,Math.PI/2+jawAng*0.3,dir<0);
    ctx.lineTo(0,0);ctx.closePath();ctx.fill();
    // Lower jaw — drops down
    ctx.save();
    ctx.rotate(dir*jawAng);
    ctx.fillStyle='#aa1818';
    ctx.beginPath();
    ctx.arc(0,0,mouthR,Math.PI/2-jawAng*0.3,Math.PI*1.5+jawAng*0.3,dir>0);
    ctx.lineTo(0,0);ctx.closePath();ctx.fill();
    ctx.restore();
    // Teeth along both jaws
    ctx.fillStyle='#ffffff';
    const teethCount=6;
    for(let i=0;i<teethCount;i++){
      const frac=(i+0.5)/teethCount;
      // Upper teeth
      const uA=-Math.PI/2+frac*Math.PI;
      const tx=Math.cos(uA)*mouthR*0.88, ty=Math.sin(uA)*mouthR*0.88;
      ctx.beginPath();
      ctx.moveTo(tx,ty);
      ctx.lineTo(tx+Math.cos(uA)*8,ty+Math.sin(uA)*8);
      ctx.lineTo(tx+Math.cos(uA+0.15)*3,ty+Math.sin(uA+0.15)*3);
      ctx.closePath();ctx.fill();
    }
    // Tongue (visible when open)
    if(jawOpen>0.3){
      ctx.fillStyle='#ff6688';
      ctx.beginPath();
      const tongueLen=18*jawOpen;
      ctx.ellipse(dir*8,4,tongueLen,8,dir*0.2,0,Math.PI*2);
      ctx.fill();
    }
    // Drool when chewing
    if(t>30&&t<75){
      ctx.fillStyle=`rgba(200,220,255,${0.4+0.3*Math.sin(t*0.4)})`;
      ctx.beginPath();ctx.ellipse(dir*15,mouthR*0.5+Math.sin(t*0.3)*5,2,4+t%8,0,0,Math.PI*2);ctx.fill();
    }
    // Eyes above mouth
    const eyeY=-mouthR*0.7;
    for(const ex of[-12,12]){
      ctx.fillStyle='#ffffff';
      ctx.beginPath();ctx.ellipse(ex,eyeY,7,8,0,0,Math.PI*2);ctx.fill();
      // Pupil tracks chewing
      const pupilOff=t>30&&t<70?Math.sin(t*0.3)*3:dir*2;
      ctx.fillStyle='#111111';
      ctx.beginPath();ctx.arc(ex+pupilOff,eyeY+1,3,0,Math.PI*2);ctx.fill();
    }
    // Angry eyebrows
    ctx.strokeStyle='#881111';ctx.lineWidth=3;
    ctx.beginPath();ctx.moveTo(-18,eyeY-12);ctx.lineTo(-6,eyeY-8);ctx.stroke();
    ctx.beginPath();ctx.moveTo(18,eyeY-12);ctx.lineTo(6,eyeY-8);ctx.stroke();
    ctx.restore();
  }
}

// ── Draw: chicken obstacle ────────────────────────────────────────────
function drawChicken(cx,cy,r,heading,phase,flapT){
  const flap=Math.sin(flapT*0.35)*0.48;
  ctx.save();
  ctx.translate(cx,cy);
  ctx.rotate(heading-Math.PI/2);
  // Tail feathers
  for(let i=-2;i<=2;i++){
    ctx.save();
    ctx.rotate(Math.PI/2+i*0.26+Math.sin(flapT*0.09+i*0.8)*0.13);
    const flen=r*(0.72+Math.abs(i)*0.08);
    const tg=ctx.createLinearGradient(0,r*.58,0,r*.58+flen);
    tg.addColorStop(0,'#ffe038');tg.addColorStop(0.6,'#ffb000');tg.addColorStop(1,'#a86800');
    ctx.strokeStyle=tg; ctx.lineWidth=r*(0.135-Math.abs(i)*0.018); ctx.lineCap='round';
    ctx.beginPath();ctx.moveTo(0,r*.58);ctx.lineTo(0,r*.58+flen*.82);ctx.stroke();
    ctx.restore();
  }
  // Body
  ctx.save();
  ctx.shadowColor='rgba(210,185,110,0.55)';ctx.shadowBlur=15;
  const bg=ctx.createRadialGradient(-r*.2,-r*.15,r*.08,r*.1,r*.12,r*.84);
  bg.addColorStop(0,'#fffef6');bg.addColorStop(0.44,'#f0e5c8');bg.addColorStop(1,'#d0bc8c');
  ctx.fillStyle=bg;
  ctx.beginPath();ctx.ellipse(0,r*.06,r*.72,r*.88,0,0,Math.PI*2);ctx.fill();
  ctx.restore();
  ctx.strokeStyle='rgba(190,155,80,0.30)';ctx.lineWidth=1.5;
  ctx.beginPath();ctx.ellipse(0,r*.06,r*.72,r*.88,0,0,Math.PI*2);ctx.stroke();
  // Left wing
  ctx.save();ctx.translate(-r*.62,r*.04);ctx.rotate(-0.28+flap*0.75);
  const lwg=ctx.createRadialGradient(-r*.05,-r*.05,0,0,0,r*.54);
  lwg.addColorStop(0,'#fffaea');lwg.addColorStop(1,'#d0b468');
  ctx.fillStyle=lwg;ctx.beginPath();ctx.ellipse(0,0,r*.26,r*.52,-0.18,0,Math.PI*2);ctx.fill();
  ctx.strokeStyle='rgba(165,125,55,0.30)';ctx.lineWidth=1;ctx.stroke();
  ctx.restore();
  // Right wing
  ctx.save();ctx.translate(r*.62,r*.04);ctx.rotate(0.28-flap*0.75);
  const rwg=ctx.createRadialGradient(r*.05,-r*.05,0,0,0,r*.54);
  rwg.addColorStop(0,'#fffaea');rwg.addColorStop(1,'#d0b468');
  ctx.fillStyle=rwg;ctx.beginPath();ctx.ellipse(0,0,r*.26,r*.52,0.18,0,Math.PI*2);ctx.fill();
  ctx.strokeStyle='rgba(165,125,55,0.30)';ctx.lineWidth=1;ctx.stroke();
  ctx.restore();
  // Head
  ctx.save();ctx.translate(0,-r*.76);
  ctx.save();
  ctx.shadowColor='rgba(210,185,110,0.42)';ctx.shadowBlur=9;
  const hg=ctx.createRadialGradient(-r*.12,-r*.12,r*.04,0,0,r*.42);
  hg.addColorStop(0,'#fffef6');hg.addColorStop(1,'#dfd0aa');
  ctx.fillStyle=hg;ctx.beginPath();ctx.arc(0,0,r*.40,0,Math.PI*2);ctx.fill();
  ctx.restore();
  ctx.strokeStyle='rgba(190,155,80,0.25)';ctx.lineWidth=1;
  ctx.beginPath();ctx.arc(0,0,r*.40,0,Math.PI*2);ctx.stroke();
  // Comb
  ctx.fillStyle='#cc1a0a';
  for(let i=-1;i<=1;i++){
    ctx.save();ctx.shadowColor='rgba(200,20,0,0.5)';ctx.shadowBlur=5;
    ctx.beginPath();ctx.arc(i*r*.15,-r*.30-Math.abs(i)*r*.04,r*(0.122-Math.abs(i)*0.018),0,Math.PI*2);ctx.fill();
    ctx.restore();
  }
  // Wattle
  ctx.fillStyle='#cc1a0a';ctx.beginPath();ctx.ellipse(r*.03,r*.22,r*.09,r*.14,0.12,0,Math.PI*2);ctx.fill();
  // Beak
  ctx.fillStyle='#ff9200';ctx.beginPath();ctx.moveTo(-r*.13,r*.02);ctx.lineTo(r*.13,r*.02);ctx.lineTo(r*.02,r*.23);ctx.closePath();ctx.fill();
  ctx.strokeStyle='rgba(165,72,0,0.35)';ctx.lineWidth=0.9;ctx.stroke();
  // Eyes — extra big and panicked
  const esc=phase==='dropping'?1.28:1.0;
  ctx.fillStyle='#14080a';
  ctx.beginPath();ctx.arc(-r*.17,-r*.08,r*.112*esc,0,Math.PI*2);ctx.fill();
  ctx.beginPath();ctx.arc(r*.17,-r*.08,r*.112*esc,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='rgba(255,255,255,0.9)';
  ctx.beginPath();ctx.arc(-r*.205,-r*.115,r*.046,0,Math.PI*2);ctx.fill();
  ctx.beginPath();ctx.arc(r*.135,-r*.115,r*.046,0,Math.PI*2);ctx.fill();
  ctx.restore(); // head
  // Legs
  ctx.strokeStyle='#ff9200';ctx.lineWidth=r*.09;ctx.lineCap='round';
  const lb=Math.sin(flapT*0.55)*r*.08;
  ctx.beginPath();ctx.moveTo(-r*.2,r*.76);ctx.lineTo(-r*.2,r*1.02+lb);ctx.lineTo(-r*.36,r*1.18+lb);ctx.stroke();
  ctx.beginPath();ctx.moveTo(r*.2,r*.76);ctx.lineTo(r*.2,r*1.02-lb);ctx.lineTo(r*.36,r*1.18-lb);ctx.stroke();
  ctx.lineWidth=r*.055;
  ctx.beginPath();ctx.moveTo(-r*.36,r*1.18+lb);ctx.lineTo(-r*.52,r*1.21+lb);ctx.stroke();
  ctx.beginPath();ctx.moveTo(-r*.36,r*1.18+lb);ctx.lineTo(-r*.33,r*1.32+lb);ctx.stroke();
  ctx.beginPath();ctx.moveTo(r*.36,r*1.18-lb);ctx.lineTo(r*.52,r*1.21-lb);ctx.stroke();
  ctx.beginPath();ctx.moveTo(r*.36,r*1.18-lb);ctx.lineTo(r*.33,r*1.32-lb);ctx.stroke();
  ctx.restore();
}

// ── Draw: pyramid obstacle ───────────────────────────────────────────
function drawPyramidObstacle(cx,cy,s,angle,pulse){
  // Outer glow ring (in world space before rotation)
  ctx.save();
  ctx.shadowColor='rgba(200,148,38,0.65)';ctx.shadowBlur=20+pulse*14;
  ctx.strokeStyle=`rgba(220,170,70,${.45+.2*pulse})`;ctx.lineWidth=2.5;
  ctx.save();ctx.translate(cx,cy);ctx.rotate(angle);
  ctx.beginPath();ctx.moveTo(-s,-s);ctx.lineTo(s,-s);ctx.lineTo(s,s);ctx.lineTo(-s,s);ctx.closePath();ctx.stroke();
  ctx.restore();ctx.restore();

  ctx.save();ctx.translate(cx,cy);ctx.rotate(angle);

  // 4 triangular faces: each face normal points in a local cardinal direction.
  // Lighting is fixed in world space (upper-left), so brightness shifts as pyramid rotates.
  const faceNormals=[0,-Math.PI/2,Math.PI,-Math.PI/2*3]; // local angles for top,right,bottom,left faces
  // corners in order: TL,TR,BR,BL
  const C=[[-s,-s],[s,-s],[s,s],[-s,s]];
  for(let i=0;i<4;i++){
    const worldNormal=faceNormals[i]+angle;
    const lightDir=-Math.PI/4; // light from upper-left
    const bright=0.38+0.58*Math.max(0,Math.cos(worldNormal-lightDir));
    const L=Math.round(18+bright*38);
    ctx.fillStyle=`hsl(33,62%,${L}%)`;
    ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(C[i][0],C[i][1]);ctx.lineTo(C[(i+1)%4][0],C[(i+1)%4][1]);ctx.closePath();ctx.fill();
    ctx.strokeStyle='rgba(0,0,0,0.22)';ctx.lineWidth=1;ctx.stroke();
  }

  // Concentric inner square outlines (elevation contours)
  for(const sc of[0.72,0.50,0.30]){
    const is=s*sc;
    ctx.strokeStyle='rgba(0,0,0,0.28)';ctx.lineWidth=1.2;
    ctx.beginPath();ctx.moveTo(-is,-is);ctx.lineTo(is,-is);ctx.lineTo(is,is);ctx.lineTo(-is,is);ctx.closePath();ctx.stroke();
  }

  // Ridge lines: center → each corner
  ctx.strokeStyle='rgba(0,0,0,0.35)';ctx.lineWidth=1.4;
  for(const[cx2,cy2]of C){ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(cx2,cy2);ctx.stroke();}

  // Outer border
  ctx.strokeStyle='rgba(80,40,0,0.75)';ctx.lineWidth=2;
  ctx.beginPath();ctx.moveTo(-s,-s);ctx.lineTo(s,-s);ctx.lineTo(s,s);ctx.lineTo(-s,s);ctx.closePath();ctx.stroke();

  // Apex glow
  const ag=ctx.createRadialGradient(0,0,0,0,0,s*.3);
  ag.addColorStop(0,`rgba(255,235,130,${.65+pulse*.3})`);ag.addColorStop(1,'rgba(200,150,40,0)');
  ctx.fillStyle=ag;ctx.beginPath();ctx.arc(0,0,s*.3,0,Math.PI*2);ctx.fill();
  // Apex cap
  ctx.fillStyle=`rgba(255,248,200,${.55+pulse*.4})`;
  ctx.beginPath();ctx.arc(0,0,s*.07,0,Math.PI*2);ctx.fill();

  ctx.restore();
}

/// ── Draw: hexagon obstacle ────────────────────────────────────────────
function drawHexObstacle(cx,cy,r,angle,o){
  ctx.save();ctx.translate(cx,cy);ctx.rotate(angle);
  const N=6;
  const Verts=[];
  for(let i=0;i<N;i++){const a=i*Math.PI/3;Verts.push([r*Math.cos(a),r*Math.sin(a)]);}
  // Facets
  const lightLevels=[18,24,30,18,24,30];
  const hue=o.hue||38;
  for(let i=0;i<N;i++){
    const[ax,ay]=Verts[i],[bx,by]=Verts[(i+1)%N];
    ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(ax,ay);ctx.lineTo(bx,by);ctx.closePath();
    ctx.fillStyle=`hsl(${hue},75%,${lightLevels[i]}%)`;ctx.fill();
  }
  // Edge glow + outline
  ctx.save();
  ctx.shadowColor=o.glowCol||'rgba(255,180,40,0.80)';ctx.shadowBlur=18+8*Math.sin(frameN*.055);
  ctx.strokeStyle=o.ltCol||'rgba(255,210,80,0.92)';ctx.lineWidth=2.5;
  ctx.beginPath();
  for(let i=0;i<N;i++){const[ax,ay]=Verts[i];i===0?ctx.moveTo(ax,ay):ctx.lineTo(ax,ay);}
  ctx.closePath();ctx.stroke();
  ctx.restore();
  // Inner hex outline
  ctx.strokeStyle=`rgba(255,220,120,0.30)`;ctx.lineWidth=1.2;
  ctx.beginPath();
  for(let i=0;i<N;i++){const a=i*Math.PI/3;const ir=r*0.52;i===0?ctx.moveTo(ir*Math.cos(a),ir*Math.sin(a)):ctx.lineTo(ir*Math.cos(a),ir*Math.sin(a));}
  ctx.closePath();ctx.stroke();
  // Ridge lines center → each vertex
  ctx.strokeStyle='rgba(0,0,0,0.28)';ctx.lineWidth=1;
  for(const[ax,ay]of Verts){ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(ax,ay);ctx.stroke();}
  // Center radial glow
  const ag=ctx.createRadialGradient(0,0,0,0,0,r*.38);
  ag.addColorStop(0,`rgba(255,240,160,${0.52+0.22*Math.sin(frameN*.065)})`);
  ag.addColorStop(1,'rgba(255,180,40,0)');
  ctx.fillStyle=ag;ctx.beginPath();ctx.arc(0,0,r*.38,0,Math.PI*2);ctx.fill();
  ctx.restore();
}

// ── Draw: stage obstacles ────────────────────────────────────────────
function triRadius(o){
  return o.size*(1+(o.pulseAmp||0.2)*Math.sin(arcticAngle*(o.pulseSpeed||0.8)));
}
function drawTriangleObstacle(cx,cy,R,angle){
  const t=frameN*0.8;
  ctx.save();
  ctx.translate(cx,cy);
  ctx.rotate(angle);

  // Outer glow + body
  ctx.save();
  ctx.shadowColor='rgba(160,80,255,0.75)';
  ctx.shadowBlur=20+10*Math.sin(frameN*.065);
  ctx.beginPath();
  for(let i=0;i<3;i++){const a=-Math.PI/2+i*Math.PI*2/3;i===0?ctx.moveTo(R*Math.cos(a),R*Math.sin(a)):ctx.lineTo(R*Math.cos(a),R*Math.sin(a));}
  ctx.closePath();
  const grad=ctx.createRadialGradient(0,-R*.2,R*.08,0,0,R);
  grad.addColorStop(0,'rgba(210,170,255,0.72)');
  grad.addColorStop(0.55,'rgba(110,50,200,0.60)');
  grad.addColorStop(1,'rgba(60,10,140,0.82)');
  ctx.fillStyle=grad;
  ctx.fill();
  ctx.restore();

  // Rainbow edges
  for(let i=0;i<3;i++){
    const a0=-Math.PI/2+i*Math.PI*2/3, a1=-Math.PI/2+(i+1)*Math.PI*2/3;
    const hue=(t*2+i*120)%360;
    ctx.save();
    ctx.shadowColor=`hsla(${hue},100%,65%,0.9)`;ctx.shadowBlur=12;
    ctx.strokeStyle=`hsla(${hue},100%,68%,0.95)`;ctx.lineWidth=3;
    ctx.beginPath();ctx.moveTo(R*Math.cos(a0),R*Math.sin(a0));ctx.lineTo(R*Math.cos(a1),R*Math.sin(a1));ctx.stroke();
    ctx.restore();
  }

  // Inner counter-rotating triangle
  ctx.save();
  ctx.rotate(-angle*2);
  const iR=R*0.42;
  ctx.beginPath();
  for(let i=0;i<3;i++){const a=-Math.PI/2+i*Math.PI*2/3;i===0?ctx.moveTo(iR*Math.cos(a),iR*Math.sin(a)):ctx.lineTo(iR*Math.cos(a),iR*Math.sin(a));}
  ctx.closePath();
  const hue2=(t*3)%360;
  ctx.save();ctx.shadowColor=`hsla(${hue2},100%,78%,0.7)`;ctx.shadowBlur=9;
  ctx.strokeStyle=`hsla(${hue2},100%,80%,0.75)`;ctx.lineWidth=2;ctx.stroke();
  ctx.restore();
  ctx.restore();

  // Center radial glow
  const cg=ctx.createRadialGradient(0,0,0,0,0,R*.22);
  cg.addColorStop(0,'rgba(230,210,255,0.95)');
  cg.addColorStop(1,'rgba(160,80,255,0)');
  ctx.fillStyle=cg;ctx.beginPath();ctx.arc(0,0,R*.22,0,Math.PI*2);ctx.fill();

  ctx.restore();
}
function drawTurntable(cx,cy,r,o){
  const spin=arcticAngle*28*(o.spinDir||1); // fast visual rotation
  const pulse=0.5+0.5*Math.sin(frameN*.07);

  // Platform base
  ctx.save();
  ctx.shadowColor=o.glowCol;ctx.shadowBlur=14+pulse*10;
  const bg=ctx.createRadialGradient(cx,cy,0,cx,cy,r);
  bg.addColorStop(0,'#141830');bg.addColorStop(0.65,'#0a0c22');bg.addColorStop(1,'#05060f');
  ctx.fillStyle=bg;ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.fill();
  ctx.restore();

  // Spinning groove rings + radial lines
  ctx.save();ctx.translate(cx,cy);ctx.rotate(spin);
  for(let i=1;i<=5;i++){
    ctx.strokeStyle=`rgba(80,100,220,${0.07+0.04*(i%2)})`;ctx.lineWidth=0.9;
    ctx.beginPath();ctx.arc(0,0,r*i/5.5,0,Math.PI*2);ctx.stroke();
  }
  for(let i=0;i<18;i++){
    const a=i/18*Math.PI*2;
    ctx.strokeStyle='rgba(70,90,200,0.08)';ctx.lineWidth=0.7;
    ctx.beginPath();ctx.moveTo(Math.cos(a)*r*.30,Math.sin(a)*r*.30);
    ctx.lineTo(Math.cos(a)*r*.94,Math.sin(a)*r*.94);ctx.stroke();
  }
  ctx.restore();

  // Spin-direction arc with arrowhead
  ctx.save();ctx.translate(cx,cy);ctx.rotate(spin*0.18);
  const dir=o.spinDir||1;
  const aR=r*.60;
  ctx.save();
  ctx.shadowColor=o.ltCol;ctx.shadowBlur=8;
  ctx.strokeStyle=`rgba(120,140,255,${0.40+pulse*0.22})`;ctx.lineWidth=2.2;
  ctx.beginPath();ctx.arc(0,0,aR,0,Math.PI*1.55*dir);ctx.stroke();
  // Arrowhead at end of arc
  const ea=Math.PI*1.55*dir;
  const ax=Math.cos(ea)*aR, ay=Math.sin(ea)*aR;
  const ha=ea+dir*Math.PI/2;
  ctx.fillStyle=`rgba(130,150,255,${0.55+pulse*0.2})`;
  ctx.beginPath();ctx.moveTo(ax,ay);
  ctx.lineTo(ax+Math.cos(ha)*7,ay+Math.sin(ha)*7);
  ctx.lineTo(ax+Math.cos(ea)*(-7),ay+Math.sin(ea)*(-7));
  ctx.closePath();ctx.fill();
  ctx.restore();
  ctx.restore();

  // Rim
  ctx.strokeStyle=`rgba(100,120,240,${0.28+pulse*0.18})`;ctx.lineWidth=2;
  ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.stroke();

  // Centre spindle hub
  ctx.save();
  ctx.shadowColor=o.ltCol;ctx.shadowBlur=10;
  const hg=ctx.createRadialGradient(cx-r*.08,cy-r*.08,0,cx,cy,r*.18);
  hg.addColorStop(0,'#ffffff');hg.addColorStop(0.35,o.ltCol);hg.addColorStop(1,o.col);
  ctx.fillStyle=hg;ctx.beginPath();ctx.arc(cx,cy,r*.15,0,Math.PI*2);ctx.fill();
  ctx.restore();
}
function drawLadybug(cx,cy,r,heading){
  ctx.save();
  ctx.translate(cx,cy);
  ctx.rotate(heading-Math.PI/2); // heading = movement dir; rotate so body points forward
  const bW=r*.80, bH=r; // half-width, half-height of elytra

  // --- Elytra (red wing cases) ---
  ctx.save();
  ctx.shadowColor='rgba(220,50,0,0.55)';ctx.shadowBlur=8;
  const eg=ctx.createRadialGradient(-bW*.22,-bH*.28,r*.06,0,bH*.08,r*1.08);
  eg.addColorStop(0,'#ff7a55');eg.addColorStop(0.42,'#dd2200');eg.addColorStop(1,'#7a0000');
  ctx.fillStyle=eg;
  ctx.beginPath();ctx.ellipse(0,bH*.08,bW,bH,0,0,Math.PI*2);ctx.fill();
  ctx.restore();
  ctx.strokeStyle='#1c0000';ctx.lineWidth=1.3;
  ctx.beginPath();ctx.ellipse(0,bH*.08,bW,bH,0,0,Math.PI*2);ctx.stroke();

  // Suture (center split line)
  ctx.strokeStyle='#1c0000';ctx.lineWidth=1.3;
  ctx.beginPath();ctx.moveTo(0,-bH+r*.18);ctx.lineTo(0,bH*1.1);ctx.stroke();

  // Spots
  ctx.fillStyle='#180000';
  const SP=[
    [ bW*.50,-bH*.07,r*.175],[-bW*.50,-bH*.07,r*.175],
    [ bW*.52, bH*.44,r*.155],[-bW*.52, bH*.44,r*.155],
    [ bW*.20,-bH*.46,r*.115],[-bW*.20,-bH*.46,r*.115],
  ];
  for(const[sx,sy,sr]of SP){ctx.beginPath();ctx.arc(sx,sy,sr,0,Math.PI*2);ctx.fill();}

  // --- Pronotum (black shield at front of body) ---
  ctx.fillStyle='#120000';
  ctx.beginPath();ctx.ellipse(0,-bH+r*.06,bW*.65,r*.30,0,0,Math.PI*2);ctx.fill();
  // Tiny white spots on pronotum
  ctx.fillStyle='rgba(255,255,255,0.22)';
  ctx.beginPath();ctx.arc(-r*.21,-bH+r*.05,r*.07,0,Math.PI*2);ctx.fill();
  ctx.beginPath();ctx.arc( r*.21,-bH+r*.05,r*.07,0,Math.PI*2);ctx.fill();

  // --- Head ---
  ctx.fillStyle='#0d0000';
  ctx.beginPath();ctx.arc(0,-bH-r*.10,r*.30,0,Math.PI*2);ctx.fill();
  // Eye highlights
  ctx.fillStyle='rgba(255,255,255,0.72)';
  ctx.beginPath();ctx.arc(-r*.12,-bH-r*.14,r*.07,0,Math.PI*2);ctx.fill();
  ctx.beginPath();ctx.arc( r*.12,-bH-r*.14,r*.07,0,Math.PI*2);ctx.fill();

  // --- Antennae ---
  ctx.strokeStyle='#0d0000';ctx.lineWidth=1.1;
  ctx.beginPath();ctx.moveTo(-r*.10,-bH-r*.33);
  ctx.quadraticCurveTo(-r*.44,-bH-r*.72,-r*.31,-bH-r*1.02);ctx.stroke();
  ctx.beginPath();ctx.moveTo( r*.10,-bH-r*.33);
  ctx.quadraticCurveTo( r*.44,-bH-r*.72, r*.31,-bH-r*1.02);ctx.stroke();
  ctx.fillStyle='#0d0000';
  ctx.beginPath();ctx.arc(-r*.31,-bH-r*1.02,r*.09,0,Math.PI*2);ctx.fill();
  ctx.beginPath();ctx.arc( r*.31,-bH-r*1.02,r*.09,0,Math.PI*2);ctx.fill();

  // --- Legs (3 per side) ---
  ctx.strokeStyle='#250000';ctx.lineWidth=1;
  for(let i=0;i<3;i++){
    const ly=-bH*.10+i*bH*.42, llen=r*.42;
    ctx.beginPath();ctx.moveTo(-bW,ly);ctx.lineTo(-bW-llen,ly+r*.20);ctx.stroke();
    ctx.beginPath();ctx.moveTo( bW,ly);ctx.lineTo( bW+llen,ly+r*.20);ctx.stroke();
  }
  ctx.restore();
}

const PORTAL_COLS=['#ff44cc','#44ccff','#aaff44'];
const PORTAL_GLOW=['rgba(255,40,200,0.9)','rgba(40,200,255,0.9)','rgba(160,255,40,0.9)'];
function drawPortalTriangle(cx,cy,R,angle,o){
  const t=frameN*0.8;
  const pf=o.portalFlash;
  // Decay flash timers
  for(let i=0;i<3;i++){if(pf[i]>0)pf[i]--;}

  ctx.save();
  ctx.translate(cx,cy);
  ctx.rotate(angle);

  // Vertices
  const V=[];
  for(let i=0;i<3;i++){const a=-Math.PI/2+i*Math.PI*2/3;V.push([R*Math.cos(a),R*Math.sin(a)]);}

  // Dark void interior
  ctx.beginPath();
  V.forEach(([vx,vy],i)=>i===0?ctx.moveTo(vx,vy):ctx.lineTo(vx,vy));
  ctx.closePath();
  const grad=ctx.createRadialGradient(0,0,0,0,0,R);
  grad.addColorStop(0,'rgba(0,180,140,0.28)');
  grad.addColorStop(0.5,'rgba(0,60,50,0.55)');
  grad.addColorStop(1,'rgba(0,10,8,0.80)');
  ctx.fillStyle=grad;ctx.fill();

  // Portal edges
  for(let i=0;i<3;i++){
    const[ax,ay]=V[i],[bx,by]=V[(i+1)%3];
    const flash=pf[i]/20;  // 1→0
    const pulse=0.5+0.5*Math.sin(t*0.85+i*Math.PI*2/3);
    ctx.save();
    ctx.shadowColor=flash>0?PORTAL_GLOW[i]:PORTAL_COLS[i];
    ctx.shadowBlur=flash>0?35+flash*30:8+pulse*14;
    ctx.strokeStyle=flash>0?`rgba(255,255,255,${0.55+flash*0.45})`:PORTAL_COLS[i];
    ctx.lineWidth=flash>0?5+flash*5:2.5+pulse*1.5;
    ctx.beginPath();ctx.moveTo(ax,ay);ctx.lineTo(bx,by);ctx.stroke();
    ctx.restore();

    // Travelling orb along the edge
    const orbT=(frameN*0.022+i*0.62)%1;
    const orbX=ax+(bx-ax)*orbT, orbY=ay+(by-ay)*orbT;
    ctx.save();
    ctx.shadowColor=PORTAL_COLS[i];ctx.shadowBlur=10;
    ctx.fillStyle=PORTAL_COLS[i];
    ctx.globalAlpha=0.55+0.35*Math.sin(t*0.9+i);
    ctx.beginPath();ctx.arc(orbX,orbY,3,0,Math.PI*2);ctx.fill();
    ctx.restore();

    // Flash ring at edge midpoint when portal fires
    if(flash>0){
      const mx=(ax+bx)*0.5, my=(ay+by)*0.5;
      ctx.save();
      ctx.shadowColor=PORTAL_GLOW[i];ctx.shadowBlur=18;
      ctx.strokeStyle=`rgba(255,255,255,${flash*0.65})`;ctx.lineWidth=2;
      ctx.beginPath();ctx.arc(mx,my,(1-flash)*R*0.55,0,Math.PI*2);ctx.stroke();
      ctx.restore();
    }
  }

  // Center void swirl
  ctx.save();
  for(let i=0;i<3;i++){
    const a=frameN*0.018+i*Math.PI*2/3;
    ctx.strokeStyle=`hsla(${(t*1.2+i*120)%360},90%,55%,0.22)`;
    ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(0,0,R*0.20,a,a+Math.PI*.55);ctx.stroke();
  }
  ctx.restore();

  ctx.restore();
}
function drawShark(x,y,r,angle){
  ctx.save();ctx.translate(x,y);ctx.rotate(angle);
  // Bite animation: jaw opens then snaps shut over 24 frames
  const biteF=sharkBiteTimer>0?sharkBiteTimer/24:0;
  // Quick open (first 8 frames), slow close (remaining 16)
  const jawOpen=biteF>0.67?((1-biteF)/0.33):biteF/0.67;
  const jawAng=jawOpen*0.45; // max jaw opening angle in radians
  // Body shadow/glow
  ctx.shadowColor='rgba(40,60,90,0.6)';ctx.shadowBlur=16;
  // Main body — elongated oval
  ctx.fillStyle='#667788';
  ctx.beginPath();ctx.ellipse(0,0,r*1.6,r*0.7,0,0,Math.PI*2);ctx.fill();
  // Belly (lighter underside)
  ctx.fillStyle='#99aabb';
  ctx.beginPath();ctx.ellipse(0,r*0.15,r*1.3,r*0.35,0,0,Math.PI);ctx.fill();
  // Dorsal fin
  ctx.fillStyle='#556677';
  ctx.beginPath();ctx.moveTo(-r*0.3,-r*0.65);ctx.lineTo(r*0.3,-r*0.35);ctx.lineTo(-r*0.15,-r*0.35);ctx.fill();
  // Tail fin
  ctx.fillStyle='#556677';
  ctx.beginPath();ctx.moveTo(-r*1.4,0);ctx.lineTo(-r*1.9,-r*0.5);ctx.lineTo(-r*1.5,0);ctx.lineTo(-r*1.9,r*0.5);ctx.fill();
  // Gill slits
  ctx.shadowBlur=0;
  ctx.strokeStyle='rgba(40,50,60,0.35)';ctx.lineWidth=1.5;
  for(let i=0;i<3;i++){const gx=r*0.3-i*r*0.15;ctx.beginPath();ctx.moveTo(gx,-r*0.25);ctx.lineTo(gx,r*0.1);ctx.stroke();}
  // Eye — angrier during bite
  const eyeR=r*0.12+(biteF>0?0.02*r:0);
  ctx.fillStyle='#111';ctx.beginPath();ctx.arc(r*0.7,-r*0.18,eyeR,0,Math.PI*2);ctx.fill();
  ctx.fillStyle=biteF>0?'#ff1111':'#ff3333';ctx.beginPath();ctx.arc(r*0.72,-r*0.18,r*0.06,0,Math.PI*2);ctx.fill();
  // Upper jaw (rotates up during bite)
  ctx.save();ctx.translate(r*0.65,0);ctx.rotate(-jawAng);
  ctx.fillStyle='#778899';
  ctx.beginPath();ctx.moveTo(0,-r*0.35);ctx.quadraticCurveTo(r*0.6,-r*0.38,r*0.65,-r*0.05);
  ctx.lineTo(0,0);ctx.fill();
  // Upper teeth
  if(jawOpen>0.05){
    ctx.fillStyle='#ffffff';
    for(let i=0;i<5;i++){
      const tx=r*0.08+i*r*0.12, th=r*0.12+Math.sin(i*1.5)*r*0.04;
      ctx.beginPath();ctx.moveTo(tx,0);ctx.lineTo(tx+r*0.04,-th);ctx.lineTo(tx+r*0.08,0);ctx.fill();
    }
  }
  ctx.restore();
  // Lower jaw (rotates down during bite)
  ctx.save();ctx.translate(r*0.65,0);ctx.rotate(jawAng);
  ctx.fillStyle='#6b7b8b';
  ctx.beginPath();ctx.moveTo(0,r*0.35);ctx.quadraticCurveTo(r*0.6,r*0.38,r*0.65,r*0.05);
  ctx.lineTo(0,0);ctx.fill();
  // Lower teeth
  if(jawOpen>0.05){
    ctx.fillStyle='#ffffff';
    for(let i=0;i<5;i++){
      const tx=r*0.08+i*r*0.12, th=r*0.10+Math.sin(i*1.2)*r*0.03;
      ctx.beginPath();ctx.moveTo(tx,0);ctx.lineTo(tx+r*0.04,th);ctx.lineTo(tx+r*0.08,0);ctx.fill();
    }
  }
  // Mouth interior (red gums visible when open)
  if(jawOpen>0.1){
    ctx.fillStyle=`rgba(180,30,30,${jawOpen*0.8})`;
    ctx.beginPath();ctx.ellipse(r*0.2,0,r*0.25*jawOpen,r*0.12*jawOpen,0,0,Math.PI*2);ctx.fill();
  }
  ctx.restore();
  ctx.restore();
  // Decrement bite timer (done here so it ticks with draw)
  if(sharkBiteTimer>0)sharkBiteTimer--;
}
function drawOctopus(x,y,r,angle){
  ctx.save();ctx.translate(x,y);
  // Tentacles — 8 wavy arms
  for(let i=0;i<8;i++){
    const ta=Math.PI*2*i/8+frameN*0.008;
    const tlen=r*1.8;
    ctx.strokeStyle=`hsla(${280+i*5},60%,${45+i*3}%,0.7)`;ctx.lineWidth=3.5-i*0.15;
    ctx.beginPath();
    let tx=0,ty=0;
    ctx.moveTo(tx,ty);
    for(let j=1;j<=6;j++){
      const f=j/6;
      tx=Math.cos(ta)*tlen*f+Math.sin(frameN*0.03+i*1.1+j*0.7)*r*0.35*f;
      ty=Math.sin(ta)*tlen*f+Math.cos(frameN*0.025+i*0.9+j*0.5)*r*0.3*f;
      ctx.lineTo(tx,ty);
    }
    ctx.stroke();
    // Suction cup dots
    if(frameN%2===0){ctx.fillStyle=`rgba(200,120,255,0.3)`;ctx.beginPath();ctx.arc(tx,ty,2,0,Math.PI*2);ctx.fill();}
  }
  // Head — round dome
  ctx.shadowColor='rgba(130,40,200,0.5)';ctx.shadowBlur=14;
  const hg=ctx.createRadialGradient(-r*0.15,-r*0.15,0,0,0,r);
  hg.addColorStop(0,'#bb66ee');hg.addColorStop(0.6,'#8833bb');hg.addColorStop(1,'#551188');
  ctx.fillStyle=hg;ctx.beginPath();ctx.arc(0,0,r*0.85,0,Math.PI*2);ctx.fill();
  // Specular highlight
  ctx.fillStyle='rgba(255,255,255,0.18)';
  ctx.beginPath();ctx.arc(-r*0.2,-r*0.25,r*0.3,0,Math.PI*2);ctx.fill();
  // Eyes
  ctx.shadowBlur=0;
  for(const sx of[-1,1]){
    ctx.fillStyle='#fff';ctx.beginPath();ctx.ellipse(sx*r*0.3,-r*0.1,r*0.2,r*0.25,0,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='#111';ctx.beginPath();ctx.arc(sx*r*0.32,-r*0.05,r*0.1,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(sx*r*0.34,-r*0.1,r*0.04,0,Math.PI*2);ctx.fill();
  }
  ctx.restore();
}
function drawFish(x,y,r,angle,col,ltCol){
  ctx.save();ctx.translate(x,y);ctx.rotate(angle);
  // Body glow
  ctx.shadowColor=col;ctx.shadowBlur=8;
  // Body
  ctx.fillStyle=col;
  ctx.beginPath();ctx.ellipse(0,0,r*1.4,r*0.7,0,0,Math.PI*2);ctx.fill();
  // Tail
  ctx.beginPath();ctx.moveTo(-r*1.1,0);ctx.lineTo(-r*1.8,-r*0.6);ctx.lineTo(-r*1.8,r*0.6);ctx.fill();
  // Dorsal stripe
  ctx.fillStyle=ltCol;
  ctx.beginPath();ctx.ellipse(0,-r*0.05,r*1.0,r*0.3,0,Math.PI,Math.PI*2);ctx.fill();
  // Eye
  ctx.shadowBlur=0;
  ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(r*0.5,-r*0.05,r*0.25,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#111';ctx.beginPath();ctx.arc(r*0.55,-r*0.05,r*0.13,0,Math.PI*2);ctx.fill();
  ctx.restore();
}
function drawObstacles(){
  const obs=STAGES[currentStage].obstacles;
  if(!obs.length)return;
  const pulse=0.5+0.5*Math.sin(frameN*.07);

  const isNeon=STAGES[currentStage].name==='Neon Arcade';
  for(let oi=0;oi<obs.length;oi++){
    const o=obs[oi];
    const{x:ox,y:oy}=obsPos(o,oi);

    if(o.type==='turntable'){
      drawTurntable(ox,oy,o.r,o);
    }else if(o.type==='chicken'){
      if(chickenPhase!=='waiting')drawChicken(ox,oy,o.r,o.wangle||0,chickenPhase,o.flapT||0);
    }else if(o.type==='ladybug'){
      drawLadybug(ox,oy,o.r,o.wangle||0);
    }else if(o.type==='shark'){
      drawShark(ox,oy,o.r,o.wangle||0);
    }else if(o.type==='octopus'){
      drawOctopus(ox,oy,o.r,o.wangle||0);
    }else if(o.type==='fish'){
      drawFish(ox,oy,o.r,o.wangle||0,o.col,o.ltCol);
    }else if(o.type==='hex'){
      drawHexObstacle(ox,oy,o.r,arcticAngle*(o.rotSpeed||0.2),o);
    }else if(o.type==='portal_tri'){
      drawPortalTriangle(ox,oy,o.size,arcticAngle*(o.rotSpeed||0.22),o);
    }else if(o.type==='triangle'){
      drawTriangleObstacle(ox,oy,triRadius(o),arcticAngle*(o.rotSpeed||0.3));
    }else if(o.type==='pyramid'){
      drawPyramidObstacle(ox,oy,o.size,arcticAngle*(o.rotSpeed||0.65),pulse);
    }else if(o.type==='pinball'){
      if(o.hitTimer>0)o.hitTimer--;
      const hf=o.hitTimer/18; // 1→0 over 18 frames
      const hit=hf>0;
      const bodyR=o.r*(1+hf*0.32);

      // Expanding hit ring
      if(hit){
        ctx.save();
        ctx.shadowColor='rgba(255,200,60,0.9)';ctx.shadowBlur=28;
        ctx.strokeStyle=`rgba(255,230,80,${hf*0.85})`;ctx.lineWidth=3.5;
        ctx.beginPath();ctx.arc(ox,oy,o.r+(.1-hf)*o.r*1.6+o.r*1.6,0,Math.PI*2);
        // ring starts at edge and expands outward
        const ringR=o.r*(1.1+(1-hf)*1.8);
        ctx.beginPath();ctx.arc(ox,oy,ringR,0,Math.PI*2);ctx.stroke();
        ctx.restore();
      }

      // Glow halo
      ctx.save();
      ctx.shadowColor=hit?'rgba(255,220,60,1.0)':o.glowCol;
      ctx.shadowBlur=hit?50+hf*30:18+pulse*14;
      ctx.strokeStyle=hit?`rgba(255,240,100,${0.5+hf*0.5})`:`rgba(255,80,0,${0.25+pulse*0.5})`;
      ctx.lineWidth=3;
      ctx.beginPath();ctx.arc(ox,oy,bodyR+4,0,Math.PI*2);ctx.stroke();
      ctx.restore();

      // Body
      const bg=ctx.createRadialGradient(ox-bodyR*.3,oy-bodyR*.25,bodyR*.08,ox,oy,bodyR);
      bg.addColorStop(0,hit?`rgba(255,255,${Math.round(180*hf)},1)`:'#ff9955');
      bg.addColorStop(0.5,hit?`rgba(255,${Math.round(80+120*hf)},20,1)`:'#dd3300');
      bg.addColorStop(1,o.col);
      ctx.fillStyle=bg;ctx.beginPath();ctx.arc(ox,oy,bodyR,0,Math.PI*2);ctx.fill();

      // Concentric inner ring
      ctx.strokeStyle=hit?`rgba(255,240,100,${0.6+hf*0.4})`:`rgba(255,150,60,${0.28+pulse*0.28})`;
      ctx.lineWidth=1.6;
      ctx.beginPath();ctx.arc(ox,oy,bodyR*.62,0,Math.PI*2);ctx.stroke();

      // Outer rim
      ctx.strokeStyle=hit?`rgba(255,255,180,${0.7+hf*0.3})`:'rgba(255,255,255,0.28)';
      ctx.lineWidth=2;ctx.beginPath();ctx.arc(ox,oy,bodyR,0,Math.PI*2);ctx.stroke();

      // Spike tick-marks around the edge — spin faster when hit
      ctx.save();ctx.translate(ox,oy);
      const spikeSpd=hit?frameN*0.09:frameN*0.018;
      ctx.rotate(spikeSpd);
      for(let s=0;s<8;s++){
        const a=s/8*Math.PI*2;
        const r1=bodyR*.76, r2=bodyR*(hit?1.06:0.97);
        ctx.strokeStyle=hit?`rgba(255,250,120,${0.7+hf*0.3})`:`rgba(255,130,60,${0.3+pulse*0.35})`;
        ctx.lineWidth=hit?2.2:1.5;
        ctx.beginPath();ctx.moveTo(Math.cos(a)*r1,Math.sin(a)*r1);ctx.lineTo(Math.cos(a)*r2,Math.sin(a)*r2);ctx.stroke();
      }
      ctx.restore();

      // Highlight
      ctx.fillStyle=hit?`rgba(255,255,220,${0.55+hf*0.35})`:'rgba(255,255,255,0.40)';
      ctx.beginPath();ctx.arc(ox-o.r*.3,oy-o.r*.28,o.r*.23*(1+hf*.3),0,Math.PI*2);ctx.fill();

    }else if(isNeon){
      // Pulsing glow — two layered halos
      const gp=0.5+0.5*Math.sin(frameN*.045+oi*Math.PI); // slower, offset per bumper
      const glowBlur=22+gp*28;
      ctx.save();
      ctx.shadowColor=o.glowCol;ctx.shadowBlur=glowBlur;
      // Outer halo ring
      ctx.strokeStyle=`rgba(255,80,255,${0.25+gp*0.5})`;ctx.lineWidth=3;
      ctx.beginPath();ctx.arc(ox,oy,o.r+4+gp*4,0,Math.PI*2);ctx.stroke();
      // Second tighter ring
      ctx.strokeStyle=`rgba(255,160,255,${0.15+gp*0.35})`;ctx.lineWidth=1.5;
      ctx.beginPath();ctx.arc(ox,oy,o.r+9+gp*6,0,Math.PI*2);ctx.stroke();
      ctx.restore();

      // Body
      const bg=ctx.createRadialGradient(ox,oy,0,ox,oy,o.r);
      bg.addColorStop(0,`rgba(220,80,255,${0.6+gp*0.4})`);
      bg.addColorStop(1,o.col);
      ctx.fillStyle=bg;
      ctx.beginPath();ctx.arc(ox,oy,o.r,0,Math.PI*2);ctx.fill();

      // Spinning asterisk inside — 4 arms, slow rotation, each bumper spins opposite
      ctx.save();
      ctx.translate(ox,oy);
      const spinAngle=frameN*0.018*(oi%2===0?1:-1);
      ctx.rotate(spinAngle);
      ctx.strokeStyle=`rgba(255,220,255,${0.55+gp*0.45})`;ctx.lineWidth=2;
      ctx.save();ctx.shadowColor='rgba(255,100,255,0.9)';ctx.shadowBlur=10;
      for(let arm=0;arm<4;arm++){
        const a=arm/4*Math.PI*2;
        ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(Math.cos(a)*o.r*.72,Math.sin(a)*o.r*.72);ctx.stroke();
      }
      ctx.restore();
      // Spinning arc segments between arms
      ctx.strokeStyle=`rgba(200,100,255,${0.3+gp*0.3})`;ctx.lineWidth=1.5;
      for(let seg=0;seg<4;seg++){
        const a=seg/4*Math.PI*2+Math.PI/4;
        ctx.beginPath();ctx.arc(0,0,o.r*.5,a,a+Math.PI*.38);ctx.stroke();
      }
      ctx.restore();

      // Rim
      ctx.strokeStyle=`rgba(255,200,255,${0.35+gp*0.35})`;ctx.lineWidth=2;
      ctx.beginPath();ctx.arc(ox,oy,o.r,0,Math.PI*2);ctx.stroke();

    }else{
      // Standard obstacle drawing for all other stages
      ctx.save();
      ctx.shadowColor=o.glowCol;ctx.shadowBlur=18+pulse*12;
      ctx.strokeStyle=o.glowCol;ctx.lineWidth=3;
      ctx.beginPath();ctx.arc(ox,oy,o.r+3,0,Math.PI*2);ctx.stroke();
      ctx.restore();
      const bg=ctx.createRadialGradient(ox-o.r*.3,oy-o.r*.3,o.r*.1,ox,oy,o.r);
      bg.addColorStop(0,o.ltCol);bg.addColorStop(1,o.col);
      ctx.fillStyle=bg;
      ctx.beginPath();ctx.arc(ox,oy,o.r,0,Math.PI*2);ctx.fill();
      ctx.strokeStyle='rgba(255,255,255,0.28)';ctx.lineWidth=2;
      ctx.beginPath();ctx.arc(ox,oy,o.r,0,Math.PI*2);ctx.stroke();
      ctx.fillStyle='rgba(255,255,255,0.45)';
      ctx.beginPath();ctx.arc(ox-o.r*.28,oy-o.r*.28,o.r*.25,0,Math.PI*2);ctx.fill();
    }
  }
}

// ── Physics: pyramid (rotating AABB) collision ───────────────────────
function hitPyramidObstacle(o,p){
  const cx=BW+o.rx*(W-BW*2), cy=BW+o.ry*(H-BW*2);
  const angle=arcticAngle*(o.rotSpeed||0.65);
  const s=o.size;
  // Transform puck into pyramid local space
  const dx=p.x-cx, dy=p.y-cy;
  const cosA=Math.cos(-angle), sinA=Math.sin(-angle);
  const lx=dx*cosA-dy*sinA, ly=dx*sinA+dy*cosA;
  // Nearest point on AABB [-s,s]²
  const clampX=Math.max(-s,Math.min(s,lx));
  const clampY=Math.max(-s,Math.min(s,ly));
  const edx=lx-clampX, edy=ly-clampY;
  const dist=Math.hypot(edx,edy);
  if(dist>=PUCK_R)return;
  let nnx,nny;
  if(dist<0.01){
    // Puck centre inside square — push through nearest face
    const gX=s-Math.abs(lx), gY=s-Math.abs(ly);
    if(gX<gY){nnx=lx>=0?1:-1;nny=0;}else{nnx=0;nny=ly>=0?1:-1;}
  }else{nnx=edx/dist;nny=edy/dist;}
  // World-space normal
  const cosB=Math.cos(angle), sinB=Math.sin(angle);
  const wnx=nnx*cosB-nny*sinB, wny=nnx*sinB+nny*cosB;
  // Only resolve if puck is moving into the surface
  const dot=p.vx*wnx+p.vy*wny;
  if(dot>0)return;
  // Push puck to surface
  const nLx=clampX+nnx*(PUCK_R+1), nLy=clampY+nny*(PUCK_R+1);
  p.x=cx+nLx*cosB-nLy*sinB; p.y=cy+nLx*sinB+nLy*cosB;
  // Reflect velocity
  p.vx-=2*dot*wnx; p.vy-=2*dot*wny;
  const spd=Math.hypot(p.vx,p.vy);
  if(spd>0.1){const ang=Math.atan2(p.vy,p.vx)+(Math.random()*2-1)*.10;p.vx=Math.cos(ang)*spd;p.vy=Math.sin(ang)*spd;}
  p.spinV=(Math.random()*2-1)*.4;
  burst(p.x,p.y,'#d4a840',9);addShake(1.4);playWall();
}

// ── Physics: turntable (pass-through spin deflection) ─────────────────
function hitTurntable(o,p){
  const cx=BW+o.rx*(W-BW*2), cy=BW+o.ry*(H-BW*2);
  if(Math.hypot(p.x-cx,p.y-cy)>=o.r)return;
  // Rotate velocity vector by omega each frame while puck is inside
  const omega=(o.omega||0.038)*(o.spinDir||1);
  const ca=Math.cos(omega),sa=Math.sin(omega);
  const vx2=p.vx*ca-p.vy*sa;
  const vy2=p.vx*sa+p.vy*ca;
  p.vx=vx2;p.vy=vy2;
}

// ── Physics: triangle (rotating equilateral) collision ───────────────
function hitTriangleObstacle(o,p){
  const cx=BW+o.rx*(W-BW*2), cy=BW+o.ry*(H-BW*2);
  const angle=arcticAngle*(o.rotSpeed||0.3);
  const R=triRadius(o);
  // Transform puck into triangle local space
  const dx=p.x-cx, dy=p.y-cy;
  const cosA=Math.cos(-angle), sinA=Math.sin(-angle);
  const lx=dx*cosA-dy*sinA, ly=dx*sinA+dy*cosA;
  // Equilateral triangle vertices: tip up, CW winding in screen space
  const V=[];
  for(let i=0;i<3;i++){const a=-Math.PI/2+i*Math.PI*2/3;V.push([R*Math.cos(a),R*Math.sin(a)]);}
  // Quick bounding circle cull
  if(Math.hypot(lx,ly)>R+PUCK_R)return;
  let inside=true;
  let minDepth=Infinity,bestNx=1,bestNy=0;
  let closestDist=Infinity,closestPx=0,closestPy=0;
  for(let i=0;i<3;i++){
    const[ax,ay]=V[i],[bx,by]=V[(i+1)%3];
    // Inside test (CW winding in screen coords → inside when cross >= 0)
    const c=(bx-ax)*(ly-ay)-(by-ay)*(lx-ax);
    if(c<0)inside=false;
    // Outward normal for CW winding
    const elen=Math.hypot(bx-ax,by-ay);
    const enx=(by-ay)/elen,eny=-(bx-ax)/elen;
    // Signed depth (positive = puck is inside of this edge)
    const depth=enx*ax+eny*ay-(enx*lx+eny*ly);
    if(depth<minDepth){minDepth=depth;bestNx=enx;bestNy=eny;}
    // Closest point on segment for outside case
    const t2=Math.max(0,Math.min(1,((lx-ax)*(bx-ax)+(ly-ay)*(by-ay))/(elen*elen)));
    const cpx=ax+t2*(bx-ax),cpy=ay+t2*(by-ay);
    const d=Math.hypot(lx-cpx,ly-cpy);
    if(d<closestDist){closestDist=d;closestPx=cpx;closestPy=cpy;}
  }
  let nnx,nny,pushLx,pushLy;
  if(inside){
    // Push out through minimum-depth (nearest) edge
    nnx=bestNx;nny=bestNy;
    const pd=minDepth+PUCK_R+1;
    pushLx=lx+nnx*pd;pushLy=ly+nny*pd;
  }else{
    if(closestDist>=PUCK_R)return;
    if(closestDist<0.01){nnx=1;nny=0;}else{nnx=(lx-closestPx)/closestDist;nny=(ly-closestPy)/closestDist;}
    const pd=PUCK_R-closestDist+1;
    pushLx=lx+nnx*pd;pushLy=ly+nny*pd;
  }
  // World-space normal
  const cosB=Math.cos(angle),sinB=Math.sin(angle);
  const wnx=nnx*cosB-nny*sinB,wny=nnx*sinB+nny*cosB;
  const dot=p.vx*wnx+p.vy*wny;
  if(dot>0)return;
  // Update position
  p.x=cx+pushLx*cosB-pushLy*sinB;p.y=cy+pushLx*sinB+pushLy*cosB;
  // Reflect velocity
  p.vx-=2*dot*wnx;p.vy-=2*dot*wny;
  const spd=Math.hypot(p.vx,p.vy);
  if(spd>0.1){const ang=Math.atan2(p.vy,p.vx)+(Math.random()*2-1)*.10;p.vx=Math.cos(ang)*spd;p.vy=Math.sin(ang)*spd;}
  p.spinV=(Math.random()*2-1)*.4;
  burst(p.x,p.y,'#cc88ff',9);addShake(1.4);playWall();
}

// ── Physics: hexagon obstacle collision ──────────────────────────────
function hitHexObstacle(o,oi,p){
  const{x:cx,y:cy}=obsPos(o,oi);
  const angle=arcticAngle*(o.rotSpeed||0.2);
  const R=o.r;
  const dx=p.x-cx,dy=p.y-cy;
  const cosA=Math.cos(-angle),sinA=Math.sin(-angle);
  const lx=dx*cosA-dy*sinA,ly=dx*sinA+dy*cosA;
  if(Math.hypot(lx,ly)>R+PUCK_R)return;
  const N=6;
  const V=[];
  for(let i=0;i<N;i++){const a=i*Math.PI/3;V.push([R*Math.cos(a),R*Math.sin(a)]);}
  let inside=true;
  let minDepth=Infinity,bestNx=1,bestNy=0;
  let closestDist=Infinity,closestPx=0,closestPy=0;
  for(let i=0;i<N;i++){
    const[ax,ay]=V[i],[bx,by]=V[(i+1)%N];
    const c=(bx-ax)*(ly-ay)-(by-ay)*(lx-ax);
    if(c<0)inside=false;
    const elen=Math.hypot(bx-ax,by-ay);
    const enx=(by-ay)/elen,eny=-(bx-ax)/elen;
    const depth=enx*ax+eny*ay-(enx*lx+eny*ly);
    if(depth<minDepth){minDepth=depth;bestNx=enx;bestNy=eny;}
    const t2=Math.max(0,Math.min(1,((lx-ax)*(bx-ax)+(ly-ay)*(by-ay))/(elen*elen)));
    const cpx=ax+t2*(bx-ax),cpy=ay+t2*(by-ay);
    const d=Math.hypot(lx-cpx,ly-cpy);
    if(d<closestDist){closestDist=d;closestPx=cpx;closestPy=cpy;}
  }
  let nnx,nny,pushLx,pushLy;
  if(inside){
    nnx=bestNx;nny=bestNy;
    const pd=minDepth+PUCK_R+1;
    pushLx=lx+nnx*pd;pushLy=ly+nny*pd;
  }else{
    if(closestDist>=PUCK_R)return;
    if(closestDist<0.01){nnx=1;nny=0;}else{nnx=(lx-closestPx)/closestDist;nny=(ly-closestPy)/closestDist;}
    const pd=PUCK_R-closestDist+1;
    pushLx=lx+nnx*pd;pushLy=ly+nny*pd;
  }
  const cosB=Math.cos(angle),sinB=Math.sin(angle);
  const wnx=nnx*cosB-nny*sinB,wny=nnx*sinB+nny*cosB;
  const dot=p.vx*wnx+p.vy*wny;
  if(dot>0)return;
  p.x=cx+pushLx*cosB-pushLy*sinB;p.y=cy+pushLx*sinB+pushLy*cosB;
  p.vx-=2*dot*wnx;p.vy-=2*dot*wny;
  const spd=Math.hypot(p.vx,p.vy);
  if(spd>0.1){const ang=Math.atan2(p.vy,p.vx)+(Math.random()*2-1)*.09;p.vx=Math.cos(ang)*spd;p.vy=Math.sin(ang)*spd;}
  p.spinV=(Math.random()*2-1)*.4;
  burst(p.x,p.y,o.glowCol||'rgba(255,180,40,0.9)',9);addShake(1.4);playWall();
}

// ── Physics: portal triangle collision ───────────────────────────────
function hitPortalTriangle(o,p){
  const cx=BW+o.rx*(W-BW*2), cy=BW+o.ry*(H-BW*2);
  const angle=arcticAngle*(o.rotSpeed||0.22);
  const R=o.size;
  // Transform puck to local space
  const dx=p.x-cx, dy=p.y-cy;
  const cosA=Math.cos(-angle), sinA=Math.sin(-angle);
  const lx=dx*cosA-dy*sinA, ly=dx*sinA+dy*cosA;
  // Quick bounding circle cull
  if(Math.hypot(lx,ly)>R+PUCK_R)return;
  // Vertices (CW in screen space)
  const V=[];
  for(let i=0;i<3;i++){const a=-Math.PI/2+i*Math.PI*2/3;V.push([R*Math.cos(a),R*Math.sin(a)]);}
  // Find inside/outside and closest edge
  let inside=true;
  let minDepth=Infinity, hitEdge=0;
  let closestDist=Infinity, closestEdge=0, closestPx=0, closestPy=0;
  const EN=[];
  for(let i=0;i<3;i++){
    const[ax,ay]=V[i],[bx,by]=V[(i+1)%3];
    const c=(bx-ax)*(ly-ay)-(by-ay)*(lx-ax);
    if(c<0)inside=false;
    const elen=Math.hypot(bx-ax,by-ay);
    const enx=(by-ay)/elen, eny=-(bx-ax)/elen;
    EN.push([enx,eny]);
    // Depth from this edge (positive = inside)
    const depth=enx*ax+eny*ay-(enx*lx+eny*ly);
    if(depth<minDepth){minDepth=depth;hitEdge=i;}
    // Closest point on segment
    const t2=Math.max(0,Math.min(1,((lx-ax)*(bx-ax)+(ly-ay)*(by-ay))/(elen*elen)));
    const cpx=ax+t2*(bx-ax), cpy=ay+t2*(by-ay);
    const d=Math.hypot(lx-cpx,ly-cpy);
    if(d<closestDist){closestDist=d;closestEdge=i;closestPx=cpx;closestPy=cpy;}
  }
  const cosB=Math.cos(angle), sinB=Math.sin(angle);
  let entryEdge;
  if(inside){
    // Puck center is inside — find which edge it's moving toward
    entryEdge=hitEdge;
    const[enx,eny]=EN[entryEdge];
    const wnx=enx*cosB-eny*sinB, wny=enx*sinB+eny*cosB;
    if(p.vx*wnx+p.vy*wny<=0)return; // not moving outward through this face
  }else{
    if(closestDist>=PUCK_R)return;
    entryEdge=closestEdge;
    // Check puck is approaching (moving toward triangle)
    const nnx=(lx-closestPx)/Math.max(closestDist,0.01);
    const nny=(ly-closestPy)/Math.max(closestDist,0.01);
    const wnx=nnx*cosB-nny*sinB, wny=nnx*sinB+nny*cosB;
    if(p.vx*wnx+p.vy*wny>0)return; // moving away
  }
  // Pick a random exit edge ≠ entry
  const exits=[0,1,2].filter(e=>e!==entryEdge);
  const exitEdge=exits[Math.floor(Math.random()*2)];
  // Exit position: midpoint of exit edge, pushed out by PUCK_R+8
  const[dax,day]=V[exitEdge],[dbx,dby]=V[(exitEdge+1)%3];
  const dMx=(dax+dbx)*0.5, dMy=(day+dby)*0.5;
  const[dnx,dny]=EN[exitEdge];
  const eLx=dMx+dnx*(PUCK_R+8), eLy=dMy+dny*(PUCK_R+8);
  p.x=cx+eLx*cosB-eLy*sinB;
  p.y=cy+eLx*sinB+eLy*cosB;
  // Velocity: outward from exit edge, preserve speed, add slight spread
  const spd=Math.max(Math.hypot(p.vx,p.vy), SPEED_MAX*0.45);
  const worldDnx=dnx*cosB-dny*sinB, worldDny=dnx*sinB+dny*cosB;
  const spread=(Math.random()*2-1)*0.28;
  const exitAng=Math.atan2(worldDny,worldDnx)+spread;
  p.vx=Math.cos(exitAng)*spd; p.vy=Math.sin(exitAng)*spd;
  p.spinV=(Math.random()*2-1)*1.4;
  // Trigger flash on entry and exit edges
  o.portalFlash[entryEdge]=20;
  o.portalFlash[exitEdge]=20;
  burst(p.x,p.y,PORTAL_COLS[exitEdge],14);
  addShake(2.5); playWall();
}

// ── Physics: obstacle (bumper) collision ─────────────────────────────
function hitObstacle(o,oi,p){
  if(o.type==='chicken'&&chickenPhase!=='running')return; // no collision until landed
  if(o.type==='turntable'){hitTurntable(o,p);return;}
  if(o.type==='hex'){hitHexObstacle(o,oi,p);return;}
  if(o.type==='portal_tri'){hitPortalTriangle(o,p);return;}
  if(o.type==='triangle'){hitTriangleObstacle(o,p);return;}
  if(o.type==='pyramid'){hitPyramidObstacle(o,p);return;}
  const{x:ox,y:oy}=obsPos(o,oi);
  const dx=p.x-ox,dy=p.y-oy,dist=Math.hypot(dx,dy),minD=PUCK_R+o.r;
  if(dist>=minD||dist<.1)return;
  const nx=dx/dist,ny=dy/dist;
  p.x=ox+nx*(minD+2);p.y=oy+ny*(minD+2);

  if(o.type==='pinball'){
    // Pop bumper: always blast the puck away at high speed in the outward direction
    const inSpd=Math.hypot(p.vx,p.vy);
    const launchSpd=Math.max(inSpd*1.6, SPEED_MAX*0.82);
    const spread=(Math.random()*2-1)*0.18;
    const ang=Math.atan2(ny,nx)+spread;
    p.vx=Math.cos(ang)*launchSpd; p.vy=Math.sin(ang)*launchSpd;
    p.spinV=(Math.random()*2-1)*1.8;
    o.hitTimer=18;
    burst(ox,oy,'#ff8833',22);burst(ox,oy,'#ffcc44',10);
    addShake(5); playWall(); playWall();
    return;
  }
  if(o.type==='shark'){
    // Shark chomp: blast puck away hard + trigger bite animation
    const inSpd=Math.hypot(p.vx,p.vy);
    const launchSpd=Math.max(inSpd*1.4, SPEED_MAX*0.75);
    const ang=Math.atan2(ny,nx)+(Math.random()*2-1)*0.25;
    p.vx=Math.cos(ang)*launchSpd; p.vy=Math.sin(ang)*launchSpd;
    p.spinV=(Math.random()*2-1)*1.5;
    sharkBiteTimer=24;
    burst(ox,oy,'#ff4444',16);burst(ox,oy,'#88aacc',8);
    addShake(4); playWall();
    return;
  }
  if(o.type==='octopus'){
    // Octopus ink: deflect at wild random angle + release ink cloud
    const spd2=Math.hypot(p.vx,p.vy)*0.85;
    const ang=Math.atan2(ny,nx)+(Math.random()*2-1)*0.8;
    p.vx=Math.cos(ang)*spd2; p.vy=Math.sin(ang)*spd2;
    p.spinV=(Math.random()*2-1)*2.0;
    // Spawn ink cloud blobs that expand and fade
    for(let i=0;i<8;i++){
      const ia=Math.random()*Math.PI*2;
      const iv=1.2+Math.random()*2.5;
      inkClouds.push({x:ox+Math.cos(ia)*8,y:oy+Math.sin(ia)*8,
        vx:Math.cos(ia)*iv,vy:Math.sin(ia)*iv,
        r:10+Math.random()*14,life:1.0,decay:0.008+Math.random()*0.006,
        hue:260+Math.random()*40});
    }
    addShake(2); playWall();
    return;
  }

  const dot=p.vx*nx+p.vy*ny;
  p.vx-=2*dot*nx;p.vy-=2*dot*ny;
  // Slight random angle spread
  const spd=Math.hypot(p.vx,p.vy);
  if(spd>0.1){const ang=Math.atan2(p.vy,p.vx)+(Math.random()*2-1)*0.10;p.vx=Math.cos(ang)*spd;p.vy=Math.sin(ang)*spd;}
  p.spinV=(Math.random()*2-1)*.4;
  burst(p.x,p.y,o.ltCol,9);addShake(1.4);playWall();
}
function octCornerBounce(p){
  const C=STAGES[currentStage].octCut??80;
  if(C<2)return false; // no corners cut yet (rectangle phase)
  const K=2*BW+C, pr2=PUCK_R*Math.SQRT2;
  let bounced=false;
  // For each 45° corner: s = the sum-coordinate; nx,ny = ±1 inward normal direction
  const b45=(s,nx,ny,nearX,nearY)=>{
    if(!nearX||!nearY)return;
    const target=K+pr2;if(s>=target)return;
    p.x+=nx*(target-s)/2; p.y+=ny*(target-s)/2;
    const dot=(p.vx*nx+p.vy*ny)*Math.SQRT2*.5;
    if(dot<0){const ovx=p.vx;p.vx=-p.vy*nx*ny;p.vy=-ovx*nx*ny;bounced=true;}
  };
  const near=PUCK_R+C;
  b45(p.x+p.y,           1, 1, p.x<BW+near,   p.y<BW+near);
  b45((W-p.x)+p.y,      -1, 1, p.x>W-BW-near, p.y<BW+near);
  b45(p.x+(H-p.y),       1,-1, p.x<BW+near,   p.y>H-BW-near);
  b45((W-p.x)+(H-p.y), -1,-1, p.x>W-BW-near, p.y>H-BW-near);
  if(bounced){
    const spd=Math.hypot(p.vx,p.vy);
    if(spd>0.1){const ang=Math.atan2(p.vy,p.vx)+(Math.random()*2-1)*WRAND;p.vx=Math.cos(ang)*spd;p.vy=Math.sin(ang)*spd;}
    p.spinV=(Math.random()*2-1)*.35;
    p.wallHits++;playWall();addShake(1.2);
    if(p.wallHits>=SPLIT_THRESHOLD){addShake(5);return true;}
  }
  return false;
}
function drawBear(bx,by,br){
  ctx.fillStyle=C_BEAR;ctx.beginPath();ctx.arc(bx-br*.62,by-br*.62,br*.38,0,Math.PI*2);ctx.fill();
  ctx.beginPath();ctx.arc(bx+br*.62,by-br*.62,br*.38,0,Math.PI*2);ctx.fill();
  ctx.fillStyle=C_BEARDK;ctx.beginPath();ctx.arc(bx-br*.62,by-br*.62,br*.2,0,Math.PI*2);ctx.fill();
  ctx.beginPath();ctx.arc(bx+br*.62,by-br*.62,br*.2,0,Math.PI*2);ctx.fill();
  const g=ctx.createRadialGradient(bx-br*.2,by-br*.2,br*.05,bx,by,br);g.addColorStop(0,'#b07848');g.addColorStop(1,C_BEAR);
  ctx.fillStyle=g;ctx.beginPath();ctx.arc(bx,by,br,0,Math.PI*2);ctx.fill();
  ctx.fillStyle=C_CAPYNOSE;ctx.beginPath();ctx.ellipse(bx,by+br*.22,br*.45,br*.32,0,0,Math.PI*2);ctx.fill();
  ctx.fillStyle=C_OUTLINE;ctx.beginPath();ctx.arc(bx-br*.35,by-br*.12,br*.13,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.arc(bx+br*.35,by-br*.12,br*.13,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(bx-br*.3,by-br*.17,br*.055,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.arc(bx+br*.4,by-br*.17,br*.055,0,Math.PI*2);ctx.fill();
  ctx.fillStyle=C_BEARDK;ctx.beginPath();ctx.ellipse(bx,by+br*.18,br*.14,br*.09,0,0,Math.PI*2);ctx.fill();
}

