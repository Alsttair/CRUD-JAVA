document.addEventListener("DOMContentLoaded", function() {
  const albumList = document.getElementById("album-list");
  const addAlbumForm = document.getElementById("add-album-form");

  // Função para buscar a lista de álbuns
  function fetchAlbums() {
    fetch("https://649a1d4a79fbe9bcf8404b5a.mockapi.io/users/20201214010018/products")
      .then(response => response.json())
      .then(albums => {
        albumList.innerHTML = "";

        albums.forEach(album => {
          const li = document.createElement("li");
          li.innerHTML = `
            <span>${album.name} - $${album.price}</span>
            <button onclick="editAlbum(${album.id})">Editar</button>
            <button onclick="deleteAlbum(${album.id})">Excluir</button>
          `;
          albumList.appendChild(li);
        });
      })
      .catch(error => console.log(error));
  }

  // Função para adicionar um álbum
  function addAlbum(name, price) {
    fetch("https://649a1d4a79fbe9bcf8404b5a.mockapi.io/users/20201214010018/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: name, price: price })
    })
      .then(response => response.json())
      .then(() => {
        fetchAlbums();
        addAlbumForm.reset();
      })
      .catch(error => console.log(error));
  }

  // Função para editar um álbum
  function editAlbum(albumId) {
    const newName = prompt("Digite o novo nome do álbum:");
    const newPrice = prompt("Digite o novo preço do álbum:");

    fetch(`https://649a1d4a79fbe9bcf8404b5a.mockapi.io/users/20201214010018/products/${albumId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: newName, price: newPrice })
    })
      .then(response => response.json())
      .then(() => fetchAlbums())
      .catch(error => console.log(error));
  }

  // Função para excluir um álbum
  function deleteAlbum(albumId) {
    if (confirm("Tem certeza de que deseja excluir este álbum?")) {
      fetch(`https://649a1d4a79fbe9bcf8404b5a.mockapi.io/users/20201214010018/products/${albumId}`, {
        method: "DELETE"
      })
        .then(() => fetchAlbums())
        .catch(error => console.log(error));
    }
  }

  // Evento de envio do formulário para adicionar um álbum
  addAlbumForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const albumName = document.getElementById("album-name").value;
    const albumPrice = document.getElementById("album-price").value;
    addAlbum(albumName, albumPrice);
  });

  // Buscar a lista de álbuns ao carregar a página
  fetchAlbums();
});
