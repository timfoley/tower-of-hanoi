# Tim's Towers of Hanoi

## What's All This About?
The Tower of Hanoi is a classic math game/puzzle. The object of the game is to move the tower from one column to another, folling these three rules:
  1. Only one disk can be moved at a time.
  1. Each move consists of taking the upper disk from one of the stacks and placing it on top of another stack i.e. a disk can only be moved if it is the uppermost disk on a stack.
  1. No disk may be placed on top of a smaller disk. _Wikipedia_](https://en.wikipedia.org/wiki/Tower_of_Hanoi)

## What's it Made Of?
HTML, CSS, and JavaScript (with a whole lotta help from jQuery)

## How Did You Do It?
For this project, I really wanted to take advantage of some of the basics we've been learning about Object Oriented JS. Although we haven't gotten as far a constructor functions, etc., I know that structuring my game as an object could make this project a lot more manageable.

I started by coding up a 4-block stack and the game board itself. It didn't take long for me to settle on the 8-bit theme, transforming the game board into an arcade cabinet.

When it came time to add functionality, I began by defining a few methods I knew I would need: `checkMove`, `moveRing`, `checkWin`, and `gameOver`. I was able to code a draft of `checkWin` before I even know how to move blocks from one tower to the next.

Bit by bit, I fleshed out the logic, adding features after each stable commit. Since I had planned ahead, I found it wasn't all that difficult to add new functionality such as allowing players to generate towers of different heights.

I also kept my eye on the visual design and UX throughout. I'm really proud of the animations I added to give everything a very playful look and feel.

## What's Next?
### Instructions
It would probably be a GREAT idea to add instructions somewhere on the page. The easiest way would be to add some text underneath the "arcade" screen. On the other hand, it would be even better if the instructions showed up on the game window itself, just like classic arcade intros.

### Timer and Score Tracking
I've played this game _way_ too much now, and can usually get a perfect score. If I really wanted to implement high score tracking, adding a timer would be my best bet. It really shouldn't be too hard:
- Step 1: add a timer that's always running
- Step 2: add a check-box to enable/disable the timer
  - TODO: how to style checkboxes
- Step 3: high score list
  - displayed in the right-hand column next to the level select menu
  - high scores are paired to each tower height
  - moves + time with time as tie-breaker
  - save to local storage

### Self Solver
I'd like to add a button that will solve the puzzle automatically step-by-step. First I need to figure out the solution
