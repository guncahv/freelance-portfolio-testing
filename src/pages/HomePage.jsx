import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Image from 'react-bootstrap/Image';
import ProjectCard from '../components/ProjectCard/ProjectCard';
import About from '../components/About/About';
import projects from '../data/projects';
import photo from '../assets/photo-specialist@1x.jpg';

const stats = [
  { value: '5+', label: 'лет опыта' },
  { value: '40', label: 'проектов' },
  { value: '4,9', label: 'рейтинг' },
];

const skills = ['React', 'TypeScript', 'Node.js', 'Vue', 'PostgreSQL', 'Figma', 'Docker'];

/** Главная страница: первый экран, список проектов (сетка 3/2/1) и блок «Обо мне». */
function HomePage() {
  const { hash } = useLocation();

  // переход по ссылкам меню «Проекты» и «Обо мне» (/#projects, /#about)
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' });
    else window.scrollTo({ top: 0 });
  }, [hash]);

  return (
    <>
      <Container as="section" id="home" className="py-5">
        <Row className="align-items-center g-4 g-lg-5 py-lg-4">
          <Col lg={7} className="order-2 order-lg-1 text-center text-lg-start">
            <Badge bg="primary-subtle" text="primary-emphasis" pill className="mb-3 py-2 px-3 fw-medium">
              Фриланс-разработчик · React · Node.js
            </Badge>
            <h1 className="display-5 fw-bold mb-3">Создаю быстрые веб-приложения под ключ</h1>
            <p className="lead text-secondary mb-4">
              Привет! Я Айхан. Помогаю стартапам и малому бизнесу запускать сайты и веб-сервисы: от прототипа в Figma до
              релиза.
            </p>
            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start">
              <Link to="/#projects" className="btn btn-primary btn-lg fw-semibold">
                Смотреть проекты →
              </Link>
              <Link to="/contacts" className="btn btn-outline-primary btn-lg fw-semibold">
                Написать мне
              </Link>
            </div>
          </Col>
          <Col xs={8} sm={6} lg={5} className="order-1 order-lg-2 mx-auto text-center">
            <Image
              src={photo}
              alt="Айхан Рахманкулов, фриланс-разработчик"
              fluid
              className="rounded-4 shadow object-fit-cover"
              style={{ maxHeight: 420, aspectRatio: '4 / 5' }}
            />
          </Col>
        </Row>
      </Container>

      <section id="projects" className="py-5 bg-white border-top border-bottom">
        <Container>
          <div className="d-flex flex-wrap justify-content-between align-items-end gap-2 mb-4">
            <h2 className="mb-0">Избранные проекты</h2>
            <span className="text-secondary">{projects.length} проектов</span>
          </div>
          <Row xs={1} md={2} lg={3} className="g-4">
            {projects.map((project) => (
              <Col key={project.id}>
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  tags={project.tags}
                  meta={project.meta}
                />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <Container as="section" id="about" className="py-5">
        <About stats={stats} skills={skills} />
      </Container>
    </>
  );
}

export default HomePage;
