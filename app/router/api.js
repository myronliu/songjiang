var express = require('express');
var router = express.Router();
var ApiAction = require('../actions/apiaction')

router.post('/bankCardFacade/queryBankLimits',function(req,res){
  ApiAction.post(req.url, req.body, function(data){
    res.json(data);
  },global.ajaxpMemberConfig)
})

router.post('/bidFacade/getAggregatedBidDetail',function(req,res){
  ApiAction.post(req.url, req.body, function(data){
    res.json(data);
  },global.ajaxP2pConfig)
})

router.post('/accelerationFacade/getAccelerationResult',function(req,res){
  ApiAction.post(req.url, req.body, function(data){
    res.json(data);
  },global.ajaxOssConfig)
})
router.post('*',function(req,res){
  console.log(req.cookies)
  console.log(global.ajaxConfig.header)
  let auth=req.cookies.auth
  let ajaxSet= {};
  ajaxSet.url=global.ajaxConfig.url;
  ajaxSet.header=global.ajaxConfig.header;
  ajaxSet.header['X-KJT-AUTH']=(auth===undefined?'':auth);
  ApiAction.post(req.url,req.body,function(data){
    if(data.body){
      if(data.body.auth){
        var auth=data.body.auth;
        var token=data.body.token;
        res.setHeader("Set-Cookie", ['auth='+auth]);
        res.setHeader("Set-Cookie", ['token='+token]);
        // res.setHeader("Set-Cookie", ['account='+(req.body.account || req.body.phone)]);
      }
    }
    res.json(data);
  },ajaxSet)
})
router.get('/promotion/acceleration',function(req,res){
  ApiAction.get(req.url,function(data){
    res.json(data);
  },global.ajaxAcceConfig)
})
router.get('*',function(req,res){
  console.log(req.url)
  ApiAction.get(req.url,function(data){
    res.json(data);
  })
})

module.exports = router;