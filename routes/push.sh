WEB_PATH=$1

echo "Start push $WEB_PATH"
cd $WEB_PATH
git add .
git commit -m 'chore: upload'
git pull
git push
echo "push end"