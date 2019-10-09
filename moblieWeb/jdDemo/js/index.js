/**
 实现banner的滚动的实现
 */
window.onload = function () {

    /**
     * 1.顶部搜索
     */
    search()
    /**
     *
     * 2.轮播效果的实现
     */
    banner()

    /**
     * 3.倒计时
     */
    downTime()

};


var search = function () {
    /**
     * 1默认固定顶部,透明的背景
     * 2.当页面发生滚动的时候,随着页面滚动的高度变大,透明度变大
     * 3.当页面滚动超过某一个高度的啥时候,透明度保持不变
     */
    var searchBox = document.querySelector(".jd_search_box")
    /**
     * 获得轮播图的高度
     */
    var banner = document.querySelector(".jd_banner")

    /**
     * 控件的高度
     * @type {number}
     */
    var height = banner.offsetHeight

    /**
     * 监听页面滚动事件
     */
    window.onscroll = function () {
        //获得滚动的高度
        // console.log(document.body.scrollTop)
        console.log(document.documentElement.scrollTop)
        var scrollTop = document.body.scrollTop;
        //默认的透明度
        var opacity = 0;

        if (scrollTop < height) {
            /**当页面滚动的时候----随着页面卷曲的高度变大,透明度变大**/
            opacity = scrollTop / height * 0.85;
        } else {
            /**当页面滚动时-----超过某以高度的时候,透明度保持不变**/
            opacity = 0.85;
        }

        searchBox.style.background = 'rgba(201,21,35,' + opacity + ')'
    }


}

