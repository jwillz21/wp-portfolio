#!/bin/bash

#! /backup_dump.sh - Exports the WordPress database from the MySQL container and saves it as a compressed SQL file in the db_backups directory. 

set -e

# Load .env
export $(grep -v '^#' .env | xargs)

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$DB_BACKUP_DIR/${DB_NAME}_$DATE.sql"

mkdir -p $DB_BACKUP_DIR

docker exec $DB_CONTAINER sh -c "exec mysqldump -u$DB_USER -p$DB_PASSWORD $DB_NAME" > $BACKUP_FILE

gzip -f $BACKUP_FILE

echo "Database exported and compressed to $BACKUP_FILE.gz"
