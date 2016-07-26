import React from 'react';
import DataFormat from '../helper/dataformat';
import TapAble from 'react-tappable';

export default class item extends React.Component {
  state={
    
  }
  gotoPage(){
    window.location = this.props.data.content.news_item[0].url;
  }
  render(){
    console.log(this.props.data)
    return (
      <TapAble onTap={this.gotoPage.bind(this)}>
        <div className={this.props.data.content.news_item[0].thumb_media_id ? "hide" : "sucai-img"}>
          <img src={'http://7xskmo.com1.z0.glb.clouddn.com/' + this.props.data.content.news_item[0].thumb_media_id + '.jpg'} />
        </div>
        <div className="sucai-content">
          <div className="sucai-title">
            {this.props.data.content.news_item[0].title}
          </div>
          <div className="sucai-message">
            {this.props.data.content.news_item[0].digest}
          </div>
        </div>
      </TapAble>
    )
  }

}




