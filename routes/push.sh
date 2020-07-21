WEB_PATH=$1
TMP_PATH=$2

c=$1"/public/rubbish/"
t=$2"*"
cp -rf $t $c

echo "Start push $WEB_PATH"
cd $WEB_PATH
git add .
git commit -m 'chore: upload'
git pull && git push
echo "push end"