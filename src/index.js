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
  },
};

(() => {
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
    return {
      getState: () => state,
      setState: (key, value) => {
        if (!ChangeDetector.detect(state[key], value)) return;
        state = {
          ...state,
          [key]: value,
        };
      },
    };
  })();

  const selectState = (selector, key) => [
    () => selector(StateHandler.getState()),
    (value) => U.curry(StateHandler.setState)(key)(value),
  ];
  const getStateHandlers = () => U.$('[bean]');
  const getGlobalListener = (listenerName) => listeners[listenerName];

  const createStateContainers = (stringTokens, stateId, value) => {
    const HTMLFragments = [];
    stringTokens.forEach((stringToken, idx) => {
      HTMLFragments.push(stringToken);
      if (idx !== stringTokens.length - 1) {
        const stateContainer = document.createElement('span');
        stateContainer.innerText = value;
        stateContainer.setAttribute(stateId, '');
        HTMLFragments.push(stateContainer);
      }
    });
    return HTMLFragments;
  };

  const initialRender = (bean, stateId) => {
    const rawInitialValue = bean.getAttribute('init');
    const value = U.stringToObject(rawInitialValue);
    StateHandler.setState(stateId, value);
    U.$(`[${stateId}]`, bean).forEach((node) => {
      node.hasAttribute(stateId) && node.removeAttribute(stateId);
      const stringTokens = node.innerHTML.split(`$state`);
      const HTMLFragments = createStateContainers(stringTokens, stateId, value);
      const enhancedHTML = HTMLFragments.map((HTMLFragment) =>
        U.is(U.type(HTMLFragment), U.types.string)
          ? document.createTextNode(HTMLFragment)
          : HTMLFragment
      );
      node.innerHTML = null;
      node.append(...enhancedHTML);
    });
  };

  const render = (bean, stateId) => {
    const value = StateHandler.getState()[stateId];
    U.$(`[${stateId}]`, bean).forEach((node) => (node.innerText = value));
  };

  const injectActions = (bean, stateId) => {
    const actionAttributeName = `action-${stateId}`;
    const actionElements = U.$(`[${actionAttributeName}]`, bean);
    actionElements.forEach((actionElement) => {
      const [listenerName, type] = U.stringToObject(actionElement.getAttribute(actionAttributeName));
      debugger;
      actionElement.addEventListener(type, () => {
        let _actionElement = actionElement;
        actionElement instanceof HTMLInputElement
          ? getGlobalListener(listenerName)(
              () => _actionElement['value'],
              ...selectState((state) => state[stateId], stateId)
            )
          : getGlobalListener(listenerName)(
              ...selectState((state) => state[stateId], stateId)
            );
        render(bean, stateId);
      });
    });
  };

  const injectFragments = (beans) => {
    beans.forEach((bean) => {
      const stateId = bean.getAttribute('state');
      initialRender(bean, stateId);
      injectActions(bean, stateId);
    });
  };

  const init = () => {
    const beans = getStateHandlers();
    injectFragments(beans);
  };

  init();
})();
