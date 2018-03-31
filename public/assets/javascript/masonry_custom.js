// var $grid = $('.grid').masonry({
//   itemSelector: '.grid-item',
//   columnWidth: '.grid-sizer',
//   gutter: 15,
//   percentPosition: true
// });


var $grid = $('.grid').masonry({
  itemSelector: '.grid-item',
  columnWidth: '.grid-sizer',
  // columnWidth: 150,
  gutter: 5,
});

$(".hidetrick").hide();

$grid.on( 'click', '.grid-item', function() {
	var id = $(this).data("id");
  // change size of item via class
  	$( this ).toggleClass('grid-item--gigante');
  	// $(".hidetrick").toggle();
  	$(this).closest('.grid-item').find('.hidetrick').toggle();
  	$(this).closest('.grid-item').find('.glyphicon-play').toggle();
  // trigger layout
  	$grid.masonry();
});
