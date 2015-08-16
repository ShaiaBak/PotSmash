var map;
var bgLayer;
var blockedLayer;
var objectLayer;
var dir = "LEFT";
var playerSpeed = 100; //100 is a random default value
var testpot;

var Game = {
	create: function() {
		this.map = this.game.add.tilemap('level2');

		//the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
		this.map.addTilesetImage('tiles-lvl1-32x32', 'gameTiles');

		this.bgLayer = this.map.createLayer('backgroundLayer');
		this.detailLayer = this.map.createLayer('detailLayer');
		this.blockedLayer = this.map.createLayer('blockedLayer');

		// resize world so that dimensions match the map
		// doesnt work.. must figure out
		// this.bgLayer.resizeWorld();

		//Touch control enable
		this.game.touchControl = this.game.plugins.add(Phaser.Plugin.TouchControl);
		this.game.touchControl.inputEnable();

		//create player
		var result = this.findObjectsByType('playerStart', this.map, 'objectsLayer')
		this.player = this.game.add.sprite(result[0].x, result[0].y, 'player');
		this.game.physics.arcade.enable(this.player);
		// anchor point for player sprite
		this.player.anchor.setTo(.5,.5);
		this.player.scale.setTo(0.5, 0.5);

		//collision
		this.map.setCollisionBetween(1, 1896, true, 'blockedLayer');

		// enables other physics stuff
		// game.physics.startSystem(Phaser.Physics.P2JS);

		// animations
		// animations.add(variable, whats frames-starting from zero, FPS, loop[t/f])
		this.player.animations.add('walkDown', [0, 1 ,2 ,3], 8 /*fps */, true);
		this.player.animations.add('walkUp', [16, 17, 18, 19], 8 /*fps */, true);
		this.player.animations.add('walkLeft', [24, 25, 26, 27], 8 /*fps */, true);
		this.player.animations.add('walkRight', [8 , 9, 10, 11], 8 /*fps */, true);
		this.player.animations.add('idleDown', [0], 8 /*fps */, true);
		this.player.animations.add('idleUp', [16], 8 /*fps */, true);
		this.player.animations.add('idleLeft', [25], 8 /*fps */, true);
		this.player.animations.add('idleRight', [8], 8 /*fps */, true);


		// ========= POT STUFF =========

		testpot = game.add.group();
		testpot.enableBody = true;
		testpot.physicsBodyType = Phaser.Physics.ARCADE;

		//find pot locations from tiled and create a pot
		var potLocArr = this.findObjectsByType('pot1', this.map, 'objectsLayer');
		console.log(potLocArr);
		for (i=0; i<potLocArr.length; i++){
			var pot = testpot.create(potLocArr[i].x, potLocArr[i].y, 'testpot');
			pot.name = 'pot' + i;
			pot.body.immovable = true;
			pot.scale.setTo(.5, .5);
		}
		
		// //High drag will stop the pot when you stop pushing it
		// this.testpot.body.drag.setTo(10000);

		// // makes object immovable[t/f]
		// // this.testpot.body.immovable = true;

		// ========= CAMERA STUFF =========

		// set bounds to world for camera and player
		// @TODO: dynamically get bounds from map size
		game.world.setBounds(0, 0, 500, 480);

		// camera follows player
		// follow types: 
		// FOLLOW_LOCKON, FOLLOW_PLATFORMER, FOLLOW_TOPDOWN, FOLLOW_LOCKON_TIGHT
		this.camera.follow(this.player, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT); 

		//move player with ARROW keys
		this.cursors = this.game.input.keyboard.createCursorKeys();

		//enable space bar
		keySpace = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

	},

	update: function() {
		// collision update
		this.game.physics.arcade.collide(this.player, this.blockedLayer);
		this.game.physics.arcade.collide(this.player, testpot, this.checkTouch, function(){}, this);
		// check to see that player is running pot into wall
		this.game.physics.arcade.overlap(this.player, testpot, this.checkOverlap, function(){}, this);

		this.game.physics.arcade.collide(testpot, testpot);
		this.game.physics.arcade.collide(this.blockedLayer, testpot);

		// this.pot[i].body.immovable = true;

		this.checkMovement();
		this.checkAnimation();
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
	},

	spriteDir: function() {
		// console.log('Direction: ' + dir);
	},

	checkOverlap: function() {
		console.log('in the wall yo');
	},

	checkTouch: function(obj1, obj2) {
		// goes through group 'testpot' and then makes the children do something
		testpot.forEach(function(pots) {
			pots.body.immovable = true;
		}, this);

		console.log('touch');
		obj2.body.immovable = false;
		obj2.body.drag.setTo(1000);
	},

	checkMovement: function() {
		//Player is not moving when nothing is pressed
		this.player.body.velocity.y = 0;
		this.player.body.velocity.x = 0;

		//Checks arrow keys	
		if(this.cursors.up.isDown) {
			this.player.body.velocity.y -= playerSpeed;
		}
		else if(this.cursors.down.isDown) {
			this.player.body.velocity.y += playerSpeed;
		}
		if(this.cursors.left.isDown) {
			this.player.body.velocity.x -= playerSpeed;
		}
		else if(this.cursors.right.isDown) {
			this.player.body.velocity.x += playerSpeed;
		}


		// Check touch controls
		if (this.game.touchControl.speed.x > 10) {
			this.player.body.velocity.x = -playerSpeed;

		} else if (this.game.touchControl.speed.x < -10) {
			this.player.body.velocity.x = playerSpeed;
		}

		if (this.game.touchControl.speed.y > 10 ) {
			this.player.body.velocity.y = -playerSpeed;

		} else if (this.game.touchControl.speed.y < -10) {
			this.player.body.velocity.y = playerSpeed;
		} 
	
		// if player is going diagonally, go 0.75 the speed in both directions
		// reason is that player goes too fast when moving diagonally
		// @TODO: change for touch controls
		if(this.player.body.velocity.y >= 51 && this.player.body.velocity.x >= 51 ||
			this.player.body.velocity.y <= -51 && this.player.body.velocity.x <= -51 ||
			this.player.body.velocity.y >= 51 && this.player.body.velocity.x <= -51 ||
			this.player.body.velocity.y <= -51 && this.player.body.velocity.x >= 51) {
			this.player.body.velocity.y = this.player.body.velocity.y*0.75;
			this.player.body.velocity.x = this.player.body.velocity.x*0.75;
		}
	},

	checkAnimation: function() {
		if (this.player.body.velocity.y == -playerSpeed) {
			dir = "UP";
			this.spriteDir();
			this.player.play('walkUp');
		} else if (this.player.body.velocity.y == playerSpeed) {
			dir = "DOWN";
			this.spriteDir();
			this.player.play('walkDown');
		} else if (this.player.body.velocity.x == -playerSpeed) {
			dir = "LEFT";
			this.spriteDir();
			this.player.play('walkLeft');
		} else if (this.player.body.velocity.x == playerSpeed) {
			dir = "RIGHT";
			this.spriteDir();
			this.player.play('walkRight');
		}

		if (this.player.body.velocity.y == 0 && this.player.body.velocity.x == 0) {
			if(dir == "DOWN") {
				this.player.play('idleDown');
			} else if(dir == "UP") {
				this.player.play('idleUp');
			} else if(dir == "LEFT") {
				this.player.play('idleLeft');
			} else if(dir == "RIGHT") {
				this.player.play('idleRight');
			}
		}
	}
};