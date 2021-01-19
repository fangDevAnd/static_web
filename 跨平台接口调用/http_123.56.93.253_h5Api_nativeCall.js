/**
 ios  android  native通信 统一解决方案 封装js
 为了兼容普通的 html 方案实现代码 ,该js库 只提供基本的 函数 ,

 使用方式如下
 1. html 引入 <script src> 方式引入
 2. 如果使用的是vue 项目 ,可以在index.html 里面进行引入 ,使用window对象的形式进行调用

 note: 不要修改当前的类的导出方式 ,避免使用 export 方式导入

 @author fang
 @date 2020-12-04
 @function  实现跨设备的 native 调用方案
 */

/**
 * 获得浏览器的类型
 * @returns {string}  返回浏览器的类型
 *
 */
function getOSAndBrowser() {
    var os = navigator.platform;
    var userAgent = navigator.userAgent;
    console.log(userAgent);
    var info = "";
    var tempArray = "";
    if (os.indexOf("Win") > -1) {
        if (userAgent.indexOf("Windows NT 5.0") > -1) {
            info += "Windows 2000";
        } else if (userAgent.indexOf("Windows NT 5.1") > -1) {
            info += "Windows XP";
        } else if (userAgent.indexOf("Windows NT 5.2") > -1) {
            info += "Windows 2003";
        } else if (userAgent.indexOf("Windows NT 6.0") > -1) {
            info += "Windows Vista";
        } else if (userAgent.indexOf("Windows NT 6.1") > -1 || userAgent.indexOf("Windows 7") > -1) {
            info += "Windows 7";
        } else if (userAgent.indexOf("Windows NT 6.2") > -1 || userAgent.indexOf("Windows NT 6.3") > -1 || userAgent.indexOf("Windows 8") > -1) {
            info += "Windows 8";
        } else if (userAgent.indexOf("Windows NT 6.4") > -1 || userAgent.indexOf("Windows NT 10") > -1) {
            info += "Windows 10";
        } else {
            info += "Other";
        }
    } else if (os.indexOf("Mac") > -1) {
        info += "Mac";
    } else if (os.indexOf("X11") > -1) {
        info += "Unix";
    } else if (os.indexOf("Linux") > -1) {
        info += "Linux";
    } else {
        info += "Other";
    }
    info += "/";
    if (/[Ff]irefox(\/\d+\.\d+)/.test(userAgent)) {
        tempArray = /([Ff]irefox)\/(\d+\.\d+)/.exec(userAgent);
        info += tempArray[1] + tempArray[2];
    } else if (/[Tt]rident(\/\d+\.\d+)/.test(userAgent)) {
        tempArray = /([Tt]rident)\/(\d+\.\d+)/.exec(userAgent);
        if (tempArray[2] === "7.0") {
            tempArray[2] = "11";
        } else if (tempArray[2] === "6.0") {
            tempArray[2] = "10";
        } else if (tempArray[2] === "5.0") {
            tempArray[2] = "9";
        } else if (tempArray[2] === "4.0") {
            tempArray[2] = "8";
        }
        tempArray[1] = "IE";
        info += tempArray[1] + tempArray[2];
    } else if (/[Cc]hrome\/\d+/.test(userAgent)) {
        tempArray = /([Cc]hrome)\/(\d+)/.exec(userAgent);
        info += tempArray[1] + tempArray[2];
    } else if (/[Vv]ersion\/\d+\.\d+\.\d+(\.\d)* *[Ss]afari/.test(userAgent)) {
        tempArray = /[Vv]ersion\/(\d+\.\d+\.\d+)(\.\d)* *([Ss]afari)/.exec(userAgent);
        info += tempArray[3] + tempArray[1];
    } else if (/[Oo]pera.+[Vv]ersion\/\d+\.\d+/.test(userAgent)) {
        tempArray = /([Oo]pera).+[Vv]ersion\/(\d+)\.\d+/.exec(userAgent);
        info += tempArray[1] + tempArray[2];
    } else {
        info += "unknown";
    }
    return info;
};


//手机端判断各个平台浏览器及操作系统平台
function checkPlatform() {
    console.log(navigator.userAgent);
    let platform;
    if (/android/i.test(navigator.userAgent)) {
        platform = 1;
    }
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        platform = 2;//这是iOS平台下浏览器
    }
    if (/Linux/i.test(navigator.userAgent)) {
        platform = 3;//这是Linux平台下浏览器
    }
    if (/Linux/i.test(navigator.platform)) {
        platform = 4;//这是Linux操作系统平台
    }
    if (/MicroMessenger/i.test(navigator.userAgent)) {
        platform = 5;//这是微信平台下浏览器
    }
    return platform;
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
 * android 原生方法的调用接口
 * @param param  参数js对象
 * @param nativeMethodName android原生方法的名称
 */
