var db = require("localDB")
	, crypto = require("crypto")
	, path = require("path")
	, fs = require("fs")
	, formidable = require('formidable')
	, util = require('util')
	, os = require("os");

var root_views = path.join(__dirname + "/../../views");

var admin = {
	root: "/adc",
	login: "/adc/login",
	post: "/adc/post",
	logout: "/adc/logout",
	artical: "/adc/artical",
	category: "/adc/category",
	tag: "/adc/tag"
}

exports.login = function(req, res){
	res.locals.layout = "";
	res.render(admin.login.substr(1),{});
}
exports.login_post = function(req, res){
	res.locals.layout = "";
	// req.assert('username', "用户名不能为空").notEmpty();
 //    req.assert('password', "密码不能为空").notEmpty();
	if(!req.body.username || !req.body.pwd){
		res.render(admin.post.substr(1), {
			result: "用户名或密码不能为空",
			second: 3
		});
		return false;
	}
	db.use("user");
	
	db.select(function(err, data){
		if(err) throw err;
		for(var i=0; i<data.length; i++){
			if(data[i].username === req.body.username 
				&& crypto.createHash('md5').update( req.body.pwd ).digest('base64') === data[i].pass ){
				req.session = req.session || {};
				req.session.user = {
					uid: data[i].id,
					clary_auth: crypto.createHash('sha512').update( req.body.username ).digest('base64'),
					cache_time: Date.now()+2592000
				};
				return res.redirect(admin.root);
			}
		}
		res.render(admin.post.substr(1), {
			login: admin.login,
			result: "用户名或密码错误",
			second: 3
		});
	})
}
exports.logout = function(req, res){
	req.session = null;
	res.redirect("/");
}
exports.auth = function(req, res, next) {
	
    var url = req.originalUrl;
    if (url != admin.logout && url != admin.login && !req.session.user) {

		return res.redirect(admin.login);
	} else {
		next();
	}
	
}
exports.main = function(req, res){
	
	var who = req.params.who || "index";
	res.locals.layout = admin.root.substr(1)+"/layout.html";
	if( req.url.indexOf("artical") >= 0 ){
		if( db.existsSync("artical") ){
			db.use("artical");
			db.select(function(err, data){
				if(err) throw err;
				res.render(admin.root.substr(1)+"/"+who,{
					logout: admin.logout,
					root: admin.root,
					artical: admin.artical,
					category: admin.category,
					list: data
				});
			});
		} else {
			res.render(admin.root.substr(1)+"/"+who,{
				logout: admin.logout,
				root: admin.root,
				artical: admin.artical,
				category: admin.category,
				list: []
			});
		}
		
	} else if( req.url.indexOf("category") >= 0 || req.url.indexOf("tag") >= 0 ){
		
		if( db.existsSync("dictionary") ){
			db.use("dictionary");
			db.select(function(err, data){
				if(err) throw err;
				res.render(admin.root.substr(1)+"/"+who,{
					logout: admin.logout,
					root: admin.root,
					insert: admin.insert,
					artical: admin.artical,
					category: admin.category,
					list: dictionary_render(data, who),
					list_raw: dirtionary_type(data,who),
					tag: admin.tag
				});
			});
		} else {

			res.render(admin.root.substr(1)+"/"+who,{
				logout: admin.logout,
				root: admin.root,
				insert: admin.insert,
				artical: admin.artical,
				category: admin.category,
				list: [],
				list_raw: [],
				tag: admin.tag
				
			});
		}
	} else {
		//console.log( os.type()+os.platform() );
		if( fs.existsSync(root_views+admin.root+"/"+who+".html") ){
			res.render(admin.root.substr(1)+"/"+who,{
				logout: admin.logout,
				root: admin.root,
				insert: admin.insert,
				artical: admin.artical,
				category: admin.category,
				os: os.type()+"_"+os.arch(),
				hostname: os.hostname()
			});
		} else {
			res.redirect(admin.root+"/");
		}
		
	}
}
exports.artical_opearation = function(req, res){
	var who = req.params.who;
	res.locals.layout = admin.root.substr(1)+"/layout.html";
	
	if( who === "insert" ){
		if( db.existsSync("dictionary") ){
			db.use("dictionary");
			db.select(function(err, data){
				if(err) throw err;
				res.render(admin.root.substr(1)+"/"+who,{
					logout: admin.logout,
					root: admin.root,
					artical: admin.artical,
					category: dictionary_render(data, "category"),
					tag: dictionary_render(data, "tag")
				});
			});
		} else {
			res.render(admin.root.substr(1)+"/"+who,{
				logout: admin.logout,
				root: admin.root,
				artical: admin.artical,
				category: [],
				tag: []
			});
		}
		
	}
	else if( who === "modify" ){
		db.use("artical");
		
		db.select(function(err, data){
			if(err) throw err;
			for( var i=0; i<data.length; i++ ){
				if( data[i].id == req.query.id ){
					if( db.existsSync("dictionary") ){
						db.use("dictionary");
						return db.select(function(err, dictionarydata){	
							if(err) throw err;
							data[i] = data[i];
							data[i].categoryall = dictionary_render(dictionarydata, "category");
							data[i].tagall = dictionary_render(dictionarydata, "tag");
							for( var j in data[i].categoryall ){
								if( data[i].categoryall[j].id == data[i].category ){
									data[i].categoryall[j].ischecked = ' checked="checked"';
								} else {
									data[i].categoryall[j].ischecked = '';
								}
							}
							var arr_tag = data[i].tag.split(",");
							for( var j in data[i].tagall ){
								data[i].tagall[j].ischecked = '';
								for( var k in arr_tag ){
									if( data[i].tagall[j].id == arr_tag[k] ){
										data[i].tagall[j].ischecked = ' checked="checked"';
									}
								}
							}
							res.render(admin.root.substr(1)+"/"+who,{
								logout: admin.logout,
								root: admin.root,
								artical: admin.artical,
								category: dictionary_render(dictionarydata, "category"),
								tag: dictionary_render(dictionarydata, "tag"),
								data: data[i]
							});
						});
					} else {
						return res.render(admin.root.substr(1)+"/"+who,{
							logout: admin.logout,
							root: admin.root,
							artical: admin.artical,
							category: [],
							tag: [],
							data: data[i]
						});
					}
					
				}
			}
			res.send("异常？");
		});
	}
	
}

