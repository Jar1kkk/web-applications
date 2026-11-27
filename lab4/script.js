const words = ['дурень', 'погано', 'жах', 'лінь', 'спам', 'нудно', 'крик', 'брехня', 'сварка', 'сміття'];

function getWeekDay(date) {
    const days = ['НД', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
    return days[date.getDay()];
}

// month: 0 - січень, 11 - грудень
function getLastDayOfMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

function isValidPhone(phone) {
    return /^\+38\(\d{3}\)\d{2}-\d{2}-\d{3}$/.test(phone);
}

function swapName(fullName) {
    const [lastName, firstName] = fullName.trim().split(/\s+/);
    return firstName ? `${firstName} ${lastName}` : null;
}

function censor(text) {
    const pattern = new RegExp('(?<!\\p{L})(' + words.join('|') + ')(?!\\p{L})', 'giu');
    return text.replace(pattern, '*');
}

function show(id, message) {
    document.getElementById(id).textContent = message;
}

const value = (id) => document.getElementById(id).value;
const onClick = (id, handler) => document.getElementById(id).addEventListener('click', handler);

onClick('show-date', () => {
    const date = new Date(2014, 9, 8, 12, 9);
    show('out-date', date.toString());
    alert(date);
});

onClick('show-week', () => {
    const [year, month, day] = value('week-input').split('-').map(Number);
    const result = getWeekDay(new Date(year, month - 1, day));
    show('out-week', result);
    alert(result);
});

onClick('show-last', () => {
    const result = getLastDayOfMonth(Number(value('year')), Number(value('month')) - 1);
    show('out-last', `Останній день місяця: ${result}`);
});

onClick('check', () => {
    const phone = value('phone').trim();
    const message = isValidPhone(phone)
        ? `Дякуємо! Ваш номер ${phone} підтверджено.`
        : 'Номер введено невірно.';
    show('out-phone', message);
    alert(message);
});

onClick('swap', () => {
    const message = swapName(value('name')) ?? 'Введіть прізвище та ім’я через пробіл.';
    show('out-name', message);
    alert(message);
});

onClick('censor', () => {
    show('out-text', censor(value('text')));
});
