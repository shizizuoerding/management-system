//级联下拉框
var subdictUrl="/dictionary/getSubDictList"
/**
 *
 * @param dictTypeid 数据字典类型
 * @param divid 创建下拉菜单的divid
 * @param name  表单元素名称与后台对接的表单名称
 * @param value 需要回填的值 此处为 dict.seqNo 格式为 .152.160.163.
 * @param exploded 展开下一项
 */
function cascadeCombobox(dictTypeid,divid,name,value,exploded){
    //创建值隐藏域
    $("<input type=\"hidden\" value='' name="+name+">").appendTo($("#"+divid));
    var  curl=subdictUrl+"?dictTypeid="+dictTypeid;
    if(value==null||value==""){
        var comDiv=divid+"_"+0;
        comboboxForUrl(dictTypeid,curl,divid,comDiv,name,"",exploded);
    }else{
        //数据字典层级用的是 .1.2.3.的形式
        var vals=value.split(".");
        var j=0;
        for(var i=0;i<vals.length;i++){
            if(vals[i]==""){
                continue;
            }
            var   forcurl=curl;
            if(j>0){
                forcurl+="&parentDictId="+vals[i-1];
            }
            var comDiv=divid+"_"+j;
            //
            comboboxForUrl(dictTypeid,forcurl,divid,comDiv,name,vals[i],exploded);
            j=j+1;
        }
    }
}
function changeCombobox(dictTypeid,val,divid,changeId,name,exploded){

    //查找下级元素 以及下下级元素 如果存在清除子元素
    var inputname=changeId.split("_")[0];
    //设置选中的值
    $("input[name='"+name+"']").val(val);
    var changeIndex=changeId.split("_")[1];
    for(var i=1;i<=3;i++){
        var nextId=parseInt(changeIndex)+i;
        var subid=inputname+"_"+nextId;
        $("#"+subid).remove();
    }
    var  curl=subdictUrl+"?dictTypeid="+dictTypeid;
    curl= curl+"&parentDictId="+val;
    var nextId=parseInt(changeIndex)+1;
    var subid=inputname+"_"+nextId;
    comboboxForUrl(dictTypeid,curl,divid,subid,name,"",exploded);
}
//基于请求下拉框
function comboboxForUrl(dictTypeid,url,divid,id,name,value,exploded){
    jQuery.ajax({
        type:"post",
        url : url,
        async:false,
        success:function(dictlist){
            if(dictlist!=null&&dictlist.length!=0){
                var selectEle = jQuery("<select id="+id+" style=\"width:120px;\"></select>").appendTo(jQuery("#" + divid));
                //创建本级元素
                jQuery.each(dictlist,function(a,dict){
                    if(value!=""&&value==dict['id']){
                        jQuery("<option selected='selected' style=\"width:120px;\"></option>").val(dict['id']).text(dict['dictName']).appendTo(jQuery(selectEle));
                        $("#"+divid).find("input[name='"+name+"']").val(value);
                    }else {
                        jQuery("<option></option>").val(dict['id']).text(dict['dictName']).appendTo(jQuery(selectEle));
                    }
                })
                //默认值等于第一项的值
                if(value==null||value==""){
                    var val= dictlist[0]['id'];
                    $("input[name='"+name+"']").val(val);
                }
                //如果只有一项 直接显示下级菜单
                if(((value==null||value=="")&&(dictlist.length==1||exploded!=null))){
                    var firstDict=dictlist[0];
                    var parentid= firstDict['id'];
                    var changeId=id;
                    changeCombobox(dictTypeid,parentid,divid,changeId,name,exploded);
                }
                $("#"+id).change(function(){
                    var parentid= $(this).val();
                    var changeId=$(this).attr("id");
                    changeCombobox(dictTypeid,parentid,divid,changeId,name,exploded);
                })
            }

        }
    })

}


/**
 *
 * @param dictTypeid 数据字典类型
 * param parent 父字典类型
 * @param divid 创建下拉菜单的divid
 * @param name  表单元素名称与后台对接的表单名称
 * @param value 需要回填的值 此处为 dict.id 格式为 152
 * @param valueFiled 需要传递的值 属性
 *@param changeEven 切换事件
 */