exports.artical_post = function(req, res){
	db.use("artical");
	res.locals.layout = "";
	var who = req.params.who
		, params = req.body.params.split(",")
		result = "";
	if( params[0] === "insert" ){

		req.body.tag = req.body.tag+"";
		if( !req.body.seo_url || /^[ ]*$/.test(req.body.seo_url) ){
			result = "访问路径不能为空";
		} 
		else if( !req.body.title || /^[ ]*$/.test(req.body.title) ){
			result = "标题不能为空";
		} 
		else if( !req.body.intro || /^[ ]*$/.test(req.body.intro) ){
			result = "简介不能为空";
		} 
		else if( !req.body.author || /^[ ]*$/.test(req.body.author) ){
			result = "作者不能为空";
		} 
		else if( !req.body.thumbnail || /^[ ]*$/.test(req.body.thumbnail) ){
			result = "缩略图不能为空不能为空";
		} 
		else if( !req.body.content || /^[ ]*$/.test(req.body.content) ){
			result = "内容不能为空";
		} 
		// else if( !req.body.category || /^[ ]*$/.test(req.body.category) ){
		// 	result = "分类必选一项";
		// } 
		// else if( !req.body.tag || /^[ ]*$/.test(req.body.tag) ){
		// 	result = "标签至少选择一项";
		// }
		// else if( !req.body.seo_title ){
		// 	result = "不可改动SEO的标题";
		// }
		// else if( !req.body.seo_keyword ){
		// 	result = "不可改动SEO的关键词";
		// }
		// else if( !req.body.seo_description ){
		// 	result = "不可改动SEO的描述";
		// }
		if( result !== "" ){
			return res.render(admin.post.substr(1), {
				login: admin.insert,
				result: result,
				second: 1
			});
		}
		req.body.uid = req.session.user.id;
		req.body.createtime = req.body.updatetime = Date.now();
		req.body.serial = 0;
		req.body.clicknum = 0;
		req.body.status = 0;
		db.use("artical");
		//console.log( req.body );
		db.insert(req.body,function(err, data){
			if(err) throw err;
			return res.render(admin.post.substr(1), {
				login: admin.artical,
				result: !!err ? "服务器异常，新增失败" : "新增成功",
				second: 3
			});
		});
	} else if( params[0] === "delete" ){
		db.delete({
			id: parseInt(params[1],10),
			isDone: true
		}, function(err, data){
			if(err) throw err;
			var result = !!err ? "删除失败": "删除成功";
			return res.render(admin.post.substr(1), {
				login: admin.artical,
				result: result,
				second: 3
			});
		});
	} else if( params[0] === "update" ){
		db.select(function(err, data){
			if(err) throw err;
			for(var i=0; i<data.length; i++){
				if( data[i].id === parseInt(params[1],10) ){
					//console.log( req.body.serial instanceof Array );
					if( req.body.serial instanceof Array ){
						data[i].serial = req.body.serial[ params[2] ];
						data[i].seo_url = req.body.seo_url[ params[2] ];
						data[i].title = req.body.title[ params[2] ];
						data[i].intro = req.body.intro[ params[2] ];
						data[i].author = req.body.author[ params[2] ];
						data[i].updatetime = Date.now();
					} else {
						data[i].serial = req.body.serial;
						data[i].seo_url = req.body.seo_url;
						data[i].title = req.body.title;
						data[i].intro = req.body.intro;
						data[i].author = req.body.author;
						data[i].updatetime = Date.now();
					}
					
					db.update(data[i], function(err){
						var result = !!err ? "更新失败": "更新成功";
						return res.render(admin.post.substr(1), {
							login: admin.artical,
							result: result,
							second: 1
						});
					});
				}
			}
		});
	} else if( params[0] === "modify" ){
		   var form = new formidable.IncomingForm({});
	form.uploadDir = __dirname+"/";
	form.parse(req, function(err, fields, files) {
		console.log(123);
	    if (err) {
	      res.locals.error = err;
	      res.render('index', { title: TITLE });
	      return;		
	    }   
	    var extName = '';  //后缀名
	    switch (files.thumbnail.type) {
	      case 'image/pjpeg':
	        extName = 'jpg';
	        break;
	      case 'image/jpeg':
	        extName = 'jpg';
	        break;		 
	      case 'image/png':
	        extName = 'png';
	        break;
	      case 'image/x-png':
	        extName = 'png';
	        break;		 
	    }

	    if(extName.length == 0){
	        res.locals.error = '只支持png和jpg格式图片';
	        res.render('index', { title: TITLE });
	        return;				   
	    }

	    var avatarName = Math.random() + '.' + extName;
	    var newPath = form.uploadDir + avatarName;


	    fs.renameSync(files.thumbnail.path, newPath);  //重命名
	  });
		// return res.send("sdfds")
		db.use("artical");
		db.select(function(err, data){
			if(err) throw err;
			for(var i=0; i<data.length; i++){
				if( data[i].id === parseInt(params[1],10) ){
					if( !req.body.seo_url || /^[ ]*$/.test(req.body.seo_url) ){
						result = "访问路径不能为空";
					} 
					else if( !req.body.title || /^[ ]*$/.test(req.body.title) ){
						result = "标题不能为空";
					} 
					else if( !req.body.intro || /^[ ]*$/.test(req.body.intro) ){
						result = "简介不能为空";
					} 
					else if( !req.body.author || /^[ ]*$/.test(req.body.author) ){
						result = "作者不能为空";
					}
					else if( !req.body.content || /^[ ]*$/.test(req.body.content) ){
						result = "内容不能为空";
					} 
					// else if( !req.body.category || /^[ ]*$/.test(req.body.category) ){
					// 	result = "分类必选一项";
					// } 
					// else if( !req.body.tag || /^[ ]*$/.test(req.body.tag) ){
					// 	result = "标签至少选择一项";
					// }
					// else if( !req.body.seo_title ){
					// 	result = "不可改动SEO的标题";
					// }
					// else if( !req.body.seo_keyword ){
					// 	result = "不可改动SEO的关键词";
					// }
					// else if( !req.body.seo_description ){
					// 	result = "不可改动SEO的描述";
					// }
					if( result !== "" ){
						return res.render(admin.post.substr(1), {
							login: admin.artical+"/modify?id="+parseInt(params[1],10),
							result: result,
							second: 2,
							script: 'setTimeout(function(){window.history.go(-1);},1900);'
						});
					}
					data[i].seo_url = req.body.seo_url;
					data[i].title = req.body.title;
					data[i].intro = req.body.intro;
					data[i].author = req.body.author;
					data[i].thumbnail = !!req.body.thumbnail && !/^[ ]*$/.test(req.body.thumbnail) ? req.body.thumbnail : data[i].thumbnail;
					data[i].content = req.body.content;
					data[i].category = req.body.category;
					data[i].tag = req.body.tag;
					data[i].seo_title = req.body.seo_title;
					data[i].seo_keyword = req.body.seo_keyword;
					data[i].seo_description = req.body.seo_description;
					data[i].updatetime = Date.now();
					delete data[i].categoryall;
					delete data[i].tagall;
					db.update(data[i], function(err){
						var result = !!err ? "修改失败": "修改成功";
						return res.render(admin.post.substr(1), {
							login: admin.artical+"/modify?id="+parseInt(params[1],10),
							result: result,
							second: 1
						});
					});
				}
			}
		});
	} else {
		return res.render(admin.post.substr(1), {
			login: admin.artical,
			result: "类型参数不正确，请使用delete或update",
			second: 5
		});
	}
}
	
