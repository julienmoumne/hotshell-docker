var mock = require('mock-require')
var assert = require('assert')
var _ = require('underscore')
var fs = require('fs')

beforeEach(function() {
    var dslrunner = 'hotshell/cmd/hs/dslrunner/dslrunner.js'
    delete require.cache[require.resolve(dslrunner)]
    delete require.cache[require.resolve('./docker.hs.js')]
    hotshell = require(dslrunner)
    mock('hotshell', {
        item: hotshell.item,
        exec: function(e) { docker.execs.push(e); return 'ubuntu\nnginx'}
    })
    docker = require('./docker.hs.js')
    docker.execs = []
});

describe('docker', function () {
    describe('#compose', function () {
        describe('#commandsFirst', function () {
            it('displays commands first', function () {
                docker.compose('docker-compose.test.yml').commandsFirst()
                validateConfig('./test/compose/commands-first')
            })
        })
        describe('#servicesFirst', function () {
            it('displays services first', function () {
                docker.compose('docker-compose.test.yml').servicesFirst()
                validateConfig('./test/compose/services-first')
            })
        })
    })
});

function validateConfig(testPrefix) {
    fs.writeFileSync(testPrefix + '.actual.json',  JSON.stringify(hotshell.items, null, 2), 'utf-8');
    assert.deepEqual(hotshell.items, require(testPrefix + '.expected.json'))
    assert.deepEqual(docker.execs, ["docker-compose -f docker-compose.test.yml config --services | sort"])
}