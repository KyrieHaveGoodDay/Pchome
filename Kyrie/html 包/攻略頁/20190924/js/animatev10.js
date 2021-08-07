setTimeout(function () {
  $('.loading_mask').remove();
  animation();
}, 0.6);
function animation() {
  var $handL = $('.hand_left');
  var $handR = $('.hand_right');
  var $percent = $('.banner_percent');
  var $boxman = $('.flyboxman');
  var $boxmanM = $('.flyboxman-m');
  var $ghost1 = $('.ghost1');
  var $ghost2 = $('.ghost2');
  var $bat = $('.bat');
  var $bat6 = $('.bat6');
  var $bat7 = $('.bat7');
  var $bat8 = $('.bat8');
  // 手
  TweenMax.to($handL, 2, { y: -130, ease: Elastic.easeOut.config(1, 0.3), delay: 0.3 });
  TweenMax.to($handL, 1.5, { y: '-=20px', repeat: -1, yoyo: true, ease: Power0.easeNone, delay: 1.5 });
  TweenMax.to($handL, 1, { rotation: -5, repeat: -1, yoyo: true, ease: Power0.easeNone, delay: 1.5 });
  TweenMax.to($handR, 2, { y: -130, ease: Elastic.easeOut.config(1, 0.3), delay: 0.6 });
  TweenMax.to($handR, 0.3, { rotation: -90, x: '-=100px', y: '-=40px', ease: Back.easeIn.config(1.7), delay: 1.5 });
  TweenMax.to($handR, 3, {
    rotation: 0, x: '+=100px', y: '+=40px', ease: Power2.easeOut, delay: 2.7, onComplete: function () {
      TweenMax.to($handR, 1.5, { y: '-=20px', repeat: -1, yoyo: true, ease: Power0.easeNone });
      TweenMax.to($handR, 1, { rotation: 5, repeat: -1, yoyo: true, ease: Power0.easeNone });
    }
  });
  // percent 板子
  TweenMax.to($percent, 1.2, { rotation: 0, ease: Elastic.easeOut.config(1, 0.3), delay: 1.7 });
  // bat
  TweenMax.to($bat, 1.5, { x: 1000, y: -1000, delay: 1.7 });
  // bat6&7&8
  TweenMax.set($bat6, { x: 500, rotation: -30 });
  TweenMax.set($bat7, { x: 700, rotation: 20 });
  TweenMax.set($bat8, { rotation: -20 });
  TweenMax.to([$bat6, $bat7, $bat8], 0.15, { scaleX: 0.8, repeat: -1, yoyo: true });
  TweenMax.staggerTo([$bat6, $bat7, $bat8], 0.5, { y: '20px', repeat: -1, yoyo: true, ease: Power0.easeNone, }, 0.2);

  // boxman 
  TweenMax.to($boxman, 1, { x: -680, y: 0, ease: Power3.easeOut, delay: 2 });
  TweenMax.to($boxman, 1, { y: '+=10px', repeat: -1, yoyo: true, ease: Power0.easeNone, delay: 2.8 });
  // boxman m
  TweenMax.to($boxmanM, 1, { x: 0, y: 0, ease: Power3.easeOut, delay: 2 });
  TweenMax.to($boxmanM, 1, { y: '+=10px', repeat: -1, yoyo: true, ease: Power0.easeNone, delay: 2.8 });

  // ghost 
  TweenMax.to($ghost1, 2, { x: '-=100px', opacity: 0.3, repeat: -1, yoyo: true, ease: Power0.easeNone })
  TweenMax.to($ghost1, 0.7, { y: '-=20px', repeat: -1, yoyo: true, ease: Power0.easeNone });
  TweenMax.to($ghost2, 1, { y: '+=15px', repeat: -1, opacity: 0.4, yoyo: true, ease: Power0.easeNone });
}