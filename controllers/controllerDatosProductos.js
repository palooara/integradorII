const datosProducto = require('../models/datosProductosModel');

const envioProductos = async (req, res) => { 
    console.log(req.body); 

    const { nombre, precio, categoria, descripcion, id } = req.body;
    
    try {
        const nuevoProducto = new datosProducto({
            nombre,
            id,
            precio,
            categoria,
            descripcion
        });

        await nuevoProducto.save();
        res.redirect('/');
        
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el producto' });
    }
};

const traerProductos = (req, res) => {
    datosProducto.find()
    .then(productos => {
        console.log("Productos encontrados en la base de datos");
        res.status(200).json(productos);
    })
    .catch(err => {
        console.error("Error al encontrar los productos", err);
        res.status(500).send("Error al encontrar los productos");
    });
};

const eliminarProducto = (req, res) => {
    const id = req.params.id;
    datosProducto.findByIdAndDelete(id)
    .then(() => {
        console.log("Producto eliminado de la base de datos");
        res.status(200).send("Producto eliminado de la base de datos");
    })
    .catch(err => {
        console.error("Error al eliminar el producto", err);
        res.status(500).send("Error al eliminar el producto");
    });
};

const editarProducto = (req, res) => {
    const id = req.params.id;
     const { nombre, precio, categoria, descripcion } = req.body;
    const producto = {
        nombre,
        precio,
        categoria,
        descripcion
    };

    datosProducto.findByIdAndUpdate(id, producto, { new: true })
        .then((contactoActualizado) => {
            if (!contactoActualizado) {
                return res.status(404).send("producto no encontrado");
            }
            console.log("producto actualizado en la base de datos");
            res.status(200).send("producto actualizado en la base de datos"); // Enviar el contacto actualizado como respuesta
        })
        .catch(err => {
            console.error("Error al actualizar el producto", err);
            res.status(500).send("Error al actualizar el producto");
        });
};

module.exports = {
    envioProductos,
    eliminarProducto,
    editarProducto,
    traerProductos
};