let Users = JSON.parse(localStorage.getItem('users')) || [];


let favorites = [];


//Tabla de Usuarios
const tableBody = document.getElementById('admin-user-table__body');
const submitBtn = document.getElementById('admin-user__submit-btn');
const userForm = document.getElementById('admin-user-form');

let editIndex;


//Funcion para rellenar la tabla del Index 
function cargarTabla(){
    tableBody.innerHTML = ''
    if(Users.length === 0) {
        tableBody.innerHTML = '<tr class="disable"> <td coldspan = 6>NO SE ENCONTRARON PRODUCTOS </td></tr>';
        return;
    }
    Users.forEach((producto,index)=>{
        
       const tableRow = `
       <tr>
                <td class="admin-user__name">${producto.fullName}</td>
                <td class="admin-user__lastName">${producto.email}</td>
                <td class="admin-user__lastName">${producto.date}</td>
                <td class="admin-user__name">${producto.country}</td>
                <td class="admin-user__lastName">${producto.gender}</td>
                <td class="admin-user__name">${producto.role}</td>
                <td class = "admin-user__actions">
                <button class= "admin-user__action-btn" onclick= "deleteUser(${index})" >
                <i class="fa-regular fa-trash-can"></i>
                </button>
                <button class= "admin-user__action-btn admin-user__btn-edit" data-indice="${index}" onclick= "editUser(${index})" >
                <i class="fa-solid fa-pencil"></i>
                </button>
                </td>
            </tr>
       ` 
       tableBody.innerHTML += tableRow; 
    })
}

cargarTabla();

//Funcion para agregar un nuevo usuario a la tabla
function addUser(evt){
    evt.preventDefault();
    const elements = evt.target.elements;

    let nombres = elements.fullName.value.trim().split(/\s+/);
    let nombresConvt = '';

    nombres.forEach((palabra)=>{
        nombresConvt += palabra[0].toUpperCase() + palabra.substring(1).toLowerCase() + ' ';
    })
    
    const newUser = {
        fullName: nombresConvt,
        email: elements.email.value,
        password: elements.password1.value,
        date: elements.date.value,
        country: elements.country.value,
        gender: elements.gender.value,
        role: elements.role.value
    }
        
    if (editIndex >= 0) {
      Users[editIndex] = newUser;
    }else {
      Users.push(newUser);
    }

//Guardarlo en el local storage
localStorage.setItem('users',JSON.stringify( Users));

editIndex = undefined;
submitBtn.classList.remove('edit-btn');
submitBtn.innerText = 'Cargar'

cargarTabla();

if(Users.length > 14){
    submitBtn.disabled = true;
    submitBtn.style.backgroundColor = '#666';
  }

  limpiarInput();

}

//Limpiar input
function limpiarInput(){
  const el = userForm.elements;
   
  el.fullName.value = '';
  el.email.value = '';
  el.password1.value = '';
  el.password2.value = ''; 
  el.date.value = '';
  el.country.value = 'AR';
  el.gender.value = 'otro';
  el.role.value = 'USER_ROLE';
 
}


//Funcion para borra un usuario seleccionado de la tabla
function deleteUser(id){
    showQuestion('¿Esta seguro que desea borrar el Usuario seleccionado?')
      .then((result) => {
        if (result.isConfirmed) {
            Users.splice(id,1)
            //Guardarlo en el local storage
            localStorage.setItem('users',JSON.stringify( Users));
            
            cargarTabla();
        
            if(Users.length < 15){
                submitBtn.disabled = false;
                submitBtn.style.backgroundColor = 'rgb(76, 121, 76)';
            }
          showAlert('¡Borrado!', 'El Usuario ha sido borrado.', 'exito');
        }
      })
}


//Edita un usuario Seleccionado
function editUser(id){

    submitBtn.classList.add('admin-user__edit-btn');
    submitBtn.innerText = 'Modificar'

   let product = Users[id];

   const el = userForm.elements;
   
  editIndex = id;

  el.name.value = product.fullName;
  el.email.value = product.email;
  el.password.value = product.password;
  el.password2.value = product.password; 
  el.date.value = product.date;
  el.country.value = product.country;
  el.gender.value = product.gender;
  el.role.value = product.role;
}


//Funcion para filtrar la table de usuario segun un texto pasado como parametro
function metodoFilter(){
    const text =  document.getElementById('search').value; 
    const usersFiltrados = Users.filter((usuario) => {
            const filtra = usuario.fullName.toLowerCase().includes(text.toLowerCase())
            return filtra
             });

const cant = usersFiltrados.length;

document.getElementById('admin-user-search-container_cant').innerText = 'Cantidad de Coincidencias: ' + cant;


if(!cant){
  Users = JSON.parse(localStorage.getItem('users')) || [];
  cargarTabla();
  showAlert('No hubo coincidencias')
}else{
  Users = usersFiltrados;             
  cargarTabla();
  Users = JSON.parse(localStorage.getItem('users')) || [];
}


}