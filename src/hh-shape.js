import { LitElement, html, css } from 'lit-element';
import { colorStyles } from './styles/colors.js';

export class HhShape extends LitElement {

  // #=== PROPERTIES ===#
  
  static get properties() {
    return {
      shape: { type: String },
    };
  }

  // #=== STYLES ===#

  static get styles() {
    return [
      colorStyles,
      css`
        :host {
          position: relative;
        }

        the-shape {
          display: block;
          width: 100%;
          height: 100%;

          background: var(--hh-shape-color, black);
          opacity: 0.6;
        }
        the-shape.circle {
          border-radius: 50%;
        }
        the-shape.triangle {
          /* Equilateral triangle with center at center of div */
          clip-path: polygon(0% 87%, 50% 0%, 50% 0%, 100% 87%);
        }
      `
    ];
  }

  // #=== TEMPLATE ===#

  render() {
    return html`
      <the-shape class="${this.shape}">
        &nbsp;
      </the-shape>
    `;
  }
  
}

customElements.define('hh-shape', HhShape);
