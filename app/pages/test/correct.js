import Layout from '../../components/layout'
import Toast from '../../helper/toast';
import DataFormat from '../../helper/dataformat';
import Loading from '../../helper/loading';
import BasePage from '../../components/BasePage';
import ReactSwipe from '../../components/swiper/react-swipe';
import HomeBanner from '../../components/HomeBanner';
import BtnItem from '../../components/btnitem';
import Item from '../../components/item';
import NextButton from '../../components/nextbutton';
import QuestionConfig from '../../config/questions';
import Result from '../../helper/result';

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
    btnTitle: "下一题",
  };
  componentDidMount(){
    var arr = this.props.qs.split(',');
    arr = arr.map(function(item){
      return parseInt(item);
    })
    this.setState({
      questionArray: arr,
      current: 0,
      subject: QuestionConfig.ag[arr[0]].content,
      answers: QuestionConfig.ag[arr[0]].answers,
      correctA: QuestionConfig.ag[arr[0]].answer
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
    if(this.state.current < this.state.questionArray.length-1){
      var current = this.state.current + 1;
      this.setState({
        current: current,
        subject: QuestionConfig.ag[this.state.questionArray[current]].content,
        answers: QuestionConfig.ag[this.state.questionArray[current]].answers,
        correctA: QuestionConfig.ag[this.state.questionArray[current]].answer,
        btnTitle: current < this.state.questionArray.length-1 ? "下一题" : "返回",
        ser: "第 " + (current + 1) + " 题(10分)"
      })
    }else{
      window.to('/test/home')
    }
    
  }

  render() {
    return (          
      <Layout className={'index'} title={this.props.type=="ag" ? '安规知识小测堂（单选）' : '党务知识小测堂（单选）'} isShowHeader={true} >
        <div className="question">
          <div className="content">
            {this.state.ser}
          </div>
          <div className="subject">
            {this.state.subject}
          </div>
          {this.renderAnswers()}
          <div className="button">
            <NextButton title={this.state.btnTitle} onTouchEnd={this.nextBtnPress.bind(this)}></NextButton>
          </div>
        </div>
      </Layout>
    )
  }
}