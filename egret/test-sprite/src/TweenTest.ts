class TweenTest extends egret.Sprite {

	private shp: egret.Shape;


	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddEvent, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveEvent, this);
	}

	private onAddEvent(e: egret.Event): void {
		this.drawRect();
		setInterval(() => {
			this.tween();
		}, 1000);
	}
	private onRemoveEvent(e: egret.Event): void {
		//
	}

	private drawRect() {
		this.shp = new egret.Shape();
		this.shp.graphics.beginFill(0x00ff00);
		this.shp.graphics.drawRect(0, 0, 100, 100);
		this.shp.graphics.endFill();
		// this.shp.x = 0;
		// this.shp.y = 0;
		this.addChild(this.shp);
	}

	private tween() {
		var tw = egret.Tween.get(this.shp);
		tw.to({
			x: Math.random() * (this.stage.stageWidth-100),
			y: Math.random() * (this.stage.stageHeight-100)
		}, 300);
	}



}