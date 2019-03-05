class MoneyPool extends eui.Component implements eui.UIComponent {

	private iconImg: eui.Image;
	private moneyTxt: eui.Label;


	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();

		this.initUI();
	}


	private initUI() {
		this.initBg();
	}

	private initBg() {
		let bg: egret.Shape = new egret.Shape();
		bg.graphics.beginFill(0x000000, 0.2);
		bg.graphics.drawRoundRect(0, 0, this.width, this.height, 10, 10);
		bg.graphics.endFill();
		this.addChildAt(bg, 0);
	}








}