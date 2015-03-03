var db = require("localDB")
	, system = require("./../system");

module.exports = function(app){
	app.get("/blog/", system.notFoundDB, function(req, res){
		db.use("artical");
		db.select(function(err, data){
			if(err) res.send("error page");
			else {
				res.locals.layout = "blog/layout_all.html";
				res.render("blog/blog", {
					title: "博客-clary",
					list: data
				});
			}
		})
	});

	app.get( "/blog/:uri" , function(req, res){
		db.use("artical");
		db.select(function(err, data){
			if(err) return res.send("error page");
			else { 
				for( var i=0; i<data.length; i++ ){
					if( req.params.uri === data[i].seo_url ){
						i == data.length;
						res.locals.layout = "blog/layout_artical.html";
						return res.render("blog/artical", {
							title: data[i].title,
							thumbnail: "/blog/thumbnail/"+data[i].thumbnail,
							artical: data[i].content
						})
					}
				}
				return res.send("page not found");
			}
		})
	});	
	
}