var dataList,len,control,timer,root=window.player,audio=root.audioManager;function getData(o){$.ajax({type:"GET",url:o,success:function(o){len=o.length,control=new root.ControlIndex(len),dataList=o,root.render(o[0]),root.pro.renderAllTime(o[0].duration),audio.getAudio(o[0].audio),renderSongList(),bindEvent(),bindTuch(),$("body").trigger("play:change",0)},error:function(){void 0}})}function bindEvent(){$("body").on("play:change",function(o,t){root.pro.renderAllTime(dataList[t].duration),root.render(dataList[t]),audio.getAudio(dataList[t].audio),"play"==audio.status&&(audio.play(),rotated(0),root.pro.start())}),$(".prev").on("click",function(){var o=control.prev();$("body").trigger("play:change",o)}),$(".next").on("click",function(){var o=control.next();$("body").trigger("play:change",o)}),$(".play").on("click",function(){"pause"==audio.status?(audio.play(),rotated($(".img-box").attr("data-deg")),root.pro.start()):(audio.pause(),root.pro.stop(),cancelAnimationFrame(timer));$(".play").toggleClass("playing")}),$(".like").on("click",function(){$(this).toggleClass("liking")}),$(".list").on("click",function(){$(".song-list").css({top:"auto",bottom:"0",display:"block"})}),$(".song-list .close").on("click",function(){$(this).parent().css({top:"100%",display:"none"})}),$("ul.song-tt").on("click","li",function(){var o=$(this).index();$("body").trigger("play:change",o),audio.play(),rotated(0),root.pro.start(),audio.status="play",$(".play").addClass("playing"),$(".song-list .close").trigger("click")})}function bindTuch(){var o=$(".spot"),t=$(".pro-bottom").offset(),n=t.left,i=t.width;o.on("touchstart",function(){root.pro.stop()}).on("touchmove",function(o){var t=(o.changedTouches[0].clientX-n)/i;0<=t&&t<=1&&root.pro.updata(t)}).on("touchend",function(o){var t=(o.changedTouches[0].clientX-n)/i;if(0<=t&&t<=1){root.pro.start(t);var a=t*dataList[control.index].duration;audio.playTo(a),audio.play(),audio.status="play",$(".play").addClass("playing")}})}function rotated(o){cancelAnimationFrame(timer);var t=null==o?0:o;t=360<=(t=+t)?t-360:t,timer=requestAnimationFrame(function(){t+=.1,$(".img-box").css({transform:"rotateZ("+t+"deg)"}).attr("data-deg",t),rotated(t)})}function renderSongList(){var o="";for(i=0;i<len;i++)o+="<li>"+(i+1)+". "+dataList[i].song+" - "+dataList[i].singer+"</li>";$("ul.song-tt").html(o)}getData("../mock/data.json");