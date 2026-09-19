const wait = (seconds) => new Promise(resolve => setTimeout(resolve, seconds * 1000));

// =========================================================================
// СОХРАНЕНИЕ И ЗАГРУЗКА ДАННЫХ
// =========================================================================
let money = Number(localStorage.getItem('fishing_money')) || 0; 
if (document.querySelector('#money')) {
    document.querySelector('#money').textContent = money;
}

// Загружаем уровень удочки (если нет в памяти, ставим 1)
let rodLvl = Number(localStorage.getItem('fishing_rod_lvl')) || 1;

// ЗАЩИТА: Загружаем силу заброса. Если игры нет в памяти, ставим базовую силу = 5
let silaThrow = Number(localStorage.getItem('silaThrow')) || 5;

// Определяем параметры кликов в зависимости от уровня удочки при загрузке
let minClickFish = 15;
let maxClickFish = 50;

if (rodLvl === 2) { minClickFish = 15; maxClickFish = 40; }
else if (rodLvl === 3) { minClickFish = 10; maxClickFish = 30; }
else if (rodLvl === 4) { minClickFish = 8; maxClickFish = 25; }
else if (rodLvl === 5) { minClickFish = 5; maxClickFish = 20; }

let thr = document.querySelector('#throw');
let fishing = document.querySelector('#Fishing');
let degs = true;
let proc = document.querySelector('#proc');
let plusNum = 0;
let trueNum = true;
let imag = document.querySelector('#imageDiv');

// ЗАЩИТА: Меняем прозрачность поплавка, только если он есть на этой странице
if (imag) {
    imag.style.opacity = 0;
}

// Установка картинки удочки в зависимости от уровня при загрузке страницы
if (fishing) {
    if (rodLvl === 1) fishing.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdMFZYb50_eVRALkJ1JfxvdP1II0h5ELIG1Uh7ryUcMw&s';
    if (rodLvl === 2) fishing.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNQnl_FwnIjoCWFWXPPFczopliuE__e3Uh7EDiJWi2AA&s=10';
    if (rodLvl === 3) fishing.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDKrRWiFNLtQb59YqZ1uWQAX4Cg2hVuIQ-viUXlo8L5w&s=10';
    if (rodLvl === 4) fishing.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQggGoVOR_qpCNyYnZnqQEbgOSiSoMnZt59IcFD7VDTQQ&s';
    if (rodLvl === 5) fishing.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKKSYZLSMzGf4r-Oeje1F6gNITqLsVY38t53ll3fjb1w&s=10';
}

let trueFish = false;
let ClickFish = 0;

const container = document.getElementById('container');
const myH1 = document.createElement('h1');
if (container) {
    container.append(myH1);
}

let contFish = document.querySelector('#containerFish');
const fishH1 = document.createElement('h1');
if (contFish) {
    contFish.append(fishH1);
}

