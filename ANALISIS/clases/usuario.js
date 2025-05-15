class Usuario {
    constructor(nombre, apellido, correo, contraseña, tipoUsuario) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.correo = correo;
        this.contraseña = contraseña; // En un caso real, deberíamos encriptarla
        this.tipoUsuario = tipoUsuario; // Cliente o Administrador
    }

    // Mostrar la información básica del usuario
    mostrarInfo() {
        return `Nombre: ${this.nombre} ${this.apellido}, Correo: ${this.correo}`;
    }

    // Método para iniciar sesión (simulación)
    iniciarSesion(correo, contraseña) {
        if (this.correo === correo && this.contraseña === contraseña) {
            return 'Inicio de sesión exitoso';
        } else {
            return 'Correo o contraseña incorrectos';
        }
    }
}

// Ejemplo de uso
const usuario1 = new Usuario('Royser', 'Uriarte', 'ruriarte@gmail.com', '1234', 'Administrador');
console.log(usuario1.mostrarInfo());
console.log(usuario1.iniciarSesion('ruriarte@gmail.com', '1234'));
