function openApp() {

    /* //判断是微信、QQ内置浏览器打开页面
     var ua = navigator.userAgent.toLowerCase();
     if(ua.match(/MicroMessenger/i)=="micromessenger") {
         //return "weixin";
         var box=document.getElementById("meng_ceng");
         if(box.style.display=="none"){
             box.style.display="block";
         }

     } else if (ua.match(/QQ/i) == "qq") {
         //return "QQ";
         var box=document.getElementById("meng_ceng");
         if(box.style.display=="none"){
             box.style.display="block";
         }

     }
 */
    //判断浏览器
    /*var u = navigator.userAgent;
    if(/(micromessenger)/i.test(u)){
        // 引导用户在浏览器中打开
        //alert('请在浏览器中打开');
        var box=document.getElementById("meng_ceng");
        if(box.style.display=="none"){
            box.style.display="block";
        }
        return;
    }*/
    //ios
    /*if(navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {

        var browser = navigator.userAgent.toLowerCase();

        if(browser.match(/micromessenger/i)) {
            //微信内置浏览器
            window.location.href ="jinxiweb20200326://";
            window.setTimeout(function() {
                window.location.href = "https://apps.apple.com/cn/app/%E9%87%91%E7%A6%A7%E8%B4%A2%E5%AF%8C/id1494418124";
            }, 1000)
            return
        } else {
            window.location.href ="jinxiweb20200326://"; //ios app scheme协议，由ios同事提供
            window.setTimeout(function() {
                window.location.href = "https://apps.apple.com/cn/app/%E9%87%91%E7%A6%A7%E8%B4%A2%E5%AF%8C/id1494418124";
            }, 2000)
            return
        }
    }

    if(navigator.userAgent.match(/android/i)) {
        var ua = navigator.userAgent.toLowerCase();
        var u = navigator.userAgent;
        if(ua.match(/QQ/i) == "qq"){
            var box=document.getElementById("meng_ceng");
            if(box.style.display=="none"){
                box.style.display="block";
            }
        }else if(/(micromessenger)/i.test(u)){
            // 引导用户在浏览器中打开
            //alert('请在浏览器中打开');
            var box=document.getElementById("meng_ceng");
            if(box.style.display=="none"){
                box.style.display="block";
            }
            return;
        } else {
            //Android
            window.location.href = "launchapp://jinxiapp";//安卓scheme协议，由安卓同事提供
            window.setTimeout(function() {
                window.location.href = "http://www.ssjx88.com/sdjx/jinxicf.apk"
            }, 2000)
            return
        }

    }*/
}

