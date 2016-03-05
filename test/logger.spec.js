import expect from 'unexpected'
import sinon from 'sinon'
import Logger, {LogLevels, History} from '../lib/index.js'

describe('logger', function () {
    let logger, target

    beforeEach(function () {
        target = {
            log: sinon.spy(),
            error: sinon.spy()
        }
        logger = new Logger(LogLevels.log, target)
    })

    describe('constructor', function () {
        it('defaults target to console', function () {
            logger = new Logger()
            expect(logger.targets, 'to have length', 1)
            expect(logger.targets[0], 'to be', console)
        })

        it('accepts a custom target', function () {
            logger.log('message')
            sinon.assert.calledWith(target.log, 'message')
        })

        it('applies all logging functions from target', function () {
            expect(logger, 'to have properties', Object.keys(target))
        })
    })

    describe('log', function () {
        it('should call with multiple arguments', function () {
            logger.log('a', 'b', 'c')
            sinon.assert.calledWith(target.log, 'a', 'b', 'c')
        })
    })

    describe('logLevel', function () {
        it('should not record lower level events', function () {
            logger.logLevel = LogLevels.error
            logger.log('log')
            logger.error('error')
            expect(target.log.called, 'to be', false)
            expect(target.error.called, 'to be', true)
        })
    })
})
