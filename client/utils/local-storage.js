// @flow

const {localStorage} = window;
const {setItem, getItem} = window.localStorage;

export const set = setItem.bind(localStorage);
export const get = getItem.bind(localStorage);
