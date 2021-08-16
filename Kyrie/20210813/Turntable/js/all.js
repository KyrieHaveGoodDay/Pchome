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
var range = [60, 100, 200, 240, 300];



// 旋轉完判斷要顯示的頁面
function zero(num) {
  // 這裡的num是根據range的範圍傳進來的值 用來判斷要顯示哪個獎項
  console.log(num);
  if(num==60){
    alert('恭喜獲得1點P幣')
  }
  if(num==100){
    alert('銘謝惠顧')
  }
  if(num==200){
    alert('恭喜獲得1點P幣')
  }
  if(num==240){
    alert('恭喜獲得12點P幣')
  }
  if(num==300){
    alert('恭喜獲得1點P幣')
  }


  // alert('恭喜'+num)
  // 回到原點
  
  
  // 得獎提示完才能再次點擊
  
  check = true;
}

// 旋轉的方法
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
  // 將陣列亂數選出的num值帶入zero這個方法去做判斷
  setTimeout('zero('+num+')', 3000);
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


});
// $('.game_board').removeClass('board_go');

//gsap
// gsap.to('.banner_title',{duration:2.5,ease:"bounce.out",y:500});
gsap.from(
  '.banner_title', { duration: 1.5, ease: "bounce.out", y: -270 });