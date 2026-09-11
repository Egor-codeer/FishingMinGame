const wait = (seconds) => new Promise(resolve => setTimeout(resolve, seconds * 1000));

let silaThrow = 5;

// =========================================================================
// СОХРАНЕНИЕ И ЗАГРУЗКА ДАННЫХ
// =========================================================================
let money = Number(localStorage.getItem('fishing_money')) || 0; 
if (document.querySelector('#money')) {
    document.querySelector('#money').textContent = money;
}

// Загружаем уровень удочки (если нет в памяти, ставим 1)
let rodLvl = Number(localStorage.getItem('fishing_rod_lvl')) || 1;

// Если в localStorage нет силы заброса, инициализируем её базовым значением
if (!localStorage.getItem('silaThrow')) {
    localStorage.setItem('silaThrow', String(silaThrow));
}
let numberValue = Number(localStorage.getItem('silaThrow'));

// Функция для динамического обновления диапазона кликов в зависимости от уровня удочки
let minClickFish, maxClickFish;
function updateClickLimits() {
    if (rodLvl === 1) {
        minClickFish = 15;
        maxClickFish = 50;
    } else if (rodLvl === 2) {
        minClickFish = 15;
        maxClickFish = 40;
    } else if (rodLvl >= 3) {
        minClickFish = 10;
        maxClickFish = 30;
    }
}
updateClickLimits();

let thr = document.querySelector('#throw');
let fishing = document.querySelector('#Fishing');
let proc = document.querySelector('#proc');
let plusNum = 0;
let imag = document.querySelector('#imageDiv');

// ЗАЩИТА: Меняем прозрачность поплавка, только если он есть на этой странице
if (imag) {
    imag.style.opacity = 0;
}

// ЗАЩИТА: Установка правильной картинки удочки при загрузке страницы
if (fishing) {
    if (rodLvl === 2) {
        fishing.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNQnl_FwnIjoCWFWXPPFczopliuE__e3Uh7EDiJWi2AA&s=10';
    } else if (rodLvl === 3) {
        fishing.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDKrRWiFNLtQb59YqZ1uWQAX4Cg2hVuIQ-viUXlo8L5w&s=10';
    }
}

let trueFish = false;
let ClickFish = 0;

// ЗАЩИТА: Создаем текст кликов только при наличии контейнера
const container = document.getElementById('container');
const myH1 = document.createElement('h1');
if (container) {
    container.append(myH1);
}

// ЗАЩИТА: Создаем текст названия рыбы только при наличии контейнера
let contFish = document.querySelector('#containerFish');
const fishH1 = document.createElement('h1');
if (contFish) {
    contFish.append(fishH1);
}

// =========================================================================
// МЕХАНИКА ЗАБРОСА УДОЧКИ
// =========================================================================
function throwClick() {
    // ЗАЩИТА: Не даем повторно закидывать удочку во время процесса ловли
    if (trueFish === true || trueFish === 'process') return;
    if (!fishing || !thr || !proc || !imag) return; // Если элементов нет на странице — выходим

    imag.style.opacity = 0;
    let minDeg = 5;
    let maxDeg = 100;
    let randomDeg = Math.floor(Math.random() * (maxDeg - minDeg + 1)) + minDeg;
    fishing.style.transform = `rotate(${randomDeg}deg)`;

    plusNum = plusNum + numberValue;

    if (plusNum > 100) {
        thr.textContent = 'Удочка закинута! ЖМИ НА ПОПЛОВОК!';
        fishing.style.transform = 'rotate(0deg)';
        imag.style.opacity = 1;
        trueFish = true; 
        return;
    }
    proc.textContent = `${plusNum}%`;
}
  
if (thr) {
    thr.onclick = throwClick;
}

