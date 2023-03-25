class productManager {

    constructor() {
        this.products = [];
    }

    getProducts = () => {
        return this.products;
    }

    getProductById = (id) => {
        
        const codeIndex = this.products.findIndex(producto => producto.id === id);

        if (codeIndex===-1) {
            console.log(`El producto con ID ${id} NO existe!`);
            return "NOT FOUND"            
        } else {
            return this.products[codeIndex]
        }

    }

    addProduct = (title, description, price, thumbnail, code, stock) => {

        const codeIndex = this.products.findIndex(producto => producto.code === code);
        
        // VALIDO CAMPOS OBLIGATORIOS
        if(title===""){
            console.log('El nombre del producto se encuentra vacío, por favor completar para continuar con la carga.');
            return
        }
        if(description===""){
            console.log('La descripción del producto se encuentra vacío, por favor completar para continuar con la carga.');
            return
        }
        if(price=0){
            console.log('El precio del producto se encuentra vacío, por favor completar para continuar con la carga.');
            return
        }
        if(thumbnail===""){
            console.log('La imagen del producto se encuentra vacía, por favor completar para continuar con la carga.');
            return
        }
        if(code===""){
            console.log('El código identificador se encuentra vacío, por favor completar para continuar con la carga.');
            return
        }
        if(stock=0){
            console.log('El stock del producto se encuentra vacío, por favor completar para continuar con la carga.');
            return
        }

        // VALIDO NO EXISTA EL PRODUCTO POR EL CAMPO DE VALIDACION CODE
        if (codeIndex!=-1) {
            console.log(`El producto ${code} ya existe!`);
            return            
        }

        // Preparo el nuevo producto
         const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        // ASIGNO ID
        if (this.products.length === 0) {
            product.id = 1;
        } else {
            product.id = this.products[this.products.length - 1].id + 1;
        }

        this.products.push(product);   

    }

}


const manejadorProductos = new productManager();
// agrego codigo 100
manejadorProductos.addProduct("Reloj deportivo","Marca Queen, ese regalo especial, Oferta del mes del RELOJ, compralo hasta en 12 cuotas.",1500,"reloj.jpg","100",50)
// repito mismo codigo - ERROR
manejadorProductos.addProduct("Galletas","Marca Queen, ese regalo especial, Oferta del mes del RELOJ, compralo hasta en 12 cuotas.",1500,"reloj.jpg","100",50)
// envio title vacio - ERROR
manejadorProductos.addProduct("","Marca Queen, ese regalo especial, Oferta del mes del RELOJ, compralo hasta en 12 cuotas.",1500,"reloj.jpg","100",50)

// agrego codigo 200
manejadorProductos.addProduct("Anillo Bronce","Anillo de Bronce, compralo hasta en 12 cuotas.",3500,"imagen.jpg","200",20)

// muestro lista de productos
const losProductos = manejadorProductos.getProducts();
console.log(losProductos);

// obtengo el producto id 1
const respuestaFind1=manejadorProductos.getProductById(1);
console.log(respuestaFind1);
// obtengo el producto id 10 que no existe
const respuestaFind2=manejadorProductos.getProductById(10);
console.log(respuestaFind2);