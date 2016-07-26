var Toast  = {};

Toast.show = function(msg, duration){
  duration=isNaN(duration)?2000:duration;
  var m = document.createElement('div');
  var s = document.createElement('div');
  m.style.cssText="width:100%;top:70%;position:fixed;z-index: 999999;";
  s.innerHTML = msg;
  s.style.cssText="width: 80%; padding:0 5px; font-size: 15px; text-align: center; border-radius: 5px; margin:0 auto; color:#fff; font-weight: bold; line-height:40px; background-color:rgba(0,0,0,0.8)";
  m.appendChild(s);
  document.body.appendChild(m);
  setTimeout(function() {
    var d = 0.5;
    m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
    m.style.opacity = '0';
    setTimeout(function() { document.body.removeChild(m) }, d * 1000);
  }, duration);
};

module.exports = Toast;