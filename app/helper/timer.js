var Timer = {};
function toDouble(n){
  return n<10 ? '0'+n : ''+n;
}
Timer.timeFormater = function(lastTime){
  if(!lastTime) return {d: 0, h: 0, m: 0, s: 0};
  var EndTime =new Date(lastTime);//结束日期
  var NowTime = new Date();
  var timer = {};
  var t =EndTime.getTime() - NowTime.getTime();
  timer.d=0;
  timer.h=0;
  timer.m=0;
  timer.s=0;
  if(t>=0){
    timer.d=toDouble(Math.floor(t/1000/60/60/24));
    timer.h=toDouble(Math.floor(t/1000/60/60%24));
    timer.m=toDouble(Math.floor(t/1000/60%60));
    timer.s=toDouble(Math.floor(t/1000%60));
  }
  return timer;
}
module.exports = Timer;