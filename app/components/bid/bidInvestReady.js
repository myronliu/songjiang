import React from 'react';
import ApiStore from '../../stores/apistore';
import ApiAction from '../../actions/apiaction';
import UrlConfig from '../../config/urlconfig';
// import BasePage from '../BasePage.js';


export default class BidInvestReady extends React.Component {
  constructor(props) {
    super(props);

    this.state ={
      realName:false,
      addBank:false,
      openTTJ:false
    };

    this.closeDailog = this.closeDailog.bind(this);
  };

  componentWillMount(){
    var data=this.props.data;
    if(data && data.body && data.body.userStatus){
      if(data.body.userStatus.isRealName===1){
        this.setState({realName:true});
      }
      if(data.body.userStatus.bankcardCount >0){
        this.setState({addBank:true});
      }
      if(data.body.userStatus.isOpenTtj===1){
        this.setState({openTTJ:true});
      }
    }
  }

  open(){
    if(!this.state.realName){
      window.to('/bid/nameauth?bidId=' + this.props.bidId);
    }else if(!this.state.addBank){
      window.to('/bid/bindcard?bidId=' + this.props.bidId);
    }else if(!this.state.openTTJ){
      if(this.props.openTTJ && typeof this.props.openTTJ ==='function'){
        this.props.openTTJ();
      }
      
    }
  }
  closeDailog(){
    console.log(11111);
    if(this.props.closeDialog && typeof this.props.closeDialog ==='function'){
      this.props.closeDialog();
    }
  }

  showAgreement(){
    if(this.props.showAgreement && typeof this.props.showAgreement ==='function'){
      this.props.showAgreement();
    }
    
  }

  render(){
    return (
      <div className={this.props.showDialog ? 'bidInvestReady' :'bidInvestReady display'}>
        <div className="readyMain">
          <div className="title">
            <span className="close" onTouchEnd={this.closeDailog.bind(this)}></span>
            <span>完成投资前准备</span>
          </div>
          <div className="readyList">
            <ul className="clearfix">
              <li className={this.state.realName ? "realNameDone" : "realName"}>
                <i></i> 
                <p>实名认证</p>
                <p>{this.state.realName ? "已实名" : "未实名"}</p>
              </li>
              <li className={this.state.addBank ? "addBankDone" : "addBank"}>
                <i></i>
                <p>添加银行卡</p>
                <p>{this.state.addBank ? "已添加" : "未添加"}</p>
              </li>
              <li className={this.state.openTTJ ? "openTTJDone" : "openTTJ"}>
                <i></i>
                <p>开通天天聚</p>
                <p>{this.state.openTTJ ? "已开通" : "未开通"}</p>
              </li>
            </ul>
          </div>
          <div className="btn_ok" onTouchEnd={this.open.bind(this)}>立即进入</div>
          <div className="protocol">
            <span>阅读并同意</span>
            <span onTouchEnd={this.showAgreement.bind(this)}>《服务协议》</span>
          </div>
        </div>
      </div>
    )
  }

}




