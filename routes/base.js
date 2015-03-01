exports.homepage = function(req, res){
	res.render("index",{})
}

exports.nav = function(req, res){
	res.render("nav",{})
}

exports.demo = function(req, res){
	res.render("demo",{})
}