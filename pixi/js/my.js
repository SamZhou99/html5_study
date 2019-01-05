var my = {
	init(backgroundColor=0x000000){
		var app = new PIXI.Application(1, 1, {
			backgroundColor : backgroundColor,
			antialias: true,
			transparent: false
		});
		app.renderer.autoResize = true;
		app.renderer.resize(window.innerWidth, window.innerHeight);
		document.body.appendChild(app.view);
		return app;
	},
	load(assetUrlArr, completeEvent){
		if (!assetUrlArr) { return; }
		if (!completeEvent) { return; }

		if (assetUrlArr.length <= 0) { completeEvent();return; }

		PIXI.loader.add(assetUrlArr).load((loader, resources)=>{
			completeEvent(loader, resources);
		});
	}
};