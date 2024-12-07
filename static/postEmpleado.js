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

document
	.getElementById("employeeForm")
	.addEventListener("submit", async function (e) {
		e.preventDefault();

		const formData = new FormData(e.target);
		const employeeData = Object.fromEntries(formData.entries());
		employeeData.tipo = 1;
		try {
			const response = await fetch(`${getApiUrl()}/empleados/`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(employeeData),
			});

			if (response.ok) {
				const result = await response.json();
				Swal.fire("Empleado registrado", `ID: ${result.id}`, "success");
				e.target.reset();
			} else {
				Swal.fire("Error", "No se pudo registrar el empleado", "error");
			}
		} catch (error) {
			Swal.fire("Error", error.message, "error");
		}
	});
