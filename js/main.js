(function($){

// tabs
var pageTab = $('#tabs div'),
	tab = $('#tabs ul li a');

pageTab.hide();
pageTab.first().show();

tab.click(function(e){
	var target = $(this).attr('href');

	tab.removeClass('active');
	$(this).addClass('active');
	pageTab.hide();
	$(target).show();
	e.preventDefault();
});

// image swap
var main_img = $('#mimg'),
	thumb_link = $('#imgsec ul li img');

thumb_link.click(function(){
	var imgURL = $(this).attr('src');
	main_img.attr('src', imgURL);
});
//remove unused thumbs
var liLoop = $('#imgsec ul li');
liLoop.each(function(){
 if($(this).html().length === 0){
  $(this).remove();}
});

//modal boxs
	var tModal = $(".tilesmodal"),
		sModal = $(".sampmodal");
		$('.thelpers').on('click', function(e) {		
			e.preventDefault();
			if($(this).data("tmodal") !== undefined){
			tModal.fadeIn(300); 
			}
		else{
			sModal.fadeIn(300);
		}
		calcBack(); // Returns Calc box back to wall and floors Panel
	});


//close Modal/remove wall and floor inputs
$(".close,.remove").on('click', function (e) {
	e.preventDefault();
	$(this).parent().fadeOut(300);
	if($(this).parent().hasClass("wfinput")){
		$(this).parent().fadeOut('300', function() {
			$(this).remove();
		});;
	}
});

//insert another wall or floor
	var inp = $('.wfinput'),
		but =  $('.calcinp a');
but.on('click',function (e) {
	 e.preventDefault();
	 var cloneEl = inp.clone(true),
	 lstEl = $('.wfinput').last();

	cloneEl.find('input').val("0");
	cloneEl.insertAfter(lstEl);
})


// Calc Button
$('.calcinp button.greenbut').on('click', function(e) {
	e.preventDefault();
	var w = $("input.width"),
   		h = $("input.height");

	calc(h,w);

});

//Calc Back
$('#area a').on('click', function(e) {
	e.preventDefault();
	calcBack();
});


//Tile Calculator Workings
function calc(h,w){
	var tw = 0,
    	hw = 0;
  for(i=0; i < w.length; i++){
  tw += parseInt(w[i].value);
   };
  for(i=0; i < w.length; i++){
  hw += parseInt(h[i].value);
   };

if(isNaN(tw&&hw)) {
		$("#error").fadeIn(300);
		return;
	}
	else{
   $("#error").hide();
   coverage(tw,hw);
}
	};

function coverage(tw,hw){
	var cov = (tw*hw/10000).toFixed(2);
	   	$(".calcinp > *").hide();
	   	$("#area").fadeIn(300);
	   	$("#area span").html(+cov+" m&sup2;");
	   };

function calcBack(){
	$("#area").hide();
	$(".calcinp > *").not('#error').fadeIn(300);
}

})(jQuery);