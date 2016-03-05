import LogLevels from './levels.js'

function record(type, ...args) {
	this.history.push([Date.now(), args])
}

export default class History {
	constructor() {
		this.history = []
		Object.keys(LogLevels).forEach(key => {
			this[key] = record.bind(this, key)
		})
	}
}