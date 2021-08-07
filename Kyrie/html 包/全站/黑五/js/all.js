$(function () {

  // [側邊選單] 
  var $sidenav = $('.sidenav');
  var $sidenavBtn = $('.sidenav_btn');
  // [側邊選單]--// 側選單是否存在
  var $sidenavTop;
  if ($sidenav.length > 0) {
    $sidenavTop = $sidenav.offset().top;
  } else {
    $sidenavTop = 0;
  }
  // [側邊選單]--// 收合
  $sidenav.on('click', '.sidenav_btn a', function (e) {
    e.preventDefault();
    $sidenav.toggleClass('sidenav-hide')
  })
  // [側邊選單]--// 手機版置頂
  function navFixedTop() {
    var $windowTop = $(window).scrollTop();
    if ($sidenavBtn.is(':hidden') && $windowTop > $sidenavTop) {
      $sidenav.addClass('fixed');
    }
    else {
      $sidenav.removeClass('fixed');
    }
  }

  //左邊選單
  var $leftnav = $('.leftnav');
  $leftnav.on('click', '.leftnav_btn a', function (e) {
    e.preventDefault();
    toggleLeft();
  })
  // 左邊選單 - 切換
  function toggleLeft() {
    if ($leftnav.hasClass('leftnav-hide')) {
      $leftnav.removeClass('leftnav-hide');
    } else {
      $leftnav.addClass('leftnav-hide');
    }
  }

  //手機底部面板
  $('.other_loaction').on('click', function (e) {
    e.preventDefault();
    if ($('.leftnav').hasClass('tab-show')) {
      $('.leftnav').removeClass('tab-show');
    } else {
      $('.leftnav').addClass('tab-show');
    }
  })
  $('.leftnav_list-dismiss').on('click', function (e) {
    $('.leftnav').removeClass('tab-show');
  })
  // [右邊GoTop]--// 滾動出現
  function rightBox() {
    var $windowTop = $(window).scrollTop();
    if ($windowTop >= 1) {
      $('.right_box').fadeIn(300);
    } else {
      $('.right_box').fadeOut(300);
    }
  }
  // [右邊GoTop]--// gotop
  $('.gotop').click(function () {
    $('html,body').animate({ scrollTop: '0px' }, 300);
  });

  // [錨點]--// 判斷滑動位置
  $('area[href^="#"], a[href^="#"]').on('click', function (e) {
    e.preventDefault();
    var target = $(this).attr('href');
    if ($sidenav.hasClass('fixed')) {
      targetTop = $(target).offset().top - 38;
    } else if ($(window).width() < 769) {
      targetTop = $(target).offset().top - 74;
    } else if ($(window).width() >= 769) {
      targetTop = $(target).offset().top;
    }
    $('html, body').stop().animate({
      scrollTop: targetTop
    }, 300);
  });
  // 監聽
  $(window).on('scroll', function () {
    rightBox();
    navFixedTop();
  })
});
