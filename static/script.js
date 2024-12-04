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
document
  .getElementById("vehicleForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault(); // Prevenir el envío del formulario tradicional

    // Obtener los datos del formulario
    const formData = new FormData(e.target);
    const vehicleData = Object.fromEntries(formData.entries());

    // Obtener la URL de la API (se adapta según el entorno)
    const apiUrl = getApiUrl();

    // Enviar la solicitud POST al servidor
    try {
      const response = await fetch(`${apiUrl}/vehicles/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vehicleData), // Enviar los datos del formulario en formato JSON
      });

      if (response.ok) {
        const result = await response.json();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Vehículo registrado exitosamente: ID ${result.id}`,
          toast: true,
          showConfirmButton: false,
          timer: 2000, // Duración del popup en milisegundos
        });
        console.log(e.target);
        e.target.reset();
      } else {
        const errorData = await response.json();
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Error al registrar el vehículo",
          text: errorData.detail,
          showConfirmButton: false,
          timer: 3000,
        });
      }
    } catch (error) {
      console.error("Error al registrar vehículo:", error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al intentar registrar el vehículo.",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  });
