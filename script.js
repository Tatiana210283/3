let points = 0;
let currentLevel = 0;

function addPoints(p) {
    points += p;
    document.getElementById("points").textContent = "Очки: " + points;
}

function catSay(t) {
    document.getElementById("catText").textContent = t;
}

function toggleMusic() {
    const m = document.getElementById("bgMusic");
    m.paused ? m.play() : m.pause();
}

function openMap() {
    document.getElementById("menu").classList.add("hidden");
    document.getElementById("map").classList.remove("hidden");
}

function backToMenu() {
    document.getElementById("map").classList.add("hidden");
    document.getElementById("menu").classList.remove("hidden");
}

function backToMap() {
    document.getElementById("game").classList.add("hidden");
    document.getElementById("map").classList.remove("hidden");
    document.getElementById("hud").classList.remove("hidden");
}

/* ---------- ЗАПУСК УРОВНЯ ---------- */

function startLevel(n) {
    currentLevel = n;
    document.getElementById("map").classList.add("hidden");
    document.getElementById("game").classList.remove("hidden");
    document.getElementById("hud").classList.remove("hidden");
    loadLevel(n);
}

/* ---------- ГЕНЕРАЦИЯ УРОВНЕЙ ---------- */

function loadLevel(n) {
    const title = document.getElementById("levelTitle");
    const content = document.getElementById("levelContent");
    selected = []; // сбрасываем выбор

    switch (n) {
        case 1:
            title.textContent = "Уровень 1: Надёжный пароль";
            content.innerHTML = `
                <p>Создай пароль (8+ символов, латинские буквы+цифры)</p>
                <input id="pass">
                <button class="btn" onclick="checkPass()">Проверить</button>
                <p id="res"></p>
            `;
            catSay("Начинаем. Создай сильный пароль.");
            break;

        case 2:
            title.textContent = "Уровень 2: Фишинг";
            content.innerHTML = `
                <p>Выбери фишинговые письма:</p>
                <div class="opt" data-good="true" onclick="toggleOpt(this)">"Ваш аккаунт заблокирован"</div>
                <div class="opt" data-good="false" onclick="toggleOpt(this)">"Школьное расписание"</div>
                <div class="opt" data-good="true" onclick="toggleOpt(this)">"Вы выиграли миллион"</div>
                <button class="btn" onclick="checkPhish()">Проверить</button>
                <p id="res"></p>
            `;
            catSay("Сканирую входящие… найди угрозы.");
            break;

        case 3:
            title.textContent = "Уровень 3: Поймай вирусы";
            content.innerHTML = `
                <p>Кликай по вирусам 10 секунд</p>
                <div id="area"></div>
                <p>Время: <span id="timer">10</span></p>
                <p>Поймано: <span id="score">0</span></p>
                <button class="btn" onclick="startVirus()">Старт</button>
            `;
            catSay("Вирусы активны. Уничтожь их.");
            break;

        case 4:
            title.textContent = "Уровень 4: Личная информация";
            content.innerHTML = `
                <p>Что можно публиковать?</p>
                <div class="opt" data-good="false" onclick="toggleOpt(this)">Адрес</div>
                <div class="opt" data-good="false" onclick="toggleOpt(this)">Телефон</div>
                <div class="opt" data-good="true" onclick="toggleOpt(this)">Фото кота</div>
                <div class="opt" data-good="true" onclick="toggleOpt(this)">Рисунок</div>
                <button class="btn" onclick="checkInfo()">Проверить</button>
                <p id="res"></p>
            `;
            catSay("Не всё можно выкладывать в сеть.");
            break;

        case 5:
            title.textContent = "Уровень 5: Защита";
            content.innerHTML = `
                <p>Выбери безопасные действия</p>
                <div class="opt" data-good="true" onclick="toggleOpt(this)">Обновления</div>
                <div class="opt" data-good="true" onclick="toggleOpt(this)">Антивирус</div>
                <div class="opt" data-good="false" onclick="toggleOpt(this)">Скачивать всё подряд</div>
                <div class="opt" data-good="false" onclick="toggleOpt(this)">Отключить защиту</div>
                <button class="btn" onclick="checkActions()">Проверить</button>
                <p id="res"></p>
            `;
            catSay("Выбери, что усиливает защиту.");
            break;

        case 6:
            title.textContent = "Уровень 6: Безопасный сайт";
            content.innerHTML = `
                <p>Выбери безопасный URL</p>
                <div class="opt" data-good="true" onclick="singleChoice(this)">https://school.edu</div>
                <div class="opt" data-good="false" onclick="singleChoice(this)">http://free-money.ru</div>
                <div class="opt" data-good="false" onclick="singleChoice(this)">http://vk-login.net</div>
                <button class="btn" onclick="checkSafeURL()">Проверить</button>
                <p id="res"></p>
            `;
            catSay("Проверь протокол и домен.");
            break;

        case 7:
            title.textContent = "Уровень 7: Разрешения приложений";
            content.innerHTML = `
                <p>Какие разрешения безопасны?</p>
                <div class="opt" data-good="true" onclick="singleChoice(this)">Доступ к камере для видеозвонка</div>
                <div class="opt" data-good="false" onclick="singleChoice(this)">Доступ к SMS</div>
                <div class="opt" data-good="false" onclick="singleChoice(this)">Доступ к контактам</div>
                <button class="btn" onclick="checkPermissions()">Проверить</button>
                <p id="res"></p>
            `;
            catSay("Некоторые разрешения опасны.");
            break;

        case 8:
            title.textContent = "Уровень 8: Логин";
            content.innerHTML = `
                <p>Выбери безопасный логин</p>
                <div class="opt" data-good="false" onclick="singleChoice(this)">ivan2009</div>
                <div class="opt" data-good="false" onclick="singleChoice(this)">ivan_petrov_12</div>
                <div class="opt" data-good="true" onclick="singleChoice(this)">cyberfox_x7</div>
                <button class="btn" onclick="checkLogin()">Проверить</button>
                <p id="res"></p>
            `;
            catSay("Логин не должен раскрывать личные данные.");
            break;

        case 9:
            title.textContent = "Уровень 9: Соцсети";
            content.innerHTML = `
                <p>Что можно выкладывать?</p>
                <div class="opt" data-good="false" onclick="singleChoice(this)">Фото паспорта</div>
                <div class="opt" data-good="false" onclick="singleChoice(this)">Адрес школы</div>
                <div class="opt" data-good="true" onclick="singleChoice(this)">Фото природы</div>
                <button class="btn" onclick="checkSocial()">Проверить</button>
                <p id="res"></p>
            `;
            catSay("Будь осторожен в соцсетях.");
            break;

        case 10:
            title.textContent = "Уровень 10: Кибербуллинг";
            content.innerHTML = `
                <p>Как правильно реагировать?</p>
                <div class="opt" data-good="true" onclick="singleChoice(this)">Сказать взрослым</div>
                <div class="opt" data-good="false" onclick="singleChoice(this)">Ответить грубо</div>
                <div class="opt" data-good="false" onclick="singleChoice(this)">Игнорировать навсегда</div>
                <button class="btn" onclick="checkBullying()">Проверить</button>
                <p id="res"></p>
            `;
            catSay("Правильная реакция важна.");
            break;
    }
}
function toggleMusic() {
    const m = document.getElementById("bgMusic");
    m.paused ? m.play() : m.pause();
}
/* ---------- ВЫБОР ОПЦИЙ ---------- */

