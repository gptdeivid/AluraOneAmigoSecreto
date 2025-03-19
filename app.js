// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.

// Array para almacenar los nombres de los amigos
const amigos = [];

/**
 * Función para agregar un amigo a la lista
 */
function agregarAmigo() {
    // Obtener el valor del input
    const inputAmigo = document.getElementById('amigo');
    const nombreAmigo = inputAmigo.value.trim();

    // Validar que el nombre no esté vacío
    if (nombreAmigo === '') {
        alert('Por favor, ingresa un nombre');
        return;
    }

    // Validar que el nombre no esté repetido
    if (amigos.includes(nombreAmigo)) {
        alert('Este amigo ya está en la lista');
        inputAmigo.value = '';
        return;
    }

    // Agregar el nombre al array
    amigos.push(nombreAmigo);

    // Agregar el nombre a la lista en el DOM
    const listaAmigos = document.getElementById('listaAmigos');
    const nuevoAmigo = document.createElement('li');
    nuevoAmigo.textContent = nombreAmigo;
    listaAmigos.appendChild(nuevoAmigo);

    // Limpiar el input
    inputAmigo.value = '';

    // Enfoque en el input para seguir agregando
    inputAmigo.focus();
}

/**
 * Función para realizar el sorteo de amigos secretos
 */
function sortearAmigo() {
    // Validar que haya al menos 3 amigos para hacer el sorteo
    if (amigos.length < 3) {
        alert('Necesitas al menos 3 amigos para realizar el sorteo');
        return;
    }

    // Limpiar los resultados anteriores
    const listaResultados = document.getElementById('resultado');
    listaResultados.innerHTML = '';

    // Crear una copia del array para no modificar el original
    const amigosSorteo = [...amigos];
    // Array para almacenar los resultados del sorteo
    const resultados = [];

    // Realizar el sorteo
    for (let i = 0; i < amigos.length; i++) {
        let amigoActual = amigos[i];
        let indiceAmigoSecreto;
        let amigoSecreto;

        // Asegurarse de que un amigo no se auto-seleccione y que no haya repeticiones
        do {
            indiceAmigoSecreto = Math.floor(Math.random() * amigosSorteo.length);
            amigoSecreto = amigosSorteo[indiceAmigoSecreto];
        } while (amigoSecreto === amigoActual && amigosSorteo.length > 1);

        // Remover el amigo secreto seleccionado de la lista disponible
        amigosSorteo.splice(indiceAmigoSecreto, 1);
        
        // Guardar el resultado
        resultados.push({
            amigo: amigoActual,
            amigoSecreto: amigoSecreto
        });
    }

    // Verificar si el último amigo se auto-seleccionó (puede ocurrir cuando queda solo uno)
    if (resultados[resultados.length - 1].amigo === resultados[resultados.length - 1].amigoSecreto) {
        // Si ocurrió, intercambiar con otro resultado para evitar auto-selección
        const indiceAleatorio = Math.floor(Math.random() * (resultados.length - 1));
        const temp = resultados[indiceAleatorio].amigoSecreto;
        resultados[indiceAleatorio].amigoSecreto = resultados[resultados.length - 1].amigoSecreto;
        resultados[resultados.length - 1].amigoSecreto = temp;
    }

    // Mostrar los resultados
    resultados.forEach(resultado => {
        const item = document.createElement('li');
        item.textContent = `${resultado.amigo} → ${resultado.amigoSecreto}`;
        listaResultados.appendChild(item);
    });
}

// Añadir evento para permitir presionar Enter para agregar amigo
document.getElementById('amigo').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        agregarAmigo();
    }
});
