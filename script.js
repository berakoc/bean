const selectCounter = (state) => state.counter;

listeners = {
  updateText(getValue, _, setState) {
    setState('text', getValue());
  },
  increment(getState, setState) {
    setState('counter', selectCounter(getState()) + 1);
  }
}
