export class Aluno {
    #matricula;
    #nome;
    #p1;
    #p2;

    constructor (matricula, nome){
        this.#matricula = matricula;
        this.#nome = nome;
    }

    get matricula(){
        return this.#matricula;
    }

    get nome(){
        return this.#nome;
    }

    get p1(){
        if (typeof this.#p1 === 'undefined'){
            return "-"
        }
        return this.#p1;
    }

    get p2(){
        if (typeof this.#p2 === 'undefined'){
            return "-"
        }
        return this.#p2;
    }

    set p1(nota){
        this.#p1 = parseFloat(nota).toFixed(1);
    }

    set p2(nota){
        this.#p2 = parseFloat(nota).toFixed(1);
    }

    getNotaFinal(){
        if(typeof this.#p1 === 'number' && typeof this.#p2 === 'number'){
            return parseFloat(((this.#p1 + this.#p2) / 2)).toFixed(1);
        }
        else if(typeof this.#p1 === 'number' && typeof this.#p2 !== 'number'){
            return parseFloat(((this.#p1) / 2)).toFixed(1);
        }
        else if(typeof this.#p1 !== 'number' && typeof this.#p2 === 'number'){
            return parseFloat(((this.#p2) / 2)).toFixed(1);
        }
        else{
            return parseFloat(0).toFixed(1);
        }
    }
}
