import { BiFunction, curry, GenericFunction, Indexable } from './common';

export type Listener = Record<string | symbol, GenericFunction<void>>;

const listeners = {};

export const getGlobalListener: BiFunction<
  Listener,
  string | symbol,
  GenericFunction<void>
> = (
  listeners: Listener,
  listenerName: string | symbol
): GenericFunction<void> => listeners[listenerName]!;

export const getStaticGlobalListener = (listenerName: string | symbol) =>
  curry<
    Listener,
    string | symbol,
    GenericFunction<void>,
    BiFunction<Listener, string | symbol, GenericFunction<void>>
  >(getGlobalListener)(listeners)(listenerName);

export const ListenerRegistery = (() => {
  const listeners: Indexable = {};
  return {
    getListeners: () => listeners,
    setListeners: <V>(key: string, value: V) => (listeners[key] = value),
  } as const;
})();
