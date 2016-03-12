#!/bin/bash

DIR=/Users/jsoverson/development/src/jarrodoverson.com

BLOGDIR=$DIR/blog

WORDPRESS_BACKUP=~/Dropbox/simply-static-1-1456700757-admin.zip
# ssh jarrodov@jarrodoverson.com // tar -czvf static.tar.gz public_html/static/
STATIC_BACKUP=~/Dropbox/static.tar.gz

rm -rf $BLOGDIR
mkdir $BLOGDIR

#cp $WORDPRESS_BACKUP $BLOGDIR

cd $BLOGDIR

unzip $WORDPRESS_BACKUP

rm -rf */feed/

FILELIST="index.html */index.html page/*/index.html"
INJECT="$DIR/static-notice.txt"

ls -l $INJECT

sed -i .bak 's/http:\/\/jarrodoverson.com//g' $FILELIST
sed -i .bak 's/http:\/\/www.jarrodoverson.com//g' $FILELIST
sed -i .bak 's/Proudly powered by WordPress/Proudly exported from and no longer reliant on WordPress/g' $FILELIST
sed -i .bak "/<div id=\"content\" class=\"site-content\">/ r $INJECT" $FILELIST

cd $DIR

STATIC_DIR=$DIR/static

rm -rf $STATIC_DIR

tar -xzvf $STATIC_BACKUP

mv $DIR/public_html/static $STATIC_DIR
rm -rf $DIR/public_html
