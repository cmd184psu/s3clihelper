
var loadajax_notloaded=true;

function onCheckConfigClick() {
	alert(JSON.stringify(config_in_mem));
}

function onBlur() {
	//this field is r/o
	
	if(config_in_mem.standalone) config_in_mem.admin.endpoint=$("#inputAdminEndpoint").val();
	//config_in_mem.admin.apiuser=$("#inputAdminApiUser").val();
	config_in_mem.admin.apiuser="sysadmin";
	//config_in_mem.admin.apipw=$("#inputAdminApiPassword").val();
	config_in_mem.admin.apipw="public";

	config_in_mem.dataowner.cuser=$("#inputDataUser").val();
	config_in_mem.dataowner.cgroup=$("#inputDataGroup").val();
	
	if(config_in_mem.standalone) config_in_mem.s3api.endpoint=$("#inputS3Endpoint").val();
	config_in_mem.s3api.accessKeyId=$("#inputAccessKey").val();
	config_in_mem.s3api.secretAccessKey=$("#inputSecretKey").val();
	config_in_mem.s3api.bucket=$("#inputBucketName").val();

	if($("#inputRegion").val()!="")
		config_in_mem.s3api.region=$("#inputRegion").val();
	if($("#inputProfile").val()!="")
		config_in_mem.s3api.profile=$("#inputProfile").val();
	if($("#inputVolume").val()!="")
		config_in_mem.s3api.volume=$("#inputVolume").val();
	else
		config_in_mem.s3api.volume=config_in_mem.s3api.bucket;

	if($("#inputStoragePolicy").val()!="")
		config_in_mem.s3api.storagePolicy=$("#inputStoragePolicy").val();

	if($("#inputStorageClass").val()!="") 
		config_in_mem.s3api.storageClass=$("#inputStorageClass").val();

	if($("#inputIAMEndpoint").val()!="") 
		config_in_mem.s3api.iamendpoint=$("#inputIAMEndpoint").val();
}

function onRefresh() {
	//if(config_in_mem.standalone) 
	$("#inputAdminEndpoint").html(config_in_mem.admin.endpoint);
	$("#inputCMCEndpoint").html(config_in_mem.admin.cmc);
	$("#inputS3Endpoint").html(config_in_mem.s3api.endpoint);
	$("#inputAccessKey").val(config_in_mem.s3api.accessKeyId);
	$("#inputSecretKey").val(config_in_mem.s3api.secretAccessKey);
	$("#inputBucketName").val(config_in_mem.s3api.bucket);
	$("#inputRegion").val(config_in_mem.s3api.region);
	$("#inputProfile").val(config_in_mem.s3api.profile);
	$("#inputVolume").val(config_in_mem.s3api.volume);
	$("#inputStoragePolicy").val(config_in_mem.s3api.storagePolicy);
	$("#inputStorageClass").val(config_in_mem.s3api.storageClass);
	$("#inputIAMEndpoint").val(config_in_mem.s3api.iamendpoint);

	$("#inputDataUser").val(config_in_mem.dataowner.cuser);
	$("#inputDataGroup").val(config_in_mem.dataowner.cgroup);

	//$("#inputAdminAuth").val(config_in_mem.admin.auth);

	if(config_in_mem.standalone) $("#inputObjectName").val(config_in_mem.s3api.objectKey);

	if(config_in_mem.standalone) return;

	
	if(loadajax_notloaded) LoadAjaxContent();
	else AdjustButtons();
}

function onClickCloseSaveLoadDialog() {
	console.log("onClickCloseSaveLoadDialog()");
	$("#saveLoadModal").hide();
}

