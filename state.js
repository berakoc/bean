(() => {
  const Bean = (() => {
    let hooks = [];
    let idx = 0;
    const inject = (initialValue) => {
      let state = hooks[idx] || initialValue;
      const _idx = idx;
      const setState = (newVal) => {
        hooks[_idx] = newVal;
      };
      idx++;
      return [state, setState];
    };
    const render = (Component) => {
      idx = 0;
      const C = Component();
      C.render();
      return C;
    };
    const onMount = (cb, depArray) => {
      const oldDeps = hooks[idx];
      let hasChanged = true;
      if (oldDeps) {
        hasChanged = depArray.some((dep, i) => !Object.is(dep, oldDeps[i]));
      }
      if (hasChanged) cb();
      hooks[idx] = depArray;
      idx++;
    };
    return {
      inject,
      render,
      onMount,
    };
  })();

  const getBeans = () => document.querySelectorAll('[bean]');
  const states = {};

  const identity = (v) => v;
  const pluck = key => o => o[key];
  const pipe =
  (...fs) =>
  (...args) =>
      fs.reduce(
          (F, f) => () => [f(...[].concat(F()))],
          () => args
      )()[0];

  (generateId = function* () {
    for (let i = 1; ; ++i) yield i;
  })();

  const getId = (idGenerator) => idGenerator.next().value;

  const fromAttribute = (value) => JSON.parse(value);

  const injectState = (bean, stateId) => {
    const initialValue = fromAttribute(bean.getAttribute('init'));
    const Component = () => {
      [state, setState] = Bean.inject(initialValue);
      return {
        render: () => null,
        access: (handler) => handler(state, setState),
      };
    };
    Bean.render(Component);
    const instance = Component();
    bean
      .querySelectorAll(`[${stateId}]`)
      .forEach(
        (node) =>
          (node.innerText = node.innerText.replace(/\$[a-z-]+/g, () =>
            instance.access(
              pipe((value) => (states[stateId] = value), identity),
            )
          ))
      );
    return Component;
  };

  const injectActions = (bean, stateId, Component) => {};

  const injectFragments = (beans) => {
    beans.forEach((bean) => {
      const stateId = bean.getAttribute('state');
      const Component = injectState(bean, stateId);
      injectActions(bean, stateId, Component);
    });
  };

  const init = () => {
    const beans = getBeans();
    injectFragments(beans);
    console.log(states);
  };

  init();
})();
