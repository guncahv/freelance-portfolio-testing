// Функции-валидаторы формы обратной связи (бизнес-логика, покрытая unit-тестами).

const EMAIL_PATTERN = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/;

/**
 * Проверка email: строка вида имя@домен.зона без пробелов.
 * Пробелы по краям игнорируются.
 */
export function validateEmail(email) {
  if (typeof email !== 'string') return false;
  return EMAIL_PATTERN.test(email.trim());
}

/**
 * Проверка всей формы контактов. Возвращает объект ошибок:
 * пустой объект — форма заполнена правильно.
 */
export function validateContactForm({ name = '', email = '', message = '' }) {
  const errors = {};
  if (name.trim().length < 2) errors.name = 'Введите имя (не менее 2 символов)';
  if (!validateEmail(email)) errors.email = 'Введите корректный email, например name@example.com';
  if (message.trim().length < 10) errors.message = 'Сообщение должно содержать не менее 10 символов';
  return errors;
}
