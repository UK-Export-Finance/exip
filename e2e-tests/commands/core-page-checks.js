import { BUTTONS, LINKS, ORGANISATION } from '../content-strings';
import { backLink as backLinkSelector, form, heading, submitButton } from '../pages/shared';

const baseUrl = Cypress.config('baseUrl');

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
 * @param {string} currentHref - Current HREF/route
 * @param {string} expectedHref - Expected "back" HREF/route
 */
const checkBackLink = (currentHref, expectedHref) => {
  cy.checkText(backLinkSelector(), LINKS.BACK);

  cy.clickBackLink();

  let expectedUrl = `${baseUrl}${expectedHref}`;

  /**
   * Some back links (start of the eligibility flow) can have external links.
   * Therefore we don't want to include the cypress baseUrl for these links.
   */
  if (expectedHref.includes('http')) {
    expectedUrl = expectedHref;
  }

  cy.url().should('eq', expectedUrl);

  // go back to current page
  cy.visit(`${baseUrl}${currentHref}`);
};

/**
 * checkPageTitleAndHeading
 * Check the page title and heading
 * @param {string} pageTitle - Expected page title
 */
const checkPageTitleAndHeading = (pageTitle) => {
  const expectedPageTitle = `${pageTitle} - ${ORGANISATION}`;
  cy.title().should('eq', expectedPageTitle);

  cy.checkText(heading(), pageTitle);
};

/**
 * corePageChecks
 * Check core/common page elements.
 * @param {string} pageTitle - Expected page title
 * @param {string} currentHref - Expected page HREF
 * @param {string} backLink - Expected "back" HREF
 * @param {boolean} hasAForm - Flag for if a page has a form, to check check form attributes and submit button (some paged do not have a form)
 * @param {string} submitButtonCopy - Expected submit button copy
 * @param {boolean} assertSaveAndBackButtonDoesNotExist - Flag for if we should check that a "save and back" button does not exist.
 * @param {boolean} assertBackLink - Should check "back" link (some pages do not have a back link)
 * @param {boolean} isInsurancePage - If page is an insurance page or otherwise
 * @param {boolean} assertServiceHeading - Should check service heading is for insurance or quote
 * @param {object} lightHouseThresholds - Custom expected lighthouse thresholds
 */
const corePageChecks = ({
  pageTitle,
  currentHref,
  backLink,
  hasAForm = true,
  submitButtonCopy = BUTTONS.CONTINUE,
  assertSaveAndBackButtonDoesNotExist = false,
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
    cy.checkAnalyticsCookiesConsentAndAccept({ isInsurancePage });
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

  /**
   * If the page has a form,
   * 1) Assert form attributes
   * 2) Assert submit button.
   */
  if (hasAForm) {
    form().should('have.attr', 'method', 'POST');
    form().should('have.attr', 'enctype', 'application/x-www-form-urlencoded');
    form().should('have.attr', 'novalidate');

    cy.checkText(submitButton(), submitButtonCopy);
  }

  if (assertSaveAndBackButtonDoesNotExist) {
    cy.assertSaveAndBackButtonDoesNotExist();
  } else {
    cy.assertSaveAndBackButton();
  }
};

export default corePageChecks;
