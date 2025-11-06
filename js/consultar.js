
// Seleccion de elementos del DOM
// let contenedorProductos = document.getElementById("contenedor-productos");
let listaProductos = document.getElementById("product-list");
let getProductForm = document.getElementById("getProduct-form");
let url = "http://localhost:3500";


getProductForm.addEventListener("submit", async (event) => {

    event.preventDefault(); // Prevenimos el envio por defecto del formulario

    // Tenemos que obtener los datos del formulario, por tanto, vamos a crear un objeto FormData a partir de los datos del formulario
    let formData = new FormData(event.target); //Creamos un nuevo objeto FormData a partir de los datos del formulario q detona el event

    console.log(formData); // FormData { idProd → "2" }
    // Ojo, esto no se muestra en navegadores basados en Chromium

    // Transformamos a objetos JS los valores de FormData
    let data = Object.fromEntries(formData.entries());
    console.log(data); // {idProd: '2'}

    let idProd = data.idProd; // Ahora ya tenemos guardado en una variable el valor del campo del formulario
    console.log(idProd);

    console.log(`Realizando una peticion GET a la url ${url}/productos/${idProd}`);

    let response = await fetch(`${url}/productos/${idProd}`);

    let datos = await response.json();

    // Extraemos de la respuesta payload, el primer resultado que contiene el objeto que consultamos
    let producto = datos.payload[0];
    console.log(producto);

    let htmlProducto = `
    <li class="li-producto">
            <img src="http://localhost:3500/uploads/${producto.imagen}" alt="${producto.nombre}">
            <p>Id: ${producto.id} / Nombre: ${producto.nombre} / <strong>Precio: ${producto.precio}</strong></p>
    </li>
    `;

    listaProductos.innerHTML = htmlProducto;




/*==========================
    Que es FormData?
============================

FormData es una interfaz nativa de JavaScript que permite crear un conjunto de pares clave-valor 
que representan los campos de un formulario HTML y sus respectivos valores.

Esta clase se utiliza principalmente para capturar y enviar datos de formularios, 
ya sea mediante métodos como fetch o XMLHttpRequest, 
y se encarga de formatear los datos correctamente como multipart/form-data, 
estableciendo automáticamente los encabezados necesarios para el envío
*/
    });
