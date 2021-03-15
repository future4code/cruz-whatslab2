import React from 'react'
import styled, { css, createGlobalStyle } from 'styled-components'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import DoneIcon from '@material-ui/icons/Done';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import SendIcon from '@material-ui/icons/Send';
import TextField from '@material-ui/core/TextField'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';


function* idGenerator(){
  let i = 1;
  while (i < 1000) yield i++
}

const id = idGenerator()

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    list-style: none;
  }

  body {
    background: #333;
  }
`

const SetaParaCima = styled(ArrowDropDownCircleIcon)`
  position: absolute;
  top: 75px;
  right: 15px;
  cursor: pointer;
  z-index: 2;
  transform: rotate(180deg);

  && {
    font-size: 3.5rem;
    transition: all 3s;
  }
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
  max-width: 500px;
  min-width: 350px;
  height: 95vh;
  min-height: 500px;
  margin: 2vh auto;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: stretch;
  position: relative;

  border: 2px solid #333;

`

const InputText = styled(TextField)` 
  height: 100%;
  background: white;
`

const ListaMensagem = styled.div`
  height: 90%;
  min-height: 500px;
  overflow-y: scroll;
  position: relative;
  padding: 20px 40px;
  font-size: 1.5rem;
  background-color: rgb(201, 201, 201);
`
const Wraper = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  height: auto;
  border: 1px solid #333;
`

const ContainerMensagem = styled.span`

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: white;
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0px;
  /* flex-basis: auto;  */
  flex-grow: 1;
  word-wrap: break-word;
  max-width: 80%;
  height: auto;
  /* min-height: auto; */
  /* min-height: 0px; */
  position: relative;
  z-index: 1;

  :before {
    content: '';
    border: 30px transparent solid;
    border-top: 30px solid white;
    position: absolute;
    top: 0;
    ${props => props.eu ? 'right' : 'left'}:-15px;
    ${props => props.eu && 'border-top-color: #e4ecf2;'}
    z-index: -1;
  }

  /* Se for mensagem da pessoa EU */ 
  ${props => props.eu && css` 
    margin-left: auto;
    justify-content: flex-end;
    background-color: #e4ecf2;

    > strong { display: none; }
  `}

  div {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 1rem;
  }
  div :last-child {
    color: tomato;
  }

  img {
    width: 280px;
    height: 250px;
    margin: 0 auto;
  }

`

const Midia = styled.span`
    ${props => props.link && ''}
    ${props => props.foto && 'margin: 10px auto;'}
    ${props => props.video && css`
      width: 100%;
      
      iframe {
        width: 100%;
      }
    `}

  img, iframe {
    width: 100%;
    height: 300px;
  }

`

const IconeEnviado = styled(DoneIcon)`
  color: aqua;

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

  div {
    margin: 0;
    padding: 0;
    height: 100%;
    padding: 1%;
    box-sizing: border-box;

    input {
      height: 100%;
      font-size: 1.5rem;
    }
  }

  input::placeholder,
  label {
    width: 100%;
    text-align: center;
    font-size: 1.2rem;
  }

  > div:first-of-type {
    flex-basis: 30%;
  }

  > div:last-of-type {
    flex-grow: 2;
  }

  button {
    margin: 0;
    padding: 0;
    height: 100%;
    flex-basis: 15%;
  }

`

class App extends React.Component {

  state = {
    mensagens: [],
    inputUsuario: "",
    inputMensagem: "",
    habilitarRolarParaCima: 'nada',
    habilitarRolarParaBaixo: false
  }
  
  atualizarUsuario = e => this.setState({inputUsuario: e.target.value})
  
  atualizarMensagem = e => this.setState({inputMensagem: e.target.value})

  criarMensagem = () => {
    if (this.state.inputUsuario === "" || this.state.inputMensagem === "") {
      alert(
        "Para criar uma mensagem você deve inserir:\nUsuário e texto válidos"
      )
      return
    }
    
    const hora = new Date()
    const formato = {hour: '2-digit', minute: '2-digit'}
    let novaLista = [
      ...this.state.mensagens,
      {
        id: id.next().value,
        pessoa: this.state.inputUsuario, 
        conteudo: this.state.inputMensagem,
        hora: hora.toLocaleTimeString( 'pt-BR', formato)
      }
    ]

    this.setState({
      mensagens: novaLista,
      inputUsuario: "",
      inputMensagem: ""
    }, () => this.rolarLista())
    
    //removendo as mensagens automaticas que nao tem ID
    const listaLimpa = novaLista.filter(msg => msg.id < 1000 )
    
    localStorage.setItem('mensagens', JSON.stringify(listaLimpa))
  }
  
  
  enviarMensagemComEnter = ({key}) => key === 'Enter' && this.criarMensagem()
  
  apagarMensagem = (index) => {
    const deletar = window.confirm(
      'Tem certeza que deseja deletar essa mensagem?'
    )
    if (deletar) {
      let novaLista = [...this.state.mensagens]
      novaLista.splice(index, 1)
      this.setState({mensagens: novaLista})
      
      localStorage.setItem('mensagens', JSON.stringify(novaLista))
    }
  }
  
  novaMensagem = msg =>
    this.setState({mensagens: [...this.state.mensagens, msg]}, () => 
    this.rolarLista())
  
  rolarLista(direcao) {
    const lista = document.querySelector('.lista')
    const altura = direcao === 'cima' ? 0 : lista.scrollHeight
    lista.scrollTo({ top: altura, behavior: 'smooth'})
  }
  
