import { Cliente } from './classes/cliente.js';
import { question } from 'readline-sync';

let clientes = Array();
while (true) {
    console.log("\nInsira o número correspondente a ação desejada:");
    console.log("\t1 - Inserir Cliente");
    console.log("\t2 - Listar Dados dos Clientes")
    console.log("\t0 - Sair");
    let opcao = question('\n\t');

    console.log('');

    if (opcao === "1") {
        let cliente = new Cliente()
        while (true){
            try {
                let nome = question("Digite o nome do cliente: ");
                cliente.nome = nome;
                break
            }
            catch (e) {
                console.log(e.message);
            }
        }
        while (true) {
            try {
                let cpf = question("Digite o CPF do cliente: ");
                cliente.cpf = cpf;
                break
            }
            catch (e) {
                console.log(e.message);
            }
        }
        while (true) {
            try {
                let dataNascimento = question("Digite a data de nascimento do cliente (dd/mm/aaaa): ");
                cliente.dataNascimento = dataNascimento;
                break
            }
            catch (e) {
                console.log(e.message);
            }
        }
        while (true) {
            try {
                let rendaMensal = question("Digite a renda mensal do cliente: ");
                cliente.rendaMensal = rendaMensal;
                break;
            }
            catch (e) {
                console.log(e.message);
            }
        }
        while (true) {
            try {
                let estadoCivil = question("Digite o estado civil do cliente (C, S, V ou D): ");
                cliente.estadoCivil = estadoCivil
                break;
            }
            catch (e) {
                console.log(e.message);
            }
        }
        while (true) {
            try {
                let dependentes = question("Digite o número de dependentes do cliente: ");
                cliente.dependentes = dependentes;
                break
            }
            catch (e) {
                console.log(e.message);
            }
        }
        clientes.push(cliente);
    }

    else if (opcao === "2") {  
        clientes.forEach((cliente) => {
            console.log("-".repeat(30))
            console.log(`Nome: ${cliente.nome}`);
            console.log(`CPF: ${cliente.cpf}`);
            console.log(`Data de Nascimento: ${cliente.dataNascimento}`);
            console.log(`Renda Mensal: R$ ${cliente.rendaMensal}`);
            console.log(`Estado Civil: ${cliente.estadoCivil}`);
            console.log(`Dependentes: ${cliente.dependentes}`);
        })
        question("\nPressione Enter para voltar ao menu...");
    }

    else if (opcao === "0") {
        break;
    }
}