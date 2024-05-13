//view image  查看图片
function bigimg(obj) {
    $(".dialog.img-toast.mail").remove()
    let imgSrc = $(obj).attr('src');
    let dialog = '<div class="dialog img-toast mail" style="display: block">' +
        '<div class="content">' +
        '<img src="' + imgSrc + '" >' +
        '</div><span class="closeDialog close" onclick="closeDialog(this)">X</span></div>'
    $("body").append(dialog)
}

function closeDialog(obj) {
    $(".img-toast").find("img").attr("src", "");
    $(".img-toast").hide();
}
$("body").on("click", ".img-toast", function () {
    $(".img-toast").find("img").attr("src", "");
    $(this).hide();
})
//view image  查看图片 end
// 前台发送信息

// type  类型  value值
function initContHtml(type, value,url) {
    let con = ""
    if (type == 1) {
        con = value.content
    }
    if (type == 2 ) {
        con = '<img src="'+value.content+'" alt="" onload="scrollMain()" onclick="bigimg(this)" style="max-width: 100px">'
    }
    if(type == 2 && url != undefined && value.content.indexOf("//") === -1){
        con = '<img src="'+url+value.content+'" onload="scrollMain()" alt="" onclick="bigimg(this)" style="max-width: 100px">'
    }
    if (type == 3) {
        con = '<span class="file-img" onload="scrollMain()"><i class="icon iconfontggg icon-yf-wenjian yfb-iconLeftWenjian"></i></span><span class="file-text">'
                +value.file_name+'<br>'
                +value.file_size+'</span><a class="file-download" target="_blank" href="'+value.content+'"><i class="icon iconfontggg icon-yf-xiazai1 yfb-iconLeftXiaZai"></i></a>';

    }
    return con
}
function scrollMain(){
    var content = document.getElementById('chats');
    content.scrollTop = 100000;
}

var chat_type_show = 1;
var num = 1;
// 页面title切换
var timer = null;
var setTitleNum = 0;
var timerflag = true;
var pagetitle = '';
pagetitle = parent.document.title
var stopClick = true

//Initialize the page---- onmouseup="chats()"
var mo = function (e) {
    e.preventDefault();
};


function setTitle() {
    setTitleNum++
    if (setTitleNum == 3) {
        setTitleNum = 1
    }
    if (setTitleNum == 1) {
        parent.document.title = pagetitle
    } else if (setTitleNum == 2) {
        parent.document.title = chatAlls.new_message;
    }
}
function currentPage() {
    var hiddenProperty = 'hidden' in document ? 'hidden' :
        'webkitHidden' in document ? 'webkitHidden' :
            'mozHidden' in document ? 'mozHidden' :
                null;
    var visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');
    var onVisibilityChange = function () {
        if (!document[hiddenProperty]) {
            clearInterval(timer)
            timerflag = true;
            parent.document.title = pagetitle
        } else {
        }
    }
    document.addEventListener(visibilityChangeEvent, onVisibilityChange);
}
currentPage()

// 打开聊天窗口
function chats() {
    if ($(window).width() > 767) {
        $("#chatBox").animate({
            width:"290px",
            height:"430px"
        },500)
        $("#chatbigBox").css({
            "bottom":"100px",
            "right":"25px"
        })
    }else{
        $("#chatBox").css({"width": "100%", "height": "100%"})
        $("#chatbigBox").css({"width": "100%", "height": "100%"})
    }
    $("#chatBox").addClass("active");
    $("#chat").css({"width": "290px", "height": "430px","left":"auto","top":"auto"}).hide()
    $(".chat .icon").css("font-size","100px")
}

// 关闭聊天窗口
function cloneChat() {
    if ($(window).width() > 767) {
        $("#chatBox").css({
            "top":"auto",
            "left": "auto",
            "bottom": "50px",
            "width":"0",
            "height":"0"
        })
    } else {
        $("#chatbigBox").animate({
            width:"0",
            height:"0"
        },500)
    }
    $("#chat").show()
    $(".chat .icon").animate({"font-size":"24px"},500)
    $("#chat").animate({"width": "50px", "height": "50px"},500)
    $("#chatBox").removeClass("active")

}

