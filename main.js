//TODO:
  // [ ] display move counter
  // [ ] display gameover text
  // [ ] select number of rings
  // [ ] undo button
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
      clickedRing.addClass('active');
      this.originCol = clicked;
      this.moverId = clickedRing.attr('id');
      this.active = true;
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
  },
  moveRing: function(destination) {
    this.moves++;
    $('.active').prependTo(destination);
    this.softReset()
  },
  softReset: function() {
    this.active = false;
    // TODO this feels klugey, but I can't get it to work otherwise
    window.setTimeout(function() {
      $rings.removeClass('active hover');
    }, 20)
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
