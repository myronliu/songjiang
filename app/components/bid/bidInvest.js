import React from 'react';
import Toast from '../../helper/toast';
import KeyBoard from '../keyboard';


export default class BidInvest extends React.Component{

  static propTypes = {
    show:React.PropTypes.bool
  }
  static defaultProps ={
    show : false
  }
  state={
    showKeyboard: true,
    numValue: '',
    investAmount:'',
    getInvestIncome:0,
    couponValue:0,
    minPayment:0,
    isDefault:0,
    lcj:0,
    availAmount:this.props.datas && this.props.datas.bidDetail ? this.props.datas.bidDetail.availAmount :0,
    initInvest:this.props.datas && this.props.datas.bidDetail ? this.props.datas.bidDetail.initInvest :0,
    couponNo:'',
    singleLimit:this.props.datas && this.props.datas.bidDetail ? this.props.datas.bidDetail.singleLimit :0
  }
  componentWillMount(){
    var couponListData=this.props.getAvailableCouponList;
    if(couponListData && couponListData.body){
      couponListData.body.chooseLcj = true;
      if(couponListData.body.couponList && couponListData.body.couponList.length>0){
        //默认选中
        var newArr=couponListData.body.couponList.filter(function(arr){
          if(arr.isDefault===1){
            arr.choose = true;
            //couponListData.body.lcjchoose = false
            return true;
          }
        })

        this.setState({
          couponValue:newArr[0].couponValue ? newArr[0].couponValue :0,
          minPayment:newArr[0].minPayment ? newArr[0].minPayment :0,
          isDefault:newArr[0].isDefault ? newArr[0].isDefault :0,
          couponNo:newArr[0].couponNo ? newArr[0].couponNo :''
        })
        couponListData.body.chooseLcj = false;

      }
      
      this.setState({lcj:couponListData.body.lcj});
    }
  }


  componentWillReceiveProps(nextProps) {
    var couponListData = nextProps.getAvailableCouponList;
    if(couponListData && couponListData.body){
      if(couponListData.body.couponList && couponListData.body.couponList.length>0){
        var newArr=couponListData.body.couponList.filter(function(arr){
          if(arr.isDefault===1){
            arr.choose = true
            return true;
          }
        })
        if(newArr.length > 0){
          this.setState({
            couponValue:newArr[0].couponValue ? newArr[0].couponValue :0,
            minPayment:newArr[0].minPayment ? newArr[0].minPayment :0,
            isDefault:newArr[0].isDefault ? newArr[0].isDefault :0,
            couponNo:newArr[0].couponNo ? newArr[0].couponNo :''
          })
        }else{
          this.setState({
            isDefault:0
          })
        }
      }
    }  
    
  }

  handleAmountChange() {
    if ( !isNaN( parseInt(this.state.numValue) ) ) {
      this.setState({investAmount: parseInt(this.state.numValue)});
      this.getInvestIncoming(parseInt(this.state.numValue));
    }else if (event.target.value === "") {
      this.setState({investAmount: this.state.numValue});
      this.getInvestIncoming(0);
    }
    
  }

  onPreventDefault(event){
    event.preventDefault();
    this.setState({
      showKeyboard: true
    })
  }

  onChooseCoupon(){
    if ( this.props.onShowCoupon && typeof this.props.onShowCoupon === 'function') {
      this.props.onShowCoupon();
    }
  }

  getInvestIncoming(investAmount){ //预期收益
    var incomeAmout=0;
    var data =this.props.datas;
    if(data && data.bidDetail){
      var annualizedRate=data.bidDetail.annualizedRate; //年化收益率
      var daysOfLoan=data.bidDetail.daysOfLoan;  //天
      var lifeOfLoan=data.bidDetail.lifeOfLoan;  //月
      if(data.bidDetail.loanByDay && data.bidDetail.loanByDay.toLowerCase() === 's'){  //按天算
        incomeAmout=(annualizedRate*(daysOfLoan/365)*investAmount).toFixed(2);
      }else{
        incomeAmout=(annualizedRate*(lifeOfLoan/12)*investAmount).toFixed(2);
      }
      this.setState({getInvestIncome:incomeAmout});
    }    
  }

  handleHideFn(){
    if(this.props.onHandleHide && typeof this.props.onHandleHide==='function'){
      this.props.onHandleHide(this.state.investAmount);
    }
  }

