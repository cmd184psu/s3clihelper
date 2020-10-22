
var loadajax_notloaded=true;

function LoadFirstCloudianIndex() {
	var something="";
	$.get("/search/_cat/indices?v",something, function(result){
		var allTextLines = result.split(/\r\n|\n/);
		for (var i=0; i<allTextLines.length; i++) {
			//console.log(i+": "+allTextLines[i]);
			if(allTextLines[i].includes("cloudian-"))
				 $("#inputSearchIndex").val(allTextLines[i].split('\ ')[4]);
		} //end for
	}); // end of get
} //end of document.ready function

function onReLoadConfigClick() {

	$("#saveLoadModal").show();
	$("#saveload-content-changeme").html("<strong>Loading Configuration....</strong>");

	$('#saveButton').removeAttr("disabled");
	$.getJSON("/config","",function(result) {
		console.log(JSON.stringify(result));
		config_in_mem=result;
		onRefresh();
		$("#saveload-content-changeme").html("<strong>Loaded.</strong>");
		if(config_in_mem.advanced) {
			console.log("advanced: true");
			$("#showAdvancedButton").show();
		} else {
			console.log("advanced: false");
		}

		setTimeout(function() { onClickCloseSaveLoadDialog() }, SAVE_LOAD_DIALOG_DELAY); //done
		
		//show and hide exercises based on result.ex*		
	});
}

function onSaveConfigClick() {
	console.log("about to save file:");
	console.log(config_in_mem);
	$("#saveLoadModal").show();
	$("#saveload-content-changeme").html("<strong>Saving Configuration....</strong>");

	onBlur();

	$.ajax({
		url: '/config/',
		type: 'post',
		dataType: 'text',
		contentType: 'application/json',
		success: function (data) {
			console.log(JSON.stringify(data));
			//alert("saved!");
			
			$("#saveload-content-changeme").html("<strong>Saved</strong>");
			
			setTimeout(function() { onClickCloseSaveLoadDialog() }, SAVE_LOAD_DIALOG_DELAY); //done
        },
        data: JSON.stringify(config_in_mem),
        error: function(data){
        alert('error');
        	console.log(JSON.stringify(data,null,3));
    }

    }).done(function(data) {
    		$("#saveload-content-changeme").html("<strong>Saved</strong>");
			
			setTimeout(function() { onClickCloseSaveLoadDialog() }, SAVE_LOAD_DIALOG_DELAY); //done
    });
}

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
	//config_in_mem.admin.auth=$("#inputAdminAuth").val(); 
	if(config_in_mem.standalone) config_in_mem.s3api.objectKey=$("#inputObjectName").val();
		
	if(config_in_mem.standalone==undefined || !config_in_mem.standalone) {
		for(var i=0; i<config_in_mem.chapters.length; i++) {
			config_in_mem.chapters[i].enabled=$("#item"+i+"Enabled").is(':checked');
			config_in_mem.chapters[i].qrlink=$("#inputItem"+i+"QRLink").val();
		}	
	}
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

	$("#inputDataUser").val(config_in_mem.dataowner.cuser);
	$("#inputDataGroup").val(config_in_mem.dataowner.cgroup);

	//$("#inputAdminAuth").val(config_in_mem.admin.auth);

	if(config_in_mem.standalone) $("#inputObjectName").val(config_in_mem.s3api.objectKey);

	if(config_in_mem.standalone) return;

	var i=0;
	for(i=0; i<config_in_mem.chapters.length; i++) {
		$("#item"+i+"Enabled").prop( "checked", config_in_mem.chapters[i].enabled );
		$("#inputItem"+i+"QRLink").val( config_in_mem.chapters[i].qrlink );
	}	

	if(config_in_mem.chapters[0].enabled) {
		$("#item0area").hide();
	} else {
		redrawQrCode(config_in_mem.chapters[0].qrlink, document.getElementById("qrcode-canvas0"));
		$("#item0qrarea").attr("onclick","window.open(config_in_mem.chapters[0].qrlink, '_blank')");
	}
	var done=false;
	for(i=1; i<config_in_mem.chapters.length; i++) {
		if(config_in_mem.chapters[i-1].enabled && !config_in_mem.chapters[i].enabled && !done) {
			console.log("about to show area "+i);
			$("#item"+i+"area").show();
			console.log("setting current tab text to Chapter "+i);
			
			redrawQrCode(config_in_mem.chapters[i].qrlink, document.getElementById("qrcode-canvas"+i));			
			//document.getElementById("qrlink"+i).innerText=config_in_mem.chapters[i].qrlink;
			//$("#qrlink"+i).attr("href",config_in_mem.chapters[i].qrlink);
			$("#item"+i+"qrarea").attr("onclick","window.open(config_in_mem.chapters["+i+"].qrlink, '_blank')");
			
			if(i==2 && $("#versionedObject").val()!=undefined) GetObjectInTextArea(config_in_mem.s3api.bucket+"/"+$("#versionedObject").val(), "#versionedObjectArea");
			
			done=true;
		} else {
			console.log("about to hide area "+i);
			$("#item"+i+"area").hide();
		}
	}	
	
	if(loadajax_notloaded) LoadAjaxContent();
	else AdjustButtons();
}

