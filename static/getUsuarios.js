import { getApiUrl } from "./getApiUrl.js";

export const fetchUsuarios = async () => {
	try {
		let path = window.location.pathname.includes("/clients")
			? "clients"
			: "employees";
		const response = await fetch(`${getApiUrl()}/${path}`);
		const usuarios = await response.json();
		return usuarios;
	} catch (error) {
		console.error("Error al obtener usuarios:", error);
		return [];
	}
};

export default fetchUsuarios;
