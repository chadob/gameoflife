const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");

	gameEngine.init(ctx);
	

	let submitButton = document.getElementById("submitSettings");
	submitButton.addEventListener("click", ()=> {
		let initColor = parseInt(document.getElementById("initialColor").value, 10);
		let colorStep = parseInt(document.getElementById("colorStep").value, 10);
		let percentSpawn = parseInt(document.getElementById("percentSpawn").value, 10);
		let width = parseInt(document.getElementById("width").value, 10);
		let height = parseInt(document.getElementById("height").value, 10);
		console.log("Initial Color: " + initColor)
		console.log("Color Step: " + colorStep)
		console.log("Chance of square spawn: " + percentSpawn)
		console.log("Width: " + width)
		console.log("Height: " + height)
		document.getElementById("initSettings").remove();
		gameEngine.addEntity(new Automata(gameEngine, initColor, colorStep, percentSpawn, width, height));
		gameEngine.start();
	});

	
    
	
});