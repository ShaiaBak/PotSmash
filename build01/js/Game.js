var map;
var bgLayer;
var blockedLayer;
var triggerLayer;
var objectLayer;
var dir = "LEFT";
var playerSpeed = 100; //100 is a random default value
var testpot;

var grabPotRect; //the rectangle area the player can grab pots
var potArr = [];

var pushTimer = 0;
var Game = {
	create: function() {
		this.map = this.game.add.tilemap('level2');

		//the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
		this.map.addTilesetImage('tiles-lvl1-32x32', 'gameTiles');

		this.bgLayer = this.map.createLayer('backgroundLayer');
		this.detailLayer = this.map.createLayer('detailLayer');
		this.blockedLayer = this.map.createLayer('blockedLayer');
		this.transBlockedLayer = this.map.createLayer('transBlockedLayer');
		this.triggerLayer = this.map.createLayer('triggerLayer');

		this.transBlockedLayer.alpha = 0;

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
		//create pot grab area to check the area right in front of the player for pot grabbing
		grabPotRect = new Phaser.Rectangle(0,0,this.player.width,this.player.height);

		this.player.body.setSize(40, 50, 0, 0);

		//collision
		this.map.setCollisionBetween(1, 1896, true, 'blockedLayer');
		this.map.setCollisionBetween(1, 1896, true, 'transBlockedLayer');

		this.map.setCollisionBetween(1, 1896, true, 'triggerLayer');

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
		//console.log(potLocArr);
		for (i=0; i<potLocArr.length; i++){
			var pot = testpot.create(potLocArr[i].x, potLocArr[i].y, 'testpot');
			pot.name = 'pot' + i;
			pot.body.immovable = true;
			pot.scale.setTo(.5, .5);
			potArr.push(pot);
			pot.anchor.setTo(.5, .5);
			pot.body.setSize(44, 50, 0, 0);
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
	// render: function() {
		// this.game.debug.geom(grabPotRect,'#0fffff');
	// },
	update: function() {
		// collision update
		this.game.physics.arcade.collide(this.player, this.blockedLayer);
		this.game.physics.arcade.collide(this.player, this.transBlockedLayer);
		this.game.physics.arcade.collide(this.player, testpot, this.checkTouch);
		// check to see that player is running pot into wall
		this.game.physics.arcade.overlap(this.player, testpot, this.checkOverlap);

		this.game.physics.arcade.collide(testpot, testpot);
		this.game.physics.arcade.collide(this.blockedLayer, testpot);
		this.game.physics.arcade.collide(this.transBlockedLayer, testpot);

		this.game.physics.arcade.overlap(testpot, this.triggerLayer, this.levelTrigger);

		// this.pot[i].body.immovable = true;

		this.checkMovement();
		this.checkAnimation();
		if(keySpace.isDown){
			this.checkPickUp();
		}
		if ( !this.player.body.touching.up & !this.player.body.touching.down & !this.player.body.touching.left & !this.player.body.touching.right) {
			pushTimer = 0;
		}
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
		//move the pot detection rect in front of the player's direction
		switch(dir) {
			case "UP":
			grabPotRect.x = this.player.x - this.player.width*.5;
			grabPotRect.y = this.player.y - this.player.height;
			break;
			
			case "DOWN":
			grabPotRect.x = this.player.x - this.player.width*.5;
			grabPotRect.y = this.player.y;
			break;
			
			case "LEFT":
			grabPotRect.x = this.player.x - this.player.width;
			grabPotRect.y = this.player.y - this.player.height*.5;
			break;
			
			case "RIGHT":
			grabPotRect.x = this.player.x;
			grabPotRect.y = this.player.y - this.player.height*.5;
			break;
		}
		//console.log(grabPotRect.x + ":" + grabPotRect.y);
		//console.log(potArr[0].x + ":" + potArr[0].y);
		//console.log(this.player.x + ":" + this.player.y);
	},

	checkOverlap: function() {
		//console.log('in the wall yo');
	},

	checkTouch: function(obj1, obj2) {
		
		// goes through group 'testpot' and then makes the children do something
		testpot.forEach(function(pots) {
			pots.body.immovable = true;
		}, this);

		pushTimer++;
		if(pushTimer >= 50) {
			console.log('push');
			
			obj2.body.immovable = false;
			obj2.body.drag.setTo(1000);
			
			switch(dir) {

				case "UP":
		
				obj2.body.velocity.y = -240;
				break;

				case "DOWN":
				obj2.body.velocity.y = +240;

				break;

				case "LEFT":
				obj2.body.velocity.x = -240;

				break;

				case "RIGHT":
				obj2.body.velocity.x = +240;

				break;

			}
			pushTimer = 0;

		}

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
		if (this.player.body.velocity.y < 0) {
			dir = "UP";
			this.spriteDir();
			this.player.play('walkUp');
		} else if (this.player.body.velocity.y > 0) {
			dir = "DOWN";
			this.spriteDir();
			this.player.play('walkDown');
		} else if (this.player.body.velocity.x < 0) {
			dir = "LEFT";
			this.spriteDir();
			this.player.play('walkLeft');
		} else if (this.player.body.velocity.x > 0) {
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
	},
	
	//checks whether the player is facing a pot to pick up
	checkPickUp: function() {
		var isCloseToPot = null;
		i=0;
		while(i<potArr.length) {
			if(Phaser.Rectangle.intersects(grabPotRect, potArr[i])) {
				isCloseToPot = potArr[i];
				break;
			}
			i++;
		}
		//isCloseToPot = Phaser.Rectangle.intersects(grabPotRect, potArr[0]);
		if(isCloseToPot != null){
			console.log(isCloseToPot.name);
		}
	},

	levelTrigger: function(obj1, obj2) {
		console.log('TRIGGERED SO HARD RIGHT NOW');
		console.log(obj2);
		obj2.destroy();
	}
};