// 聊天拖拽移动
$(function () {
    var oDiv = document.getElementById("chat");
    var chatm = document.getElementById("chat");
    var chatBox = document.getElementById("chatBox");
    var chatTop = document.getElementById("chatTop");
    let lefts;
    let rights;
    if ($(window).width() > 767) {
        // $("#chatm").remove()
        oDiv.onmousedown = function (e) {
            var e = e || window.event;
            var diffX = e.clientX - oDiv.offsetLeft;
            var diffY = e.clientY - oDiv.offsetTop;
            lefts = oDiv.offsetLeft
            rights = oDiv.offsetTop
            document.onmousemove = function (e) {
                num = 2
                chat_type_show = 2
                var e = e || window.event;
                oDiv.style.left = e.clientX - diffX + 'px';
                oDiv.style.top = e.clientY - diffY + 'px';
            };
            oDiv.onmouseup = function (e) {
                let leftUp = lefts - oDiv.offsetLeft
                let topUp = lefts - oDiv.offsetTop
                if (Math.abs(leftUp * 1) < 10 || Math.abs(topUp * 1) < 10) {
                    chats()
                }
                document.onmousemove = null;
                document.onmouseup = null;
            }
        }
        chatTop.onmousedown = function (e) {
            var e = e || window.event;
            var diffX = e.clientX - chatBox.offsetLeft;
            var diffY = e.clientY - chatBox.offsetTop;
            document.onmousemove = function (e) {
                var e = e || window.event;
                chatBox.style.left = e.clientX - diffX + 'px';
                chatBox.style.top = e.clientY - diffY + 'px';
            };
            document.onmouseup = function () {
                document.onmousemove = null;
                document.onmouseup = null;

            }
        }
    } else {
        var maxW = document.body.clientWidth - chatm.offsetWidth;
        var maxH = document.body.clientHeight - chatm.offsetHeight;
        chatm.addEventListener('touchstart', function (e) {
            stop();
            var ev = e || window.event;
            var touch = ev.targetTouches[0];
            oL = touch.clientX - chatm.offsetLeft;
            oT = touch.clientY - chatm.offsetTop;
            lefts = chatm.offsetLeft
            rights = chatm.offsetTop
            document.addEventListener("touchmove", defaultEvent, false);
        });
        chatm.addEventListener('touchmove', function (e) {
            var ev = e || window.event;
            var touch = ev.targetTouches[0];
            var oLeft = touch.clientX - oL;
            var oTop = touch.clientY - oT;
            if (oLeft < 0) {
                oLeft = 0;
            } else if (oLeft >= maxW) {
                oLeft = maxW;
            }
            if (oTop < 0) {
                oTop = 0;
            } else if (oTop >= maxH) {
                oTop = maxH;
            }

            chatm.style.left = oLeft + 'px';
            chatm.style.top = oTop + 'px';

        });
        chatm.addEventListener('touchend', function () {
            move();
            let leftUpm = lefts - chatm.offsetLeft
            let topUpm = lefts - chatm.offsetTop
            if (Math.abs(leftUpm * 1) < 10 || Math.abs(topUpm * 1) < 10) {
                chats()
            }
            document.removeEventListener("touchmove", defaultEvent);
        });

        function defaultEvent(e) {
            e.preventDefault();
        }
    }
})

function stop() {
    document.body.style.overflow = 'hidden';
    document.addEventListener("touchmove", mo, {passive: false});//Prohibit page sliding
}

//Don't let sliding by default
/***Cancel swipe restriction***/
function move() {
    document.body.style.overflow = '';//Scroll bar appears
    document.removeEventListener("touchmove", mo, {passive: false});
}

// Initial loading
function getcontentChat(chat, m_chat_user_id) {
    $('#m_chat_user_id').val(m_chat_user_id)
    if (chat[0]) {
        chat.map((value, key, arr) => {
            let date = new Date(value.create_time.replace(/-/g, '/'));
            //Note: The time here is the Chinese time zone. If it is a global project, it needs to be converted to [Coordinated Universal Time] (toUTCString)
            let globalDate = date.toString();
            let chinaDateArray = globalDate.split(' ');
            let displayDate = `${chinaDateArray[0]} ${chinaDateArray[2]}. ${chinaDateArray[1]}, ${chinaDateArray[3]} ${chinaDateArray[4]}`;

            //Time display judgment
            let timeLast = ""
            //time_type is equal to 1 for today, astatus is equal to 33, and the time interval is greater than 5 minutes
            if (value.time_type == 1) {
                if (value.astatus == 33) {
                    timeLast = displayDate.split(" ")[4]
                    timeLast = timeLast.split(":")
                    timeLast = `${timeLast[0]}:${timeLast[1]}`
                }
            } else {
                if (value.astatus == 33) {
                    timeLast = displayDate
                }
            }
            let cont  = initContHtml(value.chat_type,value)
            $("#chats").append(`<p>${timeLast}</p><div class="${value.send_id == m_chat_user_id ? "chatRt" : "chatLt"}">
                        <span class="chatLt-img">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-yf-kefutouxiang_huaban1"></use>
                            </svg>
                        </span>
                    <p>${cont}</p>
                </div>`)
        })
        $("#chats .chatRt .chatLt-img").remove()
        $('#isContentNull').val(2);
    } else {
        $("#chats").append(`<p>${chatAlls.chat_welcome_msg}</p>`)
        $('#isContentNull').val(1);
    }

    setTimeout(function () {
        var content = document.getElementById('chats');
        content.scrollTop = content.scrollHeight + 100;
    }, 500)
}

