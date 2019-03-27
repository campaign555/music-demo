(function ($, root) {
    var frameId, startTime, duration, lastPer = 0;
    function renderAllTime(time) {
        cancelAnimationFrame(frameId);
        lastPer = 0;
        duration = time;
        $('.all-time').html(formatTime(time));
        updata(0);
    }

    function formatTime(t) {
        var m = ('0' + Math.floor(t / 60)).slice(-2);
        var s = ('0' + t % 60).slice(-2);
        return m + ":" + s;
    }

    function start(p) {
        cancelAnimationFrame(frameId);
        startTime = new Date().getTime();
        lastPer = p == undefined ? 0 : p;
        frame();
        function frame() {
            var curTime = new Date().getTime();
            var per = lastPer + (curTime - startTime) / (duration * 1000);
            if (per <= 1) {
                updata(per);
            } else {
                cancelAnimationFrame(frameId);
            }
            frameId = requestAnimationFrame(frame)
        }
    }
    function stop() {
        cancelAnimationFrame(frameId);
        var stopTime = new Date().getTime();
        lastPer += (stopTime - startTime) / (duration * 1000);
    }

    function updata(p) {
        var t = Math.round(duration * p);
        var pro = (p - 1) * 100;
        $('.cur-time').html(formatTime(t));
        $('.pro-top').css('transform', 'translateX(' + pro + '%)');
    }

    root.pro = {
        renderAllTime: renderAllTime,
        start: start,
        stop: stop,
        updata:updata
    }
})(window.Zepto, window.player || (window.player = {}))