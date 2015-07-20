var map;
var bgLayer;
var blockedLayer;
var objectLayer;

var Game = {
	create: function() {
		this.map = this.game.add.tilemap('level1');

	//the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
	this.map.addTilesetImage('tileset-placeholder2', 'gameTiles');

	this.bgLayer = this.map.createLayer('backgroundLayer');
	this.blockedLayer = this.map.createLayer('blockedLayer');

	//create player
	var result = this.findObjectsByType('playerStart', this.map, 'objectsLayer');
	this.player = this.game.add.sprite(result[0].x, result[0].y, 'player');
	this.game.physics.arcade.enable(this.player);

	//the camera will follow the player in the world
	this.game.camera.follow(this.player);

	//collision
	this.map.setCollisionBetween(1, 100000, true, 'blockedLayer');

	//move player with cursor keys
	this.cursors = this.game.input.keyboard.createCursorKeys();
	

	pot1 = this.game.add.group();
    pot1.enableBody = true;
	// var pot1 = this.findObjectsByType('pot1', this.map, 'objectsLayer');
	this.map.createFromObjects('objectsLayer', 8 ,'pot1', 0, true, false, pot1);
	
	// pot1.forEach(function() {
	// this.testpot = this.game.add.sprite(pot1[0].x, pot1[0].y, 'pot1');
	// this.game.physics.arcade.enable(this.testpot);    
	// this.testpot.body.immovable = true;
	// this.testpot.scale.setTo(0.5,0.5);
		
	// });


	// this.testpot = this.game.add.sprite(pot1[0].x, pot1[0].y, 'pot1');
	// this.game.physics.arcade.enable(this.testpot);    
	// this.testpot.body.immovable = true;
	// this.testpot.scale.setTo(0.5,0.5);

	//High drag will stop the pot when you stop pushing it
	// this.testpot.body.drag.setTo(10000);

},

update: function() {
	// potTouch();
	// this.game.physics.arcade.overlap(this.player, this.testpot, this.collect, null, this);
	// collision update
	this.game.physics.arcade.collide(this.player, this.blockedLayer);
	this.game.physics.arcade.collide(this.player, this.testpot);

	console.log(this.player.body.touching.up);
	this.player.body.velocity.y = 0;
	this.player.body.velocity.x = 0;

	if(this.cursors.up.isDown) {
		this.player.body.velocity.y -= 100;
	}
	else if(this.cursors.down.isDown) {
		this.player.body.velocity.y += 100;
	}
	if(this.cursors.left.isDown) {
		this.player.body.velocity.x -= 100;
	}
	else if(this.cursors.right.isDown) {
		this.player.body.velocity.x += 100;
	}

	// shaia();
},

  //find objects in a Tiled layer that containt a property called "type" equal to a certain value
  findObjectsByType: function(type, map, layer) {
	var result = new Array();
	map.objects[layer].forEach(function(element){
		if(element.properties.type === type) {
		//Phaser uses top left, Tiled bottom left so we have to adjust the y position
		//also keep in mind that the cup images are a bit smaller than the tile which is 16x16
		//so they might not be placed in the exact pixel position as in Tiled
		element.y -= map.tileHeight;
		result.push(element);
		}      
	});
	return result;
  }


};


//PUT INTO PRELOAD
   this.load.image('pot1', 'assets/img/barrel64x64.png');