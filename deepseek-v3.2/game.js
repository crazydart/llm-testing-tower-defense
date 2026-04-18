class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Game state
        this.currency = 150;
        this.lives = 20;
        this.wave = 0;
        this.maxWaves = 10;
        this.gameRunning = false;
        this.gamePaused = false;
        this.selectedTowerType = null;
        this.selectedTower = null;
        
        // Game objects
        this.towers = [];
        this.enemies = [];
        this.projectiles = [];
        
        // Wave management
        this.enemiesToSpawn = 0;
        this.spawnTimer = 0;
        this.spawnInterval = 1000; // ms between enemy spawns
        this.waveCompleted = true;
        
        // Path points (a simple path from left to right with a curve)
        this.path = [
            { x: -50, y: 300 },
            { x: 200, y: 300 },
            { x: 300, y: 200 },
            { x: 300, y: 100 },
            { x: 500, y: 100 },
            { x: 500, y: 400 },
            { x: 700, y: 400 },
            { x: 850, y: 400 } // End of path (base)
        ];
        
        // Tower types
        this.towerTypes = {
            basic: {
                name: 'Basic Tower',
                baseCost: 50,
                baseDamage: 10,
                baseRange: 150,
                baseFireRate: 1000, // ms between shots
                color: '#4cc9f0',
                upgradeLevel: 0,
                upgrades: [
                    { cost: 50, damage: 15, range: 170, fireRate: 800 },
                    { cost: 75, damage: 20, range: 190, fireRate: 600 },
                    { cost: 100, damage: 30, range: 210, fireRate: 400 }
                ]
            },
            splash: {
                name: 'Splash Tower',
                baseCost: 75,
                baseDamage: 8,
                baseRange: 100,
                baseFireRate: 1500,
                splashRadius: 60,
                color: '#f72585',
                upgradeLevel: 0,
                upgrades: [
                    { cost: 50, damage: 12, range: 120, fireRate: 1200, splashRadius: 70 },
                    { cost: 75, damage: 18, range: 140, fireRate: 900, splashRadius: 80 },
                    { cost: 100, damage: 25, range: 160, fireRate: 700, splashRadius: 90 }
                ]
            },
            sniper: {
                name: 'Sniper Tower',
                baseCost: 100,
                baseDamage: 25,
                baseRange: 300,
                baseFireRate: 2000,
                slowEffect: 0.5, // slows enemy speed by 50%
                color: '#f0db4f',
                upgradeLevel: 0,
                upgrades: [
                    { cost: 50, damage: 40, range: 320, fireRate: 1800, slowEffect: 0.6 },
                    { cost: 75, damage: 60, range: 340, fireRate: 1600, slowEffect: 0.7 },
                    { cost: 100, damage: 80, range: 360, fireRate: 1400, slowEffect: 0.8 }
                ]
            }
        };
        
        // Enemy types
        this.enemyTypes = {
            grunt: {
                name: 'Grunt',
                baseHealth: 50,
                speed: 2,
                reward: 10,
                color: '#ff6b6b'
            },
            tank: {
                name: 'Tank',
                baseHealth: 150,
                speed: 1,
                reward: 30,
                color: '#7209b7'
            }
        };
        
        // Wave configurations
        this.waveConfigs = [
            { grunt: 5, tank: 0 },
            { grunt: 8, tank: 0 },
            { grunt: 10, tank: 1 },
            { grunt: 12, tank: 2 },
            { grunt: 15, tank: 3 },
            { grunt: 12, tank: 5 },
            { grunt: 10, tank: 8 },
            { grunt: 8, tank: 10 },
            { grunt: 5, tank: 12 },
            { grunt: 20, tank: 15 }
        ];
        
        this.init();
    }
    
    init() {
        // Event listeners
        this.canvas.addEventListener('click', (e) => this.handleCanvasClick(e));
        document.querySelectorAll('.tower-card').forEach(card => {
            card.addEventListener('click', (e) => this.selectTowerType(e));
        });
        document.getElementById('startBtn').addEventListener('click', () => this.startWave());
        document.getElementById('pauseBtn').addEventListener('click', () => this.togglePause());
        document.getElementById('upgradeBtn').addEventListener('click', () => this.upgradeSelectedTower());
        
        // Initial UI update
        this.updateUI();
        
        // Start game loop
        this.lastTime = 0;
        requestAnimationFrame((time) => this.gameLoop(time));
    }
    
    gameLoop(currentTime) {
        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;
        
        if (!this.gamePaused) {
            this.update(deltaTime);
        }
        
        this.draw();
        requestAnimationFrame((time) => this.gameLoop(time));
    }
    
    update(deltaTime) {
        if (!this.gameRunning) return;
        
        // Spawn enemies
        if (this.enemiesToSpawn > 0) {
            this.spawnTimer += deltaTime;
            if (this.spawnTimer >= this.spawnInterval) {
                this.spawnTimer = 0;
                this.spawnRandomEnemy();
                this.enemiesToSpawn--;
            }
        }
        
        // Update enemies
        for (let i = this.enemies.length - 1; i >= 0; i--) {
            const enemy = this.enemies[i];
            enemy.update(deltaTime);
            
            // Check if enemy reached the end
            if (enemy.pathIndex >= this.path.length - 1) {
                this.lives -= enemy.type === 'tank' ? 2 : 1;
                this.enemies.splice(i, 1);
                this.updateUI();
                if (this.lives <= 0) {
                    this.gameOver();
                }
            }
        }
        
        // Update towers
        this.towers.forEach(tower => {
            tower.update(deltaTime, this.enemies);
            
            // Check for new projectiles
            if (tower.justFired) {
                const target = tower.target;
                if (target) {
                    this.projectiles.push({
                        x: tower.x,
                        y: tower.y,
                        target: target,
                        damage: tower.getDamage(),
                        type: tower.type,
                        splashRadius: tower.type === 'splash' ? tower.getSplashRadius() : 0,
                        slowEffect: tower.type === 'sniper' ? tower.getSlowEffect() : 0
                    });
                }
                tower.justFired = false;
            }
        });
        
        // Update projectiles
        for (let i = this.projectiles.length - 1; i >= 0; i--) {
            const projectile = this.projectiles[i];
            const dx = projectile.target.x - projectile.x;
            const dy = projectile.target.y - projectile.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            const speed = 10;
            if (distance < speed) {
                // Hit target
                if (projectile.type === 'splash') {
                    // Splash damage
                    this.enemies.forEach(enemy => {
                        const enemyDx = enemy.x - projectile.target.x;
                        const enemyDy = enemy.y - projectile.target.y;
                        const enemyDistance = Math.sqrt(enemyDx * enemyDx + enemyDy * enemyDy);
                        if (enemyDistance <= projectile.splashRadius) {
                            enemy.takeDamage(projectile.damage);
                            if (enemy.health <= 0) {
                                this.currency += this.enemyTypes[enemy.type].reward;
                            }
                        }
                    });
                } else {
                    // Single target damage
                    projectile.target.takeDamage(projectile.damage);
                    if (projectile.target.health <= 0) {
                        this.currency += this.enemyTypes[projectile.target.type].reward;
                        // Remove dead enemy
                        const index = this.enemies.indexOf(projectile.target);
                        if (index > -1) {
                            this.enemies.splice(index, 1);
                        }
                    }
                    
                    // Apply slow effect for sniper tower
                    if (projectile.type === 'sniper' && projectile.target.health > 0) {
                        projectile.target.applySlow(projectile.slowEffect, 3000); // 3 seconds
                    }
                }
                this.projectiles.splice(i, 1);
            } else {
                // Move projectile
                projectile.x += (dx / distance) * speed;
                projectile.y += (dy / distance) * speed;
            }
        }
        
        // Remove dead enemies
        for (let i = this.enemies.length - 1; i >= 0; i--) {
            if (this.enemies[i].health <= 0) {
                this.enemies.splice(i, 1);
            }
        }
        
        // Check if wave is completed
        if (this.enemiesToSpawn === 0 && this.enemies.length === 0 && this.wave > 0) {
            this.waveCompleted = true;
            this.gameRunning = false;
            this.updateUI();
        }
    }
    
    draw() {
        // Clear canvas
        this.ctx.fillStyle = '#0d2847';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw path
        this.drawPath();
        
        // Draw towers
        this.towers.forEach(tower => {
            tower.draw(this.ctx);
            if (tower === this.selectedTower) {
                // Highlight selected tower
                this.ctx.strokeStyle = '#f0db4f';
                this.ctx.lineWidth = 3;
                this.ctx.beginPath();
                this.ctx.arc(tower.x, tower.y, tower.radius + 5, 0, Math.PI * 2);
                this.ctx.stroke();
                
                // Draw range circle
                this.ctx.strokeStyle = 'rgba(240, 219, 79, 0.3)';
                this.ctx.lineWidth = 1;
                this.ctx.beginPath();
                this.ctx.arc(tower.x, tower.y, tower.range, 0, Math.PI * 2);
                this.ctx.stroke();
            }
        });
        
        // Draw enemies
        this.enemies.forEach(enemy => {
            enemy.draw(this.ctx);
        });
        
        // Draw projectiles
        this.projectiles.forEach(projectile => {
            this.ctx.fillStyle = projectile.type === 'basic' ? '#4cc9f0' : 
                                projectile.type === 'splash' ? '#f72585' : '#f0db4f';
            this.ctx.beginPath();
            this.ctx.arc(projectile.x, projectile.y, 5, 0, Math.PI * 2);
            this.ctx.fill();
        });
        
        // Draw base
        this.ctx.fillStyle = '#ff6b6b';
        this.ctx.fillRect(this.path[this.path.length - 1].x - 20, 
                         this.path[this.path.length - 1].y - 20, 40, 40);
        this.ctx.fillStyle = '#fff';
        this.ctx.font = '14px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('BASE', this.path[this.path.length - 1].x, 
                         this.path[this.path.length - 1].y + 5);
        
        // Draw tower placement preview
        if (this.selectedTowerType) {
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = this.lastMouseX - rect.left;
            const mouseY = this.lastMouseY - rect.top;
            
            if (mouseX >= 0 && mouseX < this.canvas.width && 
                mouseY >= 0 && mouseY < this.canvas.height) {
                
                const towerType = this.towerTypes[this.selectedTowerType];
                const canPlace = this.canPlaceTower(mouseX, mouseY);
                
                this.ctx.fillStyle = canPlace ? 'rgba(76, 201, 240, 0.5)' : 'rgba(255, 107, 107, 0.5)';
                this.ctx.beginPath();
                this.ctx.arc(mouseX, mouseY, 25, 0, Math.PI * 2);
                this.ctx.fill();
                
                this.ctx.strokeStyle = canPlace ? '#4cc9f0' : '#ff6b6b';
                this.ctx.lineWidth = 2;
                this.ctx.beginPath();
                this.ctx.arc(mouseX, mouseY, towerType.baseRange, 0, Math.PI * 2);
                this.ctx.stroke();
            }
        }
    }
    
    drawPath() {
        this.ctx.strokeStyle = '#4cc9f0';
        this.ctx.lineWidth = 40;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        
        this.ctx.beginPath();
        this.ctx.moveTo(this.path[0].x, this.path[0].y);
        for (let i = 1; i < this.path.length; i++) {
            this.ctx.lineTo(this.path[i].x, this.path[i].y);
        }
        this.ctx.stroke();
        
        // Draw path border
        this.ctx.strokeStyle = '#0f3460';
        this.ctx.lineWidth = 4;
        this.ctx.beginPath();
        this.ctx.moveTo(this.path[0].x, this.path[0].y);
        for (let i = 1; i < this.path.length; i++) {
            this.ctx.lineTo(this.path[i].x, this.path[i].y);
        }
        this.ctx.stroke();
    }
    
    handleCanvasClick(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Store mouse position for tower preview
        this.lastMouseX = e.clientX;
        this.lastMouseY = e.clientY;
        
        if (this.selectedTowerType) {
            // Try to place a tower
            if (this.canPlaceTower(x, y)) {
                const cost = this.towerTypes[this.selectedTowerType].baseCost;
                if (this.currency >= cost) {
                    this.currency -= cost;
                    this.towers.push(new Tower(x, y, this.selectedTowerType, this.towerTypes));
                    this.updateUI();
                    this.selectedTowerType = null;
                }
            }
        } else {
            // Check if clicked on a tower
            let clickedTower = null;
            for (const tower of this.towers) {
                const dx = x - tower.x;
                const dy = y - tower.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance <= tower.radius) {
                    clickedTower = tower;
                    break;
                }
            }
            
            if (clickedTower) {
                this.selectedTower = clickedTower;
                this.updateUI();
            } else {
                this.selectedTower = null;
                this.updateUI();
            }
        }
    }
    
    canPlaceTower(x, y) {
        // Check if too close to path
        for (let i = 0; i < this.path.length - 1; i++) {
            const p1 = this.path[i];
            const p2 = this.path[i + 1];
            
            // Distance from point to line segment
            const A = x - p1.x;
            const B = y - p1.y;
            const C = p2.x - p1.x;
            const D = p2.y - p1.y;
            
            const dot = A * C + B * D;
            const lenSq = C * C + D * D;
            let param = -1;
            if (lenSq !== 0) param = dot / lenSq;
            
            let xx, yy;
            if (param < 0) {
                xx = p1.x;
                yy = p1.y;
            } else if (param > 1) {
                xx = p2.x;
                yy = p2.y;
            } else {
                xx = p1.x + param * C;
                yy = p1.y + param * D;
            }
            
            const dx = x - xx;
            const dy = y - yy;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 50) return false;
        }
        
        // Check if too close to other towers
        for (const tower of this.towers) {
            const dx = x - tower.x;
            const dy = y - tower.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 60) return false;
        }
        
        return true;
    }
    
    selectTowerType(e) {
        const card = e.currentTarget;
        const type = card.dataset.type;
        const cost = parseInt(card.dataset.cost);
        
        if (this.currency >= cost) {
            document.querySelectorAll('.tower-card').forEach(c => {
                c.classList.remove('selected');
            });
            card.classList.add('selected');
            this.selectedTowerType = type;
            this.selectedTower = null;
            this.updateUI();
        }
    }
    
    startWave() {
        if (this.wave >= this.maxWaves) {
            alert('Congratulations! You have completed all waves!');
            return;
        }
        
        if (this.waveCompleted || this.wave === 0) {
            this.wave++;
            this.waveCompleted = false;
            this.gameRunning = true;
            
            const config = this.waveConfigs[this.wave - 1];
            this.enemiesToSpawn = config.grunt + config.tank;
            
            // Store wave composition for spawning
            this.waveComposition = [];
            for (let i = 0; i < config.grunt; i++) this.waveComposition.push('grunt');
            for (let i = 0; i < config.tank; i++) this.waveComposition.push('tank');
            
            // Shuffle wave composition
            for (let i = this.waveComposition.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [this.waveComposition[i], this.waveComposition[j]] = [this.waveComposition[j], this.waveComposition[i]];
            }
            
            this.spawnTimer = 0;
            this.updateUI();
        }
    }
    
    spawnRandomEnemy() {
        if (this.waveComposition.length > 0) {
            const type = this.waveComposition.shift();
            this.enemies.push(new Enemy(this.path[0].x, this.path[0].y, type, this.path, this.enemyTypes));
        }
    }
    
    togglePause() {
        this.gamePaused = !this.gamePaused;
        const pauseBtn = document.getElementById('pauseBtn');
        pauseBtn.textContent = this.gamePaused ? 'Resume' : 'Pause';
    }
    
    upgradeSelectedTower() {
        if (this.selectedTower && this.selectedTower.canUpgrade()) {
            const upgradeCost = this.selectedTower.getUpgradeCost();
            if (this.currency >= upgradeCost) {
                this.currency -= upgradeCost;
                this.selectedTower.upgrade();
                this.updateUI();
            }
        }
    }
    
    gameOver() {
        this.gameRunning = false;
        alert(`Game Over! You survived ${this.wave} waves.`);
        this.resetGame();
    }
    
    resetGame() {
        this.currency = 150;
        this.lives = 20;
        this.wave = 0;
        this.towers = [];
        this.enemies = [];
        this.projectiles = [];
        this.selectedTower = null;
        this.selectedTowerType = null;
        this.updateUI();
    }
    
    updateUI() {
        document.getElementById('currency').textContent = this.currency;
        document.getElementById('wave').textContent = `${this.wave}/${this.maxWaves}`;
        document.getElementById('lives').textContent = this.lives;
        
        // Update tower cards selection
        document.querySelectorAll('.tower-card').forEach(card => {
            const cost = parseInt(card.dataset.cost);
            if (this.currency < cost) {
                card.style.opacity = '0.5';
            } else {
                card.style.opacity = '1';
            }
        });
        
        // Update upgrade button
        const upgradeBtn = document.getElementById('upgradeBtn');
        if (this.selectedTower && this.selectedTower.canUpgrade()) {
            const upgradeCost = this.selectedTower.getUpgradeCost();
            upgradeBtn.disabled = this.currency < upgradeCost;
            upgradeBtn.textContent = `Upgrade (Level ${this.selectedTower.upgradeLevel + 1}) - $${upgradeCost}`;
        } else {
            upgradeBtn.disabled = true;
            upgradeBtn.textContent = 'Upgrade Selected Tower';
        }
        
        // Update start button
        const startBtn = document.getElementById('startBtn');
        if (this.wave >= this.maxWaves) {
            startBtn.textContent = 'Game Complete!';
            startBtn.disabled = true;
        } else if (this.waveCompleted || this.wave === 0) {
            startBtn.textContent = `Start Wave ${this.wave + 1}`;
            startBtn.disabled = false;
        } else {
            startBtn.textContent = 'Wave in Progress';
            startBtn.disabled = true;
        }
    }
}

