Preload = {
  preload: function() {

    //load game assets
    this.load.tilemap('level1', 'assets/tileset/level1.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('gameTiles', 'assets/img/tileset-placeholder2.png');
    this.load.spritesheet('player', 'assets/img/mega-player.png',  30, 30);
  },
  create: function() {
    this.state.start('Game');
  }
};