import {
  $,
  getUUID,
  Indexable,
  stringToObject,
  Once,
  validate,
  onCond,
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
      (node) => ((node as HTMLElement).innerText = value)
    )
  )();
  onCond(shouldUpdate, () =>
    $(`[bind-${stateId}]`, bean).forEach(
      (input) => ((input as HTMLInputElement).value = value)
    )
  )();
};

const invokeListenerByParams = (
  element: HTMLElement,
  listenerName: string | symbol,
  stateId: string
) =>
  element instanceof HTMLInputElement
    ? getGlobalListener(ListenerRegistery.getListeners(), listenerName)(
        () => element['value'],
        ...selectState((state) => state[stateId], stateId)
      )
    : getGlobalListener(
        ListenerRegistery.getListeners(),
        listenerName
      )(...selectState((state) => state[stateId], stateId));

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
        stateFragment.innerText = value;
        currentNode.append(stateFragment);
      } else {
        currentNode.append(document.createTextNode(renderKey));
      }
    });
  }

  @Once()
  static handleActions(beans: Beans) {
    beans.forEach((bean) => {
      const htmlBean = bean as HTMLElement;
      const stateId = getStateId(htmlBean);
      const actionAttributeName = `action-${stateId}`;
      const actionElements = $(`[${actionAttributeName}]`, htmlBean);
      actionElements.forEach((actionElement) => {
        const [listenerName, type] = stringToObject(
          actionElement.getAttribute(actionAttributeName)!
        );
        actionElement.addEventListener(type, () => {
          invokeListenerByParams(
            actionElement as HTMLElement,
            listenerName,
            stateId
          );
          updateViewByState(htmlBean, stateId);
        });
      });
    });
  }

  @Once()
  static applyInputBinds(beans: Beans) {
    beans.forEach((bean) => {
      const htmlBean = bean as HTMLElement;
      const stateId = getStateId(htmlBean);
      $(`[bind-${stateId}]`).forEach((input) => {
        const defaultBindListener = <V>(
          value: () => V,
          _: StateObtainer,
          setInput: MemoizedStateMutator<V>
        ) => {
          setInput(value());
          (input as HTMLInputElement).value = String(value());
        };
        const syntheticListenerName = Symbol(`@@bind-${stateId}`);
        ListenerRegistery.getListeners()[syntheticListenerName] =
          defaultBindListener;
        input.addEventListener('input', () => {
          invokeListenerByParams(
            input as HTMLInputElement,
            syntheticListenerName,
            stateId
          );
          updateViewByState(bean as HTMLElement, stateId);
        });
      });
    });
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
};

export default bootstrap;
