#!/bin/bash

#! /backup_uploads.sh - Compresses the wp-content/uploads directory into a zip file and saves it in the uploads_backups directory.

set -e

# Load .env
export $(grep -v '^#' .env | xargs)

DATE=$(date +%Y%m%d_%H%M%S)
ZIP_FILE="$UPLOADS_BACKUP_DIR/uploads_$DATE.zip"

mkdir -p $UPLOADS_BACKUP_DIR

if [ -d "./wp-content/uploads" ]; then
    zip -r $ZIP_FILE ./wp-content/uploads > /dev/null
    echo "Uploads zipped to $ZIP_FILE"
else
    echo "Uploads folder not found: ./wp-content/uploads"
fi
