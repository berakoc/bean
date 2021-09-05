"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
  types: {
    object: 'object',
    string: 'string',
    "function": 'function',
    "boolean": 'boolean',
    number: 'number'
  }
};

(function () {
  var ChangeDetector = {
    detect: function detect(current, previous) {
      return U.and(U.is(U.type(current), U.types.object), U.is(U.type(previous), U.types.object)) ? !U.deepCompare(current, previous) : U.isNot(current, previous);
    }
  };

  var StateHandler = function () {
    var state = {};
    return {
      getState: function getState() {
        return state;
      },
      setState: function setState(key, value) {
        if (!ChangeDetector.detect(state[key], value)) return;
        state = _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, key, value));
      }
    };
  }();

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

  var createStateContainers = function createStateContainers(stringTokens, stateId, value) {
    var HTMLFragments = [];
    stringTokens.forEach(function (stringToken, idx) {
      HTMLFragments.push(stringToken);

      if (idx !== stringTokens.length - 1) {
        var stateContainer = document.createElement('span');
        stateContainer.innerText = value;
        stateContainer.setAttribute(stateId, '');
        HTMLFragments.push(stateContainer);
      }
    });
    return HTMLFragments;
  };

  var initialRender = function initialRender(bean, stateId) {
    var rawInitialValue = bean.getAttribute('init');
    var value = U.stringToObject(rawInitialValue);
    StateHandler.setState(stateId, value);
    U.$("[".concat(stateId, "]"), bean).forEach(function (node) {
      node.hasAttribute(stateId) && node.removeAttribute(stateId);
      var stringTokens = node.innerHTML.split("$state");
      var HTMLFragments = createStateContainers(stringTokens, stateId, value);
      var enhancedHTML = HTMLFragments.map(function (HTMLFragment) {
        return U.is(U.type(HTMLFragment), U.types.string) ? document.createTextNode(HTMLFragment) : HTMLFragment;
      });
      node.innerHTML = null;
      node.append.apply(node, _toConsumableArray(enhancedHTML));
    });
  };

  var render = function render(bean, stateId) {
    var value = StateHandler.getState()[stateId];
    U.$("[".concat(stateId, "]"), bean).forEach(function (node) {
      return node.innerText = value;
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

  var injectActions = function injectActions(bean, stateId) {
    var actionAttributeName = "action-".concat(stateId);
    var actionElements = U.$("[".concat(actionAttributeName, "]"), bean);
    actionElements.forEach(function (actionElement) {
      var _U$stringToObject = U.stringToObject(actionElement.getAttribute(actionAttributeName)),
          _U$stringToObject2 = _slicedToArray(_U$stringToObject, 2),
          listenerName = _U$stringToObject2[0],
          type = _U$stringToObject2[1];

      actionElement.addEventListener(type, function () {
        addListenerByParams(actionElement, listenerName, stateId), render(bean, stateId);
      });
    });
  };

  var injectFragments = function injectFragments(beans) {
    beans.forEach(function (bean) {
      var stateId = bean.getAttribute('state');
      initialRender(bean, stateId);
      injectActions(bean, stateId);
    });
  };

  var init = function init() {
    return injectFragments(getBeans());
  };

  init();
})();
