//TODO:
  // [ ] select/generate custom number of rings
  // [ ] undo button
  // [ ] solver
//QUESTIONS:
  // should I daisy chain my methods, or have them call in sequence?
  // should I use `this.` or `game.`? I'm assuming that when I get more OOJS about it, `this` would be easier to work with.

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
      this.originCol = clicked;
      clickedRing.addClass('active');
      // this.originCol = clicked;
      this.moverId = clickedRing.attr('id');
      this.active = true;
    } else if (this.checkMove(clicked)){
      game.moveRing(clicked);
      this.softReset();
      this.incrementCounter();
      this.checkWin();
    } else {
    }
  },
  checkMove: function(target) {
    this.targetCol = target;
    // select eq(1) because we need to ignore the floating ring
    targetRing = target.children().eq(1);
    this.targetId = targetRing.hasClass('ring') ? targetRing.attr('id') : 100;
    if (this.originCol.attr('class') == this.targetCol.attr('class')){
      // SAME SPACE
      this.softReset();
      return false;
    } else if (this.moverId < this.targetId) {
      // LEGAL MOVE
      return true;
    } else {
      // ILLEGAL MOVE
      game.targetCol = game.originCol;
      this.rumble();
      return false;
    }
  },
  rumble: function() {
    $('.active').addClass('rumble');
    $columns.on('animationend', '.rumble', function() {
      $(this).removeClass('rumble');
    });
  },
  moveRing: function(destination) {
    $('.active').prependTo(destination);
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
    // this will be better when I can just make another instance with a constructor function, right?
    this.over = false;
    this.softReset();
    this.moves = 0;
    this.moverId = 0;
    this.targetId = 0;
    this.targetCol = {};
    this.originCol = {};
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
  } else {
    game.moveRing($(this));
  }
});

$('.col').mouseleave(function(){
  $(this).children('.ring').eq(0).removeClass('hover');
});

$reset.on('click', function() {
  // why didn't this work when I did `$reset.on('click', game.reset)` ?
  game.reset();
});
