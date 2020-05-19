import { LitElement, html, css } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

/* eslint-disable class-methods-use-this */

// For each text mark type, this maps to a string literal with a single param for the text value.
// https://github.com/contentful/rich-text/blob/master/packages/rich-text-types/src/marks.ts
const markTemplates = {
  bold: (v) => `<strong>${v}</strong>`,
  italic: (v) => `<em>${v}</em>`,
  underline: (v) => `<u>${v}</u>`,
  code: (v) => `<pre>${v}</pre>`,
};

// For each type of node the below object should map it to a string literal template w/ two params:
// - n = The node itself
// - c = The recursively generated inner html of the content items inside of the node
// Documentation Lives Here: https://github.com/contentful ...
//   ... /rich-text/blob/master/packages/rich-text-types/src/schemaConstraints.ts
const nodeTemplates = {
  'unknown': (n, c) => `<div><strong>Unknown Content Type:</strong> ${n.nodeType}</div>`,
  'document': (n, c) => `<div class="rt-document">${c}</div>`,
  'paragraph': (n, c) => `<p>${c}</p>`,
  'hyperlink': (n, c) => `<a href="${n.data.uri}" target="_blank">${c}</a>`,
  'unordered-list': (n, c) => `<ul>${c}</ul>`,
  'ordered-list': (n, c) => `<ol>${c}</ol>`,
  'list-item': (n, c) => `<li>${c}</li>`,
  'heading-1': (n, c) => `<h1>${c}</h1>`,
  'heading-2': (n, c) => `<h2>${c}</h2>`,
  'heading-3': (n, c) => `<h3>${c}</h3>`,
  'heading-4': (n, c) => `<h4>${c}</h4>`,
  'heading-5': (n, c) => `<h5>${c}</h5>`,
  'heading-6': (n, c) => `<h6>${c}</h6>`,
  'blockquote': (n, c) => `<blockquote>${c}</blockquote>`,
  'hr': (n, c) => `<hr>`,
  'embedded-asset-block': (n, c) => `<img src="${n.data.target.fields.file.url}">`,
  'text': (n, c) => {
    if (!n.marks || !n.marks.length) return n.value;
    return n.marks.reduce((value, mark) => markTemplates[mark.type](value), n.value);
  },
};

export class LitContentfulRichText extends LitElement {

  // #=== PROPERTIES ===#
  
  static get properties() {
    return {
      value: { type: Object },
    };
  }

  // #=== STYLES ===#

  static get styles() {
    return [
      css`

        :host { display: block; }

        p { margin: var(--cfrt-p-margin, 1em 0); }

        img { max-width: 100%; max-height: 50vh; }

        h1, h2, h3, h4, h5, h6 { margin: var(--cfrt-h-margin, 1em 0); }

        h1 { font-size: 1.3em; font-weight: 600; }
        h2 { font-size: 1.2em; font-weight: 500; }
        h3 { font-size: 1.1em; font-weight: 500; }
        h4 { font-size: 1em; font-weight: 500; }
        h5 { font-size: 1em; font-weight: 400; font-style: italic; }
        h6 { font-size: 0.9em; font-weight: 400; }

        blockquote {
          margin-inline-start: 0;
          margin-inline-end: 0;
          padding: 0.2em 1em;
          border-left: 3px solid var(--blockquote-border-color, rgba(0, 0, 0, 0.12));
        }
        blockquote > p { margin: 0.5em 0; }

        li > p { margin: 0.5em 0; }

      `
    ];
  }

  // #=== TEMPLATES ===#

  convertNodeToHtml(node) {
    const contentHtml = node.content
      ? node.content.map(c => this.convertNodeToHtml(c)).join('')
      : null;
    
    const template = nodeTemplates[node.nodeType] || nodeTemplates.unknown;

    return template(node, contentHtml);
  }

  render() {
    if (!this.value) return null;

    return html`${unsafeHTML(this.convertNodeToHtml(this.value))}`;
  }

}

customElements.define('lit-cf-rich-text', LitContentfulRichText);