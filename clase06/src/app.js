import express, { urlencoded } from 'express';
import productManager from '../manager/productManager.js';

//Creo el Servidor Express
const app = express();
app.use(urlencoded({extended: true}));

//Creamos la instancia de la clase
const ProductManager = new productManager('../files/product.json');

// OBTENGO TODOS LOS PRODUCTOS QUE HAY EN EL ARCHIVO
const products = await ProductManager.getProducts();

//Ruta raíz presentación
app.get("/", (req, res) => {
    res.send(`<h1 style="color:darkblue;">Bienvenidos al servidor express</h1> <br>
    <h2 style="color:darkblue;">Desafío de productos</h2>`)
});

//Ruta /products muestra todos los productos
app.get("/products", (req, res) => {
    res.send(products)
})

//Ruta /products con limite de 5
app.get('/products-limit', async (req, res) => {
    const { limit } = req.query;
    const nuevoArreglo = [];

    if (limit){
        for (let i=0; i<=limit-1 && i < products.length; i++) {
                nuevoArreglo.push(products[i]) ;    
        }
        res.send(nuevoArreglo)
    } else {
        res.send('No se reconoce un parámetro válido');
    }
})

//Ruta /products/:id Busco producto por ID 
app.get('/products/:id', (req,res) => {
        //Leo el ID del parametro 
        const { id } = req.params;
        // BUsco el ID en el arreglo
        const product = products.find((product) => product.id === Number(id));
        //muestro resultado
        product ? res.send(product) : res.send('Id de producto NO encontrado')
});

app.listen(8080, () => console.log("escuchando port 8080"));