import { LitElement, html, css } from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map';

import Dialog from 'elix/define/Dialog.js';
import Carousel from 'elix/define/Carousel.js';

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

  firstUpdated() {
    const imageDialog = this.shadowRoot.querySelector('#image-dialog');

    if (imageDialog) {
      imageDialog.addEventListener('opened', this.imageDialogOpened);
      imageDialog.addEventListener('closed', this.imageDialogClosed);
    }
  }

  // #=== ACTION & EVENT HANDLERS ===#

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
    this.imageDialogClosed();
  }

  imageDialogOpened() {
    this.dispatchEvent(new CustomEvent('dialog-opened', {
      detail: { dialog: 'image-dialog' },
      bubbles: true,
      composed: true,
    }));
  }

  imageDialogClosed() {
    this.dispatchEvent(new CustomEvent('dialog-closed', {
      detail: { dialog: 'image-dialog' },
      bubbles: true,
      composed: true,
    }));
  }

  // #=== STYLES ===#

  static get styles() {
    return [
      css`

        :host {
          display: inline-flex;
          position: relative;
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
          color: var(--gray-7);
          transition: all 0.3s;
        }
        h3 a:visited,
        .subtitle a:visited {
          color: var(--gray-6);
        }
        h3 a:focus, h3 a:hover,
        .subtitle a:focus, .subtitle a:hover {
          color: var(--gray-9);
          text-decoration: underline;
        }


        /*=== CARD ICON FORMAT ===*/

        .card-icon-format {
          display: flex;
          padding: 1rem;

          background: var(--gray-0-30);
          border: 0.5px solid var(--gray-1);
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

          background: var(--gray-0-30);
          border: 0.5px solid var(--gray-1);
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
          width: 100%;

          background: var(--gray-0-50);
          border: 1px solid var(--gray-1);
          border-radius: 2px;
          overflow: hidden;
          
          background-size: cover;
          background-position: center center;
        }
        .image-format .overlay {
          cursor: pointer;
          min-height: 17rem;
          
          display: flex;
          flex-direction: column;
          justify-content: flex-end;

          background: linear-gradient(
            0deg, 
            var(--page-color-main, rgba(0, 0, 0, 0.9)) 0%, 
            transparent 100%
          );
          color: white;
        }
        .image-format h3 {
          flex: 0 0 auto;

          font-size: 1rem;
          line-height: 130%;
          margin: 0;
          padding: 1rem;
          line-height: 130%;
        }
        .image-format .body {
          flex: 0 0 auto;
          font-size: 0.9rem;
          line-height: 140%;
          margin: 0 1rem 1rem 1rem;
        }
        .image-format .body lit-cf-rich-text {
          --cfrt-p-margin: 0;
        }

        /*=== IMAGE DIALOG ===*/

        #image-dialog::part(frame) {
          width: 100%;
          height: 100%;
          overflow: hidden;

          position: relative;
          border: none;
          background: transparent;

          --dialog-header-height: 4rem;
        }
        #image-dialog::part(backdrop) {
          background: rgba(0, 0, 0, 0.82);
          z-index: 9;
        }
        
        dialog-header {
          position: absolute;
          top: 0;
          right: 0;
          left: 0;
          height: var(--dialog-header-height);

          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 0 2rem;

          background: rgba(255, 255, 255, 0.1);
          border-bottom: 1px solid rgba(255, 255, 255, 0.6);
          z-index: 13;
        }
        dialog-header title {
          display: inline-flex;
          flex: 1 1 auto;
          margin: 0;

          font-size: 1.2rem;
          line-height: 100%;
          height: 1em;
          color: white;
        }
        dialog-header a, dialog-header a:visited {
          flex: 0 0 auto;
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          
          font-size: 1.6rem;
          
          text-decoration: none;
          color: white;
        }
        
        carousel-pill-bg {
          display: block;
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 1.8rem;
          text-align: center;
          
          z-index: 10;
        }
        carousel-pill-bg inner-bg {
          display: inline-block;
          height: 100%;
          padding: 0 2rem;

          border-radius: 9px 9px 0 0;
          background: rgba(255, 255, 255, 0.63);
        }

        #image-carousel {
          position: absolute;
          top: var(--dialog-header-height);
          right: 0;
          bottom: 0;
          left: 0;
          color: white;

          background: transparent;
          z-index: 11;
        }
        #image-carousel::part(arrow-button) {
          color: white;
        }
        #image-carousel::part(stage) {
          color: white;
        }

        #image-dialog image-wrapper {
          display: inline-flex;
          width: 100%;
          height: 100%;
          align-items: center;
          justify-content: center;
          position: relative;
          color: white;

          z-index: 11;
        }
        #image-dialog image-wrapper img {
          display: inline-block;
          width: calc(100% - 10rem);
          height: calc(100% - 10rem);
          object-fit: contain;
          vertical-align: middle;
        }
        #image-dialog #image-carousel image-wrapper img {
          width: calc(100% - 6rem);
          height: calc(100% - 6rem);
        }
        #image-dialog image-wrapper image-description {
          position: absolute;
          display: block;
          left: 3rem;
          bottom: 2.5rem;
          max-width: 80vw;
          padding: 2px 0;
          z-index: 12;
        }
        @media(min-width: 700px) {
          #image-dialog image-wrapper image-description {
            max-width: 40vw;
          }
        }
        image-description inner-span {
          display: inline;
          
          line-height: 180%;
          padding: 0.6rem;
          background: var(--gray-8);
          opacity: 0.82;

          box-decoration-break: clone;
          -webkit-box-decoration-break: clone;
        }

      `,
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
    if (!this.item.overline) return null;

    return html`<small>${this.item.overline}</small>`;
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
    if (!this.item.body) return null;

    return html`
      <div class="body">
        <lit-cf-rich-text .value=${this.item.body}></lit-cf-rich-text>
      </div>
    `;
  }

  get iconTemplate() {
    if (!this.item.icon) return null;

    return html`
      <div class="icon">
        <img src="${`${this.item.icon.file.url}?w=300&h=300`}">
      </div>
    `;
  }

  get imageTemplate() {
    if (!this.item.image) return null;

    return html`
      <div class="image">
        <img
          src="${`${this.item.image.file.url}?w=700&h=700`}"
          @click=${this.imageClick}
        >
      </div>
    `;
  }

  get imageDialogTemplate() {
    if (!this.item.images || !this.item.images.length) return null;

    return html`
      <elix-dialog
        id="image-dialog"
        arrow-button-overlap="false"
        proxy-list-overlap="false"
      >
        <dialog-header>
          <title>${this.item.title}</title>
          <a
            href="#"
            tabindex="-1"
            @click=${this.closeImageDialog}
          ><ion-icon name="close"></ion-icon></a>
        </dialog-header>

        ${(this.item.images.length === 1) ? html`
          <image-wrapper>
            <img src="${this.item.images[0].file.url}">
            ${!this.item.images[0].description ? null : html`
              <image-description>
                <inner-span>${this.item.images[0].description}</inner-span>
              </image-description>
            `}
          </image-wrapper>
        ` : html`
          <!-- NOTE: The pill background is a hack because elix-dialog is difficult to restyle. -->
          <carousel-pill-bg>
            <inner-bg style=${styleMap({ width: `${this.item.images.length}rem` })}></inner-bg>
          </carousel-pill-bg>

          <elix-carousel id="image-carousel">
            ${this.item.images.map(image => html`
              <image-wrapper>
                <img src="${image.file.url}">
                ${!image.description ? null : html`
                  <image-description>
                    <inner-span>${image.description}</inner-span>
                  </image-description>
                `}
              </image-wrapper>
            `)}
          </elix-carousel>
        `}
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
      
      <div
        id="wrapper"
        class="image-format"
        style=${styleMap({ backgroundImage: `url("${this.item.images[0].file.url}?w=700&h=700")` })}
        @click=${this.imageClick}
      >
        <div class="overlay">
          <h3>${this.item.title}</h3>
          ${this.bodyTemplate}
        </div>       
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
