import 'contentful/dist/contentful.browser.min.js';
import { contentfulClientParams } from './credentials.js';

// This constant is used to build the mainPages list. Each of these items will appear in mainPages
// regardless of the content that comes back from the CMS. The main pages returned by the CMS will
// be associated with the last values of this list.
const mainPageStyles = [
  {
    color: "red",
    shape: "circle",
    height: 8.25,
    width: 8.25,
    offset: 0.45,
  },
  {
    color: "orange",
    shape: "triangle",
    height: 17.75,
    width: 17.75,
    offset: 0,
  },
  {
    color: "yellow",
    shape: "rectangle",
    height: 5.8,
    width: 5.8,
    offset: 2.3,
  },
  {
    color: "green",
    shape: "circle",
    height: 9.4,
    width: 9.4,
    offset: 1.2,
  },
  {
    color: "blue",
    shape: "triangle",
    height: 8,
    width: 8,
    offset: 6.4,
  },
  {
    color: "indigo",
    shape: "rectangle",
    height: 3.7,
    width: 6.4,
    offset: 2.3,
  },
];

export class cms {

  // This method recursively loops through a (potentially deeply nested) Contenful object and 
  // replaces each nested object with its own 'fields' key.
  static flattenContentfulFields(contentfulReturnObject) {
    if (contentfulReturnObject.fields === undefined) return contentfulReturnObject;
    
    return Object.fromEntries(
      Object.entries(contentfulReturnObject.fields).map(item => {
        let [key, value] = item;

        if (value instanceof Array) {
          value = value.map(subItem => this.flattenContentfulFields(subItem));
        } else if (value instanceof Object) {
          value = this.flattenContentfulFields(value);
        }

        return [key, value];
      })
    );
  }

  // This method builds the mainPages list by padding the list of main pages returned by the CMS
  // and decorating them with the mainPageStyles.
  static buildMainPages(mainPages) {
    return [
      ...Array(Math.max(0, mainPageStyles.length - mainPages.length)).fill({}),
      ...mainPages
    ].map((page, index) => ({
      ...page,
      ...mainPageStyles[index % mainPageStyles.length],
      hover: false,
    }));
  }

  static getContent() {
    const client = contentful.createClient(contentfulClientParams);

    const siteEntries = client.getEntries({
      content_type: 'site',
      include: 5,
    });

    return new Promise((resolve, reject) => {
      siteEntries.then((values) => {
        const siteContent = this.flattenContentfulFields(
          values.items.find(s => s.fields.key === 'main')
        );

        const allPages = [...siteContent.mainPages, ...siteContent.hiddenPages];

        const paths = Object.fromEntries([
          ...allPages.map((page) => [
            page.key,
            page.key
          ]),
          // ...pages.reduce((paths, page) => {
          //   return page.items.map
          //   // LEFT OFF HERE... trying to figure out how to extract and dedupe the tags.
          //   // FIRST THOUGH ... I might need to tweak the data model to link tags to pages
          // otherwise i can't sort the tags within the page
          //   // https://medium.com/dailyjs/how-to-remove-array-duplicates-in-es6-5daa8789641c
          // })
        ]);

        resolve({
          ...siteContent,
          mainPages: this.buildMainPages(siteContent.mainPages),
          allPages,
          paths
        });
      });
    });
  }

}
