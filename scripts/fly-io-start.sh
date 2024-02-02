#!/usr/bin/env bash

# Exit if any command exits with a non-zero exit code
set -o errexit

echo "PostgreSQL config file exists, starting database..."
su postgres -c "pg_ctl start -D /postgres-volume/run/postgresql/data/"


# if [[ -f $VOLUME_PATH/run/postgresql/data/postgresql.conf ]]; then

# else
  # Import PostgreSQL script
  # chmod +x /app/scripts/fly-io-postgres.sh
  # /app/scripts/fly-io-postgres.sh
# fi

pnpm migrate up
./node_modules/.bin/next start
