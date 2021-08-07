(function () {
  $(window).on("load", function () {
    $('.loading_mask').addClass('fadeOut').show().delay(500).fadeOut(0);
    setTimeout(animation, 400);
  })

  function animation() {
    if ($(window).width() < 768) {
      console.log('mb');
      // 開頭動畫
      function first() {
        // logo部分
        var $logo = $('.animate_logo img.logo');
        var $logo_hat = $('.animate_logo img.logo_hat');
        TweenLite.from($logo, 1, { ease: Bounce.easeOut, y: -500, delay: 0.2 });
        TweenLite.from($logo_hat, 1, { ease: Bounce.easeOut, y: -500, delay: 0.5 });

        // boxman
        var $boxman = $('img.boxman');
        var $boxman_shadow = $('img.boxman_shadow');
        var $present1 = $('img.present1');
        var $present1_shadow = $('img.present1_shadow');
        TweenLite.from($boxman, 1, { rotation: 60, x: 200 });
        TweenLite.to($boxman, 1, { x: '20vw', rotation: 0, delay: 2 });
        TweenLite.to($boxman, 1, { x: '-45vw', ease: Power4.easeOut, delay: 3 });
        TweenLite.to($boxman, 1, { y: '30vw', ease: Bounce.easeOut, delay: 3 });
        TweenLite.to($boxman, 1.5, { y: '-50vw', x: '-150vw', rotation: -40, ease: Power4.easeOut, delay: 3.6 });
        // boxman_shadow
        TweenLite.to($boxman_shadow, 1, { x: '-74vw', scale: 0.8, ease: Power4.easeOut, delay: 3 });
        TweenLite.to($boxman_shadow, 1.5, { x: '-150vw', scale: 1.4, opacity: 0, ease: Power4.easeOut, delay: 3.5 });

        // present
        TweenLite.from($present1, 1.5, { scale: 0, rotation: -720, x: '-20vw', delay: 4 });
        TweenLite.from($present1, 1.5, { ease: Back.easeIn.config(1.7), y: '-50vw', delay: 4 });
        TweenLite.to($present1, 1, { ease: Bounce.easeOut, y: '0vw', delay: 4.6 });
        // present_shadow
        TweenLite.from($present1_shadow, 0.3, { opacity: 0, scale: 0.2, ease: Power4.easeOut, delay: 4.8, onComplete: presentScale });
        function presentScale() {
          setTimeout(function () {
            $present1.addClass('present_scale');
          }, 500)
        }
      }
      first();
      // 打開禮物動畫
      $('a.animate_present1').on('click', second);
      function second() {

        var $mask = $('.mask');
        var $present1 = $('img.present1');
        var $animate_present2 = $('.animate_present2');
        var $present_head = $('img.present_head');
        var $result_box = $('.result_box');
        $present1.remove();
        $mask.css('display', 'block');
        $animate_present2.css('display', 'block');


        // animate start
        TweenLite.to($present_head, 0.4, { ease: Power2.easeOut, y: '-30vw', x: '-40vw', delay: 1 });
        TweenLite.to($present_head, 0.8, { ease: Bounce.easeOut, y: '16vw', x: '-48vw', delay: 1.4 });
        TweenLite.to($present_head, 1.5, { rotation: -220, delay: 1 });
        TweenLite.from($result_box, 0.7, { scale: 0, delay: 1.2 })
        TweenLite.from($result_box, 0.7, { ease: Power4.easeOut, y: '70vw', delay: 1.2 });
      }
      // second();

    } else {
      console.log('pc');
      function first() {
        // logo部分
        var $logo = $('.animate_logo img.logo');
        var $logo_hat = $('.animate_logo img.logo_hat');
        TweenLite.from($logo, 1, { ease: Bounce.easeOut, y: -500, delay: 0.2 });
        TweenLite.from($logo_hat, 1, { ease: Bounce.easeOut, y: -500, delay: 0.5 });

        // boxman
        var $boxman = $('img.boxman');
        var $boxman_shadow = $('img.boxman_shadow');
        var $present1 = $('img.present1');
        var $present1_shadow = $('img.present1_shadow');
        TweenLite.from($boxman, 1, { rotation: 60, x: 200 });
        TweenLite.to($boxman, 1, { x: '200px', rotation: 0, delay: 2 });
        TweenLite.to($boxman, 1, { x: '-360px', ease: Power4.easeOut, delay: 3 });
        TweenLite.to($boxman, 1, { y: '170px', ease: Bounce.easeOut, delay: 3 });
        TweenLite.to($boxman, 1.5, { y: '-350px', x: '-1100px', rotation: -40, ease: Power4.easeOut, delay: 3.6 });
        // boxman_shadow
        TweenLite.to($boxman_shadow, 1, { x: '-600px', scale: 0.8, ease: Power4.easeOut, delay: 3 });
        TweenLite.to($boxman_shadow, 1.5, { x: '-1000px', scale: 1.4, opacity: 0, ease: Power4.easeOut, delay: 3.5 });

        // present
        TweenLite.from($present1, 1.5, { scale: 0, rotation: -720, x: '-150px', delay: 3.5 });
        TweenLite.from($present1, 1.5, { ease: Back.easeIn.config(1.7), y: '-300px', delay: 3.5 });
        TweenLite.to($present1, 1, { ease: Bounce.easeOut, y: '0', delay: 4.5 });
        // present_shadow
        TweenLite.from($present1_shadow, 0.3, { opacity: 0, scale: 0.2, ease: Power4.easeOut, delay: 4.8, onComplete: presentScale });
        function presentScale() {
          setTimeout(function () {
            $present1.addClass('present_scale');
          }, 500)
        }
      }
      first();
      // 打開禮物動畫
      $('a.animate_present1').on('click', second);
      function second() {

        var $mask = $('.mask');
        var $present1 = $('img.present1');
        var $animate_present2 = $('.animate_present2');
        var $present_head = $('img.present_head');
        var $result_box = $('.result_box');
        $present1.remove();
        $mask.css('display', 'block');
        $animate_present2.css('display', 'block');

        // animate start
        TweenLite.to($present_head, 0.4, { ease: Power2.easeOut, y: '-250px', x: '-300px', delay: 1 });
        TweenLite.to($present_head, 0.8, { ease: Bounce.easeOut, y: '130px', x: '-390px', delay: 1.4 });
        TweenLite.to($present_head, 1.5, { rotation: -220, delay: 1 });
        TweenLite.from($result_box, 0.7, { scale: 0, delay: 1.2 })
        TweenLite.from($result_box, 0.7, { ease: Power4.easeOut, y: '400px', delay: 1.2 });
      }
      // second();
    }
  }




})();