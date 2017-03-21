//级联下拉框
var subdictUrl="/dictionary/getSubDictList"
/**
 *
 * @param dictTypeid 数据字典类型
 * param parent 父字典类型
 * @param divid 创建下拉菜单的divid
 * @param name  表单元素名称与后台对接的表单名称
 * @param value 需要回填的值 此处为 dict.id 格式为 152
 * @param valueFiled 需要传递的值 属性
 */
function createCheckboxDefaultValue(dictTypeid,parent,divid,name,value,valueFiled){
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
                //创建本级元素
                jQuery.each(dictlist,function(a,dict){
                    if(value!=""&&value.indexOf(dict[valueFiled])>-1){
                        jQuery("<label class=\"checkbox-inline\"> <input checked  name=\""+name+"\" value=\""+dict[valueFiled]+"\"   type=\"checkbox\">"+dict['dictName']+" </label>").appendTo(jQuery("#"+divid));

                    }else {
                        jQuery("<label class=\"checkbox-inline\"> <input  name=\""+name+"\" value=\""+dict[valueFiled]+"\"   type=\"checkbox\">"+dict['dictName']+" </label>").appendTo(jQuery("#"+divid));
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
function createCheckboxDefaultValue_Invitation(dictTypeid,parent,divid,name,value,valueFiled){
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
                //创建本级元素
                jQuery.each(dictlist,function(a,dict){
                    if(value!=""&&value.indexOf(dict[valueFiled])>-1){
                        jQuery("<li class=\"toRemmber\"><a class=\"checkBox checkedBox\"></a><span>"+dict['dictName']+"</span><input type=\"checkbox\" name=\""+name+"\"  value=\""+dict[valueFiled]+"\"  checked=\"checked\"></li>").appendTo(jQuery("#"+divid));
                    }else {
                        jQuery("<li class=\"toRemmber\"><a class=\"checkBox\"></a><span>"+dict['dictName']+"</span><input type=\"checkbox\" name=\""+name+"\"  value=\""+dict[valueFiled]+"\"></li>").appendTo(jQuery("#"+divid));
                    }
                })
            }

        }
    })

}