function onTest() {
	config_in_mem.chapters[0].enabled=true;
	console.log(JSON.stringify(config_in_mem));
}

// ---- QR Functions ----

function redrawQrCode(link, canvas) {
	// Show/hide rows based on bitmap/vector image output
	var bitmapOutput = true;//document.getElementById("output-format-bitmap").checked;
	var scaleRow_val = 8; //document.getElementById("scale-row");

	// Get form inputs and compute QR Code
	var ecl = qrcodegen.QrCode.Ecc.HIGH; //getInputErrorCorrectionLevel();
	//var text = "http://www.google.com"; // document.getElementById("text-input").value;
	var segs = qrcodegen.QrSegment.makeSegments(link);
	var minVer = 1; //parseInt(document.getElementById("version-min-input").value, 10);
	var maxVer = 40; //parseInt(document.getElementById("version-max-input").value, 10);
	var mask = -1; //parseInt(document.getElementById("mask-input").value, 10);
	var boostEcc = true; // document.getElementById("boost-ecc-input").checked;
	var qr = qrcodegen.QrCode.encodeSegments(segs, ecl, minVer, maxVer, mask, boostEcc);
	
	// Draw image output
	var border =  4; //parseInt(document.getElementById("border-input").value, 10);
	var scale = 12; //parseInt(document.getElementById("scale-input").value, 10);
	qr.drawCanvas(scale, border, canvas);
}

function SuccessTrigger(thisitem) {
	console.log("SuccessTrigger("+thisitem+")");
	
	console.log("showing area: "+(thisitem-1));
	$("#item"+(thisitem-1)+"qrarea").show();
	$("#checkButton").hide();
	setTimeout(function() { //done
		$("#nextButton").show();
		$("#nextButton").attr("onclick","onClickStoryAdvance("+thisitem+")");
		$("#checkButton").attr("onclick","CheckTrigger("+thisitem+")");
	}, NEXT_BUTTON_DELAY);
}

function onClickStoryAdvance(thisitem) {
	console.log("onClickStoryAdvance("+thisitem+")");
	console.log("setting enabled on "+thisitem);

	if(thisitem!=0) config_in_mem.chapters[thisitem-1].enabled=true;
	onRefresh();
	onSaveConfigClick();
	console.log("onclick="+$("#nextButton").attr("onclick"));
	$("#nextButton").attr("onclick","onClickStoryAdvance("+(thisitem+1)+")");
	console.log("onclick="+$("#nextButton").attr("onclick"));
	$("#nextButton").hide();
	if(config_in_mem.chapters[thisitem+1]!=undefined) {
		//console.log("i="+thisitem+" and chapters["+(thisitem+1)+"]="+JSON.stringify(config_in_mem.chapters[thisitem+1],null,3));

		//$("#checkButton").attr("onclick","CheckTrigger("+thisitem+")");

		if(thisitem!=1) $("#checkButton").show();
	} else {
		$("#checkButton").hide();
	}
	
	
	
}	

function AdjustButtons() {
	var len=config_in_mem.chapters.length;

	//welcome state
	if(!config_in_mem.chapters[0].enabled) {
		//setup check button for next chapter
		$("#checkButton").attr("onclick","CheckTrigger(1)");
		$("#nextButton").attr("onclick","onClickStoryAdvance(1)");
		$("#nextButton").show();
		$("#checkButton").hide();
		
		$("#currentTab").html(config_in_mem.chapters[0].label);
		
	} else if(config_in_mem.chapters[len-2].enabled) { //end game
		//$("#checkButton").attr("onclick","CheckTrigger(1)");
		//$("#nextButton").attr("onclick","onClickStoryAdvance(1)");
		$("#nextButton").hide();
		$("#checkButton").hide();
		$("#currentTab").html(config_in_mem.chapters[len-1].label);
		
	} else {
	
	
		//can't do it here
		//GetObjectInTextArea(config_in_mem.s3api.bucket+"/"+$("#versionedObject").val(), "#versionedObjectArea");
		var done=false;
		for(var i=1; i<len-1; i++) {
			if(!config_in_mem.chapters[i].enabled && config_in_mem.chapters[i-1].enabled && !done) {
				$("#checkButton").attr("onclick","CheckTrigger("+i+")");
				$("#nextButton").attr("onclick","onClickStoryAdvance("+(i+1)+")");
				$("#nextButton").hide();
				if(config_in_mem.chapters[i+1]!=undefined) {
					console.log("i="+i+" and chapters["+(i+1)+"]="+JSON.stringify(config_in_mem.chapters[i+1],null,3));
					$("#checkButton").show();
				} else {
					$("#checkButton").hide();
				}
				$("#currentTab").html(config_in_mem.chapters[i].label);
				done=true;
			} 
		}		
	}
}

