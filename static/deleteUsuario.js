import { getApiUrl } from "./getApiUrl.js";

export const deleteUsuario = async (id) => {
	try {
		// Mostrar popup de confirmación con SweetAlert2
		const { isConfirmed } = await Swal.fire({
			title: "¿Estás seguro de eliminar el usuario?",
			text: "Esta acción no se puede deshacer.",
			icon: "warning",
			confirmButtonText: "Eliminar",
			cancelButtonText: "Cancelar",
			showCancelButton: true,
			reverseButtons: true,
		});

		// Proceder solo si el usuario confirma la acción
		if (!isConfirmed) return false;

		// Realizar solicitud DELETE a la API
		const response = await fetch(`${getApiUrl()}/users/${id}`, {
			method: "DELETE",
		});

		if (response.ok) {
			// Mensaje de éxito con SweetAlert2
			await Swal.fire({
				title: "¡Éxito!",
				text: "Usuario eliminado correctamente.",
				icon: "success",
			});
			return true;
		} else {
			// Mensaje de error con SweetAlert2
			await Swal.fire({
				title: "Error",
				text: "No se pudo eliminar el usuario.",
				icon: "error",
			});
			return false;
		}
	} catch (error) {
		console.error("Error al enviar la solicitud DELETE:", error);

		// Mostrar mensaje de error con SweetAlert2
		await Swal.fire({
			title: "Error",
			text: "No se pudo completar la operación.",
			icon: "error",
		});

		return false;
	}
};

export default deleteUsuario;
