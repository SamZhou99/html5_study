class MainEvent extends egret.Event {
	public static DIS:egret.EventDispatcher = new egret.EventDispatcher();

	public static SHOW_ALERT:string = 'show_alert';
	public static CLOSE_ALERT:string = 'close_alert';

	public static SHOW_GAME_PAGE:string = 'show_game_page';
	public static SHOW_LOGIN_PAGE:string = 'show_login_page';


	public parameter:any;

	public constructor(type: string, parameter:any) {
		let bubbles:boolean = false;
		let cancelable:boolean = false;

		super(type, bubbles, cancelable);
		this.parameter = parameter;
	}
}