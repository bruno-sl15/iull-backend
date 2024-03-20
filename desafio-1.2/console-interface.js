import { question } from 'readline-sync';
import { Consultorio } from './model/consultorio.js';
import { ValidaPaciente } from './model/paciente.js';
import { ValidaConsulta } from './model/consulta.js';
import { ValidaConsultorio } from './model/consultorio.js';

class ConsoleInterface {
    #consultorio = new Consultorio();

    menuPrincipal() {
        while (true) {
            console.log('\nMenu Principal');
            console.log('1-Cadastro de pacientes');
            console.log('2-Agenda');
            console.log('3-Fim');
            let opcao = question();
            if (opcao === '1') {
                this.#menuPacientes();
            }
            else if (opcao === '2') {
                this.#menuAgenda();
            }
            else if (opcao === '3') {
                break;
            }
            else {
                console.log('\nErro: Opção inválida');
            }
        }
    }

    #menuPacientes(){
        console.log('\nMenu do Cadastro de Pacientes');
        console.log('1-Cadastrar novo paciente');
        console.log('2-Excluir paciente');
        console.log('3-Listar pacientes (ordenado por CPF)');
        console.log('4-Listar pacientes (ordenado por nome)');
        console.log('5-Voltar p/ menu principal');
        let opcao = question();
        if (opcao === '1') {
            this.#cadastraPaciente();
        }
        else if (opcao === '2') {
            this.#excluiPaciente();
        }
        else if (opcao === '3') {
            this.#listaPacientes('cpf');
        }
        else if (opcao === '4') {
            this.#listaPacientes('nome');
        }
        else if (opcao === '5') {
            return;
        }
        else {
            console.log('\nErro: Opção inválida');
        }
    }

    #menuAgenda(){
        console.log('\nAgenda');
        console.log('1-Agendar consulta');
        console.log('2-Cancelar agendamento');
        console.log('3-Listar agenda');
        console.log('4-Voltar p/ menu principal');
        let opcao = question();
        if (opcao === '1') {
            this.#agendarConsulta();
        }
        else if (opcao === '2') {
            this.#cancelarAgendamento();
        }
        else if (opcao === '3') {
            this.#listaAgenda();
        }
        else if (opcao === '4') {
            return;
        }
        else {
            console.log('\nErro: Opção inválida');
        }
    }

    #cadastraPaciente(){
        let cpf = question('\nCPF: ');
        if (!ValidaPaciente.cpf(cpf)){
            console.log('\nErro: CPF inválido');
            return;
        }
        if (ValidaConsultorio.existeCPF(cpf, this.#consultorio.pacientes)){
            console.log('\nErro: CPF já cadastrado');
            return;
        }

        let nome = question('Nome: ');
        if (!ValidaPaciente.nome(nome)){
            console.log('\nErro: O nome deve ter pelo menos 5 caracteres');
            return
        }

        let dataNascimento = question('Data de nascimento (dd/mm/aaaa): ');
        if (!ValidaPaciente.data(dataNascimento)){
            console.log('\nErro: Data inválida');
            return;
        }
        let [dia, mes, ano] = dataNascimento.split("/");
        dataNascimento = new Date(`${mes}/${dia}/${ano}`)
        if (!ValidaPaciente.idade(dataNascimento)){
            console.log('\nErro: Paciente deve ter pelo menos 13 anos.');
            return;
        }

        this.#consultorio.addPaciente(cpf, nome, dataNascimento);
        console.log('\nPaciente cadastrado com sucesso!');
    }

    #excluiPaciente(){
        let cpf = question('\nCPF: ');
        if (!ValidaConsultorio.existeCPF(cpf, this.#consultorio.pacientes)){
            console.log('\nErro: Paciente não cadastrado');
            return;
        }
        if (ValidaConsulta.existeAgendamento(cpf, this.#consultorio.consultas)){
            console.log('\nErro: Paciente está agendado.');
            return;
        }
        this.#consultorio.removePaciente(cpf);
        console.log('\nPaciente excluído com sucesso!');
    }

    // orderBy = nome para ordenar pacientes por nome
    // orderBy = cpf para ordenar pacientes por cpf
    #listaPacientes(orderBy){
        let maxNome = this.#consultorio.pacientes.reduce((max, paciente) => Math.max(max, paciente.nome.length), 0);
        const cabecalho = `${"CPF".padEnd(11)} ${"Nome".padEnd(maxNome)}  Dt.Nasc.  Idade`;
        const separador = '-'.repeat(cabecalho.length);
        console.log()
        console.log(separador);
        console.log(cabecalho);
        console.log(separador);
        if (orderBy.toLowerCase() === 'cpf'){
            var pacientes = [...this.#consultorio.pacientes].sort((a, b) => a.cpf - b.cpf);
        }
        else if (orderBy.toLowerCase() === 'nome'){
            var pacientes = [...this.#consultorio.pacientes].sort((a, b) => a.nome.localeCompare(b.nome));
        }
        pacientes.forEach(paciente => {
            console.log(`${paciente.cpf} ${paciente.nome.padEnd(maxNome)} ${this.#getDiaMesAno(paciente.dataNascimento)}   ${ValidaPaciente.calculaIdade(paciente.dataNascimento).toString().padStart(3)}`);
        });
        console.log(separador)
    }

    #agendarConsulta(){
        let cpf = question('\nCPF: ');
        if (!ValidaConsultorio.existeCPF(cpf, this.#consultorio.pacientes)){
            console.log('\nErro: Paciente não cadastrado');
            return;
        }
        if (ValidaConsulta.existeAgendamento(cpf, this.#consultorio.consultas)){
            console.log('\nErro: Paciente já agendado');
            return;
        }

        let dataConsulta = question('Data da consulta (dd/mm/aaaa): ');
        if (!ValidaConsulta.data(dataConsulta)){
            console.log('\nErro: Data inválida');
            return;
        }
        let [dia, mes, ano] = dataConsulta.split("/");

        let horaInicial = question('Hora inicial (hhmm): ');
        let horaFinal = question('Hora final (hhmm): ');
        // Verifica se a horaInicial ou horaFinal estão em um formato inválido
        if (!ValidaConsulta.hora(horaInicial) || !ValidaConsulta.hora(horaFinal)){
            console.log('\nErro: Hora inválida');
            return;
        }

        let dataHoraInicial = new Date(`${mes}/${dia}/${ano} ${horaInicial.slice(0,2)}:${horaInicial.slice(2,4)}`);
        let dataHoraFinal = new Date(`${mes}/${dia}/${ano} ${horaFinal.slice(0,2)}:${horaFinal.slice(2,4)}`);
        // Verifica se há inconsistência ou conflito de horários com a data e horas informados
        if (ValidaConsulta.conflitoHorario(dataHoraInicial, dataHoraFinal, this.#consultorio.consultas)) {
            console.log('\nErro: Conflito de horários detectado');
            return;
        }

        this.#consultorio.addConsulta(cpf, dataHoraInicial, dataHoraFinal);
        console.log('\nAgendamento realizado com sucesso!');
    }

    #cancelarAgendamento(){
        let cpf = question('\nCPF: ');
        if (!ValidaConsultorio.existeCPF(cpf, this.#consultorio.pacientes)){
            console.log('\nErro: Paciente não cadastrado');
            return;
        }

        let dataConsulta = question('Data da consulta (dd/mm/aaaa): ');
        if (!ValidaConsulta.data(dataConsulta)){
            console.log('\nErro: Data inválida');
            return;
        }
        let [dia, mes, ano] = dataConsulta.split("/");

        let horaInicial = question('Hora inicial (hhmm): ');
        if (!ValidaConsulta.hora(horaInicial)){
            console.log('\nErro: Hora inválida');
            return;
        }

        let dataHoraInicial = new Date(`${mes}/${dia}/${ano} ${horaInicial.slice(0,2)}:${horaInicial.slice(2,4)}`);
        if (!ValidaConsulta.existeConsulta(cpf, dataHoraInicial, this.#consultorio.consultas)){
            console.log('\nErro: Agendamento não encontrado');
            return;
        }

        console.log('\nAgendamento cancelado com sucesso!')
        this.#consultorio.removeConsulta(cpf, dataHoraInicial);
    }

    #listaAgenda(){
        let maxNome = this.#consultorio.pacientes.reduce((max, paciente) => Math.max(max, paciente.nome.length), 0);
        const cabecalho = `   Data    H.Ini H.fim Tempo ${"Nome".padEnd(maxNome)}  Dt.Nasc. `;
        const separador = '-'.repeat(cabecalho.length);
        console.log()
        console.log(separador);
        console.log(cabecalho);
        console.log(separador);

        // lista de consultas ordenada pela dataHoraInicial
        let consultasOrdenadas = [...this.#consultorio.consultas].sort((a, b) => a.dataHoraInicial - b.dataHoraInicial);        
        consultasOrdenadas.forEach(consulta => {
            console.log(`${this.#getDiaMesAno(consulta.dataHoraInicial)} ${this.#getHoraMinuto(consulta.dataHoraInicial)} ${this.#getHoraMinuto(consulta.dataHoraFinal)} ${this.#diferencaHoras(consulta.dataHoraInicial, consulta.dataHoraFinal)} ${consulta.paciente.nome.padEnd(maxNome)} ${this.#getDiaMesAno(consulta.paciente.dataNascimento)}`);
        });
        console.log(separador)
    }

    // Retorna a data no formato dd/mm/aaaa
    #getDiaMesAno(data){
        return `${data.getDate().toString().padStart(2,0)}/${(data.getMonth()+1).toString().padStart(2,0)}/${data.getFullYear()}`;
    }

    // Retorna hora e minuto no formato hh:mm
    #getHoraMinuto(data){
        return `${data.getHours().toString().padStart(2,0)}:${data.getMinutes().toString().padStart(2,0)}`;
    }

    // Retorna a diferença de horas entre duas datas no formato hh:mm
    #diferencaHoras(dataHoraInicial, dataHoraFinal){
        let minutos = (dataHoraFinal - dataHoraInicial)/60000;
        let horas = Math.floor(minutos/60);
        minutos = minutos%60;
        return `${horas.toString().padStart(2,0)}:${minutos.toString().padStart(2,0)}`;
    }
}

let consoleInterface = new ConsoleInterface();
consoleInterface.menuPrincipal()
