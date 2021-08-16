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


// 點擊過程中不能再次點擊
// true代表可以點擊
var check = true;
// 隨機抽獎
var range = [60, 90, 180, 240, 270];


function zero(num) {
  console.log(num);
  if(num==60){
    alert('恭喜獲得1點P幣')
  }
  if(num==90){
    alert('銘謝惠顧')
  }
  if(num==180){
    alert('恭喜獲得1點P幣')
  }
  if(num==240){
    alert('恭喜獲得12點P幣')
  }
  if(num==270){
    alert('恭喜獲得1點P幣')
  }


  // alert('恭喜'+num)
  // 回到原點
  $('.game_board').css('transform', 'rotate(1058deg)');
  // 得獎提示完才能再次點擊
  check = true;
}
var i = 0;
// function
function ground() {

  // i=i+600;
  // console.log(i);

  //隨機取陣列的數字
  function ranFun() {
    return parseInt(Math.random() * 5);
  }
  // console.log(range[ranFun()]);
  var num = range[ranFun()];
  // console.log(num);
  // ' + num + '
  $('.game_board').css('transform', 'rotate(' + num + 'deg)');
  // flase 運轉中不能點擊or連點
  check = false;
  setTimeout('zero('+num+')', 4000);
}


$('.game_btn').click(function (e) {
  e.preventDefault();
  
  // 判斷轉盤是否正在旋轉
  // true等於沒有
  // flase是正在旋轉
  if (check == true) {
    ground();

  } else {
    console.log('現在不能點');
  }


})
// $('.game_board').removeClass('board_go');