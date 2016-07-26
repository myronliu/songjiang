import TapAble from 'react-tappable';
var sty={
  backgroundImage: 'url("http://7xlnmq.com1.z0.glb.clouddn.com/146785614428526886710819713900")',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  width: '100%',
  height: '130px',
  display: 'block',
};
export default class Footer extends React.Component{
  static propTypes = {
    data: React.PropTypes.object
  }
  static defaultProps = {
    data:{}
  }
  nextPage(){
    if(this.props.data.link){
      window.location = this.props.data.link;
    }
  }
  render(){
    let imgStyle={
      width:'100%'
    }
    sty.backgroundImage = 'url(' + 'http://7xskmo.com1.z0.glb.clouddn.com/' + this.props.data.content.news_item[0].thumb_media_id + '.jpg' + ')'
    return (
      <div className='swiper_div'>
        <TapAble onTap={this.nextPage.bind(this)} style={sty}>
          <img src={'http://7xskmo.com1.z0.glb.clouddn.com/' + this.props.data.content.news_item[0].thumb_media_id + '.jpg'} style={imgStyle}/>
          <div className="swiper_div_title">{this.props.data.content.news_item[0].title}</div>
        </TapAble>
      </div>
    );
  }
}