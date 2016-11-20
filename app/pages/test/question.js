import Layout from '../../components/layout'
import Toast from '../../helper/toast';
import DataFormat from '../../helper/dataformat';
import Loading from '../../helper/loading';
import BasePage from '../../components/BasePage';
import ReactSwipe from '../../components/swiper/react-swipe';
import HomeBanner from '../../components/HomeBanner';
import BtnItem from '../../components/btnitem';
// import Item from '../../components/item';
import NextButton from '../../components/nextbutton';
import QuestionConfig from '../../config/questions';
import Result from '../../helper/result';
import TapAble from 'react-tappable';

class Item extends React.Component{

  handleOSAnswer(i){
    this.props.question.checked = i;
    this.props.question.selected = true;
    this.setState({
      check: 1
    })
  }

  renderAnswers(){
    return this.props.question.answers.map(function(item,i){
      return (
        <TapAble key={i} className="answerItem block" onTap={this.handleOSAnswer.bind(this, i)}>
          <input type="radio" checked={this.props.question.checked === i ? "checked" : ""} onChange={this.handleOSAnswer.bind(this, i)} />{item.content}
        </TapAble>
      )
    }.bind(this))
  }

  componentDidMount(){

  }

  render(){
    return (
        <div className="question">
          <div className="content">
            {"第 " + (this.props.index + 1) + " 题(10分)"}
          </div>
          <div className="subject">
            {this.props.question.content}
          </div>
          {this.renderAnswers()}
        </div>
      )
  }
}

export default class RegSucc extends BasePage {
  state = {
    ser: '第 1 题(10分)',
    subject: '问题',
    answers: [
      {
        content: "A.选项"
      },
      {
        content: "B.选项"
      },
      {
        content: "C.选项"
      },
      {
        content: "D.选项"
      }
    ],
    wrongItems: [],
    questionArray: [],
    current: 0,
    btnTitle: "提交",
    resultShow: false,
    fenshu: 20
  };
  componentDidMount(){
    var arr = [];
    var rN = [];
    for(;arr.length<10;){
      var r = Math.round(Math.random() * 89);
      if(arr.indexOf('array') === -1)
      {
        arr.push(QuestionConfig.ag[r]);
        rN.push(r);
      }
    }
    this.setState({
      rN: rN,
      questionArray: arr,
      current: 0,
    })
  }
  showLoading(show) {
   
  }

  handleOSAnswer(item){
    for(var i = 0; i < this.state.answers.length; i++){
      if(this.state.answers[i] === item){
        item.checked = true;
      }else{
        this.state.answers[i].checked = false;
      }
    }
    this.setState({
      answers: this.state.answers
    })
  }
  
  renderAnswers(){
    return this.state.answers.map(function(item,i){
      return (
        <div key={i} className="answerItem" onTouchEnd={this.handleOSAnswer.bind(this, item)}>
          <input type="radio" checked={item.checked ? "checked" : ""} />{item.content}
        </div>
      )
    }.bind(this))
  }

  nextBtnPress(){
    var choosed = false;
    var qtI = 0;

    for(var i = 0; i < this.state.questionArray.length; i++){
      if(this.state.questionArray[i].selected){
        choosed = true;
        if(this.state.questionArray[i].answer != (this.state.questionArray[i].checked+1).toString()){
          this.state.wrongItems.push(this.state.rN[i]);
        }
      }else{
        choosed = false;
        qtI = i + 1;
        break;
      }
    }
    if(choosed){
      this.setState({
        resultShow: true,
        fenshu: (10 - this.state.wrongItems.length) * 10
      })
    }else{
      Toast.show("请填写第" + qtI + "的答案");
    }
  }

  gotoCorrect(){
    window.to("/test/correct?type=" + this.props.type + "&qs=" + this.state.wrongItems.toString(','))
  }

  renderQuestions(){
    return this.state.questionArray.map(function(item, index){
      return <Item key={'question' + index} question={item} index={index}/>
    }.bind(this))
  }

  render() {
    return (          
      <Layout className={'index'} title={this.props.type=="ag" ? '安规知识小测堂（单选）' : '党务知识小测堂（单选）'} isShowHeader={true} >
        <Result result={this.state.fenshu} show={this.state.resultShow} gotoCorrect={this.gotoCorrect.bind(this)} />
        {this.renderQuestions()}
        <div className="button">
          <NextButton title={this.state.btnTitle} onTouchEnd={this.nextBtnPress.bind(this)}></NextButton>
        </div>
      </Layout>
    )
  }
}