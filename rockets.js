class Rocket {
    constructor(dna) {
        this.pos = createVector(width / 2, height - 20);
        this.vel = createVector(0);
        this.acc = createVector();
        this.count = 0;
        this.fitness = 0;
        this.completed = false;
        this.crashed = false;

        if (dna) {
            this.dna = dna;
        } else {
            this.dna = new Dna();
        }

    }

    applyForce(force) {
        this.acc.add(force);
    }

    update() {

        let d = dist(this.pos.x, this.pos.y, target.x, target.y);

        if (d < 10) {
            this.completed = true;
            this.pos = target.copy();
        }

        this.colision();

        this.applyForce(this.dna.genes[population.count]);

        if (!this.completed && !this.crashed) {
            this.vel.add(this.acc);
            this.pos.add(this.vel);
            this.acc.mult(0);
            this.vel.limit(4);
        }
    }

    colision() {

        if (this.pos.x > obstacle.pos.x && this.pos.x < obstacle.pos.x + obstacle.size.w && this.pos.y < obstacle.pos.y + obstacle.size.h) {
            this.crashed = true;
        }

        if (this.pos.x > width || this.pos.x < 0) {
            this.crashed = true;
        }
        if (this.pos.y > height || this.pos.y < 0) {
            this.crashed = true;
        }
    }

    show() {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading());
        rectMode(CENTER);
        noStroke();
        fill(255, 155);
        rect(0, 0, 25, 5);
        pop();
    }

    calcFitness() {
        let d = dist(this.pos.x, this.pos.y, target.x, target.y);
        this.fitness = map(d, 0, width, width, 0);

        if (this.completed) {
            this.fitness *= 10;
        }

        if (this.crashed) {
            this.fitness /= 10;
        }
    }
}

class Dna {
    constructor(genes) {
        if (genes) {
            this.genes = genes;
        } else {
            this.genes = [];
            for (let i = 0; i < lifeSpan; i++) {
                this.genes.push(p5.Vector.random2D());
                this.genes[i].setMag(maxForce);
            }
        }
    }

    crossover(partner) {
        let newGenes = [];
        let mid = floor(random(this.genes.length))

        for (let i = 0; i < this.genes.length; i++) {
            if (i > mid) {
                newGenes.push(this.genes[i])
            } else {
                newGenes.push(partner.genes[i])
            }
        }

        return new Dna(newGenes);
    }

    mutation() {
        for (let i = 0; i < this.genes.length; i++) {
            if (random(1) < 0.01) {
                this.genes[i] = p5.Vector.random2D();
                this.genes[i].mag(maxForce);
            }
        }
    }
}