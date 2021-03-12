import './App.css';
import React from 'react'
import styled, { css } from 'styled-components'
import { createGlobalStyle } from 'styled-components'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import DoneIcon from '@material-ui/icons/Done';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import SendIcon from '@material-ui/icons/Send';
import TextField from '@material-ui/core/TextField'
import useSound from 'use-sound'


const GlobalStyle = createGlobalStyle`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
`

const TopMenu = styled(AppBar)`
  width: 100%;
  position: relative;
  text-align: center;
  

  h1 {
    text-align: center;
    font-size: 2rem;
  }
`

const TopBar = styled(Toolbar)` 
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
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

const InputText = styled(TextField)` 
  height: 100%;
`

const ListaMensagem = styled.div`
  height: 90%;
  overflow-y: scroll;

  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-end;
  padding: 20px 40px;
  font-size: 1.5rem;
  background-color: rgb(201, 201, 201);
`

const ContainerMensagem = styled.span`

  align-self: flex-start;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  background-color: white;
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0px;
  flex-basis: auto;
  word-wrap: break-word;

  strong {
    
  }

  span {
    
  }

  /* Se for mensagem da pessoa EU */ 
  ${props => props.eu && css` 
    align-self: flex-end;
    justify-content: flex-end;
    background-color: #07bc4c;
    background-color: #e4ecf2;

  > strong {
    display: none;
  }
  `}


`

const CriarMensagem = styled.div`
  height: 10%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  

  > * {
    font-size: 20px;
    padding: 0;
    margin: 0;
  }

  input {
    margin: 0;
    padding: 0;
    height: 50px;
  }

  input::placeholder {
    text-align: center;
  }

  input:first-of-type {
    flex-grow: 1;
    
  }

  input:last-of-type {
    flex-grow: 2;
    
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
    if (this.state.inputUsuario === "" || this.state.inputMensagem === "") {
      alert("Para criar uma mensagem você deve inserir:\nUsuário e texto válidos")
    }
    else {
      let novaLista = [...this.state.mensagens]

      const hora = new Date()
      novaLista.push({
        pessoa: this.state.inputUsuario, 
        conteudo: this.state.inputMensagem,
        hora: hora.toLocaleTimeString(
          'pt-BR', {hour: '2-digit', minute: '2-digit'
        })

      })
      this.setState({
        mensagens: novaLista,
        inputUsuario: "",
        inputMensagem: ""
      })
    }
  }
  
  enviarMensagemComEnter = (event) => {
    if(event.key === 'Enter') {
      this.criarMensagem()
    }
    
  }
  
  apagarMensagem = (index) => {
    const deletar = window.confirm('Tem certeza que deseja deletar essa mensagem?')
    if (deletar) {
      let novaLista = [...this.state.mensagens]
      novaLista.splice(index, 1)
      this.setState({mensagens: novaLista})
    }
    
  }
  
    render() {

      let mensagens = this.state.mensagens.map((mensagem, index) => {
        let tipo = mensagem.pessoa.toLowerCase() === 'eu' ? true : false

        return (<ContainerMensagem
        eu={tipo}
        onDoubleClick={() => this.apagarMensagem(index)} 
        key={index}>
        <strong>{mensagem.pessoa}</strong>
        <span>{mensagem.conteudo}</span>
        <span>{mensagem.hora}</span>
        </ContainerMensagem>)
      })

      return (
      
      <Container>
        <GlobalStyle/>

        <TopMenu position="relative" color="primary">
          <TopBar>
            <Typography variant="h1">
              WhatsLab
            </Typography>
          </TopBar>
        </TopMenu>

        <ListaMensagem>
          {mensagens}
        </ListaMensagem>
        <CriarMensagem>
          <TextField
          label="Usuário"
          onChange={this.atualizarUsuario}
          onKeyDown={this.enviarMensagemComEnter}
          value={this.state.inputUsuario}/>
          <TextField label="Mensagem"
          onChange={this.atualizarMensagem}
          onKeyDown={this.enviarMensagemComEnter}
          value={this.state.inputMensagem}/>
        
        <Button variant="contained" color="primary"
        onClick={this.criarMensagem}>
        <SendIcon></SendIcon>
        </Button>
        </CriarMensagem>
      </Container>

    );
  }
}

export default App;
