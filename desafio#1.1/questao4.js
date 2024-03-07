import { Turma } from './classes/turma.js';
import { question } from 'readline-sync';

let turma = new Turma();
while (true) {
    console.log("\nInsira o número correspondente a ação desejada:");
    console.log("\t1 - Inserir Aluno");
    console.log("\t2 - Remover Aluno")
    console.log("\t3 - Inserir Nota");
    console.log("\t4 - Listar Alunos");
    console.log("\t0 - Sair");
    let opcao = question('\n\t');

    console.log('')
    if (opcao === "1") {
        let matricula = question("Digite a matrícula do aluno: ");
        let nome = question("Digite o nome do aluno: ");
        try {
            turma.inserirAluno(matricula, nome);
            console.log("Aluno inserido com sucesso.");
        }
        catch (e) {
            console.log(e.message);
        }
    }

    else if (opcao === "2") {  
        let matricula = question("Digite a matrícula do aluno: ");
        try {
            turma.removerAluno(matricula);
            console.log("Aluno removido com sucesso.");
        }
        catch (e) {
            console.log(e.message);
        }
    }
    
    else if (opcao === "3") {
        let matricula = question("Digite a matrícula do aluno: ");
        let p = question("Digite a prova (1 ou 2): ");
        let nota = question("Digite a nota: ");
        try{
            turma.inserirNota(matricula, p, nota);
            console.log("Nota inserida com sucesso.");
        }
        catch (e) {
            console.log(e.message);
        }
    }

    else if (opcao === "4") {
        turma.printTurma();
    }

    else if (opcao === "0") {
        break;
    }

}
