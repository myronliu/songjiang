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


class Item extends React.Component{

  handleOSAnswer(i){
    
  }

  renderAnswers(){
    return this.props.question.answers.map(function(item,i){
      return (
        <TapAble key={i} className="answerItem block" >
          <input type="radio" checked={this.props.question.answer == (i+1).toString() ? "checked" : ""} disabled />{item.content}
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
    questionArray: [],
    current: 0,
    btnTitle: "返回",
  };
  componentDidMount(){
    var arr = this.props.qs.split(',');
    arr = arr.map(function(item){
      return QuestionConfig.ag[parseInt(item)];
    })
    this.setState({
      questionArray: arr,
      current: 0,
    })
  }
  showLoading(show) {
   
  }

  renderAnswers(){
    return this.state.answers.map(function(item,i){
      return (
        <div key={i} className="answerItem">
          <input type="radio" checked={(i+1).toString() == this.state.correctA ? "checked" : ""} />{item.content}
        </div>
      )
    }.bind(this))
  }

  nextBtnPress(){
    window.to('/test/home')
  }

  renderQuestions(){
    return this.state.questionArray.map(function(item, index){
      return <Item key={'question' + index} question={item} index={index}/>
    }.bind(this))
  }

  render() {
    return (          
      <Layout className={'index'} title={this.props.type=="ag" ? '安规知识小测堂（单选）' : '党务知识小测堂（单选）'} isShowHeader={true} >
        {this.renderQuestions()}
        <div className="button">
          <NextButton title={this.state.btnTitle} onTouchEnd={this.nextBtnPress.bind(this)}></NextButton>
        </div>
      </Layout>
    )
  }
}