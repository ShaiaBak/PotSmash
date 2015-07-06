/* global Phaser */
/* global BasicGame */

(function(BasicGame) {
    'use strict';
    var dir = "LEFT";


    BasicGame.Game = function () {

        //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

        /*this.game;        //  a reference to the currently running game
        this.add;       //  used to add sprites, text, groups, etc 
        this.camera;    //  a reference to the game camera
        this.cache;     //  the game cache
        this.input;     //  the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
        this.load;      //  for preloading assets
        this.math;      //  lots of useful common math operations
        this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc
        this.stage;     //  the game stage
        this.time;      //  the clock
        this.tweens;    //  the tween manager
        this.world;     //  the game world
        this.particles; //  the particle manager
        this.physics;   //  the physics manager
        this.rnd;       //  the repeatable random number generator
    */
        //  You can use any of these from any function within this State.
        //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.
    };

    var easeInSpeed = function(x){
        return x * Math.abs(x) / 2000;
    }

    BasicGame.Game.prototype = {
        init: function() {
            this.physics.startSystem(Phaser.Physics.ARCADE);
        },
        create: function () {
            this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
            this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
            this.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
            this.downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
            this.game.touchControl = this.game.plugins.add(Phaser.Plugin.TouchControl);
            this.game.touchControl.inputEnable();

            this.tilesprite = this.add.tileSprite(0, 0, this.world.width, this.world.height, 'background');
            this.tilesprite.scale.set(3);
            this.character = this.add.sprite(this.world.centerX, this.world.centerY, 'character');
            this.character.anchor.set(0.5);

            this.character.animations.add('walkDown', [0 ,1 ,2 ,3 ,4 ,5 ,6 ,7], 20 /*fps */, true);
            this.character.animations.add('walkUp',   [8 ,9 ,10,11,12,13,14,15], 20 /*fps */, true);
            this.character.animations.add('walkLeft', [16,17,18,19,20,21,22,23], 20 /*fps */, true);
            this.character.animations.add('walkRight',[24,25,26,27,28,29,30,31], 20 /*fps */, true);
            




            var _button1 = this.add.button(400, 80, 'buttons', function () {
                if (_button1.frame===1) {
                    _button1.frame = 3;
                    this.game.touchControl.settings.singleDirection = true;
                }else if (_button1.frame===3) {
                    _button1.frame = 1;
                    this.game.touchControl.settings.singleDirection = false;
                }
            }, this);
            _button1.frame=1;


            var _button2 = this.add.button(400, 20, 'buttons', function () {
                if (_button2.frame===2) {
                    _button2.frame = 0;
                    this.game.touchControl.inputEnable();
                }else if (_button2.frame===0) {
                    _button2.frame = 2;
                    this.game.touchControl.inputDisable();
                }
            }, this);
            _button2.frame=0;

            this.add.button(400, 740, 'githubstar', function () {
                window.open('https://github.com/eugenioclrc/phaser-touch-control-plugin','_blank');
            }, this,0,0,1,0).scale.set(0.5);



            var style = {font: '25px Arial', fill: '#ffffff', align: 'left', fontWeight: 'bold', stroke: '#000000', strokeThickness: 6};
            var tw = this.add.text(20, 20, 'Phaser Touch Plugin demo\nDeveloped by @eugenioclrc\nFor http://gamegur.us', style);
            tw.inputEnabled = true;
            tw.events.onInputDown.add(function(){
                window.open('https://twitter.com/eugenioclrc','_blank');
            });



            this.directionsText = this.add.text(20, 740, '', style);
            this.velocityText = this.add.text(200, 740, '', style);
        },
        updateDebugText: function(){
            this.directionsText.setText('directions: {\n  up: ' + this.game.touchControl.cursors.up +
                ',\n  down: ' + this.game.touchControl.cursors.down + ',\n  left: ' + this.game.touchControl.cursors.left + 
                ',\n  right: ' + this.game.touchControl.cursors.right + ',\n}');
            this.velocityText.setText('velocity: {\n  x: ' + this.game.touchControl.speed.x + ',\n  y: ' + this.game.touchControl.speed.y + '\n}');

        },
        update: function() {
            this.updateDebugText();
            var speed = this.game.touchControl.speed;
            var delay = 0;
            var facingDirection = {
                LEFT : "LEFT",
                RIGHT : "RIGHT",
                UP : "UP",
                DOWN : "DOWN"
            };
            
            this.game.physics.enable(this.character, Phaser.Physics.ARCADE);

            // this.character.body.velocity.y -= this.game.touchControl.speed.y / 20;
            // this.character.body.velocity.x -= this.game.touchControl.speed.x / 20;
            // Also you could try linear speed;
            //this.tilesprite.tilePosition.y += this.game.touchControl.speed.y / 20;
            //this.tilesprite.tilePosition.x += this.game.touchControl.speed.x / 20;

            if (this.game.touchControl.speed.x > 25 || this.game.touchControl.speed.x < -25) {
                this.character.body.velocity.x = -this.game.touchControl.speed.x*3;

            } else {
                this.character.body.velocity.x = 0;
            }

            if (this.game.touchControl.speed.y > 25 || this.game.touchControl.speed.y < -25) {
                this.character.body.velocity.y = -this.game.touchControl.speed.y*3;
 
            } else {
                this.character.body.velocity.y = 0;

            }
    if (this.leftKey.isDown)
    {
        this.character.body.velocity.x = -300;
    }
    else if (this.rightKey.isDown)
    {
        this.character.body.velocity.x = 300;
    }

    if (this.upKey.isDown)
    {
        this.character.body.velocity.y = -300;
    }
    else if (this.downKey.isDown)
    {
        this.character.body.velocity.y = 300;
    }



            // if (this.game.touchControl.speed.x == 0 && this.game.touchControl.speed.y == 0) {
            //     // this.character.animations.stop(0, true);

            // }

            // if (this.game.touchControl.speed.x > 30) {
            //     // this.character.body.velocity.x = -200;
            //     this.character.body.velocity.x = this.game.touchControl.speed.x*2;
            // } else if (this.game.touchControl.speed.x < -30) {
            //     this.character.body.velocity.x = this.game.touchControl.speed.x*2;
            //     // this.character.body.velocity.x = 200;
            // } else {
            //     this.character.body.velocity.x = 0;
            // }   

            // if (this.game.touchControl.speed.y > 30) {
            //     this.character.body.velocity.y = -200;
            // } else if (this.game.touchControl.speed.y < -30) {
            //     this.character.body.velocity.y = 200;
            // } else {
            //     this.character.body.velocity.y = 0;
            // } 


            // if (this.game.touchControl.cursors.left) {
            //     this.character.body.velocity.x = -200;
            // } else if (this.game.touchControl.cursors.right) {
            //     this.character.body.velocity.x = 200;
            // } else {
            //     this.character.body.velocity.x = 0;
            // }   

            // if (this.game.touchControl.cursors.up) {
            //     this.character.body.velocity.y = -200;
            // } else if (this.game.touchControl.cursors.down) {
            //     this.character.body.velocity.y = 200;
            // } else {
            //     this.character.body.velocity.y = 0;
            // }   
            // console.log(this.character.body.velocity.x);


            if (Math.abs(this.character.body.velocity.y) < Math.abs(this.character.body.velocity.x)){
                // delay = parseInt(1000 / Math.abs((easeInSpeed(this.character.body.velocity.x)) * 50), 10);
                // delay = 100/Math.abs(this.character.body.velocity.x);
                if ( Math.abs(this.character.body.velocity.x) > 150 ) {
                    delay = 40;
                } else {
                    delay = 100;
                }

                // moving mainly right or left
                // if (this.game.touchControl.cursors.left) {
                if (this.character.body.velocity.x < -25) {
                    // this.character.body.velocity.x += -10;
                    this.character.play('walkLeft');
                    dir = "LEFT";
                // } else if (this.game.touchControl.cursors.right) {
                } else if (this.character.body.velocity.x > 25) {
                    // this.character.body.velocity.x += 10;
                    this.character.play('walkRight');
                    dir = "RIGHT";
                    
                }
            } else if (Math.abs(this.character.body.velocity.y) > Math.abs(this.character.body.velocity.x)){
                // delay = parseInt(1000 / Math.abs((easeInSpeed(this.character.body.velocity.y)) * 50), 10);
                // moving mainly up or down
                if ( Math.abs(this.character.body.velocity.y) > 150 ) {
                    delay = 40;
                } else {
                    delay = 100;
                }
                // if (this.game.touchControl.cursors.up) {
                if (this.character.body.velocity.y < -25) {
                    // this.character.body.velocity.y += -10;
                    dir = "UP";
                    this.character.play('walkUp');
                // } else if (this.game.touchControl.cursors.down) {
                } else if (this.character.body.velocity.y > 25) {
                    // this.character.body.velocity.y += 10;
                    dir = "DOWN";
                    this.character.play('walkDown');
                }
            } else {
                this.character.animations.stop(0, true);
                // this.character.body.velocity.y = 0;
                this.character.body.velocity.x = 0;
            }
            
            // this is a little hack, if the next frame its really slow and we have speed up things we will
            // have to wait for _timeNextFrame to se the fps updated
            this.character.animations.currentAnim.delay = delay;
            if(delay && (this.character.animations.currentAnim._timeNextFrame - this.time.now) > delay){
                this.character.animations.currentAnim._timeNextFrame = this.time.now + delay;
            }
        }
     };

})(BasicGame);