function createCombobox(dictTypeid,parent,divid,name,value,valueFiled,changeEven){
    var  curl=subdictUrl+"?dictTypeid="+dictTypeid;
            if(parent!=null){
                forcurl+="&parentDictId="+parent;
            }
    //创建本级元素
    jQuery.ajax({
        type:"post",
        url : curl,
        async:false,
        success:function(dictlist){
            if(dictlist!=null&&dictlist.length!=0){
                var selectEle
                if(changeEven!=null&&changeEven!=undefined){
                    selectEle = jQuery("<select name='"+name+"'   onchange='"+changeEven+"()'></select>").appendTo(jQuery("#" + divid));
                }else{
                     selectEle = jQuery("<select name='"+name+"'  ></select>").appendTo(jQuery("#" + divid));
                }

              /*  jQuery("<option selected='selected' >请选择</option>").appendTo(jQuery(selectEle));*/
                //创建本级元素
                jQuery.each(dictlist,function(a,dict){
                    if(value!=""&&value==dict[valueFiled]){
                        jQuery("<option selected='selected' ></option>").val(dict[valueFiled]).text(dict['dictName']).appendTo(jQuery(selectEle));

                    }else {
                        jQuery("<option></option>").val(dict[valueFiled]).text(dict['dictName']).appendTo(jQuery(selectEle));
                    }
                })
            }

        }
    })

}

function createCombobox2(dictTypeid,parent,divid,name,value,valueFiled,changeEven){
    var  curl=subdictUrl+"?dictTypeid="+dictTypeid;
    if(parent!=null){
        forcurl+="&parentDictId="+parent;
    }
    //创建本级元素
    jQuery.ajax({
        type:"post",
        url : curl,
        async:false,
        success:function(dictlist){
            if(dictlist!=null&&dictlist.length!=0){
                var selectEle
                if(changeEven!=null&&changeEven!=undefined){
                    selectEle = jQuery("<select name='"+name+"'   onchange='"+changeEven+"'></select>").appendTo(jQuery("#" + divid));
                }else{
                    selectEle = jQuery("<select name='"+name+"'  ></select>").appendTo(jQuery("#" + divid));
                }

                /*  jQuery("<option selected='selected' >请选择</option>").appendTo(jQuery(selectEle));*/
                //创建本级元素
                jQuery.each(dictlist,function(a,dict){
                    if(value!=""&&value==dict[valueFiled]){
                        jQuery("<option selected='selected' ></option>").val(dict[valueFiled]).text(dict['dictName']).appendTo(jQuery(selectEle));

                    }else {
                        jQuery("<option></option>").val(dict[valueFiled]).text(dict['dictName']).appendTo(jQuery(selectEle));
                    }
                })
            }

        }
    })

}

function createCombobox3(dictTypeid,parent,divid,name,value,valueFiled,changeEven){
    var  curl=subdictUrl+"?dictTypeid="+dictTypeid;
    if(parent!=null){
        forcurl+="&parentDictId="+parent;
    }
    //创建本级元素
    jQuery.ajax({
        type:"post",
        url : curl,
        async:false,
        success:function(dictlist){
            if(dictlist!=null&&dictlist.length!=0){
                var selectEle
                if(changeEven!=null&&changeEven!=undefined){
                    selectEle = jQuery("<select name='"+name+"'   onchange='"+changeEven+"()'></select>").appendTo(jQuery("#" + divid));
                }else{
                    selectEle = jQuery("<select name='"+name+"'  ></select>").appendTo(jQuery("#" + divid));
                }

                jQuery("<option selected='selected' value='' >请选择</option>").appendTo(jQuery(selectEle));
                //创建本级元素
                jQuery.each(dictlist,function(a,dict){
                    if(value!=""&&value==dict[valueFiled]){
                        jQuery("<option selected='selected' ></option>").val(dict[valueFiled]).text(dict['dictName']).appendTo(jQuery(selectEle));

                    }else {
                        jQuery("<option></option>").val(dict[valueFiled]).text(dict['dictName']).appendTo(jQuery(selectEle));
                    }
                })
            }

        }
    })

}

/**
 *
 * @param dictTypeid 数据字典类型
 * param parent 父字典类型
 * @param divid 创建下拉菜单的divid
 * @param name  表单元素名称与后台对接的表单名称
 * @param value 需要回填的值 此处为 dict.id 格式为 152
 * @param valueFiled 需要传递的值 属性
 */
function createComboboxDefaultValue(dictTypeid,parent,divid,name,value,valueFiled){
    var  curl=subdictUrl+"?dictTypeid="+dictTypeid;
    if(parent!=null){
        forcurl+="&parentDictId="+parent;
    }
    //创建本级元素
    jQuery.ajax({
        type:"post",
        url : curl,
        async:false,
        success:function(dictlist){
            if(dictlist!=null&&dictlist.length!=0){
                var selectEle = jQuery("<select name='"+name+"'  ></select>").appendTo(jQuery("#" + divid));
                 //jQuery("<option selected='selected'  value=''>Please select</option>").appendTo(jQuery(selectEle));
                //创建本级元素
                jQuery.each(dictlist,function(a,dict){
                    if(value!=""&&value==dict[valueFiled]){
                        jQuery("<option selected='selected' ></option>").val(dict[valueFiled]).text(dict['dictName']).appendTo(jQuery(selectEle));

                    }else {
                        jQuery("<option></option>").val(dict[valueFiled]).text(dict['dictName']).appendTo(jQuery(selectEle));
                    }
                })
            }

        }
    })

}


