function open() {
    //ios
    if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {

        var browser = navigator.userAgent.toLowerCase();

        if (browser.match(/micromessenger/i)) {
            //微信内置浏览器
            window.location.href = "jinxiweb20200326://";
            window.setTimeout(function () {
                window.location.href = "https://apps.apple.com/cn/app/%E9%87%91%E7%A6%A7%E8%B4%A2%E5%AF%8C/id1494418124";
            }, 1000)
            return
        } else {
            window.location.href = "jinxiweb20200326://"; //ios app scheme协议，由ios同事提供
            window.setTimeout(function () {
                window.location.href = "https://apps.apple.com/cn/app/%E9%87%91%E7%A6%A7%E8%B4%A2%E5%AF%8C/id1494418124";
            }, 2000)
            return
        }
    }

    if (navigator.userAgent.match(/android/i)) {
        var ua = navigator.userAgent.toLowerCase();
        var u = navigator.userAgent;
        if (ua.match(/QQ/i) == "qq") {
            var box = document.getElementById("mengceng");
            if (box.style.display == "none") {
                box.style.display = "block";
            }
        } else if (/(micromessenger)/i.test(u)) {
            // 引导用户在浏览器中打开
            //alert('请在浏览器中打开');
            var box = document.getElementById("mengceng");
            if (box.style.display == "none") {
                box.style.display = "block";
            }
            return;
        } else {
            //Android
            window.location.href = "launchapp://jinxiapp";//安卓scheme协议，由安卓同事提供
            window.setTimeout(function () {
                window.location.href = "http://www.ssjx88.com/sdjx/jinxicf.apk"
            }, 2000)
            return
        }

    }
}


/**
 *
 * param 将要转为URL参数字符串的对象
 * key URL参数字符串的前缀
 * encode true/false 是否进行URL编码,默认为true
 *
 * return URL参数字符串
 */
function queryParams(data, isPrefix = false) {
    let prefix = isPrefix ? '?' : ''
    let _result = []
    for (let key in data) {
        let value = data[key]
        // 去掉为空的参数
        if (['', undefined, null].includes(value)) {
            continue
        }
        if (value.constructor === Array) {
            value.forEach(_value => {
                _result.push(encodeURIComponent(key) + '[]=' + encodeURIComponent(_value))
            })
        } else {
            _result.push(encodeURIComponent(key) + '=' + encodeURIComponent(value))
        }
    }

    return _result.length ? prefix + _result.join('&') : ''
}


/**
 * native method call
 * @param param
 */
function nativeCall(param, nativeMethodName) {

    param = queryParams(param);

    document.location = "js://" + nativeMethodName + "?" + param;

}


/**
 * android 和 ios的 native 层调用
 *
 * 其中ios的启动接口为 startViewController 传递的数据是 文本的内容
 *
 * @param path
 */
let callNativeStartActivity = function (action) {

    if (isAndroid()) {
        nativeCall({
            action: action
        }, "startActivity");
    } else if (isiOS()) {
        try {
            /**
             * 定义启动方法为 startViewController
             */
            //使用此方法,会报错,因此使用try-catch
            window.webkit.messageHandlers.startViewController.postMessage(action);
        } catch (error) {
            console.log('WKWebView post message');
        }
    }
}


let isiOS = function () {

    var agent = navigator.userAgent.toLowerCase();
    if ((/iphone/gi).test(agent)) {
        return true;
    }
    return false
}

let isAndroid = function () {
    var agent = navigator.userAgent.toLowerCase();
    if ((/android/gi).test(agent)) {
        return true;
    }
    return false;
}


let callNativePhone = function (phone, methodName) {

    console.log(phone)

    if (isAndroid()) {
        nativeCall({
            callPhone: phone
        }, methodName);
    } else if (isiOS()) {
        try {
            /**
             * 定义启动方法为 startViewController
             */
            //使用此方法,会报错,因此使用try-catch
            window.webkit.messageHandlers[methodName].postMessage(phone);
        } catch (error) {
            console.log('WKWebView post message');
        }
    }

}