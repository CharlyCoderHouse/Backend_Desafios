import express, { urlencoded } from 'express';
import productManager from '../manager/productManager.js';

//Creo el Servidor Express
const app = express();
app.use(urlencoded({extended: true}));

//Creamos la instancia de la clase
const ProductManager = new productManager('../files/product.json');

//Ruta raíz presentación
app.get("/", (req, res) => {
    res.send(`<h1 style="color:darkblue;">Bienvenidos al servidor express</h1> <br>
    <h2 style="color:darkblue;">Desafío de productos</h2>`)
});

//Ruta /products + query limits
app.get("/products", async (req, res) => {
    // OBTENGO TODOS LOS PRODUCTOS QUE HAY EN EL ARCHIVO
    const products = await ProductManager.getProducts();
    //leo el parametro por req.query
    const { limit } = req.query;

    const nuevoArreglo = [];

    if (limit){
        for (let i=0; i<=limit-1 && i < products.length; i++) {
                nuevoArreglo.push(products[i]) ;    
        }
        res.send(nuevoArreglo)
    } else {
        res.send(products)
    }
})

//Ruta /products/:id Busco producto por ID 
app.get('/products/:id', async (req,res) => {
        //Leo el ID del parametro 
        const id = Number(req.params.id);
        // BUsco el ID en el arreglo
        const productById = await ProductManager.getProductById(id);
        //muestro resultado
        productById===-1 ? res.send(`El producto con id ${id} no existe!`) : res.send(productById);
});

app.listen(8080, () => console.log("escuchando port 8080"));