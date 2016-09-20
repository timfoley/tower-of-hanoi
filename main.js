//TODO:
  // [ ] solver
  // [ ] display the minimum number of moves
  // [ ] toggle start and reset button text
//QUESTIONS:
  // should I daisy chain my methods, or have them call in sequence?
  // should I use `this.` or `game.`? I'm assuming that when I get more OOJS about it, `this` would be easier to work with.

var $columns = $('.col');
var $winningColumns = $('.c1,.c3');
var $rings;
var $c2 = $('.c2');
var $moves = $('.moves');
var $reset = $('#reset');
var $arrows = $('.arrow');

var game = {
  rings: 4,
  moves: 0,
  active: false,
  originCol: {},
  targetCol: {},
  moverId: 0,
  targetId: 0,
  over: true,
  registerEvents: function() {
    // clicking on a colum
    $columns.on('click', function(){
      if (!game.over){
        game.click($(this));
      }
    });
    // hovering over a column
    $('.col').mouseenter(function(){
      if (!game.active) {
        $(this).children('.ring').eq(0).addClass('hover');
      } else {
        game.moveRing($(this));
      }
    });
    // leaving a column
    $('.col').mouseleave(function(){
      $(this).children('.ring').eq(0).removeClass('hover');
    });
    // clicking reset
    $reset.on('click', function() {
      // why didn't this work when I did `$reset.on('click', game.reset)` ?
      game.reset();
    });
    // clicking level-select arrows
    $arrows.on('click', function(){
      game.levelSelect($(this));
    });
  },
  click: function(clicked) {
    clickedRing = clicked.children('.ring').eq(0);
    if (!this.active) {
      // if a ring is NOT already selected...
      this.originCol = clicked;
      clickedRing.addClass('active');
      this.moverId = parseInt(clickedRing.attr('id'));
      this.active = true;
    } else if (this.checkMove(clicked)){
      // if a ring IS selected, handle moving a ring
      game.moveRing(clicked);
      this.softReset();
      this.incrementCounter();
      this.checkWin();
    }
  },
  checkMove: function(target) {
    this.targetCol = target;
    // select eq(1) because we need to ignore the floating ring
    targetRing = target.children().eq(1);
    this.targetId = targetRing.hasClass('ring') ? parseInt(targetRing.attr('id')) : -100;
    if (this.originCol.attr('class') == this.targetCol.attr('class')){
      // SAME SPACE
      this.softReset();
      return false;
    } else if (this.moverId > this.targetId) {
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
    $rings.removeClass('active hover');
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
    this.generateRings(this.rings);
    this.over = false;
    this.softReset();
    this.moves = 0;
    this.moverId = 0;
    this.targetId = 0;
    this.targetCol = {};
    this.originCol = {};
    $moves.html('MOVES: ' + this.moves);
    $('.gameOver').remove();
  },
  levelSelect: function(arrow) {
    var $level = $('.level');
    if (arrow.hasClass('left')) {
      if (this.rings > 3) {
        this.rings--;
      }
    } else if (this.rings < 15 ){
      this.rings++;
    }
    $level.html(this.rings);
  },
  generateRings: function(n) {
    $columns.children().remove();
    this.rings = n;
    var multiplier =  1/n;
    var width;
    for (var i = 0; i < n; i++) {
      width = (100 - i*multiplier*100) + '%';
      $c2.prepend('<div class="ring"></div>');
      $c2.children().eq(0).attr('id', i+1);
      $c2.children().eq(0).css('width', width)
    }
    // reset this variable to account for all rings
    $rings = $('.ring');
    // hard code height of all rings to flex doesn't mess with really tall towers
    $rings.height($rings.height());
    $reset.html('RESET');
  }
}

game.registerEvents();
