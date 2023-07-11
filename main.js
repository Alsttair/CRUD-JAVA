const apiBaseUrl = 'https://649a1d4a79fbe9bcf8404b5a.mockapi.io/users/20201214010018/products';

async function createSale(albumId, quantity) {
  try {
    const response = await fetch(`${apiBaseUrl}/sales`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        albumId,
        quantity,
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao criar venda:', error);
    throw error;
  }
}

async function getSales() {
  try {
    const response = await fetch(`${apiBaseUrl}/sales`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao obter vendas:', error);
    throw error;
  }
}

async function updateSale(saleId, quantity) {
  try {
    const response = await fetch(`${apiBaseUrl}/sales/${saleId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        quantity,
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao atualizar venda:', error);
    throw error;
  }
}

async function deleteSale(saleId) {
  try {
    const response = await fetch(`${apiBaseUrl}/sales/${saleId}`, {
      method: 'DELETE',
    });

    if (response.status === 204) {
      console.log('Venda excluída com sucesso!');
    } else {
      throw new Error('Falha ao excluir venda');
    }
  } catch (error) {
    console.error('Erro ao excluir venda:', error);
    throw error;
  }
}

createSale(1, 3)
  .then((sale) => console.log('Venda criada:', sale))
  .catch((error) => console.error('Erro ao criar venda:', error));

getSales()
  .then((sales) => console.log('Vendas:', sales))
  .catch((error) => console.error('Erro ao obter vendas:', error));

updateSale(1, 5)
  .then((sale) => console.log('Venda atualizada:', sale))
  .catch((error) => console.error('Erro ao atualizar venda:', error));

deleteSale(1)
  .catch((error) => console.error('Erro ao excluir venda:', error));
