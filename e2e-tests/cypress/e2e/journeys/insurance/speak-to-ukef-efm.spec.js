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
    cy.navigateToUrl(ROUTES.INSURANCE.START);

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

    cy.checkText(partials.backLink(), LINKS.BACK);

    const expected = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ELIGIBILITY.INSURED_PERIOD}`;

    partials.backLink().should('have.attr', 'href', expected);
  });

  it('renders a page title and heading', () => {
    const expectedPageTitle = `${CONTENT_STRINGS.PAGE_TITLE} - ${ORGANISATION}`;
    cy.title().should('eq', expectedPageTitle);

    cy.checkText(heading(), CONTENT_STRINGS.PAGE_TITLE);
  });

  it('renders `find your nearest EFM` copy with link', () => {
    const expectedText = `${ACTIONS.FIND_EFM[0][0].text} ${ACTIONS.FIND_EFM[0][1].text}${ACTIONS.FIND_EFM[0][2].text}`;
    cy.checkText(insurance.speakToUkefEfmPage.action.text(), expectedText);

    const expectedLink = `${ACTIONS.FIND_EFM[0][1].text}`;
    cy.checkText(insurance.speakToUkefEfmPage.action.link(), expectedLink);

    const expectedHref = ACTIONS.FIND_EFM[0][1].href;

    insurance.speakToUkefEfmPage.action.link().should('have.attr', 'href', expectedHref);
  });
});
