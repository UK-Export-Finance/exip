import {
  heading, yesRadio, submitButton,
} from '../../pages/shared';
import { insurance } from '../../pages';
import partials from '../../partials';
import { LINKS, ORGANISATION, PAGES } from '../../../../content-strings';
import { ROUTES } from '../../../../constants';
import {
  completeStartForm,
  completeCheckIfEligibleForm,
  completeExporterLocationForm,
  completeUkGoodsAndServicesForm,
  completeInsuredAmountForm,
} from '../../../support/insurance/eligibility/forms';
import { completeAndSubmitBuyerCountryForm } from '../../../support/forms';

const CONTENT_STRINGS = PAGES.INSURANCE.SPEAK_TO_UKEF_EFM;
const { ACTIONS } = CONTENT_STRINGS;

const insuranceStartRoute = ROUTES.INSURANCE.START;

context('Insurance - speak to UKEF EFM exit page', () => {
  beforeEach(() => {
    cy.visit(ROUTES.INSURANCE.START, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });

    completeStartForm();
    completeCheckIfEligibleForm();
    completeAndSubmitBuyerCountryForm();
    completeExporterLocationForm();
    completeUkGoodsAndServicesForm();
    completeInsuredAmountForm();

    cy.url().should('include', ROUTES.INSURANCE.ELIGIBILITY.INSURED_PERIOD);

    yesRadio().click();
    submitButton().click();

    cy.url().should('include', ROUTES.INSURANCE.SPEAK_TO_UKEF_EFM);
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

  it('should render a header with href to insurance start', () => {
    partials.header.serviceName().should('have.attr', 'href', insuranceStartRoute);
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
