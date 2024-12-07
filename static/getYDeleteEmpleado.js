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

async function fetchEmployees() {
	try {
		const response = await fetch(`${getApiUrl()}/empleados/`);
		const employees = await response.json();
		const tableBody = document.querySelector("#employeesTable tbody");

		tableBody.innerHTML = "";

		employees.sort((a, b) => a.id - b.id);

		employees.forEach((employee) => {
			const row = document.createElement("tr");
			row.innerHTML = `
          <td>${employee.id}</td>
          <td>${employee.nombre}</td>
          <td>${employee.correo}</td>
          <td>${employee.dni}</td>
          <td>
            <button onclick="editEmployee(${employee.id})">Actualizar</button>
            <button onclick="deleteEmployee(${employee.id})">Eliminar</button>
          </td>
        `;
			tableBody.appendChild(row);
		});
	} catch (error) {
		console.error("Error al obtener empleados:", error);
	}
}

window.editEmployee = (id) => {
	window.location.href = `/empleados/update/?id=${id}`;
};

window.deleteEmployee = async (id) => {
	try {
		const response = await fetch(`${getApiUrl()}/empleados/${id}`, {
			method: "DELETE",
		});
		if (response.ok) {
			Swal.fire("Eliminado", "Empleado eliminado", "success");
			fetchEmployees();
		}
	} catch (error) {
		Swal.fire("Error", "No se pudo eliminar el empleado", "error");
	}
};

fetchEmployees();
