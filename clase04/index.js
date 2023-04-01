import productManager from './manager/productManager.js';

const manejadorProductos = new productManager('./files/product.json');

//funcion para armar los productos
const cargoProduct = async () =>{

    // agrego codigo 100
    await manejadorProductos.addProduct("Reloj deportivo","Marca Queen, ese regalo especial, Oferta del mes del RELOJ, compralo hasta en 12 cuotas.",1500,"reloj.jpg","100",50)
    // repito mismo codigo - ERROR
    await manejadorProductos.addProduct("Galletas","Marca Queen, ese regalo especial, Oferta del mes del RELOJ, compralo hasta en 12 cuotas.",1500,"reloj.jpg","100",50)
    // envio title vacio - ERROR
    await manejadorProductos.addProduct("","Marca Queen, ese regalo especial, Oferta del mes del RELOJ, compralo hasta en 12 cuotas.",1500,"reloj.jpg","150",50)
    // agrego codigo 200
    await manejadorProductos.addProduct("Anillo Bronce","Anillo de Bronce, compralo hasta en 12 cuotas.",3500,"imagen.jpg","200",20)
}

// Función para Update datos 
const actualizoProduct = async (id, data) => {
    await manejadorProductos.updateProduct(id, data)
}

// Cargo el archivo de productos
cargoProduct();

// muestro lista de productos
const losProductos = await manejadorProductos.getProducts();
console.log(losProductos);

// obtengo el producto id 1
const respuestaFind1= await manejadorProductos.getProductById(2);
console.log(respuestaFind1);

// obtengo el producto id 10 que no existe
const respuestaFind2= await manejadorProductos.getProductById(10);
console.log(respuestaFind2);

// Cambio datos del producto selecciona y el campo que necesito
const respuestaFind3 = actualizoProduct(1, {stock:30})
console.log(respuestaFind3);