#!/bin/bash
source .env

ssh -p $DEPLOY_PORT $DEPLOY_URL "
  cd $DEPLOY_FOLDER &&
  sudo -S git reset --hard origin/master &&
  sudo -S git pull &&
  sudo -S npm ci &&
  sudo -S npm run build
"
