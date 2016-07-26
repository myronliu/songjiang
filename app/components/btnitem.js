import React from 'react';
import DataFormat from '../helper/dataformat';
import TapAble from 'react-tappable';

class Item extends React.Component{
  render(){
    return (
      <TapAble className="item" style={this.props.itemStyle} onTap={this.props.handleTouch.bind(this, this.props.data.title)}>
        {this.props.data.title}
      </TapAble>
    )
  }
}

export default class item extends React.Component {
  state={
   
  }
  handleTouch(val){
    this.props.handleTouch(val);
  }
  renderItems(){
    var w = 100/this.props.btnList.length;
    return this.props.btnList.map(function(item, i){
      return(<Item key={i} itemStyle={{width: w+'%'}} className='showMessage' data={item} handleTouch={this.handleTouch.bind(this)}></Item>)
    }.bind(this))
  }
  render(){
    return (
      <div className="btnitem">
        {this.renderItems()}
      </div>
    )
  }

}




