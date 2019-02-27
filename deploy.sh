#!/bin/bash

git pull
sudo rm -r /var/www/html/taquin.sobox.fr/*
sudo mv files/* /var/www/html/taquin.sobox.fr