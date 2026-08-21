export default function App() {
  return (
    <div style={{
      margin: 0,
      height: '100vh',
      background: '#111827',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      color: 'white',
      fontFamily: 'Arial'
    }}>

      <h1>🐍 Jogo da Cobrinha</h1>

      <p>Seu jogo está online no GitHub Pages! 🎮</p>

      <div style={{
        width: 300,
        height: 300,
        background: '#000',
        border: '4px solid #22c55e',
        borderRadius: 12,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 60
      }}>
        🐍
      </div>

    </div>
  );
}