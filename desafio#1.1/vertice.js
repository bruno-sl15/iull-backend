export class Vertice {
    #x;
    #y;

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    get x() {
        return this.#x;
    }

    get y() {
        return this.#y;
    }

    getDistancia(vertice) {
        return ((this.#x - vertice.x)**2 + (this.y - vertice.y)**2)**0.5;
    }

    move(x, y) {
        this.#x = x;
        this.#y = y;
    }

    equals(vertice) {
        return this.#x === vertice.x && this.#y === vertice.y;
    }
}
