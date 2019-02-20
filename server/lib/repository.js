// @flow

type StaticsType = {
  items: {[string]: any}
};

export default class Repository {
  __STATICS__: StaticsType;

  constructor() {
    this.__STATICS__ = {
      items: {}
    };
  }

  insert(item: any) {
    const {items} = this.__STATICS__;

    items[item.id] = item;
  }

  find(id: string): any {
    const {items} = this.__STATICS__;
    const ids = Object.keys(items);

    for (const _id of ids) {
      if (id === _id) {
        return items[id];
      }
    }

    return null;
  }

  clear() {
    this.__STATICS__.items = {};
  }

  all(): Array<any> {
    return Object.values(this.__STATICS__.items);
  }

  get count(): number {
    const {items} = this.__STATICS__;

    return Object.keys(items).length;
  }
}