function nativeForAndroid(param, nativeMethodName) {
    param = queryParams(param);
    document.location = "js://" + nativeMethodName + "?" + param;
}


/**
 * ios 的判断
 * @returns {boolean}
 */
let isiOS = function () {

    let agent = navigator.userAgent.toLowerCase();
    if ((/iphone/gi).test(agent)) {
        return true;
    }
    return false
}

/**
 * android 的判断
 * @returns {boolean}
 */
let isAndroid = function () {
    let agent = navigator.userAgent.toLowerCase();
    if ((/android/gi).test(agent)) {
        return true;
    }
    return false;
}


/**
 * 原生调用方案
 * 通过方法名称获得参数类型
 * @param methodName 方法的名称
 * @param param 原生调用需要传递的参数
 */
function nativeCall(methodName, param) {

    if (isAndroid()) {
        nativeForAndroid(param, methodName);
    } else if (isiOS()) {
        try {
            //使用此方法,会报错,因此使用try-catch
            window.webkit.messageHandlers[methodName].postMessage(param);
        } catch (error) {
            console.log('WKWebView post message');
        }
    }
}


//-------------------------下面封装常用的 交互接口


/**
 * H5---->native 调用方式
 * 参数全部使用原生注入,H5 只负责调起
 * nativeCall(API_START_PAGE,{
 *     packageName:com.fang.ddd
 * });
 *
 */


/**
 * H5---->native
 * 开启一个新的页面
 */
let API_START_PAGE = "startPage";

/**
 *H5---->native
 * 设置状态栏的显示与隐藏
 * @type {string}
 */
let API_TOOLBAR_VISIBILITY = "toolbarVisibility";


/**
 * H5---->native
 * 拨打手机号码
 */
let API_CALL_PHONE = "callPhone";

/**
 * H5---->native
 * 发送一个消息
 */
let API_EVENT_NOTIFY = "sendEvent";

/**
 * H5---->native
 * 发送邮件
 * @type {string}
 */
let API_SEND_MAIL = "sendMail";

/**
 * H5---->native
 * 发送短信
 * @type {string}
 */
let API_SEND_SMS = "sendSms";

/**
 * H5---->native
 * 版本更新
 */
let API_VERSION_UPDATE = "versionUpdate";

/**
 *H5---->native
 * 获得app的版本
 * @type {string}
 */
let API_CUR_VERSION = "curVersion";


//-----------------------native调用js的接口

/**
 * 下面的接口是 native 调用js的代码,
 * 当前的js 不添加业务代码,不添加业务代码,不添加业务代码 ,特别注意
 *
 *
 *  所有的监听器通过 监听进行回调 ,
 *
 *  通过判断监听的返回值 来判断是否 进行重写
 *
 *
 *
 *
 */


/**
 * 获得浏览器的类型
 * @returns {string}
 */
function getBrowserType() {
    if (h5MethodCallListener != null) {
        let backReturn = h5MethodCallListener("getBrowserType");
        if (backReturn != undefined) {
            return backReturn;
        }
    }
    return getOSAndBrowser();
}

/**
 * 需要引入调试的script 脚本库
 *  <script src="http://wechatfe.github.io/vconsole/lib/vconsole.min.js?v=3.2.0"></script>
 * 开启调试
 */
function openDebug() {
    var vConsole = new VConsole();
}


/**
 * 返回上一个页面
 * @param layer 返回的层级
 */
function toBack(layer) {
    history.go(layer);
}

/**
 * 刷新当前的网页,
 *
 */
function flushPage() {
    location.reload();
}

/**
 * 刷新页面的接口数据
 * 如果是vue 项目,对应的就是刷新该路由下的接口
 */
function flushData(data) {

    if (h5MethodCallListener != null) {
        h5MethodCallListener("flushData", data);
    }
}


/**
 * 添加一个对  native调用js的接口   指定方法进行监听
 * @param methodName
 * @param listener
 */
function addH5CallListener(listener) {
    h5MethodCallListener = listener;
}

/**
 * H5 方法调用的监听器
 * @type {null}
 */
let h5MethodCallListener = null;








































