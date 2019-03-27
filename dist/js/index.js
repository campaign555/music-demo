var root = window.player;
var audio = root.audioManager;
var dataList, len, control, timer;

function getData(url) {
    $.ajax({
        type: 'GET',
        url: url,
        success: function (data) {
            len = data.length;
            control = new root.ControlIndex(len);
            dataList = data;
            root.render(data[0]);
            root.pro.renderAllTime(data[0].duration);
            audio.getAudio(data[0].audio);
            renderSongList()
            bindEvent();
            bindTuch();
            $('body').trigger('play:change', 0);
        },
        error: function () {
            console.log('error');
        }
    })
}

function bindEvent() {
    $('body').on('play:change', function (e, index) {
        root.pro.renderAllTime(dataList[index].duration);
        root.render(dataList[index]);
        audio.getAudio(dataList[index].audio);
        if (audio.status == 'play') {
            audio.play();
            rotated(0);
            root.pro.start();
        }
    })
    $('.prev').on('click', function () {
        var i = control.prev();
        $('body').trigger('play:change', i);
    });
    $('.next').on('click', function () {
        var i = control.next();
        $('body').trigger('play:change', i);
    });
    $('.play').on('click', function () {
        if (audio.status == 'pause') {
            audio.play();
            var deg = $('.img-box').attr('data-deg');
            rotated(deg);
            root.pro.start();
        } else {
            audio.pause();
            root.pro.stop();
            cancelAnimationFrame(timer);
        }
        $('.play').toggleClass('playing');
    })
    $('.like').on('click', function () {
        $(this).toggleClass('liking');
    })
    $('.list').on('click', function () {
        $('.song-list').css({
            'top': 'auto',
            'bottom': '0',
            'display':'block'
        })
    })
    $('.song-list .close').on('click',function(){
        $(this).parent().css({
            'top': '100%',
            'display':'none'
            // 'bottom': '0'
        })
    })
    $('ul.song-tt').on('click','li',function(){
        var i = $(this).index();
        $('body').trigger('play:change', i);
        audio.play();
        rotated(0);
        root.pro.start();
        audio.status = "play";
        $('.play').addClass('playing');
        $('.song-list .close').trigger('click');

    })
}

function bindTuch() {
    var spot = $('.spot');
    var bottom = $('.pro-bottom').offset()
    var l = bottom.left;
    var w = bottom.width;
    spot.on('touchstart', function () {
        root.pro.stop();
    }).on('touchmove', function (e) {
        var x = e.changedTouches[0].clientX;
        var per = (x - l) / w
        if (per >= 0 && per <= 1) {
            root.pro.updata(per);
        }
    }).on('touchend', function (e) {
        var x = e.changedTouches[0].clientX;
        var per = (x - l) / w
        if (per >= 0 && per <= 1) {
            root.pro.start(per);
            var time = per * dataList[control.index].duration;
            audio.playTo(time);
            audio.play();
            audio.status = "play";
            $('.play').addClass('playing');
        }

    })
}

function rotated(d) {
    cancelAnimationFrame(timer);
    var deg = d == undefined ? 0 : d;
    deg = + deg;
    deg = deg >= 360 ? (deg - 360) : deg;
    timer = requestAnimationFrame(function () {
        deg += 0.1;
        $('.img-box').css({
            'transform': 'rotateZ(' + deg + 'deg)',
        }).attr('data-deg', deg)
        rotated(deg);
    })
}
function renderSongList(){
    var str = '';
    for(i = 0; i < len; i ++){
        str += '<li>' + (i + 1) + '. ' + dataList[i].song + ' - ' + dataList[i].singer + '</li>'
    }
    $('ul.song-tt').html(str);
}

getData('../mock/data.json');