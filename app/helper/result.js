var React = require('react');

module.exports = React.createClass({
  gotoHome: function(){
    window.to("/test/home")
  },
  render: function(){
    var src = "/images/r1.png";
    var re = parseInt(this.props.result);
    if(re < 90 && re >= 60){
      src = "/images/r2.png";
    }else if(re < 60){
      src = "/images/r3.png";
    }
    return (
      <div className={this.props.show ? "totalDialog" : "display"} onTouchEnd={this.props.onTouchEnd}>
        <div className="total-boxMain">
          <img src={src} />
          {'分数：' + this.props.result}
        </div>
        <div className="total-kuang">
          {
            this.props.result == '100' ? <span></span>
            : <img src="/images/btn1.png" onTouchEnd={this.props.gotoCorrect}/>
          }
          <img src="/images/btn2.png" onTouchEnd={this.gotoHome}/>
        </div>
      </div>
    )
  }
});