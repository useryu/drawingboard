	
	//define shaps
	function Shap(){	
	}
	Shap.prototype.name="none";
	Shap.prototype.chname="未定义";
	Shap.prototype.startX=0;
	Shap.prototype.startY=0;
	Shap.prototype.board=null;
	Shap.prototype.ctx=null;
	Shap.prototype.selected=false;
	Shap.prototype.draw=function(){
		alert("you shuld overwrite draw function");
	}
	Shap.prototype.onselected=function(){
		//call back when the shap is selected
	}
	Shap.prototype.afterDraw=function(){
		this.board.redo=[];
	}
	Shap.prototype.rollback=function(){
		this.ctx.clearRect(0,0,this.board.width,this.board.height);
		var arr = this.board.hist;
		if(arr.length!=0){
			this.ctx.putImageData(arr[arr.length-1],0,0,0,0,this.board.width,this.board.height);
		}
	}

	function Line(board){
		this.board=board;this.ctx=this.board.canvasContext;
	}
	Line.prototype=new Shap();
	Line.prototype.name="line";
	Line.prototype.icon="line";
	Line.prototype.chname="直线";
	Line.prototype.mousedown=function(x,y){
		this.startX = x;
		this.startY = y;
	}
	Line.prototype.mousemove=function(x,y){
		this.rollback();
		this.draw(this.startX,this.startY,x,y);
	}
	Line.prototype.mouseup=function(x,y){
		
	}
	Line.prototype.draw=function(x,y,x1,y1){
		this.board.initContext();
		this.ctx.beginPath();
		this.ctx.moveTo(x,y);
		this.ctx.lineTo(x1,y1);
		this.ctx.stroke();
		this.afterDraw();
	}
	
	function Rect(board){
		this.board=board;this.ctx=this.board.canvasContext;
	}
	Rect.prototype=new Shap();
	Rect.prototype.name="rect";
	Rect.prototype.chname="矩形";
	Rect.prototype.mousedown=function(x,y){
		this.startX = x;
		this.startY = y;
	}
	Rect.prototype.mousemove=function(x,y){
		this.rollback();
		this.draw(this.startX,this.startY,x,y);
	}
	Rect.prototype.mouseup=function(x,y){
		
	}
	Rect.prototype.draw=function(x,y,x1,y1){
		this.board.initContext();
        this.ctx.beginPath();
        this.ctx.rect(x,y,x1-x,y1-y);
        if(this.board.settings.isStroke){
            this.ctx.stroke();
        }else{
            this.ctx.fill();
        }
        
        var bgCtx=this.board.bgCanvasContext;
        bgCtx.beginPath();
        bgCtx.rect(x+100,y+100,x1-x,y1-y);
        bgCtx.fill();
        
		this.afterDraw();
	}
	
	function Selector(board){
		this.board=board;this.ctx=this.board.canvasContext;
	}
	Selector.prototype=new Shap();
	Selector.prototype.name="selector";
	Selector.prototype.chname="选择";
	Selector.prototype.mousedown=function(x,y){
		this.startX = x;
		this.startY = y;
	}
	Selector.prototype.mousemove=function(x,y){
		this.rollback();
		this.draw(this.startX,this.startY,x,y);
	}
	Selector.prototype.mouseup=function(x,y){
		
	}
	Selector.prototype.draw=function(x,y,x1,y1){
		this.board.initContext();
        this.ctx.save();
        this.ctx.setLineDash([4,2]);
        this.ctx.beginPath();
        this.ctx.lineWidth=1;
        this.ctx.strokeStyle="#000";
        this.ctx.rect(x,y,x1-x,y1-y);
        this.ctx.stroke();
        this.ctx.restore();
		this.afterDraw();
	}
	
	function Circle(board){
		this.board=board;this.ctx=this.board.canvasContext;
	}
	Circle.prototype=new Shap();
	Circle.prototype.name="circle";
	Circle.prototype.chname="圆形";
	Circle.prototype.mousedown=function(x,y){
		this.startX = x;
		this.startY = y;
	}
	Circle.prototype.mousemove=function(x,y){
		this.rollback();
		this.draw(this.startX,this.startY,x,y);
	}
	Circle.prototype.mouseup=function(x,y){
		
	}
	Circle.prototype.draw=function(x,y,x1,y1){
		this.board.initContext();
		var r=Math.sqrt(Math.pow(x-x1,2)+Math.pow(y-y1,2));
        this.ctx.beginPath();
        this.ctx.arc(x,y,r,0,2*Math.PI);
        if(this.board.settings.isStroke){
            this.ctx.stroke();
        }else{
            this.ctx.fill();
        }
		this.afterDraw();
	}
	
	function Sector(board){
		this.board=board;this.ctx=this.board.canvasContext;
	}
	Sector.prototype=new Shap();
	Sector.prototype.name="sector";
	Sector.prototype.chname="扇形";
	Sector.prototype.percent=4;
	Sector.prototype.angle=180;
	Sector.prototype.mousedown=function(x,y){
		this.startX = x;
		this.startY = y;
	}
	Sector.prototype.mousemove=function(x,y){
		this.rollback();
		this.draw(this.startX,this.startY,x,y);
	}
	Sector.prototype.mouseup=function(x,y){
		
	}
	Sector.prototype.draw=function(x,y,x1,y1){
		this.board.initContext();
		var r=Math.sqrt(Math.pow(x-x1,2)+Math.pow(y-y1,2));
        this.ctx.beginPath();
        this.ctx.moveTo(x,y);
        this.ctx.arc(x,y,r,this.angle*Math.PI/180,this.percent*Math.PI/180);
		this.ctx.closePath();
        if(this.board.settings.isStroke){
            this.ctx.stroke();
        }else{
            this.ctx.fill();
        }
		this.afterDraw();
	}
	
	function FiveStar(board){
		this.board=board;this.ctx=this.board.canvasContext;
	}
	FiveStar.prototype=new Shap();
	FiveStar.prototype.name="fiveStar";
	FiveStar.prototype.chname="五角星";
	FiveStar.prototype.mousedown=function(x,y){
		this.startX = x;
		this.startY = y;
	}
	FiveStar.prototype.mousemove=function(x,y){
		this.rollback();
		this.draw(this.startX,this.startY,x,y);
	}
	FiveStar.prototype.mouseup=function(x,y){
		
	}
	FiveStar.prototype.draw=function(x,y,x1,y1){
		this.board.initContext();
		var r=Math.sqrt(Math.pow(x-x1,2)+Math.pow(y-y1,2));
        var ctx=this.board.canvasContext;
		ctx.save();
		ctx.beginPath();
		var dig=Math.PI/5*4;
		var _x=Math.sin(0);
		var _y=Math.cos(0);
		var _beginX=x+_x*r;
		var _beginY=y+_y*r;
		ctx.moveTo(_beginX,_beginY);
		for(var i=0;i<5;i++){
			_x=Math.sin(i*dig);
			_y=Math.cos(i*dig);
			ctx.lineTo(x+_x*r,y+_y*r);
		}
		ctx.lineTo(_beginX,_beginY);
		ctx.restore();
        if(this.board.settings.isStroke){
            this.ctx.stroke();
        }else{
            this.ctx.fill();
        }
		this.afterDraw();
	}
	
	function Poly(board){
		this.board=board;this.ctx=this.board.canvasContext;
	}
	Poly.prototype=new Shap();
	Poly.prototype.name="poly";
	Poly.prototype.chname="多边形";
	Poly.prototype.number=3;
	Poly.prototype.mousedown=function(x,y){
		this.startX = x;
		this.startY = y;
	}
	Poly.prototype.mousemove=function(x,y){
		this.rollback();
		this.draw(this.startX,this.startY,x,y);
	}
	Poly.prototype.mouseup=function(x,y){
		
	}
	Poly.prototype.draw=function(x,y,x1,y1){
		this.board.initContext();
        var r=Math.sqrt(Math.pow(x-x1,2)+Math.pow(y-y1,2));
        this.ctx.save();
        this.ctx.translate(x,y);
        this.ctx.rotate(Math.PI/2);
        var nx=r*Math.cos(Math.PI/this.number);
        var ny=r*Math.sin(Math.PI/this.number);
        this.ctx.beginPath();
        this.ctx.lineCap="round";
        this.ctx.moveTo(nx,ny);
        for(var i=0;i<=this.number;i++){
            this.ctx.rotate(Math.PI*2/this.number);
            this.ctx.lineTo(nx,-ny);
        }
        if(this.board.settings.isStroke){
            this.ctx.stroke();
        }else{
            this.ctx.fill();
        }
        this.ctx.restore();
		this.afterDraw();
	}
	
	function Pen(board){
		this.board=board;this.ctx=this.board.canvasContext;
	}
	Pen.prototype=new Shap();
	Pen.prototype.name="pen";
	Pen.prototype.chname="铅笔";
	Pen.prototype.mousedown=function(x,y){
		this.startX = x;
		this.startY = y;
		this.ctx.beginPath();
		this.ctx.moveTo(x,y);
	}
	Pen.prototype.mousemove=function(x,y){
		this.rollback();
		this.draw(this.startX,this.startY,x,y);
	}
	Pen.prototype.mouseup=function(x,y){
		
	}
	Pen.prototype.draw=function(x,y,x1,y1){
		this.board.initContext();
        this.ctx.save();
        this.ctx.lineCap="round";
        this.ctx.lineTo(x1,y1);
        this.ctx.stroke();
        this.ctx.restore();
		this.afterDraw();
	}
	
	function Eraser(board){
		this.board=board;this.ctx=this.board.canvasContext;
	}
	Eraser.prototype=new Shap();
	Eraser.prototype.name="eraser";
	Eraser.prototype.chname="橡皮擦";
	Eraser.prototype.size=10;
	Eraser.prototype.mousedown=function(x,y){
		this.draw(x-5,y-5,this.size,this.size);
	}
	Eraser.prototype.mousemove=function(x,y){
		this.draw(x-5,y-5,this.size,this.size);
	}
	Eraser.prototype.mouseup=function(x,y){
		
	}
	Eraser.prototype.draw=function(x,y,x1,y1){
		this.ctx.clearRect(x,y,x1,y1);
		this.afterDraw();
	}
	//end define shaps

