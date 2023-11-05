import footer from '../../../partials/footer';
import { FOOTER } from '../../../content-strings';

const {
  PRIVACY, REPORT_VULNERABILITY, ACCESSIBILITY_STATEMENT, COOKIES, CONTACT,
} = FOOTER;

/**
 * checks footer links based on isInsuranceRoute is true or false
 * If true, then links should point to insurance routes
 * @param {Boolean} isInsurancePage - If page is an insurance page or otherwise
 */
const checkFooterLinks = ({ isInsurancePage }) => {
  cy.checkLink(footer.supportLinks.privacy(), PRIVACY.HREF, PRIVACY.TEXT);
  cy.checkLink(footer.supportLinks.reportVulnerability(), REPORT_VULNERABILITY.HREF, REPORT_VULNERABILITY.TEXT);

  if (isInsurancePage) {
    cy.checkLink(footer.supportLinks.accessibilityStatement(), ACCESSIBILITY_STATEMENT.INSURANCE_HREF, ACCESSIBILITY_STATEMENT.TEXT);
    cy.checkLink(footer.supportLinks.cookies(), COOKIES.INSURANCE_HREF, COOKIES.TEXT);
    cy.checkLink(footer.supportLinks.contact(), CONTACT.INSURANCE_HREF, CONTACT.TEXT);
  } else {
    cy.checkLink(footer.supportLinks.accessibilityStatement(), ACCESSIBILITY_STATEMENT.QUOTE_HREF, ACCESSIBILITY_STATEMENT.TEXT);
    cy.checkLink(footer.supportLinks.cookies(), COOKIES.QUOTE_HREF, COOKIES.TEXT);
    cy.checkLink(footer.supportLinks.contact(), CONTACT.QUOTE_HREF, CONTACT.TEXT);
  }
};

export default checkFooterLinks;
