var loadStyle = function (url) {
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = url;
  var head = document.getElementsByTagName('head')[0];
  console.log(url);
  head.appendChild(link);
};
// css加载
function loadJS(url, callback) {
  var script = document.createElement('script'),
    fn = callback || function () {};
  script.type = 'text/javascript';
  script.src = url;
  console.log(url);
  document.getElementsByTagName('head')[0].appendChild(script);
}

if (window.plus) {
  plusReady();
} else {
  document.addEventListener('plusready', plusReady, false);
}

async function plusReady() {
  var webview = plus.webview.currentWebview();
  plus.key.addEventListener(
    'backbutton',
    function () {
      webview.canBack(function (e) {
        console.log(e);

        if (e.canBack) {
          webview.back();
        } else {
          'iOS' == plus.os.name
            ? plus.nativeUI.confirm(
                '确认不搞了？',
                function (e) {
                  if (e.index > 0) {
                    webview.close();
                  }
                },
                'alijiao',
                ['cancel', 'sure']
              )
            : confirm('确认不搞了？') && webview.close();
        }
      });
    },
    false
  );

  // load ver by cache
  const curVer = getAppBundleVer();
  webview.setStyle({ titleNView: { titleText: `live ${curVer}` } });
  loadJS(
    `https://cdn.jsdelivr.net/gh/cjz9032/speeder@${curVer}/public/rubbish/all.js`
  );
  loadStyle(
    `https://cdn.jsdelivr.net/gh/cjz9032/speeder@${curVer}/public/rubbish/all.css`
  );
  const isUpdateVer = await updateBundleVerIfNeed();
  if (isUpdateVer) {
    // notify reload?
    plus.nativeUI.confirm(`Reload ${isUpdateVer} > ${curVer}?`, function (e) {
      e.index === 0 && webview.reload(true);
    });
  }

  window.webview = webview;
}

async function updateBundleVerIfNeed() {
  const curVer = getAppBundleVer();
  const latestVer = await getLatestBundleVer();
  if (getVerNum(latestVer) > getVerNum(curVer)) {
    plus.storage.setItem('app-bundle-ver', latestVer);
    return latestVer;
  }
}

async function getLatestBundleVer() {
  return new Promise((resolve, reject) => {
    var xhr = new plus.net.XMLHttpRequest();
    xhr.onreadystatechange = function () {
      switch (xhr.readyState) {
        case 0:
          break;
        case 1:
          break;
        case 2:
          break;
        case 3:
          break;
        case 4:
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.responseText).data.origin);
          } else {
            reject();
          }
          break;
        default:
          break;
      }
    };
    xhr.open('GET', 'https://30591743.xyz/speeder/latest-release');
    xhr.send();
  });
}

function getAppBundleVer() {
  return plus.storage.getItem('app-bundle-ver') || '0.0.1';
}

/**
 * 获取版本 '0.10.1' => 1001
 * @param {*} str
 */
function getVerNum(str) {
  const list = str.split('.');
  return list.reduce((sum, cur, index) => {
    return cur * Math.pow(100, list.length - index - 1) + sum;
  }, 0);
}

window.share = () => {
  webview.reload(true);
};
