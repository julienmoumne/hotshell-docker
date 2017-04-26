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

function createCmdForService(command, service, composeFile) {
    var service = service == 'all' ? '' : ' ' + service
    var baseCmd = getComposeCmd(composeFile)
    var post = _(command.ps).isUndefined() ? '' : ' && ' + baseCmd + 'ps' + service
    return baseCmd + command.desc + service + post
}
    
function createCommandsForSingleService(service, key, composeFile) {
    item({key: key, desc: service}, function () {
        _(commands).each(function (command, cmdIndex) {
            item({key: command.key, desc: command.desc, cmd: createCmdForService(command, service, composeFile)})
        })
    })
}

function createCommandForEveryServices(command, composeFile, services) {
    item(command, function () {
        item({key: 'a', desc: 'all', cmd: createCmdForService(command, 'all', composeFile)})
        _(services).each(function (service, serviceIndex) {
            item({key: serviceIndex, desc: service, cmd: createCmdForService(command, service, composeFile)})
        })
    })
}

function dockerComposeConfig (composeFile) {
    item({key: 'c', desc: 'display config', cmd: getComposeCmd(composeFile) + 'config'})
}

function getComposeCmd(composeFile) {
    return 'docker-compose ' + (_(composeFile).isUndefined() ? '' : '-f ' + composeFile + ' ')
}

function retrieveServices(composeFile) {
    return exec(getComposeCmd(composeFile) + 'config --services | sort').split('\n')
}

var compose = exports.compose = {}

compose.servicesFirst = function(composeFile) {
    createCommandsForSingleService('all', 'a', composeFile)
    _(retrieveServices(composeFile)).each(function(service, key) {
        createCommandsForSingleService(service, key, composeFile)
    })
    dockerComposeConfig(composeFile)
}

compose.commandsFirst = function(composeFile) {
    var services = retrieveServices(composeFile)
    _(commands).each(function (command) {
        createCommandForEveryServices(command, composeFile, services)
    })
    dockerComposeConfig(composeFile)
}