import { pageNotFoundPage } from '../../../pages';
import { PAGES } from '../../../content-strings';

const CONTENT_STRINGS = PAGES.PAGE_NOT_FOUND_PAGE;

/**
 * checkPageNotFoundPageText
 * checks the text and links on page not found page
 * if insurance page, checks that href points to insurance contact us
 * @param {Object} params isInsurancePage
 */
const checkPageNotFoundPageText = ({ isInsurancePage = true }) => {
  cy.checkText(pageNotFoundPage.typedAddress(), CONTENT_STRINGS.TYPED_ADDRESS);

  cy.checkText(pageNotFoundPage.pastedAddress(), CONTENT_STRINGS.PASTED_ADDRESS);

  cy.checkText(pageNotFoundPage.contact1(), CONTENT_STRINGS.CONTACT.TEXT);

  cy.checkText(pageNotFoundPage.contact2(), CONTENT_STRINGS.CONTACT.LINK.TEXT);

  cy.checkText(pageNotFoundPage.contact3(), CONTENT_STRINGS.CONTACT.OUTRO);

  if (isInsurancePage) {
    cy.checkLink(pageNotFoundPage.contactLink(), CONTENT_STRINGS.CONTACT.LINK.INSURANCE_HREF, CONTENT_STRINGS.CONTACT.LINK.TEXT);
  } else {
    cy.checkLink(pageNotFoundPage.contactLink(), CONTENT_STRINGS.CONTACT.LINK.QUOTE_HREF, CONTENT_STRINGS.CONTACT.LINK.TEXT);
  }
};

export default checkPageNotFoundPageText;
