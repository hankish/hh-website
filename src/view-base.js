import { LitElement, html, css } from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map';

import { cmsContent } from './hh-content.js';
import { colorStyles } from './styles/colors.js';

/* eslint-disable class-methods-use-this */

export class ViewBase extends LitElement {

  // #=== PROPERTIES ===#
  
  static get properties() {
    return {
      paths: { type: Array },
      links: { type: Array },
      externalLinks: { type: Array },
      pages: { type: Array },
    };
  }

  // #=== LIFECYCLE ===#

  constructor() {
    super();

    this.paths = cmsContent.paths;
    this.links = cmsContent.links;
    this.externalLinks = cmsContent.externalLinks;
    this.pages = cmsContent.pages;
  }

  // #=== STYLES ===#

  static get styles() {
    return [
      colorStyles,
      css`

        /*=== HOST CONTAINER & VARIABLES ===*/

        :host {
          display: block;
          width: 100%;
          height: 100%;

          color: var(--gray-7);
          background: var(--gray-0);
          
          --side-display: none;
          --side-width: 0;
          --side-padding: 0;

          --main-max-width: none;
          --main-padding: 24px;
        }
        @media(min-width: 700px) {
          :host {
            --main-max-width: 700px;
          }
        }
        @media(min-width: 1000px) {
          :host {
            --side-display: block;
            --side-width: 135px;
            --side-padding: 24px;
            
            --main-max-width: 900px;
          }
        }
        @media(min-width: 1200px) {
          :host {
            --side-display: block;
            --side-width: 225px;
            --side-padding: 36px 24px;

            --main-padding: 36px;
          }
        }

        /*=== CORE LAYOUT ===*/

        container {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          justify-content: center;

          height: 100vh;
        }

        side-left {
          width: var(--side-width);
          height: calc(100vh - (2 * var(--side-padding)));
          flex: 0 0 auto;
          position: relative;
          
          display: var(--side-display);
          flex-direction: column;
          padding: var(--side-padding);
        }

        side-right {
          width: var(--side-width);
          height: calc(100vh - (2 * var(--side-padding)));
          flex: 0 0 auto;
          position: relative;

          display: var(--side-display);
          flex-direction: column;
          padding: var(--side-padding);
          color: var(--gray-5);
        }

        /*=== MAIN DEFAULT STYLES ===*/

        main-wrapper {
          flex: 1 1 auto;
          display: block;
          overflow-y: scroll;

          max-width: var(--main-max-width);
          padding: 0;
          height: 100vh;
          background: white;
        }
        
        main {
          display: flex;
          flex-direction: column;
          padding: var(--main-padding);
          position: relative;
          min-height: calc(100vh - (2 * var(--main-padding)));
        }
        main h1, main h2 {
          font-family: 'Playfair Display', serif;
        }

        /*=== MAIN TOP NAV ===*/

        main-top-nav a.red {
          --link-background: var(--red-3);
          --link-background-hover: var(--red-4);
        }
        main-top-nav a.orange {
          --link-background: var(--orange-3);
          --link-background-hover: var(--orange-4);
        }
        main-top-nav a.yellow {
          --link-background: var(--yellow-4);
          --link-background-hover: var(--yellow-5);
        }
        main-top-nav a.green {
          --link-background: var(--green-3);
          --link-background-hover: var(--green-4);
        }
        main-top-nav a.blue {
          --link-background: var(--blue-3);
          --link-background-hover: var(--blue-4);
        }
        main-top-nav a.indigo {
          --link-background: var(--indigo-3);
          --link-background-hover: var(--indigo-4);
        }
        main-top-nav a.purple {
          --link-background: var(--purple-3);
          --link-background-hover: var(--purple-4);
        }

        main-top-nav {
          display: flex;
          width: 100%;
          overflow: hidden;
          border-bottom: 1px solid var(--gray-3-50);
        }
        @media(min-width: 1000px) {
          main-top-nav {
            display: none;
          }
        }

        main-top-nav home-link {
          flex: 1 1 auto;
        }
        main-top-nav home-link a, main-top-nav home-link a:visited {
          display: inline-flex;
          align-items: center;
          color: var(--gray-5);
          text-decoration: none;
          padding: 12px;
          transition: color 0.3s;
        }
        main-top-nav home-link a ion-icon {
          margin-right: 6px;
        }
        main-top-nav home-link a:hover, main-top-nav home-link a:focus {
          color: var(--gray-7);
        }

        main-top-nav page-links {
          flex: 1 1 auto;
          text-align: right;
        }
        main-top-nav page-links a, main-top-nav page-links a:visited {
          flex: 1 1 auto;
          display: inline-flex;
          
          padding: 12px 2rem;
          margin-right: -2.75rem;

          max-width: 0.1rem;
          overflow: hidden;

          color: rgba(255, 255, 255, 0);
          background: var(--link-background);
          clip-path: polygon(1rem 0, 100% 0, 100% 100%, 0 100%);
          text-decoration: none;

          transition: all 0.3s;
        }
        main-top-nav page-links a:last-of-type {
          margin-right: -2.3rem;
        }
        main-top-nav page-links a:hover, main-top-nav page-links a:focus {
          color: rgba(255, 255, 255, 1.0);
          background: var(--link-background-hover);
          max-width: 20rem;
          margin-right: -1.3rem;
        }

        /*=== SIDE LEFT STYLES ===*/

        side-left {
          font-size: 0.9rem;
          color: var(--gray-5);
        }
        side-left h2 {
          font-size: 0.9rem;
          font-weight: 800;
          margin: 0;
        }
        @media(min-width: 1200px) {
          side-left {
            font-size: 1rem;
          }
          side-left h2 {
            font-size: 1rem;
          }
        }

        home-link-panel {
          display: block;
          margin-bottom: 36px;
        }
        home-link-panel a {
          display: flex;
          align-items: center;
        }
        home-link-panel a, home-link-panel a:visited {
          color: var(--gray-5);
          text-decoration: none;
          transition: color 0.3s;
        }
        home-link-panel a:focus, home-link-panel a:hover {
          color: var(--gray-7);
        }
        home-link-panel a ion-icon {
          margin-right: 6px;
        }

        /*=== SIDE LEFT - PAGE LIST ===*/

        side-left page-list {
          display: block;
          width: calc(var(--side-width) + 1.15rem);
          line-height: 120%;
          margin: 0 -1rem 24px -1rem;
          
          border-radius: 1.15rem 0 0 1.15rem;
          overflow: hidden;
          padding-bottom: 0.4rem;

          position: relative;
          left: -1.15rem;
        }
        side-left page-item {
          display: flex;
        }

        side-left page-item.red {
          --page-color-dark: var(--red-6);
          --page-color-main: var(--red-4);
          --page-color-medium: var(--red-3);
          --page-color-light: var(--red-4-70);
          --page-color-xlight: var(--red-3);
          --page-color-xlight-a: var(--red-3-70);
        }
        side-left page-item.orange {
          --page-color-dark: var(--orange-6);
          --page-color-main: var(--orange-4);
          --page-color-medium: var(--orange-3);
          --page-color-light: var(--orange-4-70);
          --page-color-xlight: var(--orange-3);
          --page-color-xlight-a: var(--orange-3-70);
        }
        side-left page-item.yellow {
          --page-color-dark: var(--yellow-7);
          --page-color-main: var(--yellow-5);
          --page-color-medium: var(--yellow-4);
          --page-color-light: var(--yellow-5-70);
          --page-color-xlight: var(--yellow-4);
          --page-color-xlight-a: var(--yellow-4-70);
        }
        side-left page-item.green {
          --page-color-dark: var(--green-6);
          --page-color-main: var(--green-4);
          --page-color-medium: var(--green-3);
          --page-color-light: var(--green-4-70);
          --page-color-xlight: var(--green-3);
          --page-color-xlight-a: var(--green-3-70);
        }
        side-left page-item.blue {
          --page-color-dark: var(--blue-6);
          --page-color-main: var(--blue-4);
          --page-color-medium: var(--blue-3);
          --page-color-light: var(--blue-4-70);
          --page-color-xlight: var(--blue-3);
          --page-color-xlight-a: var(--blue-3-70);
        }
        side-left page-item.indigo {
          --page-color-dark: var(--indigo-6);
          --page-color-main: var(--indigo-4);
          --page-color-medium: var(--indigo-3);
          --page-color-light: var(--indigo-4-70);
          --page-color-xlight: var(--indigo-3);
          --page-color-xlight-a: var(--indigo-3-70);
        }
        side-left page-item.purple {
          --page-color-dark: var(--purple-6);
          --page-color-main: var(--purple-4);
          --page-color-medium: var(--purple-3);
          --page-color-light: var(--purple-4-70);
          --page-color-xlight: var(--purple-3);
          --page-color-xlight-a: var(--purple-3-70);
        }

        side-left page-item spacer {
          flex: 0 0 auto;
        }
        side-left page-item a {
          flex: 1 1 auto;
          display: block;
          text-decoration: none;
          font-weight: 300;
          
          padding: 1rem 1.2rem 1rem 2rem;
          margin-bottom: -0.4rem;

          color: var(--gray-6);
          background: var(--page-color-xlight-a);
          
          transition: all 0.7s;
        }
        side-left page-item.circle a {
          border-radius: 0 500px 500px 0;
        }
        side-left page-item.rectangle a {
          clip-path: polygon(
            0 0,
            calc(100% - 0.75rem) 0,
            calc(100% - 0.75rem) 35%,
            100% 35% ,
            100% 100% ,
            0 100%
          );
        }
        side-left page-item.triangle a {
          clip-path: polygon(
            0 0,
            calc(100% - 1.5rem) 0,
            calc(100% - 0.375rem) 30%,
            calc(100% - 0.75rem) 40%,
            100% 60%,
            calc(100% - 1.625rem) 100%,
            0 100%
          );
        }
        side-left page-item a:hover, ide-left page-item a:focus {
          color: white;

          z-index: 3;
        }

        side-left page-item label {
          z-index: 2;
        }

        side-left hh-shape {
          position: absolute;
          z-index: 1;
          --hh-shape-color: var(--page-color-medium);
          --hh-shape-opacity: 0.4;
        }

        /*=== SIDE RIGHT DEFAULT CONTENT ===*/

        side-right {
          font-size: 0.9rem;
          color: var(--gray-5);
        }
        side-right h2 {
          font-size: 0.9rem;
          font-weight: 800;
          margin: 0;
        }
        @media(min-width: 1200px) {
          side-right {
            font-size: 1rem;
          }
          side-right h2 {
            font-size: 1rem;
          }
        }
        #external-link-list {
          list-style: none;
          padding: 0;
          margin: 32px 0 0 0;
        }
        #external-link-list > li {
          display: block;
          margin: 0 0 12px 0;

          font-weight: 200;
          line-height: 1.5em;
        }
        #external-link-list > li > a, #external-link-list > li > a:visited {
          display: flex;
          align-items: center;
          color: var(--gray-5);
          text-decoration: none;
          transition: color 0.3s;
        }
        #external-link-list > li > a:focus, #external-link-list > li > a:hover {
          color: var(--gray-7);
        }
        #external-link-list > li > a > ion-icon {
          color: inherit;
          margin-right: 10px;
        }
        #external-link-list > li > a > .title { display: none; }
        #external-link-list > li > a > .narrowTitle { display: inline; }
        @media(min-width: 1200px) {
          #external-link-list > li > a > .title { display: inline; }
          #external-link-list > li > a > .narrowTitle { display: none; }
        }

      `
    ];
  }

