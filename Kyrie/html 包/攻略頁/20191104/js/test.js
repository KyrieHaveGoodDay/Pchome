/*!
 * swiper-animation v1.2.4
 * Homepage: https://github.com/cycdpo/swiper-animation#readme
 * Released under the MIT License.
 */
! function (e, t) {
  "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.SwiperAnimation = t() : e.SwiperAnimation = t()
}(window, function () {
  return function (i) {
    var n = {};

    function r(e) {
      if (n[e]) return n[e].exports;
      var t = n[e] = {
        i: e,
        l: !1,
        exports: {}
      };
      return i[e].call(t.exports, t, t.exports, r), t.l = !0, t.exports
    }
    return r.m = i, r.c = n, r.d = function (e, t, i) {
      r.o(e, t) || Object.defineProperty(e, t, {
        enumerable: !0,
        get: i
      })
    }, r.r = function (e) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
        value: "Module"
      }), Object.defineProperty(e, "__esModule", {
        value: !0
      })
    }, r.t = function (t, e) {
      if (1 & e && (t = r(t)), 8 & e) return t;
      if (4 & e && "object" == typeof t && t && t.__esModule) return t;
      var i = Object.create(null);
      if (r.r(i), Object.defineProperty(i, "default", {
        enumerable: !0,
        value: t
      }), 2 & e && "string" != typeof t)
        for (var n in t) r.d(i, n, function (e) {
          return t[e]
        }.bind(null, n));
      return i
    }, r.n = function (e) {
      var t = e && e.__esModule ? function () {
        return e.default
      } : function () {
        return e
      };
      return r.d(t, "a", t), t
    }, r.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t)
    }, r.p = "", r(r.s = "tjUo")
  }({
    tjUo: function (e, t, i) {
      "use strict";
      i.r(t);
      var n = function (e) {
        return Array.isArray(e) ? e : (t = e, "[object NodeList]" !== Object.prototype.toString.call(t) ? new Array(e) : Array.from ? Array.from(e) : Array.prototype.slice.call(e));
        var t
      };
      i.d(t, "default", function () {
        return o
      });
      var r = "visibility: hidden;",
        o = function () {
          function e() {
            this.swiper = null, this.allBoxes = [], this.appendedPromise = !1, this.isPromiseReady = !1
          }
          var t = e.prototype;
          return t.init = function (e) {
            var t = this;
            return this.swiper || (this.swiper = e), this.isPromiseReady || window.Promise ? this.isPromiseReady = !0 : this._initPromisePolyfill(function () {
              t.isPromiseReady = !0
            }), this
          }, t.animate = function () {
            var t = this;
            return this.isPromiseReady ? Promise.resolve().then(function () {
              return t._cache()
            }).then(function () {
              return t._clear()
            }).then(function () {
              var e = n(t.swiper.slides[t.swiper.activeIndex].querySelectorAll("[data-swiper-animation]")).map(function (r) {
                return new Promise(function (e) {
                  var t = r.dataset.swiperAnimation || "",
                    i = r.dataset.duration || ".5s",
                    n = r.dataset.delay || ".5s";
                  r.style.visibility = "visible", r.style.cssText += " animation-duration:" + i + "; -webkit-animation-duration:" + i + "; animation-delay:" + n + "; -webkit-animation-delay:" + n + ";", r.classList.add(t, "animated"), r.isRecovery = !1, setTimeout(function () {
                    return e()
                  }, 0)
                })
              });
              return Promise.all(e)
            }) : setTimeout(function () {
              return t.animate()
            }, 500)
          }, t._clear = function () {
            var e = this.allBoxes.map(function (t) {
              return new Promise(function (e) {
                t.isRecovery ? e() : (t.styleCache && (t.style.cssText = t.styleCache, t.classList.remove("animated"), t.dataset.swiperAnimation && t.classList.remove(t.dataset.swiperAnimation)), t.isRecovery = !0, setTimeout(function () {
                  return e()
                }, 0))
              })
            });
            return Promise.all(e)
          }, t._cache = function () {
            var t = this;
            return this.allBoxes.length ? Promise.resolve() : new Promise(function (e) {
              t._initAllBoxes(), setTimeout(function () {
                return e()
              }, 0)
            }).then(function () {
              var e = t.allBoxes.map(function (t) {
                return new Promise(function (e) {
                  t.attributes.style ? t.styleCache = r + t.style.cssText : t.styleCache = r, t.style.cssText = t.styleCache, t.isRecovery = !0, setTimeout(function () {
                    return e()
                  }, 0)
                })
              });
              return Promise.all(e)
            })
          }, t._initAllBoxes = function () {
            if (!this.allBoxes.length) {
              var e = null;
              this.swiper.wrapperEl ? e = this.swiper.wrapperEl : this.swiper.wrapper && (e = this.swiper.wrapper[0]), this.allBoxes = n(e.querySelectorAll("[data-swiper-animation]"))
            }
          }, t._initPromisePolyfill = function (e) {
            if (void 0 === e && (e = function () { }), !this.appendedPromise) {
              var t = document.createElement("script");
              t.type = "text/javascript", t.onload = function () {
                return e()
              }, t.src = "https://cdn.jsdelivr.net/npm/promise-polyfill@7/dist/polyfill.min.js", document.querySelector("head").appendChild(t), this.appendedPromise = !0
            }
          }, e
        }()
    }
  }).default
});