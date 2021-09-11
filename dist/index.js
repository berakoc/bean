"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function () {
  function r(e, n, t) {
    function o(i, f) {
      if (!n[i]) {
        if (!e[i]) {
          var c = "function" == typeof require && require;
          if (!f && c) return c(i, !0);
          if (u) return u(i, !0);
          var a = new Error("Cannot find module '" + i + "'");
          throw a.code = "MODULE_NOT_FOUND", a;
        }

        var p = n[i] = {
          exports: {}
        };
        e[i][0].call(p.exports, function (r) {
          var n = e[i][1][r];
          return o(n || r);
        }, p, p.exports, r, e, n, t);
      }

      return n[i].exports;
    }

    for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) {
      o(t[i]);
    }

    return o;
  }

  return r;
})()({
  1: [function (require, module, exports) {
    (function (process) {
      (function () {
        // This file replaces `index.js` in bundlers like webpack or Rollup,
        // according to `browser` config in `package.json`.
        var _require = require('./url-alphabet/index.cjs'),
            urlAlphabet = _require.urlAlphabet;

        if (process.env.NODE_ENV !== 'production') {
          // All bundlers will remove this block in the production bundle.
          if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative' && typeof crypto === 'undefined') {
            throw new Error('React Native does not have a built-in secure random generator. ' + 'If you don’t need unpredictable IDs use `nanoid/non-secure`. ' + 'For secure IDs, import `react-native-get-random-values` ' + 'before Nano ID.');
          }

          if (typeof msCrypto !== 'undefined' && typeof crypto === 'undefined') {
            throw new Error('Import file with `if (!window.crypto) window.crypto = window.msCrypto`' + ' before importing Nano ID to fix IE 11 support');
          }

          if (typeof crypto === 'undefined') {
            throw new Error('Your browser does not have secure random generator. ' + 'If you don’t need unpredictable IDs, you can use nanoid/non-secure.');
          }
        }

        var random = function random(bytes) {
          return crypto.getRandomValues(new Uint8Array(bytes));
        };

        var customRandom = function customRandom(alphabet, size, getRandom) {
          // First, a bitmask is necessary to generate the ID. The bitmask makes bytes
          // values closer to the alphabet size. The bitmask calculates the closest
          // `2^31 - 1` number, which exceeds the alphabet size.
          // For example, the bitmask for the alphabet size 30 is 31 (00011111).
          // `Math.clz32` is not used, because it is not available in browsers.
          var mask = (2 << Math.log(alphabet.length - 1) / Math.LN2) - 1; // Though, the bitmask solution is not perfect since the bytes exceeding
          // the alphabet size are refused. Therefore, to reliably generate the ID,
          // the random bytes redundancy has to be satisfied.
          // Note: every hardware random generator call is performance expensive,
          // because the system call for entropy collection takes a lot of time.
          // So, to avoid additional system calls, extra bytes are requested in advance.
          // Next, a step determines how many random bytes to generate.
          // The number of random bytes gets decided upon the ID size, mask,
          // alphabet size, and magic number 1.6 (using 1.6 peaks at performance
          // according to benchmarks).
          // `-~f => Math.ceil(f)` if f is a float
          // `-~i => i + 1` if i is an integer

          var step = -~(1.6 * mask * size / alphabet.length);
          return function () {
            var id = '';

            while (true) {
              var bytes = getRandom(step); // A compact alternative for `for (var i = 0; i < step; i++)`.

              var j = step;

              while (j--) {
                // Adding `|| ''` refuses a random byte that exceeds the alphabet size.
                id += alphabet[bytes[j] & mask] || '';
                if (id.length === size) return id;
              }
            }
          };
        };

        var customAlphabet = function customAlphabet(alphabet, size) {
          return customRandom(alphabet, size, random);
        };

        var nanoid = function nanoid() {
          var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 21;
          var id = '';
          var bytes = crypto.getRandomValues(new Uint8Array(size)); // A compact alternative for `for (var i = 0; i < step; i++)`.

          while (size--) {
            // It is incorrect to use bytes exceeding the alphabet size.
            // The following mask reduces the random byte in the 0-255 value
            // range to the 0-63 value range. Therefore, adding hacks, such
            // as empty string fallback or magic numbers, is unneccessary because
            // the bitmask trims bytes down to the alphabet size.
            var _byte = bytes[size] & 63;

            if (_byte < 36) {
              // `0-9a-z`
              id += _byte.toString(36);
            } else if (_byte < 62) {
              // `A-Z`
              id += (_byte - 26).toString(36).toUpperCase();
            } else if (_byte < 63) {
              id += '_';
            } else {
              id += '-';
            }
          }

          return id;
        };

        module.exports = {
          nanoid: nanoid,
          customAlphabet: customAlphabet,
          customRandom: customRandom,
          urlAlphabet: urlAlphabet,
          random: random
        };
      }).call(this);
    }).call(this, require('_process'));
  }, {
    "./url-alphabet/index.cjs": 2,
    "_process": 3
  }],
  2: [function (require, module, exports) {
    // This alphabet uses `A-Za-z0-9_-` symbols. The genetic algorithm helped
    // optimize the gzip compression for this alphabet.
    var urlAlphabet = 'ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW';
    module.exports = {
      urlAlphabet: urlAlphabet
    };
  }, {}],
  3: [function (require, module, exports) {
    // shim for using process in browser
    var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
    // don't break things.  But we need to wrap it in a try catch in case it is
    // wrapped in strict mode code which doesn't define any globals.  It's inside a
    // function because try/catches deoptimize in certain engines.

    var cachedSetTimeout;
    var cachedClearTimeout;

    function defaultSetTimout() {
      throw new Error('setTimeout has not been defined');
    }

    function defaultClearTimeout() {
      throw new Error('clearTimeout has not been defined');
    }

    (function () {
      try {
        if (typeof setTimeout === 'function') {
          cachedSetTimeout = setTimeout;
        } else {
          cachedSetTimeout = defaultSetTimout;
        }
      } catch (e) {
        cachedSetTimeout = defaultSetTimout;
      }

      try {
        if (typeof clearTimeout === 'function') {
          cachedClearTimeout = clearTimeout;
        } else {
          cachedClearTimeout = defaultClearTimeout;
        }
      } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
      }
    })();

    function runTimeout(fun) {
      if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
      } // if setTimeout wasn't available but was latter defined


      if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
      }

      try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
      } catch (e) {
        try {
          // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
          return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
          // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
          return cachedSetTimeout.call(this, fun, 0);
        }
      }
    }

    function runClearTimeout(marker) {
      if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
      } // if clearTimeout wasn't available but was latter defined


      if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
      }

      try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
      } catch (e) {
        try {
          // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
          return cachedClearTimeout.call(null, marker);
        } catch (e) {
          // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
          // Some versions of I.E. have different rules for clearTimeout vs setTimeout
          return cachedClearTimeout.call(this, marker);
        }
      }
    }

    var queue = [];
    var draining = false;
    var currentQueue;
    var queueIndex = -1;

    function cleanUpNextTick() {
      if (!draining || !currentQueue) {
        return;
      }

      draining = false;

      if (currentQueue.length) {
        queue = currentQueue.concat(queue);
      } else {
        queueIndex = -1;
      }

      if (queue.length) {
        drainQueue();
      }
    }

    function drainQueue() {
      if (draining) {
        return;
      }

      var timeout = runTimeout(cleanUpNextTick);
      draining = true;
      var len = queue.length;

      while (len) {
        currentQueue = queue;
        queue = [];

        while (++queueIndex < len) {
          if (currentQueue) {
            currentQueue[queueIndex].run();
          }
        }

        queueIndex = -1;
        len = queue.length;
      }

      currentQueue = null;
      draining = false;
      runClearTimeout(timeout);
    }

    process.nextTick = function (fun) {
      var args = new Array(arguments.length - 1);

      if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
          args[i - 1] = arguments[i];
        }
      }

      queue.push(new Item(fun, args));

      if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
      }
    }; // v8 likes predictible objects


    function Item(fun, array) {
      this.fun = fun;
      this.array = array;
    }

    Item.prototype.run = function () {
      this.fun.apply(null, this.array);
    };

    process.title = 'browser';
    process.browser = true;
    process.env = {};
    process.argv = [];
    process.version = ''; // empty string to avoid regexp issues

    process.versions = {};

    function noop() {}

    process.on = noop;
    process.addListener = noop;
    process.once = noop;
    process.off = noop;
    process.removeListener = noop;
    process.removeAllListeners = noop;
    process.emit = noop;
    process.prependListener = noop;
    process.prependOnceListener = noop;

    process.listeners = function (name) {
      return [];
    };

    process.binding = function (name) {
      throw new Error('process.binding is not supported');
    };

    process.cwd = function () {
      return '/';
    };

    process.chdir = function (dir) {
      throw new Error('process.chdir is not supported');
    };

    process.umask = function () {
      return 0;
    };
  }, {}],
  4: [function (require, module, exports) {
    var U = {
      $: function $(query) {
        var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
        return context.querySelectorAll(query);
      },
      curry: function curry(f) {
        return U.isNot(U.type(f), U.types["function"]) ? f : function () {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return f.bind.apply(f, [null].concat(args));
        };
      },
      is: Object.is,
      isNot: function isNot(v1, v2) {
        return !U.is(v1, v2);
      },
      not: function not(f) {
        return function () {
          return !f.apply(void 0, arguments);
        };
      },
      type: function type(v) {
        return _typeof(v);
      },
      stringToObject: function stringToObject(value) {
        var isArray = Boolean(~value.indexOf('['));
        var isString = !isArray && Boolean(~value.indexOf("'"));
        return isString ? value.replace(/'/g, '') : JSON.parse(isArray ? value.replace(/'/g, '"') : value);
      },
      and: function and(bool1, bool2) {
        return bool1 && bool2;
      },
      deepCompare: function deepCompare(o1, o2) {
        var o1Keys = Object.keys(o1);
        var o2Keys = Object.keys(o2);
        if (U.isNot(o1Keys.length, o2Keys.length)) return false;
        var result = true;

        for (var _i = 0, _o1Keys = o1Keys; _i < _o1Keys.length; _i++) {
          var key = _o1Keys[_i];
          var val1 = o1[key];
          var val2 = o2[key];
          result = result && U.and(U.is(U.type(val1), U.types.object), U.is(U.type(val2), U.types.object)) ? U.deepCompare(val1, val2) : U.is(val1, val2);
          if (U.is(result, false)) return result;
        }

        return result;
      },
      makeThenable: function makeThenable(f) {
        return function () {
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          return {
            then: function then(g) {
              return g(f.apply(void 0, args));
            }
          };
        };
      },
      pipe: function pipe() {
        for (var _len3 = arguments.length, fs = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          fs[_key3] = arguments[_key3];
        }

        return function () {
          for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            args[_key4] = arguments[_key4];
          }

          return fs.reduce(function (F, f) {
            return function () {
              return [f.apply(void 0, _toConsumableArray([].concat(F())))];
            };
          }, function () {
            return args;
          })()[0];
        };
      },
      types: {
        object: 'object',
        string: 'string',
        "function": 'function',
        "boolean": 'boolean',
        number: 'number'
      }
    };

    var bootstrap = function bootstrap() {
      var _require2 = require('nanoid'),
          customAlphabet = _require2.customAlphabet;

      var alphabet = '1234567890abcdefghijklmnopqrstuvwxyz';

      var validate = function validate(str) {
        return /^state-[a-z0-9-]{18}$/.test(str);
      };

      var ChangeDetector = {
        detect: function detect(current, previous) {
          return U.and(U.is(U.type(current), U.types.object), U.is(U.type(previous), U.types.object)) ? !U.deepCompare(current, previous) : U.isNot(current, previous);
        }
      };

      var StateHandler = function () {
        var state = {};
        var _shouldUpdate = true;
        return {
          getState: function getState() {
            return state;
          },
          setState: function setState(key, value) {
            if (!ChangeDetector.detect(state[key], value)) return _shouldUpdate = false;
            state = _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, key, value));
            _shouldUpdate = true;
          },

          get shouldUpdate() {
            return _shouldUpdate;
          }

        };
      }();

      var getStateId = function getStateId(bean) {
        return bean.getAttribute('state');
      };

      var listeners = window.listeners || {};

      var selectState = function selectState(selector, key) {
        return [function () {
          return selector(StateHandler.getState());
        }, function (value) {
          return U.curry(StateHandler.setState)(key)(value);
        }];
      };

      var getBeans = function getBeans() {
        return U.$('[bean]');
      };

      var getGlobalListener = function getGlobalListener(listenerName) {
        return listeners[listenerName];
      };

      var getUUID = function getUUID() {
        return "state-".concat(customAlphabet(alphabet, 18)());
      };

      var getRenderTree = function getRenderTree(beans) {
        var memory = {};
        var renderTree = [];
        beans.forEach(function (bean) {
          var stateId = getStateId(bean);
          var initialValue = U.stringToObject(bean.getAttribute('init'));
          StateHandler.setState(stateId, initialValue);
          memory[stateId] = initialValue;
          U.$('[inject]', bean).forEach(function (node) {
            var nodeId = getUUID();
            node.removeAttribute('inject');
            node.setAttribute(nodeId, '');
            renderTree = renderTree.concat(nodeId, node.innerHTML.split(/(\$[a-z-]+)/g));
          });
        });
        return [memory, renderTree];
      };

      var renderInitialView = function renderInitialView() {
        var beans = getBeans();

        var _getRenderTree = getRenderTree(beans),
            _getRenderTree2 = _slicedToArray(_getRenderTree, 2),
            memory = _getRenderTree2[0],
            renderTree = _getRenderTree2[1];

        var currentNodeId;
        var currentNode;
        renderTree.forEach(function (renderKey) {
          if (validate(renderKey)) {
            currentNodeId = renderKey;
            currentNode = U.$("[".concat(currentNodeId, "]"))[0];
            currentNode.innerHTML = null;
          } else if (/^\$[a-z-]+$/.test(renderKey)) {
            var stateId = renderKey.slice(1);
            var value = memory[stateId];
            var stateFragment = document.createElement('span');
            stateFragment.setAttribute(stateId, '');
            stateFragment.innerText = value;
            currentNode.append(stateFragment);
          } else {
            currentNode.append(document.createTextNode(renderKey));
          }
        });
        return beans;
      };

      var updateViewByState = function updateViewByState(bean, stateId) {
        var value = StateHandler.getState()[stateId];
        StateHandler.shouldUpdate && U.$("[".concat(stateId, "]"), bean).forEach(function (node) {
          return node.innerText = value;
        }) && U.$("[bind-".concat(stateId, "]")).forEach(function (input) {
          return input.value = value;
        });
      };

      var addListenerByParams = function addListenerByParams(element, listenerName, stateId) {
        return element instanceof HTMLInputElement ? getGlobalListener(listenerName).apply(void 0, [function () {
          return element['value'];
        }].concat(_toConsumableArray(selectState(function (state) {
          return state[stateId];
        }, stateId)))) : getGlobalListener(listenerName).apply(void 0, _toConsumableArray(selectState(function (state) {
          return state[stateId];
        }, stateId)));
      };

      var applyStateBinds = function applyStateBinds(beans) {
        beans.forEach(function (bean) {
          var stateId = getStateId(bean);
          U.$("[bind-".concat(stateId, "]")).forEach(function (input) {
            var defaultListener = function defaultListener(_, setInput) {
              return setInput(input.value);
            };

            input.addEventListener('change', function () {
              addListenerByParams(input, defaultListener, stateId);
              updateViewByState(bean, stateId);
            });
          });
        });
        return beans;
      };

      var handleActions = function handleActions(beans) {
        beans.forEach(function (bean) {
          var stateId = getStateId(bean);
          var actionAttributeName = "action-".concat(stateId);
          var actionElements = U.$("[".concat(actionAttributeName, "]"), bean);
          actionElements.forEach(function (actionElement) {
            var _U$stringToObject = U.stringToObject(actionElement.getAttribute(actionAttributeName)),
                _U$stringToObject2 = _slicedToArray(_U$stringToObject, 2),
                listenerName = _U$stringToObject2[0],
                type = _U$stringToObject2[1];

            actionElement.addEventListener(type, function () {
              addListenerByParams(actionElement, listenerName, stateId);
              updateViewByState(bean, stateId);
            });
          });
        });
        return beans;
      };

      var runRenderProcess = U.pipe(renderInitialView, handleActions, applyStateBinds);

      var init = function init() {
        return runRenderProcess();
      };

      init();

      var setGlobals = function setGlobals() {
        window.U = U;

        window.setBeanListeners = function (_listeners) {
          return listeners = _listeners;
        };
      };

      setGlobals();
    };

    window.bootstrap = bootstrap;
  }, {
    "nanoid": 1
  }]
}, {}, [4]);