  // #=== TEMPLATE ===#

  // Overwrite this in sub elements if needed
  get sideLeftTemplate() {
    return html`
      
      <!-- #=== RETURN HOME LINK ===# -->
      <home-link-panel>
        <a href="/">
          <ion-icon name="arrow-back"></ion-icon>
          Back Home
        </a>
      </home-link-panel>

      <!-- #=== PAGE NAV LIST ===# -->
      <page-list>
        ${this.pages.map(page => html`
          <page-item class="${page.color} ${page.shape}">
            <a href="/${page.key}">${page.title}</a>
            <spacer style=${styleMap({
                width: `${page.offset/2}rem`,
            })}></spacer>
          </page-item>
        `)}
      </page-list>
      
    `;
  }
  
  // Overwrite this in sub elements if needed
  get sideRightTemplate() {
    return html`
      <h2>External Links</h2>

      <ul id="external-link-list">
        ${this.externalLinks.map(link => html`
          <li>
            <a href="${link.url}" target="_blank">
              <ion-icon name="${link.icon}"></ion-icon>
              <span class="title">${link.title}</span>
              <span class="narrowTitle">${link.narrowTitle}</span>
            </a>
          </li>
        `)}
      </ul>
    `;
  }
  
  // Overwrite this in sub elements (if you want to exclude the top nav)
  get mainTopNavTemplate() {
    return html`
      <!-- #=== PAGE NAV LIST ===# -->
      <main-top-nav>
        <home-link>
          <a href="/"><ion-icon icon="arrow-back"></ion-icon> Back Home</a>
        </home-link>
        <page-links>
          ${this.pages.map(page => html`
            <a
              href="/${page.key}"
              class="${page.color} ${page.shape}"
            >${page.title}</a>
          `)}
        </page-links>
      </main-top-nav>
    `;
  }
  
  // Overwrite this in sub elements (or there won't be any page content)
  get mainTemplate() {
    return html``;
  }

  // Overwrite this to add extra classes to the elements in the template
  get templateElementClasses() {
    return '';
  }

  render() {
    return html`
      <container class="${this.templateElementClasses}">
        <side-left class="${this.templateElementClasses}">
          ${this.sideLeftTemplate}
        </side-left>

        <main-wrapper>
          ${this.mainTopNavTemplate}

          <main class="${this.templateElementClasses}">
            ${this.mainTemplate}
          </main>
        </main-wrapper>

        <side-right class="${this.templateElementClasses}">
          ${this.sideRightTemplate}
        </side-right>
      </container>
    `;
  }
  
}

customElements.define('view-base', ViewBase);
