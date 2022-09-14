#!/bin/bash

ssh -p 49155 footzi@ovz1.j676141.m6zkp.vps.myjino.ru "
  cd /var/www/our-budget_frontend/ &&
  sudo -S git reset --hard origin/master &&
  sudo -S git pull &&
  sudo -S yarn &&
  sudo -S yarn build
"
