
function simple_kindeditor(name,config){
	if (config == undefined || config == null){
		config = {'width':650};
	}
	KindEditor.ready(function(K) {
		_uploadJson = CONETXT_PATH + '/upload/ckeditorImage';
		_items = ['fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline',
			'|', 'justifyleft', 'justifycenter', 'justifyright', 'insertorderedlist',
			'insertunorderedlist', '|', 'image','flash', 'link','|','emoticons'];
		editor = K.create('textarea[name="'+name+'"]', {
			resizeType : 1,
			minWidth:config.width,
			allowImageUpload:true,
			allowFlashUpload:false,
			uploadJson:_uploadJson,
			cssData : 'body {font-size:16px;}',
			items : _items,
			afterBlur:function(){this.sync();}
		});

	});
}