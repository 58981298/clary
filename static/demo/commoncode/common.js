/**
 * create by wangcl
 * time to 2014.06.10
 */

/* common */

// 匹配正则：匹配播种多级域名
	http:\/\/(\w*\.)*(seedit|bozhong)\.com

// 正则，提取图片地址转为数组传出
	contentArr = content.match(/http:\/\/(\w+[\.|\/]){8}jpg\?imageView\/1\/w\/640/gi);
// Data自定义prototype-Format
	Date.prototype.Format = function (fmt) {
	    var o = {
	        "M+": this.getMonth() + 1, //月份 
	        "d+": this.getDate(), //日 
	        "h+": this.getHours(), //小时 
	        "m+": this.getMinutes(), //分 
	        "s+": this.getSeconds(), //秒 
	        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
	        "S": this.getMilliseconds() //毫秒 
	    };
	    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	    for (var k in o)
	    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	    return fmt;
	}
// 判断site目录文件是否存在，存在返回true，不存在返回false
	var isSiteFile = function(filename){
		console.log("indexOf filename ="+location.href.indexOf(filename)+","+location.href);
		if(location.href.indexOf(filename) > 0) return true;
		else return false;
	}
// 获取href地址的中的参数
	var getUrlParam = function(param) {
		var reg = new RegExp("(^|&)" + param + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]); return null;
	}
// 正则替换
	var message = '何时没地方[attach]123456[/attach]沃尔沃'; // 把中间的attach整块替换为空
	message = message.replace( /\[attach]\d+\[\/attach]/g, "" ); // g是全局搜索

// 点击前是<a>-click，点击后是<span>-text并执行自定义函数，执行后是<a>-click --> 详见A2Span文件
// 分页控件-详见pagerView文件

/**
 * handlebars模板套数据
 * create by wangcl
 * version: 0.0.1
 * drivers：var handlebars = require('gallery/handlebars/1.0.2/handlebars');
 *          var API = require('moe/API/0.0.3/API');
 * 详见handlebars文件
 */


