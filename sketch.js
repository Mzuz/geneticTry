let population;
const lifeSpan = 200;
const maxForce = 0.2;
let lifePar;
let target, obstacle;

function setup() {
    createCanvas(400, 300)
    population = new Population(25);
    lifePar = createP(population.count);
    target = createVector(width / 2, 50);
    obstacle = {
        pos: createVector(100, 150),
        size: {
            w: 150,
            h: 10
        }
    }
}

function draw() {
    background(0);
    noStroke();
    lifePar.html(population.count);
    population.run();

    if (population.count == lifeSpan) {
        population.evaluate();
        population.selection();

        population.count = 0;
    }

    fill('green');
    ellipse(target.x, target.y, 16);

    fill('red');
    rect(obstacle.pos.x, obstacle.pos.y, obstacle.size.w, obstacle.size.h);
}