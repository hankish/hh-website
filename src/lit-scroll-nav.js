import { LitElement, html, css } from 'lit-element';

export class LitScrollNav extends LitElement {
  // #=== PROPERTIES ===#

  static get properties() {
    return {
      scrollListener: { type: Object },
      scrollItemTitleKey: { type: String },
      itemLinkIdPrefix: { type: String },

      scrollItemIdKey: { type: String },
      scrollItemSelectedKey: { type: String },
      initialized: { type: Boolean },

      scrollItems: { type: Array },
    };
  }

  // #=== LIFECYCLE ===#

  constructor() {
    super();

    this.initialized = false;
    this.scrollItemTitleKey = 'title';
    this.itemLinkIdPrefix = '#';
    this.scrollItems = [];
  }

  // #=== GETTERS & SETTERS ===#

  set scrollListener(value) {
    if (value) {
      this.scrollItemIdKey = value.scrollItemIdKey;
      this.scrollItemSelectedKey = value.scrollItemSelectedKey;
      this.scrollItems = value.scrollItems;

      value.scrollingElement
        .addEventListener('scroll-items-changed', e => this.scrollItemsChanged(e));

      this.initialized = true;
    }

    this.requestUpdate('scrollListener', value);
  }

  // #=== EVENTS ===#

  scrollItemsChanged(e) {
    this.scrollItems = e.detail.scrollItems;
  }

  // #=== STYLES ===#

  static get styles() {
    return [
      css`

        :host {
          display: block;
          font-size: 1em;
        }
        
        ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        li {
          display: block;
          margin: 12px 0;
          padding: 0;
          
          font-weight: 200;
        }
        li.selected {
          font-weight: 600;
        }        

        li > a {
          display: flex;
          align-items: center;
          transition: all 0.2s;
        }
        li > a, li > a:visited {
          color: var(--gray-5);
          text-decoration: none;
          transition: color 0.3s;
        }
        li > a:hover {
          color: var(--gray-6);
        }
        li.selected > a, li.selected > a:visited {
          color: var(--gray-7);
        }
        li > a > ion-icon {
          margin-right: 6px;
          flex: 0 0 auto;
        }

        /*=== PILL MODE ===*/

        :host(.pill-mode) ul {
          display: flex;
          flex-wrap: wrap;
        }
        :host(.pill-mode) li {
          display: inline-block;
          flex: 0 0 auto;
          margin: 3px;
        }
        :host(.pill-mode) li > a {
          border: 0.5px solid var(--lsn-pill-border-color, var(--gray-3-50));
          border-radius: 500px;
          padding: 3.75px 12.25px 3px 12.25px;
          line-height: 150%;
        }
        :host(.pill-mode) li > a:hover {
          background: var(--lsn-pill-background, var(--gray-0-30));
        }
        :host(.pill-mode) li > a > ion-icon {
          display: none;
        }
        :host(.pill-mode) li.selected > a {
          border-width: 1px;
          padding: 3px 12px;
          background: rgba(255, 255, 255, 0.2);
          background: var(--lsn-pill-background-selected, var(--gray-0-70));
        }

      `,
    ];
  }

  // #=== TEMPLATES ===#

  render() {
    if (!this.initialized) return null;

    return html`
      <ul>
        ${this.scrollItems.map(item => html`
          <li class="${item[this.scrollItemSelectedKey] ? 'selected' : ''}">
            <a
              id="${item[this.scrollItemIdKey]}"
              href="${this.itemLinkIdPrefix + item[this.scrollItemIdKey]}"
            ><ion-icon name="caret-forward-outline"></ion-icon> ${item[this.scrollItemTitleKey]}</a>
          </li>
        `)}
      </ul>
    `;
  }
}

customElements.define('lit-scroll-nav', LitScrollNav);
