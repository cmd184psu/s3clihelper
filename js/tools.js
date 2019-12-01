
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

function Render() {
  console.log("Render");

//  switch(curmode) {
//    case 0: // list bucket

    var res = config_in_mem.tools[curtool].cmd[curmode].replace("_CLI_", config_in_mem.tools[curtool].cli);
    str=res;
    res = str.replace("_MOUNTPOINT_", config_in_mem.s3api.mountpoint);
    str=res;
    res = str.replace("_BUCKET_", config_in_mem.s3api.bucket);
    str=res;
    res = str.replace("_OBJECT_", config_in_mem.s3api.objectKey);
    str=res;
    res = str.replace("_OBJECT_", config_in_mem.s3api.objectKey);
    str=res;
    res = str.replace("_S3_ENDPOINT_", config_in_mem.s3api.endpoint);

    var line2 = res;
    if(config_in_mem.tools[curtool].mount) {
      res = config_in_mem.tools[curtool].mount.replace("_CLI_", config_in_mem.tools[curtool].cli);
      str=res;
      console.log("str="+str);
      res = str.replace("_MOUNTPOINT_", config_in_mem.s3api.mountpoint);
      str=res;
      console.log("str="+str);
      res = str.replace("_BUCKET_", config_in_mem.s3api.bucket);
      str=res;
      console.log("str="+str);
      res = str.replace("_BUCKET_", config_in_mem.s3api.bucket);
      str=res;
      console.log("str="+str);
      res = str.replace("_OBJECT_", config_in_mem.s3api.objectKey);
      str=res;
      console.log("str="+str);
      res = str.replace("_OBJECT_", config_in_mem.s3api.objectKey);
      str=res;
      console.log("str="+str);
      res = str.replace("_S3_ENDPOINT_", config_in_mem.s3api.endpoint);
      str=res;

      res=str+"\n"+line2;
    }


    document.getElementById("cliArea").innerHTML = res;



  $("#credfile").text("Credentials File: "+config_in_mem.tools[curtool].credentials);
  switch(curtool) {
    case 0:
      $("#credentialArea").text("[default]\naws_access_key_id = "+config_in_mem.s3api.accessKeyId+"\naws_secret_access_key = "+config_in_mem.s3api.secretAccessKey);
    break;
    case 1:
      $("#credentialArea").text("[default]\naccess_key = "+
      config_in_mem.s3api.accessKeyId+"\nsecret_key = "+
      config_in_mem.s3api.secretAccessKey+"\nhost_base = "+
      extractHostname(config_in_mem.s3api.endpoint)+
      "\nhost_bucket = "+config_in_mem.s3api.bucket+
      "\nuse_https = false");
    break;
    case 2:
      $("#credentialArea").text(
        "%awsSecretAccessKeys = (\n\tdefault => {\n\t\tid => \'"+
        config_in_mem.s3api.accessKeyId+"\',\n\t\tkey => \'"+
        config_in_mem.s3api.secretAccessKey+"\',\n\t},\n);");
    break;
    case 3: //s3fs
    $("#credentialArea").text(config_in_mem.s3api.accessKeyId+":"+config_in_mem.s3api.secretAccessKey);
    break;

  }


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
