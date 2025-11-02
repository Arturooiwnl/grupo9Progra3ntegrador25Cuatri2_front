
//ejercicio 2. imprimir datos de obj alumno y mostrarlo por consola y html. 

const alumno = {dni: 22222222, nombre: "jonatan", apellido: "quiroga"}
// mi elemnto html (<span>) donde se inyectaran los datos del alumno. guardo mi obj en una variable para una facil manipulacion(como voy a hacer con muchas cosas en el codigo)
const userInfo = document.getElementById("user-info-span") 

function imprimirDatosAlumno() { //una simple funcion q printea lo q quiero concatenado con backticks
    userInfo.textContent = `${alumno.nombre} ${alumno.apellido}`
    console.log(`nombre ${alumno.nombre} apellido ${alumno.apellido}`)
}

//ejercicio 3. implementar una funcion q imprima los productos frutas del array de obj

const productList = document.getElementById("product-list")

function renderProducts(items) {
    productList.innerHTML = ""  //limpio el contenido actual del contenedor de productos.
    if(items.length === 0) {
        productList.innerHTML = "<div class='no-products'><p>no hay productos disponibles</p></div>"
    }
    items.forEach(item => {  //itero sobre cada item del array para generar e inyectar el html. la idea es generar html dinamico en el cual puedo tener un array con 1000 cosas y esto me resolveria el problema.
        productList.innerHTML += // la cable es innerhtml
        `<div class="card-product">
            <img src="${item.img}" alt="${item.nombre}"/>
            <h3>${item.nombre}</h3>
            <p>${item.precio}</p>
            <button onclick="addToCart(${item.id})">agregar al carrito</button>
        </div>`
    })
}

// ejercicio 4 funcion de filtro con input

const filterInput = document.getElementById("filter-input")

filterInput.addEventListener("input", () => {
    const text = filterInput.value.toLowerCase()
    const filteredList = frutas.filter(fruta => fruta.nombre.toLowerCase().includes(text))  // filtro el array para incluir solo aquellas cuyo nombre contiene el texto buscado.
    renderProducts(filteredList) // aca renderizo mi array filtrado
})


// ejercicio 5 funcionalidad carrito asociada al boton de cada elemnto del carrito.
// el carrito debe mostrarse por console.log


const cartItems = document.getElementById("cart-items");
let cart = JSON.parse(localStorage.getItem("cart")) || []; // ejercicio 6. parseao a json para q lo pueda leer sino no lo puedo usar. de texto plano a jason
let cartCounter = document.getElementById("cart-counter-span");// ejercicio 7. contador de productos en mi carrito


const totalGasto = document.getElementById("total");

function addToCart(id) { // con esta funcion agrego un producto al carrito, actualizo el total y renderizo la lista
    const fruta = frutas.find(fruta => fruta.id === id) // con el metodo find recorro el array usando el id
    cart.push(fruta); // lo q encuentro lo agrego con push
    mostrarCarrito(); // aca muestro mi carrito ya actualizado
    localStorage.setItem("cart", JSON.stringify(cart))// aca parseo mi array de obj a texto plano para q local storage lo guarde. el objetivo es q los datos persistan entre refrescos de pagina
}

function mostrarCarrito() {
    cartItems.innerHTML = ""
    let total = 0
    cart.forEach((item,index) => {
        total += item.precio;
        cartItems.innerHTML += 
        `<li class="bloque-item">
            <p class="nombre-item">${item.nombre} - ${item.precio}</p>
            <button class="boton-eliminar" onclick="removeSingleItem(${index})">Eliminar</button>
        </li>`;
        console.log(item.nombre);
    })
    totalGasto.textContent = `Total: $${total.toFixed(2)}`; // aca asigno el valor de la variable total al contenido del elemento html
    cartCounter.textContent = `${cart.length} `
}

function removeSingleItem(index) {
    cart.splice(index,1)
    mostrarCarrito()
    localStorage.setItem("cart", JSON.stringify(cart))
}

function resetCart() { // reseteo mi carrito, utilizando el metodo removeItem de localstorage.
    cart = []
    total = 0
    localStorage.removeItem("total")
    localStorage.removeItem("cart")
    mostrarCarrito();   //llamo a mis funciones para q renderizen el estado actual de las variables
    mostrarTotal(); 
}

const resetButton = document.getElementById("reset-cart");
resetButton.addEventListener("click", resetCart);



function init() {

    mostrarCarrito();
    renderProducts(frutas)
    imprimirDatosAlumno()
}

init()