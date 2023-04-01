import fs from 'fs';

export default class productManager {

    constructor(path) {
        this.path = path;
        this.products = [];
    }

    getProducts = async () => {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, 'utf-8');
                //console.log(data);
        
                const product = JSON.parse(data);
                return product;
            }else {
                return [];
            }
        } catch (error) {
            console.log(error);
        }
    }

    getProductById = async (id) => {
        try {
            const products = await this.getProducts();
            const codeIndex = products.findIndex(producto => producto.id === id);

            if (codeIndex===-1) {
                console.log(`El producto con ID ${id} NO existe!`);
                return "NOT FOUND"            
            } else {
                return products[codeIndex]
            }
        }catch (error){
            console.log(error);
        }
    }

    addProduct = async (title, description, price, thumbnail, code, stock) => {
        try {
            await this.getProducts();
            const codeIndex = this.products.findIndex(producto => producto.code === code);
            console.log(codeIndex);

            // VALIDO NO EXISTA EL PRODUCTO POR EL CAMPO DE VALIDACION CODE
            if (codeIndex!=-1) {
                console.log(`El producto ${code} ya existe!`);
                return            
            }

            // VALIDO CAMPOS OBLIGATORIOS
            if(title==="" || description==="" || thumbnail==="" || code===""){
                console.log('Hay campos que se encuentran vacío, por favor completar para continuar con la carga.');
                return
            }
            if(price===0 || stock===0){
                console.log('El precio o el stock del producto se encuentra vacío, por favor completar para continuar con la carga.');
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

            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t'));

            return product;

        } catch (error){
            console.log(error);
        }
    }

    updateProduct = async (id, data) => {
        try {
            await this.getProductById(id);
            const codeIndex = this.products.findIndex(producto => producto.code === code);
            console.log(codeIndex);
            // EN PROCESO JAJAJJA
        }catch (error){
            console.log(error);
        }
    }
};