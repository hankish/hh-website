import { html, css } from 'lit-element';

// import DropdownList from 'elix/define/DropdownList';

import { ViewBase } from './view-base.js';
import { HhSelect } from './hh-select.js';

/* eslint-disable class-methods-use-this */

export class PageView extends ViewBase {

  // #=== PROPERTIES ===#
  
  static get properties() {
    return {
      notFound: { type: Boolean },

      title: { type: String },
      pageKey: { type: String },
      itemFormat: { type: String },
      tagFormat: { type: String },
      tags: { type: Array },
      items: { type: Array },
      color: { type: String },
      
      locationPath: { type: String },
      selectedTag: { type: String },
    };
  }

  // #=== EVENTS ===#

  onBeforeEnter(location, commands, router) {
    // Extract location path from the router params then get its corresponding page key from paths
    this.locationPath = location.params.key.toLowerCase();
    this.pageKey = this.paths[this.locationPath];

    // Retrieve the matching page from pages
    const page = this.pageKey ? this.pages.find(p => p.key === this.pageKey) : null;
    this.notFound = !page;
    
    if (this.notFound) {
      this.title = null;
      this.itemFormat = null;
      this.tagFormat = null;
      this.tags = null;
      this.items = null;
      this.color = '';
    } else {
      this.title = page.title;
      this.itemFormat = page.item_format;
      this.tagFormat = page.tag_format;
      this.tags = page.tags;
      this.items = page.items;
      this.color = page.color;

      if (this.tags && this.tags.length) {
        this.selectedTag = (this.locationPath === this.pageKey)
          ? this.tags[0].key
          : this.locationPath;
      } else {
        this.selectedTag = null;
      }
    }
  }

  selectValueChanged(e) {
    window.location = `${window.location.origin}/${e.detail.value}`;
  }

  // #=== STYLES ===#

  static get styles() {
    return [
      super.styles,
      css`

        /*=== LEFT SIDEBAR STYLES ===*/

        link-panel a {
          display: flex;
          align-items: center;
        }
        link-panel a, link-panel a:visited {
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          transition: color 0.3s;
        }
        link-panel a:focus, link-panel a:hover {
          color: white;
        }
        link-panel a ion-icon {
          margin-right: 6px;
        }

        /*=== RIGHT SIDEBAR STYLE OVERRIDES ===*/

        side-right {
          color: rgba(255, 255, 255, 0.6);
        }

        #external-link-list > li > a {
          color: rgba(255, 255, 255, 0.6);
          transition: color 0.3s;
        }
        #external-link-list > li > a:hover, #external-link-list > li > a:focus {
          color: white;
        }

        /*=== MAIN STYLE OVERRIDES ===*/
        
        main {
          color: white;
        }

        /*=== COLOR MODES ===*/

        main.blue { background: var(--blue-5); }
        main.green { background: var(--green-5); }
        main.indigo { background: var(--indigo-5); }
        main.orange { background: var(--orange-5); }
        main.purple { background: var(--purple-5); }
        main.red { background: var(--red-5); }
        main.yellow { background: var(--yellow-7); }

        container.blue { background: var(--blue-6); }
        container.green { background: var(--green-6); }
        container.indigo { background: var(--indigo-6); }
        container.orange { background: var(--orange-6); }
        container.purple { background: var(--purple-6); }
        container.red { background: var(--red-6); }
        container.yellow { background: var(--yellow-8); }
        
        /*=== RAINBOW MODE ===*/

        main.rainbow {
          background: rgba(255, 255, 255, 0.05);
        }
        container.rainbow {
          background: linear-gradient(124deg,
            var(--red-5),
            var(--orange-5),
            var(--green-5),
            var(--blue-5),
            var(--indigo-5),
            var(--purple-5)
          );
          background-size: 400% 400%;

          -webkit-animation: rainbow 8s ease infinite;
          -z-animation: rainbow 8s ease infinite;
          -o-animation: rainbow 8s ease infinite;
          animation: rainbow 8s ease infinite;
        }

        @-webkit-keyframes rainbow {
          0% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
          100% { background-position: 0% 0%; }
        }
        @-moz-keyframes rainbow {
          0% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
          100% { background-position: 0% 0%; }
        }
        @-o-keyframes rainbow {
          0% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
          100% { background-position: 0% 0%; }
        }
        @keyframes rainbow { 
          0% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
          100% { background-position: 0% 0%; }
        }

        /*=== MAIN BODY LAYOUT ===*/

        main {
          display: flex;
          flex-direction: column;
          height: calc(100vh - 24px);
          padding: 24px 0 0 24px;
        }

        page-header {
          flex: 0 0 auto;
          display: flex;
          flex-direction: row;
          padding: 12px 24px;
          
          border-left: 5px solid white;
        }
        page-title {
          flex: 1 1 auto;
          margin-top: 12px;
        }
        page-header > .action {
          flex: 0 0 auto;
          display: block;
          color: white;
          font-size: 1.6rem;
        }
        h1 {
          font-size: 1rem;
          font-weight: normal;
          margin: 0;
        }
        h2 {
          font-size: 2.25rem;
          font-weight: 900;
          margin: 0;
        }
        main a, main a:visited {
          color: rgba(255, 255, 255, 0.85);
          transition: color 0.3s;
        }
        main a:focus, main a:hover {
          color: rgba(255, 255, 255, 1);
        }

        tag-dropdown {
          flex: 0 0 auto;
          padding: 12px 24px;
          max-width: 400px;
          
          border-left: 5px solid white;
        }

        item-list-wrapper {
          flex: 1 1 auto;
          overflow: scroll;
          padding: 0 0 24px 0;
        }
        item-list {
          display: block;
          min-height: calc(100% - 24px);

          border-left: 5px solid white;
          padding: 12px 24px;
        }
        item {
          display: block;
          margin: 12px 0;
        }


      `
    ];
  }

