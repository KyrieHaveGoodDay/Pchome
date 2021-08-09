// $(function () {

//   // [側邊選單] 
//   var $sidenav = $('.sidenav');
//   // [側邊選單]--// 收合
//   $sidenav.on('click', '.sidenav__btn a', function (e) {
//     e.preventDefault();
//     $(this).parents('.sidenav').toggleClass('sidenav--hide');
//   })

//   // [右邊選單]
//   var $rightNav = $('.sidenav--right');
//   // [右邊選單]--// 側選單是
//   var $sidenavTop = $rightNav.length > 0 ? $rightNav.offset().top : 0;
//   // [右邊選單]--// 手機版置頂
//   function rightnavFixedTop() {
//     var $windowTop = $(window).scrollTop();
//     if ($windowTop > $sidenavTop) {
//       $sidenav.addClass('fixed');
//       $('.main').addClass('addPadding')
//     }
//     else {
//       $sidenav.removeClass('fixed');
//       $('.main').removeClass('addPadding')
//     }
//   }

//   // [右邊GoTop]--// 滾動出現
//   function goTopShow() {
//     var $windowTop = $(window).scrollTop();
//     $windowTop >= 100 ? $('.gotop').addClass('show') : $('.gotop').removeClass('show');
//   }
//   // [右邊GoTop]--// gotop
//   $('.gotop').on('click', function () {
//     $('html,body').animate({ scrollTop: '0px' }, 300);
//   });

//   // [錨點]--// 判斷滑動位置
//   $('a[href^="#"]').on('click', function (e) {
//     e.preventDefault();
//     var headerH = $('.header').height();
//     var sidenavH = $('.sidenav').height();
//     var targetTop = $($(this).attr('href')).offset().top;
//     var scrollPos = $(window).width() >= 768 ? targetTop : targetTop - headerH - sidenavH;
//     $('html, body').stop().animate({
//       scrollTop: scrollPos
//     }, 300);
//   });


//   $(window).on('scroll', function () {
//     goTopShow();
//     $(window).width() < 768 && rightnavFixedTop();
//   }).scroll();



// });

//swiper
var swiper = new Swiper(".mySwiper", {
  autoplay: {
    delay: 5000,
  },
  pagination: {
    el: ".swiper-pagination",
    type: "progressbar",
  },

});
var swiper2 = new Swiper(".myProduct", {
  slidesPerView: 6,
  navigation: {
    nextEl: ".swiper-btn-next",
    prevEl: ".swiper-btn-prev",
  },
  breakpoints: {
    1024:{
      slidesPerView: 5.5,
      paceBetween: 20
    },
    600:{
      slidesPerView:4.2,
      paceBetween: 20
    },
    500:{
      slidesPerView:2.2,
      paceBetween: 20
    },
    400: {
      slidesPerView: 2.2,
      spaceBetween: 20
    }
  },
});

var swiper3 = new Swiper(".myBrands", {
  slidesPerView: 6,
  navigation: {
    nextEl: ".brands-btn-next",
    prevEl: ".brands-btn-prev",
  },
  breakpoints: {
    1024:{
      slidesPerView: 5.5,
      paceBetween: 20
    },
    760:{
      slidesPerView:5.2,
    },
    600:{
      slidesPerView:4.5,
    },
    500:{
      slidesPerView:2.2,
    },
    400: {
      slidesPerView: 2.2,
      spaceBetween: 20
    }
  },

});

//滾輪偵測
$(window).scroll(function () {
  var scrollPos = $(window).scrollTop();
  //console.log(scrollPos);
  if (scrollPos > 155) {
      $('#nav_top').addClass('nav_top');
      // $('#main').addClass('nav_height');
  }else if(scrollPos<155) {
      $('#nav_top').removeClass('nav_top');
      // $('#main').removeClass('nav_height');
  }
})



//選單開關
 $('#menu').click(function(){
  $('.nav_open').addClass('menu_Activity');
 })

 $('.nav_off_menu').click(function(){
  $('.nav_open').removeClass('menu_Activity');
 })


 //小icon視差
 $(window).scroll(function () {
  var scrollPos = $(window).scrollTop();
  //console.log(scrollPos);
  $('.bg_scroll_1').css('transform','translateY('+scrollPos/5+'px)');
  $('.bg_scroll_2').css('transform','translateY('+scrollPos/10+'px)');
})
