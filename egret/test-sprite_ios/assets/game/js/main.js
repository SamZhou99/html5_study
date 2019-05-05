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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var DrawCircle = (function (_super) {
    __extends(DrawCircle, _super);
    function DrawCircle() {
        var _this = _super.call(this) || this;
        _this.radius = 60;
        _this.coordinate = new egret.Point(200, 200);
        _this.lineColor = [0x00ff00, 0xffff00, 0xff0000];
        _this.angle = 0;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdd, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemove, _this);
        return _this;
    }
    DrawCircle.prototype.onAdd = function () {
        this.totalTime = 15; //360/totalTime/100
        this.angleTime = 1;
        this.angleTime = 360 / this.totalTime / 100;
        this.circleLine = new egret.Shape();
        this.addChild(this.circleLine);
        this.circleDot = new egret.Shape();
        this.addChild(this.circleDot);
        var size = this.radius * 2;
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
        this.timeTxt.touchEnabled = true;
        this.timeTxt.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        // this.startTime();
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    };
    DrawCircle.prototype.onRemove = function () {
        this.timeTxt.touchEnabled = false;
        this.timeTxt.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    };
    DrawCircle.prototype.onTouchTap = function () {
        console.log('点击了');
        this.addThisFilter();
    };
    DrawCircle.prototype.onEnterFrame = function () {
        this.drawArcLine(this.angle);
        this.moveCircleDot(this.angle);
        this.setTxt(String(1 + this.totalTime - Math.ceil(this.angle / 360 * this.totalTime)));
        this.angle += this.angleTime;
        if (this.angle >= 360) {
            this.angle = 0;
        }
    };
    DrawCircle.prototype.startTime = function () {
        var _this = this;
        var angle = 0;
        this.stopTime();
        this.temp = setInterval(function () {
            _this.drawArcLine(angle);
            _this.moveCircleDot(angle);
            _this.setTxt(String(1 + _this.totalTime - Math.ceil(angle / 360 * _this.totalTime)));
            angle += _this.angleTime;
            if (angle >= 360) {
                angle = 0;
            }
        }, 10);
    };
    DrawCircle.prototype.stopTime = function () {
        clearInterval(this.temp);
    };
    DrawCircle.prototype.drawArcLine = function (angle) {
        this.circleLine.graphics.clear();
        this.circleLine.graphics.lineStyle(6, this.getColor(angle));
        this.circleLine.graphics.drawArc(this.coordinate.x, this.coordinate.y, this.radius, 0, Math.PI / 180 * angle, true);
    };
    DrawCircle.prototype.drawCircleDot = function (angle) {
        this.circleDot.graphics.clear();
        this.circleDot.graphics.beginFill(this.getColor(angle));
        this.circleDot.graphics.drawCircle(this.coordinate.x, this.coordinate.y, 8);
        this.circleDot.graphics.endFill();
    };
    DrawCircle.prototype.moveCircleDot = function (angle) {
        this.drawCircleDot(angle);
        var radian = (2 * Math.PI / 360) * angle;
        this.circleDot.x = this.radius * Math.cos(radian);
        this.circleDot.y = this.radius * Math.sin(radian);
    };
    DrawCircle.prototype.setTxt = function (text) {
        if (!this.timeTxt) {
            return;
        }
        this.timeTxt.text = text;
    };
    DrawCircle.prototype.getColor = function (angle) {
        if (angle < 120) {
            return this.lineColor[0];
        }
        else if (angle < 240) {
            return this.lineColor[1];
        }
        return this.lineColor[2];
    };
    DrawCircle.prototype.addThisFilter = function () {
        console.log('addThisFilter');
        var color = 0x33CCFF; /// 光晕的颜色，十六进制，不包含透明度
        var alpha = 1; /// 光晕的颜色透明度，是对 color 参数的透明度设定。有效值为 0.0 到 1.0。例如，0.8 设置透明度值为 80%。
        var blurX = 10; /// 水平模糊量。有效值为 0 到 255.0（浮点）
        var blurY = 10; /// 垂直模糊量。有效值为 0 到 255.0（浮点）
        var strength = 4; /// 压印的强度，值越大，压印的颜色越深，而且发光与背景之间的对比度也越强。有效值为 0 到 255。暂未实现
        var quality = 3 /* HIGH */; /// 应用滤镜的次数，建议用 BitmapFilterQuality 类的常量来体现
        var inner = false; /// 指定发光是否为内侧发光，暂未实现
        var knockout = false; /// 指定对象是否具有挖空效果，暂未实现
        var glowFilter = new egret.GlowFilter(color, alpha, blurX, blurY, strength, quality, inner, knockout);
        this.filters = [glowFilter];
    };
    return DrawCircle;
}(egret.Sprite));
__reflect(DrawCircle.prototype, "DrawCircle");
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super.call(this) || this;
        _this.createView();
        return _this;
    }
    LoadingUI.prototype.createView = function () {
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.y = 300;
        this.textField.width = 480;
        this.textField.height = 100;
        this.textField.textAlign = "center";
    };
    LoadingUI.prototype.onProgress = function (current, total) {
        this.textField.text = "Loading..." + current + "/" + total;
    };
    return LoadingUI;
}(egret.Sprite));
__reflect(LoadingUI.prototype, "LoadingUI", ["RES.PromiseTaskReporter"]);
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
            context.onUpdate = function () {
            };
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        this.runGame().catch(function (e) {
            console.log(e);
        });
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        this.createGameScene();
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadingView, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        loadingView = new LoadingUI();
                        this.stage.addChild(loadingView);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload", 0, loadingView)];
                    case 2:
                        _a.sent();
                        this.stage.removeChild(loadingView);
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 创建游戏场景
     * Create a game scene
     */
    Main.prototype.createGameScene = function () {
        var c = new DrawCircle();
        this.addChild(c);
        var t = new TweenTest();
        this.addChild(t);
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
var DebugPlatform = (function () {
    function DebugPlatform() {
    }
    DebugPlatform.prototype.getUserInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, { nickName: "username" }];
            });
        });
    };
    DebugPlatform.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    return DebugPlatform;
}());
__reflect(DebugPlatform.prototype, "DebugPlatform", ["Platform"]);
if (!window.platform) {
    window.platform = new DebugPlatform();
}
var TweenTest = (function (_super) {
    __extends(TweenTest, _super);
    function TweenTest() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddEvent, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveEvent, _this);
        return _this;
    }
    TweenTest.prototype.onAddEvent = function (e) {
        var _this = this;
        this.drawRect();
        setInterval(function () {
            _this.tween();
        }, 1000);
    };
    TweenTest.prototype.onRemoveEvent = function (e) {
        //
    };
    TweenTest.prototype.drawRect = function () {
        this.shp = new egret.Shape();
        this.shp.graphics.beginFill(0x00ff00);
        this.shp.graphics.drawRect(0, 0, 100, 100);
        this.shp.graphics.endFill();
        // this.shp.x = 0;
        // this.shp.y = 0;
        this.addChild(this.shp);
    };
    TweenTest.prototype.tween = function () {
        var tw = egret.Tween.get(this.shp);
        tw.to({
            x: Math.random() * (this.stage.stageWidth - 100),
            y: Math.random() * (this.stage.stageHeight - 100)
        }, 300);
    };
    return TweenTest;
}(egret.Sprite));
__reflect(TweenTest.prototype, "TweenTest");
