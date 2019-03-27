(function($,root){
    //play pause getAudio
    function AudioManager(){
        this.audio = new Audio(); // 创建一个音频对象
        this.status = 'pause'; //audio 默认状态
    }
    AudioManager.prototype = {
        play:function(){
            this.audio.play();
            this.status = 'play';
        },
        pause:function(){
            this.audio.pause();
            this.status = 'pause';
        },
        getAudio:function(src){
            this.audio.src = src;
            this.audio.load();
        },
        playTo:function(t){
            this.audio.currentTime = t;
        }
    }
    root.audioManager = new AudioManager();
})(window.Zepto,window.player || (window.palyer = {}))