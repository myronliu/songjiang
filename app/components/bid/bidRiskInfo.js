import React from 'react';
import WebConfig from '../../config/WebUrl';

export default class BidRiskInfo extends React.Component {
  state={
    rcMeasures:{}//风险信息
  }
  componentWillMount(){
    var data=this.props.datas;
    this.setState({
      rcMeasures:data && data.rcMeasures ? data.rcMeasures : ''
    })
  }
  render(){
    //资产安全
    var items = [];
    if(this.state.rcMeasures && this.state.rcMeasures.capitalSecurity){
      var i=0;
      for(var key in this.state.rcMeasures.capitalSecurity){
        var item=(<p key={i}><span dangerouslySetInnerHTML={{__html: this.state.rcMeasures.capitalSecurity[key]}} ></span></p>);
        items.push(item);
      }      
    }

    //融资方照片
    if(this.state.rcMeasures && this.state.rcMeasures.photoOfRc && this.state.rcMeasures.photoOfRc.length>0){
      var photo=this.state.rcMeasures.photoOfRc.map(function(item,i){
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
      <div className="bidRiskInfo">
        <div className="itemTitle">
          <i></i>
          风险措施
        </div>
        <div className="main">
          <div className="box">
            <div className="title">资产安全</div>
            <div>
             {items}
            </div>
          </div>
          {photoDom}
        </div>
      </div>
    )
  }

}




