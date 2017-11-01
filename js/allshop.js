// self executing funciton
(function(){
	var search = document.getElementsByClassName("searchwrap");
	var searchWidth = search[0].offsetWidth;
	document.getElementById("searchpulldown").style.width = searchWidth+"px";
})();
function sidenavOpen(){
	document.getElementById("sidenav").style.left = "0vw";
	document.getElementById("shadow").style.display = "block";
}
function sidenavClose(){
	document.getElementById("sidenav").style.left = "-70vw";
	document.getElementById("shadow").style.display = "none";
}
function searchOpen(){
	document.getElementById("searchpulldown").style.display = "block";
}