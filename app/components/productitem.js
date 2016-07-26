import React from 'react';
import Item from './item';

export default class productItem extends React.Component {
  state={
    progress:'',
    initInvest:'',
    annualizedRate:'',
    investPeriod:'',
    availAmount:'',
    bidTitle:''
  }
  remove(){
    this.setState({show:false});
  }

  render(){
    var recommendedLists = this.props.recommendedList.map(function(item, index) {
      return (
        <Item key={index} bidId={item.bidId} bidTitle={item.bidTitle} bidLabelList={item.bidLabelList || []} annualizedRate={item.annualizedRate} investPeriod={item.investPeriod} availAmount={item.availAmount} initInvest={item.initInvest} progress={item.progress}/>
      );
    });

    return (
      <div>
      {recommendedLists}
      </div>
    );
   
  }

}




