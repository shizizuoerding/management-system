/**
 * Created by xiao.tao on 2016/10/24.
 */
var strVarCity = "";
strVarCity += "<div class=\"aui_state_box\"><div class=\"aui_state_box_bg\"></div>";
strVarCity += "  <div class=\"aui_alert_zn aui_outer\">";
strVarCity += "    <table class=\"aui_border\">";
strVarCity += "      <tbody>";
strVarCity += "        <tr>";
strVarCity += "          <td class=\"aui_w\">";
strVarCity += "          <\/td>";
strVarCity += "          <td class=\"aui_c\">";
strVarCity += "            <div class=\"aui_inner\">";
strVarCity += "              <table class=\"aui_dialog\">";
strVarCity += "                <tbody>";
strVarCity += "                  <tr>";
strVarCity += "                    <td class=\"aui_header\" colspan=\"2\"><div class=\"aui_titleBar\">";
strVarCity += "                    ";
strVarCity += "                        <div class=\"aui_title\" style=\"cursor: move;\">选择城市信息<\/div>";
strVarCity += "                        <a href=\"javascript:;\" class=\"aui_close\" onclick=\"Close()\">×<\/a><\/div><\/td>";
strVarCity += "                  <\/tr>";
strVarCity += "                  <tr>";
strVarCity += "                <td class=\"aui_icon\" style=\"display: none;\">";
strVarCity += "                   <div class=\"aui_iconBg\" style=\"background: transparent none repeat scroll 0% 0%;\"><\/div><\/td>";
strVarCity += "                     <td class=\"aui_main\" style=\"width: auto; height: auto;\">";
strVarCity += "                      <div class=\"aui_content\" style=\"padding: 0px; position:relative\">";
strVarCity += "                        <div id=\"\" style=\"width: 900px; position:relative;\">";
strVarCity += "                          <div class=\"data-result\"><em>请选择<\/em><\/div>";
//strVarCity += "                          <div class=\"data-error\" style=\"display: none;\">最多只能选择 3 项<\/div>";
strVarCity += "                          <div class=\"data-tabs\">";
strVarCity += "                            <ul>";
strVarCity += "                              <li onclick=\"removenode_area(this)\" data-selector=\"tab-all\" class=\"active\"><a href=\"javascript:;\"><span>全部<\/span><em><\/em><\/a><\/li>";
strVarCity += "                            <\/ul>";
strVarCity += "                          <\/div>";
strVarCity += "                          <div class=\"data-container data-container-city\">";

strVarCity += "";
strVarCity += "                            <\/div>";
strVarCity += "                          <\/div>";
strVarCity += "                          ";
strVarCity += "                        <\/div>";
strVarCity += "                         ";
strVarCity += "                      <\/div>";
strVarCity += "                      ";
strVarCity += "                    <\/td>";
strVarCity += "                  <\/tr>";
strVarCity += "                  <tr>";
strVarCity += "                    <td class=\"aui_footer\" colspan=\"2\"><div class=\"aui_buttons\">";
strVarCity += "                      <button class=\"aui-btn aui-btn-primary\" onclick=\"svae_City()\" type=\"button\">确定<\/button>";
strVarCity += "                        <button class=\"aui-btn aui-btn-light\" onclick=\"Close()\" type=\"button\">取消<\/button>";
strVarCity += "                      <\/div><\/td>";
strVarCity += "                  <\/tr>";
strVarCity += "                <\/tbody>";
strVarCity += "              <\/table>";
strVarCity += "            <\/div><\/td>";
strVarCity += "          <td class=\"aui_e\"><\/td>";
strVarCity += "        <\/tr>";
strVarCity += "      <\/tbody>";
strVarCity += "    <\/table>";
strVarCity += "  <\/div>";
strVarCity += "<\/div>";

