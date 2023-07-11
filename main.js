const baseUrl = 'https://649a1d4a79fbe9bcf8404b5a.mockapi.io/users/20201214010018/products';

const albumForm = document.getElementById('albumForm');
const albumList = document.getElementById('albumList');

// Função para renderizar os dados dos álbuns
function renderAlbum(album) {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${album.name}</td>
    <td>${album.price}</td>
    <td>
      <button onclick="editAlbum(${album.id})">Editar</button>
      <button onclick="deleteAlbum(${album.id})">Excluir</button>
    </td>
  `;
  albumList.appendChild(row);
}

// Função para exibir todos os álbuns existentes
function displayAlbums() {
  albumList.innerHTML = '';

  // Simulando uma chamada à API para obter os dados dos álbuns
  const albums = [
    { id: 1, name: 'Fearless', price: 29.99 },
    { id: 2, name: '1989', price: 24.99 },
    { id: 3, name: 'Red', price: 19.99 }
  ];

  albums.forEach((album) => {
    renderAlbum(album);
  });
}

// Função para adicionar um novo álbum
function addAlbum(name, price) {
  // Simulando uma chamada à API para adicionar o álbum
  const newAlbum = {
    id: Date.now(),
    name: name,
    price: price
  };

  // Adicionar o álbum à lista
  renderAlbum(newAlbum);
}

// Função para lidar com o envio do formulário
albumForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const albumName = document.getElementById('albumName').value;
  const albumPrice = document.getElementById('albumPrice').value;

  addAlbum(albumName, albumPrice);

  albumForm.reset();
});

// Função para editar um álbum
function editAlbum(albumId) {
  // Simulando uma chamada à API para editar o álbum
  console.log(`Editar álbum com o ID: ${albumId}`);
}

// Função para excluir um álbum
function deleteAlbum(albumId) {
  // Simulando uma chamada à API para excluir o álbum
  console.log(`Excluir álbum com o ID: ${albumId}`);
}

// Exibir os álbuns ao carregar a página
displayAlbums();
