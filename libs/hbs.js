var path = require("path"),
	os = require("os");
var dl = os.release() == "6.1.7601" ? 0 : 3600000*8;
module.exports = function(hbs){
	hbs.registerHelper("addNull", function(num, context){
		var result = "";
		for(var i=0; i<num; i++){
			result += "&nbsp;&nbsp;&nbsp;";
		}
		return result;
	});
	hbs.registerHelper("if", function(val1, type, val2, context){
		switch(type){
			case "==":
				//console.log(val1+","+val2);
				if( val1 == val2 ){
					console.log( context.fn(this) );
					return context.fn(this);
				} else return "";
				break;
			default: return "";
		}
	});
	hbs.registerHelper("format", function(dateline, context){
		return new Date(parseInt(dateline+dl)).Format("yyyy-MM-dd hh:mm");
	});
	hbs.registerPartials(path.join(__dirname+"/../views/blog") );
}