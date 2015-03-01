seajs.config({
	base: "/moe/",
	paths: {
		"coding": "http://"+window.location.host+"/coding.net.demo/"
	},
	alias: {
		"jquery": "jquery/1.11.2/jquery-debug.js"
	},
	preload: ["jquery"]
});
// jQuery暴露到全局
	// 2.1.1开始移除modify
	// seajs.modify("jquery", function(require, exports){
	// 	window.jQuery = window.$ = exports;
	// });
seajs.on('exec', function(module) {
   if (module.uri === seajs.resolve('jquery')) {
      window.$ = window.jQuery = module.exports
   }
})
seajs.use("jquery",function($){
	window.jQuery = window.$ = $;
})