  gerarHoraFormatada = () => {
    const hora = new Date()
    const formato = {hour: '2-digit', minute: '2-digit'}
    return hora.toLocaleTimeString('pt-BR', formato)
  }
  
  componentWillUnmount(event){
  }
  
  
  componentDidMount() {
    const mensagens = localStorage.getItem('mensagens')
    localStorage.clear()
    mensagens && this.setState({mensagens: JSON.parse(mensagens)})

    setTimeout(() => this.novaMensagem({
      pessoa: 'Tia',
      conteudo: 'Delicia esta receitinha',
      link: (<a href='https://www.tudogostoso.com.br/receita/177071-hamburguer-vegetariano-de-lentilha.html'>https://www.tudogostoso.com.br/receita/177071-hamburguer-vegetariano-de-lentilha.html</a>),
      hora: this.gerarHoraFormatada()
    }), 5000)

    setTimeout(() => this.novaMensagem({
      pessoa: 'eu',
      conteudo: 'Nova estrategia para codar',
      foto: (<img src="https://miro.medium.com/max/396/1*anhgwPSlWe9C2P1aFTL85Q.jpeg" alt='meme' />),
      hora: this.gerarHoraFormatada(),
    }), 10000)

    setTimeout(() => this.novaMensagem({
      pessoa: 'Dono do Whatslab', 
      conteudo: 'E aew, como está o desenvolvimento do App?',
      hora: this.gerarHoraFormatada()
      }), 20000
    )
    
    setTimeout(() => this.novaMensagem({
      pessoa: 'Coleguinha',
      conteudo: `Bora escurar uma musiquinha?`,
      video: (<iframe title="youtube" width="320" height="250" src="https://www.youtube.com/embed/NCtzkaL2t_Y" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>),
      hora: this.gerarHoraFormatada()
      }), 15000
    )
    
    const lista = document.querySelector('.lista')
    lista.onScroll = this.rolarParaCimaSePrecisar
  }
  
  componentDidUpdate(){
    this.rolarParaCimaSePrecisar()
  }
  
  verificarRolagem = e => {
    const lista = document.querySelector('.lista')
    
    if (lista.scrollTop < lista.clientHeight) {
      console.log(lista.scrollTop)
      this.setState({ habilitarRolarParaCima: false})
    } else {
      console.log(`Passou do ponto`)
      this.setState({ habilitarRolarParaCima: true})
    }
  }
  
  rolarParaCimaSePrecisar(){
    const lista = document.querySelector('.lista')
    //const cima = this.state.habilitarRolarParaCima

    //console.log(cima)
    //console.log(lista.scrollTop)
    
    // if (!lista.scrollTop && cima && cima !== 'nada') {
    //   this.setState({habilitarRolarParaCima: false})
    //   console.log('voltou top')
    // }
    
    // if (lista.clientHeight < lista.scrollHeight &&
    //   lista.scrollTop &&
    //   (!this.state.habilitarRolarParaCima ||
    //     this.state.habilitarRolarParaCima === 'nada')) {
    //     this.setState({habilitarRolarParaCima: true})
    //     console.log('foi pra baixo')
    //   }
    
    //console.log(this.state.habilitarRolarParaCima)

  }
  
  verificarDirecao(dir){
    const seta = document.querySelector('.seta')
    const lista = document.querySelector('.lista')

    if (dir) {
      console.log('vamu pra cima: ' + dir)
      this.rolarLista('cima')
      seta.style.transform = 'rotate(0deg)'
      seta.style.marginTop = lista.clientHeight - 80 + 'px'
      setTimeout(this.setState({habilitarRolarParaCima: false}), 500)
      
    } else {
      console.log('vamu pra baixo: ' + dir)
      this.rolarLista()
      seta.style.transform = 'rotate(180deg)'
      seta.style.marginTop = '0'
      setTimeout(this.setState({habilitarRolarParaCima: true}), 500)
    }

  }
  
  render() {
    const rolar = this.state.habilitarRolarParaCima
    let rolarParaCima = rolar !== 'nada' && <SetaParaCima
    className='seta' onClick={() => this.verificarDirecao(rolar)} />
      
    let audio = <audio src='./sounds/TelegramMessage.mp3' autoplay loop></audio>

    let mensagens = this.state.mensagens.map((mensagem, index) => 
      <ContainerMensagem 
        eu={mensagem.pessoa.toLowerCase() === 'eu' && true}
        onDoubleClick={() => this.apagarMensagem(index)} 
        key={index}>
        <strong>{mensagem.pessoa}</strong>
        <span>{mensagem.conteudo}</span>
        {mensagem.link && <Midia link>{mensagem.link}</Midia>}
        {mensagem.foto && <Midia foto>{mensagem.foto}</Midia>}
        {mensagem.video && <Midia video>{mensagem.video}</Midia>}
        <div>
          <span hora>{mensagem.hora}</span>
          <IconeEnviado />
        </div>

      </ContainerMensagem>
    )
    
  


    return (
    
    <Container>
      <GlobalStyle/>
      {audio}
      {rolarParaCima}
      <TopMenu position="relative" color="primary">
        <TopBar>
          <Typography variant="h1">
            WhatsLab
          </Typography>
        </TopBar>
      </TopMenu>

      <ListaMensagem className='lista'
      onScroll={this.rolarParaCimaSePrecisar}>
        {mensagens}
      </ListaMensagem>

      <CriarMensagem>
        <InputText
        label="Usuário"
        onChange={this.atualizarUsuario}
        onKeyDown={this.enviarMensagemComEnter}
        value={this.state.inputUsuario}/>

        <InputText label="Mensagem"
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