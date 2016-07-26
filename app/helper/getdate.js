module.exports ={
  getDateYMD:function(){
    var date=new Date();
    var year=date.getFullYear(),
        month=date.getMonth()+1,
        day=date.getDate(),
        today;
    if(month<10){
        month='0'+month;
    }
    if(day<10){
        day='0'+day;
    }
    today = year + '-' + month + '-' + day;                
    return today;
  }
}

