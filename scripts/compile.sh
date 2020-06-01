# empty lib and create hlp.js
rm -r ../lib/
mkdir ../lib/
echo "/* \n  The hlp.js library by Calbabreaker. Free to use. \n*/\n" > ../lib/hlp.js

# get all files
files=`find ../src/ -type f`

# get all contents of files
echo "$files" |
while IFS= read -r line; do
  output=`cat $line`
  echo "\n/* $line from hlp.js */\n\n$output" >> ../lib/hlp.js 
done
