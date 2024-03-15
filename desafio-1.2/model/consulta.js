import { Paciente } from './paciente.js';

export class Consulta {
    #paciente;
    #dataHoraInicial;
    #dataHoraFinal;

    constructor(paciente, dataHoraInicial, dataHoraFinal) {
        this.#paciente = paciente;
        this.#dataHoraInicial = dataHoraInicial;
        this.#dataHoraFinal = dataHoraFinal;
    }

    get paciente() {
        return this.#paciente;
    }

    get dataHoraInicial() {
        return this.#dataHoraInicial;
    }

    get dataHoraFinal() {
        return this.#dataHoraFinal;
    }
}

export class ValidaConsulta {

}
