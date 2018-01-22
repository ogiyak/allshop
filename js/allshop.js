var sidenav = document.getElementById("sidenav");
var shadow = document.getElementsByClassName("shadow");
var searchWrap = document.getElementById("searchwrap");
var searchContent = document.getElementById("search-content");
var sidenavCloseBtn = document.querySelector("#sidenav .close");
var searchBackBtn = document.querySelector("#searchwrap form *:nth-child(1)");
// searchbar
function sidenavOpen(){
	sidenav.style.left = "0vw";
	shadow[1].style.display = "block";
	sidenavCloseBtn.style.display = "flex";

	// disabling background to scroll 
	$("body").css("overflow", "hidden");
}
function sidenavClose(){
	sidenav.style.left = "-70vw";
	shadow[1].style.display = "none";
	sidenavCloseBtn.style.display = "none";

	// enabling background to scroll 
	$("body").css("overflow", "auto");
}
// search
function searchOpen(){
	if(searchContent.style.display !== "block"){
		document.querySelectorAll("nav .icon")[0].style.display = "none";
		document.querySelectorAll("nav .icon")[1].style.display = "none";
		searchContent.style.width = searchWrap.offsetWidth+"px";
		searchContent.style.display = "block";
		shadow[0].style.display = "block";
		searchBackBtn.style.display = "block";
		searchContent.className += "active";
		searchWrap.className += "active";

		// pulldown helper
		var inputChecker = setInterval(function(){checker()}, 1);
		function checker(){
			if(document.querySelector("#searchwrap form input").value !== ""){
				document.getElementById("searchSug").style.display = "block";
				document.getElementById("searchHis").style.display = "none";
				
				var str = document.querySelectorAll("#searchSug > * > * > span");
				var inputStr = document.querySelector("#searchwrap form input");
				setInterval(function(){
					str[0].innerHTML = inputStr.value;
					str[1].innerHTML = inputStr.value;
					str[2].innerHTML = inputStr.value;
				},1);
				clearInterval(inputChecker);
			}
		}
	};

	$('#search-content').addClass('ani-slide-down');
	$('body').css('overflow', 'hidden');
}
function searchClose() {
	document.querySelectorAll("nav .icon")[0].style.display = "flex";
	document.querySelectorAll("nav .icon")[1].style.display = "flex";
	searchContent.style.width = searchWrap.offsetWidth+"px";
	searchContent.style.display = "none";
	shadow[0].style.display = "none";
	searchBackBtn.style.display = "none";
	searchContent.className = "";
	searchWrap.className = "";
	// pulldown helper
	document.getElementById("searchSug").style.display = "none";
	document.getElementById("searchHis").style.display = "block";

	$('body').css('overflow', 'auto');
}
// popup
function popOpen(e){
	var popimg = document.getElementById("popimg");
	var popcompare = document.getElementById("popcompare");
	var popfilter = document.getElementById("popfilter");

	if(e.id == 'popopencompare'){
		popcompare.style.visibility = "visible";
		popcompare.style.opacity = "1";
		popcompare.style.display = "block";
	}else if(e.id == 'popopenimg'){
		popimg.style.visibility = "visible";
		popimg.style.opacity = "1";
		popimg.style.display = "block";

	}else if(e.id == 'popopenfilter'){
		popfilter.style.visibility = "visible";
		popfilter.style.opacity = "1";
		popfilter.style.display = "block";
	}

	// disabling background to scroll 
	$("body").css("overflow", "hidden");

	// adding active animation
	$('.popup').addClass('ani-zoom-out');
}
function popClose(){
	$(".popup").css({
		visibility : "hidden",
		opacity : "0",
	});
	setTimeout(function(){
		$('.popup').css('display', 'none');
	}, 200);

	// enabling background to scroll 
	$("body").css("overflow", "auto");
	$("video")[0].pause();

	// adding active animation
	$('.popup').addClass('ani-zoom-in');
}
// showmore
function showMore(e){
	if(e.innerHTML == '<i class="fa fa-angle-down"></i>'){
		// button bot animation
		$('.btn-bot').addClass('ani-slide-down');

		setTimeout(function(){
			e.previousElementSibling.style.display = "block";
		}, 200);
		e.style.backgroundColor = "var(--color-gray-light)";
		e.innerHTML = '<i class="fa fa-angle-up"></i>';
	}else{
		e.previousElementSibling.style.display = "none";
		e.style.backgroundColor = "transparent";
		e.innerHTML = '<i class="fa fa-angle-down"></i>';
	}	
}
// dropdown with threedots
function dropdown(e){
	var content = e.nextElementSibling;
	var allcontent = document.querySelectorAll(".dropdown-content");

	if(content.style.display == "flex"){
		content.style.display = "none";
	}else{
		for(var i = 0; i < allcontent.length; i++){
			allcontent[i].style.display = "none";
		}
		content.style.display = "flex";
	}
}
// range slider
// https://codepen.io/ATC-test/pen/myPNqW
// var minRange = $('#minrange'),
// 	maxRange = $('#maxrange'),
// 	minVal = $('#minprice'),
// 	maxVal = $('#maxprice');

