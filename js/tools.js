
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
  res=str.replace("_CLI_", config_in_mem.tools[curtool].cli);
  str=res;
  res=str.replace("_MOUNTPOINT_", config_in_mem.s3api.mountpoint);
  str=res;
  res=str.replace("_BUCKET_", config_in_mem.s3api.bucket);
  str=res;
  res = str.replace("_OBJECT_", config_in_mem.s3api.objectKey);
  str=res;
  res = str.replace("_S3_ENDPOINT_", config_in_mem.s3api.endpoint);
  
  
  if(config_in_mem.s3api.region==undefined) config_in_mem.s3api.region="region";
  str=res;
  res = str.replace("_REGION_", config_in_mem.s3api.region);
  
  if(config_in_mem.s3api.profile==undefined) config_in_mem.s3api.profile="default";

  str=res;
  res = str.replace("_PROFILE_", config_in_mem.s3api.profile);
  
  str=res;
  if(config_in_mem.s3api.endpoint.startsWith("https")) {
    res=str.replace("_SSL_","--no-verify-ssl");
  } else {
    res=str.replace("_SSL_","");
  }

  return res;
}

function Render() {
  console.log("Render");

//  switch(curmode) {
//    case 0: // list bucket

    var line1="";
    if(config_in_mem.tools[curtool].opts) {
      line1 = ReplaceStrings(config_in_mem.tools[curtool].opts);
    } 
    var line2 = ReplaceStrings(config_in_mem.tools[curtool].cmd[curmode]);
    

    var line3="";
    if(config_in_mem.tools[curtool].mount) {
      line3 = ReplaceStrings(config_in_mem.tools[curtool].mount);
    } 
    
    
    document.getElementById("cliArea").innerHTML = line1+"\n"+line2+"\n"+line3;



  $("#credfile").text("Credentials File: "+config_in_mem.tools[curtool].credentials);
  switch(curtool) {
    case 0:
      $("#credentialArea").text("["+config_in_mem.s3api.profile+"]\nregion="+config_in_mem.s3api.region+"\naws_access_key_id = "+config_in_mem.s3api.accessKeyId+"\naws_secret_access_key = "+config_in_mem.s3api.secretAccessKey);
    break;
    case 1:
      $("#credentialArea").text("["+config_in_mem.s3api.profile+"]\naccess_key = "+
      config_in_mem.s3api.accessKeyId+"\nsecret_key = "+
      config_in_mem.s3api.secretAccessKey+"\nhost_base = "+
      extractHostname(config_in_mem.s3api.endpoint)+
      "\nhost_bucket = "+config_in_mem.s3api.bucket+
      "\nuse_https = false");
    break;
    case 2:
      $("#credentialArea").text(
        "%awsSecretAccessKeys = (\n\t"+config_in_mem.s3api.profile+" => {\n\t\tid => \'"+
        config_in_mem.s3api.accessKeyId+"\',\n\t\tkey => \'"+
        config_in_mem.s3api.secretAccessKey+"\',\n\t},\n);");
    break;
    case 3: //s3fs
    $("#credentialArea").text(config_in_mem.s3api.accessKeyId+":"+config_in_mem.s3api.secretAccessKey);
    break;
    case 4: //splunk

      if(config_in_mem.s3api.volume==undefined) config_in_mem.s3api.volume=config_in_mem.s3api.bucket;
      $("#credentialArea").text(
"[volume:"+config_in_mem.s3api.volume+"]\nrepFactor = auto\nstorageType = remote\npath = s3://"+config_in_mem.s3api.bucket+"\n"+
"remote.s3.signature_version = v2\nremote.s3.access_key = "+config_in_mem.s3api.accessKeyId+"\n"+
"remote.s3.secret_key = "+config_in_mem.s3api.secretAccessKey+"\nremote.s3.endpoint = "+config_in_mem.s3api.endpoint+"\n\n"+

"["+config_in_mem.s3api.profile+"]\nrepFactor = auto\nremotePath = volume:"+config_in_mem.s3api.volume+"/$_index_name\n"+
"homePath = $SPLUNK_DB/$_index_name/db\ncoldPath = $SPLUNK_DB/$_index_name/colddb\nthawedPath = $SPLUNK_DB/$_index_name/thaweddb\n"+
"maxDataSize = auto\nhostlist_recency_secs = 864000"); 
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
