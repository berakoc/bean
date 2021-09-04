listeners = {
  updateText(getValue, _, setText) {
    setText( getValue());
  },
  increment(getCounter, setCounter) {
    setCounter(getCounter() + 1);
  }
}
