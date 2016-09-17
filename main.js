$rings = $('.ring');
$columns = $('.col');

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
  columns: {
    c1: [],
    c2: [1,2,3,4],
    c3: [],
  },
  rings: 4,
  moves: 0,
  active: false,
  originCol: {},
  click: function(clicked) {
    clickedRing = clicked.children().eq(0);
    if (!this.active) {
      game.active = true;
      clickedRing.addClass('active');
      this.originCol = clicked;
    } else if (this.checkMove(clickedRing)){
      // else if active is true
      // check to see if move is legal, if so make move
      this.moveRing(clicked);

    }

  },
  checkMove: function(target) {
    // if originCol's firstchild's id > target's firstchild's id, make move
    ringToMove = this.originCol.children().eq(0).attr('id');
    targetRing = target ? target.attr('id') : 0;
    if (ringToMove > targetRing) {
      return true;
    } else if (ringToMove == targetRing){
      this.softReset();
      return false;
    } else {
      console.log("That's not a legal move");
      return false;
    }
    // else give indication that move isn't legal (animation or something)
  },
  moveRing: function(destination) {
    // increment moves, move ring in DOM, set active to false
    this.moves++;
    $('.active').appendTo(destination);
    this.active = false;
    // TODO move to the proper array in game.columns
    // try using .map?

  },
  softReset: function() {
    $rings.removeClass('active hover');
    this.active = false;
  },
  checkWin: function() {
    for (col in this.columns) {
      console.log(col, this.columns[col].length);
      if (this.columns[col].length === this.rings) {
        this.gameOver();
        return true;
      }
      console.log("You haven't won yet");
    }
  },
  gameOver: function() {
    console.log("You WIN!");
  },

}
