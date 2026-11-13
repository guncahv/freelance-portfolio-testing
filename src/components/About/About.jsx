import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';

/**
 * Блок «Обо мне»: текст, навыки (Badge) и показатели (Card) в сетке Bootstrap.
 * Показатели и навыки передаются через props.
 */
function About({ stats, skills }) {
  return (
    <Row className="g-4 align-items-center">
      <Col lg={6}>
        <h2 className="mb-3">Обо мне</h2>
        <p className="text-secondary mb-4">
          Более пяти лет делаю веб-приложения на React и Node.js. Беру проект целиком: проектирую интерфейс, пишу
          фронтенд и бэкенд, настраиваю деплой и сопровождаю после запуска.
        </p>
        <Stack direction="horizontal" gap={2} className="flex-wrap">
          {skills.map((skill) => (
            <Badge key={skill} bg="white" text="dark" className="border fw-medium py-2 px-3">
              {skill}
            </Badge>
          ))}
        </Stack>
      </Col>
      <Col lg={6}>
        <Row xs={1} sm={3} className="g-3">
          {stats.map((stat) => (
            <Col key={stat.label}>
              <Card body className="h-100 bg-white border-0 shadow-sm rounded-4 text-center">
                <div className="fs-2 fw-bold text-primary">{stat.value}</div>
                <div className="small text-secondary">{stat.label}</div>
              </Card>
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
}

About.propTypes = {
  stats: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.string.isRequired, label: PropTypes.string.isRequired }))
    .isRequired,
  skills: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default About;
