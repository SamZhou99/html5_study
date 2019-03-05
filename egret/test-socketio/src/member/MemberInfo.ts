class MemberInfo extends eui.Component implements eui.UIComponent {

	private nicknameTxt: eui.Label;
	private moneyTxt: eui.Label;
	private headImg: eui.Image;
	private circle: egret.Shape;
	private background: egret.Shape;


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



	public setInfo(data: any) {
		this.nicknameTxt.text = data.nickName;
		this.moneyTxt.text = '￥:' + data.money;
	}





	private initUI() {
		let hr = this.headImg.width / 2
		let hx = this.headImg.x + hr;
		let hy = this.headImg.y + hr;

		this.initBackground();
		this.initCircle(hx, hy, hr);
		this.headImg.mask = this.circle;
	}

	private initCircle(x, y, r) {
		this.circle = new egret.Shape();
		this.circle.graphics.beginFill(0x0000ff);
		this.circle.graphics.drawCircle(x, y, r);
		this.circle.graphics.endFill();
		this.addChild(this.circle);
	}

	private initBackground() {
		this.background = new egret.Shape();
		this.background.graphics.beginFill(0x000000, 0.3);
		this.background.graphics.drawRoundRect(0, 0, this.width, this.height, 20, 20);
		this.background.graphics.endFill();
		this.addChildAt(this.background, 0);
	}

}