$(function () {

  var imgs = document.images,
    len = imgs.length,
    counter = 0;
  [].forEach.call(imgs, function (img) {
    if (img.complete) incrementCounter();
    else img.addEventListener("load", incrementCounter, false);
  });

  function incrementCounter() {
    counter++;
    if (counter === len) {
      console.log("All img load");
    }
  }
  var loadingtime = 2000;

  function countDown() {
    console.log(loadingtime);
    loadingtime -= 300;
    if (loadingtime < 0 || counter === len) {
      clearInterval(timer);
      setTimeout(function () {
        $(".loading_mask").fadeOut(200);
        bannerAni();
      }, 300);
    }
  }
  var timer = setInterval(countDown, 500);

  var $title = $('.main-title');
  var $subtitle = $('.sub-title');
  var $light = $('.light');
  var $banneMask = $('.banner-mask');
  var $sliderMask = $('.characters-slider-mask');
  function bannerAni() {

    var tl = gsap.timeline({ delay: 1 });
    tl.from($title, { duration: 2, scale: 0, opacity: 0, ease: "expo.out" })
      .from($subtitle, { duration: 0.6, y: '30%', opacity: 0 }, 0.8)
      .to($light, { duration: 0.5, scale: 2.3, opacity: 1 }, 0.7)
      .to($light, { duration: 1.5, rotation: 540, ease: "power4.out" }, 0.7)
      .to($light, { duration: 0.6, scale: 1, }, 1.2)
      .to([$banneMask, $sliderMask], { stagger: -0.3, duration: 1, opacity: 0 }, 0.6)
      .to($subtitle, { duration: 2, y: '10%', repeat: -1, yoyo: true }, 1.2)
  }



  var topSlider = new Swiper('.top-icon', {
    slidesPerView: 'auto',
    spaceBetween: 0,
    threshold: 5,
  });

  $(window).on('scroll', function () {
    var windowScroll = $(this).scrollTop()
    var sectionTop = $('#card-section').offset().top;
    if (sectionTop - windowScroll < 0) {
      $('.top-section').addClass('show')
    } else {
      $('.top-section').removeClass('show')
    }
  }).scroll();;

  // [banner] 卡片輪播
  var charactersSlider = new Swiper('.characters-slider .swiper-container', {
    initialSlide: 1,
    allowSlidePrev: true,
    allowSlideNext: true,
    slidesPerView: 3.5,
    spaceBetween: 20,
    centeredSlides: true,
    loop: true,
    threshold: 5,
    breakpoints: {
      575: {
        slidesPerView: 2.5,
        spaceBetween: 10,
      },
    },
  });

  // [商品輪播] 含上、下卡
  var tabPdSwiper = new Swiper('.pd-slider', {
    slidesPerView: 'auto',
    threshold: 5,
  });

  // 折疊面板預載入
  $('.collapse').removeClass('show');

  // 目前作用卡面
  var nowCard = '';

  // 畫面滾動 & 移除折疊
  $('.character, .top-icon a').on('click', function () {

    var indexVal = $(this).data('index');
    nowCard = $(this).data('value');
    var $thisCard = $('#' + nowCard + '')
    $thisCard.siblings('.card-block').find('.collapse').removeClass('show');
    var targetTop = $thisCard.offset().top;


    $('html').stop().animate({
      scrollTop: targetTop - $('.top-section').innerHeight() - 15
    }, 500, function () {
      tabControler($thisCard, indexVal)
    });

  })

  // 面版開合
  function tabControler(card, indexVal) {
    // 能力值線
    var $abilityLine = card.find('.ability__line');

    card.addClass('active').siblings('.card-block').removeClass('active').find('.ability').fadeOut();
    // 能力值線與 chart reset
    card.siblings('.card-block').find('.ability__line').css('width', 0);
    charts.forEach(function (item, index) {
      if (index !== indexVal) {
        item.data.datasets[0].data = [6, 6, 6, 6, 6, 6];
        item.update();
      }
    })

    setTimeout(function () {
      card.find('.collapse').collapse('show');
    }, 300);

    card.find('.ability').fadeIn(600);
    gsap.to($abilityLine, {
      duration: isMobile ? 0 : 0.8, width: 200, delay: 0.3, ease: "none", onComplete: function () {
        updateData(indexVal)
      }
    })

  }

  // update && animate chart
  function updateData(indexVal) {
    charts[indexVal].data.datasets[0].data = chartData[indexVal].ability;
    charts[indexVal].update();
  }

  var isMobile = $(window).width() < 768 ? true : false;
  var charts = [chart1, chart2, chart3, chart4, chart5, chart6]
  var chartData = [
    {
      name: '曉志',
      labels: ['智力', '魅力', '網購力', '敏捷度', '裝備', '體力'],
      ability: [6, 7, 7, 8, 8, 9],
      backgroundColor: 'rgba(0,192,255,0.8)',
      gridLines: ['transparent', '#1782e6', '#1782e6', '#1782e6', '#1782e6']

    },
    {
      name: '1U',
      labels: ['智力', '魅力', '時尚感', '網購力', '敏捷度', '裝扮度',],
      ability: [6, 9, 10, 9, 4, 9],
      backgroundColor: 'rgba(147,49,255,0.8)',
      gridLines: ['transparent', '#a06bff', '#a06bff', '#a06bff', '#a06bff']
    },
    {
      name: '小當家',
      labels: ['魅力', '網購力', '敏捷度', '智力', '手藝', '挑剔度',],
      ability: [7, 8, 8, 6, 10, 9],
      backgroundColor: 'rgba(226,0,0,0.8)',
      gridLines: ['transparent', '#c91c1c', '#c91c1c', '#c91c1c', '#c91c1c']
    },
    {
      name: '李鞍',
      labels: ['智力', '魅力', '網購力', '敏捷度', '創造力', '審美觀'],
      ability: [10, 10, 10, 10, 10, 10],
      backgroundColor: 'rgba(5,240,255,0.8)',
      gridLines: ['transparent', '#049de2', '#049de2', '#049de2', '#049de2']
    },
    {
      name: '假博思',
      labels: ['智力', '開箱速', '魅力', '網購力', '敏捷度', '3C通'],
      ability: [9, 9, 6, 8, 6, 10],
      backgroundColor: 'rgba(22,117,0,0.8)',
      gridLines: ['transparent', '#189100', '#189100', '#189100', '#189100']
    },
    {
      name: '嘩媽',
      labels: ['魅力', '智力', '網購力', '敏捷度', '下單速', '節省度'],
      ability: [7, 9, 9, 8, 7, 9],
      backgroundColor: 'rgba(255,120,0,0.8)',
      gridLines: ['transparent', '#d95412', '#d95412', '#d95412', '#d95412']
    },
  ]



  $('canvas').each(function (index) {
    var id = $(this).attr('id');
    var ctx = document.querySelector('#' + id + '').getContext('2d');
    charts[index] = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: chartData[index].labels,
        datasets: [
          {
            label: chartData[index].name,
            data: [6, 6, 6, 6, 6, 6],
            backgroundColor: chartData[index].backgroundColor,
            pointRadius: 0,
            borderWidth: 0,
          }
        ]
      },
      options: {
        startAngle: 30,
        legend: {
          display: false,
          onClick: false,
          labels: {
            fontSize: 14,
            fontColor: 'rgba(0,240,255,0.8)',
          }
        },
        scale: {
          ticks: {
            display: false,
            suggestedMin: 0,
            suggestedMax: 10,
            stepSize: 1,
            maxTicksLimit: 10,
          },
          gridLines: {
            lineWidth: 1,
            color: chartData[index].gridLines,
          },
          angleLines: {
            color: 'transparent',
          },
          pointLabels: {
            fontSize: isMobile ? 12 : 20,
            fontColor: '#fff',
          }
        },
        title: {
          display: false,
        },
      }
    });
  })




})