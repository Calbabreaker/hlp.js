BASE_DIR=`dirname "$0"`
cd "$BASE_DIR/../"

TMP_FILE=`mktemp`

touch $TMP_FILE
find src/ -type f > $TMP_FILE
awk '{print "<script src=\"/" $0 "\"></script>" }' $TMP_FILE
rm $TMP_FILE