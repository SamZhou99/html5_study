class DrawCircle extends egret.Sprite {
	public constructor() {
		super();

		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdd, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
	}

	private shp: egret.Shape;
	private onAdd() {
		this.shp = new egret.Shape();
		this.addChild(this.shp);

		let i = 0;
		setInterval(()=>{
			this.dr(i);
			i++;
			if(i>=360){
				i=0;
			}
		},10);
	}
	private onRemove() {
		//
	}

	
	private dr(r){
		this.shp.graphics.clear();
		this.shp.graphics.lineStyle(4, 0x000000);
		// this.shp.graphics.beginFill(0x1122cc);
		this.shp.graphics.drawArc(100, 100, 100, 0, Math.PI/180*r, false);
		// this.shp.graphics.endFill();
		
	}

}