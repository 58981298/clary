/**
 * cookie操作，包含set, get, del方法
 * create by wangcl
 * time to 2014.07.06
 * version: 0.0.1
 */	
	var objCookie = {
		set : function(name, value, time){
			time = /^[-]?\d+$/.test(time) ? time : 30*24*3600*1000;
			var __day = new Date();
			var newTime = __day.getTime() + time;
			__day.setTime(newTime);
			document.cookie = name + "=" +value + ";expires=" + __day.toGMTString();
		},
		get : function(name){
			var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
			if( arr = document.cookie.match(reg) ) return arr[2];
			else return null;
		},
		del : function(name){
			this.set(name, "", -1);
		}
	}