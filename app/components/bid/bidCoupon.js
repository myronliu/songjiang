export default class BidCoupon extends React.Component {
  state={
    choose:false,
    list: this.props.data && this.props.data.body && this.props.data.body.couponList && this.props.data.body.couponList.length>0 ? this.props.data.body.couponList : [],
    lcjAmount:this.props.data && this.props.data.body && this.props.data.body.lcj ? this.props.data.body.lcj : 0,
    zcLcj:false
  }
  componentWillMount(){
    var detailData=this.props.detailData || {};
    if(detailData.bidDetail && detailData.bidDetail.isFinancing && detailData.bidDetail.isFinancing.toLowerCase()==='s'){
      this.setState({zcLcj:true});
    }
  } 
  chooseFn(item){
    if(item.choose){
      return;
    }
    this.state.list.every(function(i){  //取消所有的选择
      if(!item.choose === true && i.couponNo != item.couponNo){
        i.choose = false;
        i.isDefault = 0;
        this.props.data.body.chooseLcj = false;
      }
      return true;
    }.bind(this))
    item.choose = !item.choose;
    item.isDefault =item.choose ? 1 : 0;
    this.setState({
      list: this.state.list,
      lcjAmount:this.state.lcjAmount,
    })
    if(item.choose || this.state.chooseLcj){
      this.handleClose();
    }
  }

  chooseLcjFn(){
    if(this.props.data.body.chooseLcj){
      return;
    }
    this.props.data.body.chooseLcj = !this.props.data.body.chooseLcj;
    if(!this.state.chooseLcj){
      this.state.list.every(function(i){  //取消所有的选择
        i.choose = false;
        i.isDefault = 0;
        return true;
      })
    }
    this.setState({
      list: this.state.list
    })
    if(this.props.data.body.chooseLcj){
      this.handleClose();
    }
  }
  handleClose(){
    if(this.props.close && typeof this.props.close==='function'){
      this.props.close();
    }
  }
  renderCouponItems(){
    //优惠券
    if(this.state.list.length>0){
      var couponList= this.state.list.map(function(item,index){
      return (
          <li key={index} onTouchEnd={()=>{this.chooseFn(item)}}>
              <div className="couponInfo">
                <p>满{item.minPayment}减{item.couponValue}投资券</p>
                <p>{item.comments}</p>
                <p>有效期至<span>{item.expiredDate}</span></p>
              </div>
              <div className={item.choose ? 'icon choose' : 'icon'}></div>
          </li>
        )
      }.bind(this));

      return(
        <div className="couponList">
            <ul>{couponList}</ul>
        </div>
      )
    }else if(!this.state.zcLcj){
      return(
        <div className="nozcLcj">
          <img src="/images/h5/nozcLcj.jpg" />
          <p>好可怜,这里没有优惠...</p>
        </div>
      )
    }else{
      return(<div></div>)
    } 
  }

  renderLCJDom(){
    //支持理财金
    if(this.state.zcLcj){
      if(this.state.lcjAmount){
        return(
          <div className="lcj" onTouchEnd={this.chooseLcjFn.bind(this)}>
            <div className="lcjAmount">理财金可用<span>{parseFloat(this.state.lcjAmount).toFixed(2)}</span>元</div>
            <div className={this.props.data && this.props.data.body && this.props.data.body.chooseLcj ? 'icon choose' :'icon'}></div>
          </div>
        )
      }else{
        return(
          <div className="lcj l1">
            <div className="lcjAmount">理财金可用<span>{parseFloat(0).toFixed(2)}</span>元</div>
            <div className="icon"></div>
          </div>
        )
      }
    }else{
      return(<div></div>)
    }
    
  }

  render(){
    return (
      <div className={this.props.show ? 'showCouponList' :'showCouponList hideCouponList'}>
        <div className="bidCoupon">
          {this.renderCouponItems()}
          {this.renderLCJDom()}
        </div>
        <div className="bankfooter" onTouchEnd={this.handleClose.bind(this)}>×</div>
      </div>
    )

  }

}




