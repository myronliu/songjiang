var Promise  = require('bluebird');
var React    = require('react');
var Index    = require('../models/index');
var exp      = require('../helper/expose');

module.exports ={
  index : function(req,res,next){
    return Promise.resolve().then(function(){
      var list = Index.list()
      	.then(function(result){
          // console.log(result.res.IncomingMessage)
          // console.log(result.res.IncomingMessage.text)
          // console.log(result.text)
	        if(result && result.text){
	          result = result.text;  
          	return result; 
	        }else{
	        	return {}
	        }
      	}
      )
      return [list];
    })
  }
}