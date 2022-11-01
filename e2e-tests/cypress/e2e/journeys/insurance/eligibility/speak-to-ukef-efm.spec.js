import { heading, yesRadio, noRadio, submitButton } from '../../../pages/shared';
import { insurance } from '../../../pages';
import partials from '../../../partials';
import { LINKS, ORGANISATION, PAGES } from '../../../../../content-strings';
import CONSTANTS from '../../../../../constants';
import { completeAndSubmitBuyerCountryForm } from '../../../../support/forms';

const CONTENT_STRINGS = PAGES.INSURANCE.ELIGIBILITY.SPEAK_TO_UKEF_EFM;
const { ACTIONS } = CONTENT_STRINGS;

const { ROUTES } = CONSTANTS;

const COUNTRY_NAME_APPLY_OFFLINE_ONLY = 'Angola';

context('Insurance Eligibility - speak to UKEF EFM exit page', () => {
  beforeEach(() => {
    cy.visit(ROUTES.INSURANCE.ELIGIBILITY.BUYER_COUNTRY, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });

    completeAndSubmitBuyerCountryForm();

    yesRadio().click();
    submitButton().click();

    yesRadio().click();
    submitButton().click();

    noRadio().click();
    submitButton().click();

    yesRadio().click();
    submitButton().click();

    cy.url().should('include', ROUTES.INSURANCE.ELIGIBILITY.SPEAK_TO_UKEF_EFM);
  });

  it('passes the audits', () => {
    cy.lighthouse({
      accessibility: 100,
      performance: 75,
      'best-practices': 100,
      seo: 60,
    });
  });

  it('renders an analytics cookies consent banner that can be accepted', () => {
    cy.checkAnalyticsCookiesConsentAndAccept();
  });

  it('renders an analytics cookies consent banner that can be rejected', () => {
    cy.rejectAnalyticsCookies();
  });

  it('renders a phase banner', () => {
    cy.checkPhaseBanner();
  });

  it('renders a back link with correct url', () => {
    partials.backLink().should('exist');

    partials.backLink().invoke('text').then((text) => {
      expect(text.trim()).equal(LINKS.BACK);
    });

    const expected = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ELIGIBILITY.INSURED_PERIOD}`;

    partials.backLink().should('have.attr', 'href', expected);
  });

  it('renders a page title and heading', () => {
    const expectedPageTitle = `${CONTENT_STRINGS.PAGE_TITLE} - ${ORGANISATION}`;
    cy.title().should('eq', expectedPageTitle);

    heading().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.PAGE_TITLE);
    });
  });

  it('renders `find your nearest EFM` copy with link', () => {
    insurance.eligibility.speakToUkefEfmPage.action.text().invoke('text').then((text) => {
      const expected = `${ACTIONS.FIND_EFM[0][0].text} ${ACTIONS.FIND_EFM[0][1].text}${ACTIONS.FIND_EFM[0][2].text}`;

      expect(text.trim()).equal(expected);
    });

    insurance.eligibility.speakToUkefEfmPage.action.link().invoke('text').then((text) => {
      const expected = `${ACTIONS.FIND_EFM[0][1].text}`;

      expect(text.trim()).equal(expected);
    });

    const expectedHref = ACTIONS.FIND_EFM[0][1].href;

    insurance.eligibility.speakToUkefEfmPage.action.link().should('have.attr', 'href', expectedHref);
  });
});
