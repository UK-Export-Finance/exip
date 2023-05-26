import footer from '../e2e/partials/footer';
import { FOOTER } from '../../content-strings';
import { ROUTES } from '../../constants';

const { ACCESSIBILITY_STATEMENT, COOKIES, CONTACT_US } = ROUTES.INSURANCE;

/**
 * checks footer links based on isInsuranceRoute is true or false
 * If true, then links should point to insurance routes
 */
export default (isInsuranceRoute) => {
  if (isInsuranceRoute) {
    cy.checkLink(footer.supportLinks.accessibilityStatement(), ACCESSIBILITY_STATEMENT, FOOTER.ACCESSIBILITY_STATEMENT.TEXT);
    cy.checkLink(footer.supportLinks.privacy(), FOOTER.PRIVACY.HREF, FOOTER.PRIVACY.TEXT);
    cy.checkLink(footer.supportLinks.cookies(), COOKIES, FOOTER.COOKIES.TEXT);
    cy.checkLink(footer.supportLinks.reportVulnerability(), FOOTER.REPORT_VULNERABILITY.HREF, FOOTER.REPORT_VULNERABILITY.TEXT);
    cy.checkLink(footer.supportLinks.contact(), CONTACT_US, FOOTER.CONTACT.TEXT);
  } else {
    cy.checkLink(footer.supportLinks.accessibilityStatement(), FOOTER.ACCESSIBILITY_STATEMENT.HREF, FOOTER.ACCESSIBILITY_STATEMENT.TEXT);
    cy.checkLink(footer.supportLinks.privacy(), FOOTER.PRIVACY.HREF, FOOTER.PRIVACY.TEXT);
    cy.checkLink(footer.supportLinks.cookies(), FOOTER.COOKIES.HREF, FOOTER.COOKIES.TEXT);
    cy.checkLink(footer.supportLinks.reportVulnerability(), FOOTER.REPORT_VULNERABILITY.HREF, FOOTER.REPORT_VULNERABILITY.TEXT);
    cy.checkLink(footer.supportLinks.contact(), FOOTER.CONTACT.HREF, FOOTER.CONTACT.TEXT);
  }
};
