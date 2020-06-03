BASE_DIR=`dirname "$0"`
HLP_FILE="$BASE_DIR/../lib/hlp.js"
MINIFIED_FILE="$BASE_DIR/../lib/hlp.min.js"

# empty and create hlp.min.js
echo "/* \n  The hlp.js library by Calbabreaker. \n  Free to use. GPL-3.0 \n*/\n" > $MINIFIED_FILE

# send contents of HLP_FILE to javascript-minifier api
output=`cat $HLP_FILE`
curl -X POST -s --data-urlencode "input=$output" https://javascript-minifier.com/raw >> $MINIFIED_FILE

echo "Done minifying"
