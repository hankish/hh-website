import { html, css } from 'lit-element';

import { ViewBase } from './view-base.js';
import { HhSelect } from './hh-select.js';
import { ContentItem } from './content-item.js';
import { LitScrollListener } from './lit-scroll-listener.js';
import { LitScrollNav } from './lit-scroll-nav.js';
import { backgroundStyles } from './styles/backgrounds.js';

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
      shape: { type: String },
      
      locationPath: { type: String },
      selectedTag: { type: String },

      scrollListener: { type: Object },
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
      this.shape = '';
    } else {
      this.title = page.title;
      this.itemFormat = page.item_format;
      this.tagFormat = page.tag_format;
      this.tags = page.tags;
      this.items = page.items;
      this.color = page.color;
      this.shape = page.shape;
      
      if (this.tags && this.tags.length) {
        this.selectedTag = (this.locationPath === this.pageKey)
          ? this.tags[0].key
          : this.locationPath;
      } else {
        this.selectedTag = null;
      }
    }
  }

  firstUpdated() {
    if (this.tagFormat === 'scroll-nav') {
      this.scrollListener = new LitScrollListener(
        this.shadowRoot.querySelector('main-wrapper'),
        this.tags,
      );
      
      if (this.locationPath !== this.pageKey) {
        // If the location path points to one of the child tags, scroll to it
        this.updateComplete.then(() => {
          this.scrollToItem(this.locationPath)
        });
      }

      // Queue up one more update to recalculate the offset tops once the update is complete
      this.updateComplete.then(() => {
        this.scrollListener.recalculateOffsetTops();
      });
    }
  }

  onAfterLeave() {
    if (this.scrollListener) {
      this.scrollListener.unregister();
    }
  }

  selectValueChanged(e) {
    window.location = `${window.location.origin}/${e.detail.value}`;
  }

  tagScrollItemClick(e) {
    const firingElement = e.path[0];

    if (
      firingElement.id
      && firingElement.tagName === 'A'
      && !e.metaKey && !e.shiftKey && !e.ctrlKey // let the user open in a new tab
    ) {
      // If this is a click on one of the anchor tags, prevent the navigation.
      // Instead we want to scroll down to the appropriate tag section header.
      e.preventDefault();
      this.scrollToItem(firingElement.id);
    }
  }

  // #=== ACTIONS ===#

  scrollToItem(targetItemElementId) {
    const scrollingElement = this.shadowRoot.querySelector('main-wrapper');
    const targetItemElement = scrollingElement.querySelector(`#${targetItemElementId}`);
    const extraOffset = -189;

    if (targetItemElement) {
      scrollingElement.scrollTo({
        top: targetItemElement.offsetTop + extraOffset,
        left: 0,
        behavior: 'smooth',
      });
    }
  }

  // #=== STYLES ===#

  static get styles() {
    return [
      super.styles,
      backgroundStyles,
      css`

        /*=== COLOR MODES ===*/

        container.blue {
          --page-color-main: var(--blue-5);
        }
        
        container.green {
          --page-color-main: var(--green-5);
        }
        
        container.indigo {
          --page-color-main: var(--indigo-5);
        }
        
        container.orange {
          --page-color-main: var(--orange-5);
        }
        
        container.purple {
          --page-color-main: var(--purple-5);
        }
        
        container.red {
          --page-color-main: var(--red-5);
        }
        
        container.yellow {
          --page-color-main: var(--yellow-7);
        }

        /*=== CONTAINER STYLES ===*/

        container {
          background: var(--gray-0);
        }
        container.rectangle {
          background-image: var(--background-image-rectangle-1);
        }
        container.circle {
          background-image: var(--background-image-circle-1);
        }
        container.triangle {
          background-image: var(--background-image-triangle-1);
        }

        /*=== LEFT SIDEBAR STYLES ===*/

        side-left tag-list {
          display: block;
          margin-top: 30px;
          padding: 24px 0;
          border-top: 1px solid var(--gray-3);
          border-bottom: 1px solid var(--gray-3);
        }
        side-left tag-list h2 {
          margin-bottom: 18px;
        }

        /*=== MAIN STYLE OVERRIDES ===*/
        
        main h1 {
          color: var(--page-color-main);
        }
        main h2 {
          color: var(--page-color-main);
        }
        
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
          padding-right: 0;
          position: relative;
        }

        page-header {
          flex: 0 0 auto;
          display: flex;
          flex-direction: row;
          padding: 0 24px;
          
          border-left: 5px solid var(--page-color-main);
        }
        page-title {
          flex: 1 1 auto;
          margin-top: 12px;
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
          color: var(--gray-7);
          transition: color 0.3s;
        }
        main a:focus, main a:hover {
          color: var(--gray-9);
        }

        tag-dropdown {
          flex: 0 0 auto;
          padding: 12px 24px;
          max-width: 400px;
          
          border-left: 5px solid var(--page-color-main);
        }

        /*=== ITEM LIST ===*/

        item-list {
          display: block;
          min-height: calc(100% - 24px);

          border-left: 5px solid var(--page-color-main);
          padding: 12px 24px;
        }
        item-list.scroll-nav {
          margin-bottom: 8rem;
        }
        @media(min-width: 1000px) {
          item-list.scroll-nav {
            margin-bottom: 24px;
          }
        }

        content-item {
          display: flex;
          margin-bottom: 30px;
        }
        content-item:last-of-type {
          margin-bottom: 0;
        }

        /*=== ITEM LIST - CARD ICON FORMAT & CARD HERO ICON FORMAT ===*/

        item-list.card-icon, item-list.card-hero {
          display: flex;
          flex-wrap: wrap;
          align-items: stretch;

          padding: 12px;
        }
        item-list.card-icon h2, item-list.card-hero h2 {
          flex: 1 1 100%;
          margin: 30px 12px;
          font-family: 'Public Sans', sans-serif;
          
          font-size: 1.13rem;
          font-weight: 300;
        }
        item-list.card-icon h2:first-child, item-list.card-hero h2:first-child {
          margin-top: 12px;
        }
        item-list.card-icon content-item, item-list.card-hero content-item {
          flex: 1 1 calc(50% - 24px);
          margin: 12px;
          min-width: 17em;
        }

        /*=== ITEM LIST - IMAGE FORMAT ===*/

        item-list.image {
          column-count: 2;
          column-gap: 2rem;

          padding: 24px;
        }
        item-list.image content-item {
          display: inline-flex;
          margin-bottom: 2rem;
        }

        /*=== TAG LIST (IN MAIN BODY) ===*/

        main tag-list {
          position: fixed;
          right: 12px;
          bottom: 0;
          left: 41px;
          padding: 12px 6px;

          background: white;
          border-top: 2px solid var(--gray-3-50);
        }
        @media(min-width: 1000px) {
          main tag-list {
            display: none;
          }
        }


      `
    ];
  }

  // #=== TEMPLATES ===#

  get sideLeftTemplate() {
    return html`
      ${super.sideLeftTemplate}

      ${this.tagFormat !== 'scroll-nav' ? null : html`
        <tag-list>
          <h2>Sections</h2>
          <lit-scroll-nav
            .scrollListener=${this.scrollListener}
            scrollItemTitleKey="title"
            itemLinkIdPrefix="/"
            @click=${this.tagScrollItemClick}
          ></lit-scroll-nav>
        </tag-list>
      `}
    `;
  }
  
  notFoundTemplate() {
    return html`
      <page-header>
        <page-title>
          <h1>Hank Holiday's Website</h1>
          <h2>Page Not Found</h2>
        </page-title>
      </page-header>
      
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
    `;
  }

  get templateElementClasses() {
    return this.notFound
      ? 'rainbow'
      : `${this.color} ${this.shape}`;
  }

  get mainTemplate() {
    if (this.notFound) return this.notFoundTemplate();

    // ITEM LIST LOGIC
    
    let itemList = this.items || [];
    if (this.tags && this.tags.length && (this.tagFormat === 'scroll-nav')) {
      // Group the items by tag and insert section headers between them
      itemList = this.tags.reduce((list, tag) => {
        return [
          ...list, 
          { ...tag, type: 'tag' },
          ...this.items.filter(item => item.tags.includes(tag.key))
        ]
      }, []);
    } else if (this.items && this.selectedTag && (this.tagFormat === 'dropdown')) {
      // Filter the items based on the selected tag
      itemList = this.items.filter(item => item.tags.includes(this.selectedTag));
    }

    // MAIN HTML CONTENT

    return html`
      <!-- #=== PAGE HEADER ===# -->
      <page-header>
        <page-title>
          <h1>Hank Holiday</h1>
          <h2>${this.title}</h2>
        </page-title>
      </page-header>

      ${(this.tags && this.tagFormat === 'dropdown') ? html`
        <!-- #=== TAG DROPDOWN ===# -->
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

      <!-- #=== ITEM LIST ===# -->
      <item-list class="${this.itemFormat} ${this.tagFormat}">
        ${itemList.map(item => {
          return item.type === 'tag'
            ? html`<h2 id="${item.key}">${item.title}</h2>`
            : html`<content-item .item=${item} .format=${this.itemFormat}></content-item>`;
        })}
      </item-list>

      ${this.tagFormat !== 'scroll-nav' ? null : html`
        <tag-list>
          <lit-scroll-nav
            class="pill-mode"
            .scrollListener=${this.scrollListener}
            scrollItemTitleKey="title"
            itemLinkIdPrefix="/"
            @click=${this.tagScrollItemClick}
          ></lit-scroll-nav>
        </tag-list>
      `}
    `;
  }
  
}

customElements.define('page-view', PageView);
