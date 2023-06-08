//1-a guardo el formulario en una variable
const loginForm = document.getElementById("loginForm");

const URL = 'https://eit1-ecommerce-fullstack.onrender.com/api';



//1 - Obtener los datos del formulario
loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    
    const {email,password} = loginForm.elements;

    try {
        const dataBody = {
            email: loginForm.elements.email.value,
            password: loginForm.elements.password.value,
        }
        const resp = await axios.post(`${URL}/login`, dataBody)  // envio a login lo que mde devuelve el login Form y el data body
        const { token, user, msg } = resp.data;

        localStorage.setItem("token", token);
        localStorage.setItem("currentUser", JSON.stringify(user))

        showAlert(msg)
        setTimeout(() => {
            window.location.href = "/index"
        }, 2000)



    } catch (error) {
        console.log(error)
        showAlert('Error al hacel el Login','error')
        }
})