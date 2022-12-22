import {Game} from "./Game.js";

let game = null;

document.querySelector("#btn_start").addEventListener('click', e => {
    e.target.parentElement.parentElement.classList.add("d-none");
    document.querySelector(".section-game").classList.remove("d-none");
    game = new Game();
    game.startGame();
});

document.querySelector("#btn_addWord").addEventListener('click', e => {
    e.target.parentElement.parentElement.classList.add("d-none");
    document.querySelector(".section-word").classList.remove("d-none");
});

document.querySelector("#btn_saveWord").addEventListener('click', e => {
    const words = JSON.parse(localStorage.getItem('addWords')) || [];
    words.push((document.querySelector("#aWord").value).toUpperCase());
    localStorage.setItem('addWords', JSON.stringify(words));
    e.target.parentElement.parentElement.parentElement.parentElement.parentElement.classList.add("d-none");
    document.querySelector(".section-game").classList.remove("d-none");
    game = new Game();
    game.startGame();
});

document.querySelector("#btn_cancel").addEventListener('click', e => {
    e.target.parentElement.parentElement.parentElement.parentElement.parentElement.classList.add("d-none");
    document.querySelector(".section-inicio").classList.remove("d-none");
});

document.querySelector("#btn_continue").addEventListener('click', e => {
    game = new Game();
    game.startGame();
});

document.querySelector("#btn_exit").addEventListener('click', e => {
    e.target.parentElement.parentElement.parentElement.parentElement.parentElement.classList.add("d-none");
    document.querySelector(".section-inicio").classList.remove("d-none");
    game = null;
});

document.addEventListener("keydown", (e) => {
    if (game != null) {
        if (e.keyCode >= 65 && e.keyCode <= 90 && (game.victory == false && game.failed == false)) {
            game.pressKey(e.key.toUpperCase());
        }
    }
});

window.addEventListener('resize', () => {
    if (game != null) {
        console.log("Cambio");
        game.continueGame();
    }
});