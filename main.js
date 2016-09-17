//QUESTIONS:
  // should I daisy chain my methods, or have them call in sequence?

$rings = $('.ring');
$columns = $('.col');
$winningColumns = $('.c1,.c3')

$columns.on('click', function(){
  game.click($(this));
});

$('.col').mouseenter(function(){
  if (!game.active) {
    $(this).children('.ring').eq(0).addClass('hover');
  }
});

$('.col').mouseleave(function(){
  $(this).children('.ring').eq(0).removeClass('hover');
});

var game = {
  rings: 4,
  moves: 0,
  active: false,
  originCol: {},
  targetCol: {},
  moverId: 0,
  targetId: 0,
  click: function(clicked) {
    clickedRing = clicked.children().eq(0);
    if (!this.active) {
      game.active = true;
      clickedRing.addClass('active');
      this.originCol = clicked;
      this.moverId = clickedRing.attr('id');
    } else if (this.checkMove(clickedRing)){
      this.moveRing(clicked);
      this.checkWin();
    } else {
      this.softReset();
    }

  },
  checkMove: function(target) {
    this.targetId = target.hasClass('ring') ? target.attr('id') : 100;
    if (this.moverId < this.targetId) {
      return true;
    } else if (this.moverId == this.targetId){
      return false;
    } else {
      return false;
    }
    // else give indication that move isn't legal (animation or something)
  },
  moveRing: function(destination) {
    this.moves++;
    $('.active').prependTo(destination);
    this.softReset();
  },
  softReset: function() {
    $rings.removeClass('active hover');
    this.active = false;
  },
  checkWin: function() {
    $winningColumns.each(function(column){
      if ($(this).children().length == game.rings) {
        game.gameOver();
        return false;
      }
    })
  },
  gameOver: function() {
    console.log("You won in " + this.moves + " moves!");
  },
  reset: function() {
    this.softReset;
    this.moves = 0;
    for (var i = 0; i < this.rings; i++) {
      $rings.eq(i).appendTo('.c2')
    }
  },

}
