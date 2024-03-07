import { Vertice } from "./classes/vertice.js";
import { Poligono } from "./classes/poligono.js";
import { question } from "readline-sync";

let coordenadas = question('Digite as coordenadas do vértice separadas por espaço (v1X v1y v2X v2Y ... vnX vnY): ').split(" ");
let poligono = new Poligono(...coordenadas);

let coordenada = question('Vamos adicionar um novo vértice ao polígono. Digite as coordenadas separadas por espaço (vX vY): ').split(" ")
console.log(`${poligono.addVertice(new Vertice(coordenada[0], coordenada[1])) ? "Vértice adicionado com sucesso." : "Esse vértice já existe."}`);
poligono.addVertice(new Vertice(coordenada[0], coordenada[1]));

console.log(`O polígono contém ${poligono.getQtdVertices()} vértices e perímetro igual a ${poligono.getPerimetro().toFixed(2)}`);
