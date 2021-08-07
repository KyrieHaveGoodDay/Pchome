$(function () {
  var imgs = document.images,
    len = imgs.length,
    counter = 0;
  [].forEach.call(imgs, function (img) {
    if (img.complete)
      incrementCounter();
    else
      img.addEventListener('load', incrementCounter, false);
  });
  function incrementCounter() {
    counter++;
    if (counter === len) {
      console.log('All img load')
    }
  }
  var loadingtime = 1500;
  function countDown() {
    console.log(loadingtime)
    loadingtime -= 300
    if (loadingtime < 0 || counter === len) {
      clearInterval(timer);
      $('.loading_mask').fadeOut(300);
    }
  }
  var timer = setInterval(countDown, 300);



  // main slider
  var mainswiper = new Swiper('.main-slider', {
    speed: 1000,
    parallax: true,
    mousewheel: true,
    direction: 'vertical',
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper__btn--next',
    },
    on: {
      transitionStart: function () {
        if (this.activeIndex === 1) {
          page2swiper.autoplay.start();
        }
        else {
          page2swiper.autoplay.stop();
        }
      },
    }
  });
  // page2 slider
  var page2swiper = new Swiper('.page2__slider', {
    effect: 'fade',
    autoplay: false,
    speed: 600,
    loop: true,
    fadeEffect: {
      crossFade: true,
    },
    pagination: {
      el: '.page2__slider .swiper-pagination',
      type: 'progressbar',
    },
  });



  var $hippocampus = $('.hippocampus img'),
    $jellyfish = $('.jellyfish img');

  CustomEase.create("custom1", "M0,0 C0,0 0.096,0.092 0.2,0.3 0.296,0.492 0.3,0.6 0.3,0.6 0.3,0.6 0.34,0.5 0.4,0.5 0.498,0.5 0.6,0.8 0.6,0.8 0.6,0.8 0.642,0.7 0.7,0.7 0.802,0.7 1,1 1,1 ")
  // hippocampus
  gsap.to($hippocampus, { duration: 8, y: -100, repeat: -1, yoyo: true, ease: 'custom1' })
  gsap.to($hippocampus, { duration: 3, rotation: 10, repeat: -1, yoyo: true })
  // jellyfish
  gsap.to($jellyfish, { duration: 3, x: 40, repeat: -1, yoyo: true, ease: 'none' })
  gsap.to($jellyfish, { duration: 2, y: 20, repeat: -1, opacity: 0.6, yoyo: true, ease: 'none' })
  gsap.to($jellyfish, { duration: 5, rotation: 10, repeat: -1, yoyo: true, ease: 'none' })


  var w = $('.main').width();
  var h = $('.main').height();

  var $fish1 = $('.fish1');
  var $fish2 = $('.fish2');

  var startDir1 = R(0, 1) === 1 ? 1 : -1;      // 起始從左或右
  var startDir2 = startDir1 * -1               // 起始從左或右

  function fish1start() {
    var mod = R(0, 1) === 1 ? true : false;
    var startX = startDir1 === 1 ? -200 : w;               // 起始x位置
    var startY = R(h / 4, h - 150);                        // 起始y位置
    var secondDir = startY > (h / 2) ? -1 : 1;             // 第二段y往上or往下判斷
    var secondY = R(50, h / 3) * 1.2 * secondDir;          // 第二段y移動距離
    var firstX = startDir1 === 1 ? (w / 4) : (w - (w / 3));// 第一段x移動距離
    var secondX = startDir1 === 1 ? w : - 200;             // 第二段x移動距離
    var tl = gsap.timeline();
    console.log(mod)
    tl.set($fish1, { x: startX, y: startY, scaleX: startDir1 })
    tl.to($fish1, { duration: 6, x: firstX, ease: "power1.out" })
    tl.to($fish1, { duration: 2, rotation: 8 * startDir1, repeat: 1, yoyo: true }, 2)
    // 額外頂嘴模式
    if (mod !== false) {
      tl.to($fish1, { duration: 0.6, rotation: 4 * secondDir * startDir1, x: '+=' + 20 * startDir1 + 'px', repeat: 3, yoyo: true, ease: "power2.in" }, '-=1')
    }
    tl.to($fish1, { duration: 14, x: secondX, y: '+=' + secondY + 'px', ease: "power2.Out", onComplete: fish1start })
    tl.to($fish1, { duration: 1, rotation: 8 * secondDir * startDir1, repeat: 2, yoyo: true }, '-=14')
    startDir1 *= -1;
  }
  fish1start();

  function fish2start() {
    var startX = startDir2 === 1 ? -200 : w;              // 起始x位置
    var startY = R(h / 5, h - 250);                       // 起始y位置
    var firstDir = startY > (h / 2) ? -1 : 1;             // 第二段y往上or往下判斷
    var firstX = startDir2 === 1 ? w : -200;              // 第一段x移動距離
    var firstY = R(50, h / 3) * 1.2 * firstDir;           // 第二段y移動距離
    var tl = gsap.timeline();
    tl.set($fish2, { x: startX, y: startY, scaleX: startDir2 })
    tl.to($fish2, { duration: R(18, 24), x: firstX, ease: "none", onComplete: fish2start })
    tl.to($fish2, { duration: 18, y: '+=' + firstY + 'px', ease: "back.inOut(1.7)" }, 2)
    tl.to($fish2, { duration: 3, rotation: 15 * firstDir * startDir2, repeat: 5, yoyo: true, ease: "none" }, 2)
    startDir2 *= -1;
  }
  fish2start();


  // 隨機整數 包含 min & mix
  function R(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

});
