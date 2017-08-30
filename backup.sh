#!/bin/bash

function backup {
	JEKYLL_DIR='/root/sites/jekyll/johnblog/_post/'
	TARGET=`/root/backup/blogs/`	
	
	# test
	#TARGET='./backups/'
	#JEKYLL_DIR='./posts/'

	cp -r ${JEKYLL_DIR} ${TARGET}

	echo 'Backup task has been succefully execute...'
}

backup