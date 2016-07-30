import Layout from '../../components/layout'
import Toast from '../../helper/toast';
import DataFormat from '../../helper/dataformat';
import Loading from '../../helper/loading';
import BasePage from '../../components/BasePage';
import ReactSwipe from '../../components/swiper/react-swipe';
import HomeBanner from '../../components/HomeBanner';
import BtnItem from '../../components/btnitem';
import Item from '../../components/item';

export default class RegSucc extends BasePage {
  state = {
    btnList:[{
      title: '本月资讯',
      select: true
    },{
      title: '往期回顾'
    }],
    list: this.props.data.listNow || []
  };
  componentWillMount(){
    
  }
  showLoading(show) {
    this.setState({
      showLoading: show
    })
  }
  handleTouch(val){
    if(val === "本月资讯"){
      this.state.btnList[0].select = true;
      this.state.btnList[1].select = false;
      this.setState({
        list: this.props.data.listNow,
      })
    }else if(val === "往期回顾"){
      this.state.btnList[0].select = false;
      this.state.btnList[1].select = true;
      this.setState({
        list: this.props.data.listPast
      })
    }
  }
  renderBanner(){
    if(this.props.data&&this.props.data.topBanners){
      let count=this.props.data.topBanners.length;
      if(!process.browser&&count>0){
        let item=this.props.data.topBanners[0];
        return <HomeBanner data={item} count={count}/>
      }else{
        return this.props.data.topBanners.map(function(item,i){
          return <HomeBanner key={i} data={item} count={count}/>
        }.bind(this));
      }
    }
  }
  rendScrolBanner(){
    if(this.props.data&&this.props.data.topBanners){
      return <ReactSwipe continuous={true} speed={400} auto={2000}> 
        {this.renderBanner()}</ReactSwipe>
    }
  }
  renderList(){
    if(this.state.list){
      return this.state.list.map(function(item, i){
      console.log(item)
        return (
          <div key={i} className="sucai-item">
            <Item data={item} />
          </div>
        )
      })
    }
  }
  render() {
    return (          
      <Layout className={'index'} title={'首页'} isShowHeader={false} >
        {this.rendScrolBanner()}
        <BtnItem btnList={this.state.btnList} handleTouch={this.handleTouch.bind(this)}/>
        <div className='sucai'>
          {this.renderList()}
        </div>
      </Layout>
    )
  }
}