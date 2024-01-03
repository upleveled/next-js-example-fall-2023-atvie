#!/usr/bin/env bash

# Exit if any command exits with a non-zero exit code
set -o errexit

pnpm migrate up
./node_modules/.bin/next start
