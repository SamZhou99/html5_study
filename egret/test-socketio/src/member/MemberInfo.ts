class MemberInfo extends eui.Component implements eui.UIComponent {

	private nicknameTxt: eui.Label;
	private moneyTxt: eui.Label;
	private headImg: eui.Image;
	private circleShp: egret.Shape;
	private bgShp: egret.Shape;
	private arcShp: egret.Shape;
	private temp1: any;


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



	public setInfo(data: any): void {
		this.nicknameTxt.text = data.nickName;
		this.moneyTxt.text = '￥:' + data.money;
	}

	public startTime(): void {
		this.stopTime();
		let o = this.getXYR();
		let i = 0;
		this.temp1 = setInterval(() => {
			this.drawArc(o.x, o.y, o.r, i);
			i++;
		}, 10);
	}
	public stopTime(): void {
		clearInterval(this.temp1);
		if (this.arcShp) {
			this.arcShp.graphics.clear();
		}
	}



	private initUI(): void {
		let o = this.getXYR();
		this.initBackground();
		this.initCircle(o.x, o.y, o.r);
		this.headImg.mask = this.circleShp;
	}

	private initCircle(x, y, r): void {
		this.circleShp = new egret.Shape();
		this.circleShp.graphics.beginFill(0x0000ff);
		this.circleShp.graphics.drawCircle(x, y, r);
		this.circleShp.graphics.endFill();
		this.addChild(this.circleShp);
	}

	private initBackground(): void {
		this.bgShp = new egret.Shape();
		this.bgShp.graphics.beginFill(0x000000, 0.3);
		this.bgShp.graphics.drawRoundRect(0, 0, this.width, this.height, 20, 20);
		this.bgShp.graphics.endFill();
		this.addChildAt(this.bgShp, 0);
	}

	private drawArc(x: number, y: number, r: number, arc: number): void {
		if (!this.arcShp) {
			this.arcShp = new egret.Shape();
			this.arcShp.x = x;
			this.arcShp.y = y;
			this.addChild(this.arcShp);
		}
		this.arcShp.graphics.clear();
		this.arcShp.graphics.lineStyle(4, 0xFF3300);
		this.arcShp.graphics.drawArc(0, 0, r, 0, Math.PI / 180 * arc, true);
	}



	private getXYR(): any {
		let r = this.headImg.width / 2;
		let x = this.headImg.x + r;
		let y = this.headImg.y + r;
		return { r: r, x: x, y: y };
	}

}