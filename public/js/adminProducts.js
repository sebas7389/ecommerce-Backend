const { default: axios } = require("axios");

let Products = [];

//Tabla de productos
const tableBody = document.getElementById('admin-product-table_body');
const submitBtn = document.getElementById('admin-product__submit-btn');
const productForm = document.getElementById('admin-product-form');

let editIndex;

const URL = 'http://localhost:8000/api';
const token = localStorage.getItem('token');



async function cargarProductos(){
    try {
        const respuesta = await axios.get(`${URL}/products`)
        Products = respuesta.data.productos
        renderizarTabla(Products)
        
    } catch (error) {
        console.log(error)
    }
}

function renderizarTabla(){
    tableBody.innerHTML = ''
    if(Products.length === 0) {
        tableBody.innerHTML = '<tr class="disable"> <td coldspan = 6>NO SE ENCONTRARON PRODUCTOS </td></tr>';
        return;
    }
    Products.forEach((producto,index)=>{
        let imageSrc = '/assest/image/no-product.png';
       if(producto.image) 
            imageSrc  = producto.image;
       const tableRow = `
       <tr>
                <td><img class= "admin-product__img" src="${imageSrc}" alt="${producto.name}" width="80px"></td>
                <td>${producto.name}</td>
                <td class="admin-product__desc">${producto.description}</td>
                <td class="admin-product__price">$ ${producto.price}</td>
                <td class="admin-product__date">${producto.date}</td>
                <td >
                <div class = "admin-product__actions">
                <button class= "admin-product__delete-btn" onclick= "deleteProduct(${index})" >
                <i class="fa-regular fa-trash-can"></i>
                </button>
                <button class= "admin-product__btn-edit" data-indice="${index}" onclick= "editProduct(${index})" >
                <i class="fa-solid fa-pencil"></i>
                </div>
                </button>
                </td>
            </tr>
       ` 
       tableBody.innerHTML += tableRow; 
    })
}

renderizarTabla();

async function addProduct(evt){

    try {
        evt.preventDefault();
        const elements = evt.target.elements;
        const formFile = new FormData(evt.target);
               
        if (editIndex) {
            const updateProduct = {
            name: elements.name.value,
            description: elements.description.value,
            price: elements.price.value,
            updateAt: elements.date.value,
            }

            const response = await axios.put(`${URL}/products/${editIndex}`,updateProduct,{
            headers: {Authorization: token}});
            if(!response)
                showAlert('No se pudo modificar el Producto','error')
            else      
                showAlert('Producto Actualizado Correctamente','exito')
            inputImgForm.style.display ='block';
            
        }else {
            const response = await axios.post(`${URL}/products`,formFile,{
            headers: { Authorization: token } });
            if(!response)
                showAlert('No se pudo agregar el Producto','error')
            else      
                showAlert('Producto añadido Correctamente','exito')
            
        }

    editIndex = undefined;
    submitBtn.classList.remove('edit-btn');
    submitBtn.innerText = 'Cargar Producto'

    cargarProductos();
    limpiarInput()
    } catch (error) {
        console.log(error)
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


async function editProduct(id){

    submitBtn.classList.add('edit-btn');
    submitBtn.innerText = 'Modificar Producto'

   const token = localStorage.getItem('token');
   response = await axios.get(`${URL}/products/${id}`,{
    headers: {
        Authorization: token
    }
   });
 
   const product = response.data.product;
   const el = productForm.elements;
   editIndex = id;
   
   //lleno el formulario
   el.name.value = product.name;
   el.category.value = product.category._id,
   el.description.value = product.description;
   el.price.value = product.price;
   inputImgForm.style.display ='none';
   el.date.value = formatDate(product.updateAt);
   
}

//Funcion para filtrar la table de productos al precionar el boton de Filtrar
function metodoFilter(){
    const text =  document.getElementById('search').value; 
    buscarProductos(text);
}

//Funcion para filtrar la table de productos segun el input 
function buscarProductosInput(evt){
    if (evt.keyCode !== 13) return;
    const text = evt.target.value.toLowerCase().trim();
    buscarProductos(text);
  }

//Funcion de Busqueda de productos por un parametro texto   
function buscarProductos(text) { 
    const productsFiltrados = Products.filter((producto) => {
            const filtra = producto.name.toLowerCase().includes(text.toLowerCase())
            return filtra
             });

const cant = productsFiltrados.length;

document.getElementById('admin-product-search-container_cant').innerText = 'Cantidad de Coincidencias: ' + cant;


if(!cant){
    renderizarTabla(Products);
    showAlert('No hubo coincidencias');
}else{
    renderizarTabla(productsFiltrados);
}


}

//Limpiar input
function limpiarInput(){
  const el = productForm.elements;
   
  el.name.value = '';
  el.category.value = '';
  el.description.value = '';
  el.price.value = '';
  el.image.value = '';

  cargarFechaActual();
 
}

function actualizarImg(id) {
    var inputFile = document.getElementById('inputFile');
 // Asignar una función al evento onchange del campo de entrada de archivos
    inputFile.onchange = function() {
    obtenerNombreImagen(id);
    };
    // Simular un clic en el campo de entrada de archivos
    inputFile.click();
  }

  async function obtenerNombreImagen(id) {
    try {
        const inputFile = document.getElementById('inputFile');
        // Obtener el nombre del archivo seleccionado
         
        const formData = new FormData();
            formData.append("image", inputFile.files[0] );

        const response = await axios.put(`${URL}/products/${id}/image`,formData,{
            headers: {Authorization: token}});
            
        cargarProductos();
        
        } catch (error) {
            console.log(error)
        }
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
  
  //formatea la fecha devuelta por mondo db
  function formatDate(fechaMongoDB){
    // Obtener los componentes de la fecha
    var dia = fechaMongoDB.substring(8,10);
    // Los meses comienzan en 0, por lo que se suma 1
    var mes = fechaMongoDB.substring(5,7); 
    var anio = fechaMongoDB.substring(0,4);
    // Formatear la fecha y la retorno
    return fechaFormateada = anio + "-" + mes + "-" + dia;
  }