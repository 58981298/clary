exports.homepage = function(req, res){
	res.render("index",{})
}

exports.nav = function(req, res){
	res.render("nav",{
		title: "导航-clary"
	})
}

exports.demo = function(req, res){
	res.render("demo",{
		title: "实例-demo-clary"
	})
}