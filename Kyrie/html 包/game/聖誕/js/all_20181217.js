
(function () {

  // 隨機結果
  var allResult = [
    {
      name: '聖誕禮物',
      title: '大特賣69折',
      link: 'https://24h.pchome.com.tw/store/?fq=/A/115641'
    },
    {
      name: '多用披肩毯',
      title: '3件$869',
      link: 'https://24h.pchome.com.tw/store/?fq=/A/116024'
    },
    {
      name: '人氣泡麵/快煮麵  ',
      title: '必敗3折up',
      link: 'https://24h.pchome.com.tw/store/DBAY3U'
    }
  ]
  function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  getNum = getRandom(1, 4);
  console.log(getNum);
  allResultHtml = '';
  allResultHtml += '<h3>恭喜獲得</h3>';
  allResultHtml += '<p>' + allResult[getNum - 1].name + '</p>';
  allResultHtml += '<p>' + allResult[getNum - 1].title + '</p>';
  $('a.result_link').attr('href', allResult[getNum - 1].link);
  $('.result_box .text_content').html(allResultHtml);
  $('a.reload').on('click', function () {
    location.reload();
  })


  // 燈箱
  $('.open-popup-link').magnificPopup({
    type: 'inline',
    midClick: true,
    fixedContentPos: 'true',
    fixedBgPos: 'true',
    removalDelay: 100,
    mainClass: 'my-mfp-zoom-in'
  });

  // 禁用雙指縮放
  document.documentElement.addEventListener('touchstart', function (event) {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  }, false);

  // 禁用手指雙擊縮放
  var lastTouchEnd = 0;
  document.documentElement.addEventListener('touchend', function (event) {
    var now = Date.now();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, false);




})();