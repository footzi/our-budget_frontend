#!/bin/bash

ssh -p 49155 footzi@ovz1.j676141.m6zkp.vps.myjino.ru "
  cd /var/www/our-budget_frontend/ &&
  sudo git pull &&
  sudo yarn &&
  sudo yarn build
"