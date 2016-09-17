//TODO:
  // [ ] display move counter
  // [ ] display gameover text
  // [ ] select number of rings
  // [ ] undo button
//QUESTIONS:
  // should I daisy chain my methods, or have them call in sequence?

$rings = $('.ring');
$columns = $('.col');
$winningColumns = $('.c1,.c3');
$moves = $('.moves');
$reset = $('#reset');

var game = {
  rings: 4,
  moves: 0,
  active: false,
  originCol: {},
  targetCol: {},
  moverId: 0,
  targetId: 0,
  over: false,
  click: function(clicked) {
    clickedRing = clicked.children('.ring').eq(0);
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
    this.incrementCounter();
    $('.active').prependTo(destination);
    this.softReset()
  },
  incrementCounter: function() {
    // probably an unneccesary method...
    this.moves++;
    $moves.html('moves: ' + this.moves)
  },
  softReset: function() {
    this.active = false;
    // this feels klugey, but I can't get it to work otherwise
    // TODO rewrite using animation rather than transition!
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
    this.over = true;
    $('.c2').prepend("<div class='gameOver'>YOU WIN!</div>");
    console.log("You won in " + this.moves + " moves!");
  },
  reset: function() {
    this.over = false;
    this.softReset;
    this.moves = 0;
    $moves.html('MOVES: ' + this.moves);
    $('.gameOver').remove();
    for (var i = 0; i < this.rings; i++) {
      $rings.eq(i).appendTo('.c2')
    }
  },
}

$columns.on('click', function(){
  if (!game.over){
    game.click($(this));
  }
});

$('.col').mouseenter(function(){
  if (!game.active) {
    $(this).children('.ring').eq(0).addClass('hover');
  }
});

$('.col').mouseleave(function(){
  $(this).children('.ring').eq(0).removeClass('hover');
});

$reset.on('click', function() {
  // why didn't this work when I did `$reset.on('click', game.reset)` ?
  game.reset();
});
