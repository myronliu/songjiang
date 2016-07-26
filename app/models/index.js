var ajax = require('../helper/ajaxp');
var UrlConfig = require('../config/urlconfig');
var Api = function(){ return ajax.init(global.ajaxConfig).api;};
var Index = {}
Index.list = function (position) {
  return Api().post(UrlConfig.index);
}

module.exports = Index;