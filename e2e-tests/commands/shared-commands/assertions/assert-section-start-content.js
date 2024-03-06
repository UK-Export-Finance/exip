import {
  listItem,
  listOutro,
  outro,
  startNowLink,
  allSectionsLink,
} from '../../../pages/shared';
import { BUTTONS } from '../../../content-strings';

/**
 * assertSectionStartContent
 * Assert various pieces of content in a "section start" page.
 */
const assertSectionStartContent = {
  intro: (expectedText) => cy.checkIntroText(expectedText),
  list: {
    items: (expectedItems) => {
      expectedItems.forEach((expectedText, index) => {
        cy.checkText(listItem(index + 1), expectedText);
      });
    },
    outro: (expectedText) => cy.checkText(listOutro(), expectedText),
  },
  outro: (expectedText) => cy.checkText(outro(), expectedText),

  startNow: {
    link: ({ expectedUrl }) => {
      cy.checkLink(
        startNowLink(),
        expectedUrl,
        BUTTONS.START_NOW,
      );
    },
    linkRedirection: ({ currentUrl, expectedUrl }) => {
      cy.navigateToUrl(currentUrl);

      startNowLink().click();

      cy.assertUrl(expectedUrl);
    },
  },
  allSections: {
    link: ({ expectedUrl }) => {
      cy.checkLink(
        allSectionsLink(),
        expectedUrl,
        BUTTONS.START_DIFFERENT_SECTION,
      );
    },
    linkRedirection: ({ currentUrl, expectedUrl }) => {
      cy.navigateToUrl(currentUrl);

      allSectionsLink().click();

      cy.assertUrl(expectedUrl);
    },
  },
};

export default assertSectionStartContent;
