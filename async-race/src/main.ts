import '@csstools/normalize.css';
import './style.css';
import ElementBuilder from '@/utils/element-builder';

document.addEventListener('DOMContentLoaded', () => {
  const app = new ElementBuilder({
    id: 'app',
  }).getElement();

  document.body.appendChild(app);
});
