function refreshImg() {
    var imgUrl = event.target.src;
    // console.log(event.target.src);
    var imgUrl = event.target.src;
    var xmlhttp;
    if (window.XMLHttpRequest) {
        //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
        xmlhttp = new XMLHttpRequest();
    } else {
        // IE6, IE5 浏览器执行代码
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    // 请求成功回调函数
    xmlhttp.onload = e => {
        // console.log('request success');
    };
    // 请求结束
    xmlhttp.onloadend = e => {
        // console.log('request loadend');
    };
    // 请求出错
    xmlhttp.onerror = e => {
        // console.log('request error');
    };
    // 请求超时
    xmlhttp.ontimeout = e => {
        // console.log('request timeout');
    };

    xmlhttp.timeout = 0; // 设置超时时间,0表示永不超时
    // 初始化请求
    // http://rap.qdum.com/mockjsdata/43/submitForm/?id
    xmlhttp.open('POST', 'http://62.234.144.229:8084/jinXiApi/jinxi/user/getCode.action', true);
    // 设置期望的返回数据类型 'arraybuffer'
    xmlhttp.responseType = 'arraybuffer';
    // 设置请求头
    // xmlhttp.setRequestHeader('', '');
    // 发送请求
    xmlhttp.send();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            // console.log(xmlhttp)
            //console.info(xmlhttp.response);
            var bufferUrl = btoa(new Uint8Array(xmlhttp.response).reduce((response, byte) =>
                response + String.fromCharCode(byte), ''));
            //console.log('data:image/png;base64,' + bufferUrl)
//event.target.src = 'data:image/png;base64,' + bufferUrl;
//event.target.src 的指向不对  所以img的src付不上值，更换成imnUrl,imgUrl在函数前面赋值
            imgUrl = 'data:image/png;base64,' + bufferUrl;
            document.getElementById('img').src = imgUrl;
            //console.log(imgUrl)
        }
    }
}
