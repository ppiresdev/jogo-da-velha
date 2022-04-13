const listaCasas = document.querySelectorAll(".casa");
const jogadaAtual = document.querySelector(".tabuleiro");

//Parágrafo com o resultado do jogo
const mensagemFinal = document.querySelector(".msg-vencedor-text");
//Div com o resultado do jogo
const divMsgFinal = document.querySelector(".msg-vencedor");
//Pega o botão para reiniciar o jogo
const botao = document.querySelector(".btn-novoJogo");
//Preencher vetorTabuleito com quaqluer valor diferente de "X" ou "circulo". No caso, foi escolhido o valor "a".
let vetorTabuleiro = [];
// = ["a", "a", "a", "a", "a", "a", "a", "a", "a"];
let circuloJoga; //Se for a vez do circulo jogar, circuloJoga = true
let jogadorAtual;
let numJogadas;
let achou; //Se achar um vencedor, achou = true

//Armazena todas as possibilidades de vitória
//A indexação começa com zero
//Exemplo: [6, 7, 8]:
//Se as casas 6, 7 e 8 forem iguais, temos uma vitória
const possibilidadesVitoria = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const incializaJogo = () => {
  let classe;

  numJogadas = 0;
  achou = false;

  jogadaAtual.classList.remove("circ");
  jogadaAtual.classList.remove("XX");
  listaCasas.forEach((casa) => {
    casa.classList.remove("circulo");
    casa.classList.remove("X");
    casa.addEventListener("click", cliqueCasa, { once: true });
  });

  circuloJoga = sorteioVerdadeiroFalso(0, 1);
  classe = circuloJoga ? "circ" : "XX";
  jogadaAtual.classList.add(classe);

  vetorTabuleiro = ["a", "a", "a", "a", "a", "a", "a", "a", "a"];

  divMsgFinal.style.display = "none";
};

function finalizaJogo(mensagem) {
  mensagemFinal.innerText = mensagem;
  divMsgFinal.style.display = "flex";
}

function sorteioVerdadeiroFalso(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Boolean(Math.floor(Math.random() * (max - min + 1)) + min);
}

const verificaVencedor = (jogAtual) => {
  let i = 0;
  let temp;
  while (i < possibilidadesVitoria.length && !achou) {
    //Pega o trio "i" do vetor possibilidadesVitoria
    //Enquanto não achar um vencedor, verifica todos os trios presentes em possibilidadesVitoria
    temp = possibilidadesVitoria[i];
    const h = temp[0];
    const j = temp[1];
    const k = temp[2];
    const a = vetorTabuleiro[h];
    const b = vetorTabuleiro[j];
    const c = vetorTabuleiro[k];
    if (a === jogAtual && b === jogAtual && c === jogAtual) {
      //console.log(`${jogAtual} venceu`);
      if (jogAtual === "circulo") {
        finalizaJogo("Círculo venceu");
      } else {
        finalizaJogo("X venceu");
      }

      achou = true;
    }
    i++;
  }
  //O número máximo de jogadas é 9
  //Se jogou todas as 9 vezes e não achou um vencedor, há empate
  if (!achou && numJogadas === 9) {
    finalizaJogo("Empate");
    console.log("Empate");
  }
};

const cliqueCasa = (e) => {
  //Colocar X ou O
  const casa = e.target;
  //Pega a id casa onde houve o clique. A id vai de 0 a 8, igual ao vetor vetorTabuleiro
  const indiceDaCasa = Number(casa.id);

  if (circuloJoga) {
    //É a vez do circulo jogar
    //Adiciona a classe "circulo" na casa que houve o clique
    casa.classList.add("circulo");
    //Remove as classes da div tabuleiro
    jogadaAtual.classList.remove("circ");
    jogadaAtual.classList.add("XX");
    //Atualiza o vetorTabuleiro na posição correspondente à casa clicada
    vetorTabuleiro[indiceDaCasa] = "circulo";
    jogadorAtual = "circulo";
  } else {
    casa.classList.add("X");
    jogadaAtual.classList.remove("XX");
    jogadaAtual.classList.add("circ");
    vetorTabuleiro[indiceDaCasa] = "X";
    jogadorAtual = "X";
  }
  numJogadas++;
  verificaVencedor(jogadorAtual);

  //Alterna entre os jogadores
  circuloJoga = !circuloJoga;
};

incializaJogo();

botao.addEventListener("click", incializaJogo);
