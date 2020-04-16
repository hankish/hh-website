import { LitElement } from 'lit-element';
import { Router } from '@vaadin/router';

import './home-view.js';
import './page-view.js';
import './not-found-view.js';

// #=== ROUTING ===#

const viewContainer = document.querySelector('view-container');
const router = new Router(viewContainer);
router.setRoutes([
  {
    path: '/',
    component: 'home-view',
  },
  {
    path: '/:key',
    component: 'page-view',
  },
  {
    path: '(.*)',
    component: 'not-found-view',
  },
]);

export class HhMain extends LitElement {}

customElements.define('hh-main', HhMain);