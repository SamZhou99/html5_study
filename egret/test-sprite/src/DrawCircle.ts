class DrawCircle extends egret.Sprite {
	public constructor() {
		super();

		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdd, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
	}

	private onAdd() {
		var shp: egret.Shape = new egret.Shape();
		shp.graphics.beginFill(0x1122cc);
		shp.graphics.drawArc(200, 200, 100, 0, 0.7853981633974483, true);
		shp.graphics.endFill();
		this.addChild(shp);
	}
	private onRemove() {
		//
	}



}