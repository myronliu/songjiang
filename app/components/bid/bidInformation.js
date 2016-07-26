import React from 'react';
import WebConfig from '../../config/WebUrl';

export default class BidInformation extends React.Component {
  state={
    enterpriseName:'无', //融资方
    registDay:'无', //注册年份
    registCapital:'无', //注册资金
    credit:'无',//征信记录
    industry:'无',//所属行业
    financiersProfile:'', //融资方简介  海赚
    bidTagType:'', //标的类型
    acceptanceInstitution:'',
    qiniuUrl:{}  //图片
  };
  componentWillMount(){
    var data=this.props.datas;

    this.setState({
      enterpriseName:data && data.borrowerInfo ? this.getString(data.borrowerInfo.enterpriseName) :'无',
      registDay:data && data.borrowerInfo ? data.borrowerInfo.registDay :'无',
      registCapital:data && data.borrowerInfo ? data.borrowerInfo.registCapital:'无',
      credit:data && data.borrowerInfo ? data.borrowerInfo.credit:'无',
      industry:data && data.borrowerInfo ? data.borrowerInfo.industry:'无',
      financiersProfile:data && data.bidDetail ? data.bidDetail.financiersProfile : '',
      bidTagType:data && data.bidDetail ? data.bidDetail.bidTagType : '',
      acceptanceInstitution:data && data.bidDetail ? data.bidDetail.acceptanceInstitution : '',
      qiniuUrl:data && data.rcMeasures ? data.rcMeasures : ''
    })
  }

  getString(str){
    if(!str){
      return null;
    }
    return str.substring(0,1) + '***' + str.substring(str.length-1)  
  }

  bidTypeProductInfoDom(bidTagType){
    if(!bidTagType){
      return null;
    }
    var productInfoDom='';
    if(bidTagType==='XJL' || bidTagType==='RYF'){ //小金链,融易发
      productInfoDom=(<div>
                        <div className="title">融资方简介</div>
                        <div className="content clearfix">
                          <div className="left">
                            <p>
                              <span>融资方</span>
                              <span>{this.state.enterpriseName}</span>
                            </p>
                            <p>
                              <span>注册资金</span>
                              <span><span>{this.state.registCapital}</span>万元</span>
                            </p>
                            <p>
                              <span>征信记录</span>
                              <span>{this.state.credit}</span>
                            </p>
                          </div>
                          <div className="right">
                            <p>
                              <span>注册年限</span>
                              <span>{this.state.registDay}</span>
                            </p>
                            <p>
                              <span>所属行业</span>
                              <span>{this.state.industry}</span>
                            </p>
                          </div>
                        </div>
                      </div>);
    
    }else if(bidTagType==='HZ'){ //海赚
      if(this.state.financiersProfile){
        productInfoDom=(
          <div>
            <div className="title">融资方简介</div>
            <div className="info"><div dangerouslySetInnerHTML={{__html: this.state.financiersProfile}} ></div></div>
          </div>
        );
      }
    }else if(bidTagType==='XJP'){ //小金票
      productInfoDom=(
          <div>
            <div className="title">承兑机构简介</div>
            <div className="info">{this.state.acceptanceInstitution}</div>
          </div>
      );
    }
    return productInfoDom;
  }

  render(){
    //融资方证照
    if(this.state.qiniuUrl && this.state.qiniuUrl.photoOfIdentity && this.state.qiniuUrl.photoOfIdentity.length>0){
      var photo=this.state.qiniuUrl.photoOfIdentity.map(function(item,i){
        return(
          <div className="image" key={i}>
            <img src={this.props.qiniuUrl+item.qiniuUrl} />
          </div>
        )
      }.bind(this));

      var photoDom=(
        <div className="box">
          <div className="title">融资方证照</div>
          {photo}
        </div>
      )
    }

    return (
      <div className="bidInformation">
        <div className="itemTitle">
          <i></i>
          融资方信息
        </div>
        <div className="main">
          <div className="box">
            {this.bidTypeProductInfoDom(this.state.bidTagType)}
          </div>
          {photoDom}
        </div>
      </div>
    )
  }

}