// =========================================================================
// ПОПЛАВОК И СИСТЕМА ЛОВЛИ
// =========================================================================
async function clickForFish() {
    if (trueFish === false) return; 
    let miNpx = 10;
    let maXpx = 40;
    let margin = ['left', 'right', 'top', 'bottom'];
    let randPx = Math.floor(Math.random() * (maXpx - miNpx + 1) + miNpx) + '%';
    let randTxt = Math.floor(Math.random() * margin.length);

    let plotva = document.querySelector('#Plotva');
    let corushka = document.querySelector('#Corushka');
    let okun = document.querySelector('#okun');
    let lesh = document.querySelector('#lesh');
    let shuka = document.querySelector('#shuka');
    let losoc = document.querySelector('#losoc');
    let shark = document.querySelector('#shark');
    let kit = document.querySelector('#kit');
    let goldFish = document.querySelector('#goldFish');
    let moneyCount = document.querySelector('#money');

    const randomTxt = margin[randTxt];
    const randomPx = randPx;

    if (trueFish === true) {
        ClickFish = Math.floor(Math.random() * (maxClickFish - minClickFish + 1) + minClickFish);
        myH1.textContent = `${ClickFish} кликов осталось`;
        trueFish = 'process'; 
        return;
    }

    // ОШИБКА ИСПРАВЛЕНА: Уменьшаем количество оставшихся кликов для рыбы, а не силу заброса удочки
    ClickFish--;

    if (ClickFish <= 0) {
        if (trueFish === false) return;
        trueFish = false; 

        myH1.textContent = 'Вы поймали рыбу! 🎉';
        if (imag) imag.style.opacity = 0; 

        plusNum = 0;
        if (proc) proc.textContent = 0 + '%';
        if (thr) thr.textContent = 'Забросить удочку';
        document.body.style.backgroundColor = 'gray';
        if (fishing) fishing.style.backgroundColor = 'gray';

        const fishes = [
          { name: 'корюшка', weight: 220, price: 50},
          { name: 'окунь', weight:  200, price: 65},
          { name: 'плотва', weight: 185, price: 100},
          { name: 'лещ', weight: 160, price: 150},
          { name: 'щука', weight: 140, price: 250},
          { name: 'лосось', weight: 100, price: 500},
          { name: 'акула', weight: 10, price: 1000},
          { name: 'кит', weight: 5, price: 2500},
          { name: 'золотая рыбка', weight: 2, price: 5000}
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

        if (fishH1) fishH1.textContent = chosenFish.name;

        if (moneyCount) {
            money += chosenFish.price;
            moneyCount.textContent = money;
            localStorage.setItem('fishing_money', money); 
        }

        // Логика показа картинок
        if (chosenFish.name === 'плотва' && plotva) plotva.style.opacity = 1;
        if (chosenFish.name === 'корюшка' && corushka) corushka.style.opacity = 1;
        if (chosenFish.name === 'окунь' && okun) okun.style.opacity = 1;
        if (chosenFish.name === 'лещ' && lesh) lesh.style.opacity = 1;
        if (chosenFish.name === 'щука' && shuka) shuka.style.opacity = 1;
        if (chosenFish.name === 'лосось' && losoc) losoc.style.opacity = 1;
        if (chosenFish.name === 'акула' && shark) shark.style.opacity = 1;
        if (chosenFish.name === 'кит' && kit) kit.style.opacity = 1;
        if (chosenFish.name === 'золотая рыбка' && goldFish) goldFish.style.opacity = 1;

        await wait(5);

        // Скрытие всех картинок рыб
        if (plotva) plotva.style.opacity = 0;
        if (corushka) corushka.style.opacity = 0;
        if (okun) okun.style.opacity = 0;
        if (lesh) lesh.style.opacity = 0;
        if (shuka) shuka.style.opacity = 0;
        if (losoc) losoc.style.opacity = 0;
        if (shark) shark.style.opacity = 0;
        if (kit) kit.style.opacity = 0;
        if (goldFish) goldFish.style.opacity = 0;

        document.body.style.backgroundColor = 'white';
        if (fishing) fishing.style.backgroundColor = 'white';
        if (fishH1) fishH1.textContent = "";
        if (myH1) myH1.textContent = ""; 

        return; 
    }

    if (imag) {
        imag.style.left = '';
        imag.style.right = '';
        imag.style.top = '';
        imag.style.bottom = '';
        imag.style[randomTxt] = randomPx;
    }

    myH1.textContent = `${ClickFish} кликов осталось`;    
}

if (imag) {
    imag.onclick = clickForFish;
}

let moneyCount = document.querySelector('#money');

// =========================================================================
// МАГАЗИН: УДОЧКА LVL 2
// =========================================================================
function LvlTwoFish() {
    let buyBtn = document.querySelector('#fishingLvlTwo');

    if (money >= 1000 && rodLvl === 1) {
        money = money - 1000;
        rodLvl = 2;
        
        // Повышаем силу заброса (было 5, станет 8)
        numberValue = numberValue + 3;
        localStorage.setItem('silaThrow', String(numberValue));

        updateClickLimits();

        if (fishing) {
            fishing.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNQnl_FwnIjoCWFWXPPFczopliuE__e3Uh7EDiJWi2AA&s=10';
        }

        if (moneyCount) {
            moneyCount.textContent = money;
        }

        if (buyBtn) {
            buyBtn.textContent = 'Куплено';
            buyBtn.style.backgroundColor = 'green';
        }

        localStorage.setItem('fishing_money', money);
        localStorage.setItem('fishing_rod_lvl', rodLvl);
        
        alert('Удочка 2-го уровня успешно куплена! Клик по поплавку стал легче. 🎣');
    } else if (rodLvl >= 2) {
        alert('Эта удочка или более улучшенная уже куплена!');
    } else {
        alert('Недостаточно монет! Требуется 1000 🪙');
    }
}

// =========================================================================
// МАГАЗИН: УДОЧКА LVL 3 ИСПРАВЛЕНО (Синтаксис скобок и логика)
// =========================================================================
function LvlThreeFish() {
    let buyBtnThree = document.querySelector('#fishingLvlThree');

    if (money >= 3000 && rodLvl === 2) {
        money = money - 3000;
        rodLvl = 3;

        // Повышаем силу заброса еще на 5 (станет 13)
numberValue = numberValue + 5;
        localStorage.setItem('silaThrow', String(numberValue));
        updateClickLimits();
        if (fishing) {
            fishing.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDKrRWiFNLtQb59YqZ1uWQAX4Cg2hVuIQ-viUXlo8L5w&s=10';
        }if (moneyCount) {
            moneyCount.textContent = money;
        }if (buyBtnThree) {
            buyBtnThree.textContent = 'Куплено';
            buyBtnThree.style.backgroundColor = 'green';
        }
        localStorage.setItem('fishing_money', money);
        localStorage.setItem('fishing_rod_lvl', rodLvl);
        alert('Удочка 3-го уровня успешно куплена! Клик по поплавку стал гоооорааааздоооо легче. 🎣');
    } else if (rodLvl >= 3) {
        alert('Эта удочка уже куплена!');
    } else if (rodLvl < 2) {
        alert('Сначала нужно купить удочку 2-го уровня!');
    } else {
        alert('Недостаточно монет! Требуется 3000 🪙');
    }
}// =========================================================================
// ИНИЦИАЛИЗАЦИЯ И НАЗНАЧЕНИЕ КЛИКОВ
// =========================================================================
window.addEventListener('DOMContentLoaded', () => {
    let buyBtn2 = document.querySelector('#fishingLvlTwo');
    let buyBtn3 = document.querySelector('#fishingLvlThree');
    if (buyBtn2) {
        if (rodLvl >= 2) {
            buyBtn2.textContent = 'Куплено';buyBtn2.style.backgroundColor = 'green';
        }
        buyBtn2.onclick = LvlTwoFish;
    }if (buyBtn3) {
     if (rodLvl >= 3) {
         buyBtn3.textContent = 'Куплено';
         buyBtn3.style.backgroundColor = 'green';
     }
        buyBtn3.onclick = LvlThreeFish;
    }}
    );
