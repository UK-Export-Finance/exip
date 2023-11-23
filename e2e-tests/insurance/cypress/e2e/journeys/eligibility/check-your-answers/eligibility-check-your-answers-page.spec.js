import { submitButton } from '../../../../../../pages/shared';
import { checkYourAnswersPage } from '../../../../../../pages/insurance/eligibility';
import { PAGES, BUTTONS } from '../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { completeAndSubmitBuyerCountryForm } from '../../../../../../commands/forms';

const CONTENT_STRINGS = PAGES.INSURANCE.ELIGIBILITY.CHECK_YOUR_ANSWERS;

const {
  START,
  ELIGIBILITY: {
    END_BUYER, CHECK_YOUR_ANSWERS, ELIGIBLE_TO_APPLY_ONLINE,
  },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Eligibility - as an exporter, I want to confirm my selection for the eligibility section of my export insurance application, So that UKEF can accurately process my credit insurance application.', () => {
  const url = `${baseUrl}${CHECK_YOUR_ANSWERS}`;

  beforeEach(() => {
    cy.navigateToUrl(START);

    cy.completeStartForm();
    cy.completeCheckIfEligibleForm();
    cy.completeExporterLocationForm();
    cy.completeCompaniesHouseNumberForm();
    cy.completeAndSubmitCompaniesHouseSearchForm({});
    cy.completeEligibilityCompanyDetailsForm();
    completeAndSubmitBuyerCountryForm();
    cy.completeAndSubmitTotalValueInsuredForm({});
    cy.completeCoverPeriodForm({});
    cy.completeUkGoodsAndServicesForm();
    cy.completeEndBuyerForm();

    cy.assertUrl(url);
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: CHECK_YOUR_ANSWERS,
      backLink: END_BUYER,
      assertAuthenticatedHeader: false,
      submitButtonCopy: BUTTONS.CONFIRM_AND_CONTINUE,
    });
  });

  it('renders the warning text', () => {
    checkYourAnswersPage.warning().contains(CONTENT_STRINGS.WARNING);
  });

  it('renders the cannot change responses text', () => {
    cy.checkText(checkYourAnswersPage.cannotChangeResponses(), CONTENT_STRINGS.CANNOT_CHANGE);
  });

  describe('form submission', () => {
    it(`should redirect to ${ELIGIBLE_TO_APPLY_ONLINE}`, () => {
      submitButton().click();

      const expectedUrl = `${baseUrl}${ELIGIBLE_TO_APPLY_ONLINE}`;

      cy.assertUrl(expectedUrl);
    });
  });
});
