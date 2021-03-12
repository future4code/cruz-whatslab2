import './App.css';
import React from 'react'
import styled from 'styled-components'

const container = styled.div`
`

class App extends React.Component {

  state = {
    mensagens: [{pessoa: "Marcelo", conteudo: "Olá"}, 
    {pessoa:"Renata", conteudo: "Cheguei"}],
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
      <div>
        <section>
        {mensagens}
        </section>
        <section>
          <input type="text" placeholder="Usuário" onChange={this.atualizarUsuario} value={this.state.inputUsuario}/>
          <input type="text" placeholder="Mensagem" onChange={this.atualizarMensagem} value={this.state.inputMensagem}/>
          <button onClick={this.criarMensagem}>Enviar</button>
        </section>

      </div>

    );
  }
}

export default App;
