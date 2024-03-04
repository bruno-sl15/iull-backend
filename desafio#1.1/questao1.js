import { Vertice } from './vertice.js';
import { question } from 'readline-sync';
import { alphabet } from '../modules/alphabet.js';

let vertices = Array(3);
for (let i = 0; i < 3; i++) {
    let [x, y] = question(`Digite as coordenadas do vértice ${alphabet[i]} separadas por espaço (x y): `).split(" ");
    vertices[i] = new Vertice(x, y);
}

console.log(`\nDistância entre os vértices A e B: ${vertices[0].getDistancia(vertices[1]).toFixed(2)}`);
console.log(`Os vértices A e B são iguais? ${vertices[0].equals(vertices[1]) ? "Sim" : "Não"}`);

let [x, y] = question(`\nVamos mover o vértice C. Digite as novas coordenadas (x y): `).split(" ");
vertices[2].move(x, y);
console.log(`O vértice C agora tem as coordenadas x:${vertices[2].x} e y:${vertices[2].y}`);
