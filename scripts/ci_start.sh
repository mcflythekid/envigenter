#!/usr/bin/env bash
#v2.0.0

### Requires 1 args
if [ "$#" -ne 1 ]; then
  echo "Usage: ci_start <Config file path> [NPM start command]"
  exit 1
fi
FILE=$1
NPM_START_COMMAND=$2
C_ENV=default

### Check config file
if [ ! -f $FILE ]; then
  echo "File does not exists: $FILE"
  exit 1
fi

### Copy config file
echo "Using file: $FILE"
cp -f $FILE ./env/$C_ENV.env.yml

### Start
npm ci
if [ ! -f $NPM_START_COMMAND ]; then
  npm run start
else
  npm run $NPM_START_COMMAND
fi

# Make directory writable by group
chmod -R g+w .
