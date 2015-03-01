/**
 * create by wangcl
 * time to 2014.07.07
 * repair to 2014.08.12
 */
 	
 	/**
	 * handlebars模板引擎，直接数据引入document文档
	 * version: 0.0.1
	 * 引入handlebars引擎 <script src="handlebars/1.3.0/dist/cjs/handlebars-1.0.0.beta.6.js"></script>
	 */
	var objHandle = {
		engine: Handlebars,    // 获取handlebars引擎
		loadEle: "",    // 数据需加载对象
		/**
		 * 自定义逻辑函数
		 */
		calcFn: function(){
			var self = this;
			self.engine.registerHelper("if",function(v1, operator, v2, options){
				v1 = Number(v1), v2 = Number(v2);
				switch (operator) {
					case '==':
						return (v1 == v2) ? options.fn(this) : options.inverse(this);
					case '!=':
						return (v1 != v2) ? options.fn(this) : options.inverse(this);
					case '===':
						return (v1 === v2) ? options.fn(this) : options.inverse(this);
					case '<':
						return (v1 < v2) ? options.fn(this) : options.inverse(this);
					case '<=':
						return (v1 <= v2) ? options.fn(this) : options.inverse(this);
					case '>':
						return (v1 > v2) ? options.fn(this) : options.inverse(this);
					case '>=':
						return (v1 >= v2) ? options.fn(this) : options.inverse(this);
					case '&&':
						return (v1 && v2) ? options.fn(this) : options.inverse(this);
					case '||':
						return (v1 || v2) ? options.fn(this) : options.inverse(this);
					default:
						return options.inverse(this);
				}
			});
		},
		/**
		 * 数据渲染层
		 */
		render: function(id, tempData, data){
			var self = this;
			if(id != "" && id != "undefined"){
				self.loadEle = document.getElementById(id);
			}
			var tempFn = self.engine.compile(tempData);
			self.calcFn();
			self.loadEle.innerHTML = tempFn(data);
		},
		renderAppend: function(id, tempData, data){
			var self = this;
			if(id != "" && id != "undefined"){
				self.loadEle = document.getElementById(id);
			}
			var tempFn = self.engine.compile(tempData);
			self.calcFn();
			self.loadEle.innerHTML = self.loadEle.innerHTML + tempFn(data);
		}
	}
	objHandle.render("hand",document.getElementById("handTemplate").innerHTML, json.list);
	objHandle.renderAppend("handappend",document.getElementById("handTemplate").innerHTML, json.list);

