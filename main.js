$('.col').hover(function(){
  console.log('HOVER');
  $(this).children('.ring').first().toggleClass('active');
})
