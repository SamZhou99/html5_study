var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var PageStart = (function (_super) {
    __extends(PageStart, _super);
    function PageStart() {
        var _this = _super.call(this) || this;
        console.log('111', _this);
        return _this;
    }
    PageStart.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
        console.log('222', this);
    };
    PageStart.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        console.log('333', this);
        this.init();
    };
    PageStart.prototype.partRemoved = function (partName, instance) {
        _super.prototype.partRemoved.call(this, partName, instance);
        console.log('444');
    };
    PageStart.prototype.init = function () {
        this.nickname_txt.prompt = '提示文字';
        this.start_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    PageStart.prototype.onTouchTap = function () {
        var nickName = this.nickname_txt.text.trim();
        if (!nickName) {
            MainEvent.DIS.dispatchEvent(new MainEvent(MainEvent.SHOW_ALERT, { text: '请填写昵称' }));
            return;
        }
        MainEvent.DIS.dispatchEvent(new MainEvent(MainEvent.SHOW_GAME_PAGE, {}));
    };
    return PageStart;
}(eui.Component));
__reflect(PageStart.prototype, "PageStart", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=PageStart.js.map