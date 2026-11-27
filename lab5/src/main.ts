function getElement<T extends HTMLElement>(selector: string): T {
    const element = document.querySelector<T>(selector);
    if (element === null) {
        throw new Error(`Немає елемента ${selector}`);
    }
    return element;
}

// ---------- п. 7-8. Множення ----------
function multiply(x: number, y: number): number {
    return x * y;
}

// Виклик multiply("2", 3) дає помилку компілятора:
// error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.
// Пояснення: перший параметр має тип number, а передано рядок. TypeScript не перетворює
// типи сам, тому рядок треба явно перетворити на число.
multiply(Number("2"), 3);

const xInput = getElement<HTMLInputElement>("#x");
const yInput = getElement<HTMLInputElement>("#y");
const productOutput = getElement<HTMLParagraphElement>("#product");

getElement<HTMLButtonElement>("#calculate").addEventListener("click", () => {
    const x = Number(xInput.value);
    const y = Number(yInput.value);
    if (xInput.value.trim() === "" || yInput.value.trim() === "" || Number.isNaN(x) || Number.isNaN(y)) {
        productOutput.textContent = "Введіть два числа.";
        return;
    }
    productOutput.textContent = `Результат: ${multiply(x, y)}`;
});

// ---------- п. 9. Функції з лабораторної роботи №4 ----------
function getWeekDay(date: Date): string {
    const days = ["НД", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];
    return days[date.getDay()];
}

// month: 0 - січень, 11 - грудень
function getLastDayOfMonth(year: number, month: number): number {
    return new Date(year, month + 1, 0).getDate();
}

function isValidPhone(phone: string): boolean {
    return /^\+38\(\d{3}\)\d{2}-\d{2}-\d{3}$/.test(phone);
}

console.log(getWeekDay(new Date(2024, 0, 3)), getLastDayOfMonth(2024, 1));

// ---------- п. 10. Телефон ----------
const phoneInput = getElement<HTMLInputElement>("#phone");
const checkButton = getElement<HTMLButtonElement>("#check-phone");
const phoneResult = getElement<HTMLParagraphElement>("#phone-result");

checkButton.addEventListener("click", () => {
    const phone = phoneInput.value.trim();
    phoneResult.textContent = isValidPhone(phone)
        ? `Дякуємо! Ваш номер ${phone} підтверджено.`
        : "Номер введено невірно.";
});

// ---------- п. 11-12. Студенти ----------
interface Student {
    id: number;
    fullName: string;
    group: string;
    averageMark: number;
    email?: string;
}

// Повідомлення компілятора для студента без fullName:
// error TS2741: Property 'fullName' is missing in type '{ id: number; group: string; averageMark: number; }'
// but required in type 'Student'.
// Повідомлення для averageMark: "4.5":
// error TS2322: Type 'string' is not assignable to type 'number'.
// Об'єкти виправлено: додано fullName, а середній бал записано числом.
const students: Student[] = [
    { id: 1, fullName: "Андрієнко Олег", group: "9ПМ-4", averageMark: 4.6 },
    { id: 2, fullName: "Бондар Ірина", group: "9ПМ-4", averageMark: 3.8, email: "bondar@example.com" },
    { id: 3, fullName: "Василенко Максим", group: "9ПМ-4", averageMark: 4.0 },
    { id: 4, fullName: "Гнатюк Софія", group: "9ПМ-4", averageMark: 4.9 },
    { id: 5, fullName: "Дмитрук Назар", group: "9ПМ-4", averageMark: 3.5 },
];

function filterByMark(list: Student[], minMark: number): Student[] {
    return list.filter((student) => student.averageMark >= minMark);
}

const studentList = getElement<HTMLUListElement>("#students");
for (const student of filterByMark(students, 4)) {
    const item = document.createElement("li");
    item.textContent = `${student.fullName} (${student.group}): ${student.averageMark}`;
    studentList.append(item);
}

// ---------- п. 13-16. Курс валют НБУ ----------
type Currency = "USD" | "EUR" | "PLN";

interface NbuRate {
    cc: string;
    txt: string;
    rate: number;
    exchangedate: string;
}

async function loadRate(currency: Currency): Promise<NbuRate> {
    const url = `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=${currency}&json`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Помилка запиту: ${response.status}`);
    }
    const data: NbuRate[] = await response.json();
    if (data.length === 0) {
        throw new Error("НБУ не повернув даних про цю валюту.");
    }
    return data[0];
}

// Дата у форматі ДД.ММ.РРРР -> Date, або null, якщо рядок некоректний
function parseNbuDate(text: string): Date | null {
    const match = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(text);
    if (match === null) {
        return null;
    }
    const [, day, month, year] = match.map(Number);
    const date = new Date(year, month - 1, day);
    return date.getDate() === day && date.getMonth() === month - 1 ? date : null;
}

const currencySelect = getElement<HTMLSelectElement>("#currency");
const amountInput = getElement<HTMLInputElement>("#amount");
const statusOutput = getElement<HTMLParagraphElement>("#status");
const rateTable = getElement<HTMLTableElement>("#rate-table");
const rateBody = getElement<HTMLTableSectionElement>("#rate-body");
const convertedOutput = getElement<HTMLParagraphElement>("#converted");

getElement<HTMLButtonElement>("#show-rate").addEventListener("click", async () => {
    // варіанти списку задані нами, тому приведення типу допустиме
    const currency = currencySelect.value as Currency;
    statusOutput.textContent = "Завантаження...";
    rateTable.hidden = true;
    convertedOutput.textContent = "";

    try {
        const rate = await loadRate(currency);
        const date = parseNbuDate(rate.exchangedate);
        const dateText = date === null ? rate.exchangedate : `${rate.exchangedate} (${getWeekDay(date)})`;

        const row = document.createElement("tr");
        for (const value of [rate.cc, rate.txt, String(rate.rate), dateText]) {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.append(cell);
        }
        rateBody.replaceChildren(row);
        rateTable.hidden = false;
        statusOutput.textContent = "";

        const amount = Number(amountInput.value);
        convertedOutput.textContent = `${amount} грн = ${(amount / rate.rate).toFixed(2)} ${rate.cc}`;
    } catch (error) {
        statusOutput.textContent = error instanceof Error ? error.message : String(error);
    }
});
