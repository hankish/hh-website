import { html, css } from 'lit-element';

// import DropdownList from 'elix/define/DropdownList';

import { ViewBase } from './view-base.js';
import { HhSelect } from './hh-select.js';
import { ContentItem } from './content-item.js';
import { LitScrollListener } from './lit-scroll-listener.js';
import { LitScrollNav } from './lit-scroll-nav.js';

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

  // onBeforeLeave(location, commands, router) {
  //   // Check whether the new location is a tag within the current page
  //   const newLocationPath = (location.params.key || '').toLowerCase();
  //   const newPageKey = this.paths[newLocationPath];

  //   if (newPageKey === this.pageKey && this.tagFormat === 'scroll-nav') {
  //     this.scrollToItem(newLocationPath);
  //     return commands.prevent();
  //   }

  //   return null;
  // }

  firstUpdated() {
    if (this.tagFormat === 'scroll-nav') {
      this.scrollListener = new LitScrollListener(
        this.shadowRoot.querySelector('item-list-wrapper'),
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
    const itemListWrapperElement = this.shadowRoot.querySelector('item-list-wrapper');
    const targetItemElement = itemListWrapperElement.querySelector(`#${targetItemElementId}`);
    const extraOffset = -189;

    if (targetItemElement) {
      itemListWrapperElement.scrollTo({
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
      css`

        /*=== LEFT SIDEBAR STYLES ===*/

        side-left {
          color: rgba(255, 255, 255, 0.6);
        }

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

        side-left tag-list {
          margin-top: 136px;
        }
        side-left tag-list h2 {
          margin-bottom: 36px;
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

        main.blue { --main-background-color: var(--blue-5); }
        main.green { --main-background-color: var(--green-5); }
        main.indigo { --main-background-color: var(--indigo-5); }
        main.orange { --main-background-color: var(--orange-5); }
        main.purple { --main-background-color: var(--purple-5); }
        main.red { --main-background-color: var(--red-5); }
        main.yellow { --main-background-color: var(--yellow-7); }

        main { background: var(--main-background-color); }

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
          position: relative;
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

        /*=== ITEM LIST ===*/

        item-list-wrapper {
          flex: 1 1 auto;
          padding: 0 0 24px 0;
          
          overflow: scroll;
        }
        item-list-wrapper.scroll-nav {
          padding-bottom: 8rem;
        }
        @media(min-width: 1000px) {
          item-list-wrapper.scroll-nav {
            padding-bottom: 24px;
          }
        }

        item-list {
          display: block;
          min-height: calc(100% - 24px);

          border-left: 5px solid white;
          padding: 12px 24px;
        }
        content-item {
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
          font-weight: 200;
        }
        item-list.card-icon content-item, item-list.card-hero content-item {
          flex: 1 1 calc(50% - 24px);
          margin: 12px;
          min-width: 17em;
        }

        /*=== ITEM LIST - IMAGE FORMAT ===*/

        item-list.image {
          column-count: 2;
          column-gap: 1rem;

          padding: 12px;
        }
        item-list.image content-item {
          display: inline-flex;
          margin-bottom: 1rem;
        }
        @media(min-width: 1000px) {
          item-list.image {
            column-count: 3;
          }
        }

        /*=== TAG LIST (IN MAIN BODY) ===*/

        main tag-list {
          position: absolute;
          right: 12px;
          bottom: 0;
          left: 41px;
          padding: 12px 6px;

          background: var(--main-background-color);
          border-top: 2px solid rgba(255, 255, 255, 0.3);
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
      <link-panel>
        <a href="/">
          <ion-icon name="arrow-back"></ion-icon>
          Back Home
        </a>
      </link-panel>

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

      <item-list-wrapper class="${this.tagFormat}">
        <item-list class="${this.itemFormat}">
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
      </item-list-wrapper>
    `;
  }
  
}

customElements.define('page-view', PageView);
