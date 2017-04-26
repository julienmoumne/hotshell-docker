# Hotshell Docker [![npm version](https://badge.fury.io/js/hotshell-docker.svg)](https://www.npmjs.com/package/hotshell-docker)

> A collection of [Hotshell](http://julienmoumne.github.io/hotshell) patterns for Docker commands

[Hotshell](http://julienmoumne.github.io/hotshell)
is a command-line application to efficiently recall and share commands.

`hotshell-docker` aims to factor and distribute a set of patterns for Docker commands.

# Content

  - [Patterns](#patterns)
    * [Docker Compose](#docker-compose)
        - [Services First](#services-first)
        - [Commands First](#commands-first)
        - [Alternate Compose File](#alternate-compose-file)
  - [Import hotshell-docker](#import-hotshell-docker)


## Patterns

### Docker Compose

This Hotshell pattern uses `docker-compose config --services` to
automatically retrieve services defined using docker-compose.

A list of common docker-compose commands is provided to manage these services.

There are two layout options :

#### Commands First

> Select a docker-compose command then activate it on a service

Usage:

```javascript
item({desc: 'docker-compose: commands > services'}, function() {
    docker.compose.commandsFirst()
})
```

See [example source code](./examples/compose/commands-first.hs.js)
and a [demo](http://moumne.com/hotshell/demos/docker-compose.hs.js.html) (activate submenu `commands > services`)

#### Services First

> Select a docker-compose service then activate a command

Usage:

```javascript
item({desc: 'docker-compose: services > commands'}, function() {
    docker.compose.servicesFirst()
})
```

See [example source code](./examples/compose/services-first.hs.js)
and a [demo](http://moumne.com/hotshell/demos/docker-compose.hs.js.html) (activate submenu `services > commands`)

#### Alternate Compose File

> Specify an alternate docker-compose file

Usage:

```javascript
item({desc: 'docker-compose: alternate compose files'}, function() {
    item({key: 'd', desc: 'default file'}, docker.compose.servicesFirst)
    item({key: 'a', desc: 'alternate file'}, function() {
        docker.compose.servicesFirst('alternate-compose.yml')
    })
    item({key: 'c', desc: 'alternate file commands first'}, function() {
        docker.compose.commandsFirst('alternate-compose.yml')
    })
})
```

See [example source code](./examples/compose/alternate-compose-files.hs.js)

## Import hotshell-docker

### Using Node

Node is not required to use Hotshell.
However, If you have an Node environment, you can leverage
the fact that `hotshell-docker` is published as a npm module.

You can add `hotshell-docker` in your `package.json` or install it manually using `npm install hotshell-docker`.

You can then import it using `var docker = require('./node_modules/hotshell-docker')`.

### Without Node

Hotshell does not yet support downloading npm modules, see [Hotshell issue #11](https://github.com/julienmoumne/hotshell/issues/11).

In the meantime, here are two solutions if you do not have a Node environment.

#### Copy the file

Copy `docker.hs.js` along your `hs.js` file and import it using `var docker = require('./docker.hs.js')`.

#### Symlink the project

Clone `hotshell-docker`, symlink `docker.hs.js` along your `hs.js` file and import it using `var docker = require('./docker.hs.js')`.