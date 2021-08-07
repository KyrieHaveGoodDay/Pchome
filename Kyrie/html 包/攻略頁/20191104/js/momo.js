// JavaScript Document

//$(window).load(function(){
$(function () {



  /* --------------------------------------
   * 共用設定
   * -------------------------------------- */

  /*
	//滿版高度
	function fixPagesHeight() {
		$('html, body, #BodyBase, #BodyBase > div, #BodyBase > div > div, .WRAPPER,.Area_swiperpage_guide,.Area_swiperpage_guide > .box,.Area_swiperpage_guide .box_slidepage,.Area_swiperpage_guide .box_slidepage_con').css({
			height: $(window).outerHeight(true),
		})
	}
	$(window).on('resize', function() {
		fixPagesHeight();
	})
	fixPagesHeight();
  */

  //手機尺寸時
  var isphone = $(window).width() < 767;

  //COPY手機壓標
  var Area_logo = $('#js-for_phone .Area_logo');
  $('[data-hash="page00"]').prepend(Area_logo);


  /* --------------------------------------
   * 單頁輪播--宇宙輪播切換--大區塊
   * -------------------------------------- */

  var PushCard_swiper = new Swiper('#Area_swiperpage_guide > .box', {

    //小圓點-白點swiper-pagination-white, 黑點swiper-pagination-black
    pagination: '.Area_swiperpage_guide .swiper-pagination',
    paginationClickable: true, //觸擊切換
    //左右切換-白色箭頭swiper-button-white, 黑色箭頭swiper-button-black
    nextButton: '#Area_swiperpage_guide .gobtn_next',
    //基本
    initialSlide: 0, //初始險是第幾個
    direction: 'vertical', //滑動方向-垂直(預設水平horizontal),最大包的Class要搭配設定swiper-container-vertical
    speed: 300, //滑動速度(300)
    //觸發條件
    //touchAngle: 10, //容許拖動角度 預設45度 	
    followFinger: false, //拖移時不動，放開後才開始切換
    resistanceRatio: 0, //抵抗率 預設0.85	
    //循環
    //loop: true, //無限循環
    //loopAdditionalSlides: 2, //前後多複製幾個
    //loopedSlides: 6, //開無限循環時，且slidesPerView:不是'auto'，需多設定這個(原本的數量)
    //自動撥放
    //autoplay:0.00000000000001, //自動輪播間隔時間
    //autoplayDisableOnInteraction: false, //觸擊後還是會再自動輪播
    //視差效果
    //parallax: true, //視差效果 標籤內加上data-swiper-parallax="-200"
    //延遲加載 (img加class="swiper-lazy" , src改data-src ) src="  =>改  class="swiper-lazy" data-src="
    lazyLoading: true,			//延遲載入啟動
    lazyLoadingInPrevNext: true,		//提前載入前一個和後一個slide
    //lazyLoadingInPrevNextAmount : 2,	//提前載入幾個前後slide
    lazyLoadingOnTransitionStart: true,	//切換時就開始載入
    //特殊
    keyboardControl: true,		//鍵盤控制
    mousewheelControl: true,	//滑鼠滾輪功能
    watchSlidesProgress: true,	//啟動過程3 2 1 0 -1 -2 -3		
    //初始化
    onInit: function (swiper, speed) {
      //console.log('onInit--初始化')
      var activeIndex = swiper.activeIndex;
      //封面延遲判斷
      if ($('.Area_page0 .bg_icon').hasClass('Area_page0delay')) {
        setTimeout(function () {
          $('.Area_page0 .Area_page0delay').removeClass('Area_page0delay');
        }, 2000)
      }
      for (var i = 0; i < swiper.slides.length; i++) {
        var slide = swiper.slides[i];
        var progress = slide.progress;
        //物件
        if (i == 0) { //[中卡]的
          var scale1 = scale2 = scale3 = 1 + Math.max(progress, -1); //縮放
          go1s = $(slide).find('.go1')[0].style;
          go2s = $(slide).find('.go2')[0].style;
          go3s = $(slide).find('.go3')[0].style;
          go1s.webkitTransform = go1s.MsTransform = go1s.msTransform = go1s.MozTransform = go1s.OTransform = go1s.transform = 'scale(' + scale1 + ')';
          go2s.webkitTransform = go2s.MsTransform = go2s.msTransform = go2s.MozTransform = go2s.OTransform = go2s.transform = 'scale(' + scale2 + ')';
          go3s.webkitTransform = go3s.MsTransform = go3s.msTransform = go3s.MozTransform = go3s.OTransform = go3s.transform = 'scale(' + scale3 + ')';
        };
      };
    },
    //滑動時Progress回調函數
    onProgress: function (swiper, speed) {
      //console.log('onProgress--主卡')
      var activeIndex = swiper.activeIndex;
      for (var i = 0; i < swiper.slides.length; i++) {
        //主卡
        var slide = swiper.slides[i];
        var progress = slide.progress;
        var width = swiper.width;
        var height = swiper.height;
        var x = 0; //X軸
        var y = height * progress; //Y軸
        var opacity = Math.max(1 - Math.abs(progress), 0) //1 - Math.min( Math.abs(progress), 2); //透明度
        var zIndex = Math.max(1 - Math.abs(progress), 0); //圖層
        es = slide.style;
        es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform = 'translate3d(' + x + 'px,' + y + 'px,0px)';
        es.opacity = opacity;
        es.zIndex = zIndex;
        //物件
        if (i == activeIndex) { //[中卡]的
          var scale1 = (1 + Math.max(progress, -1)) * (1 + Math.max(progress, -1)); //縮放
          var scale2 = scale3 = 1 + Math.max(progress, -1); //縮放
          go1s = $(slide).find('.go1')[0].style;
          go2s = $(slide).find('.go2')[0].style;
          go3s = $(slide).find('.go3')[0].style;
          go1s.webkitTransform = go1s.MsTransform = go1s.msTransform = go1s.MozTransform = go1s.OTransform = go1s.transform = 'scale(' + scale1 + ')';
          go2s.webkitTransform = go2s.MsTransform = go2s.msTransform = go2s.MozTransform = go2s.OTransform = go2s.transform = 'scale(' + scale2 + ')';
          go3s.webkitTransform = go3s.MsTransform = go3s.msTransform = go3s.MozTransform = go3s.OTransform = go3s.transform = 'scale(' + scale3 + ')';
        };
      };
    },
    //輪播開始時觸發
    onTransitionStart: function (swiper) {
      //console.log('		onTransitionStart--物件')
      var activeIndex = swiper.activeIndex;
      for (var i = 0; i < swiper.slides.length; i++) {
        var slide = swiper.slides[i];
        var progress = slide.progress;
        //物件
        var scale1 = (1 + Math.max(progress, -1)) * (1 + Math.max(progress, -1)); //縮放
        var scale2 = scale3 = 1 + Math.max(progress, -1); //縮放
        go1s = $(slide).find('.go1')[0].style;
        go2s = $(slide).find('.go2')[0].style;
        go3s = $(slide).find('.go3')[0].style;
        go1s.webkitTransform = go1s.MsTransform = go1s.msTransform = go1s.MozTransform = go1s.OTransform = go1s.transform = 'scale(' + scale1 + ')';
        go2s.webkitTransform = go2s.MsTransform = go2s.msTransform = go2s.MozTransform = go2s.OTransform = go2s.transform = 'scale(' + scale2 + ')';
        go3s.webkitTransform = go3s.MsTransform = go3s.msTransform = go3s.MozTransform = go3s.OTransform = go3s.transform = 'scale(' + scale3 + ')';
        //過卡後清除省效能
        if (activeIndex !== undefined && i !== activeIndex - 1 && i !== activeIndex && i !== activeIndex + 1) { //[初始化][前卡][中卡][後卡]以外的
          go1s = $(slide).find('.go1').attr('style', '');
          go2s = $(slide).find('.go2').attr('style', '');
          go3s = $(slide).find('.go3').attr('style', '');
        };
        //光茫高亮class
        if (i == activeIndex) { //[前卡][中卡]的
          $(slide).find('.go2').addClass('cate-hover');
          $(slide).find('.go3').addClass('cate-hover');
        } else {
          $(slide).find('.go2').removeClass('cate-hover');
          $(slide).find('.go3').removeClass('cate-hover');
        };
      };
    },
    //輪播結束時觸發
    onTransitionEnd: function (swiper) {
      //console.log('onTransitionEnd--選單')
      var activeIndex = swiper.activeIndex;
      //回調選單
      //高亮
      Area_swiperpage_nav_forphone.slides.removeClass('cate-hover').eq(activeIndex).addClass('cate-hover');
      Area_swiperpage_nav_forpc.slides.removeClass('cate-hover').eq(activeIndex).addClass('cate-hover');
      //高亮置中
      navSlideWidth = Area_swiperpage_nav_forphone.slidesSizesGrid[0]; //按鈕寬度
      navActiveSlideLeft = Area_swiperpage_nav_forphone.slides[activeIndex].offsetLeft; //點到的選單坐標
      navWidth = Area_swiperpage_nav_forphone.snapGrid[Area_swiperpage_nav_forphone.snapGrid.length - 1] * -1; //按鈕總寬度
      navCenter = (Area_swiperpage_nav_forphone.width - navSlideWidth) * 0.5; //居中點
      navscrollLeft = (navActiveSlideLeft - navCenter) * -1; //移動距離
      Area_swiperpage_nav_forphone.wrapper.transition(300)
      Area_swiperpage_nav_forphone.wrapper.transform('translate3d(' + navscrollLeft + 'px,0px,0px)')
      if (navscrollLeft > 0) { //貼齊左邊
        Area_swiperpage_nav_forphone.wrapper.transform('translate3d(' + 0 + 'px,0px,0px)')
      };
      if (navscrollLeft < navWidth) { //貼齊右邊
        Area_swiperpage_nav_forphone.wrapper.transform('translate3d(' + navWidth + 'px,0px,0px)')
      };
    },
    //延遲
    onSetTransition: function (swiper, speed) {
      //console.log('	onSetTransition--主卡')
      var activeIndex = swiper.activeIndex;
      for (var i = 0; i < swiper.slides.length; i++) {
        var slide = swiper.slides[i];
        var progress = slide.progress;
        //主卡
        es = slide.style;
        es.webkitTransitionDuration = es.MsTransitionDuration = es.msTransitionDuration = es.MozTransitionDuration = es.OTransitionDuration = es.transitionDuration = speed + "ms";
        //物件
        if (i == activeIndex - 1 || i == activeIndex || i == activeIndex + 1) { //[前卡][中卡][後卡]的
          go1s = $(slide).find('.go1')[0].style;
          go2s = $(slide).find('.go2')[0].style;
          go3s = $(slide).find('.go3')[0].style;
          go1s.webkitTransitionDuration = go1s.MsTransitionDuration = go1s.msTransitionDuration = go1s.MozTransitionDuration = go1s.OTransitionDuration = go1s.transitionDuration = speed + "ms";
          go2s.webkitTransitionDuration = go2s.MsTransitionDuration = go2s.msTransitionDuration = go2s.MozTransitionDuration = go2s.OTransitionDuration = go2s.transitionDuration = speed + "ms";
          go3s.webkitTransitionDuration = go3s.MsTransitionDuration = go3s.msTransitionDuration = go3s.MozTransitionDuration = go3s.OTransitionDuration = go3s.transitionDuration = speed + "ms";
          go1s.webkitTransitionDelay = go1s.MsTransitionDelay = go1s.msTransitionDelay = go1s.MozTransitionDelay = go1s.OTransitionDelay = go1s.transitionDelay = speed * 0 + "ms";
          go2s.webkitTransitionDelay = go2s.MsTransitionDelay = go2s.msTransitionDelay = go2s.MozTransitionDelay = go2s.OTransitionDelay = go2s.transitionDelay = speed * 0.3 + "ms";
          go3s.webkitTransitionDelay = go3s.MsTransitionDelay = go3s.msTransitionDelay = go3s.MozTransitionDelay = go3s.OTransitionDelay = go3s.transitionDelay = speed * 0.6 + "ms";
        };
      };
    },
  });


  /* --------------------------------------
   * 單頁輪播--宇宙輪播切換--選單
   * -------------------------------------- */


  //選單(電腦)
  var Area_swiperpage_nav_forpc = new Swiper('#Area_swiperpage_nav_forpc', {
    //排版
    slidesPerView: 1, //顯示幾個
    slidesPerColumn: 20, //一次顯示幾行
    //↓動作↓
    //初始化
    onInit: function (swiper) {
      a_i = PushCard_swiper.activeIndex; //目前高亮卡
      swiper.slides.eq(a_i).addClass('cate-hover');
    },
    //↑動作↑
  });
  $('#Area_swiperpage_nav_forpc').on('click', '.Nav-slide', function () {
    var clickIndex = $(this).index()//點擊卡
    //切換頁面
    PushCard_swiper.slideTo(clickIndex, 500); //移動到點擊卡
  });


  //選單(手機)
  var Area_swiperpage_nav_forphone = new Swiper('#Area_swiperpage_nav_forphone', {
    //基本
    freeMode: true, //取消只滑動1格,但不會貼齊(要貼齊要再加Sticky)
    //排版
    slidesPerView: 3.9, //顯示幾個
    slideToClickedslide: true, //點擊區塊移動到中間
    //↓動作↓
    //初始化
    onInit: function (swiper) {
      a_i = PushCard_swiper.activeIndex; //目前高亮卡
      swiper.slides.eq(a_i).addClass('cate-hover');
    },
    //移動端用觸發回調(比click快)
    onTap: function (swiper, even) {
      clickIndex = swiper.clickedIndex; //點擊卡
      //切換頁面
      PushCard_swiper.slideTo(clickIndex, 500); //移動到點擊卡
    },
    //↑動作↑
  });



  /* --------------------------------------
   * 銀行bn輪播
   * -------------------------------------- */

	/*
	var Area_guide2 = new Swiper('.Area_guide2 .box_1 .Area_swiper_box ', {
        //基本
        direction: 'vertical', //滑動方向-垂直(預設水平horizontal),最大包的Class要搭配設定swiper-container-vertical
		speed: 3000, //滑動速度(300)
        //排版
        slidesPerView: 4.5, //顯示幾個
        slidesPerGroup: 1, //一次切換幾個
        spaceBetween: 10, //間距
        //自動撥放
        autoplay: 10, //自動輪播間隔時間
        autoplayDisableOnInteraction: false, //觸擊後還是會再自動輪播

		//延遲加載	
		lazyLoading : true,			//延遲載入啟動
		//lazyLoadingInPrevNext : true,		//提前載入前一個和後一個slide
		//lazyLoadingInPrevNextAmount : 2,	//提前載入幾個前後slide
		//lazyLoadingOnTransitionStart : true,//切換時就開始載入		
        //loopAdditionalSlides: 8, //前後多複製幾個
        //loopedSlides: 8, //開無限循環時，且slidesPerView:不是'auto'，需多設定這個(原本的數量)

        //RWD
        breakpoints: {
            768: {
				//排版
				slidesPerView: 6.5, //顯示幾個
            },
        },		
	});
	*/

  /* --------------------------------------
   * 分會場bn輪播
   * -------------------------------------- */


  var Area_pageA2for_pc = new Swiper('.Area_pageA2 .box_1 .Area_swiper_box ', {
    //基本
    //initialSlide: Math.floor( Math.random() * ($('.Area_guide10 .box_1 .swiper-slide').size()) ) , //初始險是第幾個(亂數)
    //自動撥放
    //autoplay: 2500, //自動輪播間隔時間
    //autoplayDisableOnInteraction: false, //觸擊後還是會再自動輪播
    //延遲加載	
    lazyLoading: true,			//延遲載入啟動
    //lazyLoadingInPrevNext : true,		//提前載入前一個和後一個slide
    //lazyLoadingInPrevNextAmount : 2,	//提前載入幾個前後slide
    //lazyLoadingOnTransitionStart : true,//切換時就開始載入		
    //loopAdditionalSlides: 8, //前後多複製幾個
    //loopedSlides: 8, //開無限循環時，且slidesPerView:不是'auto'，需多設定這個(原本的數量)
    //排版
    slidesPerView: 5, //顯示幾個
    spaceBetween: 10, //間距
    slidesPerColumn: 2, //一次顯示幾行
  });

  var Area_pageA2for_phone = new Swiper('.Area_pageA2 .box_2 .Area_swiper_box ', {
    //基本
    //initialSlide: Math.floor( Math.random() * ($('.Area_guide10 .box_2 .swiper-slide').size()) ) , //初始險是第幾個(亂數)
    freeMode: true, //取消只滑動1格,但不會貼齊(要貼齊要再加Sticky)
    freeModeSticky: true, //取消只滑動1格時也可貼齊
    //自動撥放
    //autoplay: 2500, //自動輪播間隔時間
    //autoplayDisableOnInteraction: false, //觸擊後還是會再自動輪播
    //延遲加載	
    lazyLoading: true,			//延遲載入啟動
    //lazyLoadingInPrevNext : true,		//提前載入前一個和後一個slide
    //lazyLoadingInPrevNextAmount : 2,	//提前載入幾個前後slide
    //lazyLoadingOnTransitionStart : true,//切換時就開始載入		
    //loopAdditionalSlides: 8, //前後多複製幾個
    //loopedSlides: 8, //開無限循環時，且slidesPerView:不是'auto'，需多設定這個(原本的數量)
    //排版
    slidesPerView: 2.5, //顯示幾個
    spaceBetween: 10, //間距
    slidesPerColumn: 2, //一次顯示幾行
  });


  /* --------------------------------------
   * 取消共用元件觸碰觸發
   * -------------------------------------- */


  $('#js-for_phone, .gobtn_next, .blackBox').on('touchmove', function (e) { e.preventDefault(); });




});

