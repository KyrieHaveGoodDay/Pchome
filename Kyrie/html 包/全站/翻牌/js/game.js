$(function () {
  if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0) {
    $('.ie-mask').css('display', 'block');
  }
  $('.popup__btn').on('click', function () {
    $(this).addClass('pointer-none')
    gsap.to($('.pop1'), {
      duration: 0.5, ease: "back.in(1.7)", y: '-100vh', onComplete: function () {
        $('.pop1').remove();
        $('.game').removeClass('d-none');
        //開始倒數
        startTimer();
      }
    });
  })
  // 卡片物件
  var obj = [
    {
      type: 1,
      img: 'img/card_back1.png',
    },
    {
      type: 1,
      img: 'img/card_back1.png',
    },
    {
      type: 1,
      img: 'img/card_back1.png',
    },
    {
      type: 2,
      img: 'img/card_back2.png',
    },
    {
      type: 2,
      img: 'img/card_back2.png',
    },
    {
      type: 2,
      img: 'img/card_back2.png',
    },
    {
      type: 3,
      img: 'img/card_back3.png',
    },
    {
      type: 3,
      img: 'img/card_back3.png',
    },
    {
      type: 3,
      img: 'img/card_back3.png',
    },
  ]


  //隨機排列陣列
  obj.sort(randomsort);
  //將物件插入html 
  $(".back.face").each(function (index) {
    var backHtml = '<img src="' + obj[index].img + '">'
    $(this).html(backHtml);
    $(this).parent().attr('data-value', obj[index].type);
  });

  var firstValue = 0;     //第一張卡片值
  var cardFlip = 0;       //總翻牌數量
  var isSuccess = true;   //是否成功
  var totalTime = 59;     //總秒數
  var $timerText = $('.game__time--second');

  //計時器
  function startTimer() {
    function countDown() {
      $timerText.text(totalTime);
      totalTime--
      if (totalTime < 0) {
        clearInterval(timer);
        gameover();
      }
      if (cardFlip == 9 && isSuccess == true) {
        clearInterval(timer);
        gameover();
      }
    }
    var timer = setInterval(countDown, 1000);
  }

  // 翻牌動作
  function flipCard() {
    var $this = $(this);
    var $thisValue = $this.data('value');
    $this.addClass('rotation pointer-none');
    cardFlip++;
    // 取每3張卡的第一張當比對基準
    if (cardFlip > 0 && cardFlip % 3 == 1) {
      firstValue = $thisValue;
      console.log(cardFlip, firstValue);
    }
    // 開起過程有與第一張不符則失敗
    if (cardFlip > 0 && $thisValue !== firstValue) {
      isSuccess = false;
    }
    // 每開起3張確認一次
    if (cardFlip > 0 && cardFlip % 3 == 0) {
      check();
    }
  }

  // 每開起3張確認一次
  function check() {
    // 如果失敗
    if (isSuccess == false) {
      init();
    } else {
      // 有3張卡片成功
      (function (firstValue) {
        setTimeout(function () {
          $('[data-value="' + firstValue + '"]').find('.back').addClass('border--light');
        }, 500);
      })(firstValue);
    }
  }
  // 失敗則初始化
  function init() {
    $cardItem.addClass('pointer-none');
    isSuccess = true;
    cardFlip = 0;
    setTimeout(function () {
      $cardItem.removeClass('rotation');
      $cardItem.find('.back').removeClass('border--light');
    }, 800);
    setTimeout(function () {
      $cardItem.removeClass('pointer-none');
    }, 1000);
  }
  // 時間到或遊戲結束
  function gameover() {
    $cardItem.addClass('pointer-none');
    if (totalTime >= 49) {
      $('.pop2 h4').text(reslut[0].text);
      $('.pop2 p').text(reslut[0].prize);
      $('.pop2 .goactive').attr('href', reslut[0].link);
      $('.pop2 .reload').remove();
    } else if (totalTime >= 39) {
      $('.pop2 h4').text(reslut[1].text);
      $('.pop2 p').text(reslut[1].prize);
      $('.pop2 .goactive').attr('href', reslut[1].link);
    } else if (totalTime >= 29) {
      $('.pop2 h4').text(reslut[2].text);
      $('.pop2 p').text(reslut[2].prize);
      $('.pop2 .goactive').attr('href', reslut[2].link);
    } else {
      $('.pop2 h4').text(reslut[3].text);
      $('.pop2 p').remove();
      $('.pop2 .goactive').remove();
    }
    gsap.to($('.game'), {
      duration: 0.5, scale: 0, ease: "back.in(1.7)", delay: 0.8, onComplete: function () {
        $('.game').remove();
        $('.pop2').removeClass('d-none');
        gsap.from($('.pop2'), { duration: 0.5, opacity: 0, ease: "back.in(1.7)", })
      }
    })
  }

  var $cardItem = $('.flip__card--item');
  $cardItem.on('click', flipCard);
  // reload
  $('.reload').on('click', function () {
    location.reload();
  })
  //用Math.random()函式生成0~1之間的隨機數與0.5比較，返回-1或1
  function randomsort(a, b) {
    return Math.random() > .5 ? -1 : 1;
  }
})