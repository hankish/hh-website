import { LitElement, html, css } from 'lit-element';

import { colorStyles } from './styles/colors.js';

/* eslint-disable class-methods-use-this */

export class HhSpinner extends LitElement {

  // #=== STYLES ===#

  static get styles() {
    return [
      colorStyles,
      css`

        :host {
          display: block;
          position: relative;

          --ring-width: 1.2rem;
          --ring-padding: 0.3rem;
        }

        triangle {
          display: block;
          width: calc(100% - (2 * (var(--ring-width) + var(--ring-padding))));
          height: calc(100% - (2 * (var(--ring-width) + var(--ring-padding))));

          position: absolute;
          top: calc(var(--ring-width) + var(--ring-padding));
          left: calc(var(--ring-width) + var(--ring-padding));

          clip-path: polygon(20% 50%, 50% 0%, 80% 50%, 50% 100%);
          background: var(--red-4);
          animation: rainbow-spin 2.35s infinite linear;
        }

        @keyframes rainbow-spin {
          0% {
            transform: rotate(0deg);
            background: var(--red-4);
          }
          14% {
            background: var(--orange-4);
          }
          29% {
            background: var(--yellow-4);
          }
          43% {
            background: var(--green-4);
          }
          57% {
            background: var(--blue-4);
          }
          71% {
            background: var(--indigo-4);
          }
          86% {
            background: var(--purple-4);
          }
          100% {
            transform: rotate(360deg);
            background: var(--red-4);
          }
        }

        ring-slice {
          display: block;
          width: calc(100% - (var(--ring-width) * 2));
          height: calc(100% - (var(--ring-width) * 2));
          
          position: absolute;
          top: 0;
          left: 0;
          
          border-radius: 50%;
          border: var(--ring-width) solid transparent;
          border-left-color: var(--gray-3);
        }
        ring-slice.red { border-left-color: var(--red-4); }
        ring-slice.orange { border-left-color: var(--orange-4); }
        ring-slice.yellow { border-left-color: var(--yellow-4); }
        ring-slice.green { border-left-color: var(--green-4); }
        ring-slice.blue { border-left-color: var(--blue-4); }
        ring-slice.indigo { border-left-color: var(--indigo-4); }
        ring-slice.purple { border-left-color: var(--purple-4); }
        
        ring-slice:nth-child(1) { transform: rotate(calc(360deg / 7 * 1)); z-index: 7; }
        ring-slice:nth-child(2) { transform: rotate(calc(360deg / 7 * 2)); z-index: 6; }
        ring-slice:nth-child(3) { transform: rotate(calc(360deg / 7 * 3)); z-index: 5; }
        ring-slice:nth-child(4) { transform: rotate(calc(360deg / 7 * 4)); z-index: 4; }
        ring-slice:nth-child(5) { transform: rotate(calc(360deg / 7 * 5)); z-index: 3; }
        ring-slice:nth-child(6) { transform: rotate(calc(360deg / 7 * 6)); z-index: 2; }
        ring-slice:nth-child(7) { transform: rotate(calc(360deg / 7 * 7)); z-index: 1; }

      `
    ];
  }

  // #=== TEMPLATES ===#

  render() {
    return html`

      <triangle></triangle>

      <ring>
        <ring-slice class="red"></ring-slice>
        <ring-slice class="orange"></ring-slice>
        <ring-slice class="yellow"></ring-slice>
        <ring-slice class="green"></ring-slice>
        <ring-slice class="blue"></ring-slice>
        <ring-slice class="indigo"></ring-slice>
        <ring-slice class="purple"></ring-slice>
      </ring>

    `;
  }
  
}

customElements.define('hh-spinner', HhSpinner);
