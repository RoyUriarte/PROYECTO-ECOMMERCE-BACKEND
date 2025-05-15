class Pago {
    constructor(monto, metodoPago) {
        this.monto = monto;
        this.metodoPago = metodoPago;
        this.estado = 'Pendiente';
    }

    // Procesar pago
    procesarPago() {
        // Simulación del proceso de pago
        if (this.metodoPago === 'Tarjeta') {
            this.estado = 'Pago exitoso';
        } else {
            this.estado = 'Error en el pago';
        }
        return this.estado;
    }

    // Ver estado del pago
    verEstado() {
        return `El estado del pago es: ${this.estado}`;
    }
}

// Ejemplo de uso
const pago1 = new Pago(1500, 'Tarjeta');
console.log(pago1.procesarPago());
console.log(pago1.verEstado());
