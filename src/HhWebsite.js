import { LitElement, html, css } from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map';
import { colorStyles } from './styles/colors.js';
import './hh-shape.js';

export class HhWebsite extends LitElement {

  // #=== PROPERTIES ===#
  
  static get properties() {
    return {
      links: { type: Array },
      externalLinks: { type: Array },
      pages: { type: Array },
    };
  }
  
  // #=== LIFECYCLE ===#

  constructor() {
    super();

    this.links = [
      {
        title: "Entrepreneur",
        key: "entrepreneur",
      },
      {
        title: "Technical Leader",
        key: "leader",
      },
      {
        title: "Software Engineer",
        key: "engineer",
      },
      {
        title: "Salesforce Architect",
        key: "salesforce",
      },
      {
        title: "UI/UX Designer",
        key: "design",
      },
      {
        title: "Inventor",
        key: "fixme",
      },
      {
        title: "Technical Business Operations Expert",
        key: "operations",
      },
    ];

    this.externalLinks = [
      {
        title: 'LinkedIn Profile',
        narrowTitle: 'LinkedIn',
        url: 'https://www.linkedin.com/in/hankholiday/',
        icon: 'logo-linkedin',
      },
      {
        title: 'Twitter Profile',
        narrowTitle: 'Twitter',
        url: 'https://twitter.com/hankish',
        icon: 'logo-twitter',
      },
      {
        title: 'Github Profile',
        narrowTitle: 'Github',
        url: 'https://github.com/hankish',
        icon: 'logo-github',
      },
      {
        title: 'Medium Stories',
        narrowTitle: 'Medium',
        url: 'https://medium.com/@hankish',
        icon: 'document-text-outline',
      },
      {
        title: 'Site Source Code',
        narrowTitle: 'Site Source',
        url: 'https://github.com/hankish/hh-website',
        icon: 'code-slash-outline',
      },
    ];
    
    this.pages = [
      {
        key: "journey",
        title: "Journey",
        color: "red",
        shape: "circle",
        height: "8.25rem",
        width: "8.25rem",
        offset: "0.45rem",
        hover: false,
        sections: ["Section 1", "Section 2", "Section 3"],
        item_format: "simple-overline",
        items: [
          {
            overline: "1970",
            title: "Und wandelt mit bedächtger Schnelle Vom Himmel",
            body: "Gewöhnlich glaubt der Mensch, wenn er sie beim Kragen hätte. Es irrt der Mensch, wenn er sie beim Kragen hätte. Gewöhnlich glaubt der Mensch, wenn er sie beim Kragen hätte. Vom Rechte, das mit Recht; denn alles, was ihr Sünde, Zerstörung, kurz das Böse will und stets das Gute schafft. Es irrt der Mensch, wenn er sie beim Kragen hätte. Wenn sich der Mensch, wenn er sie beim Kragen hätte. Es irrt der Mensch, wenn er nur Worte hört, Es müsse sich dabei doch auch was denken lassen. Wenn sich der Mensch, wenn er gut gezogen, Wird selbst ein weiser Mann gewogen. Gewöhnlich glaubt der Mensch, wenn er sie beim Kragen hätte. Ich höre schon des Dorfs Getümmel, Hier ist des Volkes wahrer Himmel, Zufrieden jauchzet groß und klein, Hier bin ich nicht; doch viel ist mir bewusst. Gewöhnlich glaubt der Mensch, wenn er sie beim Kragen hätte. Ich bin von je der Ordnung Freund gewesen. Es irrt der Mensch, wenn er nur Worte hört, Es müsse sich dabei doch auch was denken lassen. Dem Hunde, wenn er sie beim Kragen hätte. Ich bin von je der Ordnung Freund gewesen. Wenn sich der Mensch, wenn er nur Worte hört, Es müsse sich dabei doch auch was denken lassen.",
          },
          {
            overline: "1971",
            title: "Und wandelt mit bedächtger Schnelle Vom Himmel",
            body: "Gewöhnlich glaubt der Mensch, wenn er sie beim Kragen hätte. Es irrt der Mensch, wenn er sie beim Kragen hätte. Gewöhnlich glaubt der Mensch, wenn er sie beim Kragen hätte. Vom Rechte, das mit Recht; denn alles, was ihr Sünde, Zerstörung, kurz das Böse will und stets das Gute schafft. Es irrt der Mensch, wenn er sie beim Kragen hätte. Wenn sich der Mensch, wenn er sie beim Kragen hätte. Es irrt der Mensch, wenn er nur Worte hört, Es müsse sich dabei doch auch was denken lassen. Wenn sich der Mensch, wenn er gut gezogen, Wird selbst ein weiser Mann gewogen. Gewöhnlich glaubt der Mensch, wenn er sie beim Kragen hätte. Ich höre schon des Dorfs Getümmel, Hier ist des Volkes wahrer Himmel, Zufrieden jauchzet groß und klein, Hier bin ich nicht; doch viel ist mir bewusst. Gewöhnlich glaubt der Mensch, wenn er sie beim Kragen hätte. Ich bin von je der Ordnung Freund gewesen. Es irrt der Mensch, wenn er nur Worte hört, Es müsse sich dabei doch auch was denken lassen. Dem Hunde, wenn er sie beim Kragen hätte. Ich bin von je der Ordnung Freund gewesen. Wenn sich der Mensch, wenn er nur Worte hört, Es müsse sich dabei doch auch was denken lassen.",
          },
          {
            overline: "1972",
            title: "Und wandelt mit bedächtger Schnelle Vom Himmel",
            body: "Gewöhnlich glaubt der Mensch, wenn er sie beim Kragen hätte. Es irrt der Mensch, wenn er sie beim Kragen hätte. Gewöhnlich glaubt der Mensch, wenn er sie beim Kragen hätte. Vom Rechte, das mit Recht; denn alles, was ihr Sünde, Zerstörung, kurz das Böse will und stets das Gute schafft. Es irrt der Mensch, wenn er sie beim Kragen hätte. Wenn sich der Mensch, wenn er sie beim Kragen hätte. Es irrt der Mensch, wenn er nur Worte hört, Es müsse sich dabei doch auch was denken lassen. Wenn sich der Mensch, wenn er gut gezogen, Wird selbst ein weiser Mann gewogen. Gewöhnlich glaubt der Mensch, wenn er sie beim Kragen hätte. Ich höre schon des Dorfs Getümmel, Hier ist des Volkes wahrer Himmel, Zufrieden jauchzet groß und klein, Hier bin ich nicht; doch viel ist mir bewusst. Gewöhnlich glaubt der Mensch, wenn er sie beim Kragen hätte. Ich bin von je der Ordnung Freund gewesen. Es irrt der Mensch, wenn er nur Worte hört, Es müsse sich dabei doch auch was denken lassen. Dem Hunde, wenn er sie beim Kragen hätte. Ich bin von je der Ordnung Freund gewesen. Wenn sich der Mensch, wenn er nur Worte hört, Es müsse sich dabei doch auch was denken lassen.",
          },
          {
            overline: "1973",
            title: "Und wandelt mit bedächtger Schnelle Vom Himmel",
            body: "Gewöhnlich glaubt der Mensch, wenn er sie beim Kragen hätte. Es irrt der Mensch, wenn er sie beim Kragen hätte. Gewöhnlich glaubt der Mensch, wenn er sie beim Kragen hätte. Vom Rechte, das mit Recht; denn alles, was ihr Sünde, Zerstörung, kurz das Böse will und stets das Gute schafft. Es irrt der Mensch, wenn er sie beim Kragen hätte. Wenn sich der Mensch, wenn er sie beim Kragen hätte. Es irrt der Mensch, wenn er nur Worte hört, Es müsse sich dabei doch auch was denken lassen. Wenn sich der Mensch, wenn er gut gezogen, Wird selbst ein weiser Mann gewogen. Gewöhnlich glaubt der Mensch, wenn er sie beim Kragen hätte. Ich höre schon des Dorfs Getümmel, Hier ist des Volkes wahrer Himmel, Zufrieden jauchzet groß und klein, Hier bin ich nicht; doch viel ist mir bewusst. Gewöhnlich glaubt der Mensch, wenn er sie beim Kragen hätte. Ich bin von je der Ordnung Freund gewesen. Es irrt der Mensch, wenn er nur Worte hört, Es müsse sich dabei doch auch was denken lassen. Dem Hunde, wenn er sie beim Kragen hätte. Ich bin von je der Ordnung Freund gewesen. Wenn sich der Mensch, wenn er nur Worte hört, Es müsse sich dabei doch auch was denken lassen.",
          },
          {
            overline: "1974",
            title: "Und wandelt mit bedächtger Schnelle Vom Himmel",
            body: "Gewöhnlich glaubt der Mensch, wenn er sie beim Kragen hätte. Es irrt der Mensch, wenn er sie beim Kragen hätte. Gewöhnlich glaubt der Mensch, wenn er sie beim Kragen hätte. Vom Rechte, das mit Recht; denn alles, was ihr Sünde, Zerstörung, kurz das Böse will und stets das Gute schafft. Es irrt der Mensch, wenn er sie beim Kragen hätte. Wenn sich der Mensch, wenn er sie beim Kragen hätte. Es irrt der Mensch, wenn er nur Worte hört, Es müsse sich dabei doch auch was denken lassen. Wenn sich der Mensch, wenn er gut gezogen, Wird selbst ein weiser Mann gewogen. Gewöhnlich glaubt der Mensch, wenn er sie beim Kragen hätte. Ich höre schon des Dorfs Getümmel, Hier ist des Volkes wahrer Himmel, Zufrieden jauchzet groß und klein, Hier bin ich nicht; doch viel ist mir bewusst. Gewöhnlich glaubt der Mensch, wenn er sie beim Kragen hätte. Ich bin von je der Ordnung Freund gewesen. Es irrt der Mensch, wenn er nur Worte hört, Es müsse sich dabei doch auch was denken lassen. Dem Hunde, wenn er sie beim Kragen hätte. Ich bin von je der Ordnung Freund gewesen. Wenn sich der Mensch, wenn er nur Worte hört, Es müsse sich dabei doch auch was denken lassen.",
          },
        ],
      },
      {
        key: "skills",
        title: "Skills",
        color: "orange",
        shape: "triangle",
        height: "17.75rem",
        width: "17.75rem",
        offset: "0",
        hover: false,
        item_format: "card-icon",
      },
      {
        key: "projects",
        title: "Projects",
        color: "yellow",
        shape: "rectangle",
        height: "5.8rem",
        width: "5.8rem",
        offset: "2.3rem",
        hover: false,
        item_format: "card-hero-icon",
      },
      {
        key: "portfolio",
        title: "Portfolio",
        color: "green",
        shape: "circle",
        height: "9.4rem",
        width: "9.4rem",
        offset: "1.2rem",
        hover: false,
        item_format: "image",
      },
      {
        key: "inspiration",
        title: "Inspiration",
        color: "blue",
        shape: "triangle",
        height: "8rem",
        width: "8rem",
        offset: "6.4rem",
        hover: false,
        item_format: "card-hero",
      },
      {
        key: "colleagues",
        title: "Colleagues",
        color: "indigo",
        shape: "rectangle",
        height: "3.7rem",
        width: "6.4rem",
        offset: "2.3rem",
        hover: false,
        item_format: "quote",
      },
    ];
  }
  
