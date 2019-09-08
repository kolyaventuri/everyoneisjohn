// @flow

const {localStorage} = window;
const {setItem, getItem} = window.localStorage;

export const set = setItem.bind(localStorage);
export const get = getItem.bind(localStorage);

export const defaults = (opts: {[string]: any}) => {
  const keys = Object.keys(opts);

  for (const key of keys) {
    const data = opts[key];
    const existing = Boolean(get(key));

    if (!existing) {
      set(key, data);
    }
  }
};
