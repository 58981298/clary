(function(window){
	var PageView = function(){
		console.log("pageasdf");
	}
	console.log( exports );
	if( typeof define === "function" ){
		define(function(){
			return PageView;
		});
	} else {
		window.PageView = PageView;
	}
})(function(){
	return this || window;
}())