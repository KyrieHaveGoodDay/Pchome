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
    } else {
      $sidenav.removeClass('fixed');
    }
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
    $('html,body').animate({
      scrollTop: '0px'
    }, 300);
  });
  // [錨點]--// 判斷滑動位置
  $('a[href^="#"]:not(.modal-tab)').on('click', function (e) {
    e.preventDefault();
    var target = $(this).attr('href');
    if ($rightNav.hasClass('fixed')) {
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
  // scroll event
  $(window).on('scroll', function () {
    rightBox();
    rightnavFixedTop();
  })

  // $('.pay-modal .modal-tab').on('click', function (e) {
  //   e.preventDefault();
  //   var num = $(this).data('value') - 1;
  //   $('.pay-modal .modal-tab').removeClass('active');
  //   $(this).addClass('active');
  //   $('.modal-pane').fadeOut(250);
  //   $('.modal-pane').eq(num).delay(250).fadeIn();
  // })

});