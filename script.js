const wait = (seconds) => new Promise(resolve => setTimeout(resolve, seconds * 1000));

let money = Number(localStorage.getItem('fishing_money')) || 0; 
if (document.querySelector('#money')) {
    document.querySelector('#money').textContent = money;
}

let thr = document.querySelector('#throw')
let fishing = document.querySelector('#Fishing')
let degs = true
let proc = document.querySelector('#proc')
let plusNum = 0
let trueNum = true
let imag = document.querySelector('#imageDiv')
    imag.style.opacity = 0



let trueFish = false;
let ClickFish = 0;
const container = document.getElementById('container');
const myH1 = document.createElement('h1');
container.append(myH1);

let contFish = document.querySelector('#containerFish')
const fishH1 = document.createElement('h1');
contFish.append(fishH1);

function throwClick() {
        imag.style.opacity = 0
    let minDeg = 5
    let maxDeg = 100
    let randomDeg = Math.floor(Math.random() * (maxDeg - minDeg + 1)) + minDeg;
    fishing.style.transform = `rotate(${randomDeg}deg)`;

    plusNum = plusNum + 5

     if (plusNum > 100) {
        thr.textContent = 'Удочка закинута! ЖМИ НА ПОПЛОВОК!'
        fishing.style.transform = 'rotate(0deg)'
        imag.style.opacity = 1
        trueFish = true 
        return
    }
    proc.textContent = `${plusNum}%`;
}
  
thr.onclick = throwClick

// ПОПЛАВОК
async function clickForFish() {
if (trueFish === false) return; 
let miNpx = 10;
let maXpx = 40;
let margin = ['left', 'right', 'top', 'bottom']
let randPx = Math.floor(Math.random() *  (maXpx - miNpx + 1) + miNpx) + '%';
let randTxt = Math.floor(Math.random() * margin.length)

let plotva = document.querySelector('#Plotva')
let corushka = document.querySelector('#Corushka')
let okun = document.querySelector('#okun')
let lesh = document.querySelector('#lesh')
let shuka = document.querySelector('#shuka')
let losoc = document.querySelector('#losoc')
let shark = document.querySelector('#shark')
let kit = document.querySelector('#kit')
let goldFish = document.querySelector('#goldFish')

let moneyCount = document.querySelector('#money')

const randomTxt = margin[randTxt]
const randomPx = randPx

if (trueFish == true) {
    let minClickFish = 5;
    let maxClickFish = 30;
    ClickFish = Math.floor(Math.random() *  (maxClickFish - minClickFish + 1) + minClickFish);
    myH1.textContent = `${ClickFish} кликов осталось`
    trueFish = 'process'; 
    return;
}

ClickFish--;



if (ClickFish <= 0) {
        myH1.textContent = 'Вы поймали рыбу! 🎉';
        imag.style.opacity = 0; 

        trueFish = false; 
        
        plusNum = 0;
        proc.textContent = 0 + '%'
        thr.textContent = 'Бросить удочку'
        document.body.style.backgroundColor = 'gray'
        fishing.style.backgroundColor = 'gray'

        const fishes = [
          { name: 'корюшка', weight: 220, price: 25},
          { name: 'окунь', weight:  200, price: 35},
          { name: 'плотва', weight: 185, price: 50},
          { name: 'лещ', weight: 160, price: 75 },
          { name: 'щука', weight: 140, price: 125 },
          { name: 'лосось', weight: 100, price: 250 },
          { name: 'акула', weight: 10, price: 500 },
          { name: 'кит', weight: 5, price: 1250},
          { name: 'золотая рыбка', weight: 2, price: 2500}
        ];

        const totalWeight = fishes.reduce((sum, fish) => sum + fish.weight, 0);
        let randomNum = Math.random() * totalWeight;

        let chosenFish = null;
        for (const fish of fishes) {
          if (randomNum < fish.weight) {
            chosenFish = fish;
            break;
          }
          randomNum -= fish.weight;
        }

        fishH1.textContent = chosenFish.name;

        if (moneyCount) {
            money += chosenFish.price;
            moneyCount.textContent = money;
            localStorage.setItem('fishing_money', money); 
        }

        // 2. НАЧИСЛЕНИЕ И СОХРАНЕНИЕ ДЕНЕГ (перенесено в правильное место)
        if (moneyCount) {
            money += chosenFish.price;
            moneyCount.textContent = money;
            localStorage.setItem('fishing_money', money); 
        }

        // Логика показа картинок
        if (chosenFish.name === 'плотва' && plotva) {
            plotva.style.opacity = 1;
        }
        if (chosenFish.name === 'корюшка' && corushka) {
            corushka.style.opacity = 1;
        }
        if (chosenFish.name === 'окунь' && okun) {
            okun.style.opacity = 1;
        }
        if (chosenFish.name === 'лещ' && lesh) {
            lesh.style.opacity = 1;
        }
        if (chosenFish.name === 'щука' && shuka) {
            shuka.style.opacity = 1;
        }
        if (chosenFish.name === 'лосось' && losoc) {
            losoc.style.opacity = 1;
        }
        if (chosenFish.name === 'акула' && shark) {
            shark.style.opacity = 1;
        }
        if (chosenFish.name === 'кит' && kit) {
            kit.style.opacity = 1;
        }
        if (chosenFish.name === 'золотая рыбка' && goldFish) {
            goldFish.style.opacity = 1;
        }

    await wait(5)

    if (plotva) plotva.style.opacity = 0;
    if (corushka) corushka.style.opacity = 0;
    if (okun) okun.style.opacity = 0;
    if (lesh) lesh.style.opacity = 0;
    if (shuka) shuka.style.opacity = 0;
    if (losoc) losoc.style.opacity = 0;
    if (shark) shark.style.opacity = 0;
    if (kit) kit.style.opacity = 0;
    if (kit) kit.style.opacity = 0;

    document.body.style.backgroundColor = 'white'
    fishing.style.backgroundColor = 'white'
    fishH1.textContent = ""

    return; 
}

    imag.style.left = '';
    imag.style.right = '';
    imag.style.top = '';
    imag.style.bottom = '';

    imag.style[randomTxt] = randomPx;


    myH1.textContent = `${ClickFish} кликов осталось`    
}

//МАГАЗИН  

// УДОЧКА LVL 2


imag.onclick = clickForFish;