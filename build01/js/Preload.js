Preload = {
  preload: function() {

    //load game assets
    this.load.tilemap('level1', 'assets/tileset/level1.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('gameTiles', 'assets/img/tileset-placeholder2.png');
    this.load.image('player', 'assets/img/player.png');
  },
  create: function() {
    this.state.start('Game');
    this.state.start('tyler');
    this.state.start('shaia');
  }
};