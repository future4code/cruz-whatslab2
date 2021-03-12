import './App.css';
import React from 'react'
import styled from 'styled-components'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
`

const Container = styled.div`
  width: 80%;
  height: 80vh;
  margin: 20px auto;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: stretch;

  border: 2px solid #333;

`

const ListaMensagem = styled.div`
  flex-basis: 90%;

  strong {
    
  }

  span {
    
  }

`

const CriarMensagem = styled.div`
  flex-basis: 10%;
  height: 10%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  

  > * {
    height: 93%;
    font-size: 20px;
  }

  input {
    margin: 0;
    padding: 0;
    
  }

  input::placeholder {
    text-align: center;
  }

  input:first-of-type {

    
  }

  input:last-of-type {
    flex-grow: 1;
    
  }

  button {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100px;

  }

`

class App extends React.Component {

  state = {
    mensagens: [],
    inputUsuario: "",
    inputMensagem: ""
  }
  
  atualizarUsuario = event => {
    this.setState({inputUsuario: event.target.value})

  }
  
  atualizarMensagem = event => {
    this.setState({inputMensagem: event.target.value})
  }

  criarMensagem = () => {
    let novaLista = [...this.state.mensagens]
    novaLista.push({pessoa: this.state.inputUsuario, conteudo: this.state.inputMensagem})
    this.setState({mensagens: novaLista, inputUsuario: "", inputMensagem: ""})
  }
  
    render() {
      
      let mensagens = this.state.mensagens.map((mensagem) => {
        
          return <p><strong>{mensagem.pessoa + ":"}</strong><span>{mensagem.conteudo}</span></p>
      })

      return (
      <Container>
        <GlobalStyle/>
        <ListaMensagem>
        {mensagens}
        </ListaMensagem>
        <CriarMensagem>
          <input type="text" placeholder="Usuário" onChange={this.atualizarUsuario} value={this.state.inputUsuario}/>
          <input type="text" placeholder="Mensagem" onChange={this.atualizarMensagem} value={this.state.inputMensagem}/>
          <button onClick={this.criarMensagem}>Enviar</button>
        </CriarMensagem>
        

      </Container>

    );
  }
}

export default App;
