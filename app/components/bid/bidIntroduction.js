import React from 'react';


export default class BidIntroduction extends React.Component {
  state={
    enterpriseName:'', //融资方
    projectArea:'',   //项目区域
    amount:0, //项目规模
    capitalPurpose:'',  //资金用途
    repaymentSource:'' ,//还款来源
    loanDescription:'',//项目描述
    earliestRepaymentDate:'',  //最早还款日期
    fineType:'' ,//剩余利息
    compensateAmount:0 ,//金额,
    prepaymentAllowed:false, //是否允许提前还款,S:是;F:否
    bidTagType:''  //标的类型
    
  }
  componentDidMount(){
    console.log(this.props.datas);
  }
  componentWillMount(){    
    var data=this.props.datas.getAggregatedBidDetail;
    
    var PaymentMethodEnum = {
        "GDJE":"固定金额",
        "SYLX":"剩余利息",
        "SYBJ":"剩余本金"
    }
    this.setState({
      enterpriseName:data && data.borrowerInfo ? this.getString(data.borrowerInfo.enterpriseName) :'',
      projectArea:data && data.bidDetail ? data.bidDetail.projectArea : '',
      amount:data && data.bidDetail ? data.bidDetail.amount : 0,
      capitalPurpose:data && data.bidDetail ? data.bidDetail.capitalPurpose : '',
      repaymentSource:data && data.bidDetail ? data.bidDetail.repaymentSource : '',
      loanDescription:data && data.bidDetail ? data.bidDetail.loanDescription : '',
      earliestRepaymentDate:data && data.bidDetail ? data.bidDetail.earliestRepaymentDate : '',
      fineType:data && data.bidDetail ? PaymentMethodEnum[data.bidDetail.fineType] :'',
      compensateAmount:data && data.bidDetail && data.bidDetail.compensateAmount ? parseFloat(data.bidDetail.compensateAmount*100).toFixed(1) : 0,
      prepaymentAllowed:data && data.bidDetail && data.bidDetail.prepaymentAllowed.toLowerCase()==='s' ? true : false,
      bidTagType:data && data.bidDetail ? data.bidDetail.bidTagType : ''
      
    })
  }
  getString(str){
    if(!str){
      return null;
    }
    return str.substring(0,1) + '***' + str.substring(str.length-1)  
  }
  bidTypeProductDom(bidTagType){
    if(!bidTagType){
      return null;
    }
    var productDom='';
    if(bidTagType==='XJL' || bidTagType==='RYF'){ //小金链,融易发
      productDom=(<div className="box">
                    <div className="title">项目信息</div>
                    <div className="content clearfix">
                      <div className="left">
                        <p>
                          <span>项目区域</span>
                          <span>{this.state.projectArea}</span>
                        </p> 
                      </div>
                      <div className="right">
                        <p>
                          <span>项目规模</span>
                          <span>{this.state.amount}元</span>
                        </p>
                      </div>
                    </div>
                    <div className="boxItem">
                      <p>
                        <span>资金用途</span>
                        <span>{this.state.capitalPurpose}</span>
                      </p>
                      <p>
                        <span>还款来源</span>
                        <span>{this.state.repaymentSource}</span>
                      </p>
                    </div>
                  </div>);
    }else if(bidTagType==='XJP'){//小金票
      productDom=(<div className="box">
                    <div className="title">项目信息</div>
                    <div className="content clearfix">
                      <div className="left">
                        <p>
                          <span>融资方</span>
                          <span>{this.state.enterpriseName}</span>
                        </p>
                        <p>
                          <span>项目规模</span>
                          <span>{this.state.amount}元</span>
                        </p> 
                      </div>
                      <div className="right">
                        <p>
                          <span>项目区域</span>
                          <span>{this.state.projectArea}</span>
                        </p>
                      </div>
                    </div>
                    <div className="boxItem">
                      <p>
                        <span>资金用途</span>
                        <span>{this.state.capitalPurpose}</span>
                      </p>
                      <p>
                        <span>还款来源</span>
                        <span>{this.state.repaymentSource}</span>
                      </p>
                    </div>
                  </div>);
    }
    return productDom;
  }
  render(){
    //浮动还款计划说明
    if(this.state.prepaymentAllowed){
      var returnPlanTips=(<div className="returnPlanTips">
                            <div className="">浮动还款计划说明:</div>
                            <div>
                              <p>本产品<span>{this.state.earliestRepaymentDate}</span>后，允许融资者提前还款</p>
                              <p>提前还款前利息：不变</p>
                              <p>提前还款后利息：{this.state.fineType}的<span>{this.state.compensateAmount}%</span>作为补偿</p>
                              <p>本金范围：不变</p>
                            </div>
                          </div>);
    }

    //还款计划
    var hkjhData=this.props.datas.queryPerfectHkjh;
    var TradeTypes={
      7001:"本金",
      7002:"本息"
    }
    if(hkjhData && hkjhData.hkjh && hkjhData.hkjh.repaymentDetails && hkjhData.hkjh.repaymentDetails.length>0){
      var hkjh=hkjhData.hkjh.repaymentDetails.map(function(item,i){
        return(<tr key={i}>
                <td>{(item.repaymentTime).substring(0,10)}</td>
                <td>{TradeTypes[item.tradeType]}</td>
                <td>{item.amount}</td>
              </tr>);
      });
    }
    
    return (
      <div className="bidIntroduction">
        <div className="itemTitle">
          <i></i>
          项目介绍
        </div>

        <div className="main">

          {this.bidTypeProductDom(this.state.bidTagType)}

          <div className="box">
            <div className="title">项目描述</div>
            <div className="productIntro">
              <div dangerouslySetInnerHTML={{__html: this.state.loanDescription}} ></div>
            </div>
          </div>

          <div className="box">
            <div className="title">还款计划</div>
            <div className="returnPlan">
              <table>
                <thead>
                  <tr>
                    <td>到期还款时间</td>
                    <td>类型</td>
                    <td>还款金额(元)</td>
                  </tr>
                </thead>
                <tbody>
                  {hkjh}
                </tbody>
              </table>
              {returnPlanTips}
            </div>
          </div>

        </div>
      </div>
    )
  }

}




