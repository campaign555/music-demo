(function($,root){
    function Control(len){
        this.index = 0;
        this.len = len;
    }
    Control.prototype = {
        prev:function(){
            return this.getIndex(-1);
        },
        next:function(){
            return this.getIndex(1);
        },
        getIndex:function(num){ //计算改变后的索引
            return this.index = (this.index + num + this.len) % this.len;
        }
    }
    root.ControlIndex = Control;
})(window.Zepto,window.player || (window.palyer = {}))