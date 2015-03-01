var admin = require("./admin");
module.exports = function(app){
	

	app.get("/adtest/login", admin.login);
	app.get("/adtest/logout", admin.logout);
	app.get("/adtest", admin.auth, admin.main);
	app.get("/adtest/:who", admin.auth, admin.main);
	app.get("/adtest/artical/:who", admin.auth, admin.artical_opearation);

	app.post("/adtest/login", admin.auth, admin.login_post);
	app.post("/adtest/artical", admin.auth, admin.artical_post);
	app.post("/adtest/artical/:who", admin.auth, admin.artical_post);
	// app.post("/adtest/category/insert", admin.auth, admin.dictionary_insert_post);
	// app.post("/adtest/tag/insert", admin.auth, admin.dictionary_insert_post);
	app.post("/adtest/category", admin.auth, admin.dictionary_post);
	app.post("/adtest/tag", admin.auth, admin.dictionary_post);
}