import { html, css } from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map';

import '@material/mwc-menu';
import '@material/mwc-list/mwc-list-item';

import { ViewBase } from './view-base.js';
import './hh-shape.js';

/* eslint-disable class-methods-use-this */

export class HomeView extends ViewBase {
  // #=== LIFECYCLE ===#

  firstUpdated() {
    // Set the document title
    this.setDocumentTitle();

    // Anchor the external links menu to the menu button
    this.shadowRoot.querySelector('#external-links-menu').anchor = this.shadowRoot.querySelector('#external-links-button');
  }

  // #=== EVENTS ===#

  pageItemEnter(e) {
    this.mainNavItems = this.mainNavItems.map(page => ({
      ...page,
      hover: (e.target.dataset.key === page.key),
    }));
  }

  pageItemLeave(e) {
    this.mainNavItems = this.mainNavItems.map(page => ({
      ...page,
      hover: ((e.target.dataset.key === page.key) ? false : page.hover),
    }));
  }

  // #=== ACTIONS ===#

  externalLinksButtonClick(e) {
    e.preventDefault();
    this.shadowRoot.querySelector('#external-links-menu').open = true;
  }

  // #=== STYLES ===#

  static get styles() {
    return [
      super.styles,
      css`

        /*=== MAIN BODY LAYOUT ===*/

        main-inner {
          flex: 1 1 auto;
          min-height: 20rem;

          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          padding-left: 20px;
        }
        main-inner::before {
          content: ' ';
          display: block;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          width: 5px;
          
          background: linear-gradient(180deg, var(--gray-2) 0%, var(--gray-6) 100%);
        }
        @media(min-width: 1200px) {
          main-inner {
            padding-left: 30px;
          }
        }

        /*=== MAIN BODY HEADER ===*/

        page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          width: 100%;
        }

        h1 {
          flex: 0 0 5em;
          margin: 0 0 24px 0;

          font-size: 3rem;
          font-weight: 900;
          max-width: 5em;
        }

        #external-links-button {
          flex: 0 0 auto;
          
          display: inline-flex;
          justify-content: center;

          font-size: 2rem;
          padding: 12px;

          color: var(--gray-4);
          transition: color 0.3s;
        }
        #external-links-button:focus, #external-links-button:hover {
          color: var(--gray-6);
        }
        @media(min-width: 1000px) {
          #external-links-button {
            display: none;
          }
        }

        #external-links-menu a {
          display: flex;
          align-items: center;
          --mdc-theme-text-primary: var(--gray-7);
        }
        #external-links-menu a, #external-links-menu a:visited {
          color: var(--gray-7);
          text-decoration: none;
          transition: color 0.3s;
        }
        #external-links-menu a:focus, #external-links-menu a:hover {
          color: var(--gray-9);
        }
        #external-links-menu a ion-icon {
          margin-right: 6px;
        }

        /*=== INTERNAL LINK LIST ===*/

        #link-list {
          list-style: none;
          padding: 0;
          margin: 0;

          max-width: 40rem;
        }
        #link-list > li {
          display: inline-block;
          color: var(--gray-5);
          font-weight: 200;
          line-height: 1.5em;
        }
        #link-list > li > a {
          display: inline-block;
          color: var(--gray-5);
          text-decoration: none;
          border-bottom: 0.5px solid var(--gray-5-70);
          line-height: 85%;
          text-shadow:
            1px 1px white,
            1px -1px white,
            -1px 1px white,
            -1px -1px white;
          transition: all 0.2s;
        }
        #link-list > li > a:hover, #link-list > li > a:focus {
          border-bottom-color: var(--gray-5);
          border-bottom-width: 1px;
          color: var(--gray-7);
        }
        #link-list > li > .comma {
          margin-left: -0.2em;
        }
        #link-list > li:last-of-type > .comma {
          display: none;
        }

        /*=== PAGE LIST ===*/

        page-list {
          display: block;
          font-size: 1.25rem;
          line-height: 1.2em;
        }
        page-item {
          display: flex;
          flex-direction: row;
          align-items: center;

          height: 1.5rem;
          padding: 0.4rem 0;
        }

        page-item.red {
          --item-color-dark: var(--red-6);
          --item-color-medium: var(--red-4);
          --item-color-light: var(--red-3);
        }
        page-item.orange {
          --item-color-dark: var(--orange-6);
          --item-color-medium: var(--orange-4);
          --item-color-light: var(--orange-3);
        }
        page-item.yellow {
          --item-color-dark: var(--yellow-6);
          --item-color-medium: var(--yellow-4);
          --item-color-light: var(--yellow-3);
        }
        page-item.green {
          --item-color-dark: var(--green-6);
          --item-color-medium: var(--green-4);
          --item-color-light: var(--green-3);
        }
        page-item.blue {
          --item-color-dark: var(--blue-6);
          --item-color-medium: var(--blue-4);
          --item-color-light: var(--blue-3);
        }
        page-item.indigo {
          --item-color-dark: var(--indigo-6);
          --item-color-medium: var(--indigo-4);
          --item-color-light: var(--indigo-3);
        }
        page-item.purple {
          --item-color-dark: var(--purple-6);
          --item-color-medium: var(--purple-4);
          --item-color-light: var(--purple-3);
        }

        page-item a {
          text-decoration: none;
          font-weight: 300;
          
          color: var(--gray-7);
          transition: color 0.3ms;
        }
        page-item.hover a, page-item.hover a:visited {
          color: var(--item-color-dark); 
        }

        /*=== PAGE LIST - CONNECTOR LINES ===*/
        
        connector-line {
          flex: 1 1 auto;
          height: 0.15rem;
          margin: 0 0.4rem;
          background: transparent;
          transition: background 700ms;
        }
        page-item.hover connector-line {
          background: var(--item-color-light);
        }

        /*=== PAGE LIST - SHAPES ===*/

        hh-shape {
          transition: margin 700ms;
          --hh-shape-color: var(--item-color-medium);
        }
      `,
    ];
  }

