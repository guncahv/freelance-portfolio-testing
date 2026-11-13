import { validateEmail, validateContactForm } from './validators';

describe('validateEmail — функция-валидатор email', () => {
  it.each(['name@example.com', 'anna.petrova@mail.ru', 'dev+portfolio@sub.domain.by', '  user@site.org  '])(
    'принимает корректный адрес «%s»',
    (email) => {
      expect(validateEmail(email)).toBe(true);
    },
  );

  it.each([
    ['пустая строка', ''],
    ['нет символа @', 'name.example.com'],
    ['нет домена', 'name@'],
    ['нет имени', '@example.com'],
    ['нет доменной зоны', 'name@example'],
    ['пробел внутри', 'na me@example.com'],
    ['два символа @', 'name@@example.com'],
  ])('отклоняет адрес: %s', (_, email) => {
    expect(validateEmail(email)).toBe(false);
  });

  it('возвращает false, если передана не строка', () => {
    expect(validateEmail(undefined)).toBe(false);
    expect(validateEmail(null)).toBe(false);
    expect(validateEmail(42)).toBe(false);
  });
});

describe('validateContactForm — проверка формы контактов', () => {
  it('не возвращает ошибок для правильно заполненной формы', () => {
    const errors = validateContactForm({ name: 'Анна', email: 'anna@mail.ru', message: 'Нужен лендинг для кафе' });
    expect(errors).toEqual({});
  });

  it('возвращает ошибку для каждого неверного поля', () => {
    const errors = validateContactForm({ name: 'А', email: 'anna@', message: 'Привет' });
    expect(Object.keys(errors)).toEqual(['name', 'email', 'message']);
    expect(errors.email).toMatch(/корректный email/);
  });
});
