import '@csstools/normalize.css';

import '@/style.css';
import ElementBuilder from '@utils/element-builder';
import Router from '@/router';

document.addEventListener('DOMContentLoaded', () => {
  const app = new ElementBuilder({ id: 'app' });
  document.body.appendChild(app.getElement());

  const router = new Router(app.getId());
  router.init();
});
