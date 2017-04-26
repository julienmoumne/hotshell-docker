#!/bin/bash
set -euo pipefail
IFS=$'\n\t'

DEFAULT_VERSION="minor"
read -p "version number [$DEFAULT_VERSION]: " version
version=${version:-$DEFAULT_VERSION}

npm version $DEFAULT_VERSION
npm publish
git push --follow-tags