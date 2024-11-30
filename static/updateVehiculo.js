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
function getVehicleIdFromURL() {
	const urlParams = new URLSearchParams(window.location.search);
	return urlParams.get("id");
}

// Función para obtener los datos del vehículo
async function fetchVehicle(id) {
	const apiUrl = getApiUrl(); // Obtener la URL de la API

	const response = await fetch(`${apiUrl}/vehicles/${id}`);
	const vehicle = await response.json();

	// Rellenar el formulario con los datos del vehículo
	document.getElementById("vehicleId").value = vehicle.id;
	document.getElementById("marca").value = vehicle.marca;
	document.getElementById("modelo").value = vehicle.modelo;
	document.getElementById("placa").value = vehicle.placa;
	document.getElementById("matricula").value = vehicle.matricula;
	document.getElementById("estado").value = vehicle.estado;
}

// Función para manejar la actualización del vehículo
async function updateVehicle(event) {
	event.preventDefault();

	const id = document.getElementById("vehicleId").value;
	const vehicleData = {
		marca: document.getElementById("marca").value,
		modelo: document.getElementById("modelo").value,
		placa: document.getElementById("placa").value,
		matricula: document.getElementById("matricula").value,
		estado: document.getElementById("estado").value,
	};

	const apiUrl = getApiUrl(); // Obtener la URL de la API

	const response = await fetch(`${apiUrl}/vehicles/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(vehicleData),
	});

	if (response.ok) {
		alert("Vehículo actualizado con éxito.");
		window.location.href = "/"; // Redirigir a la lista de vehículos
	} else {
		alert("Hubo un problema al actualizar el vehículo.");
	}
}

// Obtener el ID del vehículo desde la URL y cargar los datos
const vehicleId = getVehicleIdFromURL();
fetchVehicle(vehicleId);

// Asociar la función de actualización al formulario
document
	.getElementById("updateVehicleForm")
	.addEventListener("submit", updateVehicle);
