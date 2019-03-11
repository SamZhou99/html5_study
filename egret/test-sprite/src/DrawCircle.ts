class DrawCircle extends egret.Sprite {

	private temp;
	private circleLine: egret.Shape;
	private circleDot: egret.Shape;
	private radius = 60;
	private coordinate: egret.Point = new egret.Point(200, 200);
	private lineColor = [0x00ff00, 0xffff00, 0xff0000];
	private timeTxt: egret.TextField;
	private totalTime: number;
	private angleTime: number;


	public constructor() {
		super();

		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdd, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
	}

	private onAdd() {
		this.totalTime = 15; //360/totalTime/100
		this.angleTime = 1;
		this.angleTime = 360 / this.totalTime / 100;

		this.circleLine = new egret.Shape();
		this.addChild(this.circleLine);

		this.circleDot = new egret.Shape();
		this.addChild(this.circleDot);

		let size = this.radius * 2;
		this.timeTxt = new egret.TextField();
		this.timeTxt.size = 60;
		this.timeTxt.width = this.timeTxt.height = size;
		this.timeTxt.textAlign = egret.HorizontalAlign.CENTER;
		this.timeTxt.verticalAlign = egret.VerticalAlign.MIDDLE;
		this.timeTxt.x = this.coordinate.x - size * 0.5;
		this.timeTxt.y = this.coordinate.y - size * 0.5;
		// this.timeTxt.background = true;
		// this.timeTxt.backgroundColor = 0x333333;
		this.addChild(this.timeTxt);


		var color: number = 0x33CCFF;        /// 光晕的颜色，十六进制，不包含透明度
		var alpha: number = 1;             /// 光晕的颜色透明度，是对 color 参数的透明度设定。有效值为 0.0 到 1.0。例如，0.8 设置透明度值为 80%。
		var blurX: number = 10;              /// 水平模糊量。有效值为 0 到 255.0（浮点）
		var blurY: number = 10;              /// 垂直模糊量。有效值为 0 到 255.0（浮点）
		var strength: number = 4;            /// 压印的强度，值越大，压印的颜色越深，而且发光与背景之间的对比度也越强。有效值为 0 到 255。暂未实现
		var quality: number = egret.BitmapFilterQuality.HIGH;        /// 应用滤镜的次数，建议用 BitmapFilterQuality 类的常量来体现
		var inner: boolean = false;            /// 指定发光是否为内侧发光，暂未实现
		var knockout: boolean = false;            /// 指定对象是否具有挖空效果，暂未实现

		var glowFilter: egret.GlowFilter = new egret.GlowFilter(color, alpha, blurX, blurY, strength, quality, inner, knockout);
		this.filters = [glowFilter];

		this.startTime();
	}

	private onRemove() {
		//
	}

	private startTime() {


		let angle = 0;
		this.stopTime();
		this.temp = setInterval(() => {
			this.drawArcLine(angle);
			this.moveCircleDot(angle);
			this.setTxt(String(1 + this.totalTime - Math.ceil(angle / 360 * this.totalTime)));
			angle += this.angleTime;
			if (angle >= 360) {
				angle = 0;
			}
		}, 10);
	}

	private stopTime() {
		clearInterval(this.temp);
	}

	private drawArcLine(angle) {
		this.circleLine.graphics.clear();
		this.circleLine.graphics.lineStyle(6, this.getColor(angle));
		this.circleLine.graphics.drawArc(this.coordinate.x, this.coordinate.y, this.radius, 0, Math.PI / 180 * angle, true);
	}

	private drawCircleDot(angle) {
		this.circleDot.graphics.clear();
		this.circleDot.graphics.beginFill(this.getColor(angle));
		this.circleDot.graphics.drawCircle(this.coordinate.x, this.coordinate.y, 8);
		this.circleDot.graphics.endFill();
	}

	private moveCircleDot(angle) {
		this.drawCircleDot(angle);
		var radian = (2 * Math.PI / 360) * angle;
		this.circleDot.x = this.radius * Math.cos(radian);
		this.circleDot.y = this.radius * Math.sin(radian);
	}

	private setTxt(text: string) {
		if (!this.timeTxt) {
			return;
		}
		this.timeTxt.text = text;
	}

	private getColor(angle) {
		if (angle < 120) {
			return this.lineColor[0];
		} else if (angle < 240) {
			return this.lineColor[1];
		}

		return this.lineColor[2];
	}

}