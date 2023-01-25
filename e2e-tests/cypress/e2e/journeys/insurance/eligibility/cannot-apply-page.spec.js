import {
  buyerCountryPage,
  cannotApplyPage,
  heading,
  submitButton,
} from '../../../pages/shared';
import partials from '../../../partials';
import {
  ORGANISATION,
  LINKS,
  PAGES,
} from '../../../../../content-strings';
import { ROUTES } from '../../../../../constants';
import { completeStartForm, completeCheckIfEligibleForm } from '../../../../support/insurance/eligibility/forms';

const CONTENT_STRINGS = PAGES.CANNOT_APPLY;

const COUNTRY_NAME_UNSUPPORTED = 'France';

const insuranceStartRoute = ROUTES.INSURANCE.START;

context('Insurance Eligibility - Cannot apply exit page', () => {
  beforeEach(() => {
    cy.navigateToUrl(ROUTES.INSURANCE.START);

    completeStartForm();
    completeCheckIfEligibleForm();

    buyerCountryPage.searchInput().type(COUNTRY_NAME_UNSUPPORTED);
    const results = buyerCountryPage.results();
    results.first().click();

    submitButton().click();

    cy.url().should('include', ROUTES.INSURANCE.ELIGIBILITY.CANNOT_APPLY);
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

    partials.backLink().click();

    cy.url().should('include', ROUTES.INSURANCE.ELIGIBILITY.BUYER_COUNTRY);
  });

  it('renders a page title and heading', () => {
    const expectedPageTitle = `${CONTENT_STRINGS.PAGE_TITLE} - ${ORGANISATION}`;
    cy.title().should('eq', expectedPageTitle);

    cy.checkText(heading(), CONTENT_STRINGS.PAGE_TITLE);
  });

  it('renders a reason', () => {
    cannotApplyPage.reason().should('exist');
  });

  it('renders `actions` content', () => {
    cy.checkText(cannotApplyPage.actions.intro(), CONTENT_STRINGS.ACTIONS.INTRO);

    const listItems = cannotApplyPage.actions.listItems();

    listItems.should('have.length', 2);

    const expectedEligibility = `${CONTENT_STRINGS.ACTIONS.ELIGIBILITY.TEXT} ${CONTENT_STRINGS.ACTIONS.ELIGIBILITY.LINK.TEXT}`;

    cy.checkText(cannotApplyPage.actions.eligibility(), expectedEligibility);

    cannotApplyPage.actions.eligibilityLink().should('have.attr', 'href', CONTENT_STRINGS.ACTIONS.ELIGIBILITY.LINK.HREF);

    const expectedBroker = `${CONTENT_STRINGS.ACTIONS.CONTACT_APPROVED_BROKER.LINK.TEXT} ${CONTENT_STRINGS.ACTIONS.CONTACT_APPROVED_BROKER.TEXT}`;
    cy.checkText(cannotApplyPage.actions.approvedBroker(), expectedBroker);

    cannotApplyPage.actions.approvedBrokerLink().should('have.attr', 'href', CONTENT_STRINGS.ACTIONS.CONTACT_APPROVED_BROKER.LINK.HREF);
  });

  describe('when clicking `eligibility` link', () => {
    it('redirects to guidance page - eligibility section', () => {
      cannotApplyPage.actions.eligibilityLink().should('have.attr', 'href', CONTENT_STRINGS.ACTIONS.ELIGIBILITY.LINK.HREF);
    });
  });
});
