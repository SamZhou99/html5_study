class PageStart extends eui.Component implements eui.UIComponent {

	private nickname_txt: eui.TextInput;
	private start_btn: eui.Button;

	public constructor() {
		super();
		console.log('111', this);
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
		console.log('222', this);
	}

	protected childrenCreated(): void {
		super.childrenCreated();
		console.log('333', this);
		this.init();
	}

	protected partRemoved(partName: string, instance: any): void {
		super.partRemoved(partName, instance);
		console.log('444');
	}




	private init() {
		this.nickname_txt.prompt = '提示文字';
		this.start_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
	}
	private onTouchTap() {
		let nickName = this.nickname_txt.text.trim();
		if(!nickName){
			MainEvent.DIS.dispatchEvent(new MainEvent(MainEvent.SHOW_ALERT, {text:'请填写昵称'}));
			return ;
		}
		
		MainEvent.DIS.dispatchEvent(new MainEvent(MainEvent.SHOW_GAME_PAGE, {}));
	}



}