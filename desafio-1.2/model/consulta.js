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

    // Verifica se a data é válida
    static data(data) {
        let [dia, mes, ano] = data.split("/");
        data = new Date(`${mes}/${dia}/${ano}`);
        if (data == 'Invalid Date') {
            return false;
        }
        return true;
    }

    // Verifica se a hora é válida de acordo com as regras de negócio do desafio
    static hora(hora){
        // Se a hora não tiver 4 digitos (hhmm), retorna false
        if (hora.length !== 4){
            return false;
        }
        let h = parseInt(hora.slice(0,2))
        let m = parseInt(hora.slice(2,4))

        // Se a hora não estiver entre 8h e 19h ou os minutos não forem 0, 15, 30 ou 45, retorna false
        if (h<8 || h>=19 || ![0,15,30,45].includes(m)){
            return false;
        }
        
        // Se passar por todas as validações, retorna true
        return true;
    }

    // Verifica se os horários estão inconsistentes ou se há conflito de horários com outros agendamentos
    static conflitoHorario(dataHoraInicial, dataHoraFinal, consultas){
        if (dataHoraInicial >= dataHoraFinal){
            return true;
        }

        if (dataHoraInicial < new Date(Date.now())){
            return true;
        }

        // Percorre a lista de consultas e verifica se há conflito de horários
        for (let i in consultas){
            if (dataHoraInicial >= consultas[i].dataHoraInicial && dataHoraInicial < consultas[i].dataHoraFinal){
                return true;
            }
            if (dataHoraFinal > consultas[i].dataHoraInicial && dataHoraFinal <= consultas[i].dataHoraFinal){
                return true;
            }
            if (dataHoraInicial <= consultas[i].dataHoraInicial && dataHoraFinal >= consultas[i].dataHoraFinal){
                return true;
            }
        }
        return false;
    }

    // Verifica se já existe uma consulta futura para o paciente do cpf informado
    static existeAgendamento(cpf, consultas){
        return consultas.some(consulta => consulta.paciente.cpf === cpf && consulta.dataHoraInicial > new Date(Date.now()));
    }

    // Verifica se já existe uma consulta com o mesmo cpf e dataHoraInicial
    static existeConsulta(cpf, dataHoraInicial, consultas){
        return consultas.some(consulta => consulta.paciente.cpf === cpf && consulta.dataHoraInicial.getTime() === dataHoraInicial.getTime());
    }
}
