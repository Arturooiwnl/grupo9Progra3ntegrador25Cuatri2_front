let altaProducts_container = document.getElementById("altaProducts-container");

altaProducts_container.addEventListener("submit", (event) => {
    event.preventDefault();

    //ahora guardo toda la info de mi formulario en un objeto nativo formdata
    let formData = new FormData(event.target); // el event.target lo hace, me devuelve el html de arriba: nombre imagen precio
    
    // transformo la info del obj formdata en un obj js
    let data = Object.fromEntries(formData.entries());

    console.log(data);
})
