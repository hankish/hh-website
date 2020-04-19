import { LitElement, html, css } from 'lit-element';

import Dialog from 'elix/define/Dialog.js';

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

  // #=== ACTIONS ===#

  imageClick(e) {
    e.preventDefault();

    if (this.item.link) {
      window.open(this.item.link, '_blank');
    } else {
      this.shadowRoot.querySelector('#image-dialog').open();
    }
  }

  closeImageDialog(e) {
    e.preventDefault();
    this.shadowRoot.querySelector('#image-dialog').close();
  }

  // #=== STYLES ===#

  static get styles() {
    return [
      css`

        :host {
          display: inline-flex;
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
        
        h3 a,
        .subtitle a {
          text-decoration: none;
          color: white;
          transition: all 0.3s;
        }
        h3 a:visited,
        .subtitle a:visited {
          color: rgba(255, 255, 255, 0.8);
        }
        h3 a:focus, h3 a:hover,
        .subtitle a:focus, .subtitle a:hover {
          text-decoration: underline;
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
        
        /*=== CARD HERO FORMAT ===*/

        .card-hero-format {
          display: flex;
          flex-direction: column;

          background: rgba(255, 255, 255, 0.1);
          border-radius: 9px;
          overflow: hidden;
        }
        .card-hero-format .header-panel {
          flex: 0 0 auto;

          display: flex;
          justify-content: flex-start;
          
          margin: 1rem 0;
          padding: 0 1rem;
        }
        .card-hero-format .header-panel .icon {
          flex: 0 0 auto;
          width: 2.5rem;
          margin: 0 1rem 0 0;
        }
        .card-hero-format .header-panel .icon img {
          max-width: 100%;
          border-radius: 9px;
        }
        .card-hero-format .header-panel .title {
          flex: 1 1 auto;
        }
        .card-hero-format .header-panel .title h3 {
          font-size: 1rem;
          line-height: 130%;
          margin: 0;
        }
        .card-hero-format .header-panel .title .subtitle {
          font-size: 0.875rem;
          line-height: 130%;
          margin: 2px 0 0 0;
          font-weight: 200;
        }
        .card-hero-format .image {
          flex: 1 1 10rem;
          display: flex;
          flex-direction: row;
          align-items: center;
          overflow: hidden;
        }
        .card-hero-format .image img {
          width: 100%;
          cursor: pointer;
        }
        .card-hero-format .body {
          font-size: 0.9rem;
          line-height: 140%;
          margin: 1rem;
        }

        /*=== IMAGE FORMAT ===*/

        .image-format {
          display: flex;
          flex-direction: column;
        }
        .image-format .image {
          flex: 0 0 auto;
          display: block;
        }
        .image-format .image img {
          display: block;
          max-width: 100%;
          cursor: pointer;
        }
        .image-format h3 {
          font-size: 1rem;
          font-weight: normal;
          line-height: 130%;
          margin: 0.5rem 0 0 0;
        }

        /*=== IMAGE DIALOG ===*/

        #image-dialog::part(frame) {
          border: none;
          border-radius: 9px;
          overflow: hidden;
        }
        #image-dialog img {
          max-width: 90vw;
          max-height: 90vh;
          margin-bottom: -10px; /* removes bottom spacing in dialog */
        }
        #image-dialog .action {
          position: absolute;
          top: 1rem;
          right: 1rem;
        }
        #image-dialog .action a, #image-dialog .action a:visited {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          
          font-size: 1.6rem;
          height: 2rem;
          width: 2rem;
          border-radius: 500px;
          
          text-decoration: none;
          color: white;
          background: rgba(0, 0, 0, 0.5);
          transition: background 0.3s;
        }
        #image-dialog .action a:hover {
          background: rgba(0, 0, 0, 0.9);
        }

      `
    ];
  }

  // #=== MAIN TEMPLATE ===#

  render() {
    if (this.format === 'card-icon') return this.cardIconFormatTemplate;
    if (this.format === 'card-hero') return this.cardHeroFormatTemplate;
    if (this.format === 'image') return this.imageFormatTemplate;
    
    return this.textFormatTemplate;
  }

  // #=== ITEM FIELD PARTIAL TEMPLATES ===#
  
  get overlineTemplate() {
    return !this.item.overline ? null : html`<small>${this.item.overline}</small>`;
  }

  get titleTemplate() {
    if (!this.item.title) return null;
    
    return !this.item.link
      ? html`<h3>${this.item.title}</h3>`
      : html`<h3><a href="${this.item.link}" target="_blank">${this.item.title}</a></h3>`;
  }
  
  get subtitleTemplate() {
    if (!this.item.subtitle) return null;
    
    return !this.item.link
      ? html`<div class="subtitle">${this.item.subtitle}</div>`
      : html`
        <div class="subtitle">
          <a href="${this.item.link}" target="_blank">${this.item.subtitle}</a>
        </div>
      `;
  }

  get bodyTemplate() {
    return !this.item.body ? null : html`<div class="body">${this.item.body}</div>`;
  }

  get iconTemplate() {
    return !this.item.icon ? null : html`
      <div class="icon"><img src="${this.item.icon}"></div>
    `;
  }

  get imageTemplate() {
    return !this.item.image ? null : html`
      <div class="image">
        <img src="${this.item.image}" @click=${this.imageClick}>
      </div>
    `;
  }
  
  get imageDialogTemplate() {
    return !this.item.image ? null : html`
      <elix-dialog id="image-dialog">
        <div class="image"><img src="${this.item.image}"></div>
        <div class="action">
          <a
            href="#"
            tabindex="-1"
            @click=${this.closeImageDialog}
          ><ion-icon icon="close"></ion-icon></a>
        </div>
      </elix-dialog>
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

  get imageFormatTemplate() {
    return html`
      ${this.imageDialogTemplate}
      
      <div id="wrapper" class="image-format">
        ${this.imageTemplate}
        ${this.titleTemplate}
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
  
  get cardHeroFormatTemplate() {
    return html`
      ${this.item.link ? null : this.imageDialogTemplate}
      
      <div id="wrapper" class="card-hero-format">
        <div class="header-panel">
          ${this.iconTemplate}
          <div class="title">
            ${this.titleTemplate}
            ${this.subtitleTemplate}
          </div>
        </div>
        ${this.imageTemplate}
        ${this.bodyTemplate}
      </div>
    `;
  }
  
}

customElements.define('content-item', ContentItem);
