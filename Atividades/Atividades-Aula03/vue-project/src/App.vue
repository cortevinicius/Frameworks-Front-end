<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const tamanho = 20
const velocidade = 150

const cobra = ref([
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 }
])

const comida = ref({ x: 15, y: 10 })

const direcao = ref({ x: 1, y: 0 })
const proximaDirecao = ref({ x: 1, y: 0 })

const pontos = ref(0)
const jogoRodando = ref(true)
const gameOver = ref(false)

let intervalo = null

function gerarComida() {
  let novaComida

  do {
    novaComida = {
      x: Math.floor(Math.random() * tamanho),
      y: Math.floor(Math.random() * tamanho)
    }
  } while (
    cobra.value.some(
      parte => parte.x === novaComida.x && parte.y === novaComida.y
    )
  )

  comida.value = novaComida
}

function mudarDirecao(x, y) {
  // Impede a cobra de virar diretamente para trás
  if (x === -direcao.value.x && y === -direcao.value.y) {
    return
  }

  proximaDirecao.value = { x, y }
}

function moverCobra() {
  if (!jogoRodando.value) return

  direcao.value = proximaDirecao.value

  const cabeca = cobra.value[0]

  const novaCabeca = {
    x: cabeca.x + direcao.value.x,
    y: cabeca.y + direcao.value.y
  }

  // Colisão com a parede
  if (
    novaCabeca.x < 0 ||
    novaCabeca.x >= tamanho ||
    novaCabeca.y < 0 ||
    novaCabeca.y >= tamanho
  ) {
    finalizarJogo()
    return
  }

  // Colisão com o próprio corpo
  if (
    cobra.value.some(
      parte => parte.x === novaCabeca.x && parte.y === novaCabeca.y
    )
  ) {
    finalizarJogo()
    return
  }

  cobra.value.unshift(novaCabeca)

  // Comeu a comida
  if (
    novaCabeca.x === comida.value.x &&
    novaCabeca.y === comida.value.y
  ) {
    pontos.value++
    gerarComida()
  } else {
    cobra.value.pop()
  }
}

function finalizarJogo() {
  jogoRodando.value = false
  gameOver.value = true
  clearInterval(intervalo)
}

function reiniciarJogo() {
  cobra.value = [
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 }
  ]

  comida.value = { x: 15, y: 10 }

  direcao.value = { x: 1, y: 0 }
  proximaDirecao.value = { x: 1, y: 0 }

  pontos.value = 0
  gameOver.value = false
  jogoRodando.value = true

  iniciarJogo()
}

function iniciarJogo() {
  clearInterval(intervalo)
  intervalo = setInterval(moverCobra, velocidade)
}

function controlarTeclado(event) {
  switch (event.key) {
    case 'ArrowUp':
      event.preventDefault()
      mudarDirecao(0, -1)
      break

    case 'ArrowDown':
      event.preventDefault()
      mudarDirecao(0, 1)
      break

    case 'ArrowLeft':
      event.preventDefault()
      mudarDirecao(-1, 0)
      break

    case 'ArrowRight':
      event.preventDefault()
      mudarDirecao(1, 0)
      break
  }
}

function classeCelula(x, y) {
  if (cobra.value.some(parte => parte.x === x && parte.y === y)) {
    return 'cobra'
  }

  if (comida.value.x === x && comida.value.y === y) {
    return 'comida'
  }

  return ''
}

onMounted(() => {
  document.addEventListener('keydown', controlarTeclado)
  iniciarJogo()
})

onUnmounted(() => {
  document.removeEventListener('keydown', controlarTeclado)
  clearInterval(intervalo)
})
</script>

<template>
  <main class="pagina">
    <div class="container">

      <header>
        <h1>🐍 Jogo da Cobrinha</h1>
        <p>Use as setas do teclado para controlar a cobra</p>
      </header>

      <div class="placar">
        <span>Pontos: <strong>{{ pontos }}</strong></span>
      </div>

      <div class="tabuleiro">
        <div
          v-for="y in tamanho"
          :key="y"
          class="linha"
        >
          <div
            v-for="x in tamanho"
            :key="x"
            class="celula"
            :class="classeCelula(x - 1, y - 1)"
          >
            <span
              v-if="
                cobra[0].x === x - 1 &&
                cobra[0].y === y - 1
              "
              class="cabeca"
            ></span>

            <span
              v-if="
                comida.x === x - 1 &&
                comida.y === y - 1
              "
              class="fruta"
            >
              🍎
            </span>
          </div>
        </div>
      </div>

      <div class="controles">
        <button @click="mudarDirecao(0, -1)">⬆️</button>

        <div>
          <button @click="mudarDirecao(-1, 0)">⬅️</button>
          <button @click="mudarDirecao(0, 1)">⬇️</button>
          <button @click="mudarDirecao(1, 0)">➡️</button>
        </div>
      </div>

      <div v-if="gameOver" class="game-over">
        <h2>Game Over!</h2>

        <p>
          Você fez <strong>{{ pontos }}</strong> ponto(s).
        </p>

        <button class="reiniciar" @click="reiniciarJogo">
          Jogar novamente
        </button>
      </div>

    </div>
  </main>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.pagina {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #111827;
  font-family: Arial, Helvetica, sans-serif;
  padding: 20px;
}

.container {
  width: 100%;
  max-width: 650px;
  text-align: center;
  color: white;
}

header h1 {
  margin: 0 0 8px;
  font-size: 32px;
}

header p {
  margin: 0 0 20px;
  color: #cbd5e1;
}

.placar {
  background: #1e293b;
  border-radius: 10px;
  padding: 12px;
  margin-bottom: 15px;
  font-size: 18px;
}

.placar strong {
  color: #4ade80;
}

.tabuleiro {
  width: min(90vw, 600px);
  aspect-ratio: 1;
  margin: 0 auto;
  padding: 4px;
  background: #334155;
  border: 4px solid #475569;
  border-radius: 10px;
  display: grid;
  grid-template-rows: repeat(20, 1fr);
}

.linha {
  display: grid;
  grid-template-columns: repeat(20, 1fr);
}

.celula {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.celula.cobra {
  background: #22c55e;
  border-radius: 3px;
  margin: 1px;
}

.celula.comida {
  font-size: clamp(12px, 2vw, 22px);
}

.cabeca {
  width: 65%;
  height: 65%;
  background: #16a34a;
  border-radius: 30%;
}

.fruta {
  display: flex;
  justify-content: center;
  align-items: center;
}

.controles {
  margin-top: 20px;
}

.controles button,
.reiniciar {
  border: none;
  border-radius: 8px;
  padding: 12px 18px;
  margin: 3px;
  background: #2563eb;
  color: white;
  font-size: 18px;
  cursor: pointer;
  transition: 0.2s;
}

.controles button:hover,
.reiniciar:hover {
  background: #1d4ed8;
  transform: scale(1.05);
}

.game-over {
  margin-top: 20px;
  padding: 20px;
  background: #7f1d1d;
  border-radius: 12px;
}

.game-over h2 {
  margin-top: 0;
}

.reiniciar {
  background: #16a34a;
}

.reiniciar:hover {
  background: #15803d;
}
</style>