# Game Audio & Images

## Sound Files

Place your audio and video files in this folder with the following naming convention:

### Jump Sound (MP3):

- `jump.mp3` - Plays when player presses space or clicks to jump (~1 second duration recommended)
  - Volume set to 40% (0.4)

### Milestone Video Files (MP4):

These will play video with audio for milestone celebrations:

- `number10.mp4` - Plays when player reaches 10 points (420px recommended)
- `number20.mp4` - Plays when player reaches 20 points (420px recommended)
- `number50.mp4` - Plays when player reaches 50 points (420px recommended)
- `number70.mp4` - Plays when player reaches 70 points (420px recommended)
- `number90.mp4` - Plays when player reaches 90 points (420px recommended)
- `number100.mp4` - Plays when player reaches 100 points (420px recommended)
- `number150.mp4` - Plays when player reaches 150 points (420px recommended)

**Note:** Videos are played invisibly (audio only) for optimal performance. Recommended resolution: 420px for best optimization.

### Game Over Sound Files (MP3):

The game will randomly play one of these three sounds when the player crashes:

- `gameover1.mp3` - First game over sound
- `gameover2.mp3` - Second game over sound
- `gameover3.mp3` - Third game over sound

### Background Music (MP3):

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

- Milestone files should be in **MP4 format** (video with audio)
- Game over and background music should be in **MP3 format**
- Background image can be .jpg, .png, or other image formats
- File names are case-sensitive
- The game will continue to work even if some files are missing (warnings will appear in console)
- Volume levels:
  - Milestone videos: 50% (0.5)
  - Game over sounds: 20% (0.2)
  - Background music: 30% (0.3) - loops continuously
