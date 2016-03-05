import expect from 'unexpected'
import sinon from 'sinon'
import Logger, {LogLevels, History} from '../lib/index.js'

describe('history', function () {
    let logger, target

    beforeEach(function () {
        target = new History()
        logger = new Logger(LogLevels.log, target)
    })

    describe('history', function () {
        it('records logs', function () {
            logger.log('message#1')
            logger.log('message#2')
            expect(target.history[0], 'to contain', ['message#1'])
            expect(target.history[1], 'to contain', ['message#2'])
        })

        it('saves snapshot of object rather than reference', function () {
            const obj = {value: 42}
            logger.log(obj)
            obj.value += 42
            logger.log(obj)
            expect(target.history[0], 'to contain', [{value: 42}])
            expect(target.history[1], 'to contain', [{value: 84}])
        })
    })
})
