"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function () {
  "use strict";

  var t = function t(_t) {
    return crypto.getRandomValues(new Uint8Array(_t));
  };

  var n,
      e,
      r,
      o = function o(t, n) {
    return void 0 === n && (n = document), n.querySelectorAll(t);
  },
      i = Object.is,
      u = function u(t, n) {
    return !i(t, n);
  },
      c = "object",
      a = function a(t) {
    return _typeof(t);
  },
      f = function f(t) {
    var n = Boolean(~t.indexOf("["));
    return !n && Boolean(~t.indexOf("'")) ? t.replace(/'/g, "") : JSON.parse(n ? t.replace(/'/g, '"') : t);
  },
      l = function l(t, n) {
    return t && n;
  },
      s = function s(t, n) {
    var e = Object.keys(t),
        r = Object.keys(n);
    if (u(e.length, r.length)) return !1;

    for (var o = !0, f = 0, p = e; f < p.length; f++) {
      var d = p[f],
          v = t[d],
          g = n[d];
      if (o = o && l(i(a(v), c), i(a(g), c)) ? s(v, g) : i(v, g), i(o, !1)) return o;
    }

    return o;
  },
      p = function p() {
    var t,
        n = !1;
    return function (e, r, o) {
      var i = o.value;
      return o.value = function () {
        for (var e = [], r = 0; r < arguments.length; r++) {
          e[r] = arguments[r];
        }

        return n || (t = i.apply(void 0, e), n = !0), t;
      }, o;
    };
  },
      d = function d(t, n) {
    return t && function () {
      for (var t = [], e = 0; e < arguments.length; e++) {
        t[e] = arguments[e];
      }

      return n.apply(void 0, t);
    } || function () {
      return null;
    };
  },
      v = function v(t, n) {
    return t[n];
  },
      g = (r = {}, {
    getListeners: function getListeners() {
      return r;
    },
    setListeners: function setListeners(t, n) {
      return r[t] = n;
    }
  }),
      _h = function h() {
    return (_h = Object.assign || function (t) {
      for (var n, e = 1, r = arguments.length; e < r; e++) {
        for (var o in n = arguments[e]) {
          Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o]);
        }
      }

      return t;
    }).apply(this, arguments);
  },
      y = (n = {}, e = !0, {
    getState: function getState() {
      return n;
    },
    setState: function setState(t, r) {
      var o, f, p;
      f = n[t], p = r, (l(i(a(f), c), i(a(p), c)) ? !s(f, p) : u(f, p)) ? (n = _h(_h({}, n), ((o = {})[t] = r, o)), e = !0) : e = !1;
    },

    get shouldUpdate() {
      return e;
    }

  }),
      b = function b(t) {
    return t.getAttribute("state");
  },
      E = function E(t, n) {
    return [function () {
      return t(y.getState());
    }, function (t) {
      return y.setState(n, t);
    }];
  },
      j = function j(t, n, e, r) {
    var o,
        i = arguments.length,
        u = i < 3 ? n : null === r ? r = Object.getOwnPropertyDescriptor(n, e) : r;
    if ("object" == (typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) && "function" == typeof Reflect.decorate) u = Reflect.decorate(t, n, e, r);else for (var c = t.length - 1; c >= 0; c--) {
      (o = t[c]) && (u = (i < 3 ? o(u) : i > 3 ? o(n, e, u) : o(n, e)) || u);
    }
    return i > 3 && u && Object.defineProperty(n, e, u), u;
  },
      A = function A(n) {
    var e = {},
        r = [];
    return n.forEach(function (n) {
      var i = n,
          u = b(i),
          c = f(i.getAttribute("init"));
      y.setState(u, c), e[u] = c, o("[inject]", i).forEach(function (n) {
        var e = "state-" + function (t, n, e) {
          var r = (2 << Math.log(t.length - 1) / Math.LN2) - 1,
              o = -~(1.6 * r * n / t.length);
          return function () {
            var i = "";

            for (;;) {
              var _u = e(o),
                  _c = o;

              for (; _c--;) {
                if (i += t[_u[_c] & r] || "", i.length === n) return i;
              }
            }
          };
        }("1234567890abcdefghijklmnopqrstuvwxyz", 18, t)();

        n.removeAttribute("inject"), n.setAttribute(e, ""), r = r.concat(e, n.innerHTML.split(/(\$[a-z-]+)/g));
      });
    }), [e, r];
  },
      L = function L(t, n) {
    var e = y.getState()[n],
        r = y.shouldUpdate;
    d(r, function () {
      return o("[" + n + "]", t).forEach(function (t) {
        return t.innerText = e;
      });
    })(), d(r, function () {
      return o("[bind-" + n + "]", t).forEach(function (t) {
        return t.value = e;
      });
    })();
  },
      O = function O(t, n, e) {
    return t instanceof HTMLInputElement ? v(g.getListeners(), n).apply(void 0, function (t, n, e) {
      if (e || 2 === arguments.length) for (var r, o = 0, i = n.length; o < i; o++) {
        !r && o in n || (r || (r = Array.prototype.slice.call(n, 0, o)), r[o] = n[o]);
      }
      return t.concat(r || Array.prototype.slice.call(n));
    }([function () {
      return t.value;
    }], E(function (t) {
      return t[e];
    }, e), !1)) : v(g.getListeners(), n).apply(void 0, E(function (t) {
      return t[e];
    }, e));
  },
      w = function () {
    function t() {}

    return t.renderInitialView = function (t) {
      var n,
          e = A(t),
          r = e[0];
      e[1].forEach(function (t) {
        if (/^state-[a-z0-9-]{18}$/.test(t)) (n = o("[" + t + "]")[0]).innerHTML = "";else if (/^\$[a-z-]+$/.test(t)) {
          var e = t.slice(1),
              i = r[e],
              u = document.createElement("span");
          u.setAttribute(e, ""), u.innerText = i, n.append(u);
        } else n.append(document.createTextNode(t));
      });
    }, t.handleActions = function (t) {
      t.forEach(function (t) {
        var n = t,
            e = b(n),
            r = "action-" + e;
        o("[" + r + "]", n).forEach(function (t) {
          var o = f(t.getAttribute(r)),
              i = o[0],
              u = o[1];
          t.addEventListener(u, function () {
            O(t, i, e), L(n, e);
          });
        });
      });
    }, t.applyInputBinds = function (t) {
      t.forEach(function (t) {
        var n = b(t);
        o("[bind-" + n + "]").forEach(function (e) {
          var r = Symbol("@@bind-" + n);
          g.getListeners()[r] = function (t, n, r) {
            r(t()), e.value = String(t());
          }, e.addEventListener("input", function () {
            O(e, r, n), L(t, n);
          });
        });
      });
    }, t.executeRenderProcess = function () {
      return function (t) {
        for (var n = [], e = 1; e < arguments.length; e++) {
          n[e - 1] = arguments[e];
        }

        n.forEach(function (n) {
          return n(t());
        });
      }(function () {
        return o("[bean]");
      }, t.renderInitialView, t.handleActions, t.applyInputBinds);
    }, j([p()], t, "renderInitialView", null), j([p()], t, "handleActions", null), j([p()], t, "applyInputBinds", null), t;
  }();

  window.bootstrap = function () {
    w.executeRenderProcess(), window.setBeanListeners = function (t) {
      return Object.keys(t).forEach(function (n) {
        return g.getListeners()[n] = t[n];
      });
    };
  }, console.log("%cBean is ready!", "background-color: #7209b7; color: white; border-radius: 2px; padding: 4px 8px;");
})();
