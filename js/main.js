// #### VARIABLES ####
const texto = document.querySelector('#notas');
const btnAgregar = document.querySelector('.formulario input[type="submit"]');
const lista_notas = document.querySelector('.lista-notas');
const formulario = document.querySelector('.formulario');
let mensaje = "";
let arrayNotas = [];


// #### EVENTOS ####
texto.addEventListener('input', (evento) => {
    mensaje = evento.target.value.trim();
});

btnAgregar.addEventListener('click', agregar);

document.addEventListener('DOMContentLoaded', () => {
    arrayNotas = JSON.parse(localStorage.getItem("notas"));
    console.log(arrayNotas);
    rellenarHTML();
})


// #### FUNCIONES ####
function agregar(evento) {
    evento.preventDefault();

    if(mensaje !== "") {
        const ObjNota = {
            id: Date.now(),
            nota: mensaje
        }

        arrayNotas = [...arrayNotas, ObjNota];

        rellenarHTML();
    }
    else {
        error("No puede estar el campo vacío");
    }

    mensaje = "";
    texto.value = "";
}

function rellenarHTML() {
    limpiarHTML();
    
    if(arrayNotas.length >= 1) {
        arrayNotas.forEach((nota) => {
            const li_notas = document.createElement("li");
            li_notas.textContent = nota.nota;

            const borrar_nota = document.createElement("a");
            borrar_nota.textContent = "X";
            borrar_nota.classList.add('borrar-nota');
            li_notas.appendChild(borrar_nota);

            lista_notas.appendChild(li_notas);
        });
    }
    
    cargarLocalStorage();
}

function error(mensaje) {
    const msg_error = document.createElement("p");
    msg_error.textContent = mensaje;
    msg_error.classList.add('error');

    formulario.appendChild(msg_error);

    setTimeout(() => {
        msg_error.remove();
    }, 2000);
}

function cargarLocalStorage() {
    localStorage.setItem("notas", JSON.stringify(arrayNotas));
}

function limpiarHTML() {
    while(lista_notas.firstChild) {
        lista_notas.removeChild(lista_notas.firstChild);
    }
}