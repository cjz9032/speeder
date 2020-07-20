WEB_PATH=$1

echo "Start push $WEB_PATH"
cd $WEB_PATH
git pull
echo "pull end"