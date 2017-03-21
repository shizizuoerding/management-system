/**
 * Created by xsh on 2016/6/29.
 */
//密码验证
//字数设置
//function passwordLevel(password) {
//    var Modes = 0;
//    for (i = 0; i < password.length; i++) {
//        Modes |= CharMode(password.charCodeAt(i));
//    }
//    return bitTotal(Modes);
//    //CharMode函数
//    function CharMode(iN) {
//        if (iN >= 48 && iN <= 57)//数字
//            return 1;
//        if (iN >= 65 && iN <= 90) //大写字母
//            return 2;
//        if ((iN >= 97 && iN <= 122) || (iN >= 65 && iN <= 90)) //大小写
//            return 4;
//        else
//            return 8; //特殊字符
//    }
//
//    //bitTotal函数
//    function bitTotal(num) {
//        modes = 0;
//        for (i = 0; i < 4; i++) {
//            if (num & 1) modes++;
//            num >>>= 1;
//        }
//        return modes;
//    }
//}
var reg =/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
////密码验证: 添加验证方法：至少包含两种规则
jQuery.validator.addMethod("strongPsw", function(value, element) {
    if(reg.test(value)){return true;}
}, "请输入由字母、数字两种规则组成的8~16位密码");

//邮箱验证
jQuery.validator.addMethod("email", function (value, element) {
    var email= /^[a-z0-9._%-]+@([a-z0-9-]+\.)+[a-z]{2,4}$/;
    return this.optional(element) || (email.test(value));
}, "请输入正确的邮箱");

//手机验证
jQuery.validator.addMethod("phone", function (value, element) {
    var phone= /^[1][3|4|5|7|8][\d]{9}$/i;
    return this.optional(element) || (phone.test(value));
}, "请输入正确的手机号");

//座机验证
jQuery.validator.addMethod("telephone", function (value, element) {
    var telephone= /^0[0-9]{2,3}[0-9]{7,8}$/;
    return this.optional(element) || (telephone.test(value));
}, "请输入正确的座机号");

//验证码验证
jQuery.validator.addMethod("Strongverification", function (value, element) {
    var Strongverification= /^[0-9]\d{3}$/;
    return this.optional(element) || (Strongverification.test(value));
}, "请输入正确的验证码");

//邮政编码验证，首位不为0
jQuery.validator.addMethod("StrongPostcode", function (value, element) {
    var StrongPostcode= /^[1-9][0-9]{5}$/;
    return this.optional(element) || (StrongPostcode.test(value));
}, "请输入正确的邮政编码");

//营业执照验证，15位
jQuery.validator.addMethod("StrongIdentifier", function (value, element) {
    var StrongIdentifier= /^\d{15}\b/;
    return this.optional(element) || (StrongIdentifier.test(value));
}, "请输入正确的企业编码");

//验证中文/^[a-zA-Z \s]{2,20}$/
$.validator.addMethod('ZH',function(value,element){
    var name = /^[\u4e00-\u9fa5]+$/;
    return this.optional(element) || (name.test(value));
},'');

//验证英文
$.validator.addMethod('EN',function(value,element){
    var EN = /^[a-zA-Z \s]+$/;
    return this.optional(element) || (EN.test(value));
},'');

//验证身份证
$.validator.addMethod('StrongIDcard',function(value,element){
    var StrongIDcard = /^([1-9]{1}[0-9]{16}[0-9Xx]{1})|([0-9]{15})$/;
    return this.optional(element) || (StrongIDcard.test(value));
},'');

//验证银行卡号
$.validator.addMethod('StrongbankCard',function(value,element){
    var StrongbankCard = /^\d{19}$/;
    return this.optional(element) || (StrongbankCard.test(value));
},'');

//验证6位支付密码
$.validator.addMethod('StrongPayPass',function(value,element){
    var StrongPayPass = /^\d{6}$/;
    return this.optional(element) || (StrongPayPass.test(value));
},'');

//登录用户的验证
$.validator.addMethod('userName',function(value,element){
    var userName = /^[a-zA-z][a-zA-Z0-9_]{2,9}$/;
    return this.optional(element) || (userName.test(value));
},'');