var dataCityinput = null;
var datatype="";
function appendCity(thiscon, Cityxz) {
    dataCityinput = thiscon;
    datatype = Cityxz;
    $('body').append(strVarCity);
    if (datatype == "single-choice") {
        $('.data-result').find('strong').text('1');
    }
    if ($(dataCityinput).data("value") != "") {
        var inputarry = $(dataCityinput).data("value").split('-');
        var inputarryname = $(dataCityinput).val().split('-');
        var inputseqno =  $(dataCityinput).data("seqno").split('-');
        if (inputarry.length > 0) {
            for (var i in inputarry) {
                $('.data-result').append("<span class=\"svae_box aui-titlespan\" data-code=\"" + inputarry[i] + "\" data-seqno=\"" + inputseqno[i] + "\" data-name=\"" + inputarryname[i] + "\" onclick=\"removespan_area(this)\">" + inputarryname[i] + "<i>×<\/i><\/span>");
            }
        }
    }


    var minwid = document.documentElement.clientWidth;
    $('.aui_outer .aui_header').on("mousedown", function(e) {
        /*$(this)[0].onselectstart = function(e) { return false; }*///防止拖动窗口时，会有文字被选中的现象(事实证明不加上这段效果会更好)
        $(this)[0].oncontextmenu = function(e) { return false; } //防止右击弹出菜单
        var getStartX = e.pageX,
            getStartY = e.pageY;
        var getPositionX = (minwid / 2) - $(this).offset().left,
            getPositionY = 60;
        $(document).on("mousemove", function(e) {
            var getEndX = e.pageX,
                getEndY = e.pageY;
            $('.aui_outer').css({
                left: getEndX - getStartX - getPositionX,
                top: getEndY - getStartY + getPositionY
            });

        });
        $(document).on("mouseup", function() {
            $(document).unbind("mousemove");
        })
    });
    selectProvince('all', null, '');
}

function selectProvince(type, con, isremove,id,isHaveSubList) {
    getHotcities(type, con, isremove,id,isHaveSubList);
}
//热门城市

function getHotcities(type, con, isremove,id,isHaveSubList){
    if(type=="all"){
        $('.data-container-city').empty();
        $.ajax({
            url:"/logisticsTemplate/getHotcities",
            data:null,
            type:"post",
            dataType:"json",
            success:function(data){
                var strVarCity="";
                strVarCity += "                            <div class=\"view-all\" id=\"\">";
                strVarCity += "                              <p class=\"data-title\">热门城市<\/p>";
                strVarCity += "                              <div class=\"data-list data-list-hot\">";
                strVarCity += "                                <ul class=\"clearfix\">";
                for (var i in data) {
                    var seqnoList=getSeqNo();
                    var num = 0;
                    for(var j in seqnoList){
                        if(seqnoList[j].indexOf(data[i].seqno)>-1){
                            num++;
                        }
                    }
                    strVarCity += '<li><a href=\"javascript:;\" data-code=\"' + data[i].id + '\" data-seqno=\"' + data[i].seqno + '\" data-name=\"' + data[i].name + '\" class=\"d-item\"  onclick="selectProvince(\'sub\',this,\'\','+data[i].id+',\''+data[i].isHaveSubList+'\')">' + data[i].name + '<label>'+num+'</label></a></li>';
                }
                strVarCity += "                                <\/ul>";
                strVarCity += "                              <\/div>";
                $('.data-container-city').append(strVarCity);
                getProvinces(type, con, isremove);
            }
        })
    }else{
        getSubCities(type, con, isremove,id,isHaveSubList);
    }
}
//获取省份
function getProvinces(type, con, isremove){
    if(type=="all"){
        $.ajax({
            url:"/logisticsTemplate/getProvinces",
            data:null,
            type:"post",
            dataType:"json",
            success:function(data){
                var strVarCity="";
                strVarCity += "                              <p class=\"data-title\">全部省份<\/p>";
                strVarCity += "                              <div class=\"data-list\">";
                strVarCity += "                                <ul class=\"clearfix\">";
                for (var i in data) {
                    var seqnoList=getSeqNo();
                    var num = 0;
                    for(var j in seqnoList){
                        if(seqnoList[j].indexOf(data[i].seqno)>-1){
                            num++;
                        }
                    }
                    strVarCity += '<li><a href=\"javascript:;\" data-code=\"' + data[i].id + '\" data-seqno=\"' + data[i].seqno + '\" data-name=\"' + data[i].name + '\" class=\"d-item\"  onclick="selectProvince(\'sub\',this,\'\','+data[i].id+',\''+data[i].isHaveSubList+'\')">' + data[i].name + '<label>'+num+'</label></a></li>';
                }
                strVarCity += "                                <\/ul>";
                strVarCity += "                              <\/div>";
                $('.data-container-city').append(strVarCity);
                echoCities();
                showLabel();
            }
        })
    }else{
        getSubCities(type, con, isremove,isHaveSubList);
    }
}
//获取子城市
function  getSubCities(type, con, isremove,id,isHaveSubList){

    if(isHaveSubList=="yes"){
        $.ajax({
            url:"/logisticsTemplate/getSubCities",
            data:{"id":id},
            type:"post",
            dataType:"json",
            success:function(data){
                $('.data-container-city').empty();
                //添加标题
                if (isremove != "remove") {
                    $('.data-tabs ul').append('<li data-code=' + $(con).data("code") + ' data-seqno=' + $(con).data("seqno") + ' data-name=' + $(con).data("name") + ' class="active" onclick="removenode_area(this)"><a href="javascript:;"><span>' + $(con).data("name") + '</span><em></em></a></li>');
                }
                //添加内容
                var strVarCity="";
                strVarCity += "<ul class=\"clearfix\">";
                strVarCity += '<li class="" style="width:100%"><a href="javascript:;" class="d-item data-all"  data-code="' + $(con).data("code") + '"  data-name=\"' + $(con).data("name") + '\"  onclick="selectitem_area(this)">' + $(con).data("name") + '<label>0</label></a></li>';
                for (var i in data) {
                    var seqnoList=getSeqNo();
                    var num = 0;
                    for(var j in seqnoList){
                        if(seqnoList[j].indexOf(data[i].seqno)>-1){
                            num++;
                        }
                    }
                    strVarCity += '<li><a href="javascript:;" class="d-item" data-code="' + data[i].id + '" data-seqno="' + data[i].seqno + '" data-name=\"' + data[i].name + '\" onclick="selectProvince(\'sub\',this,\'\','+data[i].id+',\''+data[i].isHaveSubList+'\')">' + data[i].name + '<label>'+num+'</label></a></li>';
                }
                strVarCity += "<\/ul>";
                $('.data-container-city').html(strVarCity);
                echoCities();
                showLabel();
            }
        })
    }else{
        if (datatype == "multiple-choice") {
            if ($(con).attr("class").indexOf('d-item-active') > 0) {
                $('.data-result span[data-code="' + $(con).data("code") + '"]').remove();
                $(con).removeClass('d-item-active');
                return false;
            }
            $('.data-result').append("<span class=\"svae_box aui-titlespan\" data-code=\"" + $(con).data("code") + "\" data-seqno=\"" + $(con).data("seqno") + "\" data-name=\"" + $(con).data("name") + "\" onclick=\"removespan_area(this)\">" + $(con).data("name") + "<i>×<\/i><\/span>");
            $(con).addClass('d-item-active');
        } else {
            //单选
            $('.data-result span').remove();
            $('.data-result').append("<span class=\"svae_box aui-titlespan\" data-code=\"" + $(con).data("code")  + "\" data-seqno=\"" + $(con).data("seqno") + "\"  data-name=\"" + $(con).data("name") + "\" onclick=\"removespan_area(this)\">" + $(con).data("name") + "<i>×<\/i><\/span>");
            $(con).parent('li').siblings('li').find('a').removeClass('d-item-active')
            $(con).addClass('d-item-active');
        }
    }

}

