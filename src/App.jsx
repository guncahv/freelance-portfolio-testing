import { Routes, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage';
import ContactsPage from './pages/ContactsPage';
import navItems from './data/navigation';
import photo from './assets/photo-specialist@1x.jpg';

/** Корневой компонент: шапка, маршруты страниц и подвал. */
function App() {
  return (
    <>
      <Header navItems={navItems} avatar={photo} status="Открыт к проектам" />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contacts" element={<ContactsPage />} />
        </Routes>
      </main>
      <footer className="py-4 border-top bg-white">
        <Container className="d-flex flex-column flex-md-row justify-content-between gap-2 small text-secondary">
          <span>© 2026 aykhan.dev</span>
          <span>React + React Bootstrap · ЛР №29: Jest + Playwright</span>
        </Container>
      </footer>
    </>
  );
}

export default App;
