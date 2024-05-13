// **************************** common ***************************************
function deleteItem(obj, el) {
    $(obj).closest(el).remove();
}

var layer;
layui.use(['layer'], function () {
    layer = layui.layer;
});

// showToast
function showToast(msg, type, url) {
    if (!arguments[1]) type = 1;
    if (!arguments[2]) type = "";
    if (type == 1) { // 提示不跳转
        layer.msg(msg);
    } else if (type == 2) { // 提示跳转链接
        layer.msg(msg, {
            time: 2000,
            end: function () {
                location.href = url;
            }
        });
    } else if (type == 3) { // 提示刷新页面
        layer.msg(msg, {
            time: 2000,
            end: function () {
                location.reload();
            }
        });
    } else {
        layer.msg(msg);
    }

}


/**
 * 播放视频弹窗
 * @param url 弹窗链接
 * @param src 视频地址
 */
function playVideoDialog(src) {
    var html_ = `<div class="wrap-box wrap-video-dialog">
                    <div class="video-box">
                         <iframe width="100%" height="690px" src="${src}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

                    </div>
                </div>`;
    layer.open({
        title: "",
        type: 1,
        shadeClose: false,
        shade: 0.5,
        skin: 'layer-play-video-dialog',
        content: html_,
    });
}

// 查看图片
function lookPicDialog(imgUrl){
    var imgUrl = imgUrl
    var html = `<div class='look-pic-dialog'>
                     <div class='box'>
                         <img src='${imgUrl}'/>
                     </div>
                 </div>`;
    	getImageWidth(imgUrl,function(w,h){
    	    layui.use('layer', function(){
    	        var layer = layui.layer;
    	        layer.open({
    	            type: 1,
    	            title:false,
    				skin: 'layer-look-pic-dialog',
    	            offset: 'auto',
    	            area: [w+'px',h+'px'],
    	            shadeClose:true,
    	            content: html
    	        });
    	    });
    	});
}
// 获取图片真实高度
function getImageWidth(url,callback) {
    var img = new Image();
    img.src = url;
    // 如果图片被缓存，则直接返回缓存数据
    if (img.complete) {
        callback(img.width, img.height);
    } else {
        img.onload = function () {
            callback(img.width, img.height);
        }
    }
}




