var loadStyle = function (url) {
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = url;
  var head = document.getElementsByTagName('head')[0];
  head.appendChild(link);
};
// css加载
function loadJS(url, callback) {
  var script = document.createElement('script'),
    fn = callback || function () {};
  script.type = 'text/javascript';
  script.src = url;
  document.getElementsByTagName('head')[0].appendChild(script);
}

if (window.plus) {
  plusReady();
} else {
  document.addEventListener('plusready', plusReady, false);
}

function plusReady() {
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
  
  
   
  window.webview = webview;
}
