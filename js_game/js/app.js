let question_html = document.querySelector('#question');
let questions_database = JSON.parse(localStorage.getItem('questions'));
let max = 75;
let double = 2;
let million = 1000000;
let random = getRandomInt(0, max);
let counter_t_prize = 0;
let counter_current_prize = 100;
let question_js = questions_database[random].question;
question_html.innerHTML = question_js;
let correct_answ = questions_database[random].correct;

let pseudo_start_btn = document.querySelector('#pseudo_btn');
pseudo_start_btn.addEventListener('click', pseudoStart);

let game = document.querySelector('.game');

let start = document.querySelector('#start_btn');
start.addEventListener('click', startHandler);
let t_prize_html = document.querySelector('#total_prize');
let cur_prize_html = document.querySelector('#current_prize');

showPrize();

let answers = [document.querySelector('#answer0'),
    document.querySelector('#answer1'),
    document.querySelector('#answer2'),
    document.querySelector('#answer3')
];

let amount_of_question = 4;

for (let i = 0; i < amount_of_question; i++) {
    answers[i].innerHTML = questions_database[random].content[i];
    answers[i].addEventListener('click', nextHandler);
    answers[i].addEventListener('click', skipHandler);
}

let skip = document.querySelector('#skip_btn');

skip.addEventListener('click', skipHandler);
skip.addEventListener('click', disableBtn);
let not_repeat = [];

function pseudoStart() {
    let pseudo = document.querySelector('.pseudo-start');
    pseudo.style.display = 'none';
    game.style.display = 'flex';

}

function startHandler() {
    location.reload();
}

function nextHandler() {
    if (this.id.includes(correct_answ)) {
        counter_t_prize += counter_current_prize;
        counter_current_prize *= double;
        if (counter_t_prize >= million) {
            getWon();
        }
        showPrize();
    } else {
        getLose();
    }
}

function disableBtn() {
    this.disabled = true;
    this.style.backgroundColor = 'rgba(44, 37, 27, 0.6)';
}

function skipHandler() {
    not_repeat.unshift(random);
    random = getRandomInt(0, max);
    correct_answ = questions_database[random].correct;

    while (Infinity) {

        if (not_repeat.length === max) {
            alert('There`s no any question');
            startHandler();
            break;
        }
        if (random === not_repeat.find(element => element === random)) {
            random = getRandomInt(0, max);
        } else {
            break;
        }

    }

    question_html.innerHTML = questions_database[random].question;
    for (let i = 0; i < amount_of_question; i++) {
        answers[i].innerHTML = questions_database[random].content[i];
    }
}

function getLose() {
    document.querySelector('.game__main').style.display = 'none';
    document.querySelector('.game__footer').style.display = 'none';
    skip.style.display = 'none';
    let header = document.querySelector('.game__header');

    let node = document.createTextNode('Game over. Your prize is: ' + counter_t_prize);
    header.appendChild(node);
    header.style.display = 'flex';
    header.style.flexDirection = 'column';
    header.style.height = '150px';
    header.style.alignItems = 'center'
    header.style.padding = '2rem';
}

function getWon() {
    document.querySelector('.game__main').style.display = 'none';
    document.querySelector('.game__footer').style.display = 'none';
    skip.style.display = 'none';
    let header = document.querySelector('.game__header');

    let node = document.createTextNode('Congritulation! You won 1000000.');
    header.appendChild(node);
    header.style.display = 'flex';
    header.style.flexDirection = 'column';
    header.style.height = '150px';
    header.style.alignItems = 'center'
    header.style.padding = '2rem';
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function showPrize() {
    cur_prize_html.innerHTML = counter_current_prize;
    t_prize_html.innerHTML = counter_t_prize;
}