var docker = require('../../docker.hs.js')

item({desc: 'docker-compose: services > commands'}, function() {
    docker.compose.servicesFirst()
})