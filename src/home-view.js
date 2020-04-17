import { html, css } from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map';

import { ViewBase } from './view-base.js';
import './hh-shape.js';

/* eslint-disable class-methods-use-this */

export class HomeView extends ViewBase {

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

  // #=== STYLES ===#

  static get styles() {
    return [
      super.styles,
      css`

        h1 {
          flex: 0 0 auto;
          margin: 0 0 24px 0;

          font-size: 3rem;
          font-weight: 900;
          max-width: 5em;
        }

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
      <h1>Hank Holiday</h1>

      <main-inner>
        <ul id="link-list">
          ${this.links.map(link => html`
            <li>
              <a href="${link.key}">${link.title}</a>
              <span class="comma">,</span>
            </li>
          `)}
        </ul>

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
