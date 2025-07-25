CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,            -- ID único del usuario
    nombre VARCHAR(255) NOT NULL,      -- Nombre completo del usuario
    email VARCHAR(255) UNIQUE NOT NULL, -- Correo electrónico único
    password TEXT NOT NULL,         -- Contraseña hasheada del usuario
    rol VARCHAR(50) DEFAULT 'cliente', -- Rol del usuario (admin, cliente)
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Fecha de creación
);

CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,           -- ID único de la categoría
    nombre VARCHAR(255) NOT NULL      -- Nombre de la categoría
);

CREATE TABLE productos (
    id SERIAL PRIMARY KEY,            -- ID único del producto
    nombre VARCHAR(255) NOT NULL,      -- Nombre del producto
    descripcion TEXT,                 -- Descripción del producto
    precio DECIMAL(10, 2) NOT NULL,   -- Precio del producto
    stock INT NOT NULL,               -- Stock disponible
    categoria_id INT,                 -- ID de la categoría (relacionada con la tabla categorías)
    FOREIGN KEY (categoria_id) REFERENCES categorias(id) -- Relación con la tabla categorías
);

CREATE TABLE carrito (
    id SERIAL PRIMARY KEY,             -- ID único del carrito
    usuario_id INT NOT NULL,           -- ID del usuario (relación con la tabla usuarios)
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha de creación del carrito
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)   -- Relación con la tabla usuarios
);

CREATE TABLE pedidos (
    id SERIAL PRIMARY KEY,              -- ID único del pedido
    usuario_id INT NOT NULL,            -- ID del usuario (relación con la tabla usuarios)
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha del pedido
    estado VARCHAR(50) DEFAULT 'pendiente',  -- Estado del pedido (pendiente, procesado, enviado)
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)  -- Relación con la tabla usuarios
);

CREATE TABLE detalles_pedido (
    id SERIAL PRIMARY KEY,               -- ID único del detalle de pedido
    pedido_id INT NOT NULL,              -- ID del pedido (relación con la tabla pedidos)
    producto_id INT NOT NULL,            -- ID del producto (relación con la tabla productos)
    cantidad INT NOT NULL,               -- Cantidad de productos en el pedido
    precio_unitario DECIMAL(10, 2) NOT NULL, -- Precio del producto en el momento de la compra
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id),  -- Relación con la tabla pedidos
    FOREIGN KEY (producto_id) REFERENCES productos(id) -- Relación con la tabla productos
);

