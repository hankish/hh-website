import 'contentful/dist/contentful.browser.min.js'; /* global contentful */
import { contentfulClientParams } from './environment.js';

// This constant is used to build the mainPages list. Each of these items will appear in mainPages
// regardless of the content that comes back from the CMS. The main pages returned by the CMS will
// be associated with the last values of this list.
const mainPageStyles = [
  {
    color: 'red',
    shape: 'circle',
    height: 8.25,
    width: 8.25,
    offset: 0.45,
  },
  {
    color: 'orange',
    shape: 'triangle',
    height: 17.75,
    width: 17.75,
    offset: 0,
  },
  {
    color: 'yellow',
    shape: 'rectangle',
    height: 5.8,
    width: 5.8,
    offset: 2.3,
  },
  {
    color: 'green',
    shape: 'circle',
    height: 9.4,
    width: 9.4,
    offset: 1.2,
  },
  {
    color: 'blue',
    shape: 'triangle',
    height: 8,
    width: 8,
    offset: 5.4,
  },
  {
    color: 'indigo',
    shape: 'rectangle',
    height: 3.7,
    width: 6.4,
    offset: 2.3,
  },
];

// These are used to add colors / styles to hidden pages
const pageShapes = ['circle', 'triangle', 'rectangle'];
const pageColors = ['blue', 'green', 'indigo', 'orange', 'purple', 'red', 'yellow'];

export class cms {
  // This method recursively loops through a (potentially deeply nested) Contenful object and
  // replaces each nested object with its own 'fields' key.
  static flattenContentfulFields(contentfulReturnObject) {
    if (contentfulReturnObject.fields === undefined) return contentfulReturnObject;

    return Object.fromEntries(
      Object.entries(contentfulReturnObject.fields).map((item) => {
        const key = item[0];
        let value = item[1];

        if (value instanceof Array) {
          value = value.map(subItem => this.flattenContentfulFields(subItem));
        } else if (value instanceof Object) {
          value = this.flattenContentfulFields(value);
        }

        return [key, value];
      }),
    );
  }

  // This method builds the mainPages list by padding the list of main pages returned by the CMS
  // and decorating them with the mainPageStyles.
  static buildMainNavItems(mainPages) {
    return [
      ...Array(Math.max(0, mainPageStyles.length - mainPages.length)).fill({}),
      ...mainPages,
    ].map((page, index) => ({
      ...page,
      ...mainPageStyles[index % mainPageStyles.length],
      hover: false,
    }));
  }

  static decorateHiddenPages(hiddenPages) {
    return hiddenPages.map(p => ({
      ...p,
      shape: pageShapes[Math.floor(Math.random() * pageShapes.length)],
      color: pageColors[Math.floor(Math.random() * pageColors.length)],
    }));
  }

  static getContent() {
    const client = contentful.createClient(contentfulClientParams);

    return new Promise((resolve, reject) => {
      // Attempt to pull the content from the cache variable declared in the index.html file
      if (hhContentCache) {
        resolve(hhContentCache);
      } else {
        // Query the server if this is the initial page load
        client.getEntries({
          content_type: 'site',
          include: 5,
        }).then((values) => {
          const siteContent = this.flattenContentfulFields(
            values.items.find(s => s.fields.key === 'main'),
          );

          siteContent.mainNavItems = this.buildMainNavItems(siteContent.mainPages);
          siteContent.mainPages = siteContent.mainNavItems.filter(p => !!p.key);
          siteContent.hiddenPages = this.decorateHiddenPages(siteContent.hiddenPages);
          siteContent.allPages = [...siteContent.mainPages, ...siteContent.hiddenPages];

          /*
            SITE CONTENT PATHS SETUP

            The paths object contains keys for all of the navigable top-level url paths. It contains
            keys for each page and for each section within each page.

            A page path maps to itself, a section path maps to the parent page. It looks like this:

            ```
              {
                'example-page-key': 'example-page-key',
                'example-section-key': 'parent-page-key',
                'another-section-key': 'parent-page-key',
              }
            ```
          */
          siteContent.paths = Object.fromEntries([
            // First extract all of the section keys from their pages and create entry pairs.
            // A page starts like this => { key:'page-key', sections: [{ key:'s1' }, { key:'s2' }] }
            // And we want to conver it to this => ['s1': 'page-key'], ['s2': 'page-key']
            ...siteContent.allPages.reduce((outerList, page) => [
              ...outerList,
              ...page.sections.reduce((innerList, section) => [
                ...innerList,
                [section.key, page.key],
              ], []),
            ], []),
  
            // Then add all of the page keys themselves => ['page-key': 'page-key']
            ...siteContent.allPages.map(page => [page.key, page.key]),
          ]);

          // Cache the content for the next page navigation, then resolve the promise
          hhContentCache = siteContent;
          resolve(siteContent);
        });
      }
    });
  }
}
