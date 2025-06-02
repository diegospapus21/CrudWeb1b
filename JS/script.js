//URL DE LA API
const API_URL = "https://retoolapi.dev/0JMRMI/data";
//Funcion que manda a traer el JSON
async function ObtenerPersonas() {
    //Respuesta del servidor
    const res = await fetch(API_URL);//se hace una llamada al endepoint
    
    //Pasamos a JSON la respuesta del servidor
    const data = await res.json();//Esto es un JSON

    //Enviamos el JSON que nos manda la API a ala funcion que crea la tabla HTML
    mostrarDatos(data);
}
// La funcion lleva un parametro "datos" que representa al JSON
function mostrarDatos(datos) {
    //se llama al tbody dentro del elemento con id "tabla"
    const tabla = document.querySelector ('#tabla tbody');
    
    //Para inyecatar codigo HTML usamos innerHTML
    tabla.innerHTML = '';//vaciamos el contenido de la tabla

    datos.forEach(persona => {
        tabla.innerHTML += `
        <tr>
            <td>${persona.id}</td>
            <td>${persona.Nombre}</td>
            <td>${persona.Apellido}</td>
            <td>${persona.email}</td>
            <td>${persona.edad}</td>
            <td> 
                <button>Editar</button>
                <button>Eliminar</button>
            </td>

        </tr>
        `
    });
} 

//Lamada inical para que se carguen los datos que vienen del servidor
ObtenerPersonas(); 

//Agregar un nuevo registro
const modal = document.getElementById("modal-agregar");
const btnAgregar = document .getElementById("btnAbrirModal");
const btnCerrar = document.getElementById("btnCerrarModal");

btnAgregar.addEventListener("click" , () =>{
    modal.showModal(); //Abrir el modal al hacer clic  en el boton
});

btnCerrar.addEventListener("click" , () => {
    modal.close();
}); 

//Agregar nuevo integrante desde el formulario
document.getElementById("fmrAgregar").addEventListener("submit" ,async e => {
    e.preventDefault(); //e respresenta "submit" - Evita que el formulario se envie de golpe

const nombre = document.getElementById("nombre").Value.trim();
const apellido = document.getElementById("apellido").Value.trim();
const email = document.getElementById("email").Value.trim();
const edad = document.getElementById("edad").Value.trim();

if(!nombre || !apellido || !email || !edad){
    alert("Complete todos los campos");
    return; //Eviata que el formulario se envie
}

//Llamar a la API para enviarle el usuario
const respuesta = await fetch(API_URL , {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({nombre, apellido, email, edad})
});

if (respuesta.ok){
    alert("El registro fue agregado correctamente");

    //Limpiar el formulario y cerrar el modal
    document.getElementById("frmAgregar").reset();

    modal.close(); 

    //Recargar la tabla 
    ObtenerPersonas();
}
else{
    alert("Hubo un problema")
}

} );



