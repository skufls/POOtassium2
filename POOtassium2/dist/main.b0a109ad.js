// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/CST.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CST = void 0;
exports.CST = {
  SCENES: {
    LOAD: "LOAD",
    MENU: "MENU",
    PLAY: "PLAY",
    GAMEOVER: "GAMEOVER"
  },
  IMAGE: {
    LOGO: "logo.png",
    OPTIONS: "options.png",
    PLAY: "play.png",
    TITLE: "title_bg.jpg"
  },
  AUDIO: {
    SPLET: "splet.mp3"
  },
  SPRITE: {
    POOP_SELECT: "poop_select.png",
    MONKEY_HEAD: "monkey_head.png",
    POOP_PROJECTILE: "poop_projectile.png"
  }
};
},{}],"src/scenes/GameOverScene.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameOverScene = void 0;

var CST_1 = require("../CST");

var GameOverScene =
/** @class */
function (_super) {
  __extends(GameOverScene, _super);

  function GameOverScene() {
    return _super.call(this, {
      key: CST_1.CST.SCENES.GAMEOVER
    }) || this;
  }

  GameOverScene.prototype.create = function () {
    var _this = this;

    this.add.image(400, 300, 'gameover').setScale(10);
    this.input.once('pointerdown', function () {
      _this.scene.start(CST_1.CST.SCENES.MENU);
    }, this);
  };

  return GameOverScene;
}(Phaser.Scene);

exports.GameOverScene = GameOverScene;
},{"../CST":"src/CST.ts"}],"src/scenes/LoadScene.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadScene = void 0;

var CST_1 = require("../CST");

