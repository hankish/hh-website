import { html, css } from 'lit-element';

import 'css-doodle';

import { ViewBase } from './view-base.js';
import { HhSelect } from './hh-select.js';
import { ContentItem } from './content-item.js';
import { LitScrollListener } from './lit-scroll-listener.js';
import { LitScrollNav } from './lit-scroll-nav.js';
import { backgroundStyles } from './styles/backgrounds.js';
import { HhDoodle } from './hh-doodle.js';
import { LitContentfulRichText } from './lit-contentful-rich-text.js';

/* eslint-disable class-methods-use-this */

export class PageView extends ViewBase {
  // #=== PROPERTIES ===#

  static get properties() {
    return {
      pageInitialized: { type: Boolean },
      notFound: { type: Boolean },
      dialogOpen: { type: Boolean },

      title: { type: String },
      summary: { type: String },
      pageKey: { type: String },
      itemFormat: { type: String },
      sectionFormat: { type: String },
      sections: { type: Array },
      color: { type: String },
      shape: { type: String },

      locationPath: { type: String },
      selectedTag: { type: String },

      scrollListener: { type: Object },
    };
  }

  // #=== LIFECYCLE ===#

  constructor() {
    super();

    this.pageInitialized = false;
    this.dialogOpen = false;
  }

  onAfterEnter(location, commands, router) {
    // Extract location path from the router params then get its corresponding page key from paths
    this.locationPath = (location.params.key || '').toLowerCase();

    this.initPageProperties();
  }

  onAfterLeave() {
    if (this.scrollListener) {
      this.scrollListener.unregister();
    }
  }

  contentLoaded() {
    this.initPageProperties();
  }

  contentLoadComplete() {
    if (this.sectionFormat === 'scroll-nav') {
      this.scrollListener = new LitScrollListener(
        this.shadowRoot.querySelector('main-wrapper'),
        this.sections,
      );

      if (this.locationPath !== this.pageKey) {
        // If the location path points to one of the child sections, scroll to it
        this.updateComplete.then(() => {
          this.scrollToItem(this.locationPath);
        });
      }
    }

    this.shadowRoot.querySelectorAll('content-item').forEach((item) => {
      item.addEventListener('dialog-opened', e => this.itemDialogOpened(e));
      item.addEventListener('dialog-closed', e => this.itemDialogClosed(e));
    });
  }

  // #=== EVENTS ===#

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

  itemDialogOpened() {
    this.dialogOpen = true;
  }

