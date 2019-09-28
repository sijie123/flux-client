#! /bin/bash

sudo cd /flux/
server=`cat server.txt`

zip -r0 'download.zip' $TR_TORRENT_DIR
echo "$TR_TORRENT_NAME" > /flux/debug.txt

node uploader.js '/flux/download.zip' "$server"
