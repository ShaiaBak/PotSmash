var _TILESIZE = 32;

var map;
var bgLayer;
var blockedLayer;
var triggerLayer;
var levelExitLayer;
var objectLayer;
var dir = "UP";
var playerSpeed = 100; //100 is a arbitrary default value
var potGroup; //group with all the pots
var throwGroup; //group with all the thrown pots
var grabbedPot;
var grabPotRect; //the rectangle area the player can grab pots
var exitBool = 0; // if 0, exit doesn't work

var pushTimer = 0;
var triggerTimer = 0;

//******GRID SETUP******//
var board = new Array();
board[0]  = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
board[1]  = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
board[2]  = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
board[3]  = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
board[4]  = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
board[5]  = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
board[6]  = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
board[7]  = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
board[8]  = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
board[9]  = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
board[10] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
board[11] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
board[12] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
board[13] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
board[14] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var gridCheck;

//Rows and columns of the grid
var c=0;
var r=0;

var playerGridVal = 9;
var potGridVal = 1;
var wallGridVal = 2;
var transWallGridVal = 3;

var triggerGridVal = 7;
var exitGridVal = 8;
//******GRID SETUP END******//

var Game = {
	create: function() {
		this.map = this.game.add.tilemap('level1');

		//the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
		this.map.addTilesetImage('tiles-lvl1-32x32', 'gameTiles');
		// this.map.addTilesetImage('tileset-placeholder2', 'gameTilesTemp');


		this.bgLayer = this.map.createLayer('backgroundLayer');
		this.detailLayer = this.map.createLayer('detailLayer');
		this.blockedLayer = this.map.createLayer('blockedLayer');
		this.transBlockedLayer = this.map.createLayer('transBlockedLayer');
		this.triggerLayer = this.map.createLayer('triggerLayer');
		this.levelExitLayer = this.map.createLayer('levelExitLayer');
		this.transBlockedLayer.alpha = 0;


		// resize world so that dimensions match the map
		// doesnt work.. must figure out
		// this.bgLayer.resizeWorld();

		//Touch control enable
		this.game.touchControl = this.game.plugins.add(Phaser.Plugin.TouchControl);
		this.game.touchControl.inputEnable();


		key2 = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
		key2.onDown.add(function () {
			// r++;
			for(var r = 0; r < 15; r++){
				console.log(r + " " + board[r]);
			// return true;
			}
		}, this);


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
		this.map.setCollisionBetween(1, 1896, true, 'levelExitLayer');

		// enables other physics stuff
		// game.physics.startSystem(Phaser.Physics.P2JS);

		// animations
		// animations.add(variable, whats frames-starting from zero, FPS, loop[t/f])
		this.player.animations.add('walkDown', [0, 1 ,2 ,3], 8 /*fps */, true);
		this.player.animations.add('walkUp', [16, 17, 18, 19], 8 /*fps */, true);
		this.player.animations.add('walkLeft', [24, 25, 26, 27], 8 /*fps */, true);
		this.player.animations.add('walkRight', [8 , 9, 10, 11], 8 /*fps */, true);

		//diagonal animation
		this.player.animations.add('walkUpRight', [12 , 13, 14, 15], 8 /*fps */, true);
		this.player.animations.add('walkDownRight', [4 , 5, 6, 7], 8 /*fps */, true);
		this.player.animations.add('walkUpLeft', [20, 21, 22, 23], 8 /*fps */, true);
		this.player.animations.add('walkDownLeft', [28, 29, 30, 31], 8 /*fps */, true);

		//idle animation
		this.player.animations.add('idleDown', [0], 8 /*fps */, true);
		this.player.animations.add('idleUp', [16], 8 /*fps */, true);
		this.player.animations.add('idleLeft', [25], 8 /*fps */, true);
		this.player.animations.add('idleRight', [8], 8 /*fps */, true);

		// diagonal animation
		this.player.animations.add('idleUpRight', [14], 8 /*fps */, true);
		this.player.animations.add('idleDownRight', [6], 8 /*fps */, true);
		this.player.animations.add('idleUpLeft', [21], 8 /*fps */, true);
		this.player.animations.add('idleDownLeft', [29], 8 /*fps */, true);

		// ========= POT STUFF =========

		potGroup = game.add.group();
		potGroup.enableBody = true;
		potGroup.physicsBodyType = Phaser.Physics.ARCADE;
		throwGroup = game.add.group();
		throwGroup.enableBody = true;
		throwGroup.physicsBodyType = Phaser.Physics.ARCADE;

		//find pot locations from tiled and create a pot
		var potLocArr = this.findObjectsByType('pot1', this.map, 'objectsLayer');
		//console.log(potLocArr);
		for (i=0; i<potLocArr.length; i++){
			var pot = potGroup.create(potLocArr[i].x, potLocArr[i].y, 'testpot');
			pot.name = 'pot' + i;
			pot.body.immovable = true;
			pot.scale.setTo(.5, .5);
			console.log("x.pot" + i + ": " + pot.x);

			// this.game.debug.body(pot);
			
			// pot.anchor.setTo(.5, .5);
			// pot.body.setSize(44, 50, 0, 0);
		}

		// //High drag will stop the pot when you stop pushing it
		// this.potGroup.body.drag.setTo(10000);

		// // makes object immovable[t/f]
		// // this.potGroup.body.immovable = true;

		// ========= CAMERA STUFF =========

		// set bounds to world for camera and player
		// @TODO: dynamically get bounds from map size
		game.world.setBounds(0, 0, 448, 480);

		// camera follows player
		// follow types:
		// FOLLOW_LOCKON, FOLLOW_PLATFORMER, FOLLOW_TOPDOWN, FOLLOW_LOCKON_TIGHT
		this.camera.follow(this.player, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT); 

		//move player with ARROW keys
		this.cursors = this.game.input.keyboard.createCursorKeys();

		//enable space bar
		keySpace = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		//spacebar picks / throws the pot
		keySpace.onDown.add(function () {
			if(grabbedPot == null){
				this.checkPickUp();
			} else {
				this.handleThrow();
			}
		}, this);

		key3 = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
		key3.onDown.add(function () {
			// r++;
			for(var r = 0; r < 15; r++){
				console.log(r + " " + board[r]);
			// return true;
			}
			// this.gridCheckFunc();
		}, this);

		// print blank board
		// printBoard(board,14,15);
		
		gridCheck = game.add.sprite(0, 0, 'mega_grid');
		game.physics.enable(gridCheck, Phaser.Physics.ARCADE);
		gridCheck.body.setSize(32, 32, 0, 0);
		gridCheck.tint = 0xff0000;
		// console.log(this.map.getLayerIndex(this.blockedLayer));
		// console.log(this.map.getTile(13,1,this.blockedLayer,true));
		// this.map.getTile(13,1,this.blockedLayer,true).alpha = 0.5;
		// this.map.getTile(13,1,this.blockedLayer,true).alpha = 0.5;
		this.map.setTileIndexCallback(1,this.testCallback,gridCheck);


	},

	update: function() {
		// collision update
		this.game.physics.arcade.collide(this.player, this.blockedLayer);

		this.game.physics.arcade.collide(this.player, this.transBlockedLayer);
		this.game.physics.arcade.collide(this.player, potGroup, this.pushPot);
		this.game.physics.arcade.collide(throwGroup, this.blockedLayer, this.handlePotBreak);
		this.game.physics.arcade.collide(throwGroup, this.transBlockedLayer, this.handlePotBreak);
		// check to see that player is running pot into wall
		this.game.physics.arcade.collide(this.player, potGroup, this.checkOverlap);

		this.game.physics.arcade.collide(potGroup, potGroup);
		this.game.physics.arcade.collide(this.blockedLayer, potGroup, this.checkOverlap);
		this.game.physics.arcade.collide(this.transBlockedLayer, potGroup, this.checkOverlap);

		this.game.physics.arcade.overlap(potGroup, this.triggerLayer, this.exitTrigger);

		if (exitBool == 1) {
			this.game.physics.arcade.overlap(this.player, this.levelExitLayer, this.levelTrigger);
		} else {
			this.game.physics.arcade.collide(this.player, this.levelExitLayer);
		}

		this.gridCheckFunc();

		this.checkMovement();
		this.handleDirection();
		// this.checkAnimation();
		if (!this.player.body.touching.up 
			& !this.player.body.touching.down 
			& !this.player.body.touching.left 
			& !this.player.body.touching.right) {
			pushTimer = 0;
		}

	},

	gridCheckFunc: function() {
		gridCheck.body.y = 0;
		// console.log("testing");
		for (c = 0; c < this.world.height/32; c++) {
			gridCheck.body.x = 0;
			for (r = 0; r < this.world.width/32; r++) {

				// gridcheck goes through the map and checks for all objects that are walls or objects
				// if a wall or object is in the way of a pot being moved, the pot does not move.
				if (this.game.physics.arcade.overlap(gridCheck, this.blockedLayer) ||
					this.game.physics.arcade.overlap(gridCheck, this.transBlockedLayer)) {
					board[c][r] = wallGridVal;

					// console.log('overlapWall');
				} else if(this.game.physics.arcade.overlap(gridCheck, potGroup)) {
					board[c][r] = potGridVal;
				} else if (this.game.physics.arcade.overlap(gridCheck, this.player)) {
					board[c][r] = playerGridVal;
				} else if (this.map.getTile(r,c,this.blockedLayer) != null) {
					// console.log("wallfound");
					// console.log(this.map.getTile(c,r,this.blockedLayer,true));
					board[c][r] = wallGridVal;
				} else if (this.map.getTile(r,c,this.transBlockedLayer) != null) {
					board[c][r] = transWallGridVal;
				} else if(this.map.getTile(r,c,this.triggerLayer)) {
					board[c][r] = triggerGridVal;
				} else if(this.map.getTile(r,c,this.levelExitLayer)) {
					board[c][r] = exitGridVal;
				} else {
					board[c][r] = 0;
				}
				
				gridCheck.body.x +=32;
			
			}

			gridCheck.body.y += 32;
		}
	},

	testCallback: function(){
		console.log("Testing callback");
	},

	exitTrigger: function() {
		console.log('trigger');
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

	checkOverlap: function(obj1, obj2) {
		// first get all of the active tweens
		var tweens = game.tweens.getAll();

		// filter that down to an array of all tweens of the specified object
		var currentTweens = tweens.filter(function(tween) {
			return tween._object === obj2;
		});
	},

	pushPot: function(obj1, obj2) {
		// goes through group 'potGroup' and then makes the children do something
		potGroup.forEach(function(pots) {
			pots.body.immovable = true;

			// temp
			pots.body.moves = true;
		}, this);
		
		pushTimer++;
		if(pushTimer >= 50) {
			console.log('push');
			console.log("x.pot" + i + ": " + obj2.x);
			
			switch(dir) {
				case "UP":
				if(board[ obj2.body.y/32 - 1 ][ obj2.body.x/32 ] == 0) {
					game.add.tween(obj2).to( { y: '-'+_TILESIZE }, 250, Phaser.Easing.Linear.None, true);
					// printBoard(board,14,15);
				} else if(board[ obj2.body.y/32 - 1 ][ obj2.body.x/32 ] == triggerGridVal) {
					game.add.tween(obj2).to( { y: '-'+_TILESIZE }, 250, Phaser.Easing.Linear.None, true);
					// make exits work
					exitBool = 1;
				}
				break;

				case "DOWN":
				if(board[ obj2.body.y/32 + 1 ][ obj2.body.x/32 ] == 0) { 
					game.add.tween(obj2).to( { y: '+'+_TILESIZE }, 250, Phaser.Easing.Linear.None, true);
				} else if(board[ obj2.body.y/32 + 1 ][ obj2.body.x/32 ] == triggerGridVal) { 
					game.add.tween(obj2).to( { y: '+'+_TILESIZE }, 250, Phaser.Easing.Linear.None, true);
					// make exits work
					exitBool = 1;
				}
				break;

				case "LEFT":
				if(board[ obj2.body.y/32 ][ obj2.body.x/32 - 1 ] == 0) {
					game.add.tween(obj2).to( { x: '-'+_TILESIZE }, 250, Phaser.Easing.Linear.None, true);
				} else if(board[ obj2.body.y/32 ][ obj2.body.x/32 - 1 ] == triggerGridVal) {
					game.add.tween(obj2).to( { x: '-'+_TILESIZE }, 250, Phaser.Easing.Linear.None, true);
					// make exits work
					exitBool = 1;
				}
				break;

				case "RIGHT":
				if(board[ obj2.body.y/32 ][ obj2.body.x/32 + 1 ] == 0) {
					game.add.tween(obj2).to({ x: '+'+_TILESIZE }, 250, Phaser.Easing.Linear.None, true);
				} else if(board[ obj2.body.y/32 ][ obj2.body.x/32 + 1 ] == triggerGridVal) {
					game.add.tween(obj2).to({ x: '+'+_TILESIZE }, 250, Phaser.Easing.Linear.None, true);
					// make exits work
					exitBool = 1;
				}
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

	handleDirection: function() {
		//cardinal directions handling
		if (this.player.body.velocity.y < 0 && this.player.body.velocity.x == 0) {
			dir = "UP";
			grabPotRect.x = this.player.x - this.player.width*.5;
			grabPotRect.y = this.player.y - this.player.height;
			this.player.play('walkUp');
		} else if (this.player.body.velocity.y > 0 && this.player.body.velocity.x == 0) {
			dir = "DOWN";
			grabPotRect.x = this.player.x - this.player.width*.5;
			grabPotRect.y = this.player.y;
			this.player.play('walkDown');
		} else if (this.player.body.velocity.x < 0 && this.player.body.velocity.y == 0) {
			dir = "LEFT";
			grabPotRect.x = this.player.x - this.player.width;
			grabPotRect.y = this.player.y - this.player.height*.5;
			this.player.play('walkLeft');
		} else if (this.player.body.velocity.x > 0 && this.player.body.velocity.y == 0) {
			dir = "RIGHT";
			grabPotRect.x = this.player.x;
			grabPotRect.y = this.player.y - this.player.height*.5;
			this.player.play('walkRight');
		} 
		// diagonal movements
		else if(this.player.body.velocity.y < 0 && this.player.body.velocity.x < 0) {
			this.player.play('walkUpLeft');
			dir = "UPLEFT";
		} else if(this.player.body.velocity.y > 0 && this.player.body.velocity.x < 0) {
			this.player.play('walkDownLeft');
			dir = "DOWNLEFT";
		} else if(this.player.body.velocity.y < 0 && this.player.body.velocity.x > 0) {
			this.player.play('walkUpRight');
			dir = "UPRIGHT";
		} else if(this.player.body.velocity.y > 0 && this.player.body.velocity.x > 0) {
			this.player.play('walkDownRight');
			dir = "DOWNRIGHT";
		}
		
		//idle animation
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
			// diagonal idle
			else if(dir == "UPLEFT") {
				this.player.play('idleUpLeft');
			} else if(dir == "DOWNLEFT") {
				this.player.play('idleDownLeft');
			} else if(dir == "UPRIGHT") {
				this.player.play('idleUpRight');
			} else if(dir == "DOWNRIGHT") {
				this.player.play('idleDownRight');
			} else {
				this.player.play('idleUp');
			}
		}
	},
	
	//try to pick up a facing nearby pot
	checkPickUp: function() {
		var isCloseToPot = null;
		i=0;
		//go through all the pots to see if the player is facing + close to the pot
		while(i<potGroup.children.length) {
			if(Phaser.Rectangle.intersects(grabPotRect, potGroup.children[i])) {
				isCloseToPot = potGroup.children[i];
				break;
			}
			i++;
		}
		if(isCloseToPot != null && grabbedPot == null){
			console.log(isCloseToPot.name);
			this.pickUpPot(isCloseToPot);
		}
	},
	
	//pick up pot
	pickUpPot: function(pot) {
		grabbedPot = pot;
		pot.body.moves = true;
		this.player.addChild(pot);
		pot.scale.setTo(1,1);
		pot.x = this.player.width * -1;
		pot.y = this.player.height * -2;
	},
	
	handleThrow: function() {
		//remove grabbedPot
		this.player.children[0].destroy();
		grabbedPot = null;
		//create and move thrown pot
		pot = throwGroup.create(grabPotRect.x, grabPotRect.y, 'testpot');
		pot.scale.setTo(.5,.5);
		pot.body.drag.setTo(1000);
		switch(dir) {
			case "UP":
			pot.body.velocity.y = -400;
			break;
			case "DOWN":
			pot.body.velocity.y = 400;
			break;
			case "LEFT":
			pot.body.velocity.x = -400;
			break;
			case "RIGHT":
			pot.body.velocity.x = 400;
			break;
		}
		
	},
	
	handlePotBreak: function(pot, wall) {
		pot = throwGroup;
		console.log("break");
		console.log(pot);
	},

	levelTrigger: function() {
		console.log('TRIGGERED SO HARD RIGHT NOW');
		game.time.events.add(Phaser.Timer.SECOND * 0.75, restart, this);
	},

	render: function() {
		game.debug.body(gridCheck);
	},
	updateBoard: function() {
		console.log("it worked");
	}

};
function printBoard (array,x,y) {

	for (var r = 0; r < y; r++){ 
		console.log(array[c]);
	}
	return array;
};


function restart() {
	game.state.start('Level2');
};