// =========================================================================
// МЕХАНИКА ЗАБРОСА УДОЧКИ
// =========================================================================
function throwClick() {
    if (trueFish === true || trueFish === 'process') return;
    if (!fishing || !thr || !proc || !imag) return; 

    imag.style.opacity = 0;
    let minDeg = 5;
    let maxDeg = 100;
    let randomDeg = Math.floor(Math.random() * (maxDeg - minDeg + 1)) + minDeg;
    fishing.style.transform = `rotate(${randomDeg}deg)`;

    // Прибавляем актуальное значение силы заброса
    plusNum = plusNum + silaThrow;

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
    let maXpx = 80;
    let margin = ['left', 'right', 'top', 'bottom'];
    let randPx = Math.floor(Math.random() * (maXpx - miNpx + 1) + miNpx) + '%';
    let randTxt = Math.floor(Math.random() * margin.length);

    let plotva = document.querySelector('#Plotva');
    let corushka = document.querySelector('#Corushka');
    let okun = document.querySelector('#okun');
    let lesh = document.querySelector('#lesh');
    let osminog = document.querySelector('#osminog');
    let shuka = document.querySelector('#shuka');
    let losoc = document.querySelector('#losoc');
    let shark = document.querySelector('#shark');
    let kit = document.querySelector('#kit');
    let someCorushk = document.querySelector('#SomeCor');
    let goldFish = document.querySelector('#goldFish');
    let moneyCount = document.querySelector('#money');

    const randomTxt = margin[randTxt];
    const randomPx = randPx;

    if (trueFish == true) {
        ClickFish = Math.floor(Math.random() * (maxClickFish - minClickFish + 1) + minClickFish);
        myH1.textContent = `${ClickFish} кликов осталось`;
        trueFish = 'process'; 
        return;
    }

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

        let fishes = [
          { name: 'корюшка', weight: 220, price: 50},
          { name: 'окунь', weight:  200, price: 65},
          { name: 'плотва', weight: 185, price: 100},
          { name: 'лещ', weight: 160, price: 150},
          { name: 'щука', weight: 140, price: 250},
          { name: 'лосось', weight: 100, price: 500},
          { name: 'акула', weight: 10, price: 1000},
          { name: 'кит', weight: 5, price: 2500},
          { name: 'золотая рыбка', weight: 2, price: 4000}
        ];

        if (rodLvl >= 5) {
            fishes = [          
          { name: 'много корюшки', weight: 210, price: 100},
          { name: 'окунь', weight:  200, price: 75},
          { name: 'плотва', weight: 185, price: 110},
          { name: 'лещ', weight: 160, price: 160},
          { name: 'осьминог', weight: 145, price: 210},
          { name: 'щука', weight: 135, price: 260},
          { name: 'лосось', weight: 105, price: 510},
          { name: 'акула', weight: 11, price: 1100},
          { name: 'кит', weight: 6, price: 2600},
          { name: 'золотая рыбка', weight: 3, price: 4200}]
        }

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

        if (chosenFish.name === 'плотва' && plotva) plotva.style.opacity = 1;
        if (chosenFish.name === 'корюшка' && corushka) corushka.style.opacity = 1;
        if (chosenFish.name === 'много корюшки' && someCorushk) someCorushk.style.opacity = 1;
        if (chosenFish.name === 'окунь' && okun) okun.style.opacity = 1;
        if (chosenFish.name === 'лещ' && lesh) lesh.style.opacity = 1;
        if (chosenFish.name === 'осьминог' && osminog) osminog.style.opacity = 1;
        if (chosenFish.name === 'щука' && shuka) shuka.style.opacity = 1;
        if (chosenFish.name === 'лосось' && losoc) losoc.style.opacity = 1;
        if (chosenFish.name === 'акула' && shark) shark.style.opacity = 1;
        if (chosenFish.name === 'кит' && kit) kit.style.opacity = 1;
        if (chosenFish.name === 'золотая рыбка' && goldFish) goldFish.style.opacity = 1;

        await wait(5);

        if (plotva) plotva.style.opacity = 0;
        if (corushka) corushka.style.opacity = 0;
        if (someCorushk) someCorushk.style.opacity = 0;
        if (osminog) osminog.style.opacity = 0;
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
// ВСПОМОГАТЕЛЬНАЯ ФУНКЦИЯ ДЛЯ ВИЗУАЛА КНОПОК
// =========================================================================
function setBtnBought(btn) {
    if (btn) {
        btn.textContent = 'Куплено';
        btn.style.backgroundColor = 'green';
    }
}

// =========================================================================
// МАГАЗИН: УДОЧКА LVL 2
// =========================================================================
function LvlTwoFish() {
    let buyBtn = document.querySelector('#fishingLvlTwo');

    if (money >= 1000 && rodLvl === 1) {
        money = money - 1000;
        rodLvl = 2;
        minClickFish = 15;
        maxClickFish = 40;
        silaThrow = silaThrow + 3; 
        
        localStorage.setItem('silaThrow', silaThrow);
        localStorage.setItem('fishing_money', money);
        localStorage.setItem('fishing_rod_lvl', rodLvl);

        if (fishing) {
            fishing.src = 'https://gstatic.com';
        }
        if (moneyCount) moneyCount.textContent = money;
        setBtnBought(buyBtn);
        
        alert('Удочка 2-го уровня успешно куплена! Заброс и клики стали легче. 🎣');
    } else if (rodLvl >= 2) {
        alert('Эта удочка или более улучшенная уже куплена!');
    } else {
        alert('Недостаточно монет! Требуется 1000 🪙');
    }
}

// =========================================================================
// МАГАЗИН: УДОЧКА LVL 3
// =========================================================================
function LvlThreeFish() {
    let buyBtnThree = document.querySelector('#fishingLvlThree'); 

    if (money >= 3000 && rodLvl === 2) {
        money = money - 3000;
        rodLvl = 3;
        minClickFish = 10;
        maxClickFish = 30;
        silaThrow = silaThrow + 5; 
        
        localStorage.setItem('silaThrow', silaThrow);
        localStorage.setItem('fishing_money', money);
        localStorage.setItem('fishing_rod_lvl', rodLvl);

        if (fishing) {
            fishing.src = 'https://gstatic.com'; 
        }
        if (moneyCount) moneyCount.textContent = money;
        setBtnBought(buyBtnThree);
        
        alert('Удочка 3-го уровня успешно куплена! Клик по поплавку стал гораздо легче. 🎣');
    } else if (rodLvl >= 3) {
        alert('Эта удочка или более улучшенная уже куплена!');
    } else if (rodLvl < 2) {
        alert('Сначала нужно купить удочку 2-го уровня!');
    } else {
        alert('Недостаточно монет! Требуется 3000 🪙');
    }
}

// =========================================================================
// МАГАЗИН: УДОЧКА LVL 4
// =========================================================================
function LvlFourFish() {
    let buyBtnFour = document.querySelector('#fishingLvlFour');

    if (money >= 7000 && rodLvl === 3) {
        money = money - 5000;
        rodLvl = 4;
        minClickFish = 8;
        maxClickFish = 25;
        silaThrow = silaThrow + 5; 
        
        localStorage.setItem('silaThrow', silaThrow);
        localStorage.setItem('fishing_money', money);
        localStorage.setItem('fishing_rod_lvl', rodLvl);

        if (fishing) {
            fishing.src = 'https://gstatic.com';
        }
        if (moneyCount) moneyCount.textContent = money;
        setBtnBought(buyBtnFour);
        
        alert('Удочка 4-го уровня успешно куплена! Вы гроза морей! 🏆🎣');
    } else if (rodLvl >= 4) {
        alert('Эта удочка уже куплена!');
    } else if (rodLvl < 3) {
        alert('Сначала нужно купить удочку 3-го уровня!');
    } else {
        alert('Недостаточно монет! Требуется 5000 🪙');
    }
}

// =========================================================================
// МАГАЗИН: УДОЧКА LVL 5
// =========================================================================
function LvlFiveFish() {
    let buyBtnFive = document.querySelector('#fishingLvlFive');

    if (money >= 7000 && rodLvl === 4) {
        money = money - 7000;
        rodLvl = 5;
        minClickFish = 5;
        maxClickFish = 20;
        silaThrow = silaThrow + 5; 
        
        localStorage.setItem('silaThrow', silaThrow);
        localStorage.setItem('fishing_money', money);
        localStorage.setItem('fishing_rod_lvl', rodLvl);

        if (fishing) {
            fishing.src = 'https://gstatic.com';
        }
        if (moneyCount) moneyCount.textContent = money;
        setBtnBought(buyBtnFour);
        
        alert('Максимальная удочка 5-го уровня успешно куплена! Вы гроза морей! 🏆🎣');
    } else if (rodLvl >= 5) {
        alert('Эта удочка уже куплена!');
    } else if (rodLvl < 4) {
        alert('Сначала нужно купить удочку 4-го уровня!');
    } else {
        alert('Недостаточно монет! Требуется 7000 🪙');
    }
}

// =========================================================================
// ИНИЦИАЛИЗАЦИЯ И НАЗНАЧЕНИЕ КЛИКОВ
// =========================================================================
window.addEventListener('DOMContentLoaded', () => {
    let buyBtn2 = document.querySelector('#fishingLvlTwo'); 
    let buyBtn3 = document.querySelector('#fishingLvlThree'); 
    let buyBtn4 = document.querySelector('#fishingLvlFour');
    let buyBtn5 = document.querySelector('#fishingLvlFive');

    if (buyBtn2) {
        if (rodLvl >= 2) setBtnBought(buyBtn2);
        buyBtn2.onclick = LvlTwoFish;
    }

    if (buyBtn3) {
        if (rodLvl >= 3) setBtnBought(buyBtn3);
        buyBtn3.onclick = LvlThreeFish;
    }

    if (buyBtn4) {
        if (rodLvl >= 4) setBtnBought(buyBtn4); 
        buyBtn4.onclick = LvlFourFish;
    }
    if (buyBtn4) {
        if (rodLvl >= 5) setBtnBought(buyBtn5); 
        buyBtn5.onclick = LvlFiveFish;
    }
});
