# Hank Holiday Personal Website #

This repo contains my personal website.

Here's a few details about the implementation:
- It's a [lit-element](https://lit-element.polymer-project.org/)-based single-page javascript application.
- I used the [open-wc reccomendations skeleton](https://open-wc.org/) as a starting point and heartily recommend it. Open WC is a fantastic resource made by extremely knowledgeable folks. 
- If you're new to lit-element, start here: [Open WC Codelabs](https://open-wc.org/codelabs/)
- If you have questions about lit or web components in general, join this slack: [Polymer Project Slack](https://polymer.slack.com/join/shared_invite/enQtNTAzNzg3NjU4ODM4LTAzMzZlY2M0NWYxNGFhMjA1MDE2NTFlZWIyYzE4NzgxNDgxZGIxZjdiYjA3NGNlODA3YWJkZmM4NzQwMzdlZWY#/).
- I'm using the [Contentful CMS](https://www.contentful.com/) to store and manage the actual site content. You can see the code that queries the CMS in the [hh-content](src/hh-content.js) component. Also I couldn't get Contentful's own rich text rendering component to work in an ES6-based toolchain so I ended up making my own here: [lit-contentful-rich-text](src/lit-contentful-rich-text.js).
- I'm hosting the app using [Netlify](https://www.netlify.com/) which is awesome and easy and free. Open WC has a great walkthrough here: [Open WC Recommendations - Deploying](https://open-wc.org/deploying/).

## Scripts

- `npm start` runs the app in development mode, reloading on file changes
- `npm run build` re-builds the app and outputs it to the `dist` directory
- `npm start:build` runs the app after it has been built using the build command
- `npm test` runs the test suite with Karma
- `npm lint` runs the linter
