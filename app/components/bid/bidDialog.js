
export default class BidDialog extends React.Component {

  handleClose(){
    if(this.props.close && typeof this.props.close === 'function') {
      this.props.close();
    }
  }
  payBtnFn(){
    if(this.props.bidDialogBtn && typeof this.props.bidDialogBtn ==='function'){
      this.props.bidDialogBtn();
    }
  }

  render(){
    var title='';
    if(this.props.bidDialogTips){
      title=this.props.bidDialogTips.title ? (<p>无法使用理财金</p>) :''; 
    }
    return (
      <div className={this.props.show ? 'bidlcjDialog' : 'display'}>
        <div className="boxMain">
          {title}
          <p>{this.props.bidDialogTips.content ? this.props.bidDialogTips.content : ''}</p>
          <ul>
            <li onTouchEnd={this.handleClose.bind(this)}>{this.props.bidDialogTips.btn1 ? this.props.bidDialogTips.btn1 : ''}</li>
            <li onTouchEnd={this.payBtnFn.bind(this)}>{this.props.bidDialogTips.btn2 ? this.props.bidDialogTips.btn2 : ''}</li>
          </ul>
        </div>
      </div>
    )

  }

}




