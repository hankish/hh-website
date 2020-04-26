import { LitElement, html, css } from 'lit-element';
import { colorStyles } from './styles/colors.js';
import 'css-doodle';

/* eslint-disable class-methods-use-this */

export class HhDoodle extends LitElement {

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

        :host {
          --c-0: var(--gray-0);
          --c-1: var(--gray-1);
          --c-2: var(--gray-2);
          --c-3: var(--gray-3);
          --c-4: var(--gray-4);
          --c-5: var(--gray-5);

          --c-3-30: var(--gray-3-30);
          --c-4-30: var(--gray-4-30);
          --c-5-30: var(--gray-5-30);
        }
        :host(.blue) {
          --c-0: var(--blue-0);
          --c-1: var(--blue-1);
          --c-2: var(--blue-2);
          --c-3: var(--blue-3);
          --c-4: var(--blue-4);
          --c-5: var(--blue-5);

          --c-3-30: var(--blue-3-30);
          --c-4-30: var(--blue-4-30);
          --c-5-30: var(--blue-5-30);
        }
        :host(.green) {
          --c-0: var(--green-0);
          --c-1: var(--green-1);
          --c-2: var(--green-2);
          --c-3: var(--green-3);
          --c-4: var(--green-4);
          --c-5: var(--green-5);

          --c-3-30: var(--green-3-30);
          --c-4-30: var(--green-4-30);
          --c-5-30: var(--green-5-30);
        }
        :host(.indigo) {
          --c-0: var(--indigo-0);
          --c-1: var(--indigo-1);
          --c-2: var(--indigo-2);
          --c-3: var(--indigo-3);
          --c-4: var(--indigo-4);
          --c-5: var(--indigo-5);

          --c-3-30: var(--indigo-3-30);
          --c-4-30: var(--indigo-4-30);
          --c-5-30: var(--indigo-5-30);
        }
        :host(.orange) {
          --c-0: var(--orange-0);
          --c-1: var(--orange-1);
          --c-2: var(--orange-2);
          --c-3: var(--orange-3);
          --c-4: var(--orange-4);
          --c-5: var(--orange-5);

          --c-3-30: var(--orange-3-30);
          --c-4-30: var(--orange-4-30);
          --c-5-30: var(--orange-5-30);
        }
        :host(.purple) {
          --c-0: var(--purple-0);
          --c-1: var(--purple-1);
          --c-2: var(--purple-2);
          --c-3: var(--purple-3);
          --c-4: var(--purple-4);
          --c-5: var(--purple-5);

          --c-3-30: var(--purple-3-30);
          --c-4-30: var(--purple-4-30);
          --c-5-30: var(--purple-5-30);
        }
        :host(.red) {
          --c-0: var(--red-0);
          --c-1: var(--red-1);
          --c-2: var(--red-2);
          --c-3: var(--red-3);
          --c-4: var(--red-4);
          --c-5: var(--red-5);

          --c-3-30: var(--red-3-30);
          --c-4-30: var(--red-4-30);
          --c-5-30: var(--red-5-30);
        }
        :host(.yellow) {
          --c-0: var(--yellow-1);
          --c-1: var(--yellow-2);
          --c-2: var(--yellow-3);
          --c-3: var(--yellow-4);
          --c-4: var(--yellow-5);
          --c-5: var(--yellow-6);

          --c-3-30: var(--yellow-4-30);
          --c-4-30: var(--yellow-5-30);
          --c-5-30: var(--yellow-6-30);
        }

      `
    ];
  }

  // #=== TEMPLATE ===#

  get circleDoodle() {
    return html`
      <css-doodle>
        :doodle {
          @grid: 3 / 6rem;
          --x-rotate-doodle: 0deg;
        }
        :doodle(:hover) {
          --x-rotate-doodle: 360deg;
        }

        @place-cell: center;
        @size: calc(100% * (@i / @size));
        
        border-radius: 50%;
        background: conic-gradient(
          @stripe(
            transparent @r(30%, 80%),
            @pick(var(--c-3-30), var(--c-4-30), var(--c-5-30))
          )
        );
        transform: rotate(calc(
          @r(360deg)
          + (var(--x-rotate-doodle) * @r(-1, 1))
        ));

        transition: transform 1s;
      </css-doodle>
    `;
  }

  get triangleDoodle() {
    return html`
      <css-doodle>
        :doodle {
          @grid: 5 / 5rem;
          --x-rotate-doodle: 0deg;
          --x-rotate-item: 0deg;
        }
        :doodle(:hover) {
          --x-rotate-doodle: 45deg;
        }

        @shape: triangle;
        background: var(--c-4);
        opacity: calc(0.1 + (0.75 * (@i / @size)));
        transform:
          rotate(calc(
            (360deg * (@i / @size))
            + var(--x-rotate-doodle)
            + var(--x-rotate-item)
          ))
          scale(1.7);

        :hover {
          --x-rotate-item: 360deg;
          opacity: 1;
        }

        transition: all 1s;
      </css-doodle>
    `;
  }

  get squareDoodle() {
    return html`
      <css-doodle>
        :doodle {
          @grid: 4 / 4rem;
          --transform-base: 1;
          --item-rotate: 0deg;
        }
        :doodle(:hover) {
          --transform-base: 0;
        }
        :hover {
          --item-rotate: 360deg;
        }


        transform:
          scale(calc(
            1 + (var(--transform-base) * @pick(0, 0, 1, 2))
          ))
          rotate(var(--item-rotate));
        
        @nth(3n + 0) {
          background: var(--c-3-30);
        }
        @nth(3n + 1) {
          border: 0.25px solid var(--c-3);
        }

        transition: transform 1s;
      </css-doodle>
    `;
  }

  render() {
    if (this.shape === 'circle') return this.circleDoodle;
    if (this.shape === 'triangle') return this.triangleDoodle;

    return this.squareDoodle;
  }
  
}

customElements.define('hh-doodle', HhDoodle);
