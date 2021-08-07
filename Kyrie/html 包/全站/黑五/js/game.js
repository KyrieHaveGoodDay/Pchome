// banner animation 
var $balloon = $('.balloon');
if ($(window).width() > 768) {
  TweenMax.staggerTo($balloon, 1.5, { rotation: "+=2", yoyo: true, repeat: -1, ease: "none" }, 1);
}
// balloon fadeup
function balloon() {
  var $windowTop = $(window).scrollTop();
  if ($windowTop >= 20) {
    TweenMax.staggerTo($balloon, 4, { y: "-=800", ease: Power1.easeOut }, 0.4);
  }
}
$(window).on('scroll', function () {
  balloon();
})
// title animation
var $bannerTitle = $('.banner__title');
TweenMax.to($bannerTitle, 1, {
  y: 0, onComplete: function () {
    $bannerTitle.addClass('title-ani');
  }
})
// 結果卡片
var cardsData = [
  {
    img: 'img/card-1.png',
    link: 'https://24h.pchome.com.tw/store/?fq=/A/134685',
  },
  {
    img: 'img/card-2.png',
    link: 'https://24h.pchome.com.tw/store/?fq=/R/DIAC/coupon',
  },
  {
    img: 'img/card-3.png',
    link: 'https://24h.pchome.com.tw/store/DDCA10',
  },
  {
    img: 'img/card-4.png',
    link: 'https://24h.pchome.com.tw/store/DMBI2X',
  },
  // {
  //   img: 'img/card-5.png',
  //   link: 'https://24h.pchome.com.tw/store/DMBJ2V',
  // },
  {
    img: 'img/card-6.png',
    link: 'javascript:;',
  },
]
// modal open event
var $gameResult = $('.game__result');
$('#game').on('show.bs.modal', function (e) {
  var r = R(0, 4);
  $gameResult.attr('href', cardsData[r].link).find('img').attr('src', cardsData[r].img);
  TweenMax.to($gameResult, 0.6, { rotationY: 360 });
})
$('#game').on('hide.bs.modal', function (e) {
  TweenMax.to($gameResult, 0.6, { rotationY: 0 });
})

// ---- 隨機整數
function R(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
