// based on
// https://medium.com/@jrcreencia/persisting-redux-state-to-local-storage-f81eb0b90e7e
// https://egghead.io/lessons/javascript-redux-persisting-the-state-to-the-local-storage
// Egghead.io Redux course by Dan Abramov

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    // ok, we can live without it
  }
};
