//全选or 全清
function checkAll(obj,checkboxName){
	var objs = document.getElementsByName(checkboxName);
	for(i=0;i<objs.length;i++){
		objs[i].checked=obj.checked;
	}
}
function hiddenDiv(id){
	document.getElementById(id).style.display = "none";
}
// 得到用户选中的ID(字符串用,隔开)
function getCheckIds(checkboxName) {
	var checkIds = "";
	var eles = document.getElementsByName(checkboxName);
	for (var i = 0; i < eles.length; i++) {
		if (eles[i].checked) {
			if (checkIds == "") {
				checkIds = checkIds + eles[i].value;
			} else {
				checkIds = checkIds + "," + eles[i].value;
			}
		}
	}
	return checkIds;
}
//上一页/下一页 首页/尾页
function nextPage(url,pageNo) {
	if(url.indexOf("?")>0){
		url += "&pageNo="+pageNo;
	}else{
		url += "?pageNo="+pageNo;
	}
	window.location.href=url;
}
//上一页/下一页 首页/尾页
function nextPageToLocation(pageNo) {
	var url= setParam("pageNo", pageNo);
	window.location.href=url;
}

//上一页/下一页 首页/尾页 适用于带form参数
function nextPageToForm(pageNo){
	var formobj=document.forms[0];
	if(formobj!=null){
		$("<input id='pageNo' name='pageNo'  type='hidden' value=\""+pageNo+"\">").appendTo(jQuery(formobj));
		jQuery(formobj).submit();
	}
}
//上一页/下一页 首页/尾页 适用于带form名称参数
function nextPageToFormName(pageNo,formName){
	var formobj=document.forms[formName];
	if(formobj!=null){
		$("<input id='pageNo' name='pageNo'  type='hidden' value=\""+pageNo+"\">").appendTo(jQuery(formobj));
		jQuery(formobj).submit();
	}

}
//上一页/下一页 首页/尾页 适用于带form名称参数 并且使用get提交参数  既保留地址栏信息
function nextPageToFormNameGet(pageNo,formName){
	var formobj=document.forms[formName];
	if(formobj!=null){
		var url = jQuery(formobj).attr("action");
		var data = jQuery(formobj).serialize();
		if(url.indexOf("?")>0){
			url += "&pageNo="+pageNo+"&"+data;
		}else{
			url += "?pageNo="+pageNo+"&"+data;
		}
		window.location.href=url;
	}
}