//关闭弹出层
function Close() {
    $('.aui_state_box').remove();
}
//清除面板内容
function removenode_area(lithis) {
    if ($(lithis).nextAll('li').length == 0) {
        return false;
    }
    $(lithis).nextAll('li').remove();
    if ($(lithis).data("selector") == "tab-all") {
        selectProvince('all', null, '',$(lithis).data("code"),"yes");
    } else {
        selectProvince('sub', lithis, 'remove',$(lithis).data("code"),"yes");
    }
}
//确定选择
function svae_City() {

    var val = '';
    var Cityname = '';
    var data_seqNO='';
    if ($('.svae_box').length > 0) {
        $('.svae_box').each(function() {
            val += $(this).data("code") + '-';
            Cityname += $(this).data("name") + '-';
            data_seqNO += $(this).data("seqno") + '-';
        })
    }
    if (val != '') {
        val = val.substring(0, val.lastIndexOf('-'));
    }
    if (Cityname != '') {
        Cityname = Cityname.substring(0, Cityname.lastIndexOf('-'));
    }
    if(data_seqNO!=''){
        data_seqNO = data_seqNO.substring(0, data_seqNO.lastIndexOf('-'));
    }
    $(dataCityinput).data("value", val);
    $(dataCityinput).data("seqno", data_seqNO);
    $(dataCityinput).val(Cityname);
    $(dataCityinput).next().val(val);
    $(dataCityinput).next().next().val(data_seqNO);
    Close();
}
//选择省或者市下面全部
function selectitem_area(con) {
    if($(con).hasClass("d-item-active")==false){
        $('.data-result span').each(function(index,span) {
            console.log($(span).data("seqno"));
            $(con).parent('li').nextAll("li").find('a').each(function(index,a) {

                if(($(span).data("seqno").toString()).indexOf(($(a).data("seqno").toString()))>-1){
                    $(span).remove()
                }
            })
        })
    }
    if (datatype == "multiple-choice") {

        $(con).parent('li').siblings('li').find("a").removeClass("d-item-active");

        if ($(con).attr("class").indexOf("d-item-active") == -1) {
            $(con).parent('li').nextAll("li").find('a').css({ 'color': '#ccc', 'cursor': 'not-allowed' })
            $(con).parent('li').nextAll("li").find('a').attr("onclick", "");
        } else {
            //$(con).parent('li').nextAll("li").find('a').css({ 'color': '#0077b3', 'a.d-item-active:hover': '#fff', 'cursor': 'pointer' })
            //$(con).parent('li').nextAll("li").find('a').attr("onclick", "selectProvince(\'sub\',this,\'\')");
            selectProvince("sub", con, "remove",$(con).data("code"),"yes");
        }
        if ($(con).attr("class").indexOf('d-item-active') > 0) {
            $('.data-result span[data-code="' + $(con).data("code") + '"]').remove();
            $(con).removeClass('d-item-active');
            return false;
        }
        $('.data-result').append("<span class=\"svae_box aui-titlespan\" data-code=\"" + $(con).data("code") + "\" data-name=\"" + $(con).data("name") + "\" onclick=\"removespan_area(this)\">" + $(con).data("name") + "<i>×<\/i><\/span>");
        $(con).addClass('d-item-active');
    } else {
        //单选
        $('.data-result span').remove();
        $('.data-result').append("<span class=\"svae_box aui-titlespan\" data-code=\"" + $(con).data("code") + "\" data-name=\"" + $(con).data("name") + "\" onclick=\"removespan_area(this)\">" + $(con).data("name") + "<i>×<\/i><\/span>");
        $(con).parent('li').siblings('li').find('a').removeClass('d-item-active')
        $(con).addClass('d-item-active');
    }
}