  stopPropagationFn(event){
    event.stopPropagation();
  }

  handleAdd(num){
    if(this.state.numValue.length===0){
      this.setState({
        numValue: num
      },function(){
        this.handleAmountChange();
      }) 
    }else if(this.state.numValue.length===1){
      if(this.state.numValue == "0"){
        this.setState({
          numValue: num
        },function(){
          this.handleAmountChange();
        }) 
      }else{
        this.setState({
          numValue: this.state.numValue + num
        },function(){
          this.handleAmountChange();
        }) 
      }
    }else if(this.state.numValue.length <10){
      this.setState({
        numValue: this.state.numValue + num
      },function(){
        this.handleAmountChange();
      }) 
    }
      
  }

  handleDel(){
    if(this.state.numValue.length > 1){
      this.setState({
        numValue: this.state.numValue.substring(0, this.state.numValue.length-1)
      },function(){
        this.handleAmountChange();
      })
    }else if(this.state.numValue.length === 1){
      this.setState({
        numValue: ''
      },function(){
        this.handleAmountChange();
      })
    }
  }

  handleClose(){
    this.setState({
      showKeyboard: false
    })
  }

  render(){
    let showDailog={
      "visibility":"visible"
    }
    let closeDailog={
      "visibility":"hidden"
    }

    let accAmDom='';

    //帐号可用金额
    let accountAmount=this.props.queryUserStatus && this.props.queryUserStatus.body && this.props.queryUserStatus.body.userStatus ? this.props.queryUserStatus.body.userStatus.useableAmount : 0;

    if(this.state.singleLimit >0){
      accAmDom=(<div className="right">
                  <p>单笔限额(元)</p>
                  <p>{this.state.singleLimit}</p>
                </div>);
    }else{
      accAmDom=(<div className="right">
                  <p>账户可用金额(元)</p>
                  <p>{accountAmount}</p>
                </div>);
    }

    let chooseLcj=this.props.getAvailableCouponList && this.props.getAvailableCouponList.body && this.props.getAvailableCouponList.body.chooseLcj ? true : false;

    var couponTips='';
    if(this.state.isDefault === 1){
      couponTips=(<li className="coupon clearfix" onTouchEnd={this.onChooseCoupon.bind(this)}>
                    <span className="i1">优惠抵扣</span>
                    <span className="i2">满{this.state.minPayment}减{this.state.couponValue}</span>
                  </li>);
    }else if(chooseLcj && parseFloat(this.state.lcj)>0){
      couponTips=(<li className="coupon clearfix" onTouchEnd={this.onChooseCoupon.bind(this)}>
                    <span className="i1">优惠抵扣</span>
                    <span className="i2">使用理财金{parseFloat(this.state.lcj).toFixed(2)}元</span>
                  </li>);
    }else{   
      couponTips=(<li className="coupon clearfix" onTouchEnd={this.onChooseCoupon.bind(this)}>
                    <span className="i1">优惠抵扣</span>
                    <span className="i2">暂无优惠可用</span>
                  </li>);
    }
    return (
      <div className="bidInvest" style={this.props.show ? showDailog : closeDailog} onTouchEnd={this.handleHideFn.bind(this)}>
        <div className="btnInvest" onTouchEnd={this.stopPropagationFn}>
          <div className="investTips clearfix">
            <div className="left">
              <p>可投金额(元)</p>
              <p>{this.state.availAmount}</p>
            </div>
            {accAmDom}
          </div>
          <ul className="item">
            {couponTips}
            <li className="income clearfix">
              <span className="i3">产品预期收益</span>
              <span className="i4">{this.state.getInvestIncome}元</span>
            </li>
          </ul>
          <div className="btnStatus5">
            <input  readOnly='readonly' ref="amount2" value={this.state.numValue} type="number" placeholder={this.state.initInvest+"元起投"} onChange={this.handleAmountChange.bind(this)} onFocus={this.onPreventDefault.bind(this)}/>
            <span className="invest" onTouchEnd={this.props.handleInvest}>立即投资</span>
          </div>
          <div className={this.state.showKeyboard ? 'show' : 'hide'}>
            <KeyBoard handleAdd={this.handleAdd.bind(this)} handleDel={this.handleDel.bind(this)} close={this.handleClose.bind(this)} />
          </div>
        </div>

      </div>
    )
  }
}