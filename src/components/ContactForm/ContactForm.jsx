import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import FormField from '../FormField/FormField';
import AppButton from '../AppButton/AppButton';
import { validateContactForm } from '../../utils/validators';
import { sendMessage } from '../../api/messages';
import contactIcon from '../../assets/icon-contact.svg';
import aboutIcon from '../../assets/icon-about.svg';
import arrowIcon from '../../assets/icon-arrow-right.svg';

const EMPTY_FORM = { name: '', email: '', message: '' };

/**
 * Форма «Связаться со мной»: имя, email, сообщение.
 * Перед отправкой данные проверяются validateContactForm, затем отправляются
 * в API функцией sendMessage. После успешной отправки форма очищается
 * и показывается сообщение об успехе.
 */
function ContactForm() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [serverError, setServerError] = useState('');

  const handleChange = (field) => (value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
    if (status === 'success' || status === 'error') setStatus('idle');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateContactForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus('sending');
    try {
      await sendMessage({ name: form.name.trim(), email: form.email.trim(), message: form.message.trim() });
      setForm(EMPTY_FORM);
      setStatus('success');
    } catch (error) {
      setServerError(error.message);
      setStatus('error');
    }
  };

  const sending = status === 'sending';

  return (
    <Form noValidate onSubmit={handleSubmit} aria-label="Форма обратной связи">
      <FormField
        id="contact-name"
        label="Ваше имя"
        placeholder="Анна"
        icon={aboutIcon}
        value={form.name}
        error={errors.name}
        disabled={sending}
        onValueChange={handleChange('name')}
      />
      <FormField
        id="contact-email"
        type="email"
        label="Email"
        placeholder="name@example.com"
        icon={contactIcon}
        helperText="На этот адрес придёт ответ"
        value={form.email}
        error={errors.email}
        disabled={sending}
        onValueChange={handleChange('email')}
      />
      <FormField
        id="contact-message"
        label="Сообщение"
        placeholder="Расскажите о задаче, сроках и бюджете"
        multiline
        value={form.message}
        error={errors.message}
        disabled={sending}
        onValueChange={handleChange('message')}
      />

      <div className="d-grid d-sm-flex align-items-center gap-3">
        <AppButton label={sending ? 'Отправка…' : 'Отправить'} type="submit" icon={arrowIcon} size="lg" disabled={sending} />
        {sending && <Spinner animation="border" size="sm" role="status" aria-label="Отправка" />}
      </div>

      {status === 'success' && (
        <Alert variant="success" className="mt-4 mb-0" role="status">
          <strong>Сообщение отправлено!</strong> Спасибо, отвечу в течение рабочего дня.
        </Alert>
      )}
      {status === 'error' && (
        <Alert variant="danger" className="mt-4 mb-0" role="alert">
          Не удалось отправить сообщение: {serverError}
        </Alert>
      )}
    </Form>
  );
}

export default ContactForm;
