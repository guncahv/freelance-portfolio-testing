import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';
import { sendMessage } from '../../api/messages';

// Модуль API заменяется моком: тест не делает настоящих сетевых запросов
jest.mock('../../api/messages', () => ({
  sendMessage: jest.fn(),
}));

async function fillForm(user, { name, email, message }) {
  await user.type(screen.getByLabelText('Ваше имя'), name);
  await user.type(screen.getByLabelText('Email'), email);
  await user.type(screen.getByLabelText('Сообщение'), message);
}

describe('ContactForm', () => {
  beforeEach(() => {
    sendMessage.mockReset();
  });

  it('показывает ошибки валидации и не отправляет неверно заполненную форму', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await fillForm(user, { name: 'А', email: 'anna@', message: 'Привет' });
    await user.click(screen.getByRole('button', { name: 'Отправить' }));

    expect(screen.getByText('Введите имя (не менее 2 символов)')).toBeInTheDocument();
    expect(screen.getByText('Введите корректный email, например name@example.com')).toBeInTheDocument();
    expect(screen.getByText('Сообщение должно содержать не менее 10 символов')).toBeInTheDocument();
    expect(sendMessage).not.toHaveBeenCalled();
  });

  it('отправляет данные через API (мок) и показывает сообщение об успехе', async () => {
    sendMessage.mockResolvedValue({ _id: 'mock-1' });
    const user = userEvent.setup();
    render(<ContactForm />);

    await fillForm(user, { name: 'Анна', email: 'anna@mail.ru', message: 'Нужен лендинг для кафе' });
    await user.click(screen.getByRole('button', { name: 'Отправить' }));

    expect(sendMessage).toHaveBeenCalledTimes(1);
    expect(sendMessage).toHaveBeenCalledWith({ name: 'Анна', email: 'anna@mail.ru', message: 'Нужен лендинг для кафе' });
    expect(await screen.findByText('Сообщение отправлено!')).toBeInTheDocument();
    expect(screen.getByLabelText('Ваше имя')).toHaveValue('');
  });

  it('показывает ошибку, если сервер не принял сообщение', async () => {
    sendMessage.mockRejectedValue(new Error('Ошибка сервера (500)'));
    const user = userEvent.setup();
    render(<ContactForm />);

    await fillForm(user, { name: 'Анна', email: 'anna@mail.ru', message: 'Нужен лендинг для кафе' });
    await user.click(screen.getByRole('button', { name: 'Отправить' }));

    expect(await screen.findByRole('alert')).toHaveTextContent('Не удалось отправить сообщение: Ошибка сервера (500)');
    expect(screen.getByLabelText('Ваше имя')).toHaveValue('Анна');
  });
});
