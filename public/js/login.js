
//1-a Guardar el formulario en una variable
const loginForm = document.getElementById('loginForm');
const URL ='http://localhost:8000/api';


// 1- Obtener los datos del formulario
loginForm.addEventListener('submit', async (event) => {
    event.preventDefault ();
    console.dir(loginForm);
    
    // const {email, password} =loginForm.elements;

    console.log(loginForm.elements);
   
    //2- Chequear los datos ingresadps con los usarios que tengo
    //2a- Obtener los usuarios almacenados
try {

    const dataBody = {

        email:loginForm.elements.email.value,
        password:loginForm.elements.password.value
    }

    const resp = await axios.post(`${URL}/login`,dataBody);

    console.log (resp)
    const {token, user, msg} = resp.data;
    
    localStorage.setItem('token', token);
    localStorage.setItem('currentUser' , JSON.stringify(user));

    showAlert(msg);

    // setTimeout(()=> {
    //     window.location.href = '/';
    // },1500)

} catch (error) {
    console.log(error)

}
return
    // //TODO: Insertar alerta custom
    // showAlert('Login correcto te redireccionaremos en unos instantes...')
    
    // setTimeout(()=> {
    //     window.location.href = '/index.html';
    // },1500)
});

    //a- Email que me ingreso, lo tiene algun usuario de mi array
    //b- password deberian ser las mismas
//3- Guardar en el localStorage un registro que va a ser currentUser - user

//Function logaut
//Borrar el registro en el localStorage