exports.insert_post = function(req, res){
	var result = "";
	res.locals.layout = "";
	req.body.tag = req.body.tag+"";
	if( !req.body.seo_url || /^[ ]*$/.test(req.body.seo_url) ){
		result = "访问路径不能为空";
	} 
	else if( !req.body.title || /^[ ]*$/.test(req.body.title) ){
		result = "标题不能为空";
	} 
	else if( !req.body.intro || /^[ ]*$/.test(req.body.intro) ){
		result = "简介不能为空";
	} 
	else if( !req.body.author || /^[ ]*$/.test(req.body.author) ){
		result = "作者不能为空";
	} 
	else if( !req.body.thumbnail || /^[ ]*$/.test(req.body.thumbnail) ){
		result = "缩略图不能为空不能为空";
	} 
	else if( !req.body.content || /^[ ]*$/.test(req.body.content) ){
		result = "内容不能为空";
	} 
	// else if( !req.body.category || /^[ ]*$/.test(req.body.category) ){
	// 	result = "分类必选一项";
	// } 
	// else if( !req.body.tag || /^[ ]*$/.test(req.body.tag) ){
	// 	result = "标签至少选择一项";
	// }
	else if( !req.body.seo_title ){
		result = "不可改动SEO的标题";
	}
	else if( !req.body.seo_keyword ){
		result = "不可改动SEO的关键词";
	}
	else if( !req.body.seo_description ){
		result = "不可改动SEO的描述";
	}
	if( result !== "" ){
		return res.render(admin.post.substr(1), {
			login: admin.insert,
			result: result,
			second: 1
		});
	}
	req.body.uid = req.session.user.id;
	req.body.createtime = req.body.updatetime = Date.now();
	req.body.serial = 0;
	req.body.clicknum = 0;
	req.body.status = 0;
	db.use("artical");
	db.insert(req.body,function(err, data){
		if(err) throw err;
		return res.render(admin.post.substr(1), {
			login: admin.artical,
			result: !!err ? "服务器异常，新增失败" : "新增成功",
			second: 3
		});
	});
}



