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
  targetCol: {},
  moverId: 0,
  targetId: 0,
  click: function(clicked) {
    clickedRing = clicked.children().eq(0);
    console.log(clickedRing);
    if (!this.active) {
      game.active = true;
      clickedRing.addClass('active');
      this.originCol = clicked;
      this.moverId = clickedRing.attr('id');
    } else if (this.checkMove(clickedRing)){
      this.moveRing(clicked);
    }

  },
  checkMove: function(target) {
    // if originCol's firstchild's id > target's firstchild's id, make move
    // ringToMove = this.originCol.children().eq(0).attr('id');
    this.targetId = target.hasClass('ring') ? target.attr('id') : 100;
    if (this.moverId < this.targetId) {
      return true;
    } else if (this.moverId == this.targetId){
      this.softReset();
      return false;
    } else {
      console.log("That's not a legal move");
      this.softReset();
      return false;
    }
    // else give indication that move isn't legal (animation or something)
  },
  moveRing: function(destination) {
    // increment moves, move ring in DOM, set active to false
    this.moves++;
    $('.active').prependTo(destination);
    this.softReset();
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
