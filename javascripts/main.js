$(document).ready(function() {
	var $slideshow = $("#slideshow");
	var $leftBtn = $("#left");
	var $rightBtn = $("#right");
	var $slideBtn = $("#slide");
	var $img = $("#slideshow div img");
	$.ajax({
		url: "apiKeys.json",
		success: function(keyFile){
			for (var i = 0; i < 5; i++){
				console.log("api_key", keyFile);
			  var url = `https://api.nasa.gov/planetary/apod?date=2016-09-${14+i}&api_key=${keyFile.api_key}`;
			  $.ajax({
			    url: url,
			    success: function(result){
			    	$($slideshow).append(`<div class="img"><h3 class="caption">${result.title}</h3><img width="360" height="480" src="${result.url}""></div>`);
				  }
			  });  
			}
		}
	});
	$($img).width("360");
	$($img).height("480");

	$($leftBtn).click(function(){
		$('#slideshow > div:last')
	    .show()
	    .prevAll()
	    .hide()
	    .end()
	    .prependTo('#slideshow');	
	});

	$($rightBtn).click(function(){
		$('#slideshow > div:first')
	    .hide()
	    .next()
	    .show()
	    .end()
	    .appendTo('#slideshow');	
	});

	$("#slideshow > div:gt(0)").hide();
	var intervalId = setInterval(function() { 
	  $('#slideshow > div:first')
	    .fadeOut(1000)
	    .next()
	    .fadeIn(1000)
	    .end()
	    .appendTo('#slideshow');
	}, 3000);
	var fadeAnimation = true;
	$($slideBtn).click(function(){
		// $("img").stop();
		if(fadeAnimation){
			clearInterval(intervalId);
			intervalId = setInterval(function() { 
			  $('#slideshow > div:first')
			    .slideDown(1000)
			    .next()
			    .slideUp(1000)
			    .end()
			    .appendTo('#slideshow');
			},  5000);
			fadeAnimation = false;
		} else {
			clearInterval(intervalId);
			intervalId = setInterval(function() { 
			  $('#slideshow > div:first')
			    .fadeOut(1000)
			    .next()
			    .fadeIn(1000)
			    .end()
			    .appendTo('#slideshow');
			}, 3000);
			fadeAnimation = true;
		}
	});

	$($slideshow).hover(
		function(){
			$(this).find('.caption').show();
		},
		function(){
			$(this).find('.caption').hide();
		}
	);
});
