import { test, expect } from '@playwright/test';

/**
 * E2E-сценарий «Отправка сообщения» (вариант 1):
 * пользователь заходит на страницу контактов, заполняет поля формы (имя, email, сообщение),
 * нажимает «Отправить» и видит сообщение об успешной отправке.
 * Запрос к API (ЛР №28) перехватывается page.route() и возвращает заранее заданный ответ.
 */
test.describe('Сценарий «Отправка сообщения»', () => {
  test('пользователь отправляет сообщение со страницы контактов', async ({ page }) => {
    const formData = {
      name: 'Анна Петрова',
      email: 'anna@mail.ru',
      message: 'Здравствуйте! Нужен лендинг для кафе, срок — 2 недели.',
    };
    let requestBody = null;

    // Мок API: POST /api/messages → 201 Created
    await page.route('**/api/messages', async (route) => {
      expect(route.request().method()).toBe('POST');
      requestBody = route.request().postDataJSON();
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({ _id: 'e2e-mock-id', ...requestBody, createdAt: '2026-11-13T10:00:00.000Z' }),
      });
    });

    await test.step('1. Открыть главную страницу', async () => {
      await page.goto('/');
      await expect(page.getByRole('heading', { level: 1 })).toHaveText('Создаю быстрые веб-приложения под ключ');
    });

    await test.step('2. Перейти на страницу «Контакты» через меню', async () => {
      const menu = page.getByRole('navigation', { name: 'Главное меню' });
      // на узком экране меню свёрнуто — раскрываем его кнопкой-«бургером»
      const toggle = page.getByRole('button', { name: 'Открыть меню' });
      if (await toggle.isVisible()) await toggle.click();
      await menu.getByRole('link', { name: 'Контакты' }).click();

      await expect(page).toHaveURL(/\/contacts$/);
      await expect(page.getByRole('heading', { level: 1 })).toHaveText('Контакты');
    });

    await test.step('3. Заполнить поля формы', async () => {
      await page.getByLabel('Ваше имя').fill(formData.name);
      await page.getByLabel('Email').fill(formData.email);
      await page.getByLabel('Сообщение').fill(formData.message);
      await expect(page.getByLabel('Email')).toHaveValue(formData.email);
    });

    await test.step('4. Нажать «Отправить»', async () => {
      await page.getByRole('button', { name: 'Отправить' }).click();
    });

    await test.step('5. Проверить сообщение об успешной отправке', async () => {
      const success = page.getByRole('status').filter({ hasText: 'Сообщение отправлено!' });
      await expect(success).toBeVisible();
      await expect(success).toContainText('Спасибо, отвечу в течение рабочего дня.');
      // форма очищена, а на «сервер» ушли введённые данные
      await expect(page.getByLabel('Ваше имя')).toHaveValue('');
      expect(requestBody).toEqual(formData);
    });
  });
});