// 发送消息
function homeChatMessage(chat) {
    if (stopClick == true) {
        stopClick = false;
        let isContentNull = $('#isContentNull').val();
        if (isContentNull == 1) {
            $("#chats").html('');
            $('#isContentNull').val(2);
        }
        let date = new Date(chat.create_time.replace(/-/g, '/'));
        let globalDate = date.toString();
        let chinaDateArray = globalDate.split(' ');
        let displayDate = `${chinaDateArray[0]} ${chinaDateArray[2]}. ${chinaDateArray[1]}, ${chinaDateArray[3]} ${chinaDateArray[4]}`;

        let timeLast = ""
        if (chat.time_type == 1) {
            if (chat.astatus == 33) {
                timeLast = displayDate.split(" ")[4]
                timeLast = timeLast.split(":")
                timeLast = `${timeLast[0]}:${timeLast[1]}`
            }
        } else {
            if (chat.astatus == 33) {
                timeLast = displayDate.split(" ")[4]
            }
        }
        let cont = initContHtml(chat.chat_type,chat)
        $("#chats").append(`<p>${timeLast}</p><div class="chatRt"><p>${cont}</p></div>`)
        var content = document.getElementById('chats');
        content.scrollTop = content.scrollHeight;
        
        stopClick = true
    }
}

// 接收消息
function adminChatMessage(chat) {
    let isContentNull = $('#isContentNull').val();
    if (isContentNull == 1) {
        $("#chats").html('');
        $('#isContentNull').val(2);
    }

    chats()
    let date = new Date(chat.create_time.replace(/-/g, '/'));

    let globalDate = date.toString();
    let chinaDateArray = globalDate.split(' ');
    let displayDate = `${chinaDateArray[0]} ${chinaDateArray[2]}. ${chinaDateArray[1]}, ${chinaDateArray[3]} ${chinaDateArray[4]}`;
    let cont = chat.content
    let timeLast = '';
    if (chat.time_type == 1) {
        if (chat.astatus == 33) {
            timeLast = displayDate.split(" ")[4]
            timeLast = timeLast.split(":")
            timeLast = `${timeLast[0]}:${timeLast[1]}`
        }
    } else {
        if (chat.astatus == 33) {
            timeLast = displayDate
        }
    }
    var configUrl = chatAlls.member_url;

    cont = initContHtml(chat.chat_type,chat,configUrl)
    $("#chats").append(`<p>${timeLast}</p><div class="chatLt">
            <span class="chatLt-img">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-yf-kefutouxiang_huaban1"></use>
                </svg>
            </span>
            <p>${cont}</p>
        </div>`)

    $("#chat").append('')
    var content = document.getElementById('chats');
    content.scrollTop = content.scrollHeight;
    
}

// upload file start
$(".file-chat").click(function () {
    $("#file_pro").click();
});
var inputElement = document.getElementById("file_pro");
var fileList;
inputElement.addEventListener("change", handleFiles, false);
function handleFiles() {
    fileList = this.files; /* now you can work with the file list */
    let size = fileList[0].size / 1024;
    size > 1024 ? size = `${Math.floor(size / 1024 * 100) / 100}M` : size = `${Math.floor(size * 100) / 100}KB`;
    var formData = new FormData();
    formData.append('file_data', fileList[0]);

    let fileinp = $("#file_pro")
    $.ajax({
        type: "post",
        url: "/index/Asset/chatUpload",
        dataType: "json",
        data: formData,
        processData: false,
        contentType: false,
        success: function (data) {
            if (data.code == 200) {

                fileinp.val("")
                var params = {};
                params['message_type'] = "homeChatMessage";
                params['a_customer_id'] = chatAlls.chatInitData.a_customer_id;
                params['a_lang_id'] = chatAlls.chatInitData.a_lang_id;
                params['product_id'] = chatAlls.chatInitData.product_id;
                params['m_chat_user_id'] = $("#m_chat_user_id").val();
                params['chat_type'] = data.data.chat_type;
                params['view_url'] = chatAlls.chatInitData.view_url;
                params['push_email'] = chatAlls.chatInitData.push_email;
                params['content'] = data.data.urlStr;
                params['file_name'] = data.data.files;
                params['file_size'] = size;
                params['chat_source'] = chatAlls.chatInitData.visit_source.chat_source;
                //区分国内外类型
                params['area_type'] = chatAlls.area_type;

                sendMsgChat(params);

            } else {
                showToast(data.msg);
            }
        },
        error: function () {
            showToast("Failed to send");
        }
    });
}
// upload file end

