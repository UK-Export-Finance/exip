import {
  cannotApplyPage, noRadio, submitButton,
} from '../../../../../pages/shared';
import { PAGES, LINKS } from '../../../../../content-strings';
import { ROUTES } from '../../../../../constants';
import { completeAndSubmitBuyerCountryForm } from '../../../../../commands/forms';
import { completeAndSubmitBuyerBodyForm, completeAndSubmitExporterLocationForm } from '../../../../../commands/quote/forms';

const CONTENT_STRINGS = PAGES.QUOTE.CANNOT_APPLY;

const {
  QUOTE: { UK_GOODS_OR_SERVICES, CANNOT_APPLY },
} = ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Cannot apply exit page', () => {
  beforeEach(() => {
    cy.login();
    completeAndSubmitBuyerCountryForm();
    completeAndSubmitBuyerBodyForm();
    completeAndSubmitExporterLocationForm();

    let expectedUrl = `${baseUrl}${UK_GOODS_OR_SERVICES}`;

    cy.assertUrl(expectedUrl);

    noRadio().input().click();
    submitButton().click();

    expectedUrl = `${baseUrl}${CANNOT_APPLY}`;

    cy.assertUrl(expectedUrl);
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: CANNOT_APPLY,
      backLink: UK_GOODS_OR_SERVICES,
      hasAForm: false,
      assertAuthenticatedHeader: false,
      isInsurancePage: false,
      lightHouseThresholds: {
        seo: 60,
      },
    });
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

    cy.checkLink(
      cannotApplyPage.actions.eligibilityLink(),
      CONTENT_STRINGS.ACTIONS.ELIGIBILITY.LINK.HREF,
      CONTENT_STRINGS.ACTIONS.ELIGIBILITY.LINK.TEXT,
    );

    const expectedBroker = `${CONTENT_STRINGS.ACTIONS.CONTACT_APPROVED_BROKER.LINK.TEXT} ${CONTENT_STRINGS.ACTIONS.CONTACT_APPROVED_BROKER.TEXT}`;

    cy.checkText(cannotApplyPage.actions.approvedBroker(), expectedBroker);

    cy.checkLink(
      cannotApplyPage.actions.approvedBrokerLink(),
      CONTENT_STRINGS.ACTIONS.CONTACT_APPROVED_BROKER.LINK.HREF,
      CONTENT_STRINGS.ACTIONS.CONTACT_APPROVED_BROKER.LINK.TEXT,
    );
  });

  describe('when clicking `eligibility` link', () => {
    it(`redirects to ${LINKS.EXTERNAL.GUIDANCE}`, () => {
      cannotApplyPage.actions.eligibilityLink().click();

      cy.url().should('eq', LINKS.EXTERNAL.GUIDANCE);
    });
  });
});
