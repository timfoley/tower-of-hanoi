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
  click: function() {
    // once column has been clicked, decide what to do
  },
  checkMove: function() {},
  moveRing: function(ring, destination) {
    this.moves++;
    ring.appendTo(destination);
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

// when you click on a column,
// add active class to top ring and toggle active variable
