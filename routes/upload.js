var db = require("localDB")
	, crypto = require("crypto")
	, path = require("path")
	, fs = require("fs")
	, util = require('util')
	, formidable = require('formidable');

var TITLE = '';
module.exports = function(req, res){
	var form = new formidable.IncomingForm({});
	form.uploadDir = __dirname+"/";
	form.parse(req, function(err, fields, files) {

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

  res.locals.success = '上传成功';
  res.send("12312");
  //res.render('index', { title: TITLE });
}