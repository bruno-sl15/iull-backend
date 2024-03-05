import { Vertice } from "./vertice.js";

export class Poligono {
    #vertices;

    constructor (...coordenadas){
        if (coordenadas.length < 6 || coordenadas.length %2 !== 0){
            throw new Error("O polígono deve ter no mínimo 3 vértices e um número par de coordenadas.");
        }
        this.#vertices = Array(coordenadas.length/2);
        for (let i=0, j=0; i<coordenadas.length; i+=2, j++){
            this.#vertices[j] = new Vertice(coordenadas[i], coordenadas[i+1]);
        }
    }

    addVertice(v){
        for (let i=0; i<this.#vertices.length; i++){
            if (this.#vertices[i].equals(v)){
                return false;
            }
        }
        this.#vertices.push(v);
        return true;
    }

    getPerimetro(){
        let perimetro = 0;
        let verticesLength = this.#vertices.length;
        for (let i=0; i<verticesLength; i++){
            perimetro += this.#vertices[i].getDistancia(this.#vertices[(i+1)%verticesLength]);
        }
        return perimetro;
    }

    getQtdVertices(){
        return this.#vertices.length;
    }
}
