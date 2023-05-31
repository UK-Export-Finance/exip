import footer from '../e2e/partials/footer';
import { FOOTER } from '../../content-strings';
import { ROUTES } from '../../constants';

const { ACCESSIBILITY_STATEMENT, COOKIES, CONTACT_US } = ROUTES.INSURANCE;
const {
  PRIVACY, REPORT_VULNERABILITY, ACCESSIBILITY_STATEMENT: ACCESSIBILITY_STATEMENT_FOOTER, COOKIES: COOKIES_FOOTER, CONTACT,
} = FOOTER;

/**
 * checks footer links based on isInsuranceRoute is true or false
 * If true, then links should point to insurance routes
 */
export default (isInsuranceRoute) => {
  cy.checkLink(footer.supportLinks.privacy(), PRIVACY.HREF, PRIVACY.TEXT);
  cy.checkLink(footer.supportLinks.reportVulnerability(), REPORT_VULNERABILITY.HREF, REPORT_VULNERABILITY.TEXT);

  if (isInsuranceRoute) {
    cy.checkLink(footer.supportLinks.accessibilityStatement(), ACCESSIBILITY_STATEMENT, ACCESSIBILITY_STATEMENT_FOOTER.TEXT);
    cy.checkLink(footer.supportLinks.cookies(), COOKIES, COOKIES_FOOTER.TEXT);
    cy.checkLink(footer.supportLinks.contact(), CONTACT_US, CONTACT.TEXT);
  } else {
    cy.checkLink(footer.supportLinks.accessibilityStatement(), ACCESSIBILITY_STATEMENT_FOOTER.HREF, ACCESSIBILITY_STATEMENT_FOOTER.TEXT);
    cy.checkLink(footer.supportLinks.cookies(), COOKIES_FOOTER.HREF, COOKIES_FOOTER.TEXT);
    cy.checkLink(footer.supportLinks.contact(), CONTACT.HREF, CONTACT.TEXT);
  }
};
