import { GenericFunction } from './common';
import { Listener } from './listener';

declare global {
  interface Window {
    setBeanListeners: (newListeners: Listener) => void;
    bootstrap: GenericFunction;
  }
}
