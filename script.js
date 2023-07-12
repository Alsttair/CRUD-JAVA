// Função para buscar os produtos da API
function getProducts() {
  fetch("https://649a1d4a79fbe9bcf8404b5a.mockapi.io/users/20201214010018/products")
    .then(response => response.json())
    .then(data => {
      const albumList = document.getElementById("album-list");
      albumList.innerHTML = "";

      data.forEach(album => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<strong>ID:</strong> ${album.id}, <strong>Título:</strong> ${album.title}, <strong>Preço:</strong> ${album.price}`;
        albumList.appendChild(listItem);
      });
    })
    .catch(error => {
      console.error("Erro ao buscar os produtos:", error);
    });
}

// Função para adicionar um novo álbum
function addAlbum(event) {
  event.preventDefault();

  const albumTitleInput = document.getElementById("album-title");
  const albumPriceInput = document.getElementById("album-price");

  const album = {
    title: albumTitleInput.value,
    price: parseFloat(albumPriceInput.value)
  };

  fetch("https://649a1d4a79fbe9bcf8404b5a.mockapi.io/users/20201214010018/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(album)
  })
    .then(response => response.json())
    .then(data => {
      console.log("Álbum adicionado com sucesso:", data);
      albumTitleInput.value = "";
      albumPriceInput.value = "";
      getProducts();
    })
    .catch(error => {
      console.error("Erro ao adicionar o álbum:", error);
    });
}

// Função para atualizar um álbum
function updateAlbum(event) {
  event.preventDefault();

  const albumIdInput = document.getElementById("update-album-id");
  const albumTitleInput = document.getElementById("update-album-title");
  const albumPriceInput = document.getElementById("update-album-price");

  const album = {
    title: albumTitleInput.value,
    price: parseFloat(albumPriceInput.value)
  };

  fetch(`https://649a1d4a79fbe9bcf8404b5a.mockapi.io/users/20201214010018/products/${albumIdInput.value}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(album)
  })
    .then(response => response.json())
    .then(data => {
      console.log("Álbum atualizado com sucesso:", data);
      albumIdInput.value = "";
      albumTitleInput.value = "";
      albumPriceInput.value = "";
      getProducts();
    })
    .catch(error => {
      console.error("Erro ao atualizar o álbum:", error);
    });
}

// Função para excluir um álbum
function deleteAlbum(event) {
  event.preventDefault();

  const albumIdInput = document.getElementById("delete-album-id");

  fetch(`https://649a1d4a79fbe9bcf8404b5a.mockapi.io/users/20201214010018/products/${albumIdInput.value}`, {
    method: "DELETE"
  })
    .then(response => {
      if (response.ok) {
        console.log("Álbum excluído com sucesso");
        albumIdInput.value = "";
        getProducts();
      } else {
        throw new Error("Erro ao excluir o álbum");
      }
    })
    .catch(error => {
      console.error(error);
    });
}

// Event Listeners
document.getElementById("add-album-form").addEventListener("submit", addAlbum);
document.getElementById("update-album-form").addEventListener("submit", updateAlbum);
document.getElementById("delete-album-form").addEventListener("submit", deleteAlbum);

// Carregar produtos ao carregar a página
window.addEventListener("load", getProducts);
