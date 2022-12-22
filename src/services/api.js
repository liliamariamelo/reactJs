const readAll = async () => {
    const response = await fetch('http://localhost:3001/clientes');
  
    return await response.json();
  };
  
  async function create(cliente) {
    let response = await fetch('http://localhost:3001/clientes', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(cliente),
    });
  
    return await response.json();
  }
  
  const api = {
    readAll,
    create,
  };
  
  export default api;