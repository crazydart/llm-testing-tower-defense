# Tower Defense Game - SPEC.md

## Project Overview
- **Name**: Crystal Siege
- **Type**: Tower Defense Game
- **Core Functionality**: Strategic tower placement game where players defend against waves of enemies using upgraded towers
- **Target Users**: Casual browser gamers

## Visual & Rendering Specification

### Scene Setup
- **View**: Top-down 2D grid-based map
- **Canvas Size**: Responsive, centered on screen (min 900x600)
- **Grid**: 15x10 tile grid for tower placement
- **Path**: Winding path from left spawn to right exit

### Art Style
- **Theme**: Fantasy medieval with a stylized, clean vector look
- **Color Palette**:
  - Background: Dark mossy green (#2d4a3e)
  - Path: Sandy brown (#c9a66b)
  - Grass tiles: Various green shades (#3d6b4f, #4a7a5c)
  - UI: Parchment tan (#f4e4bc) with dark brown text (#3d2914)

### Tower Visuals
1. **Arrow Tower** (Bowman)
   - Level 1: Small wooden tower, tan/brown
   - Level 2: Larger stone tower, gray-brown
   - Level 3: Fortified tower with flag, dark stone

2. **Cannon Tower** (Bombard)
   - Level 1: Wooden platform with bronze cannon
   - Level 2: Stone platform, larger cannon
   - Level 3: Reinforced platform, double barrel

3. **Frost Tower** (Cryomancer)
   - Level 1: Small ice blue crystal on pedestal
   - Level 2: Larger crystal with frost aura
   - Level 3: Master crystal with swirling snow particles

### Enemy Visuals
1. **Goblin**
   - Small, green, hunched figure
   - Fast movement animation
   - Health bar above

2. **Orc**
   - Large, brownish-green, muscular
   - Slow, stomping movement
   - Larger health bar

### Effects
- Projectile trails (arrows: yellow, cannon: orange fireball, frost: blue ice shards)
- Explosion effects on cannon impact
- Frost slow effect (blue tint on slowed enemies)
- Tower attack range indicator (semi-transparent circle)
- Death particles (green for goblins, brown for orcs)

## Game Mechanics Specification

### Currency System
- **Starting Gold**: 200
- **Goblin Kill Reward**: 10 gold
- **Orc Kill Reward**: 25 gold
- **Wave Completion Bonus**: 50 gold

### Tower Stats

#### Arrow Tower (Anti-fast)
| Level | Cost | Damage | Fire Rate | Range | Special |
|-------|------|--------|-----------|-------|---------|
| 1 | 50 | 10 | 0.8s | 3 tiles | - |
| 2 | 75 | 18 | 0.6s | 3.5 tiles | Piercing (hits 2) |
| 3 | 100 | 30 | 0.5s | 4 tiles | Piercing (hits 3) |

#### Cannon Tower (High damage, splash)
| Level | Cost | Damage | Fire Rate | Range | Splash |
|-------|------|--------|-----------|-------|--------|
| 1 | 75 | 25 | 1.5s | 2.5 tiles | 0.5 tile |
| 2 | 100 | 40 | 1.3s | 3 tiles | 0.8 tile |
| 3 | 125 | 60 | 1.0s | 3.5 tiles | 1.2 tile |

#### Frost Tower (Slow + damage)
| Level | Cost | Damage | Fire Rate | Range | Slow % |
|-------|------|--------|-----------|-------|--------|
| 1 | 60 | 5 | 1.0s | 3 tiles | 30% |
| 2 | 85 | 10 | 0.8s | 3.5 tiles | 50% |
| 3 | 110 | 15 | 0.6s | 4 tiles | 70% |

### Enemy Stats

#### Goblin
- Health: 50 (scales with wave)
- Speed: 2 tiles/second
- Size: Small

#### Orc
- Health: 150 (scales with wave)
- Speed: 0.8 tiles/second
- Size: Large

### Wave Composition (10 waves)
- Wave 1: 5 Goblins
- Wave 2: 8 Goblins
- Wave 3: 5 Goblins, 2 Orcs
- Wave 4: 10 Goblins, 3 Orcs
- Wave 5: 8 Goblins, 5 Orcs
- Wave 6: 15 Goblins, 4 Orcs
- Wave 7: 10 Goblins, 8 Orcs
- Wave 8: 20 Goblins, 6 Orcs
- Wave 9: 15 Goblins, 12 Orcs
- Wave 10: 25 Goblins, 15 Orcs (BOSS WAVE)

### Scaling
- Enemy health increases by 10% per wave after wave 3

## Interaction Specification

### Controls
- **Mouse Click**: Select tower type from UI panel
- **Mouse Click on Grid**: Place selected tower (if valid and affordable)
- **Mouse Click on Tower**: Select tower for upgrade/sell options
- **Upgrade Button**: Upgrade selected tower (if affordable)
- **Sell Button**: Sell tower for 60% of total investment

### UI Elements
- **Top Bar**: Wave counter, Lives remaining, Gold amount
- **Bottom Panel**: Tower selection buttons with costs
- **Side Panel** (when tower selected): Current stats, Upgrade button, Sell button
- **Start Wave Button**: Begins next wave
- **Game Over Screen**: Final score, restart button
- **Victory Screen**: Congratulations, final stats

### Game States
- **Pre-wave**: Place/upgrade towers
- **Wave Active**: Enemies spawning and moving
- **Wave Complete**: Bonus awarded, prep for next wave
- **Victory**: All 10 waves cleared
- **Defeat**: Lives reach 0

### Lives System
- Starting Lives: 20
- Goblin escape penalty: 1 life
- Orc escape penalty: 2 lives

## Audio (Optional - CSS/Visual feedback priority)
- No audio required; visual feedback will be primary

## Acceptance Criteria

1. ✓ Game loads with 200 gold and 20 lives
2. ✓ 3 tower types available with 3 upgrade levels each
3. ✓ 2 enemy types with distinct visuals and stats
4. ✓ 10 waves of increasing difficulty
5. ✓ Currency earned from kills and wave completion
6. ✓ Towers can be placed on valid grid tiles only
7. ✓ Towers can be upgraded and sold
8. ✓ Enemies follow the defined path
9. ✓ Game ends in victory after wave 10 or defeat at 0 lives
10. ✓ All interactions provide visual feedback
</contents>