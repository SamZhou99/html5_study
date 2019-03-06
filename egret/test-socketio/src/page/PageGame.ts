class PageGame extends eui.Component implements eui.UIComponent {
	

	private pkCoArr = [
		{ x: 273, y: 0 },
		{ x: 566, y: 190 },
		{ x: 566, y: 400 },
		{ x: 566, y: 610 },
		{ x: 283, y: 786 },
		{ x: 0, y: 610 },
		{ x: 0, y: 400 },
		{ x: 0, y: 190 }
	];

	private userCoArr = [
		{ x: 273, y: 8 },
		{ x: 540, y: 190 },
		{ x: 540, y: 400 },
		{ x: 540, y: 610 },
		{ x: 273, y: 786 },
		{ x: 8, y: 610 },
		{ x: 8, y: 400 },
		{ x: 8, y: 190 }
	];

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
		this.initPK();
		this.initMember();
		this.initMoneyPool();
	}

	private initPK() {
		for (let i = 1; i <= 5; i++) {
			var txtr: egret.Texture = RES.getRes("pk_json#a" + common.utils.GetFillZero(i));
			var img: egret.Bitmap = new egret.Bitmap(txtr);
			img.scaleX = img.scaleY = 0.5;
			img.x = i * 80 + 40;
			img.y = 400;
			this.addChild(img);
		}
	}

	private initMember() {
		for (let i = 0; i < 8; i++) {
			let item = this.userCoArr[i];
			let memberInfo: MemberInfo = new MemberInfo();
			memberInfo.x = item.x;
			memberInfo.y = item.y;
			this.addChild(memberInfo);

			memberInfo.setInfo({ nickName: common.utils.GetRandomName(), money:Math.floor(Math.random()*999999) });
			memberInfo.startTime();
		}
	}


	private initMoneyPool() {
		let moneyPool:MoneyPool = new MoneyPool();
		this.addChild(moneyPool);

		moneyPool.x = (this.width - moneyPool.width) * 0.5;
		moneyPool.y = 200;
	}




}