  // #=== EVENTS ===#

  pageItemEnter(e) {
    this.pages = this.pages.map(page => {
      return {
        ...page,
        hover: (e.target.dataset.key === page.key),
      };
    });
  }
  
  pageItemLeave(e) {
    this.pages = this.pages.map(page => {
      return {
        ...page,
        hover: ((e.target.dataset.key === page.key) ? false : page.hover),
      };
    });
  }
  
  // #=== STYLES ===#

  static get styles() {
    return [
      colorStyles,
      css`

        :host {
          display: flex;
          flex-direction: row;
          align-items: flex-start;

          height: 100vh;

          color: var(--gray-7);
          background: var(--gray-0);
        
          --side-padding: 24px;
          --side-min-width: 150px;
          --main-padding: 24px;
          --main-max-width: 700px;
        }
        @media(min-width: 1732px) {
          :host {
            --side-padding: 46px;
            --side-min-width: 300px;
            --main-padding: 24px;
            --main-max-width: 900px;
          }
        }

        side-left {
          flex: 1 0 var(--side-min-width);
          padding: 36px var(--side-padding);
        }

        side-right {
          flex: 1 0 var(--side-min-width);
          padding: 36px var(--side-padding);
          color: var(--gray-5);
        }
        side-right h2 {
          font-size: 1rem;
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
        #external-link-list > li > a {
          display: flex;
          align-items: center;
          color: var(--gray-5);
          text-decoration: none;
        }
        #external-link-list > li > a:visited {
          color: var(--gray-5);
          text-decoration: none;
        }
        #external-link-list > li > a > ion-icon {
          color: var(--gray-5);
          margin-right: 10px;
        }
        #external-link-list > li > a > .title { display: none; }
        #external-link-list > li > a > .narrowTitle { display: inline; }
        @media(min-width: 1200px) {
          #external-link-list > li > a > .title { display: inline; }
          #external-link-list > li > a > .narrowTitle { display: none; }
        }


        main {
          flex: 10 0 560px;
          max-width: var(--main-max-width);
          background: white;
          padding: var(--main-padding);
          
          height: calc(100vh - 48px);
          display: flex;
          flex-direction: column;
        }

        h1 {
          flex: 0 0 auto;
          margin: 0 0 24px 0;

          font-family: 'Playfair Display', serif;
          font-size: 3rem;
          font-weight: 900;
          max-width: 5em;
        }

        main-inner {
          flex: 1 1 auto;

          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          padding-left: 20px;
        }
        main-inner::before {
          content: ' ';
          display: block;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          width: 5px;
          
          background: linear-gradient(180deg, var(--gray-2) 0%, var(--gray-6) 100%);
        }

        #link-list {
          list-style: none;
          padding: 0;
          margin: 0;

          max-width: 40rem;
        }
        #link-list > li {
          display: inline-block;
          color: var(--gray-5);
          font-weight: 200;
          line-height: 1.5em;
        }
        #link-list > li > a {
          color: var(--gray-5);
          text-decoration: none;
        }
        #link-list > li > .comma {
          margin-left: -0.2em;
        }
        #link-list > li:last-of-type > .comma {
          display: none;
        }

        page-list {
          display: block;
          font-size: 1.25rem;
          line-height: 1.2em;
        }
        page-item {
          display: flex;
          flex-direction: row;
          align-items: center;

          height: 30px;
          padding: 12px 0;
        }

        page-item a {
          text-decoration: none;
          font-weight: 300;
          
          color: var(--gray-7);
          transition: color 700ms;
        }
        page-item a.red:hover { color: var(--red-6); }
        page-item a.orange:hover { color: var(--orange-6); }
        page-item a.yellow:hover { color: var(--yellow-6); }
        page-item a.green:hover { color: var(--green-6); }
        page-item a.blue:hover { color: var(--blue-6); }
        page-item a.indigo:hover { color: var(--indigo-6); }
        page-item a.purple:hover { color: var(--purple-6); }
        
        connector-line {
          flex: 1 1 auto;
          height: 3px;
          margin: 0 12px;
          background: transparent;
          transition: background 700ms;
        }
        connector-line.hover.red { background: var(--red-3); }
        connector-line.hover.orange { background: var(--orange-3); }
        connector-line.hover.yellow { background: var(--yellow-3); }
        connector-line.hover.green { background: var(--green-3); }
        connector-line.hover.blue { background: var(--blue-3); }
        connector-line.hover.indigo { background: var(--indigo-3); }
        connector-line.hover.purple { background: var(--purple-3); }

        hh-shape {
          transition: margin 700ms;
        }
        hh-shape.red { --hh-shape-color: var(--red-4); }
        hh-shape.orange { --hh-shape-color: var(--orange-4); }
        hh-shape.yellow { --hh-shape-color: var(--yellow-4); }
        hh-shape.green { --hh-shape-color: var(--green-4); }
        hh-shape.blue { --hh-shape-color: var(--blue-4); }
        hh-shape.indigo { --hh-shape-color: var(--indigo-4); }
        hh-shape.purple { --hh-shape-color: var(--purple-4); }

      `
    ];
  }

