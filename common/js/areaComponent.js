function areaBox(returnClass) {

    //上级行政区划
    var upObj = $("#upObj").val();
    var uobj = eval("(" + upObj + ")");

    //最后返回值
    var areaBox = '<span class="select-m-box-l">' +
        '<select class="select ' + returnClass + '" size="1" name="uobj">' +
        '<option value="' + uobj.c1 + '" >' + uobj.c2 + '</option>' +
        '</select>' +
        '</span>';


    var divisionLevel = $("#divisionLevel").val();

    //城市
    var cityBox = '<span class="select-m-box-l">' +
        '<select class="select" size="1" name="cityBox" onchange="areaLoad(this,2,\'' + returnClass + '\')"><option value="" >无</option>';
    var cityArray = $("#cityArray").val();
    if (cityArray != null && cityArray != "") {//如果城市存在
        var dobj = eval("(" + cityArray + ")");

        for (var i = 0; i < dobj.length; i++) {
            var ob = dobj[i];
            cityBox += "<option value='" + ob.R0102 + "' name='" + ob.R0103 + "'>" + ob.R0103 + "</option>";
        }
        cityBox += "</select></span>";

        areaBox += cityBox;

    } else {
        cityBox += "</select></span></div>";

        if ("1" == divisionLevel) {
            areaBox += cityBox;
        }

    }

    //区县
    var countyBox = '<span class="select-m-box-l">' +
        '<select class="select" size="1" name="countyBox" onchange="areaLoad(this,3,\'' + returnClass + '\')"><option value="" >无</option>'
    var countyArray = $("#countyArray").val();
    if (countyArray != null && countyArray != "") {//如果区县存在
        var dobj = eval("(" + countyArray + ")");

        for (var j = 0; j < dobj.length; j++) {
            var ob = dobj[j];
            countyBox += "<option value='" + ob.R0102 + "'name='" + ob.R0103 + "'>" + ob.R0103 + "</option>";
        }
        countyBox += "</select></span>";
        areaBox += countyBox;
    } else {
        countyBox += "</select></span></div>";
        if ("2" == divisionLevel || "1" == divisionLevel) {
            areaBox += countyBox;
        }
    }

    //乡镇
    var villagesBox = '<span class="select-m-box-l">' +
        '<select class="select" size="1" name="villagesBox" onchange="areaLoad(this,0,\'' + returnClass + '\')"><option value="">无</option>'
    var villagesArray = $("#villagesArray").val();
    if (villagesArray != null && villagesArray != "") {//如果乡镇存在
        var dobj = eval("(" + villagesArray + ")");

        for (var j = 0; j < dobj.length; j++) {
            var ob = dobj[j];
            villagesBox += "<option value='" + ob.R0102 + "'name='" + ob.R0103 + "'>" + ob.R0103 + "</option>";
        }
        villagesBox += "</select></span>";

        areaBox += villagesBox;

    } else {
        villagesBox += "</select></span>";

        areaBox += villagesBox;

    }

    return areaBox;
}

function areaLoad(dat, interval, returnClass) {
    $("select[name='uobj']").removeClass(returnClass);
    $("select[name='cityBox']").removeClass(returnClass);
    $("select[name='countyBox']").removeClass(returnClass);
    $("select[name='villagesBox']").removeClass(returnClass);
    if (dat.value != null && dat.value != "") {
        $(dat).addClass(returnClass);
    } else {
        $(dat).parent().prev().find("select").addClass(returnClass);
    }

    var basePath = $("#basePath").val();
    var divisionLevel = $("#divisionLevel").val();
    $.ajax({
        async: false,
        traditional: true,
        type: "post",
        url: basePath + "/userAction/areaLoad",
        data: {
            divisionCode: dat.value,
            divisionLevel: divisionLevel,
            interval: interval
        },
        success: function (data) {
            var dobj = eval("(" + data + ")");
            $(dat).parent().next().find("select").empty();
            $(dat).parent().next().next().find("select").empty();
            $(dat).parent().next().find("select").append($("<option value=''>无</option>"));
            $(dat).parent().next().next().find("select").append($("<option value=''>无</option>"));
            for (var i = 0; i < dobj.length; i++) {
                var ob = dobj[i];
                $(dat).parent().next().find("select").append($("<option value='" + ob.R0102 + "'>" + ob.R0103 + "</option>"));
            }
        },
        error: function (e) {
            alert("请求异常");
        }
    });
}

