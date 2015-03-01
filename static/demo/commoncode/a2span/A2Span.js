/**
 * create by wangcl
 * time to 2014.06.15
 */

	/**
	 * 点击前是<a>-click，点击后是<span>-text并执行自定义函数，执行后是<a>-click
	 * version: 0.0.1
	 * modify: new file
	 */
	var A2Span = function(id){
 		var self = this;
 		this.id = id;
 		this.wrap = null; // document.getElementById(id),获取id对象;
 		this.aText = "加载更多...";
 		this.spanText = "加载中...";
 		this.status = 1; // 1可点击，0不可点击
 		/**
 		 * 外部onclick处理完后，回调内置sendCallback
 		 */
 		this.sendCallback = function(){
 			self.status = 1;
 			self.render();
 		};
 		/**
		 * 外部直接触发onclick，处理实际需求事件
		 */
 		this.do_onclick = function(){};
 		/**
		 * 外部onclick，处理实际需求事件
		 */
 		this.onclick = function(getCallback){};
 		/**
		 * 内部onclick，处理(<a> to <span>) or (<span> to <a>)的渲染
		 */
 		this._onclick = function(){
 			self.status = 0;
 			self.render();
 			self.onclick(self.sendCallback);
 		};
 		/**
		 * A2Span渲染层
		 */
 		this.render = function(){
 			if( self.id != undefined && self.id != "" ){
 				self.wrap = document.getElementById( self.id ); 
 			}
 			var html = '';
 			if( self.status == 1 ){
 				html += '<a id="a2spanId" href="javascript:void(0)">' + self.aText +'</a>';
 			} else if( self.status == 0 ){
 				html += '<span>' + self.spanText +'</span>';
 			}
 			self.wrap.innerHTML = html;
 			if( self.status == 1 ){
 				document.getElementById('a2spanId').onclick = function(){
 					self._onclick();
 				}
 				self.do_onclick = self._onclick;
 			} else self.do_onclick = function(){ return false; }

 		};
 	}

 	/**
	 * 实例
	 */
 	var aspan = new A2Span('a2span');
 	aspan.aText = "我是点击前前前前的文字";
		aspan.spanText = "我是点击后后后后的文字";
 	aspan.onclick = function(getCallback){
 		console.log(1232133);
 		//getCallback();
 		setTimeout(function(){ getCallback(); },1000);
 	}
 	aspan.render();


 	/**
	 * 点击前是<a>-click，点击后是<span>-text并执行自定义函数，执行后是<a>-click
	 * version: 0.0.2
	 * modify: 新增外部直接触发onclick事件,修正onclick对象的获取方式（从id变成tagname）
	 */
	var A2Span = function(id){
 		var self = this;
 		this.id = id;
 		this.wrap = null; // document.getElementById(id),获取id对象;
 		this.aText = "加载更多...";
 		this.spanText = "加载中...";
 		this.status = 1; // 1可点击，0不可点击
 		/**
 		 * 外部onclick处理完后，回调内置sendCallback
 		 */
 		this.sendCallback = function(){
 			self.status = 1;
 			self.render();
 		};
 		/**
		 * 外部直接触发onclick，处理实际需求事件
		 */
 		this.do_onclick = function(){
 			return false;
 		};
 		/**
		 * 外部onclick，处理实际需求事件
		 */
 		this.onclick = function(getCallback){};
 		/**
		 * 内部onclick，处理(<a> to <span>) or (<span> to <a>)的渲染
		 */
 		this._onclick = function(){
 			self.status = 0;
 			self.render();
 			self.do_onclick = function(){ return false; };
 			self.onclick(self.sendCallback);
 		};
 		/**
		 * A2Span渲染层
		 */
 		this.render = function(){
 			if( self.id != undefined && self.id != "" ){
 				self.wrap = document.getElementById( self.id ); 
 			}
 			var html = '';
 			if( self.status == 1 ){
 				html += '<a href="javascript:void(0)">' + self.aText +'</a>';
 			} else if( self.status == 0 ){
 				html += '<span>' + self.spanText +'</span>';
 			}
 			self.wrap.innerHTML = html;
 			if( self.status == 1 ){
 				self.wrap.getElementsByTagName('a')[0].onclick = function(){
 					self._onclick();
 				}
 				self.do_onclick = function(){ self.wrap.getElementsByTagName('a')[0].click() };
 			} else self.do_onclick = function(){ return false; }
 		};
 	}

 	/**
	 * 实例
	 */
 	var aspan = new A2Span('a2span');
 	aspan.aText = "我是点击前前前前的文字";
		aspan.spanText = "我是点击后后后后的文字";
 	aspan.onclick = function(getCallback){
 		console.log(1232133);
 		//getCallback();
 		setTimeout(function(){ getCallback(); },1000);
 	}
 	aspan.render();
 	aspan.do_onclick();  // 外部直接触发onclick，处理实际需求事件