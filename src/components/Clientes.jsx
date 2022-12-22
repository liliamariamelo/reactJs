import React, { useEffect, useState } from 'react';
import {
  Container,
  Button,
  Form,
  Table,
  Modal
} from 'react-bootstrap';


const Clientes = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [nascimento, setNascimento] = useState('');
  const [cep, setCep] = useState('');
  const [cadastrar, setCadastrar] = useState('');
  const [pesquisar, setPesquisar] = useState('');
  const [clientes, setClientes] = useState([]);
  const [show, setShow] = useState(false);
  
  const URL = 'http://localhost:3001';
  const handlePesquisar = (event) => {
    const search = event.target.value;
    setPesquisar(search);
    console.log(search);

    if (search !== '') {
      const filterdata = clientes.filter((item) => {
        return Object.values(item).join('').includes(search);
      });
      setCadastrar(filterdata);
      console.log(filterdata);
    } else {
      setCadastrar(clientes);
      console.log(clientes);
    }
  };

  useEffect(() => {
    const getcountry = async () => {
      const getres = await fetch(URL + '/clientes');
      const setcountry = await getres.json();
      setClientes(await setcountry);
    };
    getcountry();
  }, []);

  const handleReset = () => {
    Array.from(document.querySelectorAll('input')).forEach(
      (input) => (input.value = ''),
    );
    this.setState({
      itemvalues: [{}],
    });
  };


  const handleShow = () => setShow(!show);

  const handleClickAdicionar = (event) => {
    setShow(true);
    
  };
  const handleCadastrar = (e) => {
    e.preventDefault();
    const emp = {nome, email, nascimento, cep };
    // método POST
    fetch(URL + '/clientes', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(emp),
    })
      .then((data) => {
        console.log(data.message);
      })
      .then((response) => {
        window.location.reload();
        window.alert('Cliente cadastrado com sucesso!');
      })
      .catch((error) => {
        window.alert('Erro ao cadastrar o novo cliente.');
        console.log(error.message);
      });
  };

  console.log(cadastrar);

  return (
    <div >
      <Container>
        <h1 className="text-center"  style={{padding:'30px'}}>Clientes cadastrados na cafeteria</h1>
        <div className="d-flex justify-content-center" >
          <Form >
            <Form.Group className="mb-2 d-flex justify-content-between align-items-center" controlId="formGroupEmail" >
              <Form.Label className="mx-1  d-flex justify-content-between align-items-center"
              >Nome</Form.Label>
              <img alt="Buscar"
                      src="https://cdn-icons-png.flaticon.com/512/8339/8339939.png"
                      height="30"
                      width="30"
                      className="d-inline-block align-top"/> 
              <Form.Control
                className="mb-10 mx-2"
                
                placeholder='Digite o nome para buscar'
                onChange={(e) => {
                  handlePesquisar(e);
                }}
                style={{width: '750px'}}
              />
                  <Button style={{backgroundColor: '#FFF0F5', color: 'black'}}
                  className="mx-3 mb-1"
                  onClick={handleClickAdicionar}>
                    Cadastrar +
                  </Button>
            </Form.Group>
          </Form>
        </div>

        <Table striped bordered hover>
        <thead>
            <tr>
              <th>Id</th>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Nascimento</th>
              <th>CEP</th>
            </tr>
          </thead>
          <tbody>
            {pesquisar.length > 0
              ? cadastrar.map((cliente, index) =>(
                <tr key={index}>
                    <td>{cliente.id}</td>
                    <td>{cliente.nome}</td>
                    <td>{cliente.email}</td>
                    <td>{cliente.nascimento}</td>
                    <td>{cliente.cep}</td>
                  </tr>
              ))
            : clientes.map((cliente, index) => (
                  <tr key={index}>
                    <td>{cliente.id}</td>
                    <td>{cliente.nome}</td>
                    <td>{cliente.email}</td>
                    <td>{cliente.nascimento}</td>
                    <td>{cliente.cep}</td>
                  </tr>
                ))}
          </tbody>
        </Table>
        <Modal show={show} onHide={handleShow}>
        <Form>
          <Modal.Header closeButton>
          <img
          alt="Cadastro"
          src="https://cdn-icons-png.flaticon.com/512/2080/2080887.png"
          width="30"
          height="30px"
          className="d-inline-block align-top"
        />
            <Modal.Title>Cadastro de Clientes</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form onSubmit={handleCadastrar}>
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                name="nome"
                controlid="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                type="email"
                name="email"
                controlid="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nascimento</Form.Label>
              <Form.Control
                type="date"
                name="nascimento"
                controlid="nascimento"
                value={nascimento}
                onChange={(e) => setNascimento(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>CEP</Form.Label>
              <Form.Control
                type="cep"
                name="cep"
                controlid="cep"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
              />
              
            </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleReset} style={{backgroundColor:'red'}}>
              Limpar
              <img alt="Limpar"
                src="https://cdn-icons-png.flaticon.com/512/419/419660.png"
                height="30"
                className="d-inline-block align-top"/>
            </Button>
            <Button variant="primary" onClick={handleCadastrar}>
              Cadastrar
              <img alt="Salvar"
                src="https://cdn-icons-png.flaticon.com/512/4081/4081000.png"
                height="30"
                className="d-inline-block align-top"/>
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      </Container>
    </div>
  );
};

export default Clientes;
