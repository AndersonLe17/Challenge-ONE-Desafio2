export class Game {

    canvas = document.querySelector("#game");
    words = ['HTML','JAVA','ALURA','SCRUM','DESAFIO','REACT','ANGULAR','INGENIO','LATAM'];
    word;
    lifes; aciertos; fallos; victory; failed;
    ctx;
    x; y; inicioX; finX;
    constructor() {
        this.definirWidthCanvas();
    }

    startGame = () => {
        // Contexto de canvas
        this.contextCanvas();
        // AddWords
        const words = JSON.parse(localStorage.getItem('addWords')) || false;
        if (words) {
            this.words.push(...words);
        }
        // Atributos
        this.lifes = 9;
        this.aciertos = "";
        this.fallos = "";
        this.victory = false;
        this.failed = false;
        // Dibujar Base
        this.drawBase();
        this.word = this.selectWord();
        console.log(this.word);
        //Limpiar Words
        document.querySelector("#words").innerHTML = "";
        document.querySelector('#useWords').innerHTML = "";
        //Rellenar espacios
        for (let i = 0; i < this.word.length; i++) {
            document.querySelector("#words").innerHTML += '<span class="border-bottom border-4 px-lg-4 px-2">&nbsp;</span>';
        }
    }

    selectWord = () => {
        return this.words[this.getRandomInt(this.words.length)];
    }

    drawPerson = async (i) => {
        const caso = i || this.lifes;
        switch (caso) {
            case 9:
                this.drawError1();
                break;
            case 8:
                this.drawError2();
                break;
            case 7:
                this.drawError3();
                break;
            case 6:
                this.drawError4();
                break;
            case 5:
                this.drawHead();
                break;
            case 4:
                this.drawBody();
                break;
            case 3:
                this.drawLeftArm();
                break;
            case 2:
                this.drawRightArm();
                break;
            case 1:
                this.drawLeftLeg();
                break;
            case 0:
                this.drawRightLeg();
                this.failed = true;
                const jsConfetti = new JSConfetti();
                await jsConfetti.addConfetti({emojis: ['💩','😡','😭','☠','❌']});
                this.mostrarModal('failed');
                break;
        }
    }

    pressKey = (letter) => {
        if (this.word.includes(letter)) {
            this.rellenarLetra(letter);
        } else if (!this.fallos.includes(letter)) {
            this.fallos += letter;
            document.querySelector('#useWords').innerHTML += `<span>${letter}</span>`;
            this.drawPerson();
            this.lifes--;
        }
    }

    rellenarLetra = (letter) => {
        for (let i = 0; i < this.word.length; i++) {
            if (this.word[i] === letter) {
                document.querySelector('#words').children[i].innerHTML = letter;
                this.aciertos+=letter;
                this.verificarVictoria();
            }
        }
    }
    verificarVictoria = async () => {
        if (this.aciertos.length == this.word.length) {
            this.victory = true;
            const jsConfetti = new JSConfetti();
            await jsConfetti.addConfetti();
            this.mostrarModal('victory');
        }
    }

    drawBase = () => {
        this.ctx.beginPath();
        this.ctx.moveTo(this.inicioX, this.y-6);
        this.ctx.lineTo(this.finX,this.y-6);
        this.ctx.closePath();
        this.ctx.stroke();
    }
    drawError1 = () => {
        this.ctx.beginPath();
        this.ctx.moveTo(this.inicioX+((this.finX-this.inicioX)/4), this.y-6);
        this.ctx.lineTo(this.inicioX+((this.finX-this.inicioX)/4), 6);
        this.ctx.closePath();
        this.ctx.stroke();
    }
    drawError2 = () => {
        this.ctx.beginPath();
        this.ctx.moveTo(this.inicioX+((this.finX-this.inicioX)/4), 6);
        this.ctx.lineTo(this.finX-((this.finX-this.inicioX)/8), 6);
        this.ctx.closePath();
        this.ctx.stroke();
    }
    drawError3 = () => {
        this.ctx.beginPath();
        this.ctx.moveTo(this.inicioX+((this.finX-this.inicioX)/4), 6);
        this.ctx.lineTo(this.finX-((this.finX-this.inicioX)/8), 6);
        this.ctx.closePath();
        this.ctx.stroke();
    }
    drawError4 = () => {
        this.ctx.beginPath();
        this.ctx.moveTo(this.finX-((this.finX-this.inicioX)/8), 6);
        this.ctx.lineTo(this.finX-((this.finX-this.inicioX)/8), (this.y/8)+6);
        this.ctx.closePath();
        this.ctx.stroke();
    }
    drawHead = () => {
        this.ctx.beginPath();
        this.ctx.moveTo(this.finX-((this.finX-this.inicioX)/8), (this.y/8)+6);
        this.ctx.arc(this.finX-((this.finX-this.inicioX)/8), (this.y/8)+6+((this.finX-this.inicioX)/12), ((this.finX-this.inicioX)/12), 17.25, Math.PI * 2, true);
        this.ctx.closePath();
        this.ctx.stroke();
    }
    drawBody = () => {
        this.ctx.beginPath();
        this.ctx.moveTo(this.finX-((this.finX-this.inicioX)/8), (this.y/8)+((this.finX-this.inicioX)/6)+6);
        this.ctx.lineTo(this.finX-((this.finX-this.inicioX)/8), (this.y/8)+((this.finX-this.inicioX)/6)+(this.y/3)+6);
        this.ctx.closePath();
        this.ctx.stroke();
    }
    drawLeftArm = () => {
        this.ctx.beginPath();
        this.ctx.moveTo(this.finX-((this.finX-this.inicioX)/8), (this.y/8)+((this.finX-this.inicioX)/6)+6);
        this.ctx.lineTo(this.finX-((this.finX-this.inicioX)/4), (this.y/8)+((this.finX-this.inicioX)/6)+(this.y/6)+6);
        this.ctx.closePath();
        this.ctx.stroke();
    }
    drawRightArm = () => {
        this.ctx.beginPath();
        this.ctx.moveTo(this.finX-((this.finX-this.inicioX)/8), (this.y/8)+((this.finX-this.inicioX)/6)+6);
        this.ctx.lineTo(this.finX, (this.y/8)+((this.finX-this.inicioX)/6)+(this.y/6)+6);
        this.ctx.closePath();
        this.ctx.stroke();
    }
    drawLeftLeg = () => {
        this.ctx.beginPath();
        this.ctx.moveTo(this.finX-((this.finX-this.inicioX)/8), (this.y/8)+((this.finX-this.inicioX)/6)+(this.y/3)+6);
        this.ctx.lineTo(this.finX-((this.finX-this.inicioX)/4), (this.y/8)+((this.finX-this.inicioX)/6)+(this.y/3)+(this.y/6)+6);
        this.ctx.closePath();
        this.ctx.stroke();
    }
    drawRightLeg = () => {
        this.ctx.beginPath();
        this.ctx.moveTo(this.finX-((this.finX-this.inicioX)/8), (this.y/8)+((this.finX-this.inicioX)/6)+(this.y/3)+6);
        this.ctx.lineTo(this.finX, (this.y/8)+((this.finX-this.inicioX)/6)+(this.y/3)+(this.y/6)+6);
        this.ctx.closePath();
        this.ctx.stroke();
    }
    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    mostrarModal = (type) => {
        document.querySelector("#modals").innerHTML = `
            <div class="modal" tabindex="-1" id="modal">
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-body text-center">
                    <h2 class="mb-5">${(type == 'victory')?'¡🎉 Felicidades Ganaste 🎉!':"¡😭 Fin Del Juego 😭!"}</h2>
                    <button class="btn btn-game" data-bs-dismiss="modal">Cerrar</button>
                  </div>
                </div>
              </div>
            </div>
        `;
        const modal = new bootstrap.Modal('#modal', {keyboard: false});
        modal.show();
    }
    contextCanvas = () => {
        this.ctx = this.canvas.getContext('2d');
        // Propiedades de dibujo
        this.ctx.lineWidth = 6;
        this.ctx.lineCap = "round";
        this.ctx.lineJoin = "round";
        this.ctx.fillStyle = "#0A3871";
        this.ctx.strokeStyle = "#0A3871";
    }

    definirWidthCanvas = () => {
        // Definir dimension de pantalla
        this.x = this.canvas.parentElement.offsetWidth;
        this.y = this.canvas.parentElement.offsetHeight;
        // Dimension de Canvas
        this.canvas.setAttribute("width", this.x);
        this.canvas.setAttribute("height", this.y);
        // Dimencion de Extremos
        this.inicioX = (window.innerWidth >= 768)? this.x/4: this.x/8;
        this.finX = (window.innerWidth >= 768)? this.x-this.inicioX: this.x-this.inicioX;
    }

    continueGame = () => {
        if (this.lifes != 9) {
            this.definirWidthCanvas();
            this.contextCanvas();
            this.drawBase();
            for (let i = 9; i > this.lifes; i--) {
                this.drawPerson(i);
            }
        } else {
            this.definirWidthCanvas();
            this.contextCanvas();
            this.drawBase();
        }
    }
}