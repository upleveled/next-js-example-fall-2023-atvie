#!/usr/bin/env bash

# Exit if any command exits with a non-zero exit code
set -o errexit

# Start database
echo "PostgreSQL config file exists, starting database..."
su postgres -c "pg_ctl start -D /postgres-volume/run/postgresql/data/"

pnpm migrate up
./node_modules/.bin/next start