//分页查询跳转页面
function goPage(url,totalPage){
	var goPage = document.getElementById("goPage").value;
	if (goPage != null && goPage != "") {
		if (/^[0-9]+$/.test(goPage)) {
			if(parseInt(goPage) > totalPage){
				goPage = totalPage;
			}
			if(url.indexOf("?")>0){
				url += "&pageNo="+goPage;
			}else{
				url += "?pageNo="+goPage;
			}
			location.href = url;
		} else {
			alert("请输入正确的页码！");
			document.getElementById("goPage").value = "";
		}
	} else {
		alert("请输入正确的页码！");
	}
}
//分页查询跳转页面
function goPageToLocation(url,totalPage){
	var goPage = document.getElementById("goPage").value;
	if (goPage != null && goPage != "") {
		if (/^[0-9]+$/.test(goPage)) {
			if(parseInt(goPage) > totalPage){
				goPage = totalPage;
			}
			var url= setParam("pageNo", goPage);
			location.href = url;
		} else {
			alert("请输入正确的页码！");
			document.getElementById("goPage").value = "";
		}
	} else {
		alert("请输入正确的页码！");
	}
}
//分页查询跳转页面 适用于带form参数
function goPageToForm(totalPage){
	var goPage = document.getElementById("goPage").value;
	if (goPage != null && goPage != "") {
		if (/^[0-9]+$/.test(goPage)) {
			if(parseInt(goPage) > parseInt(totalPage)){
				goPage = totalPage;
			}
			var pageNo=goPage;
			var formobj=document.forms[0];
			if(formobj!=null){
				$("<input id='pageNo' name='pageNo'  type='hidden' value=\""+pageNo+"\">").appendTo(jQuery(formobj));
				jQuery(formobj).submit();
			}
		} else {
			alert("请输入正确的页码！");
			document.getElementById("goPage").value = "";
		}
	} else {
		alert("请输入正确的页码！");
	}
}
//分页查询跳转页面 适用于带form名称参数
function goPageToFormName(totalPage,formName){
	var goPage = document.getElementById(formName+"_goPage").value;
	if (goPage != null && goPage != "") {
		if (goPage ^ [0 - 9] * $) {
			if(parseInt(goPage) > parseInt(totalPage)){
				goPage = totalPage;
			}
			var pageNo=goPage;
			var formobj=document.forms[formName];
			if(formobj!=null){
				var url = jQuery(formobj).attr("action");
				var data = jQuery(formobj).serialize();
				if(url.indexOf("?")>0){
					url += "&pageNo="+pageNo;
				}else{
					url += "?pageNo="+pageNo;
				}
				url=url+"&"+data;
				createTableData(url);
			}
		} else {
			alert("请输入正确的页码！");
			document.getElementById(formName+"_goPage").value = "";
		}
	} else {
		alert("请输入正确的页码！");
	}
}
function bizEdit(url,id){
	if(id!=""){
		url+="?id="+id;
	}
	window.open(url);
}
function bizDel(url,id){
	if(id==""){
		alert("请选择数据");
		return;
	}
	url+="?ids="+id;
	jQuery.ajax({type:"POST", url:url, beforeSend:function () {
	}, success:function (result) {
		if(result==true){
			window.location.reload();
			if(window.parent.frames["treeFrame"]!=null){
				window.parent.frames["treeFrame"].location.reload();
			}

		}else{
			alert("删除失败");
		}

	}, error:function (result) {
		alert("\u4fdd\u5b58\u5931\u8d25");
	}});
}
function bizDelData(url,id,callback,params){
	if(id==""){
		alert("请选择数据");
		return;
	}
	url+="?ids="+id;
	jQuery.ajax({type:"POST", url:url, beforeSend:function () {
	}, success:function (result) {
		if(result.flag==true){
			params.push(result);
			callback.apply(this,params );
		}else{
			alert("删除失败");
		}
	}, error:function (result) {
		alert("\u4fdd\u5b58\u5931\u8d25");
	}});
}
//调用删除方面 并获取返回值
function bizDelAndGetReturn(url,id,callback){
	if(id==""){
		alert("请选择数据");
		return;
	}
	url+="?ids="+id;
	jQuery.ajax({type:"POST", url:url, beforeSend:function () {
	}, success:function (result) {
		if(result.flag==true){
			callback.apply(this,params );
		}else{
			alert("删除失败");
		}
	}, error:function (result) {
		alert("\u4fdd\u5b58\u5931\u8d25");
	}});
}
//del many
function bizDelAll(url,checkboxName){
	var ids=getCheckIds(checkboxName);
	if(ids==""){
		alert("请选择数据");
		return;
	}
	bizDel(url,ids);
}
//save and reload opener
function submitFormCallBack(formName,callbackTrue,callbackFalse,params){
	var formobj=document.forms[formName];
	var url = jQuery(formobj).attr("action");
	var data = jQuery(formobj).serialize();
	jQuery.ajax({type:"POST", url:url, data:data, beforeSend:function () {
	}, success:function (result) {
		if(result.flag==true){
			//执行相关的回调方法
			params.push(result);
			callbackTrue.apply(this,params );
		}else{
			params.push(result);
			callbackFalse.apply(this,params );
		}

	}, error:function (result) {
		alert("\u4fdd\u5b58\u5931\u8d25");
	}});
}
//save and reload opener
function submitForm(){
	var url = jQuery("#dataform").attr("action");
	var data = jQuery("#dataform").serialize();
	jQuery.ajax({type:"POST", url:url, data:data, beforeSend:function () {
	}, success:function (result) {
		if(result=="suceess"){
			alert("\u4fdd\u5b58\u6210\u529f");
			var listurl=document.referrer;
			window.location.href=listurl;
			if(window.parent.frames["treeFrame"]!=null){
				window.parent.frames["treeFrame"].location.reload();
			}
		}else{
			alert("保存失败");
		}

	}, error:function (result) {
		alert("\u4fdd\u5b58\u5931\u8d25");
	}});
}