let selected = [];

// для множественного выбора (2 правильных, как в 2,4,5)
function toggleOpt(el) {
    const good = el.getAttribute("data-good") === "true";
    el.classList.toggle("sel");

    const idx = selected.findIndex(x => x.el === el);
    if (idx !== -1) {
        selected.splice(idx, 1);
    } else {
        selected.push({ el, good });
    }
}

// для одиночного выбора (6–10)
function singleChoice(el) {
    document.querySelectorAll(".opt").forEach(o => o.classList.remove("sel"));
    el.classList.add("sel");
    selected = [{ el, good: el.getAttribute("data-good") === "true" }];
}

/* ---------- ОБЩИЕ РЕЗУЛЬТАТЫ ---------- */

function levelPassed() {
    addPoints(20);
    catSay("Уровень пройден.");
    selected = [];
    if (currentLevel === 10) {
        finishGame();
    } else {
        startLevel(currentLevel + 1);
    }
}

function levelFailed(msg = "Ошибка. Попробуй снова.") {
    document.getElementById("res").textContent = msg;
    catSay("Ошибка. Попробуй ещё раз.");
}

/* ---------- ПРОВЕРКИ УРОВНЕЙ ---------- */

function checkPass() {
    const v = document.getElementById("pass").value;
    if (v.length >= 8 && /\d/.test(v) && /[a-zA-Z]/.test(v)) {
        levelPassed();
    } else {
        levelFailed("Пароль слабый.");
    }
}

