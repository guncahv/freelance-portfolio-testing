import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Icon from '../Icon/Icon';

/**
 * Поле формы на базе Form.Group / InputGroup / Form.Control из React Bootstrap.
 * Управляемый компонент: значение приходит через props (value) и меняется через onValueChange.
 * Состояние Error из ЛР №17 — атрибут isInvalid и сообщение Form.Control.Feedback.
 */
function FormField({
  id,
  label,
  value,
  onValueChange,
  placeholder = '',
  type = 'text',
  icon = null,
  helperText = '',
  error = '',
  multiline = false,
  disabled = false,
}) {
  return (
    <Form.Group controlId={id} className="mb-3">
      <Form.Label className="fw-semibold small">{label}</Form.Label>
      <InputGroup hasValidation>
        {icon && (
          <InputGroup.Text className="bg-white text-secondary">
            <Icon src={icon} />
          </InputGroup.Text>
        )}
        <Form.Control
          as={multiline ? 'textarea' : 'input'}
          rows={multiline ? 4 : undefined}
          type={multiline ? undefined : type}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(event) => onValueChange(event.target.value)}
          isInvalid={Boolean(error)}
          aria-describedby={`${id}-hint`}
        />
        <Form.Control.Feedback type="invalid" id={`${id}-hint`}>
          {error}
        </Form.Control.Feedback>
      </InputGroup>
      {!error && helperText && (
        <Form.Text id={`${id}-hint`} muted>
          {helperText}
        </Form.Text>
      )}
    </Form.Group>
  );
}

FormField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.oneOf(['text', 'email', 'tel']),
  icon: PropTypes.string,
  helperText: PropTypes.string,
  error: PropTypes.string,
  multiline: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default FormField;
