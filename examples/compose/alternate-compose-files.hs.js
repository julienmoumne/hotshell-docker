var docker = require('../../docker.hs.js')

item({desc: 'docker-compose: alternate compose files'}, function() {
    item({key: 'd', desc: 'default file'}, docker.compose.servicesFirst)
    item({key: 'a', desc: 'alternate file'}, function() {
        docker.compose.servicesFirst('alternate-compose.yml')
    })
    item({key: 'c', desc: 'alternate file commands first'}, function() {
        docker.compose.commandsFirst('alternate-compose.yml')
    })
})