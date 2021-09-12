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
      i = function i(t, n) {
    return void 0 === n && (n = document), n.querySelectorAll(t);
  },
      o = Object.is,
      u = function u(t, n) {
    return !o(t, n);
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

    for (var i = !0, f = 0, p = e; f < p.length; f++) {
      var d = p[f],
          g = t[d],
          v = n[d];
      if (i = i && l(o(a(g), c), o(a(v), c)) ? s(g, v) : o(g, v), o(i, !1)) return i;
    }

    return i;
  },
      p = function p() {
    var t,
        n = !1;
    return function (e, r, i) {
      var o = i.value;
      return i.value = function () {
        for (var e = [], r = 0; r < arguments.length; r++) {
          e[r] = arguments[r];
        }

        return n || (t = o.apply(void 0, e), n = !0), t;
      }, i;
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
      g = (r = {}, {
    getListeners: function getListeners() {
      return r;
    },
    setListeners: function setListeners(t, n) {
      return r[t] = n;
    }
  }),
      _v = function v() {
    return (_v = Object.assign || function (t) {
      for (var n, e = 1, r = arguments.length; e < r; e++) {
        for (var i in n = arguments[e]) {
          Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
        }
      }

      return t;
    }).apply(this, arguments);
  },
      h = (n = {}, e = !0, {
    getState: function getState() {
      return n;
    },
    setState: function setState(t, r) {
      var i, f, p;
      f = n[t], p = r, (l(o(a(f), c), o(a(p), c)) ? !s(f, p) : u(f, p)) ? (n = _v(_v({}, n), ((i = {})[t] = r, i)), e = !0) : e = !1;
    },

    get shouldUpdate() {
      return e;
    }

  }),
      y = function y(t) {
    return t.getAttribute("state");
  },
      b = function b(t, n, e, r) {
    var i,
        o = arguments.length,
        u = o < 3 ? n : null === r ? r = Object.getOwnPropertyDescriptor(n, e) : r;
    if ("object" == (typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) && "function" == typeof Reflect.decorate) u = Reflect.decorate(t, n, e, r);else for (var c = t.length - 1; c >= 0; c--) {
      (i = t[c]) && (u = (o < 3 ? i(u) : o > 3 ? i(n, e, u) : i(n, e)) || u);
    }
    return o > 3 && u && Object.defineProperty(n, e, u), u;
  },
      O = function O(t, n, e) {
    if (e || 2 === arguments.length) for (var r, i = 0, o = n.length; i < o; i++) {
      !r && i in n || (r || (r = Array.prototype.slice.call(n, 0, i)), r[i] = n[i]);
    }
    return t.concat(r || Array.prototype.slice.call(n));
  },
      E = function E(n) {
    var e = {},
        r = [];
    return n.forEach(function (n) {
      var o = n,
          u = y(o),
          c = f(o.getAttribute("init"));
      h.setState(u, c), e[u] = c, i("[inject]", o).forEach(function (n) {
        var e = "state-" + function (t, n, e) {
          var r = (2 << Math.log(t.length - 1) / Math.LN2) - 1,
              i = -~(1.6 * r * n / t.length);
          return function () {
            var o = "";

            for (;;) {
              var _u = e(i),
                  _c = i;

              for (; _c--;) {
                if (o += t[_u[_c] & r] || "", o.length === n) return o;
              }
            }
          };
        }("1234567890abcdefghijklmnopqrstuvwxyz", 18, t)();

        n.removeAttribute("inject"), n.setAttribute(e, ""), r = r.concat(e, n.innerHTML.split(/(\$[a-z-]+)/g));
      });
    }), [e, r];
  },
      j = function j(t, n) {
    var e = h.getState()[n],
        r = h.shouldUpdate;
    d(r, function () {
      return i("[" + n + "]", t).forEach(function (t) {
        return t.innerText = JSON.stringify(e);
      });
    })(), d(r, function () {
      return i("[bind-" + n + "]", t).forEach(function (t) {
        return t.value = e;
      });
    })();
  },
      A = function A(t, n, e) {
    return function (t, n) {
      return t[n];
    }(g.getListeners(), t).apply(void 0, O(O([], (r = function r(t) {
      return t[n];
    }, i = n, [function () {
      return r(h.getState());
    }, function (t) {
      return h.setState(i, t);
    }]), !1), [e], !1));
    var r, i;
  },
      S = function () {
    function t() {}

    return t.renderInitialView = function (t) {
      var n,
          e = E(t),
          r = e[0];
      e[1].forEach(function (t) {
        if (/^state-[a-z0-9-]{18}$/.test(t)) (n = i("[" + t + "]")[0]).innerHTML = "";else if (/^\$[a-z-]+$/.test(t)) {
          var e = t.slice(1),
              o = r[e],
              u = document.createElement("span");
          u.setAttribute(e, ""), u.innerText = JSON.stringify(o), n.append(u);
        } else n.append(document.createTextNode(t));
      });
    }, t.handleActions = function (t) {
      t.forEach(function (t) {
        var n = t,
            e = y(n),
            r = "action-" + e;
        i("[" + r + "]", n).forEach(function (t) {
          var i = f(t.getAttribute(r)),
              o = i[0],
              u = i[1],
              c = i[2];
          t.addEventListener(u, function () {
            A(o, e, h.getState()[c]), j(n, e);
          });
        });
      });
    }, t.applyInputBinds = function (t) {
      t.forEach(function (t) {
        var n = y(t);
        i("[bind-" + n + "]").forEach(function (e) {
          var r = Symbol("@@bind-" + n);
          g.getListeners()[r] = function (t, n, r) {
            n(r), e.value = String(r);
          }, e.addEventListener("input", function () {
            A(r, n, e.value), j(t, n);
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
        return i("[bean]");
      }, t.renderInitialView, t.handleActions, t.applyInputBinds);
    }, b([p()], t, "renderInitialView", null), b([p()], t, "handleActions", null), b([p()], t, "applyInputBinds", null), t;
  }();

  window.bootstrap = function () {
    S.executeRenderProcess(), window.setBeanListeners = function (t) {
      return Object.keys(t).forEach(function (n) {
        return g.getListeners()[n] = t[n];
      });
    };
  }, console.log("%cBean is ready!", "background-color: #7209b7; color: white; border-radius: 2px; padding: 4px 8px;");
})();