// minVal.html(minRange.attr('value'));
// maxVal.html(maxRange.attr('value'));

// minRange.on('input', function(){
// 	minVal.html(minRange.attr('value'));
// });
// maxRange.on('input', function(){
// 	maxVal.html(maxRange.attr('value'));
// });

// advance-search - filter indicator
function vanish(e){
	e.className = "vanish";
}
// adding product to cart
$("#addtoCart").click(function(event){
	var cartIdk = $("#cart-indicator");
	
	if($(this).hasClass('inactive') == false){
		cartIdk.html(parseInt($("#cart-indicator").html())+1)
	};
	cartIdk.css({
		"backgroundColor" : "#fff",
		"fontWeight" : "bolder",
		"color" : "#000"
	});

	cartIdk.addClass('ani-zoom-in');
	setTimeout(function(){cartIdk.removeClass('ani-zoom-in')}, 250);

	$(this).html('<span>Ditambah</span></i>')
});
// navigation shrink
$(document).on("scroll", function(){
	if($(document).scrollTop() > 132){
		$("nav").css("padding", "0 0 0 0");
		$("nav .category").addClass("shrink");
	}else{
		$("nav").css("padding", "16px 0 0 0");
		$("nav .category").removeClass("shrink");
	}
});

// pulldown in list-items
$('.pulldown-trigger').click(function(){
	var n = $(this).next().index();

	if($(this).next().css('display') == 'none'){
		$(this).next().css('display', 'flex');

		$(this).html("<i class='fa fa-angle-up'></i>");
		$(this).prev().find('.sspan').removeClass('ani-fade');
	}else{
		$(this).next().css('display', 'none');

		// visual and animation
		$(this).html("<i class='fa fa-angle-down'></i>");
		$(this).prev().find('.sspan').addClass('ani-fade');

		// value update
		$(this).prev().find('.product-color').html($(this).next().find('.product-color-input').val());
		$(this).prev().find('.product-qty').html($(this).next().find('.product-qty-input').val());
	}
});

// inactive animation
$('.btn-green-outer').click(function(){
	$(this).removeClass('btn-green-outer');
	$(this).addClass('inactive');
});

// media popup
$(".content-img > li").click(function(){
	if($(this).find('img').length){
		if($(this).find('img').css('position') !== 'fixed'){
			$(".content-img > li").css('visibility', 'hidden');
			$(this).find('img').css({
				position : 'fixed',
				top : '50%',
				left : '50%',
				transform : 'translate(-50%, -50%)',
				width : '100%',
				height : '100%',
				objectFit : 'contain',
			});
			$(this).css('visibility', 'visible');
			$(this).parent().css('overflow', 'hidden');
		}else{
			$(".content-img > li").css('visibility', 'visible');
			$(this).find('img').css({
				position : 'static',
				transform : 'translate(0, 0)',
				width : '144px',
				height : '192px',
				objectFit : 'cover',
			});
			$(this).parent().css('overflow', 'auto');
		}
	}
});

// promocounter
if(document.querySelector(".timer").innerHTML !== ""){
	var d = new Date();
	var t = d.getHours();
	if(t != 24){
		var secTimer = setInterval(function(){
			var d = new Date();
			var t = d.getSeconds();
			var timer = 60-t;
			document.getElementById("seconds").innerHTML = timer;
		}, 1000);
		var minTimer = setInterval(function(){
			var d = new Date();
			var t = d.getMinutes();
			var timer = 60-t;
			document.getElementById("minutes").innerHTML = timer;
		}, 1000);
		var hourTimer = setInterval(function(){
			var d = new Date();
			var t = d.getHours();
			var timer = 24-t;
			document.getElementById("hours").innerHTML = timer;
		}, 1000);
	}else{
		document.getElementById("seconds").innerHTML = "0";	
		document.getElementById("minutes").innerHTML = "0";	
		document.getElementById("hours").innerHTML = "0";	
	}
}