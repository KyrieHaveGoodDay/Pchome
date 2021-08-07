$(function () {

  // [側邊選單] 
  var $sidenav = $('.sidenav');
  // [側邊選單]--// 收合
  $sidenav.on('click', '.sidenav__btn a', function (e) {
    e.preventDefault();
    $(this).parents('.sidenav').toggleClass('sidenav--hide');
  })

  // [右邊選單]
  var $rightNav = $('.sidenav--right');
  // [右邊選單]--// 側選單是
  var $sidenavTop = $rightNav.length > 0 ? $rightNav.offset().top : 0;
  // [右邊選單]--// 手機版置頂
  function rightnavFixedTop() {
    var $windowTop = $(window).scrollTop();
    if ($windowTop > $sidenavTop) {
      $sidenav.addClass('fixed');
      $('.main').addClass('addPadding')
    }
    else {
      $sidenav.removeClass('fixed');
      $('.main').removeClass('addPadding')
    }
  }

  // [右邊GoTop]--// 滾動出現
  function goTopShow() {
    var $windowTop = $(window).scrollTop();
    $windowTop >= 100 ? $('.gotop').addClass('show') : $('.gotop').removeClass('show');
  }
  // [右邊GoTop]--// gotop
  $('.gotop').on('click', function () {
    $('html,body').animate({ scrollTop: '0px' }, 300);
  });

  // [錨點]--// 判斷滑動位置
  $('a[href^="#"]').on('click', function (e) {
    e.preventDefault();
    var headerH = $('.header').height();
    var sidenavH = $('.sidenav').height();
    var targetTop = $($(this).attr('href')).offset().top;
    var scrollPos = $(window).width() >= 768 ? targetTop : targetTop - headerH - sidenavH;
    $('html, body').stop().animate({
      scrollTop: scrollPos
    }, 300);
  });


  $(window).on('scroll', function () {
    goTopShow();
    $(window).width() < 768 && rightnavFixedTop();
  }).scroll();



});


$('#all').click(function(e){
  e.preventDefault();
  $('.day').css('display','block');
  $('.lift').css('display','block');
  $('.sports').css('display','block');
  $('.makeups').css('display','block');
})

$('#day').click(function(e){
  e.preventDefault();
  $('.day').css('display','block');
  $('.lift').css('display','none');
  $('.sports').css('display','none');
  $('.makeups').css('display','none');
})

$('#lift').click(function(e){
  e.preventDefault();
  $('.day').css('display','none');
  $('.lift').css('display','block');
  $('.sports').css('display','none');
  $('.makeups').css('display','none');
})
$('#sports').click(function(e){
  e.preventDefault();
  $('.day').css('display','none');
  $('.lift').css('display','none');
  $('.sports').css('display','block');
  $('.makeups').css('display','none');
})
$('#makeups').click(function(e){
  e.preventDefault();
  $('.day').css('display','none');
  $('.lift').css('display','none');
  $('.sports').css('display','none');
  $('.makeups').css('display','block');
})