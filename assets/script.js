let baralho = [];
const papagaio = ["1", "2", "3", "4", "5", "6", "7"];
let cardOne, cardTwo;
let moves = 0;
let hits = 0;
let qtd_cartas;

const comparator = () => Math.random() - 0.5;

const ask = () => {
  qtd_cartas = prompt("Com quantas cartas deseja jogar?");
  while (!(qtd_cartas % 2 == 0 && qtd_cartas >= 4 && qtd_cartas <= 14)) {
    qtd_cartas = prompt("Com quantas cartas deseja jogar?");
  }
  start();
};

const start = () => {
  for (let i = 0; i < qtd_cartas / 2; i++) {
    const carta = papagaio[i];
    baralho.push(carta, carta);
  }
  baralho.sort(comparator);
  show();
};

const show = () => {
  const decks = document.querySelector(".decks");
  decks.innerHTML = baralho
    .map(
      (card) => `
        <li class="card ${card.found ? "found" : "turned"}" data-test="card" onclick="desvirar(this)">
            <div class="front-face face">
                <img data-test="face-down-image" src="./assets/img/back.png">
            </div>
            <div class="back-face face">
                <img data-test="face-up-image" src="./assets/img/${card}.gif">
            </div>
        </li> 
      `
    )
    .join("");
  desvirarTudo();
};

const desvirar = (card) => {
  if (card.classList.contains("turned")) {
    return;
  }
  if (cardOne !== undefined && cardTwo !== undefined) {
    return;
  }
  card.classList.add("turned");
  moves++;
  if (cardOne === undefined) {
    cardOne = card;
  } else {
    if (cardTwo === undefined) {
      cardTwo = card;
      if (cardOne.innerHTML === cardTwo.innerHTML) {
        fixed();
        hits += 2;
        checkIsOver();
      } else {
        setTimeout(vira, 1000);
      }
    }
  }
};

const desvirarTudo = () => {
  const cards = document.querySelectorAll(".turned");
  cards.forEach((card) => card.classList.remove("turned"));
};

const fixed = () => {
  cardOne = undefined;
  cardTwo = undefined;
};

const checkIsOver = () => {
  if (hits === baralho.length) {
    setTimeout(finish, 1000);
  } else {
    console.log("continua o jogo");
  }
};

const vira = () => {
  cardOne.classList.remove("turned");
  cardTwo.classList.remove("turned");
  fixed();
};

const finish = () => {
  alert(`Você ganhou em ${moves} jogadas!`);
  const restart = confirm("Deseja jogar mais uma partida?");
  if (restart) {
    window.location.reload();
  } else {
    alert("Obrigado por jogar!");
  }
};

ask();

