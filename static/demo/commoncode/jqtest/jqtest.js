var jqTest = function(ele){
	var self = this;
	self.ele = ele;
	self.eleArr = [];
		self.eleArr = self.ele.split(" ");
		for( var i in self.eleArr ){
			console.log(self.eleArr[i]);
			if(i==0) self.ele = document;
			console.log(":::::::"+self.eleArr[i].substr(0,1));
			switch( self.eleArr[i].substr(0,1) ){
				case "#": 
					self.ele = self.ele.getElementById( self.eleArr[i].substr(1) ); break;
				case ".": 
					self.ele = self.ele.getElementsByClassName( self.eleArr[i].substr(1) ); break;
				default: 
					self.ele = self.ele.getElementsByTagName( self.eleArr[i] ); break;
			}
		}
	self.show = function(){
		self.ele.style.display = "block";
	}
	self.hide = function(){
		self.ele.style.display = "none";
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
	self.css = function( type, value ){
		if( value == "" || value == null ){
			return eval( "self.ele.style." + type );
		}
		else {
			eval( "self.ele.style." + type + "=" + value );
		}
	}
	self.attr = function(type, value){
		if( value == "" || value == null ){
			return self.ele.getAttribute(type);
		}
		else {
			self.ele.setAttribute(type, value);
		}
	}

	self.html = function(html){
		self.ele.innerHTML = html;
	}
	return self;
}