  // #=== TEMPLATES ===#

  get sideLeftTemplate() {
    return html`
      <link-panel>
        <a href="/">
          <ion-icon name="arrow-back"></ion-icon>
          Back Home
        </a>
      </link-panel>
    `;
  }
  
  notFoundTemplate() {
    return html`
      <page-header>
        <page-title>
          <h1>Hank Holiday's Website</h1>
          <h2>Page Not Found</h2>
        </page-title>
        <a href="/" title="Back to Home" class="action"><ion-icon name="close"></ion-icon></a>
      </page-header>
      <item-list-wrapper>
        <item-list>
          <p>Hmm, it looks like this page couldn't be found.</p>
          <p>
            Need something to do? This 
            <a
              href="https://www.modernhoney.com/the-best-snickerdoodle-cookie-recipe/"
              target="_blank"
            >recipe for snickerdoodles</a>
            is fantastic.
          </p>
        </item-list>
      </item-list-wrapper>
    `;
  }

  get templateElementClasses() {
    return this.notFound ? 'rainbow' : this.color;
  }

  get mainTemplate() {
    if (this.notFound) return this.notFoundTemplate();

    return html`
      <page-header>
        <page-title>
          <h1>Hank Holiday</h1>
          <h2>${this.title}</h2>
        </page-title>
        <a href="/" title="Back to Home" class="action"><ion-icon name="close"></ion-icon></a>
      </page-header>

      ${(this.tags && this.tagFormat === 'dropdown') ? html`
        <tag-dropdown>
          <hh-select
            .value=${this.selectedTag}
            .options=${this.tags}
            valueFrom="key"
            labelFrom="title"
            @value-changed=${this.selectValueChanged}
          ></hh-select>
        </tag-dropdown>
      ` : html``}

      <item-list-wrapper>
        <item-list>
          ${(this.items || []).filter(item =>
            !this.selectedTag || item.tags.includes(this.selectedTag)
          ).map(item => html`
            <item>
              <h3>${item.title}</h3>
              <p>${item.body}</p>
            </item>
          `)}
        </item-list>
      </item-list-wrapper>
    `;
  }
  
}

customElements.define('page-view', PageView);
