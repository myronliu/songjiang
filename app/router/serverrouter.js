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
  IndexController.index(req,res)
    .spread(function(list){
      var listNow=[];
      var listPast=[];
      list = JSON.parse(list)
      // console.log(list)
      if(list && list.item && list.item.length > 0){
        for(var i = 0; i < list.item.length; i++){
          var nowMonth = new Date();
          var crt = new Date(parseInt(list.item[i].update_time) * 1000);
          // console.log(crt.getFullYear())
          if(crt.getFullYear() === nowMonth.getFullYear() && crt.getMonth() === nowMonth.getMonth()){
            listNow.push(list.item[i]);
          }else{
            listPast.push(list.item[i]);
          }
        }
      }
      if(listNow.length === 0){
        var pastItem = listPast.length > 0 ? listPast[0] : {update_time: ''};
        // var pastItem = {update_time: ''};
        var i = 0;
        var pu = new Date(parseInt(pastItem.update_time) * 1000);
        listNow = listPast.filter(function(item){
          var iu = new Date(parseInt(item.update_time) * 1000);
          if(iu.getFullYear() === pu.getFullYear() && iu.getMonth() === pu.getMonth() && i<10){
            i++;
            return true;
          }
        })
      }
      console.log(listNow)
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
        listNow: [],
        listPast: [],
        topBanners: []
      };
      res.expose(Exp.dehydrate(data));
      var reactHtml = ReactDOMServer.renderToString(Index({data: data}));
      res.render('index', {reactOutput: reactHtml,title:'首页', stateData: res.locals.state});
    })
})

module.exports = router;