

function DrawingBoard(settings,canvas,bgCanvas){
	
	//default settings
	this.settings={};
    this.settings.fillColor=settings.fillColor || "#000";
    this.settings.strokeColor=settings.strokeColor || "#f00";
    this.settings.bgColor=settings.bgColor || "#fff";
    this.settings.lineSize=settings.lineSize || 1;
	this.settings.isStroke=settings.isStroke || true;
	
	//find canvas object, get context2d object
	this.canvas=canvas;
	this.bgCanvas=bgCanvas;
    var screenWidth=document.documentElement.clientWidth;
    var screenHeight=document.documentElement.clientHeight;
	this.width=screenWidth-295;
	this.height=screenHeight-15;
	canvas.width=this.width;
	canvas.height=this.height;
	bgCanvas.width=this.width;
	bgCanvas.height=this.height;
	this.canvasContext=canvas.getContext("2d");
	this.bgCanvasContext=bgCanvas.getContext("2d");
	this.hist=[];
	this.redo=[];
	
	//init canvas according to settings	
	this.initContext=function initContext(){
		this.canvasContext.strokeStyle=this.settings.strokeColor;
		this.canvasContext.fillStyle=this.settings.fillColor;
		this.canvasContext.lineWidth=this.settings.lineSize;
	}
	var line=new Line(this);
	var rect=new Rect(this);
	var circle=new Circle(this);
	var sector=new Sector(this);
	var fiveStar=new FiveStar(this);
	var poly=new Poly(this);
	var pen=new Pen(this);
	var eraser=new Eraser(this);
	var selector=new Selector(this);
	this.shaps=[line,rect,circle,sector,fiveStar,poly,pen,eraser,selector];
	this.currentShap=line;
	
	//init action buttons
	//define actions
	function Action(){	
	}
	Action.prototype.name="none";
	Action.prototype.chname="未定义";
	Action.prototype.selected=function(){
		alert("you shuld overwrite draw function");
	}

	function Create(board){
		this.board=board;
	}
	Create.prototype=new Action();
	Create.prototype.name="Create";
	Create.prototype.chname="新建";
	Create.prototype.selected=function(){
		this.board.hist=[];
		this.board.canvasContext.clearRect(0,0,this.board.width,this.board.height);
	}
	
	function Clear(board){
		this.board=board;
	}
	Clear.prototype=new Action();
	Clear.prototype.name="Clear";
	Clear.prototype.chname="清除";
	Clear.prototype.selected=function(){
		this.board.hist=[];
		this.board.canvasContext.clearRect(0,0,this.board.width,this.board.height);
	}
	
	function Undo(board){
		this.board=board;
	}
	Undo.prototype=new Action();
	Undo.prototype.name="Undo";
	Undo.prototype.chname="撤消";
	Undo.prototype.selected=function(){
		var arr = this.board.hist;
		if(arr.length>0){
			var undoItem = arr.pop();
			this.board.redo.push(undoItem);
			this.board.canvasContext.clearRect(0,0,this.board.width,this.board.height);
			if(arr.length>0){
				this.board.canvasContext.putImageData(arr[arr.length-1],0,0,0,0,this.board.width,this.board.height);
			}
		}
	}
	
	function Redo(board){
		this.board=board;
	}
	Redo.prototype=new Action();
	Redo.prototype.name="Redo";
	Redo.prototype.chname="重做";
	Redo.prototype.selected=function(){
		var arr = this.board.redo;
		if(arr.length>0){
			var redoItem = arr.pop();
			this.board.hist.push(redoItem);
			this.board.canvasContext.clearRect(0,0,this.board.width,this.board.height);
			this.board.canvasContext.putImageData(redoItem,0,0,0,0,this.board.width,this.board.height);
		}
	}
	
	function Save(board){
		this.board=board;
	}
	Save.prototype=new Action();
	Save.prototype.name="Save";
	Save.prototype.chname="保存";
	Save.prototype.selected=function(){
		var reg=this.board.canvas.toDataURL("image/png");
		location.href=reg;
	}
	
	function Select(board){
		this.board=board;
	}
	Select.prototype=new Action();
	Select.prototype.name="Select";
	Select.prototype.chname="选择";
	Select.prototype.selected=function(){
		this.board.initContext();
        this.board.canvasContext.save();
        this.board.canvasContext.setLineDash([4,2]);
        this.board.canvasContext.beginPath();
        this.board.canvasContext.lineWidth=1;
        this.board.canvasContext.rect(x,y,x1-x,y1-y);
        this.board.canvasContext.stroke();
        this.board.canvasContext.restore();
	}
	
	function Cut(board){
		this.board=board;
	}
	Cut.prototype=new Action();
	Cut.prototype.name="Cut";
	Cut.prototype.chname="剪切";
	Cut.prototype.selected=function(){
		this.board.hist=[];
		this.board.canvasContext.clearRect(0,0,this.board.width,this.board.height);
	}
	
	function Copy(board){
		this.board=board;
	}
	Copy.prototype=new Action();
	Copy.prototype.name="Copy";
	Copy.prototype.chname="复制";
	Copy.prototype.selected=function(){
		
	}
	
	var create = new Create(this);
	var clear = new Clear(this);
	var undo = new Undo(this);
	var redo = new Redo(this);
	var selectAction = new Select(this);
	var save = new Save(this);
	var cut = new Cut(this);
	var copy = new Copy(this);
	this.actions=[create,clear,undo,redo,save,selectAction,cut,copy];

}
