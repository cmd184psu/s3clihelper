function openNavRight() {
   document.getElementById("mySidenavRight").style.width = "250px";
  document.getElementById("main").style.marginRight = "250px";
  document.getElementById("topnav").style.marginRight = "250px";
}
function openNavLeft() {
   document.getElementById("mySidenavLeft").style.width = "225px";
  //document.getElementById("main").style.marginLeft = "250px";
  $('#main').attr('style','margin-left: 225px;');
  $('#topnav').attr('style','margin-left: 225px;');
}

function closeNavLeft() {
	document.getElementById("mySidenavLeft").style.width = "0";
	//document.getElementById("main").style.marginLeft = "0";
	
	$('#main').attr('style','margin-left: 0px;');	
	$('#topnav').attr('style','margin-left: 0px;');
}
function closeNavRight() {
	document.getElementById("mySidenavRight").style.width = "0";
	document.getElementById("main").style.marginRight = "0";
	document.getElementById("topnav").style.marginRight = "0";
}
function initNav() {
	
	var dropdown = document.getElementsByClassName("dropdown-btn");
	var i;
	
	for (i = 0; i < dropdown.length; i++) {
	  	dropdown[i].addEventListener("click", function() {
			this.classList.toggle("active");
			var dropdownContent = this.nextElementSibling;
			if (dropdownContent.style.display === "block") {
				dropdownContent.style.display = "none";
			} else {
				dropdownContent.style.display = "block";
			}
		});
	} // end for
} // end initNav

// ---- right Nav bar functions

function onToggleAdvancedConfigClick() {
	console.log("toggle advanced settings table");
	$("#advancedSettingsTable").toggle();
}