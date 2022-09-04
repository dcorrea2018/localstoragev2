const txtPelicula = document.getElementById('txtPelicula');
const tblPeliculas = document.getElementById('tblPeliculas');


let peliculas = (localStorage.getItem("peliculas")) ? JSON.parse(localStorage.getItem("peliculas")) : [];

mostrarPeliculas();

function guardar() {
    const pelicula = txtPelicula.value;
    peliculas.push(pelicula);
    actualizarStorage();
}

function actualizarStorage() {
    localStorage.setItem("peliculas", JSON.stringify(peliculas));
    mostrarPeliculas();
}

function mostrarPeliculas() {
    if (peliculas.length == 0) {
        tblPeliculas.innerHTML = `<tr class="text-center font-weight-bold">
        <td colspan="2">NO HAY REGISTROS</td>
    </tr>`;
    } else {
        tblPeliculas.innerHTML = "";
        for (const pelicula of peliculas) {
            const tr = document.createElement("tr");//crea el renglon de la table

            const tdPelicula = document.createElement("td");
            tdPelicula.innerText = pelicula;
            tr.appendChild(tdPelicula);
            tblPeliculas.appendChild(tr);

            const tdAcciones = document.createElement("td");

            const btnEliminar = document.createElement("button");
            btnEliminar.innerText = "Eliminar";

            btnEliminar.classList.add("btn", "btn-danger");

            btnEliminar.onclick = () => eliminar(pelicula)
            tdAcciones.appendChild(btnEliminar);
            tr.appendChild(tdAcciones);

            const btnEditar = document.createElement("button");
            btnEditar.innerText = "Editar";

            btnEditar.classList.add("btn", "btn-warning", "ml-2");

            btnEditar.onclick = () => editar(pelicula)
            tdAcciones.appendChild(btnEditar);
            tr.appendChild(tdAcciones);
        }
    }
}

function eliminar(pelicula) {
    const index = peliculas.indexOf(pelicula);
    peliculas.splice(index, 1);
    actualizarStorage();
}

function editar(pelicula) {
    const index = peliculas.indexOf(pelicula);
    const nuevo_nombre_pelicula = prompt(`Ingrese el nuevo nombre de la pelicula actual: ${pelicula}`);
    peliculas[index] = nuevo_nombre_pelicula;
    actualizarStorage();

}