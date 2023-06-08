const signIn = document.getElementById('sign-in');
const navbarNavLink = document.getElementById('navbar__nav-linksC');
const cartCount = document.getElementById('cart-count');
const adminUserLi = document.getElementById('user-navbar__admin-user');
const adminProductLi = document.getElementById('user-navbar__admin-product');
const nameUser = document.getElementById('user-navbar__name-user');


let Order = JSON.parse(sessionStorage.getItem("order")) || [];


function renderHeaderLinks(){
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if(currentUser){
    const name = currentUser.fullName.split(" ");
    nameUser.innerHTML = `<label class="user-navbar__name-user">${name[0]}</label>`;
    signIn.innerHTML = `<a href="/index" onclick="login()"  class="user-navbar__logout">Logout</a>`
    
    if(currentUser.role === 'ADMIN_ROLE'){
        adminUserLi.style.display = 'block';
        adminProductLi.style.display = 'block';
    }else{
        adminUserLi.style.display = 'none';
        adminProductLi.style.display = 'none';
    }
    }
    else {
        adminUserLi.style.display = 'none';
        adminProductLi.style.display = 'none';
        
    }


}

function login(){
    const currentUser = JSON.parse(localStorage.getItem('currentUser')); 
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token')
    renderHeaderLinks();
    
}

renderHeaderLinks();

//Para el menu de hamburguesa
const menuBtn = document.getElementById('navbar-menu-btn');
const menuContainer = document.getElementById('navbar-nav-links-container')
const menuLabel = document.getElementById('navbar-menu-icon');


menuBtn.addEventListener('click', () => {
    menuContainer.classList.toggle('open');
    menuLabel.classList.toggle('open');
  
    if (menuLabel.classList.contains('open')){
        menuLabel.innerHTML ='<i class="fa-solid fa-xmark"></i>'
    }else{
        menuLabel.innerHTML = '<i class="fa-solid fa-bars"></i>';
    }

    

})

// // Funciones para el Submenu del Avatar
const userAvatar = document.getElementById('user-navbar-user-avatar-container');
const menuUser = document.getElementById('user-navbar-nav-links-container');

userAvatar.addEventListener('mouseover', (evt) => {
             menuUser.style.height = 'auto';
})
menuUser.addEventListener('mouseover', (evt) => {
    menuUser.style.height = 'auto';
})

menuUser.addEventListener('mouseout', (evt) => {
    menuUser.style.height = '0';
})


function contarProductos(){
    Order = JSON.parse(sessionStorage.getItem('order')) || [];
    let cantidad = 0;
    Order.forEach((prod) => {
        cantidad += prod.cant; 
    })
    cartCount.innerText = cantidad;
}

contarProductos();

