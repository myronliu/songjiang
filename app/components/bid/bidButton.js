import React from 'react';
import Timer from '../../helper/timer';

export default class BidButton extends React.Component {
  static propTypes = {
    buttonStatus:React.PropTypes.number,
    onShow:React.PropTypes.func
  }
  static defaultProps ={
    buttonStatus : 5
  }
  state = {
    timer_d: Timer.timeFormater(this.props.launchDate).d,
    timer_h: Timer.timeFormater(this.props.launchDate).h,
    timer_m: Timer.timeFormater(this.props.launchDate).m,
    timer_s: Timer.timeFormater(this.props.launchDate).s
  }
  componentDidMount(){
    if(this.props.buttonStatus === 2){
      this.timer = setInterval(function(){
        var timer = Timer.timeFormater(this.props.launchDate);
        this.setState({
          timer_d: timer.d,
          timer_h: timer.h,
          timer_m: timer.m,
          timer_s: timer.s
        })
      }.bind(this), 1000);
    }
  }
  componentWillUnmount(){
    if(this.timer){
      clearInterval(this.timer);
    }
  }
  handleShow(event){ 
    if ( this.props.onShowFn && typeof this.props.onShowFn === 'function') {
      this.props.onShowFn();
    }
  }
  btnShow(){
    //未知情况，未登陆状态
    if(!this.props.data || !this.props.data.body || this.props.data.body.isLogin !=1){
      window.to('/login?fromUrl=' + encodeURIComponent(window.location.pathname + window.location.search));
    }else{ 
      if(this.props.onShow && typeof this.props.onShow ==='function'){
        this.props.onShow();
      }
    }
  }
  handleBtnInvest(amount){
    //尾单
    if(this.props.btnInvest && typeof this.props.btnInvest === 'function'){
      this.props.btnInvest(amount);
    }
  }
  render(){
    var launchDate=this.props.launchDate || '';
    var availAmount=this.props.availAmount || 0;
    var initInvest=this.props.initInvest || 0;

    var buttonInvest=(<div />);
    if(this.props.buttonStatus === 1){

      buttonInvest =(<div className="btnStatus1" onTouchEnd={this.btnShow.bind(this)}>立即投资</div>);

    }else if(this.props.buttonStatus === 2){
      buttonInvest =(<div className="btnStatus2">
                      <label>离开抢还剩：</label>
                      <span>{this.state.timer_d}</span>
                      <span>天</span>
                      <span>{this.state.timer_h}</span>
                      <span>时</span>
                      <span>{this.state.timer_m}</span>
                      <span>分</span>
                      <span>{this.state.timer_s}</span>
                      <span>秒</span>
                    </div>);

    } else if(this.props.buttonStatus === 3){

      buttonInvest=(<div className="btnStatus3">抱歉，您不符合新客专享的条件</div>);

    } else if(this.props.buttonStatus === 4){

      buttonInvest=(<div className="btnStatus4">已售罄</div>);

    } else if(this.props.buttonStatus === 5){

      buttonInvest =(<div className="btnStatus5">
                      <input ref="amount1" type="number" readOnly='readonly' placeholder={initInvest+'元起投'} onFocus={this.handleShow.bind(this)} value={this.props.amount}/>
                      <span className="invest" onTouchEnd={this.props.handleInvest}>立即投资</span>
                   </div>);

    } else if(this.props.buttonStatus === 6){

      buttonInvest =(<div className="btnStatus6">
                      <span className="tips">仅剩<span className="tipsColor">{availAmount}元</span>，您需一次全投</span>
                      <span className="invest" onTouchEnd={this.handleBtnInvest(availAmount).bind(this)}>立即投资</span>
                   </div>);

    }
    return (
      <div className="btnInvest">
        {buttonInvest}
      </div>
    )
  }

}




