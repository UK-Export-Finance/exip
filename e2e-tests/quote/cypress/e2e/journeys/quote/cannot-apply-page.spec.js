import { actions, cannotApplyPage } from '../../../../../pages/shared';
import { PAGES, LINKS } from '../../../../../content-strings';
import { ROUTES } from '../../../../../constants';

const CONTENT_STRINGS = PAGES.QUOTE.CANNOT_APPLY_EXIT;

const {
  QUOTE: { UK_GOODS_OR_SERVICES, CANNOT_APPLY_EXIT },
} = ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Cannot apply exit page', () => {
  const ukGoodsOrServicesUrl = `${baseUrl}${UK_GOODS_OR_SERVICES}`;
  const cannotApplyUrl = `${baseUrl}${CANNOT_APPLY_EXIT}`;

  beforeEach(() => {
    cy.navigateToRootUrl();
    cy.completeAndSubmitBuyerCountryForm({});
    cy.completeAndSubmitBuyerBodyForm();
    cy.completeAndSubmitExporterLocationForm();

    cy.assertUrl(ukGoodsOrServicesUrl);

    cy.clickNoRadioInput();
    cy.clickSubmitButton();

    cy.assertUrl(cannotApplyUrl);
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: CANNOT_APPLY_EXIT,
      backLink: UK_GOODS_OR_SERVICES,
      hasAForm: false,
      assertAuthenticatedHeader: false,
      isInsurancePage: false,
      assertSaveAndBackButtonDoesNotExist: true,
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
