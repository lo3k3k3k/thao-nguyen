// simple confetti canvas + interactions
const confettiCanvas = document.getElementById('confetti');
const ctx = confettiCanvas.getContext('2d');
let W = confettiCanvas.width = window.innerWidth;
let H = confettiCanvas.height = window.innerHeight;
const confetti = [];

function rand(a,b){return Math.random()(b-a)+a}

class Piece {
  constructor(){
    this.x = rand(0,W);
    this.y = rand(-H,0);
    this.size = rand(6,14);
    this.color = ['#ff6b9a','#ffd166','#6ee7b7','#9ad0ff'][Math.floor(rand(0,4))];
    this.tilt = rand(-0.1,0.1);
    this.speed = rand(1,4);
    this.rotation = rand(0,Math.PI2);
    this.angular = rand(-0.05,0.05);
  }
  update(){
    this.y += this.speed;
    this.x += Math.sin(this.y/20) * 0.6;
    this.rotation += this.angular;
    if(this.y>H+20){ this.y = rand(-200,-50); this.x = rand(0,W) }
  }
  draw(){
    ctx.save();
    ctx.translate(this.x,this.y);
    ctx.rotate(this.rotation);
    ctx.fillStyle = this.color;
    ctx.fillRect(-this.size/2, -this.size/2, this.size, this.size*0.6);
    ctx.restore();
  }
}

function initConfetti(n=80){
  confetti.length=0;
  for(let i=0;i<n;i++) confetti.push(new Piece());
}
function resize(){
  W = confettiCanvas.width = window.innerWidth;
  H = confettiCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);

function loop(){
  ctx.clearRect(0,0,W,H);
  for(let p of confetti){ p.update(); p.draw(); }
  requestAnimationFrame(loop);
}
initConfetti(100);
loop();

// UI interactions
const wishBtn = document.getElementById('wishBtn');
const messageBox = document.getElementById('message');
const sendBtn = document.getElementById('sendBtn');
const nameInput = document.getElementById('nameInput');
const toast = document.getElementById('toast');

wishBtn.addEventListener('click', ()=> {
  messageBox.hidden = !messageBox.hidden;
});

sendBtn.addEventListener('click', ()=> {
  const name = nameInput.value.trim() || 'người thân';
  showToast(Đã gửi lời chúc đến ${thaonguyen}! ❤️);
  // small confetti burst
  burstConfetti(200);
});

function showToast(txt, time=2600){
  toast.textContent = txt;
  toast.classList.add('show');
  setTimeout(()=> toast.classList.remove('show'), time);
}

// quick burst: add more pieces momentarily
function burstConfetti(count=80){
  for(let i=0;i<count;i++){
    const p = new Piece();
    p.x = window.innerWidth/2 + rand(-200,200);
    p.y = window.innerHeight/2 + rand(-200,200);
    p.speed = rand(2,8);
    confetti.push(p);
  }
  // auto trim to keep performant
  setTimeout(()=> { if(confetti.length>220) confetti.splice(0, confetti.length-220) }, 2500);
