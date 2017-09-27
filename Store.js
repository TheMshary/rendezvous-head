import { extendObservable } from "mobx";

class myStore {
  constructor() {
    extendObservable(this, {
      token: "",
      id: ""
    });
  }
}

export default new myStore();
