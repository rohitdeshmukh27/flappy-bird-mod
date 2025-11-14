# Game Audio & Images

## Sound Files

Place your MP3 sound files in this folder with the following naming convention:

### Milestone Sound Files:

- `number10.mp3` - Plays when player reaches 10 points
- `number20.mp3` - Plays when player reaches 20 points
- `number50.mp3` - Plays when player reaches 50 points
- `number70.mp3` - Plays when player reaches 70 points
- `number90.mp3` - Plays when player reaches 90 points
- `number100.mp3` - Plays when player reaches 100 points
- `number150.mp3` - Plays when player reaches 150 points

### Game Over Sound Files:

The game will randomly play one of these three sounds when the player crashes:

- `gameover1.mp3` - First game over sound
- `gameover2.mp3` - Second game over sound
- `gameover3.mp3` - Third game over sound

### Background Music:

- `background-music.mp3` - Loops continuously during gameplay
  - Starts when the game begins
  - Pauses when game is over or reset
  - Volume set to 30% (0.3)

## Background Image

Place your background image in the `/public/images/` folder:

- `background.jpg` - Background image for the game
  - Covers entire screen
  - Centered and scaled to fit

## Notes:

- All sound files should be in MP3 format
- Background image can be .jpg, .png, or other image formats (update filename in code if needed)
- File names are case-sensitive
- The game will continue to work even if some files are missing (warnings will appear in console)
- Volume levels:
  - Milestone sounds: 50% (0.5)
  - Game over sounds: 60% (0.6)
  - Background music: 30% (0.3) - loops continuously
