import { BUTTONS, LINKS, ORGANISATION } from '../content-strings';
import { backLink as backLinkSelector, heading, submitButton } from '../pages/shared';

// const lighthouseAudit = (lightHouseThresholds = {}) => {
//   cy.lighthouse({
//     accessibility: 100,
//     performance: 75,
//     'best-practices': 92,
//     seo: 70,
//     ...lightHouseThresholds,
//   });
// };

/**
 * checkBackLink
 * - Check the back link copy, HREF and previous page URL
 * - Navigate to the original page to continue the tests
 * @param {String} currentHref - Current HREF/route
 * @param {String} expectedHref - Expected "back" HREF/route
 */
const checkBackLink = (currentHref, expectedHref) => {
  backLinkSelector().should('exist');
  cy.checkText(backLinkSelector(), LINKS.BACK);

  cy.clickBackLink();

  let expectedUrl = `${Cypress.config('baseUrl')}${expectedHref}`;

  /**
   * Some back links (start of the eligibility flow) can have external links.
   * Therefore we don't want to include the cypress baseUrl for these links.
   */
  if (expectedHref.includes('http')) {
    expectedUrl = expectedHref;
  }

  cy.url().should('eq', expectedUrl);

  // go back to current page
  cy.visit(`${Cypress.config('baseUrl')}${currentHref}`);
};

/**
 * checkPageTitleAndHeading
 * Check the page title and heading
 * @param {String} pageTitle - Expected page title
 */
const checkPageTitleAndHeading = (pageTitle) => {
  const expectedPageTitle = `${pageTitle} - ${ORGANISATION}`;
  cy.title().should('eq', expectedPageTitle);

  cy.checkText(heading(), pageTitle);
};

/**
 * corePageChecks
 * Check core/common page elements.
 * @param {String} pageTitle - Expected page title
 * @param {String} currentHref - Expected page HREF
 * @param {String} backLink - Expected "back" HREF
 * @param {Boolean} assertSubmitButton - Should check submit button (some pages don't have a submit button)
 * @param {String} submitButtonCopy - Expected submit button copy
 * @param {Boolean} assertBackLink - Should check "back" link (some pages don't have a back link)
 * @param {Boolean} isInsurancePage - If page is an insurance page or otherwise
 * @param {Boolean} assertServiceHeading - Should check service heading is for insurance or quote
 * @param {Object} lightHouseThresholds - Custom expected lighthouse thresholds
 */
const corePageChecks = ({
  pageTitle,
  currentHref,
  backLink,
  assertSubmitButton = true,
  submitButtonCopy = BUTTONS.CONTINUE,
  assertBackLink = true,
  assertAuthenticatedHeader = true,
  assertCookies = true,
  isInsurancePage = true,
  assertServiceHeading = true,
  // lightHouseThresholds,
}) => {
  // run lighthouse audit
  // lighthouseAudit(lightHouseThresholds);

  if (assertBackLink) {
    // check back link
    checkBackLink(currentHref, backLink);
  }

  if (assertCookies) {
  // check analytics cookie banner
    cy.checkAnalyticsCookiesConsentAndAccept();
    cy.rejectAnalyticsCookies();
  }

  if (assertServiceHeading) {
    cy.checkHeaderServiceNameAndHref({ isInsurancePage });
  }

  if (assertAuthenticatedHeader) {
    // check authenticated header
    cy.checkAuthenticatedHeader();
  }

  // check phase banner
  cy.checkPhaseBanner({ isInsurancePage });

  cy.checkFooterLinks({ isInsurancePage });

  // check page title and heading
  checkPageTitleAndHeading(pageTitle);

  if (assertSubmitButton) {
    // check submit button
    submitButton().should('exist');

    cy.checkText(submitButton(), submitButtonCopy);
  }
};

export default corePageChecks;
