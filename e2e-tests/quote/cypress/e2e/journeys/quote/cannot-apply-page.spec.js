import {
  actions, cannotApplyPage, noRadio, submitButton,
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
    completeAndSubmitBuyerCountryForm({});
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

  describe('actions', () => {
    it('should render `eligibility` copy and link', () => {
      cy.checkActionReadAboutEligibility();
    });

    it('should render `contact an approved broker` copy and link', () => {
      cy.checkActionContactApprovedBroker();
    });

    it('should render `talk to your nearest EFM` copy and link', () => {
      cy.checkActionTalkToYourNearestEFM({});
    });
  });

  describe('when clicking `eligibility` link', () => {
    it(`should redirect to ${LINKS.EXTERNAL.GUIDANCE}`, () => {
      actions.eligibilityLink().click();

      cy.assertUrl(LINKS.EXTERNAL.GUIDANCE);
    });
  });
});
