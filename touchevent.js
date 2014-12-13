var touchHandle = function (parent_name,threshold,callback_right,callback_left){
	var parent = document.getElementById(parent_name || 'Unknown');
	if(!parent)return;
	var self = this;
	self.threshold =  threshold || 100;
	self.trigger = false;
	var _callback_right = callback_right || function  (offsetX) {};
	var _callback_left = callback_left || function  (offsetX) {};
	

	//
	var touchStartHandler = function  (evt) {
		self.startX = evt.touches[0].pageX;
		self.offsetX = 0;
	};
	var go_right =0;var go_left =0;
	var touchMoveHandler = function  (evt) {
		evt.preventDefault();
		self.offsetX = evt.targetTouches[0].pageX - self.startX;
			go_right = self.offsetX - self.threshold;
			go_left =  self.offsetX + self.threshold;
			
			if(go_right>0){
				_callback_right(go_right);
			}else if(go_left < 0){
				_callback_left(-go_left);
			}
			if(go_right || go_left){
				self.trigger = true;
			}
	};
	var touchEndHandler = function  (evt) {
		evt.preventDefault();
		self.trigger = false;
	}
	parent.addEventListener('touchstart',function (e){
		//console.log('touchstart',e);
		touchStartHandler(e);
		},false);
	
	parent.addEventListener('touchmove',function (e){
		//console.log('touchmove');
		touchMoveHandler(e);
	},false);
	//
	parent.addEventListener('touchend',function (e){
		//console.log('touchend');
		touchEndHandler(e);
	},false);		

	//public method
	self.setCbRight = function  (callback_right) {
		_callback_right = callback_right || function  (offsetX) {};
	};
	self.setCbLeft = function  (callback_left) {
		_callback_left = callback_left || function  (offsetX) {};
	};
};