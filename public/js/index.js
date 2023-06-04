const cardContainer = document.getElementById('card-container');
const salectCategoryHtml = document.getElementById ('category')

let products = [];

const URL = 'http://localhost:8000/api';
const URL_public = 'http://localhost:8000';

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

    if (productsL.length === 0) {
        cardContainer.innerHTML = `<h1 class="disabled">ERROR, NO SE ENCONTRARON PRODUCTOS</h1>`;
        return;
    }

    productsL.forEach((producto,index )=> {

     const card = document.createElement('article')
     card.classList.add('card');   

    let imageSrc = producto.image ? `${URL_public}/upload/product/${producto.image}` : '/assets/images/funciones-pagina/not-found.webp';
    
    // let index = Products.findIndex((p) => p.name === producto.name);

    card.innerHTML = `<div class="card__header">
                    <img src="${imageSrc}" alt= "${producto.image}" alt ="${producto.name}" class="card__img">
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

function searchProduct() {
    var searchTerm = document.getElementById('search-input').value;
    var products = JSON.parse(localStorage.getItem('Products'));
    var foundProducts = products.filter(function (product) {
        return product.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    var productCountElement = document.getElementById('product-count');
    productCountElement.textContent = 'Se encontraron ' + foundProducts.length + ' productos';

    renderizarCard(foundProducts)
}



async function addToCart(id){
    try {
        const respuesta = await axios.get(`${URL}/products/${id}`);
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
    showAlert('Producto agregado al carrito','exito')

    addToCart();


    } catch (error) {
        console.log(error);
    }

    

}



function deleteProduct(id){
    
    showQuestion('¿Esta seguro que desea borrar el producto seleccionado?')
    .then(async(result) => {
    try {
        
        if (result) 
            {
                console.log('entro');
            response = await  axios.delete(`${URL}/products/${id}`,{
                        headers: {Authorization: token}});  
            showAlert('Producto eliminado Correctamente')
            cargarProductos();
            }
    } catch (error) {
        console.log(error)
    }
    })
}


function editProduct(id) {

    submitBtn.classList.add('edit-btn') //le agrega una clase al boton para que tome los estilos del css
    submitBtn.innerText = 'Modificar Producto' //va a cambiar lo que dice el boton

    let product = Products[id];
    console.table(product)
    const el = productForm.elements;
    el.name.value = product.name
    el.description.value = product.description
    el.price.value = product.price
    el.image.value = product.image

    editIndex = id; //esta declarado arriba de renderizarTabla y se hace para que podamos traernos el id del que estamos editando para mas tarde que se termine de modificar
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