exports.dictionary_post = function(req, res){
	db.use("dictionary");
	res.locals.layout = "";
	var params = req.body.params.split(",");
	if( params[0] === "insert" ){
		var result = "";
		if( !req.body.name || /^[ ]*$/.test(req.body.name) ){
			result = "分类或标签名字不能为空";
		}
		else if( !req.body.type || /^[ ]*$/.test(req.body.type) || (req.body.type !== "category" && req.body.type !== "tag") ){
			result = "服务器异常，请勿篡改系统变量。";
		}
		if( result !== "" ){
			return res.render(admin.post.substr(1), {
				login: admin.category,
				result: result,
				second: 2
			})
		}
		req.body.pid = !!req.body.pid && req.body.pid >= 0 ? parseInt(req.body.pid,10) : 0;
		req.body.serial = req.body.status = 0;
		db.insert(req.body,function(err, data){
			if(err) throw err;
			return res.render(admin.post.substr(1), {
				title: "clart-result",
				login: req.body.type === "category" ? admin.category : admin.tag,
				result: !!err ? "服务器异常，新增失败" : "新增成功",
				second: 3
			});
		});
	}
	else if( params[0] === "delete" ){
		db.delete({
			id: parseInt(params[1],10),
			isDone: true
		}, function(err, data){
			if(err) throw err;
			var result = !!err ? "删除失败": "删除成功";
			return res.render(admin.post.substr(1), {
				login: req.body.type === "category" ? admin.category : admin.tag,
				result: result,
				second: 3
			});
		});
	} else if( params[0] === "update" ){
		db.select(function(err, data){
			if(err) throw err;
			for(var i=0; i<data.length; i++){
				if( data[i].id === parseInt(params[1],10) ){
					data[i].serial = req.body.serial[ params[2] ];
					data[i].name = req.body.name[ params[2] ];
					data[i].descript = req.body.descript[ params[2] ];
					data[i].alias = req.body.alias[ params[2] ];
					db.update(data[i], function(err){
						var result = !!err ? "更新失败": "更新成功";
						return res.render(admin.post.substr(1), {
							login: req.body.type === "category" ? admin.category : admin.tag,
							result: result,
							second: 1
						});
					});
				}
			}
		});
	} else {
		return res.render(admin.post.substr(1), {
			login: req.body.type === "category" ? admin.category : admin.tag,
			result: "类型参数不正确，请使用insert或delete或update",
			second: 5
		});
	}

	//return res.send( req.body.params );
	
}
function dictionary_render(data, who){
	var arr = [];
	for(var i=0; i<data.length; i++){
		if( data[i].type === who ){
			if( data[i].pid == 0 ){
				data[i].grade = 0;
				arr.push(data[i]);
			} else {
				for(var j=0; j<arr.length; j++){
					if( data[i].pid == arr[j].id ){
						data[i].grade = arr[j].grade+1;
						arr.splice(j+1,0,data[i]);
						j=arr.length;
					}							
				}
			}
		}
	}
	return arr;
}
function dirtionary_type(data, who){
	var arr = [];
	for(var i=0; i<data.length; i++){
		if( data[i].type === who ){
			arr.push(data[i]);
		}
	}
	return arr;
}