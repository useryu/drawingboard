var settings={};
var canvas=document.getElementById("pan");
var bgCanvas=document.getElementById("bgpan");
var border=document.getElementById("border");
var db=new DrawingBoard(settings,canvas,bgCanvas,border);
var vm = new Vue({
  el: '#app',
  data: {db:db},
  created: function () {
  },
  methods: {
    clickShap: function (shap) {
		this.db.currentShap=shap;
		shap.onselected();
    },
	setStroke: function(fillType){
		this.db.settings.fillType=fillType;
	},
	clickAction: function(action){
		action.selected();
	}
  }
})


canvas.onmousedown=function(e){
	var x=e.offsetX;
	var y=e.offsetY;
	vm.db.currentShap.mousedown(x,y);
	canvas.onmousemove=function(e){
		var x=e.offsetX;
		var y=e.offsetY;
		vm.db.currentShap.mousemove(x,y);
	}
	document.onmouseup=function(e){
		canvas.onmousemove=null;
		document.onmouseup=null;
		var x=e.offsetX;
		var y=e.offsetY;
		vm.db.currentShap.mouseup(x,y);
		vm.db.hist.push(vm.db.bgCanvasContext.getImageData(0,0,vm.db.width,vm.db.height));
	}
}
