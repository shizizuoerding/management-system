//分页
function demo(count) {
    laypage({
        cont: $('.divPager'), //容器。值支持id名、原生dom对象，jquery对象,
        pages: count, //总页数
        skin: '#0071ba', //加载内置皮肤，也可以直接赋值16进制颜色值，如:#c00
        groups: 3, //连续显示分页数
        skip: true //是否开启跳页
    });
}
//运行
// demo();
/*上传文件方法
 * @父级元素使用class ".icon-content"，子元素img使用class ".icon-preview"
 * */
function preview(file) {
    //  fileType
    var imgReg = /.jpg|.png|.bmp|.gif|.jpeg|.ico|.webp/g, fio;
    //  fileSize lt IE10
    if (navigator.userAgent.match(/MSIE 9.0/) != null || navigator.userAgent.match(/MSIE 10.0/) != null) {
        var fie = new ActiveXObject('Scripting.filesystemobject');
        fio = fie.GetFile(file.value);
    }
    //  fileSize FF, Chrome , Safari
    else if (file.files && file.files[0]) {
        fio = file.files[0].size;
    }
    //  fileSize
    if ((fio / Math.pow(1024, 2)) > 10 || (file.value.match(imgReg) == null)) {
        file.value = null;
        alert('上传有误');
        return false;
    }
    //  fileReader IE 9
    if (navigator.userAgent.match(/MSIE 9.0/) != null) {
        $(file).parents(".icon-content").find(".icon-preview").attr('src', file.value).css('opacity', 1);
    }
    else {
        if (file.files && file.files[0]) {
            var reader = new FileReader();
            reader.onload = function (evt) {
                $(file).parents(".icon-content").find(".icon-preview").attr('src', evt.target.result).css('opacity', 1);
            };
            reader.readAsDataURL(file.files[0]);
        }
    }
}
//退出
$(document).on("click", ".logOut", function () {
    $.ajax({
        type: "post",
        url: basePath + "/loginAction/outLogin"
    })
});

/*归档*/
function pige_add() {
    layer.confirm('是否新建档案', {icon: 3, btn: ["新建档案", "查询现有档案", "取消"], closeBtn: 0, area: ["400px", "200px"]}
        , function (index) {
            //此处请求后台程序，下方是成功后的前台处理……
            layer.close(index);
            layer_show('新建档案', '../pigeonhole_add.html', '', '400');
        }
        , function () {
            //此处请求后台程序，下方是成功后的前台处理……
            layer_show('归档', '../pigeonhole_file.html', '', '550');
//            layer.msg('已删除!',{icon:1,time:1000});
        }
    );
}
// 修改
function update() {
    layer.confirm('刷新中，请稍后', function (index) {
        //此处请求后台程序，下方是成功后的前台处理……

        layer.msg('刷新成功!', {icon: 1, time: 1000});
        location.replace(location.href);
    });
}
//批量操作
function batchCheck(url) {
    var ids = "";
    $(".ace-checkbox-2").each(function () {
        if (true == $(this).is(':checked') && !isNaN($(this).val())) {
            ids += $(this).val() + ",";
        }
    });
    if (ids == "") {
        layer.msg('请选择数据!', {icon: 1, time: 1000});
    } else {
        operate(url, ids);
    }
}
//  删除
function del(id, url) {
    layer.confirm('确认要删除吗？', function (index) {
        //此处请求后台程序，下方是成功后的前台处理……
        $.ajax({
            url: url,
            data: {"ids": id},
            type: "post",
            dataType: "json",
            success: function (dataval) {
                if (dataval.flag) {
                    window.location.reload(true);
                } else {
                    layer.msg('操作失败!', {icon: 1, time: 1000});
                }
            }
        });
    });
}

//loading show
function loadingShow(text) {
    //防止多次显示
    var text = text ? text : "正在加载中...";
    $(".ui-loading-block").remove();
    var loading = '<div class="ui-loading-block show"><div class="ui-loading-cnt"><i class="ui-loading-bright"></i><p>' + text + '</p></div></div>';
    $("body").append(loading);
}

//loading hide
function loadingHide() {
    $(".ui-loading-block").remove();
}

//显示大图
function showImg(url) {
    //防止多次显示
    $(".ui-loading-block").remove();
    var loading = '<div class="ui-loading-block ui-img-content show"><img src="' + url + '" height="400" alt=""/></div>';
    $("body").append(loading);
}

//添加大图显示逻辑
function addShowBigImg() {
    $(document).on("click", "img", function () {
        var url = $(this).attr("src");
        if (url && url != "/static/common/images/noImg.png") {
            showImg(url);
        }
    })
}

$(document).on("click", ".ui-img-content", function () {
    $(".ui-loading-block").remove();
})

//发送post请求
function post(URL, PARAMS) {
    var temp = document.createElement("form");
    temp.action = URL;
    temp.method = "post";
    temp.style.display = "none";
    for (var x in PARAMS) {
        var opt = document.createElement("textarea");
        opt.name = x;
        opt.value = PARAMS[x];
        // alert(opt.name)
        temp.appendChild(opt);
    }
    document.body.appendChild(temp);
    temp.submit();
    return temp;
}

/**
 *ajax
 * url : 控制器地址
 * method : 'get','post'
 * values : json对象
 * callback : 回调函数
 * isHide : 是否隐藏加载进度提示，默认显示
 * title : 进度条显示的内容
 */
function api_ajax(url, method, values, isHide, title, callback) {
    if (isHide) {
        loadingShow(title);
    }
    $.ajax({
        async: true,
        traditional: true,
        type: method,
        url: url,
        data: values,
        success: function (ret) {
            loadingHide();
            document.documentElement.scrollTop = document.body.scrollTop = 0;
            callback(ret);
        },
        error: function (e) {
            loadingHide();
            layer.msg("请求异常", {icon: 1, time: 1000});
        }
    });
}

 $(".table-bordered").on("click","#photo",function(){
        console.log(1323443);
        var str = '<tr><td class="bg-ob text-c"><img src="../../common/images/bingmayong1.jpg" style="width:100%;height:auto;"></td></tr>';
        $("#tuwen").append(str);
    })
    $(".table-bordered").on("click","#word",function(){
        console.log(1323443);
        var str = '<tr><td><textarea class="bg-ob" style="width:100%;height:100%;min-height:200px;background:#fff;" placeholder="兵马俑博物馆位于西安临潼区秦始皇陵东1.5公里处，是秦始皇陵的从葬坑，被誉为..."></textarea></td></tr>';
        $("#tuwen").append(str);
    })
