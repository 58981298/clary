var express = require("express")
	, path = require("path")
	, hbs = require("hbs")
	, db = require("localDB")
	, bodyParser = require("body-parser")
	, cookieParser = require("cookie-parser")
	, cookieSession = require("cookie-session")
	, libs_tools = require("./libs/tools")
	, libs_hbs = require("./libs/hbs");

var routes = require("./routes");

var app = express();
libs_tools();
db.config({
	path: __dirname+"/db"
});

// db.use("dictionary");
// db.insert({
// 	pid: 0,
// 	name: "无",
// 	alias: "uncategorized",
// 	type: "category",
// 	descript: "",
// 	serial: 0,
// 	status: 0
// })

libs_hbs(hbs);

app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname+"/views"));
app.set("view engine", "html");
app.engine("html", hbs.__express);
app.use(bodyParser());
app.use(cookieParser());
app.use(cookieSession({
	keys: ['key1', 'key2'],
	user: ["12","123",456]
}));

app.use("/common/", express.static(__dirname+"/static/common"));
app.use("/adtest/", express.static(__dirname+"/static/adtest"));
app.use("/blog/thumbnail", express.static(__dirname+"/static/artical/thumbnail"));
app.use("/demo/commoncode/", express.static(__dirname+"/static/demo/commoncode"));

routes(app);

app.listen(app.get("port"), function(){
	console.log("listen to "+app.get("port"));
});