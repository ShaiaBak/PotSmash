// full size is 480
var game = new Phaser.Game(320, 320, Phaser.AUTO);

game.state.add('Boot', Boot);
game.state.add('Preload', Preload);
game.state.add('StartMenu', StartMenu);
game.state.add('Game', Game);
game.state.add('Level2', Level2);

game.state.start('Boot');