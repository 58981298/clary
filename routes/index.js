var route_err = require("./err")
	, crypto = require("crypto")
	, route_adtest = require("./adtest")
	, route_blog = require("./blog")
	, route_base = require("./base")
	, route_upload = require("./upload");
console.log(route_base);
module.exports = function(app){
	// app.use(function(req, res, next) {
	//     var err = new Error('Not Found');
	//     err.status = 404;
	//     next(err);
	// });
	
	route_adtest(app);
	route_blog(app);
	app.get("/", route_base.homepage );
	app.get("/nav/", route_base.nav );
	app.get("/demo/", route_base.demo );

	app.post("/upload/", route_upload);  

	app.get("/test", function(req, res){
		return res.json({
			body: req.body,
			query: req.query,
			params: req.params
		});
		res.send( Date.now()+","+Date.now(30) );
	})

	app.get('/md5/', function(req, res){
		res.send( crypto.createHash('md5').update( req.query.password ).digest('base64') );
	});
	//app.get("*", route_err.http404 );

}