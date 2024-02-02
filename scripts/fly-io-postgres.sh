#!/usr/bin/env bash

mkdir -p /postgres-volume/run/postgresql/data
chown postgres:postgres /postgres-volume/run/postgresql

su postgres -c "./alpine-postgresql-setup-and-start.sh"

# # Initialize a database in the data directory
# su postgres -c "initdb -D /postgres-volume/run/postgresql/data/"

# # Update PostgreSQL config path to use volume location if app has a volume
# sed -i "s/#unix_socket_directories = '\/run\/postgresql'/unix_socket_directories = '\/postgres-volume\/run\/postgresql'/g" /postgres-volume/run/postgresql/data/postgresql.conf || echo "PostgreSQL volume not mounted, running database as non-persistent (new deploys erase changes not saved in migrations)"

# # Configure PostgreSQL to listen for connections from any address
# echo "listen_addresses='*'" >> /postgres-volume/run/postgresql/data/postgresql.conf

# # Start database
# su postgres -c "pg_ctl start -D /postgres-volume/run/postgresql/data/"

# # Create database and user with credentials from Fly.io secrets
# psql -U postgres postgres << SQL
#   CREATE DATABASE test;
#   CREATE USER test WITH ENCRYPTED PASSWORD 'test';
#   GRANT ALL PRIVILEGES ON DATABASE test TO test;
#   \\connect test;
#   CREATE SCHEMA test AUTHORIZATION test;
# SQL
