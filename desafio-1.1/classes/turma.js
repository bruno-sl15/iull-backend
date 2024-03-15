import { Aluno } from './aluno.js';

export class Turma {
    #alunos = Array();

    inserirAluno(matricula, nome){
        if (this.#isMatricula(matricula)){
            throw new Error("Já existe um aluno com esta matrícula.");
        }
        this.#alunos.splice(this.#insertIndex(nome), 0, new Aluno(matricula, nome));
    }

    removerAluno(matricula){
        if (!this.#isMatricula(matricula)){
            throw new Error("Aluno não encontrado.");
        }
        this.#alunos.splice(this.#getIndiceAluno(matricula), 1);
    }

    inserirNota(matricula, p, nota){
        if (!this.#isMatricula(matricula)){
            throw new Error("Aluno não encontrado.");
        }
        if (p == 1 || p.toLowerCase() === 'p1'){
            this.#alunos[this.#getIndiceAluno(matricula)].p1 = nota;
        }
        else if (p == 2 || p.toLowerCase() === 'p2'){
            this.#alunos[this.#getIndiceAluno(matricula)].p2 = nota;
        }
        else {
            throw new Error("O parâmetro p do método inserirNoTa deve ser 'p1' ou 1 para inserir a nota de P1 e 'p2' ou 2 para inserir a nota de P2.");
        }
    }

    printTurma(){
        let [maxNome, maxMatricula] = this.#maxNomeMatricula();
        let separador = "-".repeat(maxNome+maxMatricula+30);
        console.log(separador);
        console.log(`${this.#pad("Matrícula", maxMatricula, " ")} ${"Nome".padEnd(maxNome, " ")}    P1   P2   NF`);
        console.log(separador);
        for (let i =0; i < this.#alunos.length; i++){
            console.log(`${this.#pad(this.#alunos[i].matricula, maxMatricula>9 ? maxMatricula : 9, " ")} ${this.#alunos[i].nome.padEnd(maxNome<4 ? 4 : maxNome, " ")}   ${this.#alunos[i].p1 === "-" ? "  -" : this.#alunos[i].p1}  ${this.#alunos[i].p2 === "-" ? "  -" : this.#alunos[i].p2}  ${this.#alunos[i].getNotaFinal()}`);
        }
        console.log(separador);
    }

    #insertIndex(nome){
        let index = 0;
        while (index < this.#alunos.length && this.#alunos[index].nome < nome) {
            index++;
        }
        return index;
    }

    #pad(str, length, char){
        return str.toString().padStart((str.toString().length + length) / 2, char).padEnd(length, char);
    }

    #maxNomeMatricula(){
        let maxNome = 0;
        let maxMatricula = 0;
        for (let i = 0; i < this.#alunos.length; i++){
            if (this.#alunos[i].nome.length > maxNome){
                maxNome = this.#alunos[i].nome.length;
            }
            if (this.#alunos[i].matricula.toString().length > maxMatricula){
                maxMatricula = this.#alunos[i].matricula.toString().length;
            }
        }
        return [maxNome, maxMatricula];
    }

    #getIndiceAluno(matricula){
        for (let i = 0; i < this.#alunos.length; i++){
            if (this.#alunos[i].matricula === matricula){
                return i;
            }
        }
    }

    #isMatricula(matricula){
        for (let i = 0; i < this.#alunos.length; i++){
            if (this.#alunos[i].matricula === matricula){
                return true;
            }
        }
        return false;
    }
}
