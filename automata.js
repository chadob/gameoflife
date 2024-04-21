class Automata {
    constructor(game, initColor, colorStep, percentSpawn, width, height) {
        this.backgroundArray = [];
        this.viewArray = [];
        this.chance = percentSpawn;
        this.width = width;
        this.height = height;
        this.viewWidth = 1000;
        this.viewHeight = 500;
        this.tickCount = 0;
        this.ticks = 0;
        this.color = parseInt(initColor.toString(16), 16);  
        this.colorStep = parseInt(colorStep.toString(16), 16);
        this.speed = parseInt(document.getElementById("speed").value, 10);
        for (let i=0; i < this.width + 2; i++) {
            this.backgroundArray[i] = [];
            this.viewArray[i] = [];
            for (let j=0; j < this.height+2; j++) {
                if (i == 0 || i == this.width + 1 || j == 0 || j== this.height + 1) {
                    this.backgroundArray[i][j] = 0;
                } else {
                    let random = Math.floor(Math.random() * 100);
                    if (random <= this.chance) {
                        this.backgroundArray[i][j] = 1; 
                    } else {
                        this.backgroundArray[i][j] = 0;
                    }
                }
            }
        }
        for (var i = 0; i < this.backgroundArray.length; i++) {
            this.viewArray[i] = this.backgroundArray[i].slice();
        }
    }

    update() {
        this.speed = parseInt(document.getElementById("speed").value, 10);
        if (this.tickCount++ >= this.speed && this.speed != 120) {
            this.color =  this.color + this.colorStep;
            this.tickCount = 0;
            this.ticks++;
            for (let i=1; i < this.width+1; i++) {
                for (let j=1; j < this.height+1; j++) {
                    let neighborCount = 0;
                    if (this.backgroundArray[i-1][j-1] > 0) {
                        neighborCount++
                    } if (this.backgroundArray[i-1][j] > 0) {
                        neighborCount++
                    } if (this.backgroundArray[i-1][j+1] > 0) {
                        neighborCount++
                    } if (this.backgroundArray[i][j-1] > 0) {
                        neighborCount++
                    } if (this.backgroundArray[i][j+1] > 0) {
                        neighborCount++
                    } if (this.backgroundArray[i+1][j-1] > 0) {
                        neighborCount++
                    } if (this.backgroundArray[i+1][j] > 0) {
                        neighborCount++
                    } if (this.backgroundArray[i+1][j+1] > 0) {
                        neighborCount++
                    }
                    if (neighborCount > 3 || neighborCount < 2) {
                        this.viewArray[i][j] = 0;
                    } else {
                        this.viewArray[i][j] = 1;
                    }
                }           
            }
            for (var i = 0; i < this.viewArray.length; i++) {
                this.backgroundArray[i] = this.viewArray[i].slice();
            }
        }          
    }
    draw(ctx) {
        let sqWidth = this.viewWidth / this.width;
        let sqHeight = this.viewHeight / this.height;
        for(let i = 1; i < this.width + 1; i++) {
            for (let j = 1; j < this.height + 1; j++) {
                ctx.fillStyle = "#" + this.color.toString(16);
                if (this.viewArray[i][j]) {
                    ctx.fillRect((i-1)*sqWidth, (j-1)*sqHeight, sqWidth, sqHeight)
                }
            }
        }
    }
}