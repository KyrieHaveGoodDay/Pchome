$(function () {
  // tl1 item
  var $item1 = $('.item1');
  var $item2 = $('.item2');
  var $boxman1 = $('.boxman1');
  var $boxman2 = $('.boxman2');
  var $iconBuy = $('.icon__buy');
  var $iconPay = $('.icon__pay');
  var $clickArrow = $('.click__arrow');
  var $clickEffect = $('.click__effect');
  var $clickBox = $('.click__box');
  var $bannerHand = $('.banner__hand');
  var $circle1 = $('.circle1');
  var $circle2 = $('.circle2');
  var $iconCheck = $('.icon__check');
  var $iconPresent= $('.icon__present');
  // tl2 item
  var tl1 = gsap.timeline();
  //不重復動畫
  tl1.from($item1, {duration: 0.8,y: 200,onComplete: function(){
    drawline1();
  }})
  tl1.from($item2, {duration: 1,x: -300,ease: "power4.out",onComplete:function(){
    boxman1Walk();
  }},0)
  tl1.to($clickArrow, {duration: 0.6,x: 0,y: 0})
  tl1.to($clickArrow, {duration: 0.1,scale: 0.8,repeat: 1,yoyo: true})
  tl1.set($clickEffect,{opacity:1,onComplete:function(){
    $clickBox.addClass('active');
    presentAni()
  }},'-=0.1')
  tl1.to($iconBuy, {duration: 1,y: 0,opacity:1,ease: "elastic.out(1, 0.3)"})

  tl1.to($bannerHand,{duration:0.6,rotation: 0,ease: "power3.out",onComplete: function(){
    startSlider();
  }},'-=0.8')
  tl1.set($boxman2,{opacity: 1},'-=0.5')
  tl1.to($iconPay, {duration: 1,y: 0,opacity:1,ease: "elastic.out(1, 0.3)"},'-=0.4')
  tl1.to($boxman2,{duration:1, x: 230,ease: "power4.out"},'-=1.1')
  tl1.from($circle1,{duration:0.2, scale:0, ease: "back.out(1.7)",onComplete:function(){
    drawline2()
  }},'-=0.8')
  tl1.from($circle2,{duration:0.2, scale:0, ease: "back.out(1.7)"},'-=0.7')
  tl1.to($iconCheck, {duration: 1,y: 0,opacity:1,ease: "elastic.out(1, 0.3)"})
  //boxman walk
  function boxman1Walk(){
    gsap.to($boxman1,{duration:0.4,scale:1,opacity:1,onComplete:function(){
      $boxman1.addClass('walk');
    }})
    gsap.to($boxman1,{duration:5,x:220,ease:'none',delay:0.2,onComplete:function(){
      $boxman1.removeClass('walk');
    }})
  }
  //present
  function presentAni(){
    gsap.to($iconPresent,{duration:10,y:0,x:0,ease: "back.out(1.7)",onComplete:function(){
      gsap.to($iconPresent,{duration:3,y:20,repeat:-1, yoyo: true,ease:'none'})
    }})
    gsap.to($iconPresent,{duration:2,rotation:10,repeat:-1, yoyo: true,ease:'none'})
  }
  // drawline1()
  // drawline2()
  // line draw
  function drawline1() {
    var line1 = Snap('#line1');
    var path = line1.paper.path({
      d: 'M.17,60.17C8,60,17,60,24.52,60.07 ,M27.75,60.06C48,60,68,61,88,60c5-1,9-6,10-12,.74-4.46-.68-9.56-4.9-12-5.1-2.9-11.79-1.4-17.35-2.49C69,32.23,64.67,27.66,63,21c-1.41-5.65,1.64-13.58,6.18-17.08C72.33,1.49,76.14,1,80,1c23,1,47,1,69.5.83',
      stroke: '#424346',
      fill: 'rgba(0,0,0,0)',
    });
    var length = Snap.path.getTotalLength(path);
    path.attr({
      'stroke-dashoffset': length,
      'stroke-dasharray': length
    });
    Snap.animate(length, 0, function (val) {
      path.attr({
        'stroke-dashoffset': val
      });
    }, 600, mina.easeout());
  }

  // line draw
  function drawline2() {
    var line2 = Snap('#line2');
    var path = line2.paper.path({
      d: 'M-.12,2.19H44.81s15.68-1.07,15.68,11c0,7.61-7.21,11.1-14.07,11.42-4,.18-7.86.7-11.19,3a11.45,11.45,0,0,0-5,9.77c0,12.44,8.92,15.55,13.34,15.55L170,52.77',
      stroke: '#424346',
      fill: 'rgba(0,0,0,0)',
    });
    var length = Snap.path.getTotalLength(path);
    path.attr({
      'stroke-dashoffset': length,
      'stroke-dasharray': length
    });
    Snap.animate(length, 0, function (val) {
      path.attr({
        'stroke-dashoffset': val
      });
    }, 600, mina.easeout());
  }



  // startSlider();

  function startSlider() {
    var bannerSlider = new Swiper('.banner__slider .swiper-container', {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      speed: 200,
      autoplay: {
        delay: 1000,
      },
      effect: 'fade',
      fadeEffect: {
        crossFade: true,
      },
      on: {
        slideChangeTransitionStart: function () {
          var preItem = this.activeIndex - 1
          ani(preItem)
        }
      }
    });

    function ani(preItem) {
      $('.banner__slider .swiper-slide img').removeClass('blur')
      $('.banner__slider .swiper-slide').eq(preItem).find('img').addClass('blur');
    }
  }
})