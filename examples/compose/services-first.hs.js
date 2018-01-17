var docker = require('../../docker.hs.js')
var item = require('hotshell').item

item({desc: 'docker-compose: services > commands'}, function() {
    docker.compose().servicesFirst()
})