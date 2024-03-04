import { Vertice } from './vertice.js';

export class Triangulo {
    #verticeA;
    #verticeB;
    #verticeC;
    #ladoAB;
    #ladoBC;
    #ladoCA;

    constructor(vAX, vAY, vBX, vBY, vCX, vCY) {
        this.#verticeA = new Vertice(vAX, vAY);
        this.#verticeB = new Vertice(vBX, vBY);
        this.#verticeC = new Vertice(vCX, vCY);
        this.#ladoAB = this.#verticeA.getDistancia(this.#verticeB);
        this.#ladoBC = this.#verticeB.getDistancia(this.#verticeC);
        this.#ladoCA = this.#verticeC.getDistancia(this.#verticeA);
        if (this.getArea() === 0) {
            throw new Error("Os três vértices não formam um triângulo.");
        }
    }

    get verticeA() {
        return this.#verticeA;
    }

    get verticeB() {
        return this.#verticeB;
    }

    get verticeC() {
        return this.#verticeC;
    }

    get ladoAB() {
        return this.#ladoAB;
    }

    get ladoBC() {
        return this.#ladoBC;
    }

    get ladoCA() {
        return this.#ladoCA;
    }

    getPerimetro() {
        return this.#ladoAB + this.#ladoBC + this.#ladoCA;
    }

    getArea() {
        const s = this.getPerimetro()/2;
        return (s * (s-this.#ladoAB) * (s-this.#ladoBC) * (s-this.#ladoCA))**0.5;
    }

    equals(triangulo) {
        let angulosTriangulo1 = Array(3);
        let angulosTriangulo2 = Array(3);

        let [a, b, c] = [this.#ladoAB, this.#ladoBC, this.#ladoCA];
        angulosTriangulo1[0] = Math.acos((b**2 + c**2 - a**2) / (2 * b * c));
        angulosTriangulo1[1] = Math.acos((a**2 + c**2 - b**2) / (2 * a * c));
        angulosTriangulo1[2] = Math.acos((a**2 + b**2 - c**2) / (2 * a * b));

        [a, b, c] = [triangulo.ladoAB, triangulo.ladoBC, triangulo.ladoCA];
        angulosTriangulo2[0] = Math.acos((b**2 + c**2 - a**2) / (2 * b * c));
        angulosTriangulo2[1] = Math.acos((a**2 + c**2 - b**2) / (2 * a * c));
        angulosTriangulo2[2] = Math.acos((a**2 + b**2 - c**2) / (2 * a * b));

        return angulosTriangulo1.every((val) => angulosTriangulo2.includes(val));
    }

    tipo() {
        if (this.#ladoAB === this.#ladoBC && this.#ladoBC === this.#ladoCA && this.#ladoCA === this.#ladoAB){
            return "equilátero";
        }
        else if (this.#ladoAB !== this.#ladoBC && this.#ladoBC !== this.#ladoCA && this.#ladoCA !== this.#ladoAB) {
            return "escaleno";
        }
        else {
            return "isósceles";
        }
    }

    clone() {
        return {...this};
    }
}
