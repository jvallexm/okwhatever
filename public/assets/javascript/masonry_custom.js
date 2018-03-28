// var $grid = $('.grid').masonry({
//   itemSelector: '.grid-item',
//   columnWidth: '.grid-sizer',
//   gutter: 15,
//   percentPosition: true
// });


var $grid = $('.grid').masonry({
  itemSelector: '.grid-item',
  columnWidth: 150,
  gutter: 15,
});

$(".hidetrick").hide();

$grid.on( 'click', '.grid-item', function() {
  // change size of item via class
  $( this ).toggleClass('grid-item--gigante');
  $(".hidetrick").toggle();
  $(".glyphicon-play").hide();
  // trigger layout
  $grid.masonry();
});
