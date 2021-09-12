import { and, deepCompare, Indexable, is, isNot, type, types } from './common';

export const ChangeDetector = {
  detect<T>(current: T, previous: T) {
    return and(
      is(type(current), types.object),
      is(type(previous), types.object)
    )
      ? !deepCompare(current, previous)
      : isNot(current, previous);
  },
};

export type StateObtainer<S extends Indexable = Indexable> = () => S;
export type StateMutator<V, K = string> = (key: string | K, value: V) => void;
export type MemoizedStateMutator<V> = (value: V) => void;

export const StateHandler = (() => {
  let state: Indexable = {};
  let _shouldUpdate = true;
  return {
    getState: () => state,
    setState: <V>(key: string, value: V) => {
      if (!ChangeDetector.detect(state[key], value)) {
        _shouldUpdate = false;
      } else {
        state = {
          ...state,
          [key]: value,
        };
        _shouldUpdate = true;
      }
    },
    get shouldUpdate() {
      return _shouldUpdate;
    },
  } as const;
})();
type Selector<S, V> = (state: S) => V;
type State<T = any> = Indexable<T>;
export const getStateId = <E extends HTMLElement>(bean: E) =>
  bean.getAttribute('state')!;
export const selectState = <V>(
  selector: Selector<State, V>,
  key: string
): readonly [StateObtainer, MemoizedStateMutator<V>] =>
  [
    () => selector(StateHandler.getState()),
    (value: V) => StateHandler.setState(key, value),
  ] as const;
