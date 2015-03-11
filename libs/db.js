"use strict";
var mongo = require("mongodb");

var config = require("../config/config.json");

mongoose.connect('mongodb://'+ config.db.ip +'/' + config.db.name);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connecttion error: "));
db.once("open", function(callback){
	// connect success
})

// 公告数据模型
var NoticeSchema = mongoose.Schema({
	title: String,
	content: String,
	created_by: String,
	created_at: Number,
	updated_at: Number
});
var Notice = mongoose.model("Notice", NoticeSchema);
var NoticeAdd = function(data){
	return new Notice({
		title: data.title,
		content: data.content,
		created_by: data.created_by,
		created_at: Date.now(),
		updated_at: Date.now()
	});
	// }, { versionKey: "__v_define" }); // 自定义版本锁 
	// }, { versionKey: false }); // 取消版本锁 
}
//Notice.find([{ _id: "54fd58646ddc18102ce9c9b8" },{ _id: "54fd58851b29c50025ff4b09" },{ _id: "54fd58f1f6ba6d2c33ade31a" }]).remove().exec();

// 请假数据模型
var LeavesSchema = mongoose.Schema({
	title: String,
	created_by: String,
	created_at: Number
});
var Leaves = mongoose.model("Leaves", LeavesSchema);
var LeavesAdd = function(data){
	return new Leaves({
		title: data.title,
		created_by: data.created_by,
		created_at: Date.now()
	});
}

// 打卡数据模型
var RecordsSchema = mongoose.Schema({
	records_by: String,
	records_at: Number,
	created_at: Number,
	is_patch: Number,
	title: String
});
var Records = mongoose.model("Records", RecordsSchema);
var RecordsAdd = function(data){
	return new Records({
		records_by: data.records_by,
		records_at: data.records_at || Date.now(),
		created_at: Date.now(),
		is_patch: data.is_patch || 0,
		title: data.title || ""
	});
}

exports.Notice = Notice;
exports.NoticeAdd = NoticeAdd;
exports.Leaves = Leaves;
exports.LeavesAdd = LeavesAdd;
exports.Records = Records;
exports.RecordsAdd = RecordsAdd;
