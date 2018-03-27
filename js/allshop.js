var sidenav = document.getElementById('sidenav');
var shadow = document.getElementById('shadow');
var searchWrap = document.getElementById('searchwrap');
var searchContent = document.getElementById('search-content');
var sidenavCloseBtn = document.querySelector('#sidenav .close');
var searchBackBtn = document.querySelector('#searchwrap form *:nth-child(1)');

// searchbar
function sidenavOpen(){
	sidenav.className += 'active';
	sidenav.style.left = '0vw';
	shadow.style.display = 'block';
	sidenavCloseBtn.style.display = 'flex';

	// disabling background to scroll 
	$('body').css('overflow', 'hidden');
}
function sidenavClose(){
	sidenav.className = '';
	sidenav.style.left = '-80vw';
	shadow.style.display = 'none';
	sidenavCloseBtn.style.display = 'none';

	// enabling background to scroll 
	$('body').css('overflow', 'auto');
}

// search
function searchOpen(){
	if(searchContent.style.display !== 'block'){
		document.querySelectorAll('.navigation > .icon')[0].style.display = 'none';
		document.querySelectorAll('.navigation > .icon')[1].style.display = 'none';
		searchContent.style.display = 'block';
		shadow.style.display = 'block';
		searchBackBtn.style.display = 'block';
		document.querySelector('nav').className += 'active';

		// radius bottom to zero + margin to 0 8px
		searchWrap.style.borderRadius = '2px 2px 0 0';
		searchWrap.style.margin = '0 8px';
		
		// enabling button submit
		$('#searchwrap form i.fa-search').replaceWith("<button type='submit'><i class='fa fa-search'></i></button>");
		
		// pulldown helper
		var inputChecker = setInterval(function(){checker()}, 1);
		function checker(){
			if(document.querySelector('#searchwrap form input').value !== ''){
				document.getElementById('searchSug').style.display = 'flex';
				document.getElementById('searchHis').style.display = 'none';
				
				var str = document.querySelectorAll('#searchSug > * > * > span');
				var inputStr = document.querySelector('#searchwrap form input');
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
	document.querySelectorAll('.navigation > .icon')[0].style.display = 'flex';
	document.querySelectorAll('.navigation > .icon')[1].style.display = 'flex';
	searchContent.style.display = 'none';
	shadow.style.display = 'none';
	searchBackBtn.style.display = 'none';
	document.querySelector('nav').className = '';
	// pulldown helper
	document.getElementById('searchSug').style.display = 'none';
	document.getElementById('searchHis').style.display = 'block';

	$('body').css('overflow', 'auto');

	// radius bottom + margin to normal
	searchWrap.style.borderRadius = '2px';
	searchWrap.style.margin = '0';

	// disabling button submit
	$("#searchwrap form button[type='submit']").replaceWith("<i class='fa fa-search' onclick='searchOpen()'></i>");
}

// popup
function popOpen(e){
	var popimg = document.getElementById('popimg');
	var popcompare = document.getElementById('popcompare');
	var popfilter = document.getElementById('popfilter');
	var popseller = document.getElementById('popseller');
	var popcourier = document.getElementById('popcourier');
	var popshoper = document.getElementById('popshoper');
	var popchat = document.getElementById('popchat');
	var popshop = document.getElementById('popshop');
	var poppromo = document.getElementById('poppromo');

	$('.popup-wrapper').css({
		'visibility' : 'visible',
		'opacity' : '1',
		'display' : 'flex'
	});

	if(e.id == 'popopencompare'){
		popcompare.style.display = 'flex';
	}else if(e.id == 'popopenimg'){
		popimg.style.display = 'flex';
	}else if(e.id == 'popopenfilter'){
		popfilter.style.display = 'flex';
	}else if(e.id == 'popopenseller'){
		popseller.style.display = 'flex';
	}else if(e.id == 'popopencourier'){
		popcourier.style.display = 'flex';
	}else if(e.id == 'popopenshoper'){
		popshoper.style.display = 'flex';
	}else if(e.id == 'popopenchat'){
		popchat.style.display = 'flex';
	}else if(e.id == 'popopenshop'){
		popshop.style.display = 'flex';
	}else if(e.id == 'popopenpromo'){
		poppromo.style.display = 'flex';
	}

	// disabling background to scroll 
	$('body').css('overflow', 'hidden');

	// adding animation
	$('.popup').removeClass('ani-zoom-in');
	$('.popup').addClass('ani-zoom-out');

	// adding shadow
	shadow.style.display = 'block';
}

$('.chats select').change(function(){
	if($(this).val() == 'public'){
		$('.chat-input > *:first-child > *:first-child').css('display', 'flex')
	}
})

function popClose(){
	setTimeout(function(){
		$('.popup-wrapper').css({
			'visibility' : 'hidden',
			'opacity' : '0',
			'display' : 'none'
		});
		$('.popup').css('display', 'none');
	}, 150);

	// enabling background to scroll 
	$('body').css('overflow', 'auto');
	try{
		$('video')[0].pause();
	}catch(err){
		console.log(err);
	}

	// adding animation
	$('.popup').removeClass('ani-zoom-out');
	$('.popup').addClass('ani-zoom-in');

	// removing shadow
	shadow.style.display = 'none';
}
// https://stackoverflow.com/questions/9183381/how-to-have-click-event-only-fire-on-parent-div-not-children
$('.popup-wrapper').on('click', function(e){
	if(e.target !== this) return;
	popClose();
});
// showmore
$('.showmore').click(function(){
	if($(this).prev().css('display') == 'none'){
		$(this).css({
			'background-color' : 'var(--gray-light)'
		});
		$(this).find('.fa').removeClass('fa-angle-down');
		$(this).find('.fa').addClass('fa-angle-up');

		$(this).prev().css('display', 'block');
		$(this).prev().addClass('ani-slide-down');	
	}else{
		$(this).find('.fa').removeClass('fa-angle-up');
		$(this).find('.fa').addClass('fa-angle-down');
		$(this).css({
			'background-color' : 'transparent'
		});
		$(this).prev().css('display', 'none');
	}
});

// shadow close related function
$('#shadow').click(function(){
	sidenavClose();
	searchClose();
	popClose();
})
// dropdown
$('.dropdown > *:first-child').click(function(){
	var $content = $(this).next('.dropdown-content');

	if($content.css('display') == 'none'){
		$content.css('display', 'flex');
		$content.addClass('ani-slide-down');
	}else{
		$content.css('display', 'none');
	}
})

// range slider
// https://codepen.io/ATC-test/pen/myPNqW
try{
	var minRange = $('#minrange'),
		maxRange = $('#maxrange'),
		minVal = $('#minprice'),
		maxVal = $('#maxprice');

	minVal.html('Rp ' + rupiahSparator(minRange.val()));
	maxVal.html('Rp ' + rupiahSparator(maxRange.val()));

	minRange.on('change', function(){
		minVal.html('Rp ' + rupiahSparator(minRange.val()));
	});
	maxRange.on('change', function(){
		maxVal.html('Rp ' + rupiahSparator(maxRange.val()));
	});
}catch(err){
	console.log(err);
}

function rupiahSparator(e){
	var str = e.toString(), 
		newStr = "", 
		l = str.length - 1;

	try{
		while(Math.floor(l/3)){
			for(var i = 3; i > 0; i--){
				newStr = str[l] + newStr;
				l -= 1;
			}
			newStr = "." + newStr;
		}
	}catch(err){
		console.log(err.message)
	}

	newStr = str.slice(0, l+1) + newStr;

	return newStr;
}

// adding product to cart
$('#addtoCart').click(function(event){
	var cartIdk = $('#cart-indicator');
	
	if($(this).hasClass('inactive') == false){
		cartIdk.html(parseInt($('#cart-indicator').html())+1)
	};
	cartIdk.css({
		'backgroundColor' : '#fff',
		'fontWeight' : 'bolder',
		'color' : '#000'
	});

	cartIdk.addClass('ani-zoom-in');
	setTimeout(function(){cartIdk.removeClass('ani-zoom-in')}, 250);

	$(this).html('<span>Ditambah</span></i>');
	$(this).removeClass('btn-main-outer');
	$(this).addClass('inactive');
});

$('#addtoCart2').click(function(event){
	var cartIdk = $('#cart-indicator');
	
	if($(this).hasClass('inactive') == false){
		cartIdk.html(parseInt($('#cart-indicator').html())+1)
	};
	cartIdk.css({
		'backgroundColor' : '#fff',
		'fontWeight' : 'bolder',
		'color' : '#000'
	});

	cartIdk.addClass('ani-zoom-in');
	setTimeout(function(){cartIdk.removeClass('ani-zoom-in')}, 250);

	$(this).html('<span>Ditambah</span></i>');
	$(this).removeClass('btn-main-outer');
	$(this).addClass('inactive');
});

// btn main outer inactive animation
$('#subscribe').click(function(){
	$(this).addClass('ani-fade');
	$(this).html("Berlangganan <i class='fa fa-check'></i>");
	$(this).removeClass('btn-main-outer');
	$(this).addClass('inactive');
});
$('#subscribe2').click(function(){
	$(this).addClass('ani-fade');
	$(this).html("Berlangganan <i class='fa fa-check'></i>");
	$(this).removeClass('btn-main-outer');
	$(this).addClass('inactive');
});
$('#subscribe-mini').click(function(){
	$(this).addClass('ani-fade');
	$(this).html("<i class='fa fa-check'></i>");
	$(this).removeClass('btn-main-outer');
	$(this).addClass('inactive');
});
$('#confirm').click(function(){
	$(this).addClass('ani-fade');
	$(this).html('Terkonfirmasi');
	$(this).removeClass('btn-main-outer');
	$(this).addClass('inactive');

	$('#confirmationStatus').html('Selesai');
	$('#confirmationStatus').css('color', 'var(--green)');
});
$('#whislist').click(function(){
	if($(this).hasClass('active')){
		$(this).removeClass('ani-fade');
		$(this).removeClass('active');
	}else{
		$(this).addClass('active');
		$(this).addClass('ani-fade');
		$(this).html("<i class='fa fa-heart'></i>");
	}
})
// navigation shrink
// https://stackoverflow.com/questions/4326845/how-can-i-determine-the-direction-of-a-jquery-scroll-event
var lastScrollTop = 0;
$(window).scroll(function(event){
	var st = $(this).scrollTop();
	if (st > lastScrollTop){
		$('nav').css('padding', '0');
		$('nav .category').addClass('vanish');
	} else {
		$('nav .category').removeClass('vanish');
		$('nav').css('padding', '8px 0');
	}
	lastScrollTop = st;
});

// pulldown in list-items
$('.pulldown-trigger').click(function(){
	var n = $(this).next().index();

	if($(this).next().css('display') == 'none'){
		$(this).next().css('display', 'flex');

		$(this).html("<i class='fa fa-caret-up'></i>");
		$(this).prev().find('.sspan').removeClass('ani-fade');
	}else{
		$(this).next().css('display', 'none');

		// visual and animation
		$(this).html("<i class='fa fa-caret-down'></i>");
		$(this).prev().find('.sspan').addClass('ani-fade');

		// value update
		$(this).prev().find('.product-color').html($(this).next().find('.product-color-input').val());
		$(this).prev().find('.product-qty').html($(this).next().find('.product-qty-input').val());
	}
});

// customer-stat statistic (in product img)
$('.customer-stat').click(function(){
	if($(this).css('flex-direction') != 'column'){
		$(this).css({
			'height' : '100%', 
			'flex-direction' : 'column',
			borderRadius : '3px'
		});
		$(this).children().css('padding' , '8px 0');
		$(this).addClass('ani-strech-h');
		$(this).find('.vanish').removeClass('vanish').addClass('unvanish');
	}else{
		$(this).css({
			'height' : '24px',
			'flex-direction' : 'row',
			borderRadius : '0 0 3px 3px'
		});
		$(this).children().css('padding' , '0');
		$(this).removeClass('ani-strech-h');
		$(this).find('.unvanish').removeClass('unvanish').addClass('vanish');
	}
});

// media popup click function
$('.content-img > *').click(function(){
	if($(this).find('img').length){
		if($(this).css('position') != 'fixed'){
			$('.content-img > li').css('visibility', 'hidden');
			$(this).css('visibility', 'visible');
			$(this).addClass('active');
			
			$(this).find('img').css({
				position : 'absolute',
				width : 'auto',
				height : '100%',
				objectFit : 'contain',
			});
			$(this).find('.caption').css({
				'position' : 'fixed',
				'bottom' : '50%',
				'left' : '50%',
				'transform' : 'translate(-50%, -50%)'
			});

			// image position to middle and animation
			$(this).scrollLeft(0);
			var tomid = $(this).find('img').offset().left + $(this).find('img').width()/2 - $(this).find('img').width()/4;
			$(this).animate({
				scrollLeft : tomid,
				opacity : '1'
			}, 175);
		}else{
			$('.content-img > li').css('visibility', 'visible');
			$(this).removeClass('active');
			$(this).find('img').css({
				position : 'static',
				width : '100%',
				height : '192px',
				objectFit : 'cover',
			});
			$(this).find('.caption').css({
				'position': 'absolute',
				'bottom' : '8px',
				'left' : '0',
				'transform' : 'translate(0, 0)'
			});
		}
	};
});

// trunction using clamp.js
// var module = document.getElementsByClassName('truncate');
// $clamp(module, {clamp: 2});

// promocounter
try{
	if(document.querySelector('.timer').innerHTML !== ''){
		var d = new Date();
		var t = d.getHours();
		if(t != 24){
			var secTimer = setInterval(function(){
				var d = new Date();
				var t = d.getSeconds();
				var timer = 60-t;
				document.getElementById('seconds').innerHTML = timer;
			}, 1000);
			var minTimer = setInterval(function(){
				var d = new Date();
				var t = d.getMinutes();
				var timer = 60-t;
				document.getElementById('minutes').innerHTML = timer;
			}, 1000);
			var hourTimer = setInterval(function(){
				var d = new Date();
				var t = d.getHours();
				var timer = 24-t;
				document.getElementById('hours').innerHTML = timer;
			}, 1000);
		}else{
			document.getElementById('seconds').innerHTML = '0';	
			document.getElementById('minutes').innerHTML = '0';	
			document.getElementById('hours').innerHTML = '0';	
		}
	}
}catch(err){
	console.log(err);
}

// cut promo code
$('.items-promo').click(function(){
	if($(this).find('*:first-child').children().length == 2){
		$(this).addClass('ani-fade promo-disable');
		$(this).find('*:nth-child(1) > *:nth-child(2)').css({
			display : 'none'
		});
	}
})

// read promo code
$("input[name='promocode']").on('focus', function(){
	if(true) {
		$(this).val("123456");
		$(this).parent().find('.btn').removeClass('btn-main-outer').addClass('btn-main');
	}
})