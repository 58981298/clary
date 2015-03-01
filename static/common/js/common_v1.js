	Date.prototype.Format = function(fmt) {
		var o = {
			"M+": this.getMonth() + 1, //鏈堜唤 
			"d+": this.getDate(), //鏃� 
			"h+": this.getHours(), //灏忔椂 
			"m+": this.getMinutes(), //鍒� 
			"s+": this.getSeconds(), //绉� 
			"q+": Math.floor((this.getMonth() + 3) / 3), //瀛ｅ害 
			"S": this.getMilliseconds() //姣 
		};
		if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o)
			if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	}

	$(function(){ $(".markdown-artical a").attr("target","_blank"); })	