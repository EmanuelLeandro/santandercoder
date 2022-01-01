function cargarDatos() {
    if (localStorage.getItem("usuario")) {
        return JSON.parse(localStorage.getItem("usuario"));
    }

    return {};
}

function guardarDatos(usuario) {
    let datos = cargarDatos();
    datos={nombre:usuario.nombre,dni:usuario.dni,contraseña:usuario.contraseña};
    localStorage.setItem("usuario", JSON.stringify(datos));
}


$("#agregarUsuario").click(function() {
    const ids = ["#dni","#contraseña","#nombre"]
   agregarUsuario(ids);
});

function agregarUsuario(ids) {    
    let dni = $(ids[0]).val();
    let contraseña = $(ids[1]).val();
    let nombre = $(ids[2]).val(); //Obtengo la tarea
    guardarDatos({dni,contraseña,nombre}); //Guardo en LocalStorage
}



