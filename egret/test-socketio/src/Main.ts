class Main extends eui.UILayer {

    private pageSp:egret.Sprite

    protected createChildren(): void {
        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());


        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene();
        const result = await RES.getResAsync("description_json")
        // this.startAnimation(result);
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);

    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await this.loadTheme();
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);

        })
    }

    private textfield: egret.TextField;
    /**
     * 创建场景界面
     * Create scene interface
     */
    protected createGameScene(): void {
        // let sky = this.createBitmapByName("bg01_jpg");
        // this.addChild(sky);
        // let stageW = this.stage.stageWidth;
        // let stageH = this.stage.stageHeight;
        // sky.width = stageW;
        // sky.height = stageH;

        // let topMask = new egret.Shape();
        // topMask.graphics.beginFill(0x000000, 0.5);
        // topMask.graphics.drawRect(0, 0, stageW, 172);
        // topMask.graphics.endFill();
        // topMask.y = 33;
        // this.addChild(topMask);

        // let icon: egret.Bitmap = this.createBitmapByName("egret_icon_png");
        // this.addChild(icon);
        // icon.x = 26;
        // icon.y = 33;

        // let line = new egret.Shape();
        // line.graphics.lineStyle(2, 0xffffff);
        // line.graphics.moveTo(0, 0);
        // line.graphics.lineTo(0, 117);
        // line.graphics.endFill();
        // line.x = 172;
        // line.y = 61;
        // this.addChild(line);


        // let colorLabel = new egret.TextField();
        // colorLabel.textColor = 0xffffff;
        // colorLabel.width = stageW - 172;
        // colorLabel.textAlign = "center";
        // colorLabel.text = "Hello Egret";
        // colorLabel.size = 24;
        // colorLabel.x = 172;
        // colorLabel.y = 80;
        // this.addChild(colorLabel);

        // let textfield = new egret.TextField();
        // this.addChild(textfield);
        // textfield.alpha = 0;
        // textfield.width = stageW - 172;
        // textfield.textAlign = egret.HorizontalAlign.CENTER;
        // textfield.size = 24;
        // textfield.textColor = 0xffffff;
        // textfield.x = 172;
        // textfield.y = 135;
        // this.textfield = textfield;

        // let button = new eui.Button();
        // button.label = "Click!";
        // button.horizontalCenter = 0;
        // button.verticalCenter = 0;
        // this.addChild(button);
        // button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);

        this.pageSp = new egret.Sprite();
        this.addChild(this.pageSp);

        this.initEvent();
        this.initSocketIO();
        MainEvent.DIS.dispatchEvent(new MainEvent(MainEvent.SHOW_LOGIN_PAGE, {}));
        // MainEvent.DIS.dispatchEvent(new MainEvent(MainEvent.SHOW_GAME_PAGE, {}));

    }
    // /**
    //  * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
    //  * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
    //  */
    // private createBitmapByName(name: string): egret.Bitmap {
    //     let result = new egret.Bitmap();
    //     let texture: egret.Texture = RES.getRes(name);
    //     result.texture = texture;
    //     return result;
    // }
    // /**
    //  * 描述文件加载成功，开始播放动画
    //  * Description file loading is successful, start to play the animation
    //  */
    // private startAnimation(result: Array<any>): void {
    //     let parser = new egret.HtmlTextParser();

    //     let textflowArr = result.map(text => parser.parse(text));
    //     let textfield = this.textfield;
    //     let count = -1;
    //     let change = () => {
    //         count++;
    //         if (count >= textflowArr.length) {
    //             count = 0;
    //         }
    //         let textFlow = textflowArr[count];

    //         // 切换描述内容
    //         // Switch to described content
    //         textfield.textFlow = textFlow;
    //         let tw = egret.Tween.get(textfield);
    //         tw.to({ "alpha": 1 }, 200);
    //         tw.wait(2000);
    //         tw.to({ "alpha": 0 }, 200);
    //         tw.call(change, this);
    //     };

    //     change();
    // }

    // /**
    //  * 点击按钮
    //  * Click the button
    //  */
    // private onButtonClick(e: egret.TouchEvent) {
    //     MainEvent.DIS.dispatchEvent(new MainEvent(MainEvent.SHOW_ALERT, {text:'Title'}));
    // }





    

    private initEvent(){
        MainEvent.DIS.addEventListener(MainEvent.SHOW_ALERT, this.showAlert, this);
        MainEvent.DIS.addEventListener(MainEvent.CLOSE_ALERT, this.closeAlert, this);
        MainEvent.DIS.addEventListener(MainEvent.SHOW_LOGIN_PAGE, this.showLoginPage, this);
        MainEvent.DIS.addEventListener(MainEvent.SHOW_GAME_PAGE, this.showGamePage, this);
    }

    private panel:eui.Panel;
    private showAlert(e:MainEvent){
        this.panel = new eui.Panel();
        this.panel.title = e.parameter.text;
        this.panel.horizontalCenter = 0;
        this.panel.verticalCenter = 0;
        this.addChild(this.panel);
    }
    private closeAlert(){
        if(this.panel){
            this.removeChild(this.panel);
            this.panel = null;
        }
    }

    private loginPage:PageStart = new PageStart();
    private gamePage:PageGame = new PageGame();

    private showLoginPage(e:MainEvent):void{
        this.clearPage();
        this.pageSp.addChild(this.loginPage);
    }
    private showGamePage(e:MainEvent):void{
        this.clearPage();
        this.pageSp.addChild(this.gamePage);
    }
    private clearPage():void{
        let len = this.pageSp.numChildren;
        for(let i=len-1;i>=0;i--){
            this.pageSp.removeChildAt(i);
        }
    }


    private socket;
    private initSocketIO(){
        var self = this;
        this.socket = io.connect('http://127.0.0.1:3000/room');
        this.socket.on('connect', ()=>{
            MainEvent.DIS.dispatchEvent(new MainEvent(MainEvent.SHOW_ALERT, {text:'链接成功'}));
        });
        this.socket.on('disconnect',()=>{
            MainEvent.DIS.dispatchEvent(new MainEvent(MainEvent.SHOW_ALERT, {text:'链接断开'}));
        });
        this.socket.on('error',()=>{
            MainEvent.DIS.dispatchEvent(new MainEvent(MainEvent.SHOW_ALERT, {text:'链接失败'}));
        });
        

        this.socket.on('news', function (data) {
            self.trace("receive message: " + data);
        });
        this.socket.on('self_info', (data)=>{
            self.trace(data);
        });

        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            self.joinRoom("a123");
        }, this);
    }
    private joinRoom(roomId:string):void {
        this.socket.emit("join", {roomId:roomId});
    }

    private trace(msg:string):void {
        console.log(msg);
    }





}
