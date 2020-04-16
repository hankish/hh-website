import { html, css } from 'lit-element';

import { ViewBase } from './view-base.js';

/* eslint-disable class-methods-use-this */

export class NotFoundView extends ViewBase {

  // #=== STYLES ===#

  static get styles() {
    return [
      super.styles,
      css`
        
        :host {
          color: var(--gray-7);
          background: var(--gray-0);

          /* FIXME */
        }

      `
    ];
  }

  // #=== TEMPLATE ===#

  get mainTemplate() {
    return html`
      <h2>Not Found</h2>
      <p>This page could not be found.</p>
    `;
  }
  
}

customElements.define('not-found-view', NotFoundView);
