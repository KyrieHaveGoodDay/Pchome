$(function () {

  var imgs = document.images,
    len = imgs.length,
    counter = 0;
  [].forEach.call(imgs, function (img) {
    if (img.complete)
      incrementCounter();
    else
      img.addEventListener('load', incrementCounter, false);
  });
  function incrementCounter() {
    counter++;
    if (counter === len) {
      console.log('All img load')
    }
  }
  var loadingtime = 2000;
  function countDown() {
    console.log(loadingtime)
    loadingtime -= 500
    if (loadingtime < 0 || counter === len) {
      clearInterval(timer);
      if ($(window).width() > 1300) {
        bannerAni();
        setTimeout(() => {
          $('.mask').fadeOut(300);
        }, 300);
      } else {
        $('.mask').fadeOut(300);
      }
    }
  }
  var timer = setInterval(countDown, 500);






  function bannerAni() {
    // box
    var $box = $('.box'),
      $boximgs = $('.boximg'),
      $box2 = $('.box2'),
      $phone = $('.phone'),
      $ps4 = $('.ps4'),
      $text1 = $('.text1'),
      $text2 = $('.text2'),
      $text3 = $('.text3'),
      $pingu = $('.pingu'),
      // item
      $boxman = $('.boxman'),
      $bannerCard = $('.banner__card'),
      $card1 = $('.card1'),
      $card2 = $('.card2'),
      $bannerBtn = $('.banner__btn');

    CustomEase.create("phone", "M0,0,C0.128,0.572,0.212,1.578,0.478,1.578,0.818,1.578,0.838,1,1,1")
    var tl = gsap.timeline({ delay: 0.5 });
    tl.from($box, { duration: 1, y: -900, ease: "power2.in" })
    tl.to($boximgs, { duration: 0.8, y: -150, ease: "power1.out" })
    tl.to($boximgs, { duration: 1.3, y: 0, ease: "bounce.out" })
    // item phone
    tl.to($phone, { duration: 2, y: 0, ease: "phone" }, 1)
    tl.to($phone, { duration: 2.1, x: 0, rotation: 0 }, 1)
    // item ps4
    tl.to($ps4, { duration: 0.8, y: -300, ease: "power1.out" }, 1)
    tl.set($box2, { zIndex: 12 }, 2)
    tl.to($ps4, { duration: 1.4, y: 0, ease: "power1.inOut" }, 1.8)
    tl.to($ps4, { duration: 2.2, x: 0, rotation: 0 }, 1)
    // text1
    tl.to($text1, { duration: 1.5, y: 0, ease: "back.out(1.7)" }, 1)
    tl.to($text1, { duration: 1.4, x: 0, rotation: 360 }, 1)
    // text2
    tl.to($text2, { duration: 1.6, y: 0, ease: "back.out(1.7)" }, 1)
    tl.to($text2, { duration: 1.5, x: 0, rotation: -360 }, 1.2)
    // text3
    tl.to($text3, { duration: 1.7, y: 0, ease: "back.out(1.7)" }, 1)
    tl.to($text3, { duration: 1.6, x: 0, rotation: 0 }, 1.2)
    tl.to($text3, { duration: 0.26, y: 20, rotation: 5, repeat: 1, yoyo: true }, 2.75)
    // pingu
    tl.to($pingu, { duration: 1.5, x: 0, y: -300, rotation: 720, ease: "back.out(1.7)" }, 1)
    tl.to($pingu, { duration: 0.8, y: 0, ease: "back.out(1.7)" }, 2.5)
    //boxman
    tl.from($boxman, { duration: 2, x: -100, opacity: 0, ease: "power4.out" }, 0)
    // card
    tl.from($bannerCard, { duration: 1.2, stagger: 0.4, opacity: 0, y: 250, ease: "back.out(1.7)" }, 2.2)
    tl.from($bannerBtn, { duration: 0.5, opacity: 0, scale: 0.5 }, 2.4)
    tl.to($card1, { duration: 1.2, y: 15, repeat: -1, yoyo: true, ease: "power1.out" }, 3.3)
    tl.to($card2, { duration: 1.2, y: 15, repeat: -1, yoyo: true, ease: "power1.out" }, 3.6)
  }
})