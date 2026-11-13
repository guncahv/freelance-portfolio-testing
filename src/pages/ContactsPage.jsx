import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ContactForm from '../components/ContactForm/ContactForm';

/** Страница «Контакты» (/contacts): форма обратной связи и контактные данные. */
function ContactsPage() {
  return (
    <Container as="section" className="py-5">
      <h1 className="display-6 fw-bold mb-2">Контакты</h1>
      <p className="lead text-secondary mb-4">Опишите задачу — отвечу в течение рабочего дня.</p>
      <Row className="g-4">
        <Col lg={7}>
          <Card className="bg-white border-0 shadow-sm rounded-4 p-3 p-md-4">
            <ContactForm />
          </Card>
        </Col>
        <Col lg={5}>
          <Card className="bg-white border-0 shadow-sm rounded-4">
            <Card.Body className="p-4">
              <Card.Title as="h2" className="h5 mb-3">
                Другие способы связи
              </Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item className="px-0">Email: hello@aykhan.dev</ListGroup.Item>
                <ListGroup.Item className="px-0">Telegram: @aykhan_dev</ListGroup.Item>
                <ListGroup.Item className="px-0">Минск, работаю удалённо</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ContactsPage;
