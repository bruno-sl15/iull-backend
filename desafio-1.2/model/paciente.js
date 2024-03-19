export class Paciente {
    #cpf;
    #nome;
    #dataNascimento;  // Date

    constructor(cpf, nome, dataNascimento) {
        this.#cpf = cpf;
        this.#nome = nome;
        this.#dataNascimento = dataNascimento;
    }

    get cpf() {
        return this.#cpf;
    }

    get nome() {
        return this.#nome;
    }

    get dataNascimento() {
        return this.#dataNascimento;
    }
}

export class ValidaPaciente {

    // Verifica se o nome é uma string com 5 ou mais caracteres
    static nome(nome) {
        if (typeof nome !== 'string' || nome.length < 5){
            return false;
        }
        return true;
    }

    // Verifica se a data é válida
    static data(data) {
        let [dia, mes, ano] = data.split("/");
        if (new Date(`${mes}/${dia}/${ano}`) == 'Invalid Date') {
            return false;
        }
        return true;
    }

    // Verifica se o paciente tem 13 anos ou mais
    static idade(dataNascimento) {
        if (this.calculaIdade(dataNascimento) < 13) {
            return false;
        }
        return true;
    }

    // Verifica se o cpf é válido
    static cpf(cpf) {
        // Se o cpf não for um número ou não tiver 11 digitos, retorna false
        if (typeof parseInt(cpf) === NaN || cpf.length !== 11) {
            return false;
        }

        // Se todos os digitos do cpf forem iguais, retorna false
        if (cpf.split('').every(digito => digito === cpf[0])) {
            return false;
        }

        // Se o primeiro digito verificador não for válido, retorna false
        if (this.#calculaDigitoVerificador(cpf, 1) != cpf[9]) {
            return false;
        }

        // Se o segundo digito verificador não for válido, retorna false
        if (this.#calculaDigitoVerificador(cpf, 2) != cpf[10]) {
            return false;
        }

        // Se passar por todas as validações, retorna true
        return true;
    }

    static calculaIdade(dataNascimento) {
        let idadeMiliSeg = new Date(Date.now()- dataNascimento);
        return Math.abs(idadeMiliSeg.getUTCFullYear() - 1970);
    }

    // Calcula os digitos verificadores do cpf
    // digito = 1 para calcular o primeiro dv 
    // digito = 2 para calcular o segundo dv
    static #calculaDigitoVerificador(cpf, digito) {
        let soma = 0;
        for (let i = 0, j = (digito === 1 ? 10 : 11); i<(digito === 1 ? 9 : 10); i++, j--) {
            soma += cpf[i] * j;
        }
        let resto = soma%11;
        if (resto === 0 || resto === 1){
            return 0;
        }
        return 11 - resto;
    }
}
