class Population {
    constructor(size) {
        this.rockets = [];
        this.popSize = size;
        this.count = 0;
        this.matingPool = [];

        for (let i = 0; i < this.popSize; i++) {
            this.rockets.push(new Rocket());
        }
    }

    run() {
        this.rockets.forEach(rocket => {
            rocket.update();
            rocket.show();
        });

        this.count++;
    }

    evaluate() {

        let maxFit = 0;
        this.matingPool = [];

        this.rockets.forEach(rocket => {
            rocket.calcFitness();
            if (rocket.fitness > maxFit) {
                maxFit = rocket.fitness;
            }
        });

        this.rockets.forEach(rocket => {
            rocket.fitness /= maxFit;
        });

        this.rockets.forEach(rocket => {
            let n = rocket.fitness * 100;

            for (let i = 0; i < n; i++) {
                this.matingPool.push(rocket);
            }

        });
    }

    selection() {
        let newRockets = [];

        this.rockets.forEach(() => {
            let parentA = random(this.matingPool).dna;
            let parentB = random(this.matingPool).dna;
            let child = parentA.crossover(parentB);

            child.mutation();

            newRockets.push(new Rocket(child));
        });

        this.rockets = newRockets;

    }
}