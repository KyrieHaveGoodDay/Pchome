$('.btn-start').on('click', function (e) {
  e.preventDefault();
  $(this).css('pointer-events', 'none');
  gameStart();
})
var start = 0;
function gameStart() {
  var r = Robj(24, 33);
  console.log(r);
  for (var i = start; i <= r; i++) {
    (function (num) {
      setTimeout(function () {
        var now = num % 8;
        console.log(num);
        $('[data-value]').removeClass('now');
        $('[data-value="' + now + '"]').addClass('now');
        if (num == r) {
          $('.pop_link').
            attr('href', popObj[now].link).
            find('img').attr('src', popObj[now].img);
          setTimeout(function () {
            pop(now);
          }, 1000)
        }
      }, 30 * (num * num) / 5);
    })(i);
  }
  start = r % 8;
}
var popObj = [
  {
    img: 'img/pop_01.png',
    link: 'javascript:;'
  },
  {
    img: 'img/pop_02.png',
    link: 'javascript:;'
  },
  {
    img: 'img/pop_03.png',
    link: 'https://www.pchomeec.tw/activity/AC00051533'
  },
  {
    img: 'img/pop_04.png',
    link: 'https://www.pchomeec.tw/activity/AC41536633'
  },
  {
    img: 'img/pop_05.png',
    link: 'https://www.pchomeec.tw/activity/AC09027737'
  },
  {
    img: 'img/pop_06.png',
    link: 'javascript:;'
  },
  {
    img: 'img/pop_07.png',
    link: 'https://www.pchomeec.tw/activity/AC00051773'
  },
  {
    img: 'img/pop_08.png',
    link: 'https://www.pchomeec.tw/activity/AC53691236'
  },
]
function pop(now) {
  $('.btn-start').css('pointer-events', 'auto');
  $('#modal3').modal('show');
}

//隨機整數
function Robj(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}