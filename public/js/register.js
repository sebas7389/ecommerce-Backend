// obtener formulario y guardarlo en una 
const registerForm = document.querySelector('#registerForm');
//obtener boton submit
const resgisterBtn = document.getElementById('registerSubmit');

registerForm.addEventListener('submit', (evt)=>{
     evt.preventDefault();
     
    //tomar los datos y amar el objeto usuario
    const el = evt.target.elements;
    console.log(el)

    if (el.password1.value !== el.password2.value) {
        console.warn('El password no coincide')
    }
    //Obtener los usuarios guardados en local storage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    let userEmailExist =  users.find(urs => {
        if (urs.email === el.email.value)
             return true;
            
        return false;
        
    });
    //
    if(userEmailExist)
    {
      showAlert('El usuario ya existe','error');
      return;  
    }
    //

    const use = {
        name: el.Name.value,
        email: el.email.value,
        password: el.password1.value,
        date: el.bornDate.value,
        country: el.country.value,
        gender: el.gender.value,
        role: 'USER_ROLE'
    }

    //Agregar en el array primero
    users.push(use);
    //ahora lo agrego en el localstorage
    localStorage.setItem( 'users',JSON.stringify(users));

    showAlert('El usuario se registro correctamente','success');
    setTimeout(() => {
        window.location.href = "/pages/login/login.html";
    }, 1500)
})

//!-

//!SOLUCION 1
// let userEmailExist = false;
//     users.forEach(usr => {
//         if(usr.email === el.email.value) {
//           userEmailExist = true;
//        }
//     })       
//  if (userEmailExist) {
//     console.warn(`El usuario ya existe`);
//     return
//  }
//!


//* SOLUCION 2
// const userExist = users.find(user => {
//     if (user.email ===el.email.value) {
//         return true;
// }
// return false; // No es necesario ya que si no lo defino se hace un return undefined (falsy)
// })
//  if (userExist) {
//         console.warn(`El usuario ya existe`);
//         return;
//}
//*
// })