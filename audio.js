// ── Audio ─────────────────────────────────────────────────────────────
let _ac=null;
function getAC(){if(!_ac)try{_ac=new(window.AudioContext||window.webkitAudioContext)();}catch(e){}return _ac;}
function playTone(freq,dur,vol=0.25,type='sine'){const ac=getAC();if(!ac)return;const o=ac.createOscillator(),g=ac.createGain();o.connect(g);g.connect(ac.destination);o.type=type;o.frequency.setValueAtTime(freq,ac.currentTime);o.frequency.exponentialRampToValueAtTime(freq*0.6,ac.currentTime+dur);g.gain.setValueAtTime(vol,ac.currentTime);g.gain.exponentialRampToValueAtTime(0.001,ac.currentTime+dur);o.start();o.stop(ac.currentTime+dur);}
function playHit(){playTone(380+Math.random()*120,0.12,0.2,'square');}
function playWall(){playTone(160+Math.random()*60,0.1,0.12,'sawtooth');}
function playGoal(){const ac=getAC();if(!ac)return;[523,659,784,1047].forEach((f,i)=>{const o=ac.createOscillator(),g=ac.createGain();o.connect(g);g.connect(ac.destination);o.frequency.setValueAtTime(f,ac.currentTime+i*.1);g.gain.setValueAtTime(0.28,ac.currentTime+i*.1);g.gain.exponentialRampToValueAtTime(0.001,ac.currentTime+i*.1+0.22);o.start(ac.currentTime+i*.1);o.stop(ac.currentTime+i*.1+0.25);});}
