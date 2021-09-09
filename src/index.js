const U = {
  $: (query, context = document) => context.querySelectorAll(query),
  curry: (f) =>
    U.isNot(U.type(f), U.types.function)
      ? f
      : (...args) => f.bind(null, ...args),
  is: Object.is,
  isNot: (v1, v2) => !U.is(v1, v2),
  not:
    (f) =>
    (...args) =>
      !f(...args),
  type: (v) => typeof v,
  stringToObject: (value) => {
    const isArray = Boolean(~value.indexOf('['));
    const isString = !isArray && Boolean(~value.indexOf("'"));
    return isString
      ? value.replace(/'/g, '')
      : JSON.parse(isArray ? value.replace(/'/g, '"') : value);
  },
  and: (bool1, bool2) => bool1 && bool2,
  deepCompare: (o1, o2) => {
    const o1Keys = Object.keys(o1);
    const o2Keys = Object.keys(o2);
    if (U.isNot(o1Keys.length, o2Keys.length)) return false;
    let result = true;
    for (const key of o1Keys) {
      const val1 = o1[key];
      const val2 = o2[key];
      result =
        result &&
        U.and(
          U.is(U.type(val1), U.types.object),
          U.is(U.type(val2), U.types.object)
        )
          ? U.deepCompare(val1, val2)
          : U.is(val1, val2);
      if (U.is(result, false)) return result;
    }
    return result;
  },
  types: {
    object: 'object',
    string: 'string',
    function: 'function',
    boolean: 'boolean',
    number: 'number',
  },
};

const bootstrap = () => {
  const { customAlphabet } = require('nanoid');
  const alphabet = '1234567890abcdefghijklmnopqrstuvwxyz';
  const validate = (str) => /^state-[a-z0-9-]{18}$/.test(str);

  const ChangeDetector = {
    detect(current, previous) {
      return U.and(
        U.is(U.type(current), U.types.object),
        U.is(U.type(previous), U.types.object)
      )
        ? !U.deepCompare(current, previous)
        : U.isNot(current, previous);
    },
  };

  const StateHandler = (() => {
    let state = {};
    let _shouldUpdate = true;
    return {
      getState: () => state,
      setState: (key, value) => {
        if (!ChangeDetector.detect(state[key], value))
          return (_shouldUpdate = false);
        state = {
          ...state,
          [key]: value,
        };
        _shouldUpdate = true;
      },
      get shouldUpdate() {
        return _shouldUpdate;
      },
    };
  })();

  let listeners = window.listeners || {};
  const selectState = (selector, key) => [
    () => selector(StateHandler.getState()),
    (value) => U.curry(StateHandler.setState)(key)(value),
  ];
  const getBeans = () => U.$('[bean]');
  const getGlobalListener = (listenerName) => listeners[listenerName];
  const getUUID = () => `state-${customAlphabet(alphabet, 18)()}`;

  const getRenderTree = (beans) => {
    const memory = {};
    let renderTree = [];
    beans.forEach((bean) => {
      const stateId = bean.getAttribute('state');
      const initialValue = U.stringToObject(bean.getAttribute('init'));
      StateHandler.setState(stateId, initialValue);
      memory[stateId] = initialValue;
      U.$('[inject]', bean).forEach((node) => {
        const nodeId = getUUID();
        node.removeAttribute('inject');
        node.setAttribute(nodeId, '');
        renderTree = renderTree.concat(
          nodeId,
          node.innerHTML.split(/(\$[a-z-]+)/g)
        );
      });
    });
    return [memory, renderTree];
  };

  const initialRender = (beans) => {
    const [memory, renderTree] = getRenderTree(beans);
    let currentNodeId;
    let currentNode;
    renderTree.forEach((renderKey) => {
      if (validate(renderKey)) {
        currentNodeId = renderKey;
        currentNode = U.$(`[${currentNodeId}]`)[0];
        currentNode.innerHTML = null;
      } else if (/^\$[a-z-]+$/.test(renderKey)) {
        const stateId = renderKey.slice(1);
        const value = memory[stateId];
        const stateFragment = document.createElement('span');
        stateFragment.setAttribute(stateId, '');
        stateFragment.innerText = value;
        currentNode.append(stateFragment);
      } else {
        currentNode.append(document.createTextNode(renderKey));
      }
    });
    return {
      then(actionHandler) {
        beans.forEach((bean) =>
          actionHandler(bean, bean.getAttribute('state'))
        );
      },
    };
  };

  const render = (bean, stateId) => {
    const value = StateHandler.getState()[stateId];
    StateHandler.shouldUpdate &&
      U.$(`[${stateId}]`, bean).forEach((node) => (node.innerText = value));
  };

  const addListenerByParams = (element, listenerName, stateId) =>
    element instanceof HTMLInputElement
      ? getGlobalListener(listenerName)(
          () => element['value'],
          ...selectState((state) => state[stateId], stateId)
        )
      : getGlobalListener(listenerName)(
          ...selectState((state) => state[stateId], stateId)
        );

  const injectActions = (bean, stateId) => {
    const actionAttributeName = `action-${stateId}`;
    const actionElements = U.$(`[${actionAttributeName}]`, bean);
    actionElements.forEach((actionElement) => {
      const [listenerName, type] = U.stringToObject(
        actionElement.getAttribute(actionAttributeName)
      );
      actionElement.addEventListener(type, () => {
        addListenerByParams(actionElement, listenerName, stateId);
        render(bean, stateId);
      });
    });
  };

  const injectFragments = (beans) => initialRender(beans).then(injectActions);
  const init = () => injectFragments(getBeans());
  init();

  const setGlobals = () => {
    window.U = U;
    window.setBeanListeners = (_listeners) => (listeners = _listeners);
  };
  setGlobals();
};

window.bootstrap = bootstrap;
