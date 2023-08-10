import {
  cannotApplyPage, noRadio, submitButton,
} from '../../pages/shared';
import partials from '../../partials';
import { LINKS, PAGES } from '../../../../content-strings';
import { ROUTES } from '../../../../constants';
import { completeAndSubmitBuyerCountryForm } from '../../../support/forms';
import { completeAndSubmitBuyerBodyForm, completeAndSubmitExporterLocationForm } from '../../../support/quote/forms';

const CONTENT_STRINGS = PAGES.QUOTE.CANNOT_APPLY;
const startRoute = ROUTES.QUOTE.START;

context('Cannot apply exit page', () => {
  beforeEach(() => {
    cy.login();
    completeAndSubmitBuyerCountryForm();
    completeAndSubmitBuyerBodyForm();
    completeAndSubmitExporterLocationForm();

    cy.url().should('include', ROUTES.QUOTE.UK_GOODS_OR_SERVICES);

    noRadio().click();
    submitButton().click();

    cy.url().should('include', ROUTES.QUOTE.CANNOT_APPLY);
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: ROUTES.QUOTE.CANNOT_APPLY,
      backLink: ROUTES.QUOTE.UK_GOODS_OR_SERVICES,
      assertSubmitButton: false,
      assertAuthenticatedHeader: false,
      isInsurancePage: false,
      lightHouseThresholds: {
        seo: 60,
      },
    });
  });

  it('should render a header with href to quote start', () => {
    partials.header.serviceName().should('have.attr', 'href', startRoute);
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
    it(`redirects to ${LINKS.EXTERNAL.GUIDANCE}`, () => {
      cannotApplyPage.actions.eligibilityLink().click();

      cy.url().should('eq', LINKS.EXTERNAL.GUIDANCE);
    });
  });
});
