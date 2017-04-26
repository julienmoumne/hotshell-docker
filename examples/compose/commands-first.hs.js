var docker = require('../../docker.hs.js')

item({desc: 'docker-compose: commands > services'}, function() {
    docker.compose().commandsFirst()
})