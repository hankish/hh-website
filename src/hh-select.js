import { LitElement, html, css } from 'lit-element';

/* eslint-disable class-methods-use-this */

export class HhSelect extends LitElement {

  // #=== PROPERTIES ===#
  
  static get properties() {
    return {
      value: { type: String },
      options: { type: Array },
      valueFrom: { type: String },
      labelFrom: { type: String },
    };
  }

  // #=== EVENTS ===#

  selectChanged() {
    this.value = this.shadowRoot.querySelector('select').value;

    this.dispatchEvent(new CustomEvent('value-changed', {
      detail: { value: this.value }
    }));
  }

  // #=== STYLES ===#

  static get styles() {
    return [
      css`

        :host {
          display: block;
        }

        select {
          display: block;
          width: 100%;

          padding: .6em 2em .5em .8em;
          margin: 0;
          box-shadow: none;
          -moz-appearance: none;
          -webkit-appearance: none;
          appearance: none;
          
          font-size: 1rem;
          font-weight: 500;
          line-height: 1.3;
          
          border: 1px solid var(--gray-7);
          box-sizing: border-box;
          border-radius: 500px;
          
          color: var(--gray-7);
          background-color: transparent;
          
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' width='32' height='24' viewBox='0 0 32 24'><polygon points='0,0 32,0 16,24' style='fill: var(--gray-7)'></polygon></svg>");
          background-repeat: no-repeat, repeat;
          background-position: right .7em top 50%, 0 0;
          background-size: .65em auto, 100%;
        }
        select::-ms-expand {
          display: none;
        }
        select:hover {
          border-color: var(--gray-7);
        }
        select:focus {
          border-color: var(--gray-7);
          box-shadow: none;
          color: var(--gray-7); 
          outline: none;
        }

      `
    ];
  }

  // #=== TEMPLATES ===#

  render() {
    return html`
      <select @change=${this.selectChanged}>
        ${this.options.map(option => html`
          <option
            value="${option[this.valueFrom]}"
            ?selected=${option[this.valueFrom] === this.value}
          >
            ${option[this.labelFrom]}
          </option>
        `)}
      </select>
    `;
  }
  
}

customElements.define('hh-select', HhSelect);