// upload picture start
const inputImage = document.getElementById("file_image");
$(".chat_image").click(function () {
    $("#file_image").click();
});
var imageList;
inputImage.addEventListener("change", handleImages, false);
function handleImages() {
    imageList = this.files; /* now you can work with the file list */
    let size = this.files[0].size / 1024;
    size > 1024 ? size = `${Math.floor(size / 1024 * 100) / 100}M` : size = `${Math.floor(size * 100) / 100}KB`

    var formData = new FormData();

    formData.append('img_data', imageList[0]);


    let imgfile = $("#file_image")
    $.ajax({
        type: "post",
        url: "/index/Asset/chatImage",
        dataType: "json",
        data: formData,
        processData: false,
        contentType: false,
        success: function (data) {
            if (data.code == 200) {
                imgfile.val("")
                var params = {};
                params['message_type'] = "homeChatMessage";
                params['a_customer_id'] = chatAlls.chatInitData.a_customer_id;
                params['a_lang_id'] = chatAlls.chatInitData.a_lang_id;
                params['product_id'] = chatAlls.chatInitData.product_id;
                params['m_chat_user_id'] = $("#m_chat_user_id").val();
                params['view_url'] = chatAlls.chatInitData.view_url;
                params['push_email'] = chatAlls.chatInitData.push_email;
                params['chat_type'] = data.data.chat_type;
                params['file_name'] = data.data.files;
                params['file_size'] = size;
                params['content'] = data.data.urlStr;
                params['chat_source'] = chatAlls.chatInitData.visit_source.chat_source;
                //区分国内外类型
                params['area_type'] = chatAlls.area_type;

                sendMsgChat(params);
                
            } else {
                showToast(data.msg);
            }
        },
        error: function () {
            showToast("Failed to send");
        }
    });
    
}
// upload picture end

// 点击发送消息
function chatEntryChat()  {
    if ($("#chatinput").val().trim() == "") {
        showToast(chatAlls.chat_content_empty);
        return false
    }
    var data = {};
    data['message_type'] = "homeChatMessage";
    data['a_customer_id'] = chatAlls.chatInitData.a_customer_id;
    data['m_chat_user_id'] = $("#m_chat_user_id").val();
    data['chat_type'] = 1;
    data['view_url'] = chatAlls.chatInitData.view_url;
    data['push_email'] = chatAlls.chatInitData.push_email;
    data['product_id'] = chatAlls.chatInitData.product_id;
    data['a_lang_id'] = chatAlls.chatInitData.a_lang_id;
    data['content'] = $("#chatinput").val();
    data['chat_source'] = chatAlls.chatInitData.visit_source.chat_source;
    //区分国内外类型
    data['area_type'] = chatAlls.area_type;
    sendMsgChat(data)
    $("#chatinput").val("")
}

    // 点击发送消息 结束
    // 回车发送
    function onkeydownsChat(e) {
        if (event.keyCode == "13") {
            chatEntryChat()
        }
    }

    // 回车发送end
    var ws = new WebSocket(chatAlls.chat_ws_url);
    function sendMsgChat(params) {
        params = JSON.stringify(params);
        ws.send(params);
    }
    // Open the connection
    ws.onopen = function () {
        console.log("client：Open connection");
        ws.send(JSON.stringify(chatAlls.chatInit));
    };
    ws.onmessage = function (res) {
        let data = eval("(" + res.data + ")");

        if(data['isReadNum'] >= 1){
            chats()
        }
        switch (data['message_type']) {
            case 'ping':
                //
                var adminData = {};
                adminData['message_type'] = "ping";
                sendMsgChat(adminData)
                break;
            case 'homeInit':
                // 初始化
                getcontentChat(data.data, data.m_chat_user_id);
                break;
            case 'homeChatMessage':
                // 发送消息
                homeChatMessage(data.data);
                break;
            case 'adminChatMessage':
                // 接收消息
                if (timerflag) {
                    setTitle()
                    timer = setInterval(setTitle, 1000)
                    timerflag = false;
                }
                adminChatMessage(data.data);
                break;
        }
    };
    ws.onclose = function (params) {

    };


