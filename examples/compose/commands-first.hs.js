var docker = require('../../docker.hs.js')
var item = require('hotshell').item

item({desc: 'docker-compose: commands > services'}, function() {
    docker.compose().commandsFirst()
})