  // #=== TEMPLATE ===#

  render() {
    return html`
      <side-left>
        <a href="#">
          Back to Home
        </a>
      </side-left>

      <main>
        <h1>Hank Holiday</h1>

        <main-inner>
          <ul id="link-list">
            ${this.links.map(link => html`
              <li>
                <a href="#${link.key}">${link.title}</a>
                <span class="comma">,</span>
              </li>
            `)}
          </ul>

          <page-list>
            ${this.pages.map(page => html`
              <page-item
                data-key="${page.key}"
                @mouseenter="${this.pageItemEnter}"
                @mouseleave="${this.pageItemLeave}"
              >
                <label>
                  <a
                    href="#${page.key}"
                    class="${page.color}"
                  >${page.title}</a>
                </label>
                <connector-line
                  class="${page.color} ${page.shape} ${page.hover ? 'hover' : ''}"
                  style=${styleMap({
                    marginRight: (page.shape === 'triangle'
                      ? `calc(-${page.width} / 7)`
                      : '12px'
                    ),
                  })}
                ></connector-line>
                <hh-shape
                  .shape=${page.shape}
                  class="${page.color}"
                  style=${styleMap({
                    width: page.width,
                    height: page.height,
                    marginRight: (page.hover ? '15rem' : page.offset),
                  })}
                ></hh-shape>
              </page-item>
            `)}
          </page-list>
        </main-inner>
      </main>

      <side-right>
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
      </side-right>
    `;
  }
  
}
