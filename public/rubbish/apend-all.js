
var loadStyle = function(url) {
    var link = document.createElement('link');
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = url;
    var head = document.getElementsByTagName("head")[0];
    head.appendChild(link);
  };
  // css加载
  function loadJS( url, callback ){
  var script = document.createElement('script'),
      fn = callback || function(){};
  script.type = 'text/javascript';
  script.src = url;
  document.getElementsByTagName('head')[0].appendChild(script);
}


 window.stop();

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
          webview.close();
        }
      });
    },
    false
  );

  // append lib + js(bee) + css in outer
  window.webpackJsonp = [];
  window.www = webview
		webview.setCssFile('_www/assets/dist/all.css');
      webview.appendJsFile('_www/assets/dist/all.js');
      setTimeout(()=>{
        loadStyle('https://goodmujian.xyz/vjs.css')
      }, 100)
}
