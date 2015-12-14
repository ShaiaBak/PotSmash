// full size is 480

// var game = new Phaser.Game(320, 320, Phaser.AUTO);
var game = new Phaser.Game(448, 320, Phaser.CANVAS , '', null);

game.state.add('Boot', Boot);
game.state.add('Preload', Preload);
game.state.add('StartMenu', StartMenu);
game.state.add('Level1', Level1);
game.state.add('Level2Start', Level2Start);
game.state.add('Level2-1', Level2P1);
game.state.add('Level2-2', Level2P2);
game.state.add('Level3Start', Level3Start);
game.state.add('Level3-1', Level3P1);
game.state.add('Level3-2', Level3P2);
game.state.add('Level3-3', Level3P3);


game.state.start('Boot');