var banner = function () {

    /**
     * touch是移动端的触摸事件,而且是一组事件
     * 2.touchstart  --->当手指触摸屏幕的时候开始触发
     * 3.touchmove   --->当手指在屏幕中来回的滑动的时候触发
     * 4.touchend    ---->当手指离开屏幕的时候触发
     * 5.touchcancel ---->当事件被打断,或被迫中止滑动的时候触发(来电话)
     * 5.利用touch相关的事件实现移动端常见的滑动效果和移动端常见的手势事件
     */


    /**
     * 1.使用Touch
     *      1.绑定事件 box.addEventListner("touchstart",function(e){})  推荐的绑定方式
     *      2.事件对象的常见属性:TouchList(触摸点的集合[一个手指就是一个触摸点])
     *                      :changedTouche(改变后的触摸点集合)
     *                      :targetTouches(当前元素的触发点的集合)
     *                      :touches(页面上所有触发点击的集合)
     *      3.触摸点集合在每个事件触发的时候会不会去记录触摸点
     *      changedTouches 每个事件都会记录
     *      targetTouches和touches在离开屏幕的时候无法记录触摸点
     *      4.分析滑动原理
     *       4.1让触摸的元素随着手指的滑动做位置的改变,需要当前手指的坐标
     *       4.2.在每一个触摸点中会记录 其中位置有clientX,clientY--->基于浏览器窗口的(视口)
     *                                      pageX,pageY  ---->基于页面的
     *                                      screenX,screenY--->基于屏幕
     */


    /**
     * 1.自动轮播,切要无缝  定时器,过渡
     * 2.点要随着图片的轮播而改变,根据索引变化
     * 3.滑动效果  利用touch事件完成
     * 4.滑动结束的时候,如果滑动的距离不超过屏幕的1/3,吸附回去
     * 5.滑动结束的时候,如果滑动的距离超过屏幕的1/3,切换 根据滑动的方向,过渡实现滑动效果
     */


    /**
     * 轮播图
     */
    var banner = document.querySelector(".jd_banner")
    /**
     *屏幕宽度
     */
    var width = banner.offsetWidth
    /**
     * 图片容器
     */
    var imageBox = banner.querySelector("ul:first-child")
    /**
     * 点容器
     */
    var pointBox = banner.querySelector("ul:last-child")

    /**
     * 找到所有的点
     */

    var points = pointBox.querySelector("li")

    /**
     * 增加过渡动画的效果
     */
    var addTransition = function () {
        imageBox.style.transaction = "all 0.2s"
        imageBox.style.webkitTransaction = "all 0.2s"
    }

    var removeTransition = function () {
        imageBox.style.transaction = "none"
        imageBox.style.webkitTransaction = "none"
    }

    var setTranslateX = function (translateX) {
        imageBox.style.transform = 'translateX(' + translateX + 'px)'
        imageBox.style.webkitTransform = 'translateX(' + translateX + 'px)'

    }


    /**
     * 程序的核心
     */
    var index = 1;
    var time = setInterval(function () {
        index++
        /**
         * 加过渡动画
         */
        addTransition()
        /**
         * 作位移
         */
        setTranslateX(-index * width)

    }, 1000)

    /**
     * 需要等最后一张动画结束去判断  是否瞬间定位到第一张
     * 绑定过渡动画结束后监听
     */
    imageBox.addEventListener("transitionend", function () {
        /***
         * 自动滚动的
         */
        if (index >= 9) {
            index = 1;
            /**
             * 根据索引瞬间定位
             */
            /**
             * 清过度
             */
            removeTransition()

            /**
             * 作位移
             */
            setTranslateX(-index * width)
        }
        /**
         * 滑动的时候也需要无缝
         */
        else if (index <= 0) {
            index = 8
            /**
             * 根据索引瞬间定位
             */
            /**
             * 清过度
             */
            removeTransition()
            /**
             * 作位移
             */
            setTranslateX(-index * width)
        }

        /**
         * 根据索引设置点
         */
        /**
         * 此时此刻index的取值范围 1-8
         * 点的索引就是index-1
         */
        setPoint()
    })


    /**
     * 设置点的方法
     */
    var setPoint = function () {
        /**
         * index 1--8
         */
        /**
         * 清除样式
         */
        for (var i = 0; i < points.length; i++) {
            var obj = points[i]
            obj.classList.remove("now")
        }
        /**
         * 添加样式
         */
        points[index - 1].classList.add("now")
    }


    /**
     * 绑定事件
     */
    var startX = 0;
    var distanceX = 0;
    var isMove = false
    imageBox.addEventListener("touchstart", function (e) {
        /**
         * 记录起始位置的x坐标
         */
        startX = e.touches[0].clientX
        /**
         * 清除定时器
         */
        clearInterval(timer)

    })

    imageBox.addEventListener("touchmove", function (e) {
        /**
         * 记录滑动过程当中的x坐标
         */
        var moveX = e.touches[0].clientX;
        /**
         * 计算位移,存在正负方向
         */
        distanceX = moveX - startX
        /**
         * 计算目标元素的位移,不用管正负
         */
        /**
         * 元素将要的定位=当前的定位+distanceX
         */
        var translateX = -index * width + distanceX;
        /**
         * 滑动-->
         * 元素移动之前清除过渡效果
         */
        removeTransition()
        setTranslateX(translateX)
        isMove = true

    })

    imageBox.addEventListener("touchend", function (e) {
        /**
         * 4.5.实现
         */
        /**
         * 要使用移动的距离
         */
        if (isMove) {
            if (Math.abs(distanceX) < width / 3) {

                /**
                 * 吸附回去
                 */
                addTransition()
                /**
                 * 这里可能会对起比较迷糊,想了一下,因为是对ul进行的绝对坐标的移动,-index*width
                 * 就是恢复前的绝对位置的索引,如果使用settranslateX(-distanceX)那么只是相对移动
                 */
                // setTranslateX(-distanceX)
                setTranslateX(-index * width)
            } else {
                /**
                 * 切换
                 */
                /**
                 * 右滑动上一张
                 */
                if (distanceX > 0) {
                    index--;
                }
                /**
                 * 左滑动下一张
                 */
                else {
                    index++
                }
                /**
                 * 根据index做动画的移动
                 */
                addTransition()
                setTranslateX(-index * width)
            }

            /**
             * 最好做一次参数的重置
             */
            startX = 0
            distanceX = 0
            isMove = false
            /**
             * 加上定时器
             */
            clearInterval(timer)
            timer = setInterval(function () {
                index++
                /**
                 * 加过渡动画
                 */
                addTransition()
                /**
                 * 作位移
                 */
                setTranslateX(-index * width)

            }, 1000)
        }
    })
}

/**
 * 倒计时
 */
var downTime = function () {
    /**
     * 倒计时的时间2小时
     */
    var time = 2 * 60 * 60
    /**
     * 时间盒子
     */
    var spans = document.querySelector(".sk_time").querySelector("span")


    /**
     * 每一秒去更新显示的时间
     */
    var timer = setInterval(function () {
        time--
        /**
         * 格式还是秒,需要转换
         */
        var h = Math.floor(time / 3600)
        var m = Math.floor(time % 3600 / 60)
        var s = time % 60

        spans[0].innerText = Math.floor(h / 10)
        spans[1].innerText = h % 10
        spans[3].innerText = Math.floor(m / 10)
        spans[4].innerText = m % 10
        spans[6].innerText = Math.floor(s / 10)
        spans[7].innerText = s % 10

        if (time <= 0) {
            clearInterval(timer)
        }
    }, 1000)


}

