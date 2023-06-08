const cardContainer = document.getElementById('card-container');
const salectCategoryHtml = document.getElementById ('category')

let products = [];

const URL = 'https://eit1-ecommerce-fullstack.onrender.com/api';
const URL_public = 'https://eit1-ecommerce-fullstack.onrender.com';


async function cargarProductos(){
    try {
        const respuesta = await axios.get(`${URL}/products`)
        
        products = respuesta.data.productos

        renderizarProductos(products)
        
    } catch (error) {
        console.log(error)
    }
}


function renderizarProductos(productsL) {

    cardContainer.innerHTML = ``;

    productsL.forEach((producto,index )=> {

    let imageSrc = producto.image ? `${URL_public}/upload/product/${producto.image}` : '/assets/images/funciones-pagina/not-found.webp';

    const card = document.createElement('article')

    card.classList.add('card'); 
    // let index = Products.findIndex((p) => p.name === producto.name);

    card.innerHTML = `<div class="card__header">
                    <img src="${imageSrc}" alt ="${producto.name}" class="card__img">
                </div>
                <div class="card__body">
                    <div class="card__title">
                    ${producto.name}
                    </div> 
                    <p class="card__description">
                    ${producto.description}    
                    </p>
                    <div class="card__date-price">
                    <div class="card__date">
                        ${formatDateAR(producto.updateAt)}
                    </div>
                    <div class="card__price">
                        $ ${producto.price}
                    </div>
                </div>
             
                <div class="card__footer">
                    <div class="card__btn-container">
                        <a href="/productDetail?id=${producto._id}" class="card__btn-detail" >
                        Detalle
                        </a>    
                    </div>  
                    <div class="card__btn-container">
                    <button onclick="addToCart('${producto._id}')" class= "card__btn" >
                    Comprar
                    </button>
                </div>
            </div>`

    cardContainer.appendChild(card);

   

    });

}
cargarProductos();



async function addToCart(id){
    try {
        const respuesta = await axios.get(`${URL}/product/${id}`);
        const product = respuesta.data.product;
    if (!product)
        return showAlert('No se encontro el producto')  
        
    const newOrder = {
        id:product._id,
        image:'upload/product/'+ product.image,
        name: product.name,
        price: product.price,
        cant: 1,
        total: product.price
        
    }
        
    const prod = Order.find((prod)=>{
        if(prod.name === product.name){
          prod.cant = parseInt(prod.cant) + 1 ;
          prod.total = prod.cant * parseInt(prod.price);
          return prod;
        }
      })
  
      if(!prod) {
        Order.push(newOrder);
      }
    //Guardarlo en el local storage
    sessionStorage.setItem('order',JSON.stringify( Order));

    //Alerta de Producto agregado
    showAlert('Producto agregado al carrito')

    contarProductos();


    } catch (error) {
        console.log(error);
    }

    

}

//Funcion para filtrar las cards de productos
function filtrarProductos(category){
    let productsFiltrados = [];
if(category === 'Todos'){
    productsFiltrados = Products;
}else{
    productsFiltrados = Products.filter((producto) => {
        producto.category.name == category ? filtra = true : filtra = false;
        return filtra
         });
        }
renderizarProductos(productsFiltrados);

}

//Funcion los productos al presionar enter en el input de busqueda
function buscarProductosInput(evt){
if (evt.keyCode !== 13) return;
const text = evt.target.value.toLowerCase().trim();
buscarProductos(text)
}

//Filtra los productos al precionar el boton buscar
function buscarProductosBtn(){
const text =  document.getElementById('products-search').value;
buscarProductos(text)
}

//Funcion para filtrar la table de Productos segun un texto pasado como parametro
function buscarProductos(text){
const productsFiltrados = Products.filter((product) => {
        const filtra = product.name.toLowerCase().includes(text.toLowerCase())
        return filtra
         });

const cant = productsFiltrados.length;

document.getElementById('products-search-count').innerText = 'Se encontraron ' + cant + ' productos';

renderizarProductos(productsFiltrados);

}

//formatea la fecha devuelta por mondo db
function formatDateAR(fechaMongoDB){
   // Obtener los componentes de la fecha
  var dia = fechaMongoDB.substring(8,10);
  // Los meses comienzan en 0, por lo que se suma 1
  var mes = fechaMongoDB.substring(5,7); 
  var anio = fechaMongoDB.substring(0,4);
    // Formatear la fecha y la retorno
    return fechaFormateada = dia + "/" + mes + "/" + anio;
}



