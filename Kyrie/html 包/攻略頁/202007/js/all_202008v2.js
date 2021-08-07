$(function () {


  // 各分頁bar的數量
  $('.modal-slide .swiper-slide').each(function () {

    var itemNumber = $(this).find('.item').length;
    var $thisBar = $(this).find('.card-progress');
    var barNumber = itemNumber !== 0 ? itemNumber : 1;
    for (var i = 0; i < barNumber; i++) {
      $thisBar.append('<span></span>');
    }

  })

  // transform top
  var positionTop;
  // transform left
  var positionLeftOrg;
  var blockWidth;

  // check IE;
  var isPc = false;
  if ($(window).width() > 1359) {
    isPc = true;
  }


  mainSlideInit();

  setTimeout(function () {
    $(".loading_mask").fadeOut(200);
    blockWidth = $('.item').outerWidth();
    positionTop = $('.page__title').height() + ($('.swiper-slide').height() / 2);
    positionLeftOrg = ($(window).width() - $('.main').width()) / 2;
  }, 800);



  var positionLeft;

  var $modalSlide = $('.modal-slide');           // modalSlide 外部
  var $modalSlideMain = $('.modal-slide__main'); // modalSlide 內部輪播

  var thisIndex;        // 目前大輪播 index
  var $nowCardDom;      // 目前小輪播 DOM
  var $nowSliderTab     // 目前小輪播slide-tab__inner
  var nowCardDomItems;  // 目前小輪播內的張數
  var cardIndex = 1;    // 目前小張輪播小卡所在位子

  var $innerArrowRight = $('.innerslider-arrow__right');  // 右鍵頭
  var $innerArrowLeft = $('.innerslider-arrow__left');    // 左鍵頭

  var nowPdLink;

  // mainSlideInit
  function mainSlideInit() {
    // page icon swiper
    var galleryThumbs = new Swiper('.gallery-thumbs', {
      spaceBetween: 0,
      slidesPerView: 4.2,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      freeMode: true,
    });

    // modal main swiper
    var modalSwiper = new Swiper('.modal-slide__main', {
      effect: isPc ? 'slide' : 'cube',
      cubeEffect: {
        slideShadows: false,
        shadow: false,
      },
      slidesPerView: 1,
      navigation: {
        nextEl: '.mainslider-arrow__right',
        prevEl: '.mainslider-arrow__left',
      },
      noSwiping: true,
      thumbs: {
        swiper: galleryThumbs
      },
      on: {
        init: function () {
          thisIndex = 0;
          innerSliderHandler();
        },
        slideChangeTransitionEnd: function () {
          thisIndex = this.activeIndex;
          innerSliderHandler();
          renewAllSlider();
          if (nowCardDomItems !== 0) {
            $innerArrowRight.removeClass('pointer-none');
          } else {
            $innerArrowRight.addClass('pointer-none');
          }
          $innerArrowLeft.addClass('pointer-none');
        },
      },
    });
  }

  // 小輪播初始化
  function renewAllSlider() {
    $('.modal-slide .swiper-slide').each(function () {
      $(this).find('.slide-tab__inner').css('transform', 'translate3d(0px,0px,0px)');
      $(this).find('.item').removeClass('now');
      $(this).find('.item:eq(0)').addClass('now');
      $(this).find('.pane').removeClass('active');
      $(this).find('.pane:eq(0)').addClass('active');
    })
  }

  // 小輪播變數更新&bar
  function innerSliderHandler() {
    cardIndex = 1;
    console.log(cardIndex);
    $nowCardDom = $('.card' + (thisIndex + 1) + '');
    $nowSliderTab = $nowCardDom.find('.slide-tab__inner');
    nowCardDomItems = $nowCardDom.find('.item').length;
    $('.card-progress span').removeClass('back barAni');
    $nowCardDom.find('.card-progress span:eq(0)').addClass('barAni');
    nowPdLink = $nowCardDom.find('.pane__pd').data('href');
    $nowCardDom.find('.pane__swipeup a').attr('href', nowPdLink);
  }

  // icon是否拖拉
  var drag = false;
  // icon click & call modal
  $('.page__header .icon').on('touchstart', function () {
    drag = false;
    console.log(drag)
  })

  $('.page__header .icon').on('touchmove', function () {
    drag = true;
    console.log(drag)
  })

  $('.page__header .icon').on('click touchend', function (e) {
    e.preventDefault();
    console.log(drag)
    if (drag == false) {
      var $this = $(this);
      var $thisParent = $(this).parent('.swiper-slide');
      var thisLeft = $thisParent.offset().left;
      positionLeft = thisLeft - positionLeftOrg + ($thisParent.width() / 2);
      var pos = '' + positionLeft + 'px ' + positionTop + 'px';
      $modalSlideMain.css('transform-origin', pos);
      gsap.to($this, {
        duration: 0.2, scale: 0.9, onComplete: function () {
          gsap.to($this, { duration: 0.2, scale: 1, onComplete: callModal(thisIndex) })
        }
      })
    }
  })

  // arrow click


  var moveDirection;

  function changeActive() {
    $nowCardDom.find('.item').removeClass('now');
    $nowCardDom.find('.item:eq(' + (cardIndex - 1) + ')').addClass('now');
    $nowCardDom.find('.pane').removeClass('active');
    $nowCardDom.find('.pane:eq(' + (cardIndex - 1) + ')').addClass('active');
    nowPdLink = $nowCardDom.find('.pane:eq(' + (cardIndex - 1) + ') .pane__pd').data('href')
    $nowCardDom.find('.pane__swipeup a').attr('href', nowPdLink);
  }

  function changeBar() {
    $nowCardDom.find('.card-progress span').removeClass('back barAni')
    $nowCardDom.find('.card-progress span').each(function (index, item) {
      if (index < cardIndex - 1) $(this).addClass('back')
      $nowCardDom.find('.card-progress span:eq(' + (cardIndex - 1) + ')').addClass('barAni')
    })
  }


  var arrowEvent = $(window).width() < 576 ? 'touchstart' : 'click';

  $innerArrowRight.on('click', function () {

    $innerArrowLeft.removeClass('pointer-none');
    if (nowCardDomItems !== 0 && nowCardDomItems - cardIndex >= 3) {
      moveDirection = blockWidth * cardIndex;
      $nowSliderTab.css('transform', 'translate3d(-' + moveDirection + 'px,0px,0px)');
    }
    if (cardIndex < nowCardDomItems) cardIndex++;
    console.log(cardIndex);
    changeActive();
    changeBar();
    if (cardIndex === nowCardDomItems) {
      $(this).addClass('pointer-none');
    } else {
      $(this).removeClass('pointer-none');
    }
  })

  $innerArrowLeft.on('click', function () {

    $innerArrowRight.removeClass('pointer-none');
    if (nowCardDomItems !== 0 && nowCardDomItems - cardIndex >= 2) {
      moveDirection = blockWidth * (cardIndex - 2);
      $nowSliderTab.css('transform', 'translate3d(-' + moveDirection + 'px,0px,0px)');
    }
    if (cardIndex > 1) cardIndex--;
    console.log(cardIndex);
    changeActive();
    changeBar();
    if (cardIndex === 1) {
      $(this).addClass('pointer-none');
    } else {
      $(this).removeClass('pointer-none');
    }
  })

  // close modal
  $('.modal-close').on(arrowEvent, function (e) {
    $('.page').removeClass('fixed');
    e.preventDefault();
    gsap.to($modalSlide, { duration: 0.2, opacity: 0, visibility: 'hidden' })
    gsap.fromTo($modalSlideMain, { scale: 1 }, { duration: 0.2, scale: 0, })
  })

  // addFixed 
  if ($(window).width() < 576) {
    $('.page').addClass('fixed');
  }

  // call modal 
  function callModal(thisIndex) {
    $('.page').addClass('fixed');
    gsap.set($modalSlide, { opacity: 1, visibility: 'visible' })
    gsap.fromTo($modalSlideMain, { scale: 0 }, { duration: 0.2, scale: 1, ease: "power2.out" })
  }

  // heart click
  $('.like-btn').on(arrowEvent, function () {
    var $this = $(this);
    $this.toggleClass('like')
    gsap.fromTo($this, { scale: 0.4 }, { duration: 0.8, scale: 1, ease: "elastic.out(1, 0.3)" })
  })



  //Enable swiping...
  $(".pane__swipeup").swipe({
    //Generic swipe handler for all directions
    swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
      if (direction === 'up') openNewWindow();
    },
    threshold: 1
  });

  $('.pane__swipeup--bot a').on('click', function (e) {
    e.preventDefault();
    openNewWindow();
  })
  function openNewWindow() {
    if ($(window).width() < 1300) {
      gsap.to($('.open-mask__bg'), {
        duration: 0.15, delay: 0.05, y: 0, onComplete: function () {
          window.location = nowPdLink;
        }
      })
      gsap.to($('.open-mask__bg'), { duration: 0.1, y: '100%', delay: 1 })
    } else {
      winOpen = window.open("", "_blank");
      winOpen.location = nowPdLink;
    }
  }


  // 禁用手指雙擊縮放
  // var lastTouchEnd = 0;
  // document.documentElement.addEventListener('touchend', function (event) {
  //   var now = Date.now();
  //   if (now - lastTouchEnd <= 300) {
  //     event.preventDefault();
  //   }
  //   lastTouchEnd = now;
  // }, false);
  document.querySelector('.modal-slide').addEventListener('touchmove', function (e) {
    e.preventDefault(); //阻止默認的處理方式(阻止下拉滑動的效果)
  }, { passive: false }); //passive 參數不能省略，用來兼容ios和android
});
