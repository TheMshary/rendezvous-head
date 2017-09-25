import { extendObservable } from "mobx";

class myStore {
	constructor() {
		extendObservable(this, {
				events: [],
			}
		)
	}
}

export default new myStore()