$rings = $('.rings')

var game = {
  columns: {
    c1: [],
    c2: [1,2,3,4],
    c3: [],
  },
  rings: 4,
  moves: 0,
  active: false,
  click: function(mover) {
    // once column has been clicked, decide what to do
    // if active is false, set to true
    // add active class to top ring

    // else if active is true
    // check to see if move is legal, if so make move
  },
  checkMove: function(mover, target) {
    // if mover's id > target id, make move
    // if mover id == target id, set active to false
    // else give indication that move isn't legal (animation or something)
  },
  moveRing: function(ring, destination) {
    // increment moves, move ring in DOM, set active to false
    this.moves++;
    ring.appendTo(destination);
    this.active = false;
    // TODO move to the proper array in game.columns
    // try using .map?

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

$('.col').hover(function(){
  $(this).children('.ring').first().toggleClass('hover');
})
