export function getApiUrl() {
	// Si el frontend y el backend están en el mismo dominio, usa el dominio actual
	if (window.location.hostname === "localhost") {
		// Para desarrollo local
		return "http://127.0.0.1:8000";
	} else {
		// Para producción, usa el dominio de la página actual
		return `${window.location.origin}`; // Asumimos que la API está en /api
	}
}

// Función para obtener todos los vehículos desde el servidor
async function fetchVehicles() {
	const apiUrl = getApiUrl(); // Obtener la URL de la API
	const response = await fetch(`${apiUrl}/vehicles/`);
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
	const apiUrl = getApiUrl(); // Obtener la URL de la API
	window.location.href = `${apiUrl}/updateVehiculo?id=${id}`; // Redirigir al formulario de actualización
}

// Función para eliminar un vehículo
async function deleteVehicle(id) {
	const apiUrl = getApiUrl(); // Obtener la URL de la API
	const confirmation = confirm(
		"¿Estás seguro de que deseas eliminar este vehículo?"
	);
	if (confirmation) {
		const response = await fetch(`${apiUrl}/vehicles/${id}`, {
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

// Hacer que las funciones sean globales
window.editVehicle = editVehicle;
window.deleteVehicle = deleteVehicle;

// Llamar a la función para obtener los vehículos al cargar la página
fetchVehicles();
