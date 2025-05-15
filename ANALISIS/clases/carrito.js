class Carrito {
    constructor() {
        this.productos = []; // Arreglo para almacenar los productos
    }

    // Agregar producto al carrito
    agregarProducto(producto, cantidad) {
        this.productos.push({ producto, cantidad });
    }

    // Mostrar productos en el carrito
    mostrarCarrito() {
        return this.productos.map(item => 
            `${item.producto.nombre} (Categoría: ${item.producto.categoria}) - Cantidad: ${item.cantidad} - Precio: S/${item.producto.precio * item.cantidad}`).join('\n');
    }

    // Calcular total
    calcularTotal() {
        return this.productos.reduce((total, item) => total + (item.producto.precio * item.cantidad), 0);
    }
}

// Crear productos
const laptop = new Producto(' Laptop Asus Ryzen 7', 'Ryzen 7, 16GB RAM, 512GB SSD', 3000, 10, 'Computadoras');
//const celular = new Producto('Celular Samsung Galaxy S21', 'Smartphone de última generación', 1500, 20, 'Smartphones');

// Crear carrito y agregar productos
const carrito = new Carrito();
carrito.agregarProducto(laptop, 3);  // Agregar 3 laptops al carrito
//carrito.agregarProducto(celular, 2);  // Agregar 2 celulares al carrito

// Mostrar carrito y total
console.log("Carrito:\n", carrito.mostrarCarrito());
console.log("Total:", carrito.calcularTotal());
