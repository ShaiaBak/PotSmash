// full size is 480
var game = new Phaser.Game(320, 320, Phaser.AUTO);

game.state.add('Boot', Boot);
game.state.add('Preload', Preload);
game.state.add('Game', Game);

game.state.start('Boot');