  itemDialogClosed() {
    this.dialogOpen = false;
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

  initPageProperties() {
    this.pageKey = this.paths[this.locationPath];

    // Retrieve the matching page from pages
    const page = this.pageKey ? this.allPages.find(p => p.key === this.pageKey) : null;
    this.notFound = !page;

    if (this.notFound) {
      this.title = null;
      this.summary = null;
      this.itemFormat = null;
      this.sectionFormat = null;
      this.sections = null;
      this.color = '';
      this.shape = '';

      this.setDocumentTitle('Page Not Found');
    } else {
      this.title = page.title;
      this.summary = page.summary;
      this.itemFormat = page.itemFormat;
      this.sectionFormat = page.sectionFormat;
      this.sections = page.sections;
      this.color = page.color;
      this.shape = page.shape;

      this.setDocumentTitle(page.documentTitle);

      if (this.tags && this.tags.length) {
        this.selectedTag = (this.locationPath === this.pageKey)
          ? this.tags[0].key
          : this.locationPath;
      } else {
        this.selectedTag = null;
      }
    }

    this.pageInitialized = true;
  }

  // #=== STYLES ===#

  static get styles() {
    return [
      super.styles,
      backgroundStyles,
      css`

        /*=== COLOR MODES ===*/

        container.blue {
          --page-color-light: var(--blue-4);
          --page-color-main: var(--blue-5);
        }
        
        container.green {
          --page-color-light: var(--green-4);
          --page-color-main: var(--green-5);
        }
        
        container.indigo {
          --page-color-light: var(--indigo-4);
          --page-color-main: var(--indigo-5);
        }
        
        container.orange {
          --page-color-light: var(--orange-4);
          --page-color-main: var(--orange-5);
        }
        
        container.purple {
          --page-color-light: var(--purple-4);
          --page-color-main: var(--purple-5);
        }
        
        container.red {
          --page-color-light: var(--red-4);
          --page-color-main: var(--red-5);
        }
        
        container.yellow {
          --page-color-light: var(--yellow-6);
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
          padding: 0 8rem 0 24px;
          position: relative;
          
          border-left: 5px solid var(--page-color-main);
        }
        page-title {
          flex: 1 1 auto;
          margin-top: 12px;

          z-index: 2;
        }
        page-header hh-doodle {
          position: absolute;
          top: 0;
          right: 1.5rem;
          z-index: 1;
        }
        page-header hh-doodle.rectangle {
          top: 1.3rem;
          right: 2.5rem;
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
          display: block;
          
          flex: 0 0 auto;
          padding: 12px 24px;
          max-width: 400px;
          z-index: 3;
          
          border-left: 5px solid var(--page-color-main);
        }
        page-summary {
          display: block;
          
          flex: 0 0 auto;
          padding: 12px 24px;
          z-index: 3;
          
          border-left: 5px solid var(--page-color-main);
        }
        page-summary lit-cf-rich-text {
          background: rgba(255, 255, 255, 0.75);

          --cfrt-p-margin: 0;
          --cfrt-p-first-margin-top: 0;
          --cfrt-p-last-margin-bottom: 0;
        }

        /*=== ITEM LIST ===*/

        item-list {
          display: block;
          min-height: calc(100% - 24px);

          border-left: 5px solid var(--page-color-main);
          padding: 12px 24px;

          z-index: 5;
        }
        item-list.scroll-nav {
          margin-bottom: 8rem;
        }
        @media(min-width: 1000px) {
          item-list.scroll-nav {
            margin-bottom: 24px;
          }
        }
        item-list h2 {
          flex: 1 1 100%;
          margin: 30px 12px;
          font-family: 'Public Sans', sans-serif;
          
          font-size: 1.13rem;
          font-weight: 300;
        }
        item-list h2 a, item-list h2 a:visited {
          position: relative;
          top: 0.18em;
          font-size: 1.1em;
          margin-left: 6px;
          color: var(--page-color-light);
        }
        item-list section-summary {
          flex: 1 1 100%;
          margin: -12px 12px 30px 12px;
          font-size: 1rem;
          color: var(--page-color-main);
          font-weight: 200;
          font-style: italic;

          opacity: 0.7;

          --cfrt-p-first-margin-top: 0;
          --cfrt-p-last-margin-bottom: 0;
        }

        content-item {
          display: flex;
          margin-bottom: 30px;
        }
        content-item:last-of-type {
          margin-bottom: 0;
        }

        /*=== ITEM LIST - TEXT FORMAT ===*/

        item-list.text h2 {
          margin: 30px 0;
        }

        /*=== ITEM LIST - CARD ICON FORMAT & CARD HERO ICON FORMAT ===*/

        item-list.card-icon, item-list.card-hero {
          display: flex;
          flex-wrap: wrap;
          align-items: stretch;

          padding: 12px;
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
          display: flex;
          flex-wrap: wrap;
          align-items: stretch;

          padding: 12px;
        }
        item-list.image h2:first-child {
          margin-top: 12px;
        }
        item-list.image content-item {
          flex: 1 1 calc(50% - 24px);
          margin: 12px;
          min-width: 17em;
        }

        /*=== CONTENTFUL RICH TEXT ===*/

        lit-cf-rich-text h3 {
          color: blue;
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
          z-index: 5;
        }
        @media(min-width: 1000px) {
          main tag-list {
            display: none;
          }
        }

        /*=== NOT FOUND MODE ===*/

        doodle-wrapper {
          display: block;
          width: calc(100% - var(--main-padding));
          height: 20rem;
          border: 2px solid var(--gray-3);
          border-radius: 23px;
          overflow: hidden;
          margin-top: 36px;
        }


      `,
    ];
  }

  // #=== TEMPLATES ===#

  get sideLeftTemplate() {
    return html`
      ${super.sideLeftTemplate}

      ${this.sectionFormat !== 'scroll-nav' ? null : html`
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

  get templateElementClasses() {
    return this.notFound
      ? 'notFound'
      : `${this.color} ${this.shape}`;
  }

  get itemsTemplate() {
    if (this.notFound || !this.sections || !this.sections.length) return null;

    const itemTemplate = (item) => html`
      <content-item
        .item=${item}
        .format=${this.itemFormat}
        .bodyExpandable=${this.itemFormat.includes('card')}
      ></content-item>
    `;

    // SECTION FORMAT: SCROLL NAV

    if (this.sectionFormat === 'scroll-nav') {
      return html`
        ${this.sections.map(section => html`
        
          <h2 id="${section.key}">
            ${section.title}
            <a href="${`/${section.key}`}"><ion-icon name="link"></ion-icon></a>
          </h2>
          ${!section.summary ? null : html`
            <section-summary>
              <lit-cf-rich-text .value=${section.summary}></lit-cf-rich-text>
            </section-summary>
          `}
          
          ${(section.items || []).map(item => itemTemplate(item))}
        
        `)}
      `;
    }

    // SECTION FORMAT: DROPDOWN

    if (this.sectionFormat === 'dropdown') {
      const currentSection = this.sections.find(s => s.key === this.selectedSection);

      return (currentSection.items || []).map(item => itemTemplate(item));
    }

    // If there is no section format then create a "flattened" item list
    const flatItemList = [].concat(...this.sections.map(s => s.items));

    return flatItemList.map(item => itemTemplate(item));
  }

  get mainTemplate() {
    if (this.notFound) return this.notFoundTemplate;

    // MAIN HTML CONTENT

    return html`
      <!-- #=== PAGE HEADER ===# -->
      <page-header>
        <page-title>
          <h1>Hank Holiday</h1>
          <h2>${this.title}</h2>
        </page-title>

        <hh-doodle
          .shape=${this.shape}
          class="${this.color} ${this.shape}"
        ></hh-doodle>
      </page-header>

      ${!this.summary ? null : html`
        <page-summary>
          <lit-cf-rich-text .value=${this.summary}></lit-cf-rich-text>
        </page-summary>
      `}

      ${(this.sections && this.sectionFormat === 'dropdown') ? html`
        <!-- #=== TAG DROPDOWN ===# -->
        <tag-dropdown>
          <hh-select
            .value=${this.selectedTag}
            .options=${this.sections}
            valueFrom="key"
            labelFrom="title"
            @value-changed=${this.selectValueChanged}
          ></hh-select>
        </tag-dropdown>
      ` : html``}

      <!-- #=== ITEM LIST ===# -->
      <item-list class="${this.itemFormat} ${this.sectionFormat}">
        ${this.itemsTemplate}
      </item-list>

      <!-- #=== MOBILE TAG LIST (HIDDEN WHEN DIALOG IS OPEN) ===# -->
      ${(this.sectionFormat !== 'scroll-nav' || this.dialogOpen) ? null : html`
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

  get notFoundTemplate() {
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

        <doodle-wrapper>
          <css-doodle class="not-found">
          :doodle {
            flex: none;
            @grid: 12x16;
            @size: 800px 600px;
            overflow: hidden;
            background-color: var(--blue-0);
          }
          :container {
            animation: container 8s linear infinite both;
          }
          overflow: hidden;
          opacity: .85;
          @row(even) {
            animation: rowEven 8s ease both infinite @r(0, .15s);

            ::before { animation: before 8s ease both infinite @r(0, .15s); }
            ::after { animation: after 8s ease both infinite @r(0, .15s); }

            @odd {
              ::before { background-image: linear-gradient(var(--blue-5) 50%, var(--blue-4) 50%); }
              ::after { background-image: linear-gradient(var(--blue-6) 50%, var(--blue-2) 50%); }
            }
            @even {
              ::before {
                background-image: linear-gradient(90deg, var(--green-7) 50%, var(--green-3) 50%);
              }
              ::after {
                background-image: linear-gradient(90deg, var(--green-4) 50%, var(--green-2) 50%);
              }
            }
          }
          @row(odd) {
            animation: rowOdd 8s ease both infinite @r(2s, 2.15s);

            ::before { animation: before 8s ease both infinite @r(2s, 2.15s); }
            ::after { animation: after 8s ease both infinite @r(2s, 2.15s); }

            @odd {
              ::before { background-image: linear-gradient(var(--indigo-4) 50%, var(--indigo-3) 50%); }
              ::after { background-image: linear-gradient(var(--indigo-5) 50%, var(--indigo-7) 50%); } 
            }
            @even {
              ::before { background-image: linear-gradient(90deg, var(--purple-4) 50%, var(--purple-2) 50%); }
              ::after {
                background-image: linear-gradient(90deg, var(--purple-6) 50%, var(--purple-5) 50%);
              }
            }
          }
          ::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            @size: 100%;
          }
          ::after {
            content: "";
            position: absolute;
            top: 50%;
            left: 50%;
            @size: 80%;
            margin-top: -40%;
            margin-left: -40%;
            border-radius: 100%;
          }
          @keyframes rowEven {
            0% { transform: translate(50%, 0);}
            6% { transform: translate(155%, 0);}
            10% { transform: translate(150%, 0);}
            50% { transform: translate(150%, 0);}
            55% { transform: translate(45%, 0);}
            60% { transform: translate(50%, 0);}
            100% { transform: translate(50%, 0); }
          }
          @keyframes rowOdd {
            0% { transform: translate(0%, 0);}
            6% { transform: translate(105%, 0);}
            10% { transform: translate(100%, 0);}
            50% { transform: translate(100%, 0);}
            55% { transform: translate(-5%, 0);}
            60% { transform: translate(0%, 0);}
            100% { transform: translate(0%, 0); }
          }
          @keyframes before {
            0% { transform: rotate(0deg) }
            6% { transform: rotate(95deg) }
            10% { transform: rotate(90deg) }
            50% { transform: rotate(90deg) }
            55% { transform: rotate(-5deg) }
            60% { transform: rotate(0deg) }
          }
          @keyframes after {
            0% { transform: rotate(0deg) }
            6% { transform: rotate(-95deg) }
            10% { transform: rotate(-90deg) }
            50% { transform: rotate(-90deg) }
            55% { transform: rotate(5deg) }
            60% { transform: rotate(0deg) }
          }
          @keyframes container {
            0% { transform: scale(3) rotate(-45deg) translate3d(50px, -50px, 0); }
            100% { transform: scale(3) rotate(-45deg) translate3d(-50px, 50px, 0); }
          }
          </css-doodle>
        </doodle-wrapper>

        <p>
          The CSS doodle above was stolen with ♥️ from 
          <a href="https://codepen.io/aragakey/pen/LowQdY" target="_blank">this Codepen</a> by
          <a href="https://twitter.com/jiangyijie27" target="_blank">@Aragakey</a>.
        </p>
      </item-list>
    `;
  }
}

customElements.define('page-view', PageView);
