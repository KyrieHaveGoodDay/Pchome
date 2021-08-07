// background animation
(function () {
  var allStars = '';
  for (var i = 1; i < 31; i++) {
    allStars += '<div class="star' + i + '"></div>';
  }
  $('.allStars').html(allStars);
  var $cloud1 = $('.cloud-ani-1');
  var $cloud2 = $('.cloud-ani-2');
  TweenMax.to($cloud1, 6, { x: '+=100px', repeat: -1, yoyo: true, ease: Power0.easeNone });
  TweenMax.to($cloud1, 3, { opacity: 0.5, repeat: -1, yoyo: true });
  TweenMax.to($cloud2, 7, { x: '-=100px', repeat: -1, yoyo: true, ease: Power0.easeNone });
}());


$(function () {
  setTimeout(function () {
    $('.loading_mask').remove();
    bannerAnimate();
  }, 500);

  // banner animation
  function bannerAnimate() {
    var $boxmanufo = $('.boxmanufo');
    var $s1Title1 = $('.s1__title1');
    var $s1Title2 = $('.s1__title2');
    var $s1SubTitle = $('.s1__subtitle');
    var $s1Moon = $('.s1__moon');
    TweenMax.set([$s1Title2, $s1SubTitle], { opacity: 1 });
    TweenMax.to($s1Title1, 0.6, { y: '-10%', opacity: 0, delay: 1 });
    TweenMax.from($s1Title2, 0.6, { y: '-10%', opacity: 0, delay: 2 });
    TweenMax.to($s1Moon, 0.6, { x: '-5%', y: '24%', scale: 0.7, delay: 2 });
    TweenMax.from($s1SubTitle, 0.8, { opacity: 0, scale: 0, ease: Elastic.easeOut.config(1, 0.3), delay: 2.8 });
    // boxmanufo
    TweenMax.to($boxmanufo, 1, { x: -700, scale: 0.2, rotation: 30, ease: Power4.easeOut, delay: 0.4 });
    TweenMax.to($boxmanufo, 1, { x: 200, rotation: -20, ease: Power2.easeInOut, delay: 0.9 });
    TweenMax.to($boxmanufo, 1, {
      x: '-50%', y: '60%', scale: 0.6, rotation: 0, ease: Power2.easeInOut, delay: 1.9, onComplete: function () {
        TweenMax.to($boxmanufo, 1, { y: -20, repeat: -1, yoyo: true, ease: Power0.easeNone });
        // 拿掉mask
        $('.mask').remove();
      }
    });
    // slider7 boxman
    var $s7boxman = $('.s7_boxman');
    TweenMax.fromTo($s7boxman, 2, { x: -30 }, { x: 30, repeat: -1, yoyo: true, ease: Power0.easeNone });
    TweenMax.to($s7boxman, 0.6, { y: -10, repeat: -1, yoyo: true, ease: Power0.easeNone });
  }

  // main slider
  var mySwiper = new Swiper('.main-slider', {
    direction: 'vertical',
    slidesPerView: 1,
    mousewheel: true,
    followFinger: false, //拖移時不動 放開後才切換
    speed: 300,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    navigation: {
      nextEl: '.swiper__btn--next',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    keyboard: {
      enabled: true,
    },
    on: {
      init: function () {
        console.log(this.activeIndex)
        this.emit('slideChangeTransitionEnd');
      },
      slideChangeTransitionStart: function () {
        updateNavTop();
      },
      // 由上往下滾動
      slideNextTransitionStart: function () {
        var actSlider = $(mySwiper.slides[this.activeIndex]);
        var preSlider = $(mySwiper.slides[this.activeIndex - 1])
        var actContent = actSlider.find('.content');
        var preContent = preSlider.find('.content');
        TweenMax.to(preContent, 0.4, { scale: 0, opacity: 0 });
        TweenMax.from(actContent, 0.4, { scale: 5, opacity: 0 });
      },
      slideNextTransitionEnd: function () {
        var allSlider = $(mySwiper.slides).not(':eq(' + this.activeIndex + ')');
        console.log(allSlider);
        var allContent = allSlider.find('.content');
        TweenMax.set(allContent, { scale: 1, opacity: 1 });
      },
      // 由下往上滾動
      slidePrevTransitionStart: function () {
        var actSlider = $(mySwiper.slides[this.activeIndex]);
        var nextSlider = $(mySwiper.slides[this.activeIndex + 1])
        var actContent = actSlider.find('.content');
        var nextContent = nextSlider.find('.content');
        TweenMax.to(nextContent, 0.4, { scale: 5, opacity: 0 });
        TweenMax.from(actContent, 0.4, { scale: 0, opacity: 0 });
      },
      slidePrevTransitionEnd: function () {
        var allSlider = $(mySwiper.slides).not(':eq(' + this.activeIndex + ')');
        var allContent = allSlider.find('.content');
        TweenMax.set(allContent, { scale: 1, opacity: 1 });
      },
    }
  });

  // header選單
  var navTop = new Swiper('#navTop', {
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    freeMode: true,
    slidesPerView: 6.9, //顯示數量
    breakpoints: {
      359: {
        slidesPerView: 2.9,
      },
      767: {
        slidesPerView: 3.9,
      },
      992: {
        slidesPerView: 5.9,
      },
      // when window width is <= 1023px
      1023: {
        slidesPerView: 4.9,
      }
    },
    on: {
      tap: function () {
        mySwiper.slideTo(navTop.clickedIndex, 500);
      }
    }
  });

  // 選單高亮移動控制
  function updateNavTop() {
    $('#navTop .active-nav').removeClass('active-nav')
    var activeNav = $('#navTop .swiper-slide').eq(mySwiper.activeIndex).addClass('active-nav');

    if (!activeNav.hasClass('swiper-slide-visible')) {
      console.log(1);
      if (activeNav.index() > navTop.activeIndex) {
        // console.log('2',2);
        navTop.slideTo(activeNav.index(), 300);
      } else {
        // console.log('3',3);
        var thumbsPerNav = Math.floor(navTop.width / activeNav.width()) - 2
        navTop.slideTo(activeNav.index() - thumbsPerNav)
      }
    }
  };
  // bank swiper
  var bankswiper = new Swiper('.bank__tab .swiper-container', {
    direction: 'horizontal',
    slidesPerView: 'auto',
    spaceBetween: 10,
    simulateTouch: true,
  });
  // bank__tab toggle class
  $('.swiper-container').on('mouseover', '.swiper-slide', function () {
    var thisId = $(this).data('value');
    var thisPane = '#' + thisId + '';
    $(this).addClass('now').siblings().removeClass('now');
    $(thisPane).addClass('active').siblings().removeClass('active');
  })


})