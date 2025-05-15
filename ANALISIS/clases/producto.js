class Producto {
    constructor(nombre, descripcion, precio, cantidad, categoria) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.cantidad = cantidad;
        this.categoria = categoria;  // Nueva propiedad categoria
    }

    // Mostrar información del producto
    mostrarInfo() {
        return `Producto: ${this.nombre}, Descripción: ${this.descripcion}, Precio: S/${this.precio}, Stock: ${this.cantidad}, Categoría: ${this.categoria}`;
    }

    // Actualizar cantidad del producto
    actualizarCantidad(cantidad) {
        this.cantidad = cantidad;
    }

    // Vender producto, reduce el stock
    vender(cantidad) {
        if (this.cantidad >= cantidad) {
            this.cantidad -= cantidad;
            return `Se vendieron ${cantidad} ${this.nombre}.`;
        } else {
            return 'No hay suficiente stock.';
        }
    }
}

// Ejemplo de uso
const producto1 = new Producto('Laptop Asus Ryzen 7p', 'Ryzen 7, 16GB RAM, 512GB SSD', 3000, 10, 'Computadoras');
console.log(producto1.mostrarInfo());
console.log(producto1.vender(3));