  // #=== TEMPLATE ===#

  get sideLeftTemplate() {
    return null;
  }

  get mainTopNavTemplate() {
    return null;
  }

  get mainTemplate() {
    return html`
      <!-- #=== EXTERNAL LINKS DROPDOWN MENU ===# -->
      <mwc-menu
        id="external-links-menu"
        fixed
        corner="BOTTOM_START"
      >
        ${this.externalLinks.map(link => html`
          <mwc-list-item>
            <a href="${link.url}" target="_blank">
              <ion-icon name="${link.icon}"></ion-icon>
              <span class="title">${link.title}</span>
            </a>
          </mwc-list-item>
        `)}
      </mwc-menu>

      <!-- #=== HEADER ===# -->
      <page-header>
        <h1>Hank Holiday</h1>

        <a
          id="external-links-button"
          href="#"
          @click=${this.externalLinksButtonClick}
        >
          <ion-icon icon="link"></ion-icon>
          <ion-icon icon="md-arrow-dropdown"></ion-icon>
        </a>
      </page-header>
      
      <main-inner>
        <!-- #=== LINK LIST ===# -->
        <ul id="link-list">
          ${this.internalLinks.map(item => html`
            <li>
              <a href="${item.link.key}">${item.title}</a>
              <span class="comma">,</span>
            </li>
          `)}
        </ul>

        <!-- #=== PAGE NAV LIST ===# -->
        <page-list>
          ${this.mainNavItems.map(page => (page.key
    ? html`
              <page-item
                class="${page.color} ${page.hover ? 'hover' : ''}"
                data-key="${page.key}"
                @mouseenter="${this.pageItemEnter}"
                @mouseleave="${this.pageItemLeave}"
              >
                <label>
                  <a href="/${page.key}">${page.title}</a>
                </label>
                <connector-line style=${styleMap({
      marginRight: (page.shape === 'triangle'
        ? `calc(-${page.width}rem / 7)`
        : '12px'
      ),
    })}></connector-line>
                <hh-shape
                  .shape=${page.shape}
                  style=${styleMap({
      width: `${page.width}rem`,
      height: `${page.height}rem`,
      marginRight: (page.hover
        ? `calc(50% - ${page.width}rem / 2)`
        : `${page.offset}rem`
      ),
    })}
                ></hh-shape>
              </page-item>
            ` : html`
              <page-item class="${page.color}">
                <connector-line></connector-line>
                <hh-shape
                  .shape=${page.shape}
                  style=${styleMap({
      width: `${page.width}rem`,
      height: `${page.height}rem`,
      marginRight: `${page.offset}rem`,
    })}
                ></hh-shape>
              </page-item>
            `
  ))}
        </page-list>
      </main-inner>
    `;
  }
}

customElements.define('home-view', HomeView);
