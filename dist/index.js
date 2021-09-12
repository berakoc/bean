"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function () {
  "use strict";

  var t = function t(_t) {
    return crypto.getRandomValues(new Uint8Array(_t));
  };

  var _e,
      n,
      r = function r(t, e) {
    return void 0 === e && (e = document), e.querySelectorAll(t);
  },
      o = Object.is,
      i = function i(t, e) {
    return !o(t, e);
  },
      u = "object",
      c = function c(t) {
    return _typeof(t);
  },
      a = function a(t) {
    var e = Boolean(~t.indexOf("["));
    return !e && Boolean(~t.indexOf("'")) ? t.replace(/'/g, "") : JSON.parse(e ? t.replace(/'/g, '"') : t);
  },
      f = function f(t, e) {
    return t && e;
  },
      l = function l(t, e) {
    var n = Object.keys(t),
        r = Object.keys(e);
    if (i(n.length, r.length)) return !1;

    for (var a = !0, s = 0, d = n; s < d.length; s++) {
      var p = d[s],
          v = t[p],
          g = e[p];
      if (a = a && f(o(c(v), u), o(c(g), u)) ? l(v, g) : o(v, g), o(a, !1)) return a;
    }

    return a;
  },
      s = function s() {
    var t,
        e = !1;
    return function (n, r, o) {
      var i = o.value;
      return o.value = function () {
        for (var n = [], r = 0; r < arguments.length; r++) {
          n[r] = arguments[r];
        }

        return e || (t = i.apply(void 0, n), e = !0), t;
      }, o;
    };
  },
      d = function d(t, e) {
    return t && function () {
      for (var t = [], n = 0; n < arguments.length; n++) {
        t[n] = arguments[n];
      }

      return e.apply(void 0, t);
    } || function () {
      return null;
    };
  },
      p = function p(t) {
    return function (e) {
      return console.log("%c" + e, "background-color: white; border: 1px solid " + t + "; color: " + t + "; border-radius: 2px; padding: 4px 8px;");
    };
  },
      v = {
    log: p("#4895ef"),
    warn: p("#f48c06"),
    error: p("#e63946"),
    debug: p("#04e762"),
    info: p("#9b5de5")
  },
      g = (_e = function e(t, n) {
    return (_e = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (t, e) {
      t.__proto__ = e;
    } || function (t, e) {
      for (var n in e) {
        Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
      }
    })(t, n);
  }, function (t, n) {
    if ("function" != typeof n && null !== n) throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");

    function r() {
      this.constructor = t;
    }

    _e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r());
  });

  !function (t) {
    t[t.TYPE_IS_NOT_ITERABLE = 601] = "TYPE_IS_NOT_ITERABLE";
  }(n || (n = {}));

  var h,
      b,
      y,
      E = function (t) {
    function e(e, n) {
      var r = t.call(this, e) || this;
      return r.errorCode = n, r;
    }

    return g(e, t), e;
  }(Error),
      w = (y = {}, {
    getListeners: function getListeners() {
      return y;
    },
    setListeners: function setListeners(t, e) {
      return y[t] = e;
    }
  }),
      _m = function m() {
    return (_m = Object.assign || function (t) {
      for (var e, n = 1, r = arguments.length; n < r; n++) {
        for (var o in e = arguments[n]) {
          Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
        }
      }

      return t;
    }).apply(this, arguments);
  },
      A = (h = {}, b = !0, {
    getState: function getState() {
      return h;
    },
    setState: function setState(t, e) {
      var n, r, a;
      r = h[t], a = e, (f(o(c(r), u), o(c(a), u)) ? !l(r, a) : i(r, a)) ? (h = _m(_m({}, h), ((n = {})[t] = e, n)), b = !0) : b = !1;
    },

    get shouldUpdate() {
      return b;
    }

  }),
      O = function O(t) {
    return t.getAttribute("state");
  },
      T = function T(t, e, n, r) {
    var o,
        i = arguments.length,
        u = i < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, n) : r;
    if ("object" == (typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) && "function" == typeof Reflect.decorate) u = Reflect.decorate(t, e, n, r);else for (var c = t.length - 1; c >= 0; c--) {
      (o = t[c]) && (u = (i < 3 ? o(u) : i > 3 ? o(e, n, u) : o(e, n)) || u);
    }
    return i > 3 && u && Object.defineProperty(e, n, u), u;
  },
      j = function j(t, e, n) {
    if (n || 2 === arguments.length) for (var r, o = 0, i = e.length; o < i; o++) {
      !r && o in e || (r || (r = Array.prototype.slice.call(e, 0, o)), r[o] = e[o]);
    }
    return t.concat(r || Array.prototype.slice.call(e));
  },
      S = function S(e) {
    var n = {},
        o = [];
    return e.forEach(function (e) {
      var i = e,
          u = O(i),
          c = a(i.getAttribute("init"));
      A.setState(u, c), n[u] = c, r("[inject]", i).forEach(function (e) {
        var n = function (e) {
          return e + "-" + function (t, e, n) {
            var r = (2 << Math.log(t.length - 1) / Math.LN2) - 1,
                o = -~(1.6 * r * e / t.length);
            return function () {
              var i = "";

              for (;;) {
                var _u = n(o),
                    _c = o;

                for (; _c--;) {
                  if (i += t[_u[_c] & r] || "", i.length === e) return i;
                }
              }
            };
          }("1234567890abcdefghijklmnopqrstuvwxyz", 18, t)();
        }(u);

        e.removeAttribute("inject"), e.setAttribute(n, ""), o = o.concat(n, e.innerHTML.split(/(\$[a-z-]+)/g));
      });
    }), [n, o];
  },
      _ = function _(t, e) {
    var n = A.getState()[e],
        o = A.shouldUpdate;
    d(o, function () {
      return r("[" + e + "]", t).forEach(function (t) {
        return t.innerText = n;
      });
    })(), d(o, function () {
      return r("[bind-" + e + "]", t).forEach(function (t) {
        return t.value = n;
      });
    })(), d(o, function () {
      return r("." + e + "-template").forEach(function (t) {
        var e = t.getAttribute("child-class");
        t.innerHTML = "", n.forEach(function (n) {
          var r = document.createElement("div");
          r.innerText = n, r.className = e, t.append(r);
        });
      });
    })();
  },
      x = function x(t, e, n) {
    return function (t, e) {
      return t[e];
    }(w.getListeners(), t).apply(void 0, j(j([], (r = function r(t) {
      return t[e];
    }, o = e, [function () {
      return r(A.getState());
    }, function (t) {
      return A.setState(o, t);
    }]), !1), [n], !1));
    var r, o;
  },
      L = function () {
    function t() {}

    return t.renderInitialView = function (t) {
      var e,
          o = S(t),
          u = o[0];
      o[1].forEach(function (t) {
        if (/^\w+-[a-z0-9-]{18}$/.test(t)) (e = r("[" + t + "]")[0]).innerHTML = "";else if (/^\$map-[a-zA-Z]+-?[a-zA-Z-]*$/.test(t)) {
          var o = t.substring(5),
              a = o.indexOf("-"),
              f = o.substring(0, a),
              l = o.substring(a + 1),
              s = A.getState()[f];
          if (i(c(s[Symbol.iterator]), "function")) throw new E("Value is not iterable", n.TYPE_IS_NOT_ITERABLE);
          var d = document.createElement("div");
          d.className = f + "-template", d.setAttribute("child-class", l);

          for (var p = 0, v = s; p < v.length; p++) {
            var g = v[p],
                h = document.createElement("div");
            h.innerText = g, h.className = l, d.append(h);
          }

          e.append(d);
        } else if (/^\$[a-z-]+$/.test(t)) {
          f = t.slice(1), g = u[f];
          var b = document.createElement("span");
          b.setAttribute(f, ""), b.innerText = g, e.append(b);
        } else e.append(document.createTextNode(t));
      }), v.debug("Initial view update is completed");
    }, t.handleActions = function (t) {
      t.forEach(function (t) {
        var e = t,
            n = O(e),
            o = "action-" + n;
        r("[" + o + "]", e).forEach(function (t) {
          var r = a(t.getAttribute(o)),
              i = r[0],
              u = r[1],
              c = r[2];
          t.addEventListener(u, function () {
            x(i, n, A.getState()[c]), _(e, n);
          });
        });
      }), v.debug("Actions are successfully bound");
    }, t.applyInputBinds = function (t) {
      t.forEach(function (t) {
        var e = O(t);
        r("[bind-" + e + "]").forEach(function (n) {
          var r = Symbol("@@bind-" + e);
          w.getListeners()[r] = function (t, e, r) {
            e(r), n.value = String(r);
          }, n.addEventListener("input", function () {
            x(r, e, n.value), _(t, e);
          });
        });
      }), v.debug("Two way data binding is enabled");
    }, t.executeRenderProcess = function () {
      return function (t) {
        for (var e = [], n = 1; n < arguments.length; n++) {
          e[n - 1] = arguments[n];
        }

        e.forEach(function (e) {
          return e(t());
        });
      }(function () {
        return r("[bean]");
      }, t.renderInitialView, t.handleActions, t.applyInputBinds);
    }, T([s()], t, "renderInitialView", null), T([s()], t, "handleActions", null), T([s()], t, "applyInputBinds", null), t;
  }();

  window.bootstrap = function () {
    L.executeRenderProcess(), window.setBeanListeners = function (t) {
      return Object.keys(t).forEach(function (e) {
        return w.getListeners()[e] = t[e];
      });
    }, v.log("Globals are injected"), v.warn("Inject listeners using setBeanListeners method");
  }, v.info("Bean is ready!");
})();
