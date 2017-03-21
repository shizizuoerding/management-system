var curPageNum=1;
$(function () {
    var curtotalpage = 4;
    curPageNum = totalPage;
    //前5页//后5页
    //需要计算开始页数
    var startpage = 1;

    if (curpage == null) {
        curpage = 1;
    }
    if (curpage <= 3) {
        startpage = 1;
    } else {
        startpage = curpage - 3 + startpage;
    }
    var prepage = curpage - 1;
    var nextpage = parseInt(curpage) + 1;
    var endpage = startpage + curtotalpage;
    if (endpage > totalPage) {
        endpage = totalPage;
    }
    var front = curpage-3;
    var back = parseInt(curpage)+2;
    //上一页
    if(prepage>=1){
        var prepage = '<input class="inp pages select" type="button" value="上一页" onclick="nextPageToFormName('+prepage+","+formName+')">';
        $(prepage).appendTo(".submitPage");
    }
    //前省略
    if(front>0){
        var qiandian = '<input class="inp nob" type="button" value="1" onclick="nextPageToFormName(1,'+formName+')">';
        qiandian += '<input class="inp dian mr" type="button" value="..."> ';
        $(".submitPage").append(qiandian);
    }
    //页码
    for (var i = startpage; i <= endpage; i++) {
        var wtpage = null;
        if (i == curpage) {
            wtpage = '<input class="inp nob active" type="button" value="'+i+'" onclick="nextPageToFormName('+i+","+formName+')">';
        } else {
            wtpage = '<input class="inp nob" type="button" value="'+i+'" onclick="nextPageToFormName('+i+","+formName+')">';
        }
        $(wtpage).appendTo(".submitPage");
    }
    //后省略
    if(back<totalPage && totalPage>5){
        var houdian = '<input class="inp dian mr" type="button" value="..."> ';
        houdian += '<input class="inp nob" type="button" value="'+totalPage+'" onclick="nextPageToFormName('+totalPage+","+formName+')">';
        $(".submitPage").append(houdian);
    }
    //下一页
    if(nextpage<=totalPage ){
        var nextcontent = '<input class="inp pages select" type="button" value="下一页" onclick="nextPageToFormName('+nextpage+","+formName+')">';
        $(nextcontent).appendTo(".submitPage");
    }
    //跳转页码
    var pageNum1 = ' &nbsp;第&nbsp; <input class="inp nob inner" type="text" onkeyup="getNum();" placeholder="'+totalPage+'" > &nbsp;页&nbsp; ';
    $(".submitPage").append(pageNum1);
    var pageNum2 = '<a href="javascript:jump();" class="color6 jump">跳转</a>';
    $(".submitPage").append(pageNum2);

})

function getNum(){
    var reg=/^[1-9]\d*$|^0$/;
    var value = $(".inner").val();
    if(reg.test(value)==true){
        curPageNum = value;
    }else{
        $(".inner").val("");
    }
}
function jump(){
    //去掉最外层双引号
    formName=formName.substr(1,formName.length-2);
    nextPageToFormName(curPageNum,formName);
}