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

function getUserIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

async function fetchUser(id) {
  const apiUrl = getApiUrl();
  const response = await fetch(`${apiUrl}/usuarios/${id}`);
  const user = await response.json();

  document.getElementById("userId").value = user.id;
  document.getElementById("nombre").value = user.nombre;
  document.getElementById("correo").value = user.correo;
  document.getElementById("contraseña").value = user.contraseña;
}

async function updateUser(event) {
  event.preventDefault();

  const id = document.getElementById("userId").value;
  const userData = {
    nombre: document.getElementById("nombre").value,
    correo: document.getElementById("correo").value,
    contraseña: document.getElementById("contraseña").value || undefined,
  };

  const apiUrl = getApiUrl();
  const response = await fetch(`${apiUrl}/usuarios/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (response.ok) {
    Swal.fire("Éxito", "Usuario actualizado correctamente", "success");
    window.location.href = "/usuarios/list";
  } else {
    Swal.fire("Error", "No se pudo actualizar el usuario", "error");
  }
}

document
  .getElementById("updateUserForm")
  .addEventListener("submit", updateUser);
fetchUser(getUserIdFromURL());
