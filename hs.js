item({desc: 'hotshell-docker'}, function () {
    item({key: 'e', desc: 'examples'}, function () {
        _(exec('ls examples/**/*.js').split('\n')).each(function (el, ix) {
            item({key: ix, desc: el, cmd: 'hs --chdir -f ' + el})
        })
    })
    item({key: 'r', desc: 'release new version', cmd: './release.sh'})
})