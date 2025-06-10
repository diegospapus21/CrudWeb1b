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
                <button onclick="AbrirModalEditar(${persona.id}, '${persona.Nombre}', '${persona.Apellido}', '${persona.email}', '${persona.edad}')">Editar</button>
                <button onClick ="EliminarPersona(${persona.id})">Eliminar</button>
            </td>

        </tr>
        `
    });
} 

//Lamada inical para que se carguen los datos que vienen del servidor
ObtenerPersonas(); 

//Agregar un nuevo registro
const modal = document.getElementById("modal-agregar");
const btnAgregar = document.getElementById("btnAbrirModal");
const btnCerrar = document.getElementById("btnCerrarModal");

btnAgregar.addEventListener("click" , () =>{
    modal.showModal(); //Abrir el modal al hacer clic  en el boton
});

btnCerrar.addEventListener("click" , () => {
    modal.close();
}); 

//Agregar nuevo integrante desde el formulario
document.getElementById("frmAgregar").addEventListener("submit" ,async e => {
    e.preventDefault(); //e respresenta "submit" - Evita que el formulario se envie de golpe

const Nombre = document.getElementById("nombre").value.trim();
const Apellido = document.getElementById("apellido").value.trim();
const email = document.getElementById("email").value.trim();
const edad = document.getElementById("edad").value.trim();

if(!Nombre || !Apellido || !email || !edad){
    alert("Complete todos los campos");
    return; //Eviata que el formulario se envie
}

//Llamar a la API para enviarle el usuario
const respuesta = await fetch(API_URL , {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({Nombre, Apellido, email, edad})
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

//Funcion para borrar registros 
async function EliminarPersona(id){
    const confirmacion = confirm("Estas completamente seguro de querer eliminar este registro");

    //Validamos si el usuario dijo que si queria borrar
    if(confirmacion){
        await fetch(`${API_URL}/${id}`,{method: "DELETE"});

        //Recargamos la tabla para ver la eliminacion
        ObtenerPersonas();
    }
}


//Proceso para editar un registro 
const modaleditar = document.getElementById("modal-editar");
const btnCerrarEditar = document.getElementById("btnCerrarEditar");

btnCerrarEditar.addEventListener("click" , () => {
    modal.close(); //Cerrar modal editar
}); 

function AbrirModalEditar (id, Nombre, Apellido, email, edad){
    //Se agregan los valores del registro en los input
    document.getElementById("idEditar").value = id;
    document.getElementById("nombreEditar").value = Nombre;
    document.getElementById("apellidoEditar").value = Apellido;
    document.getElementById("emailEditar").value = email;
    document.getElementById("edadEditar").value = edad;

    //Modal se abre despues de agregra los valores a los input)
    modaleditar.showModal();
} 

document.getElementById("frmEditar").addEventListener("submit", async e=>{
    e.preventDefault(); //Evita que el formulario se envie

    const id = document.getElementById("idEditar").value;
    const Nombre = document.getElementById("nombreEditar").value.trim();
    const Apellido = document.getElementById("apellidoEditar").value.trim();
    const email = document.getElementById("emailEditar").value.trim();
    const edad = document.getElementById("edadEditar").value.trim();

    if(!id|| !Nombre || !Apellido || !email || !edad){
        alert("Complete todos los campos");
        return; //Evita que el codigo se siga ejecutando
}
        //Llamada a la api
        const respuesta = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({edad, email, Nombre, Apellido})
        });

        //alert(`${API_URL}/${id}`);
        if(respuesta.ok){
            alert("Registro actualizado con exito"); //Confirmacion
            modaleditar.close(); //Cerramos el modal
            ObtenerPersonas(); //Actualizamos la lista 
        }
        else{
            alert("Hubo un error al actualizar");
        }
    
    
});




