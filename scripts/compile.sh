BASE_DIR=`dirname "$0"`
HLP_FILE="$BASE_DIR/../lib/hlp.js"
LIB_DIR="$BASE_DIR/../lib/"
SRC_DIR="$BASE_DIR/../src/"
MAIN_FILE="$BASE_DIR/../src/main.js"

# empty lib and create hlp.js
rm -r ../lib/
mkdir ../lib/
echo "/* \n  The hlp.js library by Calbabreaker. \n  Free to use. GPL-3.0 \n*/\n" > $HLP_FILE

# get main file first
cat $MAIN_FILE >> $HLP_FILE

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

echo "Compiling done"