function checkPhish() {
    const good = selected.filter(x => x.good).length;
    const bad = selected.filter(x => !x.good).length;
    if (good === 2 && bad === 0) levelPassed();
    else levelFailed();
}

function checkInfo() {
    const good = selected.filter(x => x.good).length;
    const bad = selected.filter(x => !x.good).length;
    if (good === 2 && bad === 0) levelPassed();
    else levelFailed();
}

function checkActions() {
    const good = selected.filter(x => x.good).length;
    const bad = selected.filter(x => !x.good).length;
    if (good === 2 && bad === 0) levelPassed();
    else levelFailed();
}

function checkSafeURL() {
    if (selected.length === 1 && selected[0].good) levelPassed();
    else levelFailed();
}

function checkPermissions() {
    if (selected.length === 1 && selected[0].good) levelPassed();
    else levelFailed();
}

function checkLogin() {
    if (selected.length === 1 && selected[0].good) levelPassed();
    else levelFailed();
}

function checkSocial() {
    if (selected.length === 1 && selected[0].good) levelPassed();
    else levelFailed();
}

function checkBullying() {
    if (selected.length === 1 && selected[0].good) levelPassed();
    else levelFailed();
}

/* ---------- УРОВЕНЬ 3: ВИРУСЫ ---------- */

let virusTimer = null;
let virusTimeLeft = 0;
let virusScore = 0;

function startVirus() {
    const area = document.getElementById("area");
    area.innerHTML = "";
    virusScore = 0;
    virusTimeLeft = 10;
    document.getElementById("score").textContent = virusScore;
    document.getElementById("timer").textContent = virusTimeLeft;

    if (virusTimer) clearInterval(virusTimer);

    spawnVirus();

    virusTimer = setInterval(() => {
        virusTimeLeft--;
        document.getElementById("timer").textContent = virusTimeLeft;
        if (virusTimeLeft <= 0) {
            clearInterval(virusTimer);
            area.innerHTML = "";
            endVirusLevel();
        }
    }, 1000);
}

function spawnVirus() {
    if (virusTimeLeft <= 0) return;
    const area = document.getElementById("area");
    const v = document.createElement("div");
    v.className = "virus";
    v.style.left = Math.random() * 290 + "px";
    v.style.top = Math.random() * 170 + "px";
    v.onclick = () => {
        virusScore++;
        document.getElementById("score").textContent = virusScore;
        v.remove();
    };
    area.appendChild(v);

    setTimeout(() => {
        if (v.parentElement) v.remove();
        if (virusTimeLeft > 0) spawnVirus();
    }, 800);
}

function endVirusLevel() {
    if (virusScore >= 5) {
        addPoints(virusScore * 2);
        levelPassed();
    } else {
        levelFailed("Мало вирусов поймано. Нужно минимум 5.");
    }
}

/* ---------- ФИНАЛ ---------- */

function finishGame() {
    document.getElementById("game").classList.add("hidden");
    document.getElementById("hud").classList.add("hidden");
    document.getElementById("final").classList.remove("hidden");
    document.getElementById("finalScore").textContent =
        "Твой итоговый счёт: " + points;
    catSay("Миссия выполнена. Город в безопасности.");
}
// Регулировка громкости
const volumeSlider = document.getElementById("volumeControl");
const music = document.getElementById("bgMusic");

volumeSlider.addEventListener("input", () => {
    music.volume = volumeSlider.value;
});