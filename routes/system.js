var db = require("localDB");
exports.notFoundDB = function(req, res, next){
	if( db.existsSync("artical") ){
		next();
	} else {
		console.log("数据库文件不存在，请求来源："+req.url);
		return res.render("error", {
			title: "异常处理页",
			content: "页面异常，请联系管理员"
		});
	}
}