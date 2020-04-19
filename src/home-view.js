import { html, css } from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map';

import '@material/mwc-menu';
import '@material/mwc-list/mwc-list-item';

import { ViewBase } from './view-base.js';
import './hh-shape.js';

export class HomeView extends ViewBase {

  // #=== LIFECYCLE ===#

  firstUpdated() {
    this.shadowRoot.querySelector('#external-links-menu').anchor
      = this.shadowRoot.querySelector('#external-links-button');
  }

  // #=== EVENTS ===#

  pageItemEnter(e) {
    this.pages = this.pages.map(page => {
      return {
        ...page,
        hover: (e.target.dataset.key === page.key),
      };
    });
  }
  
  pageItemLeave(e) {
    this.pages = this.pages.map(page => {
      return {
        ...page,
        hover: ((e.target.dataset.key === page.key) ? false : page.hover),
      };
    });
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
          color: var(--gray-5);
          text-decoration: none;
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

          height: 30px;
          padding: 12px 0;
        }

        page-item a {
          text-decoration: none;
          font-weight: 300;
          
          color: var(--gray-7);
          transition: color 700ms;
        }
        page-item a.red:hover { color: var(--red-6); }
        page-item a.orange:hover { color: var(--orange-6); }
        page-item a.yellow:hover { color: var(--yellow-6); }
        page-item a.green:hover { color: var(--green-6); }
        page-item a.blue:hover { color: var(--blue-6); }
        page-item a.indigo:hover { color: var(--indigo-6); }
        page-item a.purple:hover { color: var(--purple-6); }

        /*=== PAGE LIST - CONNECTOR LINES ===*/
        
        connector-line {
          flex: 1 1 auto;
          height: 3px;
          margin: 0 12px;
          background: transparent;
          transition: background 700ms;
        }
        connector-line.hover.red { background: var(--red-3); }
        connector-line.hover.orange { background: var(--orange-3); }
        connector-line.hover.yellow { background: var(--yellow-3); }
        connector-line.hover.green { background: var(--green-3); }
        connector-line.hover.blue { background: var(--blue-3); }
        connector-line.hover.indigo { background: var(--indigo-3); }
        connector-line.hover.purple { background: var(--purple-3); }

        /*=== PAGE LIST - SHAPES ===*/

        hh-shape {
          transition: margin 700ms;
        }
        hh-shape.red { --hh-shape-color: var(--red-4); }
        hh-shape.orange { --hh-shape-color: var(--orange-4); }
        hh-shape.yellow { --hh-shape-color: var(--yellow-4); }
        hh-shape.green { --hh-shape-color: var(--green-4); }
        hh-shape.blue { --hh-shape-color: var(--blue-4); }
        hh-shape.indigo { --hh-shape-color: var(--indigo-4); }
        hh-shape.purple { --hh-shape-color: var(--purple-4); }

      `
    ];
  }

  // #=== TEMPLATE ===#
  
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
          ${this.links.map(link => html`
            <li>
              <a href="${link.key}">${link.title}</a>
              <span class="comma">,</span>
            </li>
          `)}
        </ul>

        <!-- #=== PAGE NAV LIST ===# -->
        <page-list>
          ${this.pages.map(page => html`
            <page-item
              data-key="${page.key}"
              @mouseenter="${this.pageItemEnter}"
              @mouseleave="${this.pageItemLeave}"
            >
              <label>
                <a
                  href="/${page.key}"
                  class="${page.color}"
                >${page.title}</a>
              </label>
              <connector-line
                class="${page.color} ${page.shape} ${page.hover ? 'hover' : ''}"
                style=${styleMap({
                  marginRight: (page.shape === 'triangle'
                    ? `calc(-${page.width} / 7)`
                    : '12px'
                  ),
                })}
              ></connector-line>
              <hh-shape
                .shape=${page.shape}
                class="${page.color}"
                style=${styleMap({
                  width: page.width,
                  height: page.height,
                  marginRight: (page.hover
                    ? `calc(50% - ${page.width} / 2)`
                    : page.offset
                  ),
                })}
              ></hh-shape>
            </page-item>
          `)}
        </page-list>
      </main-inner>
    `;
  }
  
}

customElements.define('home-view', HomeView);
