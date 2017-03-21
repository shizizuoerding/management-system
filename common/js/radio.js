//var subdictUrl="/dictionary/getSubDictList"
/**
 *
 * @param dictTypeid 数据字典类型
 * @param parent 父字典类型
 * @param divid 创建下拉菜单的divid
 * @param name  表单元素名称与后台对接的表单名称
 * @param value 需要回填的值 此处为 dict.id 格式为 152
 * @param valueFiled 需要传递的值 属性
 * @param enterpriseNatureId 根据公司类型找出对应的贸易类型（贸易类型处用）
 */
function createRadio(dictTypeid,parent,divid,name,value,valueFiled,changeFunName,subdictUrl){
    //级联下拉框
    var  curl=basePath+subdictUrl+"?dictTypeid="+dictTypeid;
    var dd = 0;
    var dictId="dictId";
    if(parent!=null){
        curl+="&parentDictId="+parent;
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
                    if(value!=null&&value!=""&&value.indexOf(dict[valueFiled])>-1){
                        var  radioinput="";
                        //radioinput="<input  class=\"cbr-replaced \" checked   onchange=\""+changeFunName+"\"  type=\"radio\" name=\""+name+"\" value=\""+dict[valueFiled]+"\" />";
                            //radioinput="<input  class=\"cbr-replaced\" checked  type=\"radio\" name=\""+name+"\" value=\""+dict[valueFiled]+"\" />";
                            radioinput = "<div class=\"cbr-replaced c-check chk\"><input value=\""+dict[valueFiled]+"\" dictId=\""+dict[dictId]+"\" type=\"radio\" name=\""+name+"\" class=\"cbr text-file\" checked >"
                            +"</div>"

                        //jQuery("<label class=\"radio-inline\"> <input checked  name=\""+name+"\" value=\""+dict[valueFiled]+"\"   type=\"radio\">"+dict['dictName']+" </label>").appendTo(jQuery("#"+divid));
                        jQuery(
                            "<div class=\"inputGroup\">"
                        +"<div class=\"radioBOX\">"
                        + radioinput
                        +"<span>"+dict['dictName']+"</span>"
                        +"</div>"
                        +"</div>"
                        ).appendTo(jQuery("#"+divid));
                    }else {

                        var  radioinput="";
                        //radioinput="<input  class=\"cbr-replaced\" type=\"radio\" name=\""+name+"\" value=\""+dict[valueFiled]+"\" />";
                            radioinput = "<div class=\"cbr-replaced c-check\"><input value=\""+dict[valueFiled]+"\" dictId=\""+dict[dictId]+"\" type=\"radio\" name=\""+name+"\" class=\"cbr text-file\">"
                            +"</div>"
                        //}
                        //jQuery("<label class=\"radio-inline\"> <input  name=\""+name+"\" value=\""+dict[valueFiled]+"\"   type=\"radio\">"+dict['dictName']+" </label>").appendTo(jQuery("#"+divid));
                        jQuery(
                            "<div class=\"inputGroup\">"
                        +"<div class=\"radioBOX\">"
                        + radioinput
                        +"<span >"+dict['dictName']+"</span>"
                        +"</div>"
                        +"</div>"
                        ).appendTo(jQuery("#"+divid));
                    }
                    //注册时默认第一个选中
                    console.log('value----------'+value);
                    if(value==null||value==""){
                        $(".company-type").find('input[type="radio"]').eq(0).attr('checked',true);
                        $(".company-type").find('.cbr-replaced').eq(0).addClass('chk');

                        $(".trade-status").find('input[type="radio"]').eq(0).attr('checked',true);
                        $(".trade-status").find('.cbr-replaced').removeClass('chk').eq(0).addClass('chk');
                    }
                });
            }
        }
    })
}


