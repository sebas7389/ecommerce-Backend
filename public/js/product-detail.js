const params = window.location.search;
const index = params.split('id=')[1];
const paramsURL = new URLSearchParams(params);
const paramsEntries = Object.fromEntries(paramsURL);

const products = [];



const URL = 'https://eit1-ecommerce-fullstack.onrender.com'

async function renderizarDetail(id) {

try {



  const respuesta = await axios.get(`${URL}/products/${id}`)
      product = respuesta.data.product

  const detial = `
                <div class = "card__detailr">
                <div class = "card__detail">
                  <!-- card left -->
                  <div class = "detail-imgs">
                    <div class = "detail-img-display">
                      <div class = "detail-img-showcase">
                        <img src = "${product.image}" alt="${product.name}">
                       
                      </div>
                    </div>
                    <div class = "detail-select">
                      <div class = "detail-img-item">
                      </div>
                    </div>
                  </div>
                  <!-- card right -->
                  <div class = "detail-product-content">
                    <h2 class = "detail-product-title">${product.name}</h2>
                    <a href = "#" class = "product-link">visita nuestra pagina Rsystem</a>
                    <div class = "detail-product-rating">
                      <i class = "fas fa-star"></i>
                      <i class = "fas fa-star"></i>
                      <i class = "fas fa-star"></i>
                      <i class = "fas fa-star"></i>
                      <i class = "fas fa-star-half-alt"></i>
                      <span>4.7(21)</span>
                    </div>

                    <div class = "detail-product-price">
                      <p ${product.price}</p>
                      <p ${product.price}</p>
                    </div>

                    <div class = "detail-product-detail">
                      <p>${product.description}</p>
                      <ul>
                        <li>Disponible: <span>En stock</span></li>
                        <li>Envio: <span>Gratis</span></li>
                      </ul>
                    </div>

                    <div class = "purchase-info">
                    <h2>Cantidad</h2>
                    <div class="product-quantity-container__increase quantity-product">
                      <button class="quantity-product__btn" onclick="decreaseInput()">
                          -
                      </button>
                      <input type="number" class="quantity-product__input" id="quantity-input" value=1>
                      <button class="quantity-product__btn" onclick="increaseInput()">
                          +
                      </button>
                  </div>
                    
                    <button class = "btn" onclick="addToCart()">
                      Añadir al carrito <i class = "fas fa-shopping-cart"></i>
                    </button>
                    <button class = "btn" onclick="btnComprar()">Comprar</button>
                  </div>
                </div>
              </div>
            </div>`

  
} catch (error) {
  console.log(error)
}
}

renderizarDetail(id)
    


    function increaseInput() {
        input.value = currentValue + 1;
        currentValue = parseInt(input.value);
    }

    function decreaseInput() {
        if (currentValue > 1) {
            input.value = currentValue - 1;
            currentValue = parseInt(input.value);
        }
    }
  

    function addToCart(){
      const cantProd = document.getElementById("product-detail-container-order-params__num")        
      const newOrder = {
          image: product.image,
          name: product.name,
          price: product.price,
          cant: parseInt(cantProd.value),
          total: parseInt(cantProd.value) * parseInt(product.price)
          
      }
      
      const prod = Order.find((prod)=>{
        if(prod.name === product.name){
          prod.cant = parseInt(prod.cant) + parseInt(cantProd.value);
          prod.total = prod.cant * parseInt(prod.price);
          return prod;
        }
      })
  
      if(!prod) {
        Order.push(newOrder);
      }
  
  // //Guardarlo en el local storage
  localStorage.setItem('order',JSON.stringify( Order));
  
  contarProductos();
  
  //Alerta de Producto agregado
  showAlert('Producto agregado a la Orden','exito');
  
  }
  
  function comprarOrden(){
  
    const existe = Order.find((prod)=>{
      if(product.name === product.name){
            return prod;
      }
    })
    if(!existe)
       agregarOrden();
    window.location.href = "/order";
  
  }