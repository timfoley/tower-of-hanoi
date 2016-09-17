$rings = $('.rings')

var towers = {
  columns: {
    col1: [],
    col2: [],
    col3: [],
  },
  rings: 4,
  moves: 0,
  moveRing: function(ring, destination) {
    ring.appendTo(destination)
  },
  checkMove: function() {},
  checkWin: function() {
    for (col in this.columns) {
      if (this.length === this.rings) {
        this.gameOver();
      } else {
        return false
      }
    }
  },
  gameOver: function() {},

}

$('.col').hover(function(){
  console.log('HOVER');
  $(this).children('.ring').first().toggleClass('hover');
})

// when you click on a column,
// add active class to top ring and toggle active variable
