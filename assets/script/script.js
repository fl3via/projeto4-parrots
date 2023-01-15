let amountCards = 0;
const cheap = [];
let parrot = ["1", "2", "3", "4", "5", "6", "7"];
let cardOne, cardTwo
let moves = 0
let hits = 0


function comparator() {
    return Math.random() - 0.5;
}


function toAsk() {
    while (!(amountCards % 2 == 0 && amountCards >= 4 && amountCards <= 14)) {
        amountCards = prompt("Com quantas cartas deseja jogar?");
    }
    
    comecar();
}


function comecar() {
    for (let i = 0; i < (amountCards / 2); i++) {
        let carta = parrot[i];
        cheap.push(carta)
        cheap.push(carta)
    }
    cheap.sort(comparator);
    
    mostrar();
}

function mostrar() {
    let decks = document.querySelector(".decks");
    for (let i = 0; i < cheap.length; i++) {
        let cartinha = `
        <li class="card turned" onclick="desvirar(this)" data-test="card">
            <div class="front-face face">
                <img src="./assets/img/front.png" data-test="face-down-image">
            </div>
            <div class="back-face face">
                <img src="./assets/img/${cheap[i]}.gif" data-test="face-up-image">
            </div>
        </li> 
        `
        decks.innerHTML += cartinha;
    }

    desvirarTudo()
}

function desvirar(card) {
    if (card.classList.contains("turned")) {
        return
    }
    if (cardOne !== undefined && cardTwo !== undefined) {
        return
    }
    card.classList.add("turned")
    moves++
    if (cardOne === undefined) {
        cardOne = card;
    } else {
        if (cardTwo === undefined) {
            cardTwo = card;
            if (cardOne.innerHTML === cardTwo.innerHTML) {
                fixa();
                hits += 2;
                confereSeTerminou();
            } else {
                setTimeout(vira, 1000)
            }
        }
    }
}

function desvirarTudo() {
    const cards = document.querySelectorAll(".turned")
    for (let i = 0; i < cards.length; i++) {
        cards[i].classList.remove("turned");
    }
}

function fixa() {
    cardOne = undefined;
    cardTwo = undefined;
}

function confereSeTerminou() {
    if (hits === cheap.length) {
        setTimeout(terminar, 1000)
    } else {
        console.log("continuar o jogo")
    }
}

function vira() {
    cardOne.classList.remove("turned");
    cardTwo.classList.remove("turned");
    fixa();
}

function terminar() {
    alert(`Você ganhou em ${moves} jogadas!`);
    const recomecar = confirm("Deseja jogar novamente?");
    if (recomecar === true) {
        window.location.reload();
    } else {
        alert("Obrigado por jogar");
    }
}
toAsk();



