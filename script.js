const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const scoreDisplay = document.querySelector('.score');
const recordDisplay = document.querySelector('.record');

let score = 0;
let lastPipePosition = -1;
let record = localStorage.getItem('record') || 0; // Obtém o recorde armazenado no localStorage

// Função para atualizar o recorde na interface do usuário
const updateRecord = () => {
    recordDisplay.textContent = record;
}

// Função para verificar e atualizar o recorde
const checkAndUpdateRecord = () => {
    if (score > record) {
        record = score;
        localStorage.setItem('record', record); // Salva o novo recorde no localStorage
        updateRecord();
    }
}

const jump = () => {
    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
}

const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = parseInt(window.getComputedStyle(mario).bottom);

    // Verifica se o Mario passou pelo cano sem colidir
    if (pipePosition < 50 && lastPipePosition >= 50 && marioPosition > 80 && marioPosition < 220) {
        score++;
        scoreDisplay.textContent = score;
        checkAndUpdateRecord(); // Verifica e atualiza o recorde
    }

    lastPipePosition = pipePosition;
    
    // Verifica se houve colisão do Mario com o cano
    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src ='game-over.png'
        mario.style.width = '75px'
        mario.style.marginLeft = '50px'

        clearInterval(loop);
    }
}, 10);

document.addEventListener('keydown', jump);

// Atualiza o recorde na interface do usuário ao carregar a página
updateRecord();
