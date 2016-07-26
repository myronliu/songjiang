var EvoFlux = require('evoflux');
var Ajax = require('../helper/ajax');
module.exports = EvoFlux.createStore("demoStore",{
	mixins: [Ajax.init(global.ajaxConfig)],
	actions:{
		demo:function(data){
			this.data = data; 
		}
	},
	changeData:function(cb){
		this.on(this.changeEvent,function(){
			cb(this.data);
		}.bind(this))
	},
	getData: function(cb){
		this.api.get("user")
			.send({id:"1"})
			.end(function(err,res){
				if(err){
					console.log(err);
				}else{
					cb(res);
					console.log(res);
				}
			})
	}
})