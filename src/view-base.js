import { LitElement, html, css } from 'lit-element';

import { cmsContent } from './hh-content.js';
import { colorStyles } from './styles/colors.js';

/* eslint-disable class-methods-use-this */

export class ViewBase extends LitElement {

  // #=== PROPERTIES ===#
  
  static get properties() {
    return {
      paths: { type: Array },
      links: { type: Array },
      externalLinks: { type: Array },
      pages: { type: Array },
    };
  }

  // #=== LIFECYCLE ===#

  constructor() {
    super();

    this.paths = cmsContent.paths;
    this.links = cmsContent.links;
    this.externalLinks = cmsContent.externalLinks;
    this.pages = cmsContent.pages;
  }

  // #=== STYLES ===#

  static get styles() {
    return [
      colorStyles,
      css`

        /*=== HOST CONTAINER & VARIABLES ===*/

        :host {
          display: block;
          width: 100%;
          height: 100%;

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
            --side-flex: 0 0 135px;
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

        /*=== CORE LAYOUT ===*/

        container {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          justify-content: center;

          height: 100vh;
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

        /*=== MAIN DEFAULT STYLES ===*/
        
        main {
          flex: 1 1 auto;

          display: flex;
          flex-direction: column;
          position: relative;
          
          max-width: var(--main-max-width);
          padding: var(--main-padding);
          height: calc(100vh - 2 * var(--main-padding));
          background: white;
        }
        main h1, main h2 {
          font-family: 'Playfair Display', serif;
        }

        /*=== SIDE LEFT STYLES ===*/

        side-left {
          font-size: 0.9rem;
        }
        side-left h2 {
          font-size: 0.9rem;
          font-weight: 800;
          margin: 0;
        }
        @media(min-width: 1200px) {
          side-left {
            font-size: 1rem;
          }
          side-left h2 {
            font-size: 1rem;
          }
        }

        /*=== SIDE RIGHT DEFAULT CONTENT ===*/

        side-right {
          font-size: 0.9rem;
        }
        side-right h2 {
          font-size: 0.9rem;
          font-weight: 800;
          margin: 0;
        }
        @media(min-width: 1200px) {
          side-right {
            font-size: 1rem;
          }
          side-right h2 {
            font-size: 1rem;
          }
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
          color: inherit;
          text-decoration: none;
        }
        #external-link-list > li > a:visited {
          color: inherit;
          text-decoration: none;
        }
        #external-link-list > li > a > ion-icon {
          color: inherit;
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

  // Overwrite this to add extra classes to the elements in the template
  get templateElementClasses() {
    return '';
  }

  render() {
    return html`
      <container class="${this.templateElementClasses}">
        <side-left class="${this.templateElementClasses}">
          ${this.sideLeftTemplate}
        </side-left>

        <main class="${this.templateElementClasses}">
          ${this.mainTemplate}
        </main>

        <side-right class="${this.templateElementClasses}">
          ${this.sideRightTemplate}
        </side-right>
      </container>
    `;
  }
  
}

customElements.define('view-base', ViewBase);
