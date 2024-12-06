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

async function fetchUsers() {
  try {
    const response = await fetch(`${getApiUrl()}/usuarios/`);
    const users = await response.json();
    const tableBody = document.querySelector("#usersTable tbody");

    tableBody.innerHTML = "";

    users.forEach((user) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.nombre}</td>
        <td>${user.correo}</td>
        <td>${user.dni}</td>
        <td>
          <button onclick="editUser(${user.id})">Actualizar</button>
          <button onclick="deleteUser(${user.id})">Eliminar</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
  }
}

window.editUser = (id) => {
  window.location.href = `/usuarios/update/?id=${id}`;
};

window.deleteUser = async (id) => {
  try {
    const response = await fetch(`${getApiUrl()}/usuarios/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      Swal.fire("Eliminado", "Usuario eliminado", "success");
      fetchUsers();
    }
  } catch (error) {
    Swal.fire("Error", "No se pudo eliminar el usuario", "error");
  }
};

fetchUsers();
