#!/bin/bash

#! /backup.sh - Main backup script that prompts the user to choose whether to dump the database and/or backup uploads, then performs cleanup of old backups.

set -e

# Load .env
export $(grep -v '^#' .env | xargs)

echo "==== WordPress Backup Script ===="

read -p "Dump database? [y/N]: " db_answer
if [[ "$db_answer" =~ ^[Yy]$ ]]; then
    ./backup_dump.sh
else
    echo "Skipping database dump."
fi

read -p "Backup uploads? [y/N]: " uploads_answer
if [[ "$uploads_answer" =~ ^[Yy]$ ]]; then
    ./backup_uploads.sh
else
    echo "Skipping uploads backup."
fi

# Cleanup backups older than 7 days
find $DB_BACKUP_DIR -type f -mtime +5 -delete
find $UPLOADS_BACKUP_DIR -type f -mtime +1 -delete

echo "==== Backup Complete ===="
