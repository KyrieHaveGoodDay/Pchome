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
    navFixedTop();
    rightBox();
  })

  // [line, fb分享] 
  $('.line').on('click', function (e) {
    e.preventDefault();
    window.open('https://line.me/R/msg/text/?' + (encodeURIComponent(document.title)) + '%0D%0A' + (encodeURIComponent(location.href)), '_blank')
  })
  $('.fb').on('click', function (e) {
    window.open('http://www.facebook.com/share.php?u='.concat(encodeURIComponent(location.href)));
  })


  //銀行儲值滑動
  var swiper = new Swiper('.swiper-container', {
    slidesPerView: 'auto',
    spaceBetween: 15,
    simulateTouch: false,
    breakpoints: {
      1160: {
        simulateTouch: true,
      }
    }
  });

  //銀行儲值hover
  $('.swiper-container').on('mouseover', '.swiper-slide', function () {
    var thisId = $(this).data('value');
    var thisPane = '#' + thisId + '';
    $(this).addClass('now').siblings().removeClass('now');
    $(thisPane).addClass('active').siblings().removeClass('active');
  })

});