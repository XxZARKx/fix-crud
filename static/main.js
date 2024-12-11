import { fetchUsuarios } from "./getUsuarios.js";
import { deleteUsuario } from "./deleteUsuario.js";

const path = window.location.pathname;
console.log("🚀 ~ path:", path);
if (path.includes(`/empleados`)) {
  let navList = document.querySelector("#headerRegister nav ul");
  const listEmpleados = document.createElement("li");
  const registerEmpleados = document.createElement("li");
  listEmpleados.innerHTML = `<a href="/empleados/list">Lista de Empleados</a>`;
  registerEmpleados.innerHTML = `<a href="/empleados/register">Registrar Empleado</a>`;
  navList.appendChild(listEmpleados);
  navList.appendChild(registerEmpleados);
} else if (path.includes(`/clientes`)) {
  let navList = document.querySelector("#headerRegister nav ul");
  const listClientes = document.createElement("li");
  const registerClientes = document.createElement("li");
  listClientes.innerHTML = `<a href="/clientes/list">Lista de Clientes</a>`;
  registerClientes.innerHTML = `<a href="/clientes/register">Registrar Clientes</a>`;
  navList.appendChild(listClientes);
  navList.appendChild(registerClientes);
}

export const cargarTablaUsuarios = async () => {
  const usuarios = await fetchUsuarios();
  const tableBody = document.querySelector("#usersTable tbody");

  tableBody.innerHTML = "";

  usuarios.sort((a, b) => a.id - b.id);

  usuarios.forEach((usuario) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${usuario.id}</td>
      <td>${usuario.nombre}</td>
      <td>${usuario.correo}</td>
      <td>${usuario.dni}</td>
      <td>
	    <button onclick="editUser(${usuario.id})">Actualizar</button>
        <button onclick="eliminarUsuario(${usuario.id})">Eliminar</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
};

window.editUser = (id) => {
  window.location.href = `/usuarios/update/?id=${id}`;
};

window.eliminarUsuario = async (id) => {
  const exito = await deleteUsuario(id); // Llamar directamente a la lógica de eliminación.
  if (exito) {
    cargarTablaUsuarios(); // Recargar la tabla después de una eliminación exitosa.
  }
};

// Carga la tabla de usuarios en la página
cargarTablaUsuarios();

export default cargarTablaUsuarios;
