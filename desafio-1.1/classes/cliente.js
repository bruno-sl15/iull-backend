export class Cliente {
    #nome;
    #cpf;
    #dataNascimento;
    #rendaMensal;
    #estadoCivil;
    #dependentes;

    set nome(nome){
        if (nome.length <5){
            throw new Error("O nome deve ter pelo menos 5 caracteres.");
        }
        this.#nome = nome.toString();
    }

    set cpf(cpf){
        if (cpf.length !== 11 || cpf != parseInt(cpf)){
            throw new Error("O CPF deve ter exatamente 11 dígitos.");
        }
        this.#cpf = cpf.toString();
    }

    set dataNascimento(dataNascimento){
        let [dia, mes, ano] = dataNascimento.split("/");
        dataNascimento = new Date(`${mes}/${dia}/${ano}`);
        if (dataNascimento == "Invalid Date"){
            throw new Error("Data de nascimento inválida.");
        }
        if (this.#getIdade(dataNascimento) < 18) {
            throw new Error("O cliente deve ter pelo menos 18 anos.");
        }
        this.#dataNascimento = dataNascimento;
    }

    set rendaMensal(rendaMensal){
        let [valorInteiro, valorDecimal] = rendaMensal.toString().split(",");
        if (isNaN(valorInteiro || isNaN(valorDecimal))) {
            throw new Error("A renda mensal deve ter duas casas decimais separadas por vírgula.");
        }
        this.#rendaMensal = parseFloat(`${valorInteiro}.${valorDecimal}`);
    }

    set estadoCivil(estadoCivil){
        if (["C", "S", "V", "D"].includes(estadoCivil.toUpperCase()) === false){
            throw new Error("O estado civil deve ser C, S, V ou D (maiúsculo ou minúsculo).");
        }
        this.#estadoCivil = estadoCivil.toUpperCase();
    }

    set dependentes(dependentes){
        if (!(dependentes >= 0 && dependentes <= 10)){
            throw new Error("O número de dependentes deve ser entre 0 e 10.");
        }
        this.#dependentes = dependentes;
    }

    get nome(){
        return this.#nome;
    }

    get cpf(){
        return this.#mascaraCPF(this.#cpf);
    }

    get dataNascimento(){
        return this.#dataNascimento.toLocaleDateString("pt-BR");
    }

    get rendaMensal(){
        return this.#rendaMensal.toFixed(2).toString().replace(".", ",");
    }

    get estadoCivil(){
        return this.#estadoCivil;
    }

    get dependentes(){
        return this.#dependentes;
    }

    #getIdade(dataNascimento){
        let idadeMiliSeg = new Date(Date.now()- dataNascimento);
        return Math.abs(idadeMiliSeg.getUTCFullYear() - 1970);
    }

    #mascaraCPF(cpf){
        return `${cpf.slice(0,3)}.${cpf.slice(3,6)}.${cpf.slice(6,9)}-${cpf.slice(9,11)}`;
    }
}