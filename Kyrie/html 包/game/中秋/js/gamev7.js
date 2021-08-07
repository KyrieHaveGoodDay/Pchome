$(window).on("load", function () {
  $('.loading_mask').addClass('fadeOut').show().delay(100).fadeOut(0);
  setTimeout(animation, 200);
})


function animation() {
  var $startTitle = $('.start__title--text img');
  var $boxman = $('.start__boxman');
  var $startGameBtn = $('.start__startgame');
  TweenMax.staggerTo($startTitle, 0.5, { y: '+=300px', ease: Back.easeOut.config(1.7), delay: 0.5 }, 0.5);
  TweenMax.to($boxman, 1, { x: '+=500px', ease: Power3.easeOut, delay: 0.5 });
  TweenMax.from($boxman, 2, { y: '+=30px', ease: Power0.easeNone, repeat: -1, yoyo: true, delay: 0.5 });
  TweenMax.from($startGameBtn, 1, { scale: 0, ease: Bounce.easeOut, delay: 0.5 });
  $startGameBtn.on('click', function (e) {
    e.preventDefault();
    $('.start').fadeOut(100);
    startGame();
  })
  function startGame() {
    var gameHeight = $('.game').height();
    var moveHeight = gameHeight + 60
    //背景動畫及月亮
    TweenMax.to(".game", 16, { backgroundPositionX: "-768px", ease: Linear.easeNone, repeat: -1 });
    TweenMax.to(".game", 1, {
      backgroundPositionY: "50%", ease: Linear.easeNone, delay: 8, onStart: function () {
        TweenMax.set(".game__moon", { opacity: 1 });
        TweenMax.from(".game__moon", 1, { y: -500, ease: Linear.easeNone });
      }
    });
    TweenMax.to(".game", 1, {
      backgroundPositionY: "0%", ease: Linear.easeNone, delay: 15, onStart: function () {
        TweenMax.to(".game__moon", 1, { y: moveHeight, scale: 2.5, ease: Linear.easeNone });
      }
    });

    // 遊戲物件
    var GameObj = function (size, position, el) {
      this.size = size;
      this.position = position;
      this.$el = $(el);
      this.updateCss();
    }
    // 遊戲物件 --//更新css
    GameObj.prototype.updateCss = function () {
      this.$el.css("left", this.position.x);
      this.$el.css("top", this.position.y);
      this.$el.css("width", this.size.width);
      this.$el.css("height", this.size.height);
    }
    // 遊戲物件 --//檢查碰撞
    GameObj.prototype.collide = function (otherObject) {
      var inRangeX = otherObject.position.x + otherObject.size.width > this.position.x + 30 && otherObject.position.x < this.position.x + this.size.width - 30;
      var inRangeY = otherObject.position.y + otherObject.size.height > this.position.y + 30 && otherObject.position.y < this.position.y + this.size.height - 30;
      return inRangeX && inRangeY;
    }
    // [類別] 主角boxman
    var Box = function (size, position, selector) {
      GameObj.call(this, size, position, selector);
    }
    Box.prototype = Object.create(GameObj.prototype);
    Box.prototype.constructor = Box.constructor;
    // [類別] 主角boxman --//檢查上下邊界
    Box.prototype.update = function () {
      var $gameHeight = $('.game').height();
      var $thisHeight = this.size.height;
      if (this.position.y < 0) {
        this.position.y = 0;
      }
      if (this.position.y + $thisHeight > $gameHeight) {
        this.position.y = $gameHeight - $thisHeight;
      }
      this.updateCss();
    }
    // [類別] 創造boxman
    var box = new Box({ width: 100, height: 100 }, { x: 10, y: 200 }, '.game__boxman');


    // [類別] 障礙物
    var Block = function (size, selector) {
      this.position = { x: 440, y: 0 }
      GameObj.call(this, size, this.position, selector);
      this.initPosition();
    }
    Block.prototype = Object.create(GameObj.prototype);
    Block.prototype.constructor = Block.contructor;
    // [類別] 障礙物--// 判斷初始位置
    Block.prototype.initPosition = function () {
      var $gameHeight = $('.game').height();
      var isTop = R(0, 1);
      this.position.y = (isTop == 0) ? 0 : ($gameHeight - this.size.height);
      this.updateCss();
      this.move();
      if (game.gameTime <= 7) {
        var isTop = R(0, 6);
        if (isTop == 0 || isTop == 1) {
          this.position.y = 0;
        } else if (isTop == 5 || isTop == 6) {
          this.position.y = $gameHeight - this.size.height
        } else {
          this.position.y = ($gameHeight / 2) - (this.size.height / 2)
        }
      }
    }
    // [類別] 障礙物--// 移動
    Block.prototype.move = function () {
      var _this = this;
      var moveTimer = setInterval(function () {
        _this.position.x -= game.blockv;
        if (_this.position.x < -(_this.size.width)) {
          _this.$el.remove();
        }
        _this.updateCss();
        if (game.gameTime > 0 && _this.collide(box)) {
          game.gameLose();
          clearInterval(moveTimer)
        }
      }, 30)
    }


    // 遊戲本體
    var Game = function () {
      this.btnControl();
      this.createBlock();
      this.startGame();
      this.startGameMain();
      this.boxv = 6;
      this.blockv = 5;
      this.touch = false;
      this.gameTime = 21;
      this.isFalse = false;
    }
    // 遊戲本體--// 按鈕控制
    Game.prototype.btnControl = function () {
      var $gameBtn = $('.game__btn');
      var _this = this;
      if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
        $gameBtn.on({
          touchstart: function (e) {
            e.preventDefault();
            _this.boxv = 6;
            _this.touch = true;
          },
          touchend: function (e) {
            e.preventDefault();
            _this.boxv = 6;
            _this.touch = false;
          }
        })
      } else {
        $gameBtn.on({
          mousedown: function (e) {
            e.preventDefault();
            _this.boxv = 6;
            _this.touch = true;
          },
          mouseup: function (e) {
            e.preventDefault();
            _this.boxv = 6;
            _this.touch = false;
          }
        })
      }
    }
    // 遊戲本體--// 時間倒數
    Game.prototype.startGame = function () {
      var _this = this;
      setTimeout(function () {
        countDown()
      }, 500);
      function countDown() {
        var timer = setInterval(function () {
          $('.game__time').text(_this.gameTime);
          _this.gameTime--;
          if (_this.isFalse == true) {
            clearInterval(timer);
            console.log('lose');
          }
          if (_this.gameTime < 0) {
            _this.gameSuccess();
            clearInterval(timer);
          }
        }, 1000);
      }
    }
    // 遊戲本體--// 創造障礙物
    Game.prototype.createBlock = function () {
      var id = 0;
      var _this = this;
      var createTimer = setInterval(function () {
        if (_this.gameTime > 14) {
          var $block = $('<div class="block" id="' + id + '"><img src="img/block_lv1.png"></div>');
          $('.game').append($block);
          var block = new Block({ width: 100, height: 150 }, '#' + id + '');
          id++;
        } else if (_this.gameTime > 8) {
          var $block = $('<div class="block" id="' + id + '"><img src="img/block_lv2.png"></div>');
          $('.game').append($block);
          var block = new Block({ width: 100, height: 150 }, '#' + id + '');
          id++;
        } else if (_this.gameTime <= 6) {
          var blockType = R(0, 1);
          if (blockType == 0) {
            var $block = $('<div class="block" id="' + id + '"><img src="img/block_lv3-1.png"></div>');
          } else {
            var $block = $('<div class="block" id="' + id + '"><img src="img/block_lv3-2.png"></div>');
          }
          $('.game').append($block);
          var block = new Block({ width: 180, height: 100 }, '#' + id + '');
          id++;
        }
      }, 1300)
    }
    // 遊戲本體--// 主要時間函數
    Game.prototype.startGameMain = function () {
      var _this = this;
      var mainTimer = setInterval(function () {
        // 判斷按鈕控制
        if (_this.touch) {
          $('.game__btn img').attr('src', 'img/btn2.png');
          box.position.y -= _this.boxv;
          _this.boxv += 0.6;
        }
        if (!_this.touch) {
          $('.game__btn img').attr('src', 'img/btn1.png');
          box.position.y += _this.boxv;
          _this.boxv += 0.6;
        }
        if (_this.isFalse == true) {
          clearInterval(mainTimer);
        }
        if (_this.gameTime < 0) {
          clearInterval(mainTimer);
        }
        box.update();
      }, 30);
    }
    // 遊戲本體--// 遊戲失敗
    Game.prototype.gameLose = function () {
      this.blockv = 0;
      this.boxv = 0;
      this.isFalse = true;
      console.log('lose');
      TweenMax.pauseAll();
      $('.game__btn').css('pointer-events', 'none');
      TweenMax.to(".game__boxman", 0.5, { y: '-=80px', x: '-=10px', rotation: -40, ease: Power1.easeOut, delay: 0.2, });
      TweenMax.to(".game__boxman", 0.6, { y: '+=800px', ease: Power1.easeIn, delay: 0.7, onComplete: gameLosePop })
    }
    // 遊戲本體--// 遊戲成功
    Game.prototype.gameSuccess = function () {
      this.blockv = 0;
      this.boxv = 0;
      console.log('success');
      TweenMax.pauseAll();
      $('.block').remove();;
      $('.game__btn').css('pointer-events', 'none');
      TweenMax.to(".game__boxman", 3, { y: '+=40', ease: Elastic.easeOut.config(1, 0.3), delay: 1 });
      TweenMax.to(".game__boxman", 0.5, { x: 800, ease: Power1.easeIn, delay: 2.5, onComplete: gameWinPop });
    }
    function gameWinPop() {
      var r = R(0, 2);
      $('.pop__top > img').attr('src', 'img/pop_top.png');
      $('.pop__top--text').html(popObj[r].text);
      $('.pd__link').attr('href', popObj[r].link)
      $('.pop').removeClass('hide');
    }
    function gameLosePop() {
      $('.pop__top > img').attr('src', 'img/pop_top-lose.png');
      $('.pop__top--content').remove();
      $('.pop').removeClass('hide');
    }
    $('.btn__reload').on('click', function () {
      location.reload();
    })
    var game = new Game();

    function R(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }
}





