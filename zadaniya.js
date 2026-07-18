const readline = require('readline');

// Цифры для отображения звёздочками (5 строк x 3 символа)
const DIGITS = {
  '0': [
    '***',
    '* *',
    '* *',
    '* *',
    '***'
  ],
  '1': [
    '  *',
    '  *',
    '  *',
    '  *',
    '  *'
  ],
  '2': [
    '***',
    '  *',
    '***',
    '*  ',
    '***'
  ],
  '3': [
    '***',
    '  *',
    '***',
    '  *',
    '***'
  ],
  '4': [
    '* *',
    '* *',
    '***',
    '  *',
    '  *'
  ],
  '5': [
    '***',
    '*  ',
    '***',
    '  *',
    '***'
  ],
  '6': [
    '***',
    '*  ',
    '***',
    '* *',
    '***'
  ],
  '7': [
    '***',
    '  *',
    '  *',
    '  *',
    '  *'
  ],
  '8': [
    '***',
    '* *',
    '***',
    '* *',
    '***'
  ],
  '9': [
    '***',
    '* *',
    '***',
    '  *',
    '***'
  ]
};

/**
 * Определяет день недели для введенной даты
 * @param {number} day - День
 * @param {number} month - Месяц
 * @param {number} year - Год
 * @returns {string} Название дня недели
 */
function get_day_of_week(day, month, year) {
  const date = new Date(year, month - 1, day);
  const weekDays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  return weekDays[date.getDay()];
}

/**
 * Определяет, является ли год високосным
 * @param {number} year - Год
 * @returns {boolean} true, если год високосный
 */
function is_leap_year(year) {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

/**
 * Определяет возраст пользователя
 * @param {number} birth_year - Год рождения
 * @param {number} birth_month - Месяц рождения
 * @param {number} birth_day - День рождения
 * @returns {number} Количество полных лет
 */
function calculate_age(birth_year, birth_month, birth_day) {
  const today = new Date();
  const birthDate = new Date(birth_year, birth_month - 1, birth_day);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

/**
 * Форматирует дату рождения с использованием звёздочек
 * @param {number} day - День
 * @param {number} month - Месяц
 * @param {number} year - Год
 * @returns {string} Отформатированное представление даты
 */
function format_date(day, month, year) {
  const dayStr = String(day).padStart(2, '0');
  const monthStr = String(month).padStart(2, '0');
  const yearStr = String(year);
  const dateStr = `${dayStr} ${monthStr} ${yearStr}`;

  const lines = ['', '', '', '', ''];
  for (const char of dateStr) {
    if (char === ' ') {
      for (let i = 0; i < 5; i++) {
        lines[i] += '   ';
      }
    } else if (DIGITS[char]) {
      const digit = DIGITS[char];
      for (let i = 0; i < 5; i++) {
        lines[i] += digit[i] + ' ';
      }
    }
  }
  return lines.join('\n');
}

/**
 * Основная функция программы.
 * Запрашивает у пользователя день, месяц и год рождения,
 * вызывает все остальные функции и выводит результаты.
 */
function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Введите день вашего рождения: ', (dayInput) => {
    const day = parseInt(dayInput, 10);

    rl.question('Введите месяц вашего рождения: ', (monthInput) => {
      const month = parseInt(monthInput, 10);

      rl.question('Введите год вашего рождения: ', (yearInput) => {
        const year = parseInt(yearInput, 10);

        console.log('\n' + '='.repeat(40));
        console.log('РЕЗУЛЬТАТЫ');
        console.log('='.repeat(40));

        // День недели
        const weekDay = get_day_of_week(day, month, year);
        console.log(`\n День недели рождения: ${weekDay}`);

        // Високосный год
        const leap = is_leap_year(year);
        console.log(`${year} год ${leap ? 'является високосным' : 'не является високосным'}`);

        // Возраст
        const age = calculate_age(year, month, day);
        console.log(`Вам ${age} лет`);

        // Дата рождения звёздочками
        console.log(`\n Дата рождения на табло:\n`);
        console.log(format_date(day, month, year));

        rl.close();
      });
    });
  });
}

// Запуск программы
main();
