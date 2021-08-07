$(function () {

  // 側邊選單 - 開關
  var $sidenav = $('.sidenav');
  var $sidenavBtn = $('.sidenav_btn');
  var $sidenavTop = $sidenav.offset().top;
  $sidenav.on('click', '.sidenav_btn a', function (e) {
    e.preventDefault();
    if ($sidenav.hasClass('sidenav-hide')) {
      $sidenav.removeClass('sidenav-hide');
    } else {
      $sidenav.addClass('sidenav-hide');
    }
  })


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

  // 置底app - PChome APP開啟時不顯示下載banner
  var $appDownload = $('.app_download');
  var $appDLHeight = $appDownload.height();
  var useragent = navigator.userAgent;
  var useAPP = useragent.match(/PChome/);
  if (useAPP == 'PChome') {
    $appDownload.css('display', 'none');
    $('.footer').css('padding-bottom', 0);
  }
  // 置底app - 關閉按鈕
  $('.app_download-close').on('click', function (e) {
    e.preventDefault();
    $appDownload.fadeOut(200);
    $('.footer, .right_box').css('padding-bottom', 0);
  })
  // 置底app - 偵測app_download高度
  if ($appDownload.is(':visible')) {
    $('.footer').css('padding-bottom', $appDLHeight);
  }
  // 置底app - resize時偵測app_download高度
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
      } else if ($appDownload.is(':hidden')) {
        $('.right_box')
          .css('padding-bottom', 0)
          .fadeIn(300);
      }
    } else {
      $('.right_box').fadeOut(300);
    }
  }
  $(window).on({
    scroll: function () {
      navFixedTop();
      rightBox();
    },
    resize: function () {
      footerResize();
      rightBox();
    }
  });












});