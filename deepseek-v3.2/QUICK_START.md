# Quick Start Guide for Tower Defense Game

## To Play the Game:

### Option 1: Direct File Open (Easiest)
Simply open `index.html` in your web browser.

### Option 2: Local Web Server
1. Open a terminal/command prompt in this folder
2. Run one of these commands:

**macOS/Linux:**
```bash
./start-game.sh
```

**Windows:**
```bash
start-game.bat
```

**Or manually:**
```bash
python3 -m http.server 8000
```

3. Open your browser and go to: http://localhost:8000

## Game Features Summary:

✅ **3 Tower Types**:
   - Basic Tower ($50) - Balanced stats
   - Splash Tower ($75) - Area damage
   - Sniper Tower ($100) - Slows enemies

✅ **3 Upgrade Levels** per tower
✅ **2 Enemy Types**:
   - Grunt (fast, weak, $10 reward)
   - Tank (slow, strong, $30 reward)

✅ **10 Waves** with increasing difficulty
✅ **Currency System** - Start with $150
✅ **Strategic Tower Placement** - Can't place on path
✅ **Visual Feedback** - Tower range indicators, health bars

## Controls:
- Click tower cards to select tower type
- Click on game area to place selected tower
- Click on placed tower to select for upgrades
- Use Upgrade button to upgrade selected tower
- Start Wave button begins next wave
- Pause button pauses/resumes game

## Files Created:
- `index.html` - Main game interface
- `game.js` - All game logic (14KB)
- `README.md` - Full documentation
- `serve.py` - Python HTTP server
- `start-game.sh` - macOS/Linux launcher
- `start-game.bat` - Windows launcher
- `QUICK_START.md` - This file

Enjoy your tower defense game!
