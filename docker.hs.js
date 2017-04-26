exports.compose = function(composeFile) {
    var services = retrieveServices(composeFile)
    
    var commands = [
        {key: 'u', desc: 'up -d', ps: true},
        {key: 'r', desc: 'restart', ps: true},
        {key: 's', desc: 'stop', ps: true},
        {key: 'k', desc: 'kill', ps: true},
        {key: 'l', desc: 'logs -f'},
        {key: 'p', desc: 'ps'},
        {key: 'b', desc: 'build'},
        {key: 'd', desc: 'rm', ps: true}
    ]
    
    function createCmdForService(command, service) {
        var service = service == 'all' ? '' : ' ' + service
        var baseCmd = getComposeCmd(composeFile)
        var post = _(command.ps).isUndefined() ? '' : ' && ' + baseCmd + 'ps' + service
        return baseCmd + command.desc + service + post
    }
        
    function createCommandForEveryServices(command) {
        item(command, function () {
            item({key: 'a', desc: 'all', cmd: createCmdForService(command, 'all')})
            _(services).each(function (service, serviceIndex) {
                item({key: serviceIndex, desc: service, cmd: createCmdForService(command, service)})
            })
        })
    }
    
    function dockerComposeConfig () {
        item({key: 'c', desc: 'display config', cmd: getComposeCmd() + 'config'})
    }
    
    function getComposeCmd() {
        return 'docker-compose ' + (_(composeFile).isUndefined() ? '' : '-f ' + composeFile + ' ')
    }
    
    function retrieveServices() {
        return exec(getComposeCmd() + 'config --services | sort').split('\n')
    }
    
    function createCommandsForSingleService(service, key) {
        item({key: key, desc: service}, function () {
            _(commands).each(function (command, cmdIndex) {
                item({key: command.key, desc: command.desc, cmd: createCmdForService(command, service)})
            })
        })
    }
    
    return {
        servicesFirst: function() {
            createCommandsForSingleService('all', 'a')
            _(services).each(createCommandsForSingleService)
            dockerComposeConfig()
        },
        commandsFirst: function() {
            _(commands).each(createCommandForEveryServices)
            dockerComposeConfig()
        }
    }
}