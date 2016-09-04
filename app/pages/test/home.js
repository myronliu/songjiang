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
    
  };
  componentWillMount(){
    
  }
  showLoading(show) {
  
  }
  gotoAG(){
    window.to("/test/question?type=ag");
  }
  gotoDW(){
    window.to("/test/question?type=dw");
  }
  render() {
    return (          
      <Layout className={'index'} title={'知识测堂'} isShowHeader={true} >
        <div>
          <img src="/images/test_title.png" style={{width:'100%'}}/>
        </div>
        <div onTouchEnd={this.gotoAG}>
          <img src="/images/test_ag.png" style={{width:'100%'}}/>
        </div>
        <div onTouchEnd={this.gotoDW}>
          <img src="/images/test_dw.png" style={{width:'100%'}}/>
        </div>
      </Layout>
    )
  }
}