var LoadScene =
/** @class */
function (_super) {
  __extends(LoadScene, _super);

  function LoadScene() {
    return _super.call(this, {
      key: CST_1.CST.SCENES.LOAD
    }) || this;
  }

  LoadScene.prototype.init = function () {};

  LoadScene.prototype.loadImages = function () {
    this.load.setPath("./assets/image");

    for (var prop in CST_1.CST.IMAGE) {
      //@ts-ignore
      this.load.image(CST_1.CST.IMAGE[prop], CST_1.CST.IMAGE[prop]);
    }
  };

  LoadScene.prototype.preload = function () {
    this.load.image("tiles", "./assets/maps/tile_sheet.png");
    this.load.tilemapTiledJSON('lvl1', "./assets/maps/lvl1.json");
    this.load.audio("splet", "./assets/sound/splet.mp3");
    this.load.audio("splet2", "./assets/sound/splet2.mp3");
    this.load.audio("woesh", "./assets/sound/woesh.mp3");
    this.load.image("logo", "./assets/logo.png");
    this.load.image("gameover", "./assets/gameover.png");
    this.load.image("play", "./assets/play.png");
    this.load.image("banana", "./assets/banana.png");
    this.load.image("joystick", "./assets/joystick.png");
    this.load.image("banano", "./assets/banano.png");
    this.load.spritesheet("monkey_hand", "./assets/monkey_hand.png", {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet("monkey_head", "./assets/monkey_head.png", {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.image("enemy", "./assets/enemy.png");
    this.load.image("jimmy", "./assets/jimmy.png");
    this.load.image("options", "./assets/options.png");
    this.load.spritesheet("poop_projectile", "./assets/poop_projectile.png", {
      frameWidth: 232,
      frameHeight: 232
    });
    this.load.spritesheet("poopE_projectile", "./assets/poopE_projectile.png", {
      frameWidth: 232,
      frameHeight: 232
    });
    this.load.spritesheet("arrow", "./assets/arrow.png", {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet("poop_load", "./assets/poop_load.png", {
      frameWidth: 63,
      frameHeight: 63
    });
    this.load.spritesheet("poop_select", "./assets/poop_select.png", {
      frameWidth: 63,
      frameHeight: 63
    });
    this.load.image("load1", "./assets/load/load1.png");
    this.load.image("load2", "./assets/load/load2.png");
    this.load.image("load3", "./assets/load/load3.png");
    this.load.image("load4", "./assets/load/load4.png");
    this.load.image("load5", "./assets/load/load5.png");
    this.load.image("load6", "./assets/load/load6.png");
    this.load.image("load7", "./assets/load/load7.png");
    this.load.image("load8", "./assets/load/load8.png");
    this.load.image("load9", "./assets/load/load9.png");
    this.load.image("load10", "./assets/load/load10.png");
  };

  LoadScene.prototype.create = function () {
    var _this = this;

    this.anims.create({
      key: "poop_load",
      frames: this.anims.generateFrameNumbers("poop_load", {}),
      frameRate: 15,
      repeat: 0
    });
    this.anims.create({
      key: "poop_projectile",
      frames: this.anims.generateFrameNumbers("poop_projectile", {
        frames: [0, 1, 2, 3, 4]
      }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "poopE_projectile",
      frames: this.anims.generateFrameNumbers("poopE_projectile", {
        frames: [0, 1, 2, 3, 4]
      }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "arrow",
      frames: this.anims.generateFrameNumbers("arrow", {
        frames: [0, 1, 2, 3, 4, 7]
      }),
      frameRate: 10,
      repeat: 5,
      hideOnComplete: true
    });
    this.anims.create({
      key: "poop_select",
      frames: this.anims.generateFrameNumbers("poop_select", {}),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true
    });
    this.anims.create({
      key: "monkey_head",
      frames: this.anims.generateFrameNumbers("monkey_head", {
        start: 1,
        end: 12
      }),
      frameRate: 30,
      repeat: 0,
      hideOnComplete: false,
      showOnStart: true
    });
    this.anims.create({
      key: 'load',
      frames: [{
        key: 'load1'
      }, {
        key: 'load2'
      }, {
        key: 'load3'
      }, {
        key: 'load4'
      }, {
        key: 'load5'
      }, {
        key: 'load6'
      }, {
        key: 'load7'
      }, {
        key: 'load8'
      }, {
        key: 'load9'
      }, {
        key: 'load10',
        duration: 100
      }],
      frameRate: 2,
      repeat: 0
    });
    this.add.sprite(250, 600, 'poop_load').play('poop_load').setDepth(2).setScale(8);
    this.add.sprite(300, 600, 'poop_load').playAfterDelay('poop_load', 500).setDepth(2).setScale(8);
    this.add.sprite(350, 600, 'poop_load').playAfterDelay('poop_load', 1000).setDepth(2).setScale(8);
    this.add.sprite(400, 600, 'poop_load').playAfterDelay('poop_load', 1500).setDepth(2).setScale(8);
    this.add.sprite(450, 600, 'poop_load').playAfterDelay('poop_load', 2000).setDepth(2).setScale(8);
    this.add.sprite(500, 600, 'poop_load').playAfterDelay('poop_load', 2500).setDepth(2).setScale(8);
    this.add.sprite(550, 600, 'poop_load').playAfterDelay('poop_load', 3000).setDepth(2).setScale(8);
    this.add.sprite(600, 600, 'poop_load').playAfterDelay('poop_load', 3500).setDepth(2).setScale(8);
    this.add.sprite(650, 600, 'poop_load').playAfterDelay('poop_load', 4000).setDepth(2).setScale(8);
    this.add.sprite(400, 300, 'load1').play('load').setDepth(1);
    this.input.once('pointerdown', function () {
      _this.scene.start(CST_1.CST.SCENES.MENU);
    }, this);
    setTimeout(function () {
      return _this.scene.start(CST_1.CST.SCENES.MENU);
    }, 5500);
  };

  return LoadScene;
}(Phaser.Scene);

exports.LoadScene = LoadScene;
},{"../CST":"src/CST.ts"}],"src/scenes/MenuScene.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuScene = void 0;

var CST_1 = require("../CST");

var MenuScene =
/** @class */
function (_super) {
  __extends(MenuScene, _super);

  function MenuScene() {
    return _super.call(this, {
      key: CST_1.CST.SCENES.MENU
    }) || this;
  }

  MenuScene.prototype.create = function () {
    var _this = this;

    this.add.image(400, 155, "logo").setScale(15);
    var playButton = this.add.image(400, 300, 'play');
    var optionsButton = this.add.image(400, 400, 'options');
    this.input.on('pointerdown', function (pointer) {
      _this.add.sprite(pointer.x + 30, pointer.y + 240, 'poop_select').setScale(8).play('poop_select');

      _this.sound.play("splet");
    }, this);
    playButton.setInteractive();
    playButton.on("pointerup", function () {
      console.log("weeeee");
      setTimeout(function () {
        return _this.scene.start(CST_1.CST.SCENES.PLAY);
      }, 1500);
    }, optionsButton.setInteractive());
    optionsButton.on("pointerup", function () {
      console.log("woooo");
    });
  };

  return MenuScene;
}(Phaser.Scene);

exports.MenuScene = MenuScene;
},{"../CST":"src/CST.ts"}],"src/scenes/PlayScene.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayScene = void 0;

var CST_1 = require("../CST");

var bancount;
var count = 0;
var enemy;
var enmGo;
var hitcount = 0;
var hitcount2 = 0;
var R = 0;
var F = 0;

var PlayScene =
/** @class */
function (_super) {
  __extends(PlayScene, _super);

  function PlayScene() {
    var _this = _super.call(this, {
      key: CST_1.CST.SCENES.PLAY
    }) || this;

    _this.poopgroup, _this.poop;
    _this.Epoop;
    _this.Epoopgroup;
    _this.enemy;
    return _this;
  }

  PlayScene.prototype.preload = function () {
    this.cursors = this.input.keyboard.createCursorKeys();
  };

  PlayScene.prototype.create = function () {
    var _this = this; //tilemap


    var map = this.make.tilemap({
      key: 'lvl1'
    });
    var tileset = map.addTilesetImage('poop_sheet', 'tiles');
    map.createLayer('background', tileset);
    this.blockslayer = map.createLayer('blocked', tileset);
    this.blockslayer.setCollisionBetween(1, 7, true);
    this.physics.world.bounds.width = 800;
    this.physics.world.bounds.height = 800; //player

    this.player = this.physics.add.sprite(400, 300, 'monkey_head').setCircle(10).setOffset(6);
    this.player.setDepth(2);
    this.physics.add.existing(this.player, false);
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, this.blockslayer);
    this.cameras.main.startFollow(this.player, false);
    this.cameras.main.zoom = 2;
    this.cameras.main.setBounds(0, 0, 800, 800); //enemys

    enemy = this.physics.add.group({
      classType: enemys,
      createCallback: function createCallback(go) {
        enmGo = go;
        enmGo.body.onCollide = true;
      }
    });
    this.enemy = enemy.get(350, 50, 'enemy').setCircle(10).setOffset(6).setCollideWorldBounds(true);
    this.scan = this.physics.add.sprite(this.enemy.x - 110, this.enemy.y - 110, 'enemy').setVisible(false).setCircle(120).setOffset(6);
    this.enemy2 = enemy.get(100, 300, 'enemy').setCircle(10).setOffset(6).setCollideWorldBounds(true);
    this.scan2 = this.physics.add.sprite(this.enemy2.x - 110, this.enemy2.y - 110, 'enemy').setVisible(false).setCircle(120).setOffset(6);
    this.physics.add.collider(enemy, this.blockslayer);
    this.physics.add.collider(enemy, this.player, this.handlePlayerEnemyCollision, undefined, this);
    this.enemy.setCollideWorldBounds(true); //projectile

    this.poopgroup = new poopgroup(this);
    this.Epoopgroup = new Epoopgroup(this);
    var spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    spaceKey.on('down', function () {
      _this.playerMthrow.paused = false;
    });
    spaceKey.on('up', function () {
      _this.playerMthrow.paused = true;
    });
    this.playerthrow = this.time.addEvent({
      delay: 500,
      startAt: 500,
      callback: function callback() {
        _this.poopgroup.poopthrow(_this.player.x, _this.player.y, _this.player.rotation, _this.blockslayer), _this.player.play("monkey_head");
      },
      loop: true,
      paused: true
    });
    this.playerMthrow = this.time.addEvent({
      delay: 500,
      startAt: 500,
      callback: function callback() {
        _this.poopgroup.poopMthrow(_this.player.x, _this.player.y, _this.player.rotation, _this.blockslayer), _this.player.play("monkey_head");
      },
      loop: true,
      paused: true
    }); //keybinds

    this.cursors = this.input.keyboard.createCursorKeys();
    this.inputKeys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D
    });
    var B = this.physics.add.group({
      classType: banana
    });
    this.dropbanana = this.time.addEvent({
      callback: function callback() {
        B.get(_this.enemy.x, _this.enemy.y, "banana").setCircle(6).setOffset(10);
      },
      loop: false,
      paused: true
    });
    this.dropbanana2 = this.time.addEvent({
      callback: function callback() {
        B.get(_this.enemy2.x, _this.enemy2.y, "banana").setCircle(6).setOffset(10);
      },
      loop: false,
      paused: true
    });
    this.dropbanana3 = this.time.addEvent({
      callback: function callback() {
        B.get(_this.enemy.x, _this.enemy.y, "banana").setCircle(6).setOffset(10);
      },
      loop: false,
      paused: true
    });
    this.dropbanana4 = this.time.addEvent({
      callback: function callback() {
        B.get(_this.enemy2.x, _this.enemy2.y, "banana").setCircle(6).setOffset(10);
      },
      loop: false,
      paused: true
    });
    this.Jmove = this.time.addEvent({
      callback: function callback() {
        hitcount2 = 0, hitcount = 0, count = 0, _this.physics.moveTo(_this.jimmy, 395, 10, 5), _this.jimmy.rotation = Phaser.Math.Angle.Between(_this.jimmy.x, _this.jimmy.y, _this.player.x, _this.player.y), setTimeout(function () {
          return _this.text1 = _this.add.text(_this.jimmy.x, _this.jimmy.y + 20, "Are they gone?");
        }, 5000);
        setTimeout(function () {
          return _this.text1.destroy();
        }, 8000);
        setTimeout(function () {
          return _this.text2 = _this.add.text(_this.jimmy.x, _this.jimmy.y + 20, "Yes?");
        }, 10000);
        setTimeout(function () {
          return _this.text2.destroy();
        }, 11000);
        setTimeout(function () {
          return _this.text3 = _this.add.text(_this.jimmy.x, _this.jimmy.y + 30, "OH! Thank you so much");
        }, 12000);
        setTimeout(function () {
          return _this.text4 = _this.add.text(_this.jimmy.x, _this.jimmy.y + 45, "for dealing with these");
        }, 12000);
        setTimeout(function () {
          return _this.text5 = _this.add.text(_this.jimmy.x, _this.jimmy.y + 60, "annoying ruffians!");
        }, 12000);
        setTimeout(function () {
          return _this.text3.destroy();
        }, 16000);
        setTimeout(function () {
          return _this.text4.destroy();
        }, 16000);
        setTimeout(function () {
          return _this.text5.destroy();
        }, 16000);
        setTimeout(function () {
          return _this.text6 = _this.add.text(_this.jimmy.x, _this.jimmy.y + 20, "Follow me!");
        }, 17000);
        setTimeout(function () {
          return _this.text6.destroy();
        }, 19000);
        setTimeout(function () {
          return _this.Jmove.paused = true;
        }, 19000);
        setTimeout(function () {
          return _this.Jmoveback.paused = false;
        }, 19000);
        setTimeout(function () {
          return _this.exit = _this.physics.add.image(390, -15, "jimmy").setVisible(false);
        }, 19000);
      },
      loop: false,
      paused: true
    });
    this.Jmoveback = this.time.addEvent({
      callback: function callback() {
        _this.physics.moveTo(_this.jimmy, 395, -10, 25);

        _this.jimmy.rotation = Phaser.Math.Angle.Between(_this.jimmy.x, _this.jimmy.y, _this.player.x, _this.player.y);
      },
      loop: false,
      paused: true
    });
    this.physics.add.collider(this.player, this.exit); //Mobile

    this.input.addPointer(2);
    var joystickCENTER = this.physics.add.sprite(540, 390, "joystick").setVisible(false).setScale(0.8);
    var joystick = this.physics.add.sprite(540, 390, "joystick").setScrollFactor(0).setScale(0.8).setAlpha(0.5).setInteractive({
      draggable: true
    }).setInteractive().on('dragstart', function (pointer, dragX, dragY) {
      R++, R++;
      console.log('R', R);
      console.log('F', F);
    }).on('drag', function (pointer, dragX, dragY) {
      joystick.setPosition(dragX, dragY);
    }).on('dragend', function (pointer, dragX, dragY, dropped) {
      joystick.setPosition(540, 390);
      R--, R--;
      console.log('R', R);
      console.log('F', F);
    });
    joystick.on('drag', function (pointer, dragX, dragY) {
      _this.x = dragX;
      _this.y = dragY;
    });
    this.playerR = this.time.addEvent({
      callback: function callback() {
        _this.player.rotation = Phaser.Math.Angle.Between(joystickCENTER.x, joystickCENTER.y, joystick.x, joystick.y), _this.physics.velocityFromAngle(_this.player.angle, 150, _this.player.body.velocity);
      },
      loop: true,
      paused: true
    });
  };

  ;

  PlayScene.prototype.rotation = function () {
    var _this = this;

    this.input.on('pointermove', function (pointer) {
      _this.player.rotation = Phaser.Math.Angle.Between(_this.player.x, _this.player.y, pointer.worldX, pointer.worldY);
    }, this);
  };

  PlayScene.prototype.Pthrow = function () {
    var _this = this;

    this.input.on('pointerdown', function (pointer) {
      _this.playerthrow.paused = false;
    });
    this.input.on('pointerup', function (pointer) {
      _this.playerthrow.paused = true;
    });
  }; //banana


  PlayScene.prototype.drop = function () {
    if (hitcount == 1) {
      this.dropbanana.paused = false;
    }

    if (hitcount == 2) {
      this.dropbanana3.paused = false;
    }
  };

  PlayScene.prototype.drop2 = function () {
    if (hitcount2 == 1) {
      this.dropbanana2.paused = false;
    }

    if (hitcount2 == 2) {
      this.dropbanana4.paused = false;
    }
  };

  PlayScene.prototype.addbanana = function () {
    bancount = this.add.sprite(225, 175, "banana").setScale(3).setScrollFactor(0);
    count++;
    console.log(count);

    if (count == 2) {
      console.log(count);
      this.add.sprite(250, 175, "banana").setScale(3).setScrollFactor(0);
      this.enemy = enemy.get(300, 50, 'enemy').setCircle(10).setOffset(6).setCollideWorldBounds(true);
      this.scan = this.physics.add.sprite(this.enemy.x - 110, this.enemy.y - 110, 'enemy').setVisible(false).setCircle(120).setOffset(6);
      this.enemy2 = enemy.get(100, 300, 'enemy').setCircle(10).setOffset(6).setCollideWorldBounds(true);
      this.scan2 = this.physics.add.sprite(this.enemy2.x - 110, this.enemy2.y - 110, 'enemy').setVisible(false).setCircle(120).setOffset(6);
    }

    if (count == 3) {
      console.log(count);
      this.add.sprite(275, 175, "banana").setScale(3).setScrollFactor(0);
    }

    if (count == 4) {
      console.log(count);
      this.add.sprite(300, 175, "banana").setScale(3).setScrollFactor(0);
      this.jimmy = this.physics.add.image(395, -20, "jimmy").setBodySize(100, 100);
      this.add.sprite(400, 220, "arrow").setScale(2).setScrollFactor(0).play("arrow");
    }
  };

  PlayScene.prototype.handlePlayerEnemyCollision = function (obj1, obj2) {};

  PlayScene.prototype.update = function () {
    if (R == 0) {
      this.rotation();
      this.Pthrow();
      this.playerR.paused = true;
    }

    if (R == 1) {
      this.playerR.paused = true;
    }

    if (R == 2) {
      this.playerR.paused = false;
      this.playerthrow.paused = true;
    } //banana


    if (hitcount == 1) {
      this.drop();
    }

    if (hitcount2 == 1) {
      this.drop2();
    }

    if (hitcount == 2) {
      this.drop();
    }

    if (hitcount2 == 2) {
      this.drop2();
    }

    if (this.physics.collide(this.player, this.exit)) {
      this.scene.start(CST_1.CST.SCENES.GAMEOVER);
    }

    if (this.physics.overlap(this.player, this.jimmy)) {
      this.Jmove.paused = false;
    } //move


    var speed = 150;
    var playerVelocity = new Phaser.Math.Vector2();

    if (this.inputKeys.up.isDown) {
      playerVelocity.y = -1;
    } else if (this.inputKeys.down.isDown) {
      playerVelocity.y = 1;
    }

    if (this.inputKeys.left.isDown) {
      playerVelocity.x = -1;
    } else if (this.inputKeys.right.isDown) {
      playerVelocity.x = 1;
    }

    playerVelocity.normalize();
    playerVelocity.scale(speed);
    this.player.setVelocity(playerVelocity.x, playerVelocity.y);
  };

  return PlayScene;
}(Phaser.Scene);

exports.PlayScene = PlayScene; //classes

var banana =
/** @class */
function (_super) {
  __extends(banana, _super);

  function banana(scene, x, y, rotation, blockslayer) {
    return _super.call(this, scene, x, y, 'banana') || this;
  }

  banana.prototype.preUpdate = function (time, delta) {
    var _this = this;

    if (this.scene.physics.overlap(this, this.scene.player)) {
      setTimeout(function () {
        return _this.scene.addbanana();
      }, 1);
      setTimeout(function () {
        return _this.destroy();
      }, 2);
    }
  };

  banana.prototype.create = function () {};

  return banana;
}(Phaser.Physics.Arcade.Sprite);

var Epoop =
/** @class */
function (_super) {
  __extends(Epoop, _super);

  function Epoop(scene, x, y, rotation, blockslayer) {
    return _super.call(this, scene, x, y, 'poopE_projectile') || this;
  }

  Epoop.prototype.preUpdate = function (time, delta) {
    if (this.scene.physics.collide(this, this.scene.player)) {
      this.setVisible(false), this.setActive(false), this.scene.sound.play("splet2"), hitcount2 = 0, hitcount = 0, count = 0, this.scene.scene.start(CST_1.CST.SCENES.GAMEOVER);
    }

    if (this.scene.physics.collide(this, this.scene.blockslayer)) {
      this.setVisible(false), this.setActive(false), this.scene.sound.play("splet2");
    }
  };

  Epoop.prototype.Ethrow = function (x, y, rotation, pointer) {
    this.play('poopE_projectile');
    this.body.reset(x, y);
    this.setActive(true);
    this.setVisible(true);
    this.setScale(0.1);
    this.scene.physics.moveTo(this, this.scene.player.x, this.scene.player.y, 250);
    this.rotation = Phaser.Math.Angle.Between(this.scene.enemy.x, this.scene.enemy.y, this.scene.player.x, this.scene.player.y);
    this.setBodySize(20, 20);
    this.scene.sound.play("woesh");
    this.play('poopE_projectile');
  };

  Epoop.prototype.Ethrow2 = function (x, y, rotation, pointer) {
    this.play('poopE_projectile');
    this.body.reset(x, y);
    this.setActive(true);
    this.setVisible(true);
    this.setScale(0.1);
    this.scene.physics.moveTo(this, this.scene.player.x, this.scene.player.y, 250);
    this.rotation = Phaser.Math.Angle.Between(this.scene.enemy2.x, this.scene.enemy2.y, this.scene.player.x, this.scene.player.y);
    this.setBodySize(20, 20);
    this.scene.sound.play("woesh");
    this.play('poopE_projectile');
  };

  return Epoop;
}(Phaser.Physics.Arcade.Sprite);

var poop =
/** @class */
function (_super) {
  __extends(poop, _super);

  function poop(scene, x, y, rotation, blockslayer) {
    return _super.call(this, scene, x, y, 'poop_projectile') || this;
  }

  poop.prototype.preUpdate = function (time, delta) {
    _super.prototype.preUpdate.call(this, time, delta);

    if (this.scene.physics.collide(this, this.scene.enemy)) {
      this.setVisible(false), this.active = false, this.scene.sound.play("splet2"), this.scene.enemy.destroy(), this.scene.enemy2.pause(), hitcount++, console.log("hitcount", hitcount);
    }

    if (this.scene.physics.collide(this, this.scene.enemy2)) {
      this.setVisible(false), this.setActive(false), this.scene.sound.play("splet2"), this.scene.enemy2.destroy();
      this.scene.enemy.pause2();
      hitcount2++, console.log("hitcount2", hitcount2);
    }

    if (this.scene.physics.collide(this, this.scene.blockslayer)) {
      this.setVisible(false), this.setActive(false), this.scene.sound.play("splet2");
    }
  };

  poop.prototype.fling = function (x, y, rotation, pointer) {
    this.body.reset(x, y);
    this.setActive(true);
    this.setVisible(true);
    this.setScale(0.1);
    this.play('poop_projectile');
    this.scene.physics.moveTo(this, this.scene.input.pointer1.worldX, this.scene.input.pointer1.worldY, 250);
    this.scene.physics.moveTo(this, this.scene.input.mousePointer.worldX, this.scene.input.mousePointer.worldY, 250);
    this.setRotation(rotation);
    this.setBodySize(20, 20);
    this.scene.sound.play("woesh");
    this.setCollideWorldBounds(true);
  };

  poop.prototype.Mfling = function (x, y, rotation, pointer) {
    this.body.reset(x, y);
    this.setActive(true);
    this.setVisible(true);
    this.setScale(0.1);
    this.play('poop_projectile');
    this.setRotation(rotation);
    this.setBodySize(20, 20);
    this.scene.sound.play("woesh");
    this.setCollideWorldBounds(true);
    this.scene.physics.velocityFromAngle(this.scene.player.angle, 250, this.body.velocity);
  };

  return poop;
}(Phaser.Physics.Arcade.Sprite);

var poopgroup =
/** @class */
function (_super) {
  __extends(poopgroup, _super);

  function poopgroup(scene) {
    var _this = _super.call(this, scene.physics.world, scene) || this;

    _this.createMultiple({
      frameQuantity: 50,
      classType: poop,
      active: false,
      visible: false,
      key: "poop_projectile"
    });

    return _this;
  }

  poopgroup.prototype.poopthrow = function (x, y, rotation, blockslayer) {
    var poop = this.getFirstDead(false);

    if (poop) {
      poop.fling(x, y, rotation, blockslayer);
      poop.preUpdate(x, y, rotation);
    }
  };

  poopgroup.prototype.poopMthrow = function (x, y, rotation, blockslayer) {
    var poop = this.getFirstDead(false);

    if (poop) {
      poop.Mfling(x, y, rotation, blockslayer);
      poop.preUpdate(x, y, rotation);
    }
  };

  return poopgroup;
}(Phaser.Physics.Arcade.Group);

var Epoopgroup =
/** @class */
function (_super) {
  __extends(Epoopgroup, _super);

  function Epoopgroup(scene) {
    var _this = _super.call(this, scene.physics.world, scene) || this;

    _this.createMultiple({
      frameQuantity: 50,
      classType: Epoop,
      active: false,
      visible: false,
      key: "poopE_projectile"
    });

    return _this;
  }

  Epoopgroup.prototype.poopEthrow = function (x, y, rotation, blockslayer) {
    var Epoop = this.getFirstDead(false);

    if (Epoop) {
      Epoop.Ethrow(x, y, rotation, blockslayer), Epoop.preUpdate(x, y, rotation);
    }
  };

  Epoopgroup.prototype.poopEthrow2 = function (x, y, rotation, blockslayer) {
    var Epoop = this.getFirstDead(false);

    if (Epoop) {
      Epoop.Ethrow2(x, y, rotation, blockslayer), Epoop.preUpdate(x, y, rotation);
    }
  };

  return Epoopgroup;
}(Phaser.Physics.Arcade.Group);

var Direction;

(function (Direction) {
  Direction[Direction["UP"] = 0] = "UP";
  Direction[Direction["DOWN"] = 1] = "DOWN";
  Direction[Direction["LEFT"] = 2] = "LEFT";
  Direction[Direction["LEFTDOWN"] = 3] = "LEFTDOWN";
  Direction[Direction["LEFTUP"] = 4] = "LEFTUP";
  Direction[Direction["RIGHT"] = 5] = "RIGHT";
  Direction[Direction["RIGHTDOWN"] = 6] = "RIGHTDOWN";
  Direction[Direction["RIGHTUP"] = 7] = "RIGHTUP";
  Direction[Direction["FOLLOW"] = 8] = "FOLLOW";
  Direction[Direction["STOP"] = 9] = "STOP";
})(Direction || (Direction = {}));

var randomDirection = function randomDirection(exclude) {
  var newDirection = Phaser.Math.Between(0, 7);

  while (newDirection === exclude) {
    newDirection = Phaser.Math.Between(0, 7);
  }

  return newDirection;
};

var enemys =
/** @class */
function (_super) {
  __extends(enemys, _super);

  function enemys(scene, x, y, texture) {
    var _this = _super.call(this, scene, x, y, texture) || this;

    _this.direction = Direction.RIGHT;
    scene.physics.world.on(Phaser.Physics.Arcade.Events.TILE_COLLIDE, _this.handleTileCollision, _this);
    _this.moveEvent = scene.time.addEvent({
      delay: 2000,
      callback: function callback() {
        _this.direction = randomDirection(_this.direction);
      },
      loop: true
    });
    _this.enemythrow = scene.time.addEvent({
      delay: 500,
      callback: function callback() {
        _this.scene.Epoopgroup.poopEthrow(_this.scene.enemy.x, _this.scene.enemy.y, _this.scene.enemy.rotation, _this.scene.blockslayer), _this.enemythrow.paused = true;
      },
      loop: true,
      paused: true
    });
    _this.enemythrow2 = scene.time.addEvent({
      delay: 500,
      callback: function callback() {
        _this.scene.Epoopgroup.poopEthrow2(_this.scene.enemy2.x, _this.scene.enemy2.y, _this.scene.enemy2.rotation, _this.scene.blockslayer);

        _this.enemythrow2.paused = true;
      },
      loop: true,
      paused: true
    });
    _this.scan = scene.time.addEvent({
      callback: function callback() {
        if (_this.scene.physics.overlap(_this.scene.scan, _this.scene.player)) {
          _this.enemythrow.paused = false, _this.direction = 8;
        }
      },
      loop: true,
      paused: false
    });
    _this.scan2 = scene.time.addEvent({
      callback: function callback() {
        if (_this.scene.physics.overlap(_this.scene.scan2, _this.scene.player)) {
          _this.enemythrow2.paused = false, _this.direction = 8;
        }
      },
      loop: true,
      paused: false
    });
    _this.STOP = scene.time.addEvent({
      callback: function callback() {
        _this.scan.paused = true;
        _this.enemythrow.paused = true, _this.direction = 9;
      },
      loop: true,
      paused: true
    });
    _this.STOP2 = scene.time.addEvent({
      callback: function callback() {
        _this.scan2.paused = true;
        _this.enemythrow2.paused = true, _this.direction = 9;
      },
      loop: true,
      paused: true
    });
    return _this;
  }

  enemys.prototype.destroy = function (fromScene) {
    this.scan.paused = true, this.scan2.paused = true, this.moveEvent.destroy(), this.enemythrow.destroy(), this.enemythrow.paused = true, this.enemythrow2.destroy(), this.enemythrow2.paused = true, _super.prototype.destroy.call(this, fromScene);
  };

  enemys.prototype.pause = function () {
    this.scan.paused = true;
  };

  enemys.prototype.pause2 = function () {
    this.scan2.paused = true;
  };

  enemys.prototype.handleTileCollision = function (go, tile) {
    if (go !== this) {
      return;
    }

    this.direction = randomDirection(this.direction);
  };

  enemys.prototype.preUpdate = function (t, dt) {
    _super.prototype.preUpdate.call(this, t, dt);

    this.scene.physics.moveTo(this.scene.scan, this.scene.enemy.x - 110, this.scene.enemy.y - 110, 200);
    this.scene.physics.moveTo(this.scene.scan2, this.scene.enemy2.x - 110, this.scene.enemy2.y - 110, 200);
    var speed = 100;

    switch (this.direction) {
      case Direction.UP:
        this.setVelocity(0, -speed);
        this.setAngle(-90);
        break;

      case Direction.DOWN:
        this.setVelocity(0, speed);
        this.setAngle(90);
        break;

      case Direction.LEFT:
        this.setVelocity(-speed, 0);
        this.setAngle(180);
        break;

      case Direction.LEFTDOWN:
        this.setVelocity(-speed, speed);
        this.setAngle(135);
        break;

      case Direction.LEFTUP:
        this.setVelocity(-speed, -speed);
        this.setAngle(-135);
        break;

      case Direction.RIGHT:
        this.setVelocity(speed, 0);
        this.setAngle(0);
        break;

      case Direction.RIGHTDOWN:
        this.setVelocity(speed, speed);
        this.setAngle(45);
        break;

      case Direction.RIGHTUP:
        this.setVelocity(speed, -speed);
        this.setAngle(-45);
        break;

      case Direction.FOLLOW:
        this.scene.physics.moveTo(this, this.scene.player.x, this.scene.player.y, 100);
        this.rotation = Phaser.Math.Angle.Between(this.x, this.y, this.scene.player.x, this.scene.player.y);
        break;

      case Direction.STOP:
        this.setVelocity(0, 0);
        this.setAngle(0);
        break;
    }
  };

  return enemys;
}(Phaser.Physics.Arcade.Sprite);
},{"../CST":"src/CST.ts"}],"src/main.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/** @type {import("../typings/phaser")} */

var GameOverScene_1 = require("./scenes/GameOverScene");

var LoadScene_1 = require("./scenes/LoadScene");

var MenuScene_1 = require("./scenes/MenuScene");

var PlayScene_1 = require("./scenes/PlayScene");

var game = new Phaser.Game({
  width: 800,
  height: 600,
  backgroundColor: '#73AA58',
  scene: [LoadScene_1.LoadScene, MenuScene_1.MenuScene, PlayScene_1.PlayScene, GameOverScene_1.GameOverScene],
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      fixedStep: false
    }
  },
  render: {
    pixelArt: true
  },
  scale: {
    zoom: 1.5,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.Center.CENTER_BOTH
  }
});
},{"./scenes/GameOverScene":"src/scenes/GameOverScene.ts","./scenes/LoadScene":"src/scenes/LoadScene.ts","./scenes/MenuScene":"src/scenes/MenuScene.ts","./scenes/PlayScene":"src/scenes/PlayScene.ts"}],"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "58542" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ??? Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] ????  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">????</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/main.ts"], null)
//# sourceMappingURL=/main.b0a109ad.js.map