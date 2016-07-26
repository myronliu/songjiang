import React from 'react';

export default class DownLoad extends React.Component {
  download(){
    window.to('http://a.app.qq.com/o/simple.jsp?pkgname=com.haier.hairy');
  }
  render(){
    return (
      <div className="downLoadPage">
      	<div className="bg">
      		<img src="/images/h5/downloadBg.png" />
      	</div>
      	<div className="down clearfix">
          <i></i>
          <div onTouchEnd={this.download}>下载海融易客户端</div>
        </div>
      </div>
    )
  }

}