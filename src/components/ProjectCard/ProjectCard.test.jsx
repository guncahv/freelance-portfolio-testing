import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProjectCard from './ProjectCard';

const props = {
  title: 'CRM для автосервиса',
  description: 'Запись клиентов, учёт запчастей и уведомления в Telegram.',
  image: '/assets/project-crm.svg',
  tags: ['Vue', 'Laravel', 'MySQL'],
  meta: '2026 · фриланс',
};

describe('ProjectCard', () => {
  it('отображает все переданные props: title, description, теги, обложку и подпись', () => {
    render(<ProjectCard {...props} />);

    expect(screen.getByRole('heading', { name: props.title })).toBeInTheDocument();
    expect(screen.getByText(props.description)).toBeInTheDocument();
    props.tags.forEach((tag) => expect(screen.getByText(tag)).toBeInTheDocument());
    expect(screen.getByRole('img', { name: `Обложка проекта «${props.title}»` })).toHaveAttribute('src', props.image);
    expect(screen.getByText(props.meta)).toBeInTheDocument();
  });

  it('не выводит блок тегов, если теги не переданы', () => {
    render(<ProjectCard title="Без тегов" description="Описание" image="/x.svg" />);
    expect(screen.getByRole('heading', { name: 'Без тегов' })).toBeInTheDocument();
    expect(screen.queryByText('Vue')).not.toBeInTheDocument();
  });

  it('реагирует на клик: кнопка «в избранное» переключает состояние', async () => {
    const user = userEvent.setup();
    render(<ProjectCard {...props} />);

    const favorite = screen.getByRole('button', { name: 'Добавить в избранное' });
    expect(favorite).toHaveAttribute('aria-pressed', 'false');

    await user.click(favorite);
    expect(screen.getByRole('button', { name: 'Убрать из избранного' })).toHaveAttribute('aria-pressed', 'true');

    await user.click(screen.getByRole('button', { name: 'Убрать из избранного' }));
    expect(screen.getByRole('button', { name: 'Добавить в избранное' })).toHaveAttribute('aria-pressed', 'false');
  });
});
