	db.use("artical");
 db.insert({
	title: "测试标题1237",
	intro: "测试简介",
	thumbnail: "/admin/img/e.jpg",
	content: "测试内容",
	uid: 1,
	author: "wangcl",
	category: 2,
	tag: "1,23,5,6",
	createtime: Date.now(),
	updatetime: Date.now(),
	serial: 0,
	clicknum: 22,
	status: 0,
	seo_title: "seotitle",
	seo_keyword: "seo_keyword",
	seo_description: "seo_description"
})

// db.use("user");
// db.insert({
// 	username: "wangcl",
// 	pass: "4QrcOUm6Wau+VuBX8g+IPg==",
// 	email: "wcl58981298@sina.com",
// 	createtime: Date.now(),
// 	showname: "clary"
// })


// db.use("dictionary");
// db.insert({
// 	pid: 0,
// 	name: "4QrcOUm6Wau+VuBX8g+IPg==",
// 	alias: "wcl58981298@sina.com",
// 	type: Date.now(),
// 	descript: "clary",
//	serial: 0,
//	status: 0
// })