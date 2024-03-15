import { Consultorio } from './model/consultorio.js';
import { ValidaPaciente } from './model/paciente.js';
import { ValidaConsulta } from './model/consulta.js';
import { ValidaConsultorio } from './model/consultorio.js';

class ConsoleInterface {
    static menuPrincipal() {
        let consultorio = new Consultorio();
        while (true) {
            
        }
    }
}

//ConsoleInterface.menuPrincipal()

console.log(ValidaPaciente.idade('17/3/2011'))
