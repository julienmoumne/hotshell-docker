var docker = require('../../docker.hs.js')
var item = require('hotshell').item

item({desc: 'docker-compose: alternate compose files'}, function() {
    item({key: 'd', desc: 'default file, services > commands'}, docker.compose().servicesFirst)
    var alternateCompose = docker.compose('alternate-compose.yml')
    item({key: 'a', desc: 'alternate file, services > commands'}, alternateCompose.servicesFirst)
    item({key: 'c', desc: 'alternate file, commands > services'}, alternateCompose.commandsFirst)
})