//移除已经选择的城市
function removespan_area(spanthis) {
    $('a[data-code=' + $(spanthis).data("code") + ']').removeClass('d-item-active');
    if ($('a[data-code=' + $(spanthis).data("code") + ']').length > 0) {
        if ($('a[data-code=' + $(spanthis).data("code") + ']').attr("class").indexOf('data-all') > 0) {
            //$('a[data-code=' + $(spanthis).data("code") + ']').parent('li').nextAll('li').find('a').css({ 'color': '#0077b3', 'a.d-item-active:hover': '#fff', 'cursor': 'pointer' });
            //$('a[data-code=' + $(spanthis).data("code") + ']').parent('li').nextAll("li").find('a').attr("onclick", "selectProvince(\'sub\',this,\'\')");
            selectProvince("sub", spanthis, "remove",$(spanthis).data("code"),"yes");
        }
    }
    $(spanthis).remove();
}
//回显城市 （选中）
function echoCities(){
    $('.data-result span').each(function(index) {
        if ($('a[data-code=' + $(this).data("code") + ']').length > 0) {
            $('a[data-code=' + $(this).data("code") + ']').addClass('d-item-active');
            if ($('a[data-code=' + $(this).data("code") + ']').attr("class").indexOf('data-all') > 0) {
                if (datatype == "multiple-choice") {
                    $('a[data-code=' + $(this).data("code") + ']').parent('li').nextAll('li').find('a').css({ 'color': '#ccc', 'cursor': 'not-allowed' });
                    $('a[data-code=' + $(this).data("code") + ']').parent('li').nextAll("li").find('a').attr("onclick", "");
                }
            }
        }
    });
}
//获取选中城市seqno
function getSeqNo(){
    var data_seqNO='';
    $('.data-result span').each(function(index) {
        data_seqNO += $(this).data("seqno") + '-';
    });
    if(data_seqNO!=''){
        data_seqNO = data_seqNO.substring(0, data_seqNO.lastIndexOf('-'));
    }
    return  data_seqNO.split('-');
}
//选择城市座数大于1 显示label
function showLabel(){
    $("li a label").each(function(){
        var num = $(this).text();
        if(parseInt(num)>0){
            $(this).show();
        }else{
            $(this).hide();
        }
    });
}