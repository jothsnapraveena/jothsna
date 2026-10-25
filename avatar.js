
(function(){
  var stage = document.getElementById('avatarStage');
  var bubble = document.getElementById('bubble');
  if(!stage) return;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var raf = null, target = {x: 0, y: 0};

  function track(clientX, clientY){
    var r = stage.getBoundingClientRect();
    target.x = (clientX - (r.left + r.width/2)) / r.width;
    target.y = (clientY - (r.top + r.height/2)) / r.height;
    if(raf) return;
    raf = requestAnimationFrame(function(){
      raf = null;
      var tx = Math.max(-1, Math.min(1, target.x));
      var ty = Math.max(-1, Math.min(1, target.y));
      stage.style.transform = 'translate(' + (tx*12).toFixed(1) + 'px,' + (ty*8).toFixed(1) + 'px) rotate(' + (tx*2.5).toFixed(2) + 'deg)';
    });
  }

  if(!reduceMotion){
    document.addEventListener('mousemove', function(e){ track(e.clientX, e.clientY); });
    document.addEventListener('touchmove', function(e){
      if(e.touches && e.touches[0]) track(e.touches[0].clientX, e.touches[0].clientY);
    }, {passive: true});
  }

  // click the avatar: she talks
  var lines = [
    "Hi, I'm Jothsna! 👀",
    "I build agentic AI platforms, end to end.",
    "Governance → evals → observability. That's my stack.",
    "Ship it or skip it? Every release needs evidence.",
    "I also write @jothsna.aitales — daily, engineer-grade.",
    "Psst — scroll down, the good stuff is below. 👇"
  ];
  var i = 0;
  stage.addEventListener('click', function(){
    i = (i + 1) % lines.length;
    bubble.firstChild.nodeValue = lines[i] + ' ';
    var small = bubble.querySelector('small');
    if(small) small.textContent = 'click again';
  });
})();