function LoadAjaxContent() {

	$("#item0area_inner").load("welcome.html");
	$("#item7area_inner").load("end.html");
	
	//idea #1: works but horribly inefficient
	// $("#item1area_inner").load("chapter1.html",function() { Chapter1_init(); 
// 		$("#item2area_inner").load("chapter2.html",function() { Chapter2_init(); 
// 			$("#item3area_inner").load("chapter3.html",function() { Chapter3_init(); 
// 				$("#item4area_inner").load("chapter4.html",function() { Chapter4_init(); 
// 					$("#item5area_inner").load("chapter5.html",function() { Chapter5_init(); 
// 						$("#item6area_inner").load("chapter6.html",function() { Chapter6_init(); 
// 					
// 					
// 							AdjustButtons();
// 						});
// 					});
// 				});
// 			});
// 		});
// 	});
	
	//idea #2: does not work
// 	for(var i=1; i<config_in_mem.chapters.length-1; i++) {
// 		$("#item"+i+"area_inner").load("chapter"+i+".html");
// 
// 	}
// 	Chapter1_init(); 
// 	Chapter2_init(); 
// 	Chapter3_init();
// 	Chapter4_init();
// 	Chapter5_init();
// 	Chapter6_init(); 
// 	AdjustButtons();
	
	//idea #3: try this; won't work because of chapter 2
	$("#item1area_inner").load("chapter1.html",function() { Chapter1_init(); });
	$("#item2area_inner").load("chapter2.html",function() { Chapter2_init(); });
	$("#item3area_inner").load("chapter3.html",function() { Chapter3_init(); });
	$("#item4area_inner").load("chapter4.html",function() { Chapter4_init(); });
	$("#item5area_inner").load("chapter5.html",function() { Chapter5_init(); });
	$("#item6area_inner").load("chapter6.html",function() { Chapter6_init(); });

	AdjustButtons();
	   
	   
	loadajax_notloaded=false;
}

//   "chapters": [
//     {
//       "enabled": true,
//       "qrlink": "http://www.google.com",
//       "label": "Welcome"
//     },
//     {
//       "enabled": true,
//       "qrlink": "http://www.bing.com",
//       "label": "Chapter 1: Administration",
//        "triggers": [
// { "tag": 1, "label": "Check for group existence", "url": "/trigger/ex1A", "complete": false, "success": false },
// { "tag": 2, "label": "Check for user existence", "url": "/trigger/ex1B", "complete": false, "success": false },
// { "tag": 3, "label": "Check for bucket existence", "url": "/trigger/ex1C", "complete": false, "success": false }
// ]
//     },