/**
 * 表单处理
 * create by wangcl
 * version: 0.0.1
 */
	var objForm = {
		//是否为空，参数：字符串；为空返回true，不为空返回false
		isNull : function( str ){ 	
			if ( str == '' ) return true; 
			var regu = '^[ ]+$'; 
			var re = new RegExp(regu); 
			return re.test(str); 
		},
		// 判断input是否为空,为空弹框alerttext文案
		isNullInput : function(ele, alerttext){
			if( this.isNull(ele.val()) ){
				alert(alerttext);
				if(focus) ele.focus();
				return false;
			} 
			else return true;
		},
		// 判断select是否为空且选中的文本等于text,true便弹框alerttext文案
		requiredSelect : function(ele,alerttext,text){
			eleSelected = ele.find('option:selected');
			if(eleSelected.index() == 0 && eleSelected.html() != text){
				alert(alerttext);
				ele.focus();
				return false;
			}
			else return true;
		},
		//+-----------------------------------------------------------------
		//+ 功能： 正则验证
		//+ 接入参数： ele : 对象, type : 需验证的类型; alerttext : 弹出提示文本
		//+ 详解参数type:  mobile手机; phone固话; mobilephone手机+固话; zipcode邮编; 
		//+ 			   chinaid身份证; brithday生日日期
		//+-----------------------------------------------------------------
		basicReg : function(ele,type,alerttext){
			var reg = /^$/, text = '';
			switch(type){
				case 'mobile': 
					reg = /^1[3,4,5,7,8][0-9]{9}$/; 
					text = '请输入正确的手机号码'; break;
				case 'phone': 
					reg=/^((\d{3}|\d{4})-(\d{7}|\d{8}))|((\d{3}|\d{4})-(\d{7}|\d{8})-\d{4})$/; 
					text = '请输入正确的固定电话'; break;
				case 'mobilephone': 
					reg=/^(1[3,4,5,7,8][0-9]{9})|((\d{3}|\d{4})-(\d{7}|\d{8}))|((\d{3}|\d{4})-(\d{7}|\d{8})-\d{4})$/;
					text = '请输入正确的联系电话'; break;
				case 'zipcode': 
					reg=/^[1-9]\d{5}(?!\d)$/;
					text = '请输入正确的邮政编码'; break;
				case 'chinaid': 
					reg=/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
					text = '请输入正确的身份证号码'; break;
				case 'brithday':
					reg=/^(19[0-9]{2}||20[0-1][0-5])-([1-9]||0[1-9]||1[0-2])-([1-9]||0[1-9]||[1-2][0-9]||3[0-1])$/;
					text = '请输入正确的生日日期'; break;
				default:  return true;
			}
			if( reg.test(ele.val()) ){
				return true;	
			} else {
				text = alerttext == '' || typeof alerttext == undefined ? text : alerttext;
				alert(text);
				ele.focus();
				return false;
			}
		},
		// 模仿单选, 存在seld类便返回true; 不存在便弹框提示语
		seld : function(ele, alerttext){
			if( ele.hasClass('seld') ) return true;
			else{
				alert(alerttext);
				ele.focus();
				return false;
			} 
		}
		//+------------------------------------------------
		//+ 实际验证表单数据区域，可修改
		//+------------------------------------------------
		validateData : function(){
			if(
				this.isNullInput( $('#apply_name'), '请输入您的真实姓名。' )
				&& this.basicReg( $('#apply_chinaid'), 'chinaid', '请输入18位身份证号码。                                             身份证号码仅作天使行动核实申领用户真实身份，未征求您同意绝不会向第三方透漏。' )
				&& this.basicReg( $('#apply_birthyear'), 'brithday', '请根据格式2014-01-01（即YYYY-MM-DD）输入您的生日。' )
				&& tool.seld( $('.apply_sex'), '请选择您的性别，姐妹有机会获得意外惊喜哦~' )
				&& tool.seld( $('.sla-form-phase-container'), '请选择您的当前所处阶段' ) 
				&& this.baby(apply_gestation_sel)
				&& this.isNullInput( $('#apply_addr'), '请填写详细街道门牌地址以便快递小哥派件。', true )
				&& this.basicReg( $('#apply_mobile'), 'mobile', '请正确填写11位手机号码。' )
				&& this.isNullInput( $('#apply_code'), '请填写手机验证码' )
				&& tool.seld( $('.sla-form-shouzhe'), '同意申领守则才能提交申领哦~' )
			){
				return true;
			} else return false;
		},
		submitDemo : function(id){	// 提交实例，可修改使用
			var formDate = {
				'productid': id,
				'realname':  $('#realname').val(),
				'mobile':    $('#mobile').val(),
				'address':   $('#province').val()+'$$'+$('#city').val()+'$$'+$('#district').val()+'$$'+$('#address').val(),
				'zipcode':   $('#zipcode').val(),
				'reason':    $('#reason').val()
			}
			console.log(json);
			API.post(
				'shiyong/apply/apply.iframe', // _G.APIBaseURL自定义的全局地址
				formDate,
				function(data){
					console.log('error_code:'+data.error_code);
					alert('已成功提交。');
				},function(data){
					console.log(data.error_message);
				}
			)
		},
		//+-------------------------------------------
		//+ 功能： 获取省市区-seedit专用
		//+ 内容： 
		//+-------------------------------------------
		getSelectFirst : function(ele){	//获取select标签的第一个option
			if(ele[0].tagName.toLowerCase() != "select" ){ return "你提供的对象错误，请提供select"; }
			return "<option>" + ele.find("option:first-child").text() + "</option>";	
		},
		// PCD: province, city, district
		getPCD : function(areaId, ele, level){  //通过API获取省市区县，并写入到select下的option节点
												//参数（地区id，select对象，地区等级：1省级；2市级；3县级；4乡镇）
			var op = this.getSelectFirst(ele);
			API.get('bbs/common_district',{upid:areaId},function(data){
				$.each(data.data,function(name,value) {
					if(value.level == level){
						op += '<option pcdid="' + value.id + '">' +　value.name + '</option>';
						ele.html(op);
					}
			   });
			},function(data){
				console.log('oops!'+data.error_message);
			})
		}，
		setPCD : function(){
			/*  
				html必须要的省市区代码
				 |- wap版本html
				<span class="fl form-bg select form-pcd">
			        <select name="province" id="province" class="">
                        <option>省市..</option>
	                </select></span>
	            <span class="fl form-bg select form-pcd">
	            	<select name="city" id="city" class="">
	                    <option>城市..</option>
	                </select>
	            </span>
	            <span class="fl form-bg select form-pcd">
	            	<select name="district" id="district" class="">
	                    <option>区/县..</option>
	                </select>
	            </span>
				 |- pc版本html
	            <select name="province" id="province" class=""><option>省市..</option></select>
	            <select name="city" id="city" class=""><option>城市..</option></select>
	            <select name="district" id="district" class=""><option>区/县..</option></select>
	        */
			var provinceEle = $("#province");
			var cityEle = $("#city");
			var districtEle = $("#district");
			this.getPCD( 0, provinceEle, 1 );	// 加载省份
			provinceEle.change(function(){	// 监听省份，省份改变时更新城市、区县
				if($(this).find("option:selected").index() == 0) cityEle.html(cityEle); // ?忘了
				this.getPCD( $(this).find("option:selected").attr("pcdid"), cityEle, 2 ); // pcdid在getPCD函数里
				districtEle.html(this.getSelectFirst(districtEle)); // 选中城市后，区县初始化
			});
			cityEle.change(function(){	// 监听城市，城市改变时区县
				this.getPCD( $(this).find("option:selected").attr("pcdid"),districtEle,3 );	// 
			});
		}
    }



var jqTest = function(ele){
	var self = this;
	self.ele = ele;
	if( self.ele.substr(0,1) === "#" ){
		self.ele = document.getElementById( self.ele.substr(1) );
	}
	else if( self.ele.substr(0,1) === "." ){
		self.ele = document.getElementByTagName( self.ele.substr(1) );
	}
	self.show = function(){
		self.ele.style.display = "block";
	}
	self.hide = function(){
		self.ele.style.display = "none";
	}
	self.isShow = function(){
		if( self.ele.style.display == "none" || self.ele.style.display == "" ) { return true; }
		else { return false };
	}
	self.showHide = function(){
		self.ele.style.display == "" || self.ele.style.display == "none" ? 
			self.ele.style.display = "block" : self.ele.style.display = "none";
	}
	self.click = function( fun ){
		self.ele.onclick = function(){
			fun();
		}
	}
	return self;
}
window.onload = function(){
	(function($){
		console.log("start");
		$("#mddmBtn").click(function(){
			$("#mddm").showHide();
		})
	})(jqTest)
		
}


// 本地应用程序存储
	var storage = {
		isExist : function(fn){
			if(window.localStorage){
				if(fn) fn();
				else console.log("no function");
			}
			else console.log("This browser does NOT support localStorage");
		},
		set : function(id, value){
			this.isExist(function(){
				window.localStorage.setItem(id,value);
			});
		},
		get : function(id, fn){
			this.isExist(function(){
				var val = window.localStorage.getItem(id);
				console.log(val);
				if( typeof val != "undefined" ) return val;
				else {
					if(typeof fn == "Function") fn();
					else console.log("no function");
				}
			});
		}
	}