// async send ajax
function sendAjax(url,data,callback,params){
	jQuery.ajax({type:"POST", url:url, data:data, beforeSend:function () {
	}, success:function (result) {
		if(result.flag==true){
			//执行相关的回调方法
			params.push(result);
			callback.apply(this,params );
		}else{
			alert(result.message);
		}
	}, error:function (result) {
		alert("\u4fdd\u5b58\u5931\u8d25");
	}});
}
//send ajax notasync
function sendAjaxSynch(url,data,callback,params){
	jQuery.ajax({type:"POST", url:url, data:data,async: false,beforeSend:function () {
	}, success:function (result) {
		if(result.flag==true){
			//执行相关的回调方法
			params.push(result);
			callback.apply(this,params );
		}else{
			alert("操作失败");
		}
	}, error:function (result) {
		alert("\u4fdd\u5b58\u5931\u8d25");
	}});
}
//获取异步数据
function getAjaxData(url,data){
	var returndata;
	jQuery.ajax({type:"POST", url:url, data:data,async: false, beforeSend:function () {
	}, success:function (result) {
		if(result.flag==true){
			returndata= result.data;
		}else{
			alert("获取数据失败");
			return null;
		}
	}, error:function (result) {
		alert("获取数据失败");
		return null;
	}});
	return returndata;
}
//设置列表页上的异步分页
function setPageFun(bizPageData,divId,formName){
	var pageNo,prePage,nextPage,totalPage,totalRecord,rows;
	if(bizPageData == null){
		pageNo = 1;
		prePage = 1;
		nextPage = 1;
		totalPage = 1;
		totalRecord = 0;
		rows = 10;
	}else{
		pageNo = bizPageData.pageNo;
		prePage = bizPageData.prePage;
		nextPage = bizPageData.nextPage;
		totalPage = bizPageData.totalPage;
		totalRecord = bizPageData.totalRecord;
		rows = bizPageData.rows;
	}
	var str = "<span>共"+totalRecord+"条记录</span>&nbsp;&nbsp;";
	if(totalRecord == 0){
		str += "<span>首页</span>&nbsp;&nbsp;"
		str += "<span>上一页</span>&nbsp;";
		str += ""+pageNo+"/"+totalPage+"&nbsp;";
		str += "<span>下一页</span>&nbsp;&nbsp;";
		str += "<span>末页</span>&nbsp;&nbsp;";
	}else{
		if(pageNo == "1"){
			str += "<span>首页</span>&nbsp;&nbsp;"
			str += "<span>上一页</span>&nbsp;";
		}else{
			str += "<a style='text-decoration: none' href='javascript:nextPageToFormName(1,\"" + formName + "\")'>首页</a>&nbsp;&nbsp;";
			str += "<a style='text-decoration: none' href='javascript:nextPageToFormName(\"" + prePage + "\",\"" + formName + "\")'>上一页</a>&nbsp;";
		}
		str += ""+pageNo+"/"+totalPage+"&nbsp;";
		if(pageNo == totalPage){
			str += "<span>下一页</span>&nbsp;&nbsp;";
			str += "<span>末页</span>&nbsp;&nbsp;";
		}else{
			str += "<a style='text-decoration: none' href='javascript:nextPageToFormName(\"" + nextPage + "\",\"" + formName + "\")'>下一页</a>&nbsp;&nbsp;";
			str += "<a style='text-decoration: none' href='javascript:nextPageToFormName(\"" + totalPage + "\",\"" + formName + "\")'>末页</a>&nbsp;&nbsp;";
		}
		var goPageText = formName+"_goPage";
		str += "<span>第 <input type='text' size='2' id="+goPageText+"  /> 页 <a href='javascript:goPageToFormName(\"" + totalPage + "\",\"" + formName + "\")'>跳转</a></span>";
	}
	$(str).appendTo($("#"+divId));
}
//设置值 并提交表单
function setValue(name,obj,formName){
	var value=$(obj).attr("cval");
	$("input[name='"+name+"']") .val(value);
	if(formName==null){
		formName="list_form";
	}
	var formobj=document.forms[formName];
	if(formobj!=null){
		var url = jQuery(formobj).attr("action");
		var data = jQuery(formobj).serialize();
		if(url.indexOf("?")>0){
			url +="&"+data;
		}else{
			url +="?"+data;
		}
		window.location.href=url;
	}
}

