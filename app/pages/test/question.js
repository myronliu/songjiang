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
    wrongItems: [],
    questionArray: [],
    current: 0,
    btnTitle: "下一题",
    resultShow: false,
    fenshu: 20
  };
  componentDidMount(){
    var arr = [];
    for(;arr.length<10;){
      var r = Math.round(Math.random() * 89);
      if(arr.indexOf('array') === -1)
      {
        arr.push(r);
      }
    }
    this.setState({
      questionArray: arr,
      current: 0,
      subject: QuestionConfig.ag[arr[0]].content,
      answers: QuestionConfig.ag[arr[0]].answers,
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

    for(var i = 0; i < this.state.answers.length; i++){
      if(this.state.answers[i].checked){
        choosed = true;
        if(QuestionConfig.ag[this.state.questionArray[this.state.current]].answer != (i + 1).toString()){
          this.state.wrongItems.push(this.state.questionArray[this.state.current]);
        }
      }
    }
    if(choosed){
      if(this.state.current < 9){
        var current = this.state.current + 1;
        this.setState({
          current: current,
          subject: QuestionConfig.ag[this.state.questionArray[current]].content,
          answers: QuestionConfig.ag[this.state.questionArray[current]].answers,
          btnTitle: current < 9 ? "下一题" : "提交",
          ser: "第 " + (current + 1) + " 题(10分)"
        })
      }else{
        this.setState({
          resultShow: true,
          fenshu: (10 - this.state.wrongItems.length) * 10
        })
      }
    }else{
      Toast.show("请填写答案")
    }
  }

  gotoCorrect(){
    window.to("/test/correct?type=" + this.props.type + "&qs=" + this.state.wrongItems.toString(','))
  }

  render() {
    return (          
      <Layout className={'index'} title={this.props.type=="ag" ? '安规知识小测堂（单选）' : '党务知识小测堂（单选）'} isShowHeader={true} >
        <Result result={this.state.fenshu} show={this.state.resultShow} gotoCorrect={this.gotoCorrect.bind(this)} />
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