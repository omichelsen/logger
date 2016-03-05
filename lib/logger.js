import LogLevels from './levels.js'

function clone(arr) {
	return arr.map(a => JSON.parse(JSON.stringify(a)))
}

function log(type, ...args) {
	if (LogLevels[type] < this.logLevel) return
	this.targets.forEach(target => target[type](...clone(args)))
}

export default class Logger {
	constructor(logLevel = LogLevels.log, ...targets) {
		this.logLevel = logLevel
		this.targets = targets.length ? targets : [console]

		Object.keys(LogLevels).forEach(key => {
			this[key] = log.bind(this, key)
		})
	}
}