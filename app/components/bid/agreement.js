import React from 'react';

export default class agreementPopup extends React.Component {
  remove(){
    if(this.props.closeDialog && typeof this.props.closeDialog ==='function'){
      this.props.closeDialog();
    }
  }

  render(){
    return (
      <div className={this.props.show ? 'agreementPopup' :'agreementPopup display'}>
        <div className="agreementMain">
          <ul className="agreementList">
            <li>
              <a href="/agreement/sgreement">天天聚服务协议</a>
            </li>
            <li>
              <a href="/agreement/sonline">建信基金管理公司网上交易协议</a>
            </li>
          </ul>
          <div className="btn_cancel" onTouchEnd={this.remove.bind(this)}>取消</div>
        </div>
      </div>
    )
  }

}




