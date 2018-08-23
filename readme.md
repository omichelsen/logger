# logger.js

[![Build Status](https://img.shields.io/travis/rust-lang/rust.svg)](https://travis-ci.org/omichelsen/logger)
[![Coverage Status](https://coveralls.io/repos/github/omichelsen/logger/badge.svg?branch=master)](https://coveralls.io/github/omichelsen/logger?branch=master) [![Greenkeeper badge](https://badges.greenkeeper.io/omichelsen/logger.svg)](https://greenkeeper.io/)

Simple logger can be used as wrapper for console, adds log output levels, multiple targets and history. Will default to use `console`, but you can add your own custom targets instead.

This library is written entirely in ECMAScript 6+, so if you need support for older browsers you need something like [Babel](http://babeljs.io/).

## API

### Contructor

`new Logger(logLevel, ...targets)`

#### Parameters

##### _logLevel_
Optional. Log messages from specified level (ordered):

* `LogLevel.log`
* `LogLevel.info`
* `LogLevel.warn`
* `LogLevel.error`

_Default_: `LogLevels.log`

##### _targets_
Optional. Targets to output to, multiple can be specified: `new Logger(LogLevels.log, target1, target2)`

_Default_: `console`

## Usage

```js
import Logger from 'logger'

const logger = new Logger()

logger.log('log line 1')
logger.info('log line 2')
logger.warn('log line 3')
logger.error('log line 4')
```

### Log levels

You can choose only to log above a certain level. To only print warnings and errors:

```js
import Logger, {LogLevels} from 'logger'

const logger = new Logger(LogLevels.warn)

logger.log('log line 1')    // will not be logged
logger.info('log line 2')   // will not be logged
logger.warn('log line 3')
logger.error('log line 4')
```

### Multiple targets

You can choose to log to multiple targets, for instance sending logs to both console and a logging server.

```js
import Logger, {LogLevels} from 'logger'

const serverTarget = {
    log: function (...args) {
        fetch('https://logserver.com/logs', {
            method: 'post',
            body: JSON.stringify(args)
        })
    }
}

const logger = new Logger(LogLevels.log, console, serverTarget)

logger.log('log line 1')    // will be logged to both console and server
```

Targets need to implement the standard methods: `log`, `info`, `warn` and `error`.

### History (optional target)

A prebuilt `History` target is included, which can be useful in an offline scenario. This allows you to send a history of logs to the server when the system comes online again:

```js
import Logger, {LogLevels, History} from 'logger'

const target = new History()
const logger = new Logger(LogLevels.log, target)

logger.log('log line 1')    // will be saved in history

window.addEventListener('online', function () {
    fetch('https://logserver.com/logs', {
        method: 'post',
        body: JSON.stringify(target.history)
    })
})
```
