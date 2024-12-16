const endpoint = window.location.pathname.includes("clients")
	? "/employees/list"
	: "/clients/list";

fetch(endpoint)
	.then((response) => response.json())
	.then((data) => {
		const tbody = document.querySelector("#usersTable tbody");
		data.forEach((usuario) => {
			const row = document.createElement("tr");
			row.innerHTML = `
          <td>${usuario.id}</td>
          <td>${usuario.nombre}</td>
          <td>${usuario.correo}</td>
          <td>${usuario.dni}</td>
          <td>
            <a href="/users/update/${usuario.id}" class="btn">Editar</a>
            <button class="btn red" onclick="deleteUser(${usuario.id})">Eliminar</button>
          </td>
        `;
			tbody.appendChild(row);
		});
	});

function deleteUser(id) {
	fetch(`/users/${id}`, { method: "DELETE" })
		.then(() => location.reload())
		.catch((err) => console.error(err));
}
