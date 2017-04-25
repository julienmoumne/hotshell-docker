item({desc: 'hotshell-docker'}, function () {
    item({key: 'e', desc: 'examples'}, function () {
        _(exec('ls examples/**/*.js').split('\n')).each(function (el, ix) {
            item({key: ix, desc: el, cmd: 'hs --chdir -f ' + el})
        })
    })
    item({key: 'p', desc: 'publish npm', cmd: 'npm publish'})
})