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

  const expectedUrl = `${Cypress.config('baseUrl')}${expectedHref}`;

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
  assertSubmitButton = false,
  lightHouseThresholds,
}) => {
  // run lighthouse audit
  lighthouseAudit(lightHouseThresholds);

  // check back link
  backLink(currentHref, expectedBackLink);

  // check analytics cookie banner
  cy.checkAnalyticsCookiesConsentAndAccept();
  cy.rejectAnalyticsCookies();

  // check phase banner
  cy.checkPhaseBanner();

  // check page title and heading
  pageTitleAndHeading(pageTitle);

  // check submit button
  if (assertSubmitButton) {
    submitButton().should('exist');

    cy.checkText(submitButton(), BUTTONS.CONTINUE);
  }
};
