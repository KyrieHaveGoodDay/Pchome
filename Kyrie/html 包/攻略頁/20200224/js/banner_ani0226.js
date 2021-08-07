$(function () {
  var $textShake = $('.text-shake');
  var $queen = $('.queen');
  var $bannerIcon = $('.banner__icon');
  var randomData = [1, 0, 3, 2, 0, 3, 1, 2]
  // start banner animation
  function startAni() {
    var num = randomData.pop();
    var target = $('.text-shake').eq(num);
    gsap.fromTo(target, { opacity: 1, }, {
      duration: 0.2, delay: 0.1, opacity: 0, onStart: function () {
        if (randomData.length > 0) {
          startAni();
        } else {
          $('.banner__march li').addClass('bannerMarch');
          $('.banner__2020--mask').addClass('banner2020');
          gsap.to($queen, { duration: 0.5, y: 0, ease: "power3.out" });
          gsap.to($queen, { duration: 1.3, scale: 1, ease: "elastic.out(1, 0.3)" });
          gsap.to($bannerIcon, { duration: 1, x: 0, rotationY: 1080, opacity: 1, ease: "power2.out", delay: 0.3 })
          gsap.fromTo($textShake, { x: "random(-80,80)", opacity: 0 }, { duration: 1, x: 0, opacity: 1, stagger: 0.2, ease: "power3.out" })
        }
      }
    })
  }
  setTimeout(function () {
    startAni();
  }, 500);
});