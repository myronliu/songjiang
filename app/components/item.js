import React from 'react';
import DataFormat from '../helper/dataformat';
import TapAble from 'react-tappable';

export default class item extends React.Component {
  state={
    
  }
  gotoPage(){
    window.location = this.props.data.url;
  }
  render(){
    // console.log(this.props.data)
    return (
      <TapAble onTap={this.gotoPage.bind(this)}>
        <div className={this.props.data.thumb_media_id ? "sucai-img" : "hide"}>
          <img src={'http://7xskmo.com1.z0.glb.clouddn.com/' + this.props.data.thumb_media_id + '.jpg'} />
        </div>
        <div className="sucai-content">
          <div className="sucai-title">
            {this.props.data.title}
          </div>
          <div className="sucai-message">
            {this.props.data.digest}
          </div>
        </div>
      </TapAble>
    )
  }

}




