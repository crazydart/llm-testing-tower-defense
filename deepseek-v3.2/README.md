# Tower Defense Game

A browser-based tower defense game with 3 types of towers, 2 types of enemies, and 10 waves.

## Features

- **3 Tower Types**:
  - **Basic Tower**: Balanced damage and range
  - **Splash Tower**: Area damage affecting multiple enemies
  - **Sniper Tower**: High single-target damage with slowing effect

- **3 Upgrade Levels** for each tower type
- **2 Enemy Types**:
  - **Grunt**: Fast but weak enemies
  - **Tank**: Slow but strong enemies

- **10 Progressive Waves** with increasing difficulty
- **Currency System**: Earn money by defeating enemies to build and upgrade towers
- **Strategic Placement**: Towers can only be placed away from the path

## How to Play

1. **Select a Tower**: Click on one of the three tower cards in the sidebar
2. **Place Tower**: Click anywhere on the game canvas (away from the path) to place your selected tower
3. **Start Wave**: Click the "Start Wave" button to begin the enemy wave
4. **Upgrade Towers**: Click on an existing tower to select it, then click the upgrade button (costs currency)
5. **Survive**: Defend your base for 10 waves!

### Tower Information

#### Basic Tower
- Cost: $50
- Base Damage: 10
- Base Range: 150
- Fire Rate: 1 shot per second
- Upgrades improve damage, range, and fire rate

#### Splash Tower
- Cost: $75
- Base Damage: 8 (area damage)
- Base Range: 100
- Splash Radius: 60
- Fire Rate: 1.5 seconds per shot
- Upgrades improve all stats including splash radius

#### Sniper Tower
- Cost: $100
- Base Damage: 25
- Base Range: 300
- Slow Effect: 50%
- Fire Rate: 2 seconds per shot
- Upgrades improve damage, range, fire rate, and slow effect

### Enemy Information

#### Grunt
- Health: 50
- Speed: 2
- Reward: $10
- Takes 1 life when reaching base

#### Tank
- Health: 150
- Speed: 1
- Reward: $30
- Takes 2 lives when reaching base

## Game Mechanics

- **Starting Currency**: $150
- **Starting Lives**: 20
- **Wave Completion**: Earn bonus currency between waves
- **Game Over**: When lives reach 0
- **Victory**: Complete all 10 waves

## Controls

- **Left Click**: Select/place towers
- **Start Wave Button**: Begin the next wave
- **Pause Button**: Pause/resume the game
- **Upgrade Button**: Upgrade selected tower

## Installation

No installation required! Simply open `index.html` in your web browser.

### Development

To modify the game:
1. Edit `index.html` for HTML/CSS changes
2. Edit `game.js` for game logic changes

## Browser Compatibility

The game works in all modern browsers that support HTML5 Canvas and ES6 JavaScript.

## Game Strategy Tips

1. Start with Basic Towers to cover more area
2. Place Splash Towers where enemies cluster (corners of the path)
3. Use Sniper Towers for difficult Tank enemies
4. Always upgrade your towers between waves
5. Balance tower placement - don't cluster them too close together

Enjoy the game!
