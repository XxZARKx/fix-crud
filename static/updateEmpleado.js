export function getApiUrl() {
	// Si el frontend y el backend están en el mismo dominio, usa el dominio actual
	if (window.location.hostname === "localhost") {
		// Para desarrollo local
		return "http://127.0.0.1:8000";
	} else {
		// Para producción, usa el dominio de la página actual
		return `${window.location.origin}`;
	}
}

function getEmployeeIdFromURL() {
	const params = new URLSearchParams(window.location.search);
	return params.get("id");
}

async function fetchEmployee(id) {
	const apiUrl = getApiUrl();
	const response = await fetch(`${apiUrl}/empleados/${id}`);
	const employee = await response.json();

	document.getElementById("employeeId").value = employee.id;
	document.getElementById("nombre").value = employee.nombre;
	document.getElementById("correo").value = employee.correo;
	document.getElementById("contraseña").value = employee.contraseña;
}

async function updateEmployee(event) {
	event.preventDefault();

	const id = document.getElementById("employeeId").value;
	const employeeData = {
		nombre: document.getElementById("nombre").value,
		correo: document.getElementById("correo").value,
		contraseña: document.getElementById("contraseña").value || undefined,
	};

	const apiUrl = getApiUrl();
	const response = await fetch(`${apiUrl}/empleados/${id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(employeeData),
	});

	if (response.ok) {
		Swal.fire("Éxito", "Empleado actualizado correctamente", "success");
		window.location.href = "/empleados/list";
	} else {
		Swal.fire("Error", "No se pudo actualizar el empleado", "error");
	}
}

document
	.getElementById("updateEmployeeForm")
	.addEventListener("submit", updateEmployee);

fetchEmployee(getEmployeeIdFromURL());