class Tower {
    constructor(x, y, type, towerTypes) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.towerTypes = towerTypes;
        this.config = towerTypes[type];
        
        this.radius = 25;
        this.upgradeLevel = 0;
        this.target = null;
        this.fireTimer = 0;
        this.justFired = false;
        
        this.updateStats();
    }
    
    updateStats() {
        this.damage = this.config.baseDamage;
        this.range = this.config.baseRange;
        this.fireRate = this.config.baseFireRate;
        this.color = this.config.color;
        
        if (this.upgradeLevel > 0) {
            const upgrade = this.config.upgrades[this.upgradeLevel - 1];
            this.damage = upgrade.damage;
            this.range = upgrade.range;
            this.fireRate = upgrade.fireRate;
            if (this.type === 'splash') {
                this.splashRadius = upgrade.splashRadius;
            }
            if (this.type === 'sniper') {
                this.slowEffect = upgrade.slowEffect;
            }
        }
    }
    
    getDamage() {
        return this.damage;
    }
    
    getSplashRadius() {
        return this.splashRadius || this.config.splashRadius;
    }
    
    getSlowEffect() {
        return this.slowEffect || this.config.slowEffect;
    }
    
    update(deltaTime, enemies) {
        this.fireTimer += deltaTime;
        
        // Find target
        if (!this.target || this.target.health <= 0) {
            this.target = this.findTarget(enemies);
        }
        
        // Shoot if target exists and fire timer ready
        if (this.target && this.fireTimer >= this.fireRate) {
            this.fireTimer = 0;
            this.justFired = true;
        }
    }
    
    findTarget(enemies) {
        let closestEnemy = null;
        let closestDistance = this.range;
        
        for (const enemy of enemies) {
            const dx = enemy.x - this.x;
            const dy = enemy.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance <= closestDistance) {
                closestEnemy = enemy;
                closestDistance = distance;
            }
        }
        
        return closestEnemy;
    }
    
    draw(ctx) {
        // Draw tower base
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw tower details
        ctx.fillStyle = 'white';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`L${this.upgradeLevel + 1}`, this.x, this.y + 4);
        
        // Draw tower type indicator
        if (this.type === 'splash') {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, 8, 0, Math.PI * 2);
            ctx.fill();
        } else if (this.type === 'sniper') {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.fillRect(this.x - 8, this.y - 8, 16, 16);
        }
    }
    
    canUpgrade() {
        return this.upgradeLevel < 3;
    }
    
    getUpgradeCost() {
        if (this.upgradeLevel >= 3) return Infinity;
        return this.config.upgrades[this.upgradeLevel].cost;
    }
    
    upgrade() {
        if (this.canUpgrade()) {
            this.upgradeLevel++;
            this.updateStats();
        }
    }
}