//设置值 并提交表单
function setValueForValue(name,value,formName){
	$("input[name='"+name+"']") .val(value);
	if(formName==null){
		formName="list_form";
	}
	var formobj=document.forms[formName];
	if(formobj!=null){
		var url = jQuery(formobj).attr("action");
		var data = jQuery(formobj).serialize();
		if(url.indexOf("?")>0){
			url +="&"+data;
		}else{
			url +="?"+data;
		}
		window.location.href=url;
	}

}
//设置值 不提交表单
function setValueNoForm(name,value){
	$("input[name='"+name+"']") .val(value);
}

function getParam(param){
	var url=window.location.href;
	var paramUrl = url.substr(url.indexOf("?")+1,url.length).replace("#","");
	var arrParam = paramUrl.split("&");
	for(var i = 0; i<arrParam.length; i++){
		if(arrParam[i].split("=")[0] == param){
			return arrParam[i].split("=")[1];
		}
	}
}
//如果存在 param 替换 不存在就追加
function setParam(param, value) {
	var url=window.location.href;
	setParamForUrl(param, value,url)

}
function setParamForUrl(param, value,url){
	var paramUrl = url.substr(url.indexOf("?") + 1, url.length).replace("#", "");
	var arrParam = paramUrl.split("&");
	for (var i = 0; i < arrParam.length; i++) {
		if (arrParam[i].split("=")[0] == param) {
			url = url.replace(arrParam[i], param+"="+value);
			return url;
		}
	}
	if(url.indexOf("?")>0){
		url += "&"+param+"="+value;
	}else{
		url += "?"+param+"="+value;
	}
	return url
}

function ClearForm(id) {
	var objId = document.getElementById(id);
	if (objId == undefined) {
		return;
	}
	for (var i = 0; i < objId.elements.length; i++) {
		if (objId.elements[i].type == "text") {
			objId.elements[i].value = "";
		}
		else if (objId.elements[i].type == "password") {
			objId.elements[i].value = "";
		}
		else if (objId.elements[i].type == "radio") {
			objId.elements[i].checked = false;
		}
		else if (objId.elements[i].type == "checkbox") {
			objId.elements[i].checked = false;
		}
		else if (objId.elements[i].type == "select") {
			objId.elements[i].options[0].selected = true;
		}
		else if (objId.elements[i].type == "select-multiple") {
			for (var j = 0; j < objId.elements[i].options.length; j++) {
				objId.elements[i].options[j].selected = false;
			}
		}
		else if (objId.elements[i].type == "textarea") {
			objId.elements[i].value = "";
		}
		else if (objId.elements[i].type == "hidden") {
			objId.elements[i].value = "";
		}
	}
}


/*修改状态*/
function operate(url,status,id){
	$.ajax({
		url:url,
		data:{"status":status,"ids":id},
		type:"post",
		dataType:"json",
		success:function(dataval){
			if(dataval.flag){
				alert("操作成功");
				window.location.reload();
			}else{
				alert("操作失败");
				window.location.reload();
			}
		}
	})
}

$("span[menuCode]").each(function(){
	var menuCode=$(this).attr("menuCode")
	authMenu(menuCode,$(this))

});

function authMenu(menuCode,ele){
	url=basePath+"/userMenuAction/isContainAuth"
	data="parentMenuCode"+"="+menuCode
	jQuery.ajax({type:"POST", url:url, data:data,async: false, beforeSend:function () {
	}, success:function (result) {
		if(result==true){

		}else{
			ele.text("暂无操作权限")
		}
	}, error:function (result) {
		alert("校验权限失败");
	}});
}

//重置表单
function resetForm(fromid){
	$(".reset").click(function(){
		$(':input','#'+fromid)
			.not(':button, :submit, :reset, :hidden')
			.val('')
			.removeAttr('checked')
			.removeAttr('selected');
		$('#'+fromid).submit();
	});
}
//提交表单
function commitFormByFromId(fromid){
	$(".submit").click(function(){
		$('#'+fromid).submit();
	});

}