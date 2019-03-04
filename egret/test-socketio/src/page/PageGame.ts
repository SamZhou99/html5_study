class PageGame extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();

		this.initUI();
	}





	private initUI(){
		var txtr: egret.Texture = RES.getRes("pk_json#a01");
		var img: egret.Bitmap = new egret.Bitmap(txtr);
		img.scaleX = img.scaleY = 0.5;
		this.addChild(img);
	}






	
}