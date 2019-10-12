#! /bin/bash

cd /flux/flux-client
server=`cat server.txt`

zip -r0 '/flux/download.zip' $TR_TORRENT_DIR
echo "$TR_TORRENT_DIR" > /flux/debug.txt
echo "$TR_TORRENT_NAME" >> /flux/debug.txt
echo "$server" >> /flux/debug.txt
node uploader.js '/flux/download.zip' "$server" "$TR_TORRENT_HASH"
