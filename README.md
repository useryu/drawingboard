# drawingboard
a Html5 canvas based drawing board

How to define your own shap?
1.  Open shaps.js, extend Shap, see the example below.
2.  Open drawingboard.js,  add new shap: var fiveStar=new FiveStar(this);this.shaps=[line,rect,circle,sector,poly,pen,eraser,fiveStar];
    
	function FiveStar(board){
		this.board=board;this.ctx=this.board.bgCanvasContext;
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
        var ctx=this.ctx;
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
        if(this.board.settings.fillType=="stroke"){
            this.ctx.stroke();
        }else if(this.board.settings.fillType=="fill"){
            this.ctx.fill();
        }else{
        	this.ctx.stroke();
        	this.ctx.fill();
        }
        ctx.restore();
		this.afterDraw();
	}
	
