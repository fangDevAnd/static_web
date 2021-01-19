/**
 * flexible
 */
!function (window) {

    /* 设计图文档宽度 */
    var docWidth = 750;

    var doc = window.document,
        docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';

    var recalc = (function refreshRem () {
        var clientWidth = docEl.getBoundingClientRect().width;

        /* 8.55：小于320px不再缩小，11.2：大于420px不再放大 */
        docEl.style.fontSize = Math.max(Math.min(20 * (clientWidth / docWidth), 11.2), 8.55) * 5 + 'px';

        return refreshRem;
    })();

    /* 添加倍屏标识，安卓倍屏为1 */
    docEl.setAttribute('data-dpr', window.navigator.appVersion.match(/iphone/gi) ? window.devicePixelRatio : 1);

    if (/iP(hone|od|ad)/.test(window.navigator.userAgent)) {
        /* 添加IOS标识 */
        doc.documentElement.classList.add('ios');
        /* IOS8以上给html添加hairline样式，以便特殊处理 */
        if (parseInt(window.navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)[1], 10) >= 8)
            doc.documentElement.classList.add('hairline');
    }

    if (!doc.addEventListener) return;
    window.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);

}(window);


// ;(function (win, lib) {
//     var doc = win.document;
//     var docEl = doc.documentElement;
//     var metaEl = doc.querySelector('meta[name="viewport"]');
//     var flexibleEl = doc.querySelector('meta[name="flexible"]');
//     var dpr = 0;
//     var scale = 0;
//     var tid;
//     var flexible = lib.flexible || (lib.flexible = {});

//     if (metaEl) {
//         console.warn('将根据已有的meta标签来设置缩放比例');
//         var match = metaEl.getAttribute('content').match(/initial\-scale=([\d\.]+)/);
//         if (match) {
//             scale = parseFloat(match[1]);
//             dpr = parseInt(1 / scale);
//         }
//     } else if (flexibleEl) {
//         var content = flexibleEl.getAttribute('content');
//         if (content) {
//             var initialDpr = content.match(/initial\-dpr=([\d\.]+)/);
//             var maximumDpr = content.match(/maximum\-dpr=([\d\.]+)/);
//             if (initialDpr) {
//                 dpr = parseFloat(initialDpr[1]);
//                 scale = parseFloat((1 / dpr).toFixed(2));
//             }
//             if (maximumDpr) {
//                 dpr = parseFloat(maximumDpr[1]);
//                 scale = parseFloat((1 / dpr).toFixed(2));
//             }
//         }
//     }

//     if (!dpr && !scale) {
//         var isAndroid = win.navigator.appVersion.match(/android/gi);
//         var isIPhone = win.navigator.appVersion.match(/iphone/gi);
//         var devicePixelRatio = win.devicePixelRatio;
//         if (isIPhone) {
//             // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
//             if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
//                 dpr = 3;
//             } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)) {
//                 dpr = 2;
//             } else {
//                 dpr = 1;
//             }
//         } else {
//             // 其他设备下，仍旧使用1倍的方案
//             dpr = 1;
//         }
//         scale = 1 / dpr;
//     }

//     docEl.setAttribute('data-dpr', dpr);
//     if (!metaEl) {
//         metaEl = doc.createElement('meta');
//         metaEl.setAttribute('name', 'viewport');
//         metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale +
//             ', minimum-scale=' + scale + ', user-scalable=no');
//         if (docEl.firstElementChild) {
//             docEl.firstElementChild.appendChild(metaEl);
//         } else {
//             var wrap = doc.createElement('div');
//             wrap.appendChild(metaEl);
//             doc.write(wrap.innerHTML);
//         }
//     }

//     function refreshRem() {
//         var width = docEl.getBoundingClientRect().width;
//         if (width / dpr > 540) {
//             width = 540 * dpr;
//         }
//         var rem = width / 7.5;
//         docEl.style.fontSize = rem + 'px';
//         var realitySize = parseInt(window.getComputedStyle(document.documentElement).fontSize);
//         if (rem !== realitySize) {
//             rem = rem * rem / realitySize;
//             docEl.style.fontSize = rem + 'px';
//         }
//         flexible.rem = win.rem = rem;
//     }

//     win.addEventListener('resize', function () {
//         clearTimeout(tid);
//         tid = setTimeout(refreshRem, 300);
//     }, false);
//     win.addEventListener('pageshow', function (e) {
//         if (e.persisted) {
//             clearTimeout(tid);
//             tid = setTimeout(refreshRem, 300);
//         }
//     }, false);

//     if (doc.readyState === 'complete') {
//         doc.body.style.fontSize = 12 * dpr + 'px';
//     } else {
//         doc.addEventListener('DOMContentLoaded', function (e) {
//             doc.body.style.fontSize = 12 * dpr + 'px';
//         }, false);
//     }


//     refreshRem();

//     flexible.dpr = win.dpr = dpr;
//     flexible.refreshRem = refreshRem;
//     flexible.rem2px = function (d) {
//         var val = parseFloat(d) * this.rem;
//         if (typeof d === 'string' && d.match(/rem$/)) {
//             val += 'px';
//         }
//         return val;
//     }
//     flexible.px2rem = function (d) {
//         var val = parseFloat(d) / this.rem;
//         if (typeof d === 'string' && d.match(/px$/)) {
//             val += 'rem';
//         }
//         return val;
//     }

// })(window, window['lib'] || (window['lib'] = {}));