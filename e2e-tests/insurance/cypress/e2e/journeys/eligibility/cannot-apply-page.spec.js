import { actions, autoCompleteField, cannotApplyPage } from '../../../../../pages/shared';
import { PAGES, LINKS } from '../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';
import { FIELD_IDS } from '../../../../../constants';
import { COUNTRY_APPLICATION_SUPPORT } from '../../../../../fixtures/countries';

const CONTENT_STRINGS = PAGES.CANNOT_APPLY_EXIT;

const {
  ELIGIBILITY: { BUYER_COUNTRY, CANNOT_APPLY_EXIT },
} = INSURANCE_ROUTES;

const FIELD_ID = FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY;

const COUNTRY_NAME_UNSUPPORTED = COUNTRY_APPLICATION_SUPPORT.NOT_SUPPORTED_1.NAME;

const baseUrl = Cypress.config('baseUrl');

context('Insurance Eligibility - Cannot apply exit page', () => {
  beforeEach(() => {
    cy.completeAndSubmitEligibilityForms({ stopSubmittingAfter: 'companyDetails' });

    cy.keyboardInput(autoCompleteField(FIELD_ID).input(), COUNTRY_NAME_UNSUPPORTED);
    const results = autoCompleteField(FIELD_ID).results();
    results.first().click();

    cy.clickSubmitButton();

    const expectedUrl = `${baseUrl}${CANNOT_APPLY_EXIT}`;

    cy.assertUrl(expectedUrl);
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: CANNOT_APPLY_EXIT,
      backLink: BUYER_COUNTRY,
      hasAForm: false,
      assertAuthenticatedHeader: false,
      assertSaveAndBackButtonDoesNotExist: true,
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
