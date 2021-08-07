$(function () {
  // 判斷裝置
  const isMobile = () =>
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      ? true
      : false;
  const userEvent = isMobile() ? 'touchstart' : 'click';
  const w = $('.items').width();
  const h = $('.items').height();
  const gameTop = $('.game').offset().top;
  const gameLeft = $('.game').offset().left;
  const items = $('.items');
  let leftTime = $('#time');
  let rightScore = $('#score');
  let itemTimeout;
  let gameTime = 15;
  let score = 0;
  let speedControlTime = 15;

  var imgs = document.images,
    len = imgs.length,
    counter = 0;
  [].forEach.call(imgs, function (img) {
    if (img.complete) incrementCounter();
    else img.addEventListener('load', incrementCounter, false);
  });
  function incrementCounter() {
    counter++;
    if (counter === len) {
      console.log('All img load');
    }
  }
  var loadingtime = 1500;
  function countDown() {
    console.log(loadingtime);
    loadingtime -= 300;
    if (loadingtime < 0 || counter === len) {
      clearInterval(timer);
      $('.loading_mask').fadeOut(200);
      page1();
    }
  }
  var timer = setInterval(countDown, 300);

  // page1 animation
  function page1Ani() {
    // firework
    $('.firework').each(function (index) {
      let $this = $(this);
      let tl = gsap.timeline({ repeat: -1, delay: R(0, 2), repeatDelay: R(0, 2) });
      tl.to($this, { duration: 1.5, opacity: 1, ease: 'power4.out' });
      tl.to($this, { duration: 1.5, scale: 1, ease: 'power4.out' }, 0);
      tl.to($this, { duration: 2, y: '30%' }, 0.3);
      tl.to($this, { duration: 2, opacity: 0 }, 0.5);
    });
    // boxman walk
    gsap.to('.boxman', {
      duration: 1,
      backgroundPositionX: '100%',
      repeat: -1,
      ease: 'steps(1)',
    });

    let tl = gsap.timeline({ repeat: -1 });
    tl.to('.envelope-left', {
      duration: 0.5,
      x: '-200%',
      rotation: -90,
      y: '-60%',
      ease: 'power2.out',
    });
    tl.to('.envelope-right', {
      duration: 0.5,
      x: '250%',
      rotation: 90,
      y: '-60%',
      ease: 'power2.out',
    });
    tl.to(
      '.envelope-left',
      {
        duration: 0.3,
        opacity: 0,
      },
      0.2
    );
    tl.to(
      '.envelope-right',
      {
        duration: 0.3,
        opacity: 0,
      },
      0.7
    );
    gsap.from('.boxman-content', { duration: 3, scale: 0.5, y: '-40%', ease: 'steps(5)' });
    gsap.from('.boxman-content', { duration: 1, x: '-65%', repeat: -1, ease: 'steps(1)' });
  }

  // page1 controller
  function page1() {
    page1Ani();
    $('#btn-start').on('click', () => {
      $('#btn-start').addClass('pointer-none');
      gsap.to('.page1', {
        duration: 0.5,
        opacity: 0,
        y: '-20%',
        onComplete: () => {
          $('.page1').remove();
          page2Start();
        },
      });
      gsap.to('.game__footer', { duration: 0.5, y: '150%', opacity: 0 });
    });
  }

  // page2start
  function page2Start() {
    let tl = gsap.timeline();
    tl.to('.page2', { duration: 0.5, opacity: 1 });
    tl.to('.page2__header,.page2__footer', { duration: 0.5, stagger: 0.1, y: 0 });
    itemTimeout = setInterval(() => {
      addItem();
    }, 300);
    setTimeout(() => {
      timeCount();
    }, 1500);
  }

  // add item
  function addItem() {
    let isBomb = R(0, 10) <= 3 ? true : false;
    let addBombClass = isBomb ? 'bomb' : 'envelope';
    let item = $(`<div class="item ${addBombClass}"></div>`);
    gsap.set(item, { x: R(0, w * 0.9), rotation: R(0, 100) - 50, y: -R(0, h / 2) });
    items.append(item);
    let speed = speedControlTime >= 7 ? R(2, 4) : R(1, 2);
    gsap.to(item, {
      duration: speed,
      y: h,
      ease: 'none',
      onComplete: function () {
        item.remove();
      },
    });
  }

  // game time count
  function timeCount() {
    const now = new Date().getTime();
    const end = now + gameTime * 1000;
    gameTimer = setInterval(() => {
      let countTime = parseInt((end - Date.now()) / 1000);
      if (countTime > 0) {
        let countTimeSec = countTime % 60;
        leftTime.text(countTimeSec);
        speedControlTime = countTimeSec;
      } else {
        leftTime.text(0);
        clearInterval(gameTimer);
        clearInterval(itemTimeout);
        gsap.to(items, {
          duration: 0.5,
          opacity: 0,
          y: -50,
          onComplete: function () {
            items.remove();
          },
        });
        setTimeout(() => {
          gameStop();
        }, 1000);
      }
    }, 16);
  }

  // item click
  items.on(userEvent, '.item', function (e) {
    let updateScoreText = $('<p class="updateScore"></p>');
    // pc or mobile position
    const updateScorePosX = isMobile()
      ? e.originalEvent.targetTouches[0].pageX - gameLeft
      : e.pageX - gameLeft;
    const updateScorePosY = isMobile()
      ? e.originalEvent.targetTouches[0].pageY - gameTop
      : e.pageY - gameTop;
    updateScoreText.css({ left: updateScorePosX, top: updateScorePosY });
    $(this).addClass('pointer-none');
    gsap.to($(this), { duration: 0.3, y: '-=20', opacity: 0 });

    // check envelope or bomb
    if ($(this).hasClass('envelope')) {
      score += 50;
      updateScoreText.text('+50');
    } else {
      score -= 30;
      updateScoreText.addClass('minus');
      updateScoreText.text('-30');
      gsap.fromTo('.page2__place', { x: 0 }, { duration: 0.1, x: 5, repeat: 3, yoyo: true });
      gsap.fromTo('.page2__footer', { x: 0 }, { duration: 0.1, x: 8, repeat: 3, yoyo: true });
    }
    rightScore.text(score);
    items.append(updateScoreText);
    gsap.to(updateScoreText, {
      duration: 1,
      x: 20,
      y: -50,
      opacity: 0,
      onComplete: function () {
        updateScoreText.remove();
      },
    });
  });

  // game stop
  function gameStop() {
    if (score < 888) {
      $('.result').attr('src', 'img/modal-lose.png');
      $('#btn-goactive').remove();
    }
    $('#gameover').modal({ backdrop: 'static' });
  }

  // btn again
  $('#btn-again').on('click', function (e) {
    e.preventDefault();
    location.reload();
  });
});

function R(min, max) {
  return min + Math.random() * (max - min);
}
//阻止默認的處理方式(阻止下拉滑動的效果)
document.body.addEventListener(
  'touchmove',
  function (e) {
    e.preventDefault();
  },
  { passive: false }
);
