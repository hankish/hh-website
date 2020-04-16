import { LitElement, html, css } from 'lit-element';

import { cmsContent } from './hh-content.js';
import { colorStyles } from './styles/colors.js';

/* eslint-disable class-methods-use-this */

export class ViewBase extends LitElement {

  // #=== PROPERTIES ===#
  
  static get properties() {
    return {
      links: { type: Array },
      externalLinks: { type: Array },
      pages: { type: Array },
    };
  }

  // #=== LIFECYCLE ===#

  constructor() {
    super();

    this.links = cmsContent.links;
    this.externalLinks = cmsContent.externalLinks;
    this.pages = cmsContent.pages;
  }

  // #=== STYLES ===#

  static get styles() {
    return [
      colorStyles,
      css`

        :host {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          justify-content: center;

          height: 100vh;

          color: var(--gray-7);
          background: var(--gray-0);
          
          --side-display: none;
          --side-flex: none;
          --side-padding: 0;

          --main-max-width: none;
          --main-padding: 24px;
        }
        @media(min-width: 700px) {
          :host {
            --main-max-width: 700px;
          }
        }
        @media(min-width: 1000px) {
          :host {
            --side-display: flex;
            --side-flex: 0 0 175px;
            --side-padding: 24px;
            
            --main-max-width: 900px;
          }
        }
        @media(min-width: 1200px) {
          :host {
            --side-display: flex;
            --side-flex: 0 0 225px;
            --side-padding: 36px 24px;

            --main-padding: 36px;
          }
        }

        side-left {
          flex: var(--side-flex);
          
          display: var(--side-display);
          flex-direction: column;
          padding: var(--side-padding);
        }

        side-right {
          flex: var(--side-flex);

          display: var(--side-display);
          flex-direction: column;
          padding: var(--side-padding);
          color: var(--gray-5);
        }
        
        main {
          flex: 1 1 auto;

          display: flex;
          flex-direction: column;
          
          max-width: var(--main-max-width);
          padding: var(--main-padding);
          height: calc(100vh - 2 * var(--main-padding));
          background: white;
        }

        side-right h2 {
          font-size: 1rem;
        }
        #external-link-list {
          list-style: none;
          padding: 0;
          margin: 32px 0 0 0;
        }
        #external-link-list > li {
          display: block;
          margin: 0 0 12px 0;

          font-weight: 200;
          line-height: 1.5em;
        }
        #external-link-list > li > a {
          display: flex;
          align-items: center;
          color: var(--gray-5);
          text-decoration: none;
        }
        #external-link-list > li > a:visited {
          color: var(--gray-5);
          text-decoration: none;
        }
        #external-link-list > li > a > ion-icon {
          color: var(--gray-5);
          margin-right: 10px;
        }
        #external-link-list > li > a > .title { display: none; }
        #external-link-list > li > a > .narrowTitle { display: inline; }
        @media(min-width: 1200px) {
          #external-link-list > li > a > .title { display: inline; }
          #external-link-list > li > a > .narrowTitle { display: none; }
        }

      `
    ];
  }

  // #=== TEMPLATE ===#

  // Overwrite this in sub elements if needed
  get sideLeftTemplate() {
    return html``;
  }
  
  // Overwrite this in sub elements if needed
  get sideRightTemplate() {
    return html`
      <h2>External Links</h2>

      <ul id="external-link-list">
        ${this.externalLinks.map(link => html`
          <li>
            <a href="${link.url}" target="_blank">
              <ion-icon name="${link.icon}"></ion-icon>
              <span class="title">${link.title}</span>
              <span class="narrowTitle">${link.narrowTitle}</span>
            </a>
          </li>
        `)}
      </ul>
    `;
  }
  
  // Overwrite this in sub elements (or there won't be any page content)
  get mainTemplate() {
    return html``;
  }

  render() {
    return html`
      <side-left>
        ${this.sideLeftTemplate}
      </side-left>

      <main>
        ${this.mainTemplate}
      </main>

      <side-right>
        ${this.sideRightTemplate}
      </side-right>
    `;
  }
  
}

customElements.define('view-base', ViewBase);
