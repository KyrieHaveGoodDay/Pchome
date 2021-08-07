$(function () {
  // [側邊選單] 
  var $sidenav = $('.sidenav');
  // [側邊選單]--// 收合
  $sidenav.on('click', '.sidenav__btn a', function (e) {
    e.preventDefault();
    $(this).parent().parent().toggleClass('sidenav--hide');
  })
  var $rightNav = $('.sidenav--right');
  // [右邊選單]--// 側選單是否存在
  var $sidenavTop;
  if ($rightNav.length > 0) {
    $sidenavTop = $rightNav.offset().top;
  } else {
    $sidenavTop = 0;
  }
  // [右邊選單]--// 手機版置頂
  function rightnavFixedTop() {
    var $windowTop = $(window).scrollTop();
    if ($windowTop > $sidenavTop) {
      $sidenav.addClass('fixed');
    }
    else {
      $sidenav.removeClass('fixed');
    }
  }
  // [左邊選單]手機底部面板
  $('.other__loaction').on('click', function (e) {
    e.preventDefault();
    if ($('.sidenav--left').hasClass('tab-show')) {
      $('.sidenav--left').removeClass('tab-show');
    } else {
      $('.sidenav--left').addClass('tab-show');
    }
  })
  $('.footer__baord--dismiss').on('click', function (e) {
    $('.sidenav--left').removeClass('tab-show');
  })
  // [左邊選單]手機底部面板 footer增高
  if ($('.footer__board').length !== 0 && $('.sidenav--left .sidenav__btn').is(':hidden')) {
    $('.footer').css('padding-bottom', '60px');
    $('.right__box').css('bottom', '80px')
  }

  // [右邊GoTop && 桌機選單置頂]--// 滾動出現
  function rightBox() {
    var $windowTop = $(window).scrollTop();
    if ($windowTop >= 1) {
      $('.right__box').fadeIn(300);
    } else {
      $('.right__box').fadeOut(300);
    }
  }
  // [右邊GoTop]--// gotop
  $('.gotop').click(function () {
    $('html,body').animate({ scrollTop: '0px' }, 300);
  });

  // scroll event
  $(window).on('scroll', function () {
    rightBox();
    rightnavFixedTop();
  })
});
