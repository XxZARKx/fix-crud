document
	.getElementById("vehicleForm")
	.addEventListener("submit", async function (e) {
		e.preventDefault(); // Prevenir el envío del formulario tradicional

		// Obtener los datos del formulario
		const formData = new FormData(e.target);
		const vehicleData = Object.fromEntries(formData.entries());

		// Enviar la solicitud POST al servidor
		try {
			const response = await fetch("/vehicles/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(vehicleData), // Enviar los datos del formulario en formato JSON
			});

			if (response.ok) {
				const result = await response.json();
				alert("Vehículo registrado exitosamente: " + result.id);
			} else {
				const errorData = await response.json();
				alert("Error: " + errorData.detail);
			}
		} catch (error) {
			console.error("Error al registrar vehículo:", error);
			alert("Ocurrió un error al intentar registrar el vehículo.");
		}
	});
