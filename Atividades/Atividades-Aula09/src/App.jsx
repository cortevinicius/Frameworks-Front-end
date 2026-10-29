
import { useEffect, useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
} from 'react-router-dom'
import './App.css'

function Inicio() {
  const [usuarios, setUsuarios] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [mensagem, setMensagem] = useState('')

  useEffect(() => {
    async function buscarUsuarios() {
      try {
        const resposta = await fetch(
          'https://jsonplaceholder.typicode.com/users'
        )

        if (!resposta.ok) {
          throw new Error('Não foi possível carregar os usuários.')
        }

        const dados = await resposta.json()
        setUsuarios(dados)
      } catch (error) {
        setErro(error.message)
      } finally {
        setCarregando(false)
      }
    }

    buscarUsuarios()
  }, [])

  function cadastrarUsuario(event) {
    event.preventDefault()

    if (!nome.trim() || !email.trim()) {
      setMensagem('Preencha todos os campos.')
      return
    }

    const novoUsuario = {
      id: Date.now(),
      name: nome,
      email,
    }

    setUsuarios((listaAtual) => [...listaAtual, novoUsuario])
    setNome('')
    setEmail('')
    setMensagem('Usuário adicionado com sucesso!')
  }

  return (
    <main className="container">
      <h1>React Users</h1>
      <p>Projeto prático de React com gerenciamento de usuários.</p>

      <section className="card">
        <h2>Cadastrar usuário</h2>

        <form onSubmit={cadastrarUsuario}>
          <label htmlFor="nome">Nome</label>
          <input
            id="nome"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            placeholder="Digite o nome"
            required
          />

          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Digite o e-mail"
            required
          />

          <button type="submit">Cadastrar</button>
        </form>

        {mensagem && <p className="mensagem">{mensagem}</p>}
      </section>

      <section className="card">
        <h2>Lista de usuários</h2>

        {carregando && <p>Carregando usuários...</p>}
        {erro && <p className="erro">{erro}</p>}

        {!carregando && !erro && (
          <div className="lista">
            {usuarios.map((usuario) => (
              <article className="usuario" key={usuario.id}>
                <h3>{usuario.name}</h3>
                <p>{usuario.email}</p>
                <Link to={`/usuario/${usuario.id}`}>Ver detalhes</Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

function DetalhesUsuario() {
  const { id } = useParams()
  const [usuario, setUsuario] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  useEffect(() => {
    async function buscarUsuario() {
      try {
        const resposta = await fetch(
          `https://jsonplaceholder.typicode.com/users/${id}`
        )

        if (!resposta.ok) {
          throw new Error('Não foi possível encontrar o usuário.')
        }

        const dados = await resposta.json()
        setUsuario(dados)
      } catch (error) {
        setErro(error.message)
      } finally {
        setCarregando(false)
      }
    }

    buscarUsuario()
  }, [id])

  if (carregando) return <main className="container"><p>Carregando...</p></main>
  if (erro) return <main className="container"><p className="erro">{erro}</p><Link to="/">Voltar</Link></main>
  if (!usuario) return <main className="container"><p>Usuário não encontrado.</p><Link to="/">Voltar</Link></main>

  return (
    <main className="container">
      <section className="card">
        <h1>{usuario.name}</h1>
        <p><strong>E-mail:</strong> {usuario.email}</p>
        <p><strong>Telefone:</strong> {usuario.phone}</p>
        <p><strong>Empresa:</strong> {usuario.company?.name}</p>
        <Link to="/">← Voltar para a lista</Link>
      </section>
    </main>
  )
}

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar">
        <Link to="/">React Users</Link>
        <Link to="/">Início</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/usuario/:id" element={<DetalhesUsuario />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
