import {
  $,
  getUUID,
  Indexable,
  stringToObject,
  Once,
  validate,
  onCond,
  logger,
} from './common';
import { getGlobalListener, Listener, ListenerRegistery } from './listener';
import {
  getStateId,
  MemoizedStateMutator,
  selectState,
  StateHandler,
  StateObtainer,
} from './state';

const getBeans = () => $('[bean]');
type Beans = NodeListOf<Element>;

const getRenderTree = (beans: Beans): [Indexable, string[]] => {
  const memory: Indexable = {};
  let renderTree: string[] = [];
  beans.forEach((bean: Node) => {
    const htmlBean = bean as HTMLElement;
    const stateId = getStateId(htmlBean);
    const initialValue = stringToObject(htmlBean.getAttribute('init')!);
    StateHandler.setState(stateId, initialValue);
    memory[stateId] = initialValue;
    $('[inject]', htmlBean).forEach((node) => {
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

const updateViewByState = (bean: HTMLElement, stateId: string) => {
  const value = StateHandler.getState()[stateId];
  const shouldUpdate = StateHandler.shouldUpdate;
  onCond(shouldUpdate, () =>
    $(`[${stateId}]`, bean).forEach(
      (node) => ((node as HTMLElement).innerText = JSON.stringify(value))
    )
  )();
  onCond(shouldUpdate, () =>
    $(`[bind-${stateId}]`, bean).forEach(
      (input) => ((input as HTMLInputElement).value = value)
    )
  )();
};

const invokeListenerByParams = <P>(
  listenerName: string | symbol,
  stateId: string,
  payload?: P
) =>
  getGlobalListener(ListenerRegistery.getListeners(), listenerName)(
    ...selectState((state) => state[stateId], stateId),
    payload
  );

class RenderEngine {
  @Once()
  static renderInitialView(beans: Beans) {
    const [memory, renderTree] = getRenderTree(beans);
    let currentNodeId;
    let currentNode: HTMLElement;
    renderTree.forEach((renderKey) => {
      if (validate(renderKey)) {
        currentNodeId = renderKey;
        currentNode = $(`[${currentNodeId}]`)[0] as HTMLElement;
        currentNode.innerHTML = '';
      } else if (/^\$[a-z-]+$/.test(renderKey)) {
        const stateId = renderKey.slice(1);
        const value = memory[stateId];
        const stateFragment = document.createElement('span');
        stateFragment.setAttribute(stateId, '');
        stateFragment.innerText = JSON.stringify(value);
        currentNode.append(stateFragment);
      } else {
        currentNode.append(document.createTextNode(renderKey));
      }
    });
    logger.debug('Initial view update is completed');
  }

  @Once()
  static handleActions(beans: Beans) {
    beans.forEach((bean) => {
      const htmlBean = bean as HTMLElement;
      const stateId = getStateId(htmlBean);
      const actionAttributeName = `action-${stateId}`;
      const actionElements = $(`[${actionAttributeName}]`, htmlBean);
      actionElements.forEach((actionElement) => {
        const [listenerName, type, payloadName] = stringToObject(
          actionElement.getAttribute(actionAttributeName)!
        );
        actionElement.addEventListener(type, () => {
          invokeListenerByParams(
            listenerName,
            stateId,
            StateHandler.getState()[payloadName]
          );
          updateViewByState(htmlBean, stateId);
        });
      });
    });
    logger.debug('Actions are successfully bound');
  }

  @Once()
  static applyInputBinds(beans: Beans) {
    beans.forEach((bean) => {
      const htmlBean = bean as HTMLElement;
      const stateId = getStateId(htmlBean);
      $(`[bind-${stateId}]`).forEach((input) => {
        const defaultBindListener = <V>(
          _: StateObtainer,
          setInput: MemoizedStateMutator<V>,
          value: V
        ) => {
          setInput(value);
          (input as HTMLInputElement).value = String(value);
        };
        const syntheticListenerName = Symbol(`@@bind-${stateId}`);
        ListenerRegistery.getListeners()[syntheticListenerName] =
          defaultBindListener;
        input.addEventListener('input', () => {
          invokeListenerByParams(
            syntheticListenerName,
            stateId,
            (input as HTMLInputElement).value
          );
          updateViewByState(bean as HTMLElement, stateId);
        });
      });
    });
    logger.debug('Two way data binding is enabled');
  }

  static executeRenderProcess = () =>
    (<A>(getArg: () => A, ...fs: ((arg: A) => void)[]) => {
      fs.forEach((f) => f(getArg()));
    })(
      () => getBeans(),
      RenderEngine.renderInitialView,
      RenderEngine.handleActions,
      RenderEngine.applyInputBinds
    );
}

const bootstrap = () => {
  RenderEngine.executeRenderProcess();
  const setGlobals = () => {
    window.setBeanListeners = (_listeners: Listener) =>
      Object.keys(_listeners).forEach(
        (key) => (ListenerRegistery.getListeners()[key] = _listeners[key])
      );
  };
  setGlobals();
  logger.log('Globals are injected');
  logger.warn('Inject listeners using setBeanListeners method');
};

export default bootstrap;
