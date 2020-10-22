
function extractHostname(url) {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("//") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
}

function ReplaceStrings(content) {
  var res=content;
  var str=res;
  res=str.replaceAll("_CLI_", config_in_mem.tools[curtool].cli);
  str=res;
  res=str.replaceAll("_MOUNTPOINT_", config_in_mem.s3api.mountpoint);
  str=res;
  res=str.replaceAll("_BUCKET_", config_in_mem.s3api.bucket);
  str=res;
  res = str.replaceAll("_OBJECT_", config_in_mem.s3api.objectKey);
  str=res;
  res = str.replaceAll("_S3_ENDPOINT_", config_in_mem.s3api.endpoint);
  str=res;
  res = str.replaceAll("_S3_ACCESS_KEY_ID_", config_in_mem.s3api.accessKeyId);
  str=res;
  res = str.replaceAll("_S3_SECRET_ACCESS_KEY_", config_in_mem.s3api.secretAccessKey);
  
  
  if(config_in_mem.s3api.region==undefined) config_in_mem.s3api.region="region";
  str=res;
  res = str.replaceAll("_REGION_", config_in_mem.s3api.region);
  
  if(config_in_mem.s3api.profile==undefined) config_in_mem.s3api.profile="default";

  str=res;
  res = str.replaceAll("_PROFILE_", config_in_mem.s3api.profile);
  
  str=res;
  res = str.replaceAll("_EXTRACTED_HOSTNAME_", extractHostname(config_in_mem.s3api.endpoint));

  str=res;
  if(config_in_mem.s3api.storagePolicy==undefined) config_in_mem.s3api.storagePolicy="1bc90238f9f11cb32f5e4e901675d50b";
  res = str.replaceAll("_STORAGE_POLICY_", config_in_mem.s3api.storagePolicy);

  str=res;
  if(config_in_mem.s3api.endpoint.startsWith("https")) {
    res=str.replaceAll("_SSL_","--no-verify-ssl");
  } else {
    res=str.replaceAll("_SSL_","");
  }

  str=res;
  res = str.replaceAll("_S3_AKI_B64_", btoa(config_in_mem.s3api.accessKeyId));
  str=res;
  res = str.replaceAll("_S3_SAK_B64_", btoa(config_in_mem.s3api.secretAccessKey));
  
  str=res;

  if(config_in_mem.s3api.storageClass==undefined) config_in_mem.s3api.storageClass="cloudian-greenfields";
  res = str.replaceAll("_STORAGE_CLASS_", config_in_mem.s3api.storageClass);
  
  str=res;
  res = str.replaceAll("_IAM_ENDPOINT_", config_in_mem.s3api.iamendpoint);


  
  return res;
}

function Render() {
  console.log("Render");
  var line1="";
  if(config_in_mem.tools[curtool].opts) {
    line1 = ReplaceStrings(config_in_mem.tools[curtool].opts);
  } 
  var line2="";
  if(config_in_mem.tools[curtool].mount) {
    line2 = ReplaceStrings(config_in_mem.tools[curtool].mount);
  } 
  var line3 = ReplaceStrings(config_in_mem.tools[curtool].cmd[curmode]);
    
  document.getElementById("cliArea").innerHTML = line1+"\n"+line2+"\n"+line3;
  
  $("#credfile").text("Credentials File: "+config_in_mem.tools[curtool].credentials);
  
  if(config_in_mem.tools[curtool].configContent!=undefined) $("#credentialArea").text(ReplaceStrings(config_in_mem.tools[curtool].configContent));
  else $("#credentialArea").text("Coming soon");
  
}

function SelectTool(st) {
  curtool=st;
  console.log("select tool: "+curtool);
  $('#CurrentTool').text(config_in_mem.tools[curtool].label);

  UpdateActions();

	//$('#docButton').
	document.getElementById('docButton').setAttribute( "onClick", "window.open(\'"+config_in_mem.tools[curtool].docURL+"\')");
}

function SelectAction(sm) {
    curmode=sm;
    console.log("select mode: "+sm);
    if(curtool>-1) {
      console.log("setting text to "+config_in_mem.tools[curtool].action[curmode]);
      $('#CurrentAction').text(config_in_mem.tools[curtool].action[curmode]);
    }
    console.log("curtool="+curtool);
    Render();
}

function CopyToClipBoard_inner(id) {
  console.log("id="+id);
  var c=document.getElementById(id);
  c.select();
//  var x=document.getElementById('hiddentext');
//  x.style.display="block";

  c.select();
  try {
    var successful = document.execCommand('copy')
    var msg = successful ? 'successfully' : 'unsuccessfully'
    alert('Copied!');
  } catch(err) {
    alert('Falied to copy.');
  }
//  x.style.display="none";
}

function CopyToClipBoardCLIA() {
  CopyToClipBoard_inner('cliArea');
}

function CopyToClipBoardCA() {
  CopyToClipBoard_inner('credentialArea');
}

function UpdateActions() {
  var newhtml="";
  for(var i=0; i<config_in_mem.tools[curtool].action.length; i++) {
  	var newhtml=newhtml+"<a href=\"#\" onclick=\"SelectAction("+i+")\">"+config_in_mem.tools[curtool].action[i]+"</a>";
   }
  $("#dropdownActions").html(newhtml);
}
