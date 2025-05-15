class Categoria {
    constructor(nombre) {
        this.nombre = nombre;
        this.subcategorias = [];
    }

    // Agregar subcategoría a la categoría
    agregarSubcategoria(subcategoria) {
        this.subcategorias.push(subcategoria);
    }

    // Mostrar categoría y sus subcategorías
    mostrarCategoria() {
        let info = `Categoría: ${this.nombre}\nSubcategorías: `;
        this.subcategorias.forEach(sub => {
            info += `${sub.nombre}, `;
        });
        return info;
    }
}

// Ejemplo de uso
const categoria = new Categoria('Tecnología');
const subcategoria1 = { nombre: 'Smartphones' };
const subcategoria2 = { nombre: 'Laptops' };

categoria.agregarSubcategoria(subcategoria1);
categoria.agregarSubcategoria(subcategoria2);

console.log(categoria.mostrarCategoria());
