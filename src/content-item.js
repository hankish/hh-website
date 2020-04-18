import { LitElement, html, css } from 'lit-element';

/* eslint-disable class-methods-use-this */

export class ContentItem extends LitElement {

  // #=== PROPERTIES ===#
  
  static get properties() {
    return {
      item: { type: Object },
      format: { type: String },
    };
  }

  // #=== LIFECYCLE ===#

  constructor() {
    super();

    this.item = {};
    this.format = 'text';
  }

  // #=== STYLES ===#

  static get styles() {
    return [
      css`

        :host {
          display: flex;
        }

        /*=== DEFAULT STYLES ===*/

        small {
          display: block;
          font-size: 0.7em;
          line-height: 130%;
          margin: 0 0 12px;
          font-weight: 400;
        }
        h3 {
          display: block;
          font-size: 1.2em;
          line-height: 120%;
          font-weight: 500;
          margin: 0 0 12px;
        }
        .body {
          display: block;
          font-size: 1em;
          line-height: 125%;
          font-weight: 200;
        }

        /*=== CARD ICON FORMAT ===*/

        .card-icon-format {
          display: flex;
          padding: 1rem;

          background: rgba(255, 255, 255, 0.1);
          border-radius: 9px;
        }
        .card-icon-format .text-panel {
          flex: 1 1 auto;
        }
        .card-icon-format .icon {
          flex: 0 0 auto;
          width: 5rem;
          margin-left: 1rem;
        }
        .card-icon-format .icon img {
          max-width: 100%;
          border-radius: 9px;
        }
        .card-icon-format .body {
          font-size: 0.9rem;
        }

      `
    ];
  }

  // #=== MAIN TEMPLATE ===#

  render() {
    if (this.format === 'card-icon') return this.cardIconFormatTemplate;
    
    return this.textFormatTemplate;
  }

  // #=== ITEM FIELD PARTIAL TEMPLATES ===#
  
  get overlineTemplate() {
    return !this.item.overline ? null : html`<small>${this.item.overline}</small>`;
  }

  get titleTemplate() {
    return !this.item.title ? null : html`<h3>${this.item.title}</h3>`;
  }

  get bodyTemplate() {
    return !this.item.body ? null : html`<div class="body">${this.item.body}</div>`;
  }

  get iconTemplate() {
    return !this.item.icon ? null : html`
      <div class="icon"><img src="${this.item.icon}"></div>
    `;
  }
  
  // #=== FORMAT TEMPLATES ===#

  get textFormatTemplate() {
    return html`
      <div id="wrapper" class="text-format">
        ${this.overlineTemplate}
        ${this.titleTemplate}
        ${this.bodyTemplate}
      </div>
    `;
  }

  get cardIconFormatTemplate() {
    return html`
      <div id="wrapper" class="card-icon-format">
        <div class="text-panel">
          ${this.overlineTemplate}
          ${this.titleTemplate}
          ${this.bodyTemplate}
        </div>
        ${this.iconTemplate}
      </div>
    `;
  }
  
}

customElements.define('content-item', ContentItem);
