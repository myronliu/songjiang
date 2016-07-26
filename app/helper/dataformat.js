var DataFormat  = {};

DataFormat.formatMoney = function(s, n){
  n = n > 0 && n <= 20 ? n : 2;  
  s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";  
  var l = s.split(".")[0].split("").reverse();
  var r = s.split(".")[1];  
  var t = "";  
  for (var i = 0; i < l.length; i++) {  
      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");  
  }  
  return t.split("").reverse().join("") + "." + r;  
};

DataFormat.formatCount = function(s){
  s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(0) + "";  
  var l = s.split(".")[0].split("").reverse();  
  var t = "";  
  for (var i = 0; i < l.length; i++) {  
      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");  
  }  
  return t.split("").reverse().join("");  
};

DataFormat.formatInt = function(s){
  return parseInt(parseFloat(s));
}

DataFormat.formatAmount = function(s){
  s = parseFloat(s);
  return{
    y:parseInt(s/100000000),
    w:parseInt((s%100000000)/10000)
  }
}

DataFormat.formatWan = function(s){
  s = parseFloat(s);
  return {
    wf:(s/10000).toFixed(2),
    w:parseInt(s/10000),
    g:parseInt(s%10000)
  };
}

module.exports = DataFormat;
