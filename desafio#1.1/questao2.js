import { Triangulo } from './classes/triangulo.js';
import { question } from 'readline-sync';

let triangulos = Array(4);
const cardinais = ["primeiro", "segundo", "terceiro"];
for (let i = 0; i < 3; i++) {
    let [vAX, vAY, vBX, vBY, vCX, vCY] = question(`Digite as coordenadas dos 3 vértices do ${cardinais[i]} triângulo separadas por espaço (vAX vAY vBX vBY vCX vCY): `).split(" ");
    triangulos[i] = new Triangulo(vAX, vAY, vBX, vBY, vCX, vCY);
}

console.log(`\nO primeiro e segundo triângulos são iguais? ${triangulos[0].equals(triangulos[1]) ? "Sim" : "Não"}`);
console.log(`O primeiro triângulo tem perímetro igual a ${triangulos[0].getPerimetro().toFixed(2)} e área igual a ${triangulos[0].getArea().toFixed(2)}`);
console.log(`O terceiro triângulo é ${triangulos[2].tipo()}.`)

triangulos[3] = triangulos[1].clone();
console.log('O segundo triângulo foi clonado.')
