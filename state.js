const Utils = {
  $: (query, context = document) => context.querySelectorAll(query),
  is: Object.is,
  type: (v) => typeof v,
  stringToObject: (value, options = { isArray: false, isString: false }) =>
    options.isString
      ? value.replace(/'/g, '')
      : JSON.parse(options.isArray ? value.replace(/'/g, '"') : value),
};

(() => {
  const StateHandler = (() => {
    let state = {};
    return {
      getState: () => state,
      setState: (key, value) => {
        if (is(state[key], value)) return;
        state = {
          ...state,
          [key]: value,
        };
      },
    };
  })();

  const StateHandlerTuple = [StateHandler.getState, StateHandler.setState];
  const getStateHandlers = () => $('[bean]');
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
    const value = stringToObject(rawInitialValue, {
      isString: Boolean(~rawInitialValue.indexOf("'")),
    });
    StateHandler.setState(stateId, value);
    $(`[${stateId}]`, bean).forEach((node) => {
      node.hasAttribute(stateId) && node.removeAttribute(stateId);
      const stringTokens = node.innerHTML.split(`$state`);
      const HTMLFragments = createStateContainers(stringTokens, stateId, value);
      const enhancedHTML = HTMLFragments.map((HTMLFragment) =>
        is(type(HTMLFragment), 'string')
          ? document.createTextNode(HTMLFragment)
          : HTMLFragment
      );
      node.innerHTML = null;
      node.append(...enhancedHTML);
    });
  };

  const render = (bean, stateId) => {
    const value = StateHandler.getState()[stateId];
    $(`[${stateId}]`, bean).forEach((node) => (node.innerText = value));
  };

  const injectActions = (bean, stateId) => {
    const actionAttributeName = `action-${stateId}`;
    const actionElements = $(`[${actionAttributeName}]`, bean);
    actionElements.forEach((actionElement) => {
      const [listenerName, type] = stringToObject(
        actionElement.getAttribute(actionAttributeName),
        {
          isArray: true,
        }
      );
      actionElement.addEventListener(type, () => {
        let _actionElement = actionElement;
        actionElement instanceof HTMLInputElement
          ? getGlobalListener(listenerName)(
              () => _actionElement['value'],
              ...StateHandlerTuple
            )
          : getGlobalListener(listenerName)(...StateHandlerTuple);
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
