import { html, css } from 'lit-element';

import { ViewBase } from './view-base.js';

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
      
      selectedKey: { type: String },
    };
  }

  // #=== EVENTS ===#

  onBeforeEnter(location, commands, router) {
    this.selectedKey = location.params.key;
    this.notFound = !this.title;
  }

  // #=== ACTIONS ===#

  set selectedKey(value) {
    const page = this.pages.find(p => p.key === value);

    if (page) {
      this.title = page.title;
      this.pageKey = page.key;
      this.itemFormat = page.item_format;
      this.tagFormat = page.tag_format;
      this.tags = page.tags;
      this.items = page.items;
    }

    this.requestUpdate('selectedKey', value);
  }

  // #=== STYLES ===#

  static get styles() {
    return [
      super.styles,
      css`
        
        items {
          display: block;
        }
        
        item {
          display: block;
        }

      `
    ];
  }

  // #=== TEMPLATE ===#

  notFoundTemplate() {
    return html`
      <h2>Not Found</h2>
      <p>This page could not be found.</p>
    `;
  }

  get mainTemplate() {
    if (this.notFound) {
      return this.notFoundTemplate();
    }

    return html`
      <h1>Hank Holiday</h1>
      <h2>${this.title}</h2>

      <items>
        ${this.items.map(item => html`
          <item>
            ${item.title}
          </item>
        `)}
      </items>
    `;
  }
  
}

customElements.define('page-view', PageView);
