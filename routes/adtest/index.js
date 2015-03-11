var admin = require("./admin")
	, adc = require("./adc");
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

	app.get("/adc/login", adc.login);
	app.get("/adc/logout", adc.logout);
	app.get("/adc", adc.auth, adc.main);
	app.get("/adc/:who", adc.auth, adc.main);
	app.get("/adc/artical/:who", adc.auth, adc.artical_opearation);

	app.post("/adc/login", adc.auth, adc.login_post);
	app.post("/adc/artical", adc.auth, adc.artical_post);
	app.post("/adc/artical/:who", adc.auth, adc.artical_post);
	app.post("/adc/category", adc.auth, adc.dictionary_post);
	app.post("/adc/tag", adc.auth, adc.dictionary_post);
}