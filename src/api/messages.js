// Клиент API (ЛР №28). Запросы идут на относительный путь /api/...,
// в режиме разработки Vite проксирует их на Express-сервер http://localhost:5000.

/**
 * Отправка сообщения из формы контактов: POST /api/messages.
 * При ответе с кодом ошибки выбрасывает исключение с текстом от сервера.
 */
export async function sendMessage({ name, email, message }) {
  const response = await fetch('/api/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, message }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || `Ошибка сервера (${response.status})`);
  }
  return data;
}
