$(function () {


  var dir = -1;
  var $boat = $('.boat')
  function boat() {
    dir *= -1;
    var x = -dir * 200;
    gsap.set($boat, { scaleX: dir })
    gsap.to($boat, { duration: 10, x: x, ease: "power1.inOut", onComplete: boat })
  }
  boat();



  var userName;       // 使用者名字
  var nowSvg;         // 目前作用地圖dom
  var currentAnswer;  // 目前題目正確答案
  var additionalImg;  // 額外處理地圖
  var point = 0;      // 計分

  // 商品連結10選1
  $('.btn-pd').attr('href', linkData[R(0, 9)]);

  // [第一卡] 版頭動畫
  var $bear = $('.bear'),
    $balloon1 = $('.balloon1'),
    $balloon2 = $('.balloon2');
  var tl = gsap.timeline();
  tl.to($bear, { duration: 1, rotation: -10, repeat: -1, yoyo: true, ease: "none" })
    .to($balloon1, { duration: 3, y: -15, repeat: -1, yoyo: true, ease: "power1.inOut" }, 0)
    .to($balloon1, { duration: 2, rotation: 6, repeat: -1, yoyo: true, ease: "none" }, 0)
    .to($balloon2, { duration: 2.5, y: -10, repeat: -1, yoyo: true, ease: "power1.inOut" }, 0)
    .to($balloon2, { duration: 1.6, rotation: -6, repeat: -1, yoyo: true, ease: "none" }, 0)

  // [第一卡] 姓名燈箱 //input foucs 移除警告
  $('#name').on('focus', function () {
    $(this).removeClass('is-invalid')
  })

  // [第一卡] 姓名燈箱 //確認名字
  $('#game-start').on('click', function (e) {
    e.preventDefault();
    // 禁止空白
    var inputValue = $('#name').val().trim();
    if (!inputValue) {
      $('#name').addClass('is-invalid');
      $('#name').val('')
    } else {
      $('.game-start').addClass('pointer-none')
      userName = inputValue;
      $('#username').text(userName);
      $('#inputName').modal('hide');
      removeCard1();
    }
  })

  // [第一卡] 姓名燈箱// enter 鍵
  if ($('#inputName').has('.show')) {
    $(window).on('keydown', function (e) {
      e.keyCode === 13 && $('#game-start').click();
    })
  }

  // [第一卡] 姓名燈箱// 開啟時 focus
  $('#inputName').on('shown.bs.modal', function () {
    $('#name').focus()
  })

  // [第二卡] 移除第一卡
  function removeCard1() {
    tl.clear();
    gsap.to('.game-start__title,.game-start__btn', {
      duration: 0.6, delay: 0.5, stagger: 0.2, scale: 0, ease: "back.in(1.7)", onComplete: function () {
        $('.game-start').remove();
        $('.game-main').removeClass('pointer-none');
        gsap.to($('.game-top'), { duration: 0.3, autoAlpha: 1, y: 0, })
        gsap.to($('.game-top'), { duration: 1.5, y: 0, ease: "elastic.out(1, 0.3)" })
        $('g').addClass('gray')
      }
    })
  }

  // [第二卡] 地圖 click 效果
  $('g').on('click', function () {
    $('g').addClass('pointer-none');
    nowSvg = $(this);
    var area = $(this).attr('id');
    filterArea(area)
    additionalImg = area === 'north' || area === 'others' ? area : null;
  })

  // [第二卡] 篩選目前區域 & 塞資料進燈箱 
  function filterArea(area) {

    // 選取符合物件
    var result = areaData.filter(function (item) {
      return item.area === area;
    })

    // 決定問題 & 倒入資料進燈箱
    var questionData = result[0].questionList[R(0, 1)]
    var question = questionData.question;
    var answerList = questionData.answer;
    currentAnswer = questionData.correct;
    $('.question').text(question);
    $('.answer-list li').each(function (index) {
      $(this).text(answerList[index]);
    })

    // 問題燈箱 開啟
    $('#questions').modal({
      keyboard: false,
      backdrop: 'static',
      show: true,
    })

  }

  // [答題燈箱] 選擇答案 //對或錯
  $('.answer-list li').on('click', function () {
    $(this).addClass('select').siblings().removeClass('select')
    var value = $(this).data('answer');
    if (value === currentAnswer) {
      $('.feedback').removeClass('wrong');
      setTimeout(function () {
        answerRight();
      }, 300);
    } else {
      $('.feedback').addClass('wrong');
      gsap.fromTo($('.feedback'), { scale: 0.6 }, { duration: 0.6, scale: 1, ease: "elastic.out(1, 0.3)" })
    }
  })

  // [答題燈箱] 成功//開啟答對燈箱，第五題開啟結束燈箱
  function answerRight() {
    $('#questions').modal('hide');
    $('.answer-list li').removeClass('select');
    point++;
    if (point < 5) {
      $('#answerright').modal({
        keyboard: false,
        show: true,
      })
    } else {
      mapFadeOut();
      setTimeout(function () {
        $('#gamesuccess').modal({
          keyboard: false,
          show: true,
        })
        gsap.to($('.game-bottom'), { duration: 0.6, autoAlpha: 1, y: 0 })
      }, 800);
    }
  }

  $('#answerright').on('shown.bs.modal', function (e) {
    gsap.fromTo($('.answerright-text'), { scale: 0, opacity: 0 }, { duration: 0.6, scale: 1, opacity: 1, ease: "back.out(1.7)" })
    gsap.fromTo($('.answerright-boxman'), { y: 80, rotate: -60 }, { duration: 0.3, y: 0, rotate: 0 })
  })

  $('#answerright').on('hidden.bs.modal', mapFadeOut)

  $('#gamesuccess').on('shown.bs.modal', function (e) {
    gsap.to($('.gamesuccess-boxman'), { duration: 0.6, x: 0, opacity: 1 })
  })

  // map fade out
  function mapFadeOut() {
    gsap.to(nowSvg, {
      duration: 1, y: -50, opacity: 0, onComplete: function () {
        nowSvg.addClass('d-none')
        $('g').removeClass('pointer-none')
      }
    })
    if (additionalImg) {
      var img = $('img[data-area="' + additionalImg + '"]');
      gsap.to(img, { duration: 1, opacity: 1 });
    }
  }

  // 隨機整數 包含 min & mix
  function R(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

});
