import globleImport from '../helper/globalImport.js'
var express = require('express');
var router = express.Router();
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var fs= require('fs');
var patha = require('path');
var apiAddress = "http://xiaomutong.com.cn";

if(process.env.NODE_ENV != undefined){
  switch(process.env.NODE_ENV ){
    case "staging":
      apiAddress =  "http://xiaomutong.com.cn";
      break;
    case "production":
      apiAddress = "http://xiaomutong.com.cn";
      break;
    case "development":
      apiAddress = "http://xiaomutong.com.cn";
      break;
  }
}

global.ajaxConfig = {url:apiAddress,header:{"Content-Type":"application/json","X-KJT-Agent": "h511111111111111111111111;h511111111111111111111111;h5;h5;;h5;h5;1.0.0;WIFI;h511111111111111111111111","X-KJT-AUTH": "","X-API-VER": "2.0"}}

router.use(function(req,res,next){
  // 服务层接收header，设置ajaxConfig，需要传到js client
  // var sUserAgent = req.headers["user-agent"].toLowerCase();//获取客户端的环境
  
  var ip = req.get('x-forwarded-for') || req.connection.remoteAddress;
  if (req.get('X-KJT-Agent')) {   
    global.ajaxConfig.header["X-KJT-Agent"] = req.get('X-KJT-Agent');
  }
  global.ajaxConfig.header["X-KJT-AUTH"] = req.get('X-KJT-AUTH')?req.get('X-KJT-AUTH'):"";
  global.ajaxConfig.header["X-API-VER"] = req.get('X-API-VER')?req.get('X-API-VER'):"2.0";
  next();
})

var ErrorView = React.createFactory(require('../pages/error'));
var Index = React.createFactory(require('../pages/index/index'));

// models
var IndexController = require('../controllers/index');
var Exp =require('../helper/expose');

router.get('/error',function(req,res){
  var reactHtml = ReactDOMServer.renderToString(ErrorView({message:"出错啦！"}));
  res.render('index', {reactOutput: reactHtml,title:'出错啦'});
})

router.get('/process1',function(req,res){
  res.render('process1');
})

router.get('/process2',function(req,res){
  res.render('process2');
})

router.get('/process3',function(req,res){
  res.render('process3');
})

router.get('/process4',function(req,res){
  res.render('process4');
})

router.get(['/','/index'],function(req,res){
  // 获取数据
  IndexController.index()
    .spread(function(list){
      var listNow=[];
      var listPast=[];
      list = JSON.parse(list)
      console.log(list)
      if(list && list.item && list.item.length > 0){
        for(var i = 0; i < list.item.length; i++){
          var nowMonth = new Date();
          var crt = new Date(parseInt(list.item[i].content.create_time) * 1000);
          console.log(crt.getFullYear())
          if(crt.getFullYear() === nowMonth.getFullYear() && crt.getMonth() === nowMonth.getMonth()){
            listNow.push(list.item[i]);
          }else{
            listPast.push(list.item[i]);
          }
        }
      }
      var data = {
        listNow: listNow,
        listPast: listPast,
        topBanners: list.top
      };
      res.expose(Exp.dehydrate(data));
      var reactHtml = ReactDOMServer.renderToString(Index({data: data}));
      res.render('index', {reactOutput: reactHtml,title:'首页', stateData: res.locals.state});
    })
    .catch(function(ex){
      console.log("异常了---->")
      console.log(ex)
      var data = {
        listNow: [{
          image:"http://img1.imgtn.bdimg.com/it/u=3461766366,1830101633&fm=21&gp=0.jpg",
          title : "注册送风景啊少雷地方就是打开房间少雷地方就收到了房间少雷封建时代雷锋精688元",
          description: 'lalaldsfsalfds大煞风景啊少雷地方就是打开房间少雷地方就收到了房间少雷封建时代雷锋精神独立开发阶段少雷开发建设的路口附近',
          link : "http://www.hairongyi.com/activity/activityPage.htm?id=71",
        },{
          image:"http://img1.imgtn.bdimg.com/it/u=3461766366,1830101633&fm=21&gp=0.jpg",
          title : "注册送688元",
          description: 'lalaldsfsalfds大煞风景啊少雷地方就是打开房间少雷地方就收到了房间少雷封建时代雷锋精神独立开发阶段少雷开发建设的路口附近',
          link : "http://www.hairongyi.com/activity/activityPage.htm?id=71",
        },{
          image:"http://img1.imgtn.bdimg.com/it/u=3461766366,1830101633&fm=21&gp=0.jpg",
          title : "注册送688元",
          description: 'lalaldsfsalfds大煞风景啊少雷地方就是打开房间少雷地方就收到了房间少雷封建时代雷锋精神独立开发阶段少雷开发建设的路口附近',
          link : "http://www.hairongyi.com/activity/activityPage.htm?id=71",
        }],
        listPast: [{
          image:"http://img1.imgtn.bdimg.com/it/u=3461766366,1830101633&fm=21&gp=0.jpg",
          title : "past",
          description: 'lalaldsfsalfds大煞风景啊少雷地方就是打开房间少雷地方就收到了房间少雷封建时代雷锋精神独立开发阶段少雷开发建设的路口附近',
          link : "http://www.hairongyi.com/activity/activityPage.htm?id=71",
        },{
          image:"http://img1.imgtn.bdimg.com/it/u=3461766366,1830101633&fm=21&gp=0.jpg",
          title : "past",
          description: 'lalaldsfsalfds大煞风景啊少雷地方就是打开房间少雷地方就收到了房间少雷封建时代雷锋精神独立开发阶段少雷开发建设的路口附近',
          link : "http://www.hairongyi.com/activity/activityPage.htm?id=71",
        },{
          image:"http://img1.imgtn.bdimg.com/it/u=3461766366,1830101633&fm=21&gp=0.jpg",
          title : "注册送688元",
          description: 'lalaldsfsalfds大煞风景啊少雷地方就是打开房间少雷地方就收到了房间少雷封建时代雷锋精神独立开发阶段少雷开发建设的路口附近',
          link : "http://www.hairongyi.com/activity/activityPage.htm?id=71",
        }],
        topBanners: [{
          description: 'lalal',
          image:"http://7xlnmq.com1.z0.glb.clouddn.com/146785614428526886710819713900",
          sort : 1,
          link : "http://www.hairongyi.com/activity/activityPage.htm?id=71",
          title : "注册送风景啊少雷地方就是打开房间少雷地方就收到了房间少雷封建时代雷锋精688元",
          type : 0
        }
        ,{
          description: 'oooo',
          image:"http://img1.imgtn.bdimg.com/it/u=3461766366,1830101633&fm=21&gp=0.jpg",
          sort : 1,
          link : "http://www.hairongyi.com/activity/activityPage.htm?id=71",
          title : "注册送风景啊少雷地方就是打开房间少雷地方就收到了房间少雷封建时代雷锋精688元",
          type : 0
        }
        ]
      };
      res.expose(Exp.dehydrate(data));
      var reactHtml = ReactDOMServer.renderToString(Index({data: data}));
      res.render('index', {reactOutput: reactHtml,title:'首页', stateData: res.locals.state});
    })
})

module.exports = router;