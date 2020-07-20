// init
document.write(`
<!DOCTYPE html>
<html style="height: 100vh;">
<head>
  <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
  <meta content="width=device-width,initial-scale=1,user-scalable=no" name="viewport">
  <meta name="apple-mobile-web-app-capable" content="yes"> 
  <meta name="apple-touch-fullscreen" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="blank-translucent" />
  <meta name="format-detection" content="telephone=no,address=no">
  <meta name="apple-mobile-web-app-status-bar-style" content="white">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" >
  
  <link rel="shortcut icon" href="https://www.baidu.com/favicon.ico">
  <title>ooo</title>
  <script>
    !function(x){function w(){var v,u,t,tes,s=x.document,r=s.documentElement,a=r.getBoundingClientRect().width;if(!v&&!u){var n=!!x.navigator.appVersion.match(/AppleWebKit.*Mobile.*/);v=x.devicePixelRatio;tes=x.devicePixelRatio;v=n?v:1,u=1/v}if(a>=640){r.style.fontSize="40px"}else{if(a<=320){r.style.fontSize="20px"}else{r.style.fontSize=a/320*20+"px"}}}x.addEventListener("resize",function(){w()});w()}(window);
  </script>
  <style>
  body{
    /* -webkit-overflow-scrolling: touch; */
  }
  </style>
  <body >
  <div class="xxx1" style="width:100%;background:#FEFEFE;z-index:20;"></div>
  <div class="app" id="app" style="width:100%;"></div>
  <div class="xxx2" style="width:100%;background:#FEFEFE;z-index:20;"></div>
  </body>
</html>
`);

history.replaceState(null, null, '/');

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
  // webview.appendJsFile('_www/assets/dist/all.js');
}
