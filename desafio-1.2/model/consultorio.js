import { Paciente } from './paciente.js';
import { Consulta } from './consulta.js';

export class Consultorio {
    #pacientes = Array();
    #consultas = Array();

    addPaciente(cpf, nome, dataNascimento) {
        this.#pacientes.push(new Paciente(cpf, nome, dataNascimento));
    }

    removePaciente(cpf) {
        this.#pacientes = this.#pacientes.filter(paciente => paciente.cpf !== cpf);
    }

    addConsulta(cpf, dataHoraInicial, dataHoraFinal) {
        let paciente = this.#pacientes.find(paciente => paciente.cpf === cpf);
        this.#consultas.push(new Consulta(paciente, dataHoraInicial, dataHoraFinal));
    }

    removeConsulta(cpf, dataHoraInicial) {
        this.#consultas = this.#consultas.filter(consulta => consulta.paciente.cpf !== cpf && consulta.dataHoraInicial.getTime() !== dataHoraInicial.getTime());
    }

    get pacientes() {
        return this.#pacientes;
    }

    get consultas() {
        return this.#consultas;
    }
}

export class ValidaConsultorio {
    static existeCPF(cpf, pacientes) {
        return pacientes.some(paciente => paciente.cpf === cpf);
    }

    static existeAgenda(cpf, consultas){
        let consultasPaciente = consultas.filter(consultas => consultas.paciente.cpf === cpf);
        for (let consulta in consultasPaciente){
            if (consulta.dataHoraInicial > new Date(Date.now())){
                return true;
            }
        }
        return false;
    }
}