class Enemy {
    constructor(x, y, type, path, enemyTypes) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.path = path;
        this.config = enemyTypes[type];
        
        this.health = this.config.baseHealth;
        this.maxHealth = this.config.baseHealth;
        this.speed = this.config.speed;
        this.color = this.config.color;
        this.radius = 15;
        
        this.pathIndex = 0;
        this.slowTimer = 0;
        this.slowEffect = 1; // 1 = normal speed
    }
    
    update(deltaTime) {
        // Update slow effect
        if (this.slowTimer > 0) {
            this.slowTimer -= deltaTime;
            if (this.slowTimer <= 0) {
                this.slowEffect = 1;
            }
        }
        
        // Move along path
        const target = this.path[this.pathIndex + 1];
        if (target) {
            const dx = target.x - this.x;
            const dy = target.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 1) {
                this.pathIndex++;
            } else {
                const moveSpeed = this.speed * (this.slowEffect || 1);
                this.x += (dx / distance) * moveSpeed;
                this.y += (dy / distance) * moveSpeed;
            }
        }
    }
    
    draw(ctx) {
        // Draw enemy body
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw enemy type indicator
        ctx.fillStyle = 'white';
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';
        
        if (this.type === 'grunt') {
            ctx.fillText('G', this.x, this.y + 3);
        } else {
            ctx.fillText('T', this.x, this.y + 3);
        }
        
        // Draw health bar
        const healthPercentage = this.health / this.maxHealth;
        const barWidth = 30;
        const barHeight = 4;
        const barX = this.x - barWidth / 2;
        const barY = this.y - this.radius - 8;
        
        ctx.fillStyle = '#ff6b6b';
        ctx.fillRect(barX, barY, barWidth, barHeight);
        
        ctx.fillStyle = '#4cc9f0';
        ctx.fillRect(barX, barY, barWidth * healthPercentage, barHeight);
        
        // Draw slow effect indicator
        if (this.slowTimer > 0) {
            ctx.strokeStyle = '#f0db4f';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius + 2, 0, Math.PI * 2);
            ctx.stroke();
        }
    }
    
    takeDamage(amount) {
        this.health -= amount;
    }
    
    applySlow(effect, duration) {
        this.slowEffect = 1 - effect;
        this.slowTimer = duration;
    }
}

// Initialize game when page loads
window.addEventListener('DOMContentLoaded', () => {
    new Game();
});