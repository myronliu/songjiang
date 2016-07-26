var EvoFlux = require('evoflux');
var Ajax = require('../helper/ajax');
module.exports = EvoFlux.createAction({
  mixins: [Ajax.init(global.ajaxConfig)],
	demo:function () {
    console.log(this.api);
    console.log("this is demo action");
		return {
			actionType:"demo",
			data:"click string"
		}
	}
})