function CheckTrigger(thistrigger) {
	console.log("CheckTrigger("+thistrigger+")");
	//kick off array of triggers
	var i=0;
// 	console.log("===============");
// 	console.log(JSON.stringify(triggerList,null,3));
// 	console.log("================");
// 	console.log(JSON.stringify(config_in_mem.chapters[thistrigger],null,2));
	
	console.log("clearing out modal table");
	$("#modal-table").html("<tbody></tbody>");
	
	
	console.log("length="+config_in_mem.chapters[thistrigger].triggers.length);
	
	//reset triggers and table
	for( i=0; i<config_in_mem.chapters[thistrigger].triggers.length; i++) {
		config_in_mem.chapters[thistrigger].triggers[i].complete=false;
		$('#modal-table').find('tbody:last').append("<tr><td><div id=\"mt"+i+"\"><i class=\"fa fa-gear fa-spin\" style=\"font-size:24px\"></i></div></td><td>"+config_in_mem.chapters[thistrigger].triggers[i].label+"</td>");	
	}
	
	
	for( i=0; i<config_in_mem.chapters[thistrigger].triggers.length; i++) {
		url=config_in_mem.chapters[thistrigger].triggers[i].url+"?tag="+i;
		
		
//		try {
			if(url.length<7 && config_in_mem.chapters[thistrigger].triggers[i].callback!=undefined) {
				console.log("calling call back function... maybe");
				console.log("config_in_mem.chapters["+thistrigger+"].triggers["+i+"].callback()="+config_in_mem.chapters[thistrigger].triggers[i].callback);
				
				
				//ChapeterCallbacks(thistrigger,config_in_mem.chapters[thistrigger].triggers[i].callback);
				
				
				var fn = window[config_in_mem.chapters[thistrigger].triggers[i].callback];

				// is object a function?
				if (typeof fn === "function") {
					console.log("calling function "+config_in_mem.chapters[thistrigger].triggers[i].callback);
				
					fn();
				}	
				else console.log("not a function! "+config_in_mem.chapters[thistrigger].triggers[i].callback);
				
				
				
			} else {	
				console.log("url="+url);
				if(config_in_mem.chapters[thistrigger].triggers[i].params==undefined) config_in_mem.chapters[thistrigger].triggers[i].params=null;
			
				console.log("config_in_mem.chapters["+thistrigger+"].triggers["+i+"].params="+JSON.stringify(config_in_mem.chapters[thistrigger].triggers[i].params,null,3));
			
			
				$.getJSON(url,config_in_mem.chapters[thistrigger].triggers[i].params,function(data) {
					console.log("GET "+url);
					if(data.success) {
						console.log("success for "+thistrigger+":"+data.tag);
						$("#mt"+data.tag).html('&#10004;'); // check mark
				
						config_in_mem.chapters[thistrigger].triggers[data.tag].complete=true;
						config_in_mem.chapters[thistrigger].triggers[data.tag].success=true;
				
					} else {
						$("#mt"+data.tag).html('&#10008;'); //X
						config_in_mem.chapters[thistrigger].triggers[data.tag].complete=true;
						config_in_mem.chapters[thistrigger].triggers[data.tag].success=false;
					}
			
				}).fail(function(d) {
		
					alert("Trigger server is not running or broken; call Administrator!");
				});
			}
// 		} catch(error) {
// 			$("#mt"+data.tag).html('&#10008;'); //X
// 			config_in_mem.chapters[thistrigger].triggers[data.tag].complete=true;
// 		}
	}	
	
	document.getElementById("myModal").style.display = "block";
	setTimeout(CheckTrigger2(thistrigger),TRIGGER_RECHECK_DELAY); //done
}

function CheckTrigger2(thistrigger) {
	console.log("fire checkTrigger2...)");
	var success_quit=true;
	var complete_quit=true;
	

	complete_quit=true;
	
	console.log("CheckTrigger2("+thistrigger+")");
	
	console.log("looking at "+i+" to length="+config_in_mem.chapters[thistrigger].triggers.length);
	for(var i=0; i<config_in_mem.chapters[thistrigger].triggers.length; i++) {
		console.log(i+": loop!");
		if(!config_in_mem.chapters[thistrigger].triggers[i].complete) complete_quit=false;
		else {
			
		
		console.log("\tlooking at "+(i+1)+" of "+config_in_mem.chapters[thistrigger].triggers.length);
		console.log("\tsuccess="+config_in_mem.chapters[thistrigger].triggers[i].success);
		
			if(!config_in_mem.chapters[thistrigger].triggers[i].success) {
				console.log("\tnot yet successful");
				success_quit=false; // can't succeed, so don't quit
			}
		}
	}
	if(success_quit && complete_quit) {
		console.log("total success detected!");
		setTimeout(function() {
			console.log("autoclose_on_success is set to "+AUTO_CLOSE_MODAL_ON_SUCCESS);
		
			if(AUTO_CLOSE_MODAL_ON_SUCCESS) onClickModal(); // close modal dialog
			
			console.log("calling SuccessTrigger("+(thistrigger+1)+")");

			SuccessTrigger(thistrigger+1);

		},SUCCESS_DIALOG_DELAY);
	} else {
		console.log("success not detected");
		if(!complete_quit) {
			console.log("not quitting... try again in 10 seconds");
			
			if(document.getElementById("myModal").style.display=="block") {
			
				setTimeout(function() { CheckTrigger2(thistrigger); } ,TRIGGER_RECHECK_DELAY); //done
			}
		} else {
		console.log("quitting... all trials complete.");
		
		}
	}
}

function onClickCloseSaveLoadDialog() {
	console.log("onClickCloseSaveLoadDialog()");
	$("#saveLoadModal").hide();
}

