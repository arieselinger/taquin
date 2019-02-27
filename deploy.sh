#!/bin/bash

git pull

sudo rm -r /var/www/html/taquin.sobox.fr/*;

sudo mv dist/box-angular/* /var/www/html/sobox.fr