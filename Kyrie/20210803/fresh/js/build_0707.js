'use strict';

// products inner html
function productsHtml(domId, data) {
  var str = '';
  data.forEach(function (item, index) {
    str += '\n    <a href="' + item.link + '" target="_blank" class="products__item swiper-slide">\n      <div class="products__img"><img src="img/' + item.img + '"></div>\n      <p class="products__name">' + item.name + '</p>\n      <p class="products__price"><span>$</span>' + item.price + '</p>\n    </a>\n    ';
  });
  document.querySelector(domId + ' .swiper-wrapper').innerHTML = str;
}
productsHtml('#products1-1', pd11);
productsHtml('#products1-2', pd12);
productsHtml('#products1-3', pd13);
productsHtml('#products1-4', pd14);
productsHtml('#products2-1', pd21);
productsHtml('#products2-2', pd22);
productsHtml('#products3-1', pd31);
productsHtml('#products3-2', pd32);

// brands inner html
function brandsHtml() {
  var str = '';
  brands.forEach(function (item, index) {
    str += '\n    <a class="brands__icon swiper-slide" href="' + item.link + '" target="_blank">\n      <div class="brands__img"><img src="img/' + item.img + '" alt="' + item.name + '"></div>\n      <p>' + item.name + '</p>\n    </a>\n    ';
  });
  document.querySelector('.brands .swiper-wrapper').innerHTML = str;
}
brandsHtml();

// banner swiper
var bannerSwiper = new Swiper('.banner__left', {
  loop: true,
  autoplay: true,
  pagination: {
    el: '.swiper-pagination',
    type: 'progressbar'
  }
});

// products 1-1
var products11 = new Swiper('.products1-1 .swiper-container', {
  spaceBetween: 10,
  slidesPerView: 6,
  slidesPerGroup: 6,
  navigation: {
    nextEl: '.products1-1 .button-next',
    prevEl: '.products1-1 .button-prev'
  },
  breakpoints: {
    768: {
      slidesPerView: 4.2,
      slidesPerGroup: 4
    },
    575: {
      slidesPerView: 2.4,
      slidesPerGroup: 2
    }
  }
});

// products 1-2
var products12 = new Swiper('.products1-2 .swiper-container', {
  spaceBetween: 10,
  slidesPerView: 6,
  slidesPerGroup: 6,
  navigation: {
    nextEl: '.products1-2 .button-next',
    prevEl: '.products1-2 .button-prev'
  },
  breakpoints: {
    768: {
      slidesPerView: 4.2,
      slidesPerGroup: 4
    },
    575: {
      slidesPerView: 2.4,
      slidesPerGroup: 2
    }
  }
});

// products 1-3
var products13 = new Swiper('.products1-3 .swiper-container', {
  spaceBetween: 10,
  slidesPerView: 6,
  slidesPerGroup: 6,
  navigation: {
    nextEl: '.products1-3 .button-next',
    prevEl: '.products1-3 .button-prev'
  },
  breakpoints: {
    768: {
      slidesPerView: 4.2,
      slidesPerGroup: 4
    },
    575: {
      slidesPerView: 2.4,
      slidesPerGroup: 2
    }
  }
});

// products 1-4
var products14 = new Swiper('.products1-4 .swiper-container', {
  spaceBetween: 10,
  slidesPerView: 6,
  slidesPerGroup: 6,
  navigation: {
    nextEl: '.products1-4 .button-next',
    prevEl: '.products1-4 .button-prev'
  },
  breakpoints: {
    768: {
      slidesPerView: 4.2,
      slidesPerGroup: 4
    },
    575: {
      slidesPerView: 2.4,
      slidesPerGroup: 2
    }
  }
});

// products 2-1
var products21 = new Swiper('.products2-1 .swiper-container', {
  spaceBetween: 10,
  slidesPerView: 6,
  slidesPerGroup: 6,
  navigation: {
    nextEl: '.products2-1 .button-next',
    prevEl: '.products2-1 .button-prev'
  },
  breakpoints: {
    768: {
      slidesPerView: 4.2,
      slidesPerGroup: 4
    },
    575: {
      slidesPerView: 2.4,
      slidesPerGroup: 2
    }
  }
});

// products 2-2
var products22 = new Swiper('.products2-2 .swiper-container', {
  spaceBetween: 10,
  slidesPerView: 6,
  slidesPerGroup: 6,
  navigation: {
    nextEl: '.products2-2 .button-next',
    prevEl: '.products2-2 .button-prev'
  },
  breakpoints: {
    768: {
      slidesPerView: 4.2,
      slidesPerGroup: 4
    },
    575: {
      slidesPerView: 2.4,
      slidesPerGroup: 2
    }
  }
});

// products 3-1
var products31 = new Swiper('.products3-1 .swiper-container', {
  spaceBetween: 10,
  slidesPerView: 6,
  slidesPerGroup: 6,
  navigation: {
    nextEl: '.products3-1 .button-next',
    prevEl: '.products3-1 .button-prev'
  },
  breakpoints: {
    768: {
      slidesPerView: 4.2,
      slidesPerGroup: 4
    },
    575: {
      slidesPerView: 2.4,
      slidesPerGroup: 2
    }
  }
});

// products 3-2
var products32 = new Swiper('.products3-2 .swiper-container', {
  spaceBetween: 10,
  slidesPerView: 6,
  slidesPerGroup: 6,
  navigation: {
    nextEl: '.products3-2 .button-next',
    prevEl: '.products3-2 .button-prev'
  },
  breakpoints: {
    768: {
      slidesPerView: 4.2,
      slidesPerGroup: 4
    },
    575: {
      slidesPerView: 2.4,
      slidesPerGroup: 2
    }
  }
});

// brands
var brands = new Swiper('.brands .swiper-container', {
  spaceBetween: 10,
  slidesPerView: 6,
  slidesPerGroup: 6,
  navigation: {
    nextEl: '.brands .button-next',
    prevEl: '.brands .button-prev'
  },
  breakpoints: {
    768: {
      slidesPerView: 4.2,
      slidesPerGroup: 4
    },
    575: {
      slidesPerView: 2.4,
      slidesPerGroup: 2
    }
  }
});

// loading
var imgs = document.images,
    len = imgs.length,
    counter = 0;
[].forEach.call(imgs, function (img) {
  if (img.complete) incrementCounter();else img.addEventListener('load', incrementCounter, false);
});

function incrementCounter() {
  counter++;
  if (counter === len) {
    console.log('All img load');
  }
}
var loadingTime = 800;

function countDown() {
  console.log(loadingTime);
  loadingTime -= 100;
  if (loadingTime < 0 || counter === len) {
    clearInterval(timer);
    var mask = document.querySelector('.loading_mask');
    gsap.to(mask, { duration: 0.3, opacity: 0, display: 'none' });
  }
}
var timer = setInterval(countDown, 100);

// [window > 767] Nav follow bottom
function navFollowBottom() {
  var highlight = document.querySelector('.highlight');
  var navContainer = document.querySelector('.nav__container');

  var nowTarget = null;

  var navContainerRect = navContainer.getBoundingClientRect();
  highlight.style.top = navContainerRect.bottom + window.scrollY + 10 + 'px';
  highlight.style.left = navContainerRect.left + window.scrollX + 'px';

  function hoverHandler() {
    highlight.style.display = 'block';
    gsap.to(highlight, { duration: 0.3, opacity: 1 });
    setPosition();
  }

  function setPosition() {
    var rect = nowTarget.getBoundingClientRect();
    highlight.style.top = rect.bottom + window.scrollY - 3 + 'px';
    highlight.style.left = rect.left + window.scrollX + 'px';
    highlight.style.width = rect.width + 'px';
  }

  navContainer.addEventListener('mouseenter', function (e) {
    if (e.target.nodeName === 'LI') {
      nowTarget = e.target;
      hoverHandler();
    }
  }, true);

  navContainer.addEventListener('mouseleave', function (e) {
    gsap.to(highlight, { duration: 0.3, opacity: 0 });
    highlight.style.display = 'none';
  });
}
// END Nav follow bottom

var body = document.body;
var nav = document.querySelector('.nav');
var main = document.querySelector('.main');
var navBtn = document.querySelector('.nav__button');
var goTop = document.querySelector('.gotop');
var windowTop = 0;
var navOffsetTop = 124;

// [window > 767] Nav fixed
function navFixedHandler() {
  if (windowTop >= navOffsetTop) {
    nav.classList.add('nav--fixed');
    main.classList.add('add--top');
    gsap.to(nav, { duration: 0.2, backgroundColor: 'rgba(255,255,255, 0.92)' });
  } else {
    nav.classList.remove('nav--fixed');
    main.classList.remove('add--top');
    gsap.to(nav, { duration: 0.2, backgroundColor: 'rgba(255,255,255, 0)' });
  }
}

// [window <=767] Nav toggle
function navToggle() {
  var navLinks = document.querySelectorAll('.nav a');
  var isNavOpen = nav.classList.contains('nav--open');
  if (isNavOpen) {
    nav.classList.remove('nav--open');
    navBtn.classList.remove('button--ani');
    body.classList.remove('body--hidden');
  } else {
    nav.classList.add('nav--open');
    navBtn.classList.add('button--ani');
    body.classList.add('body--hidden');
    gsap.fromTo('.nav a', { opacity: 0, x: -30 }, { duration: 0.3, opacity: 1, x: 0, stagger: 0.1, delay: 0.1 });
  }
}

// background item ani
var scrollItem = document.querySelectorAll('.scroll-item');
function bgScrollAni() {
  scrollItem.forEach(function (item, index) {
    var rate = item.dataset.scroll * 1;
    gsap.set(item, { y: -windowTop * rate });
  });
}

// back to top
function goTopShow() {
  windowTop >= 100 ? goTop.classList.add('show') : goTop.classList.remove('show');
}

goTop.addEventListener('click', function () {
  return window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
});

if (window.innerWidth > 767) {
  navFollowBottom();
} else {
  navBtn.addEventListener('click', navToggle);
}

window.addEventListener('scroll', function () {
  windowTop = window.pageYOffset;
  goTopShow();
  window.innerWidth > 767 && navFixedHandler();
  window.innerWidth > 1650 && bgScrollAni();
});
