var db = require("localDB")
	, crypto = require("crypto")
	, path = require("path")
	, fs = require("fs")
	, util = require('util')
	, formidable = require('formidable');

module.exports = function(req, res){
	var form = new formidable.IncomingForm({});
	form.uploadDir = path.join(__dirname+"/../static/artical/thumbnail");
	form.parse(req, function(err, fields, files) {
	    if (err) return res.send(err);
	    if( !files || !files.thumbnail || !files.thumbnail.type ){
	    	return res.send("系统文件遭窜改，请联系管理员");
	    }
	    var extName = ''  //后缀名
	    	, avatarName = '';
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
			default:
				return res.send("只支持png和jpg格式图片");	 
		}
		avatarName = (!!fields && !!fields.id ? fields.id : new Date().Format("yyyyMMddhhmmss")) +"."+extName;  
	    var newPath = path.join(form.uploadDir+"/"+avatarName);
	    fs.renameSync(path.join(files.thumbnail.path+""), newPath);  //重命名
  		return res.send({
  			message: "上传成功",
  			filename: avatarName
  		});
	});
}