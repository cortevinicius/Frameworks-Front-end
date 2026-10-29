
import './App.css';

const conceitos = [
  {
    id: 1,
    titulo: 'JSX',
    categoria: 'Fundamentos',
    descricao: 'Permite escrever uma estrutura semelhante ao HTML dentro do JavaScript.',
    exemplo: '<h1>Olá, React!</h1>',
    destaque: true,
  },
  {
    id: 2,
    titulo: 'Componentes',
    categoria: 'Organização',
    descricao: 'Dividem a interface em partes independentes e reutilizáveis.',
    exemplo: '<ConceptCard />',
    destaque: true,
  },
  {
    id: 3,
    titulo: 'Props',
    categoria: 'Comunicação',
    descricao: 'Permitem passar informações de um componente pai para um componente filho.',
    exemplo: '<Card titulo="React" />',
    destaque: false,
  },
  {
    id: 4,
    titulo: 'Virtual DOM',
    categoria: 'Renderização',
    descricao: 'Representação da interface usada pelo React para identificar mudanças e atualizar o DOM.',
    exemplo: 'Atualização da interface',
    destaque: false,
  },
  {
    id: 5,
    titulo: 'Listas e Keys',
    categoria: 'Renderização',
    descricao: 'O método map() renderiza coleções e a propriedade key identifica cada item.',
    exemplo: 'itens.map(item => ...)',
    destaque: false,
  },
  {
    id: 6,
    titulo: 'Renderização condicional',
    categoria: 'Lógica',
    descricao: 'Permite exibir diferentes elementos de acordo com uma condição.',
    exemplo: '{ativo ? <p>Ativo</p> : null}',
    destaque: true,
  },
];

function ConceptCard({ conceito }) {
  return (
    <article className="concept-card">
      <div className="card-top">
        <span className="category">{conceito.categoria}</span>
        {conceito.destaque && <span className="highlight">Essencial</span>}
      </div>

      <h3>{conceito.titulo}</h3>
      <p>{conceito.descricao}</p>

      <div className="code-example">
        <span>Exemplo</span>
        <code>{conceito.exemplo}</code>
      </div>
    </article>
  );
}

function App() {
  return (
    <main className="app">
      <header className="topbar">
        <a className="brand" href="#inicio">
          <span className="brand-icon">R</span>
          React<span className="brand-light">Lab</span>
        </a>
        <span className="topbar-label">GUIA DE ESTUDOS</span>
      </header>

      <section className="hero" id="inicio">
        <span className="eyebrow">DESENVOLVIMENTO FRONT-END</span>
        <h1>Aprenda React.<br /><span>Um conceito por vez.</span></h1>
        <p>
          Um guia prático dos principais fundamentos do React,
          com explicações e pequenos exemplos para estudar.
        </p>
        <a className="primary-button" href="#conceitos">
          Explorar conceitos <span aria-hidden="true">↓</span>
        </a>
      </section>

      <section className="content-section" id="conceitos">
        <div className="section-heading">
          <div>
            <span className="eyebrow">SEU GUIA DE REFERÊNCIA</span>
            <h2>Fundamentos do React</h2>
          </div>
          <span className="count">{conceitos.length} conceitos</span>
        </div>

        <div className="concept-grid">
          {conceitos.map((conceito) => (
            <ConceptCard key={conceito.id} conceito={conceito} />
          ))}
        </div>
      </section>

      <footer className="footer">
        <span>ReactLab · Projeto de estudo</span>
        <span>Desenvolvido com React e Vite</span>
      </footer>
    </main>
  );
}

export default App;
