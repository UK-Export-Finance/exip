import { BUTTONS, LINKS, ORGANISATION } from '../../content-strings';
import partials from '../e2e/partials';
import { heading, submitButton } from '../e2e/pages/shared';

const lighthouseAudit = (lightHouseThresholds = {}) => {
  cy.lighthouse({
    accessibility: 100,
    performance: 75,
    'best-practices': 100,
    seo: 70,
    ...lightHouseThresholds,
  });
};

const backLink = (currentHref, expectedHref) => {
  partials.backLink().should('exist');
  cy.checkText(partials.backLink(), LINKS.BACK);

  partials.backLink().click();

  let expectedUrl = `${Cypress.config('baseUrl')}${expectedHref}`;

  /**
   * Some back links (start of the eligibility flow) can have external links.
   * Therefore we don't want to include the cypress baseUrl for these links.
   */
  if (expectedHref.includes('http')) {
    expectedUrl = expectedHref;
  }

  cy.url().should('eq', expectedUrl);

  // go back to the current page
  cy.navigateToUrl(`${Cypress.config('baseUrl')}${currentHref}`);
};

const pageTitleAndHeading = (pageTitle) => {
  const expectedPageTitle = `${pageTitle} - ${ORGANISATION}`;
  cy.title().should('eq', expectedPageTitle);

  cy.checkText(heading(), pageTitle);
};

export default ({
  pageTitle,
  currentHref,
  expectedBackLink,
  assertSubmitButton = true,
  submitButtonCopy = BUTTONS.CONTINUE,
  assertBackLink = true,
  lightHouseThresholds,
}) => {
  // run lighthouse audit
  lighthouseAudit(lightHouseThresholds);

  if (assertBackLink) {
    // check back link
    backLink(currentHref, expectedBackLink);
  }

  // check analytics cookie banner
  cy.checkAnalyticsCookiesConsentAndAccept();
  cy.rejectAnalyticsCookies();

  // check phase banner
  cy.checkPhaseBanner();

  // check page title and heading
  pageTitleAndHeading(pageTitle);

  if (assertSubmitButton) {
    // check submit button
    submitButton().should('exist');

    cy.checkText(submitButton(), submitButtonCopy);
  }
};
