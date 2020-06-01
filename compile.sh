#!/bin/bash 
BASE_DIR=$(dirname "$0")
HLP_FILE="$BASE_DIR/../lib/hlp.js"
MAIN_FILE="$BASE_DIR/../src/main.js"
LIB_DIR="$BASE_DIR/../lib/"
SRC_DIR="$BASE_DIR/../src/"

# empty lib and create hlp.js
rm -r $LIB_DIR
mkdir $LIB_DIR
echo "/* \n  The hlp.js library by Calbabreaker. \n  Free to use. \n*/\n" > $HLP_FILE

# make the main.js first
cat $MAIN_FILE >> $HLP_FILE
echo "\n" >> $HLP_FILE

# get all files
files=`find $SRC_DIR -type f`

# get all contents of files
echo "$files" |
while IFS= read -r line; do
  if [ "$line" != $MAIN_FILE ]; then
    output=`cat $line`
    echo "\n/* $line from hlp.js */\n\n$output" >> $HLP_FILE
  fi
done

echo "Compiling Done"
