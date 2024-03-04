import { question } from 'readline-sync';
import { alphabet } from '../modules/alphabet.js';

class Vertice {
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
        let distancia = ((this.#x - vertice.x)**2 + (this.y - vertice.y)**2)**0.5;
        return distancia.toFixed(2);
    }

    move(x, y) {
        this.#x = x;
        this.#y = y;
    }

    equals(vertice) {
        return this.#x === vertice.x && this.#y === vertice.y;
    }
}


let vertices = Array(3);
for (let i = 0; i < 3; i++) {
    let [x, y] = question(`Digite as coordenadas do vértice ${alphabet[i]} separadas por espaço (x y): `).split(" ");
    vertices[i] = new Vertice(x, y);
}

console.log(`\nDistância entre os vértices A e B: ${vertices[0].getDistancia(vertices[1])}`);
console.log(`Os vértices A e B são iguais? ${vertices[0].equals(vertices[1]) ? "Sim" : "Não"}`);

let [x, y] = question(`\nVamos mover o vértice C. Digite as novas coordenadas (x y): `).split(" ");
vertices[2].move(x, y);
console.log(`O vértice C agora tem as coordenadas x:${vertices[2].x} e y:${vertices[2].y}`);
