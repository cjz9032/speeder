WEB_PATH=$1
WEB_WWW=$1"/bin/www"
LOCAL=$2
LOCAL_IS='1'
WEB_USER='root'
WEB_USERGROUP='root'

echo "Start deployment $WEB_PATH"
cd $WEB_PATH
echo "pulling source code..."
git reset --hard origin/master
git clean -f
git pull
git checkout master
echo "changing permissions..."
npm install
echo "build end"


if [ "$LOCAL" != "$LOCAL_IS" ]
then
    chown -R $WEB_USER:$WEB_USERGROUP $WEB_PATH
    pm2 restart www
fi


echo "Finished."