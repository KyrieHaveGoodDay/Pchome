$(function () {

  // 側邊選單
  var $sidenav = $('.sidenav');
  var $sidenavBtn = $('.sidenav_btn');
  var $sidenavTop;
  if ($sidenav.length > 0) {
    $sidenavTop = $sidenav.offset().top;
  } else {
    $sidenavTop = 0;
  }
  $sidenav.on('click', '.sidenav_btn a', function (e) {
    e.preventDefault();
    toggleNav();
  })

  // 側邊選單 - 切換
  function toggleNav() {
    if ($sidenav.hasClass('sidenav-hide')) {
      $sidenav.removeClass('sidenav-hide');
    } else {
      $sidenav.addClass('sidenav-hide');
    }
  }

  // 側邊選單 - 手機版滾動fixed於上方
  function navFixedTop() {
    var $windowTop = $(window).scrollTop();
    if ($sidenavBtn.is(':hidden') && $windowTop > $sidenavTop) {
      $sidenav.addClass('fixed');
    }
    else {
      $sidenav.removeClass('fixed');
    }
  }

  //置底app
  var $appDownload = $('.app_download');
  var $appDLHeight = $appDownload.height();
  //置底app - app開啟不顯示
  var useragent = navigator.userAgent;
  var useAPP = useragent.match(/PChome/);
  if (useAPP == 'PChome') {
    $appDownload.css('display', 'none');
    $('.footer').css('padding-bottom', 0);
  }
  //置底app - 關閉app_banner
  $('.app_download-close').on('click', function (e) {
    e.preventDefault();
    $appDownload.fadeOut(200);
    $('.footer,.right_box').addClass('pb-0');
  })
  // 置底app - 頁面載入時偵測app_download高度
  if ($appDownload.is(':visible')) {
    $('.footer').css('padding-bottom', $appDLHeight);
  }
  // 置底app - resize偵測app_download高度
  function footerResize() {
    $appDLHeight = $appDownload.height();
    $('.footer').css('padding-bottom', $appDLHeight);
    if ($appDownload.is(':hidden')) {
      $('.footer').css('padding-bottom', 0);
    }
  }

  // 右邊gotop及聯名卡
  function rightBox() {
    var $windowTop = $(window).scrollTop();
    if ($windowTop >= 1) {
      if ($appDownload.is(':visible')) {
        $('.right_box')
          .css('padding-bottom', $appDLHeight)
          .fadeIn(300);
      } else {
        $('.right_box')
          .css('padding-bottom', 0)
          .fadeIn(300);
      }
    } else {
      $('.right_box').fadeOut(300);
    }
  }

  //錨點滑動效果
  $('area[href^="#"], a[href^="#"]').on('click', function (e) {
    e.preventDefault();
    var target = $(this).attr('href');
    if ($sidenav.hasClass('fixed')) {
      targetTop = $(target).offset().top - 45;
    } else if ($(window).width() < 769) {
      targetTop = $(target).offset().top - 90;
    } else if ($(window).width() >= 769) {
      targetTop = $(target).offset().top;
    }
    $('html, body').stop().animate({
      scrollTop: targetTop
    }, 300);
  });

  //gotop
  $('.gotop').click(function () {
    $('html,body').animate({ scrollTop: '0px' }, 300);
  });

  //監聽
  $(window).on({
    scroll: function () {
      navFixedTop();
      rightBox();
    },
    resize: function () {
      navFixedTop();
      footerResize();
    }
  })


  //line, fb分享 
  $('.line').on('click', function (e) {
    e.preventDefault();
    window.open('https://line.me/R/msg/text/?' + (encodeURIComponent(document.title)) + '%0D%0A' + (encodeURIComponent(location.href)), '_blank')
  })
  $('.fb').on('click', function (e) {
    window.open('http://www.facebook.com/share.php?u='.concat(encodeURIComponent(location.href)));
  })


});