// Función para obtener todos los vehículos desde el servidor
async function fetchVehicles() {
	const response = await fetch("http://127.0.0.1:8000/vehicles/");
	const vehicles = await response.json();
	const tableBody = document.querySelector("#vehiclesTable tbody");

	// Limpiar la tabla antes de agregar nuevos datos
	tableBody.innerHTML = "";

	// Agregar los vehículos a la tabla
	vehicles.forEach((vehicle) => {
		const row = document.createElement("tr");

		row.innerHTML = `
        <td>${vehicle.id}</td>
        <td>${vehicle.marca}</td>
        <td>${vehicle.modelo}</td>
        <td>${vehicle.placa}</td>
        <td>${vehicle.matricula}</td>
        <td>${vehicle.estado}</td>
        <td>
          <button onclick="editVehicle(${vehicle.id})">Actualizar</button>
          <button onclick="deleteVehicle(${vehicle.id})">Eliminar</button>
        </td>
      `;

		tableBody.appendChild(row);
	});
}

// Función para editar un vehículo
function editVehicle(id) {
	// Redirigir al formulario de actualización (puedes crear una ruta para eso)
	window.location.href = `/updateVehiculo?id=${id}`;
}

// Función para eliminar un vehículo
async function deleteVehicle(id) {
	const confirmation = confirm(
		"¿Estás seguro de que deseas eliminar este vehículo?"
	);
	if (confirmation) {
		const response = await fetch(`http://127.0.0.1:8000/vehicles/${id}`, {
			method: "DELETE",
		});

		if (response.ok) {
			alert("Vehículo eliminado exitosamente.");
			fetchVehicles(); // Recargar los vehículos después de eliminar uno
		} else {
			alert("Hubo un problema al eliminar el vehículo.");
		}
	}
}

// Llamar a la función para obtener los vehículos al cargar la página
fetchVehicles();
