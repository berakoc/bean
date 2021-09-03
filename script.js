const selectCounter = (state) => state.counter;

listeners = {
  updateText(getValue, _, setState) {
    setState('text', getValue());
  },
  increment(getState, setState) {
    console.log(getState())
    setState('counter', selectCounter(getState()) + 1);
  }
}
