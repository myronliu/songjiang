var ajax = require('../helper/ajaxp');
var UrlConfig = require('../config/urlconfig');
var Api = function(){ return ajax.init(global.ajaxConfig).api;};
var Index = {}
Index.list = function (type) {
  console.log("----------->type")
  console.log(type)
  return Api().post(UrlConfig.index).query({type:type});
}

module.exports = Index;