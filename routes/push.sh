WEB_PATH=$1
TMP_PATH=$2
NEXT_VER=$3
BASE=$4

c=$1"/public/rubbish/"
t=$2"/."
cp -rf $t $c

echo "Start push $WEB_PATH"
cd $WEB_PATH
git add . -A
git commit -m 'chore: upload'
git pull && git push && curl -X POST -H  "Authorization: token $BASE" -H "Accept: application/vnd.github.v3+json" https://api.github.com/repos/cjz9032/speeder/releases -d "{\"tag_name\":\"$NEXT_VER\"}"
echo "push end"
