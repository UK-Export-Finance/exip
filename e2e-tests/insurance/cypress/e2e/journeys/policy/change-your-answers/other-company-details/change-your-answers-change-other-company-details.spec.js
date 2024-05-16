import { autoCompleteField, field, summaryList } from '../../../../../../../pages/shared';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/policy';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import application from '../../../../../../../fixtures/application';
import { BRA } from '../../../../../../../fixtures/countries';

const {
  REQUESTED_JOINTLY_INSURED_PARTY: {
    COMPANY_NAME,
    COMPANY_NUMBER,
    COUNTRY_CODE,
  },
} = POLICY_FIELD_IDS;

const {
  ROOT,
  POLICY: {
    OTHER_COMPANY_DETAILS_CHANGE,
    CHECK_YOUR_ANSWERS,
  },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Change your answers - Other company details - As an exporter, I want to change my answers to the other company details section', () => {
  let referenceNumber;
  let checkYourAnswersUrl;
  let otherCompanyDetailsUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePolicySection({ otherCompanyInvolved: true });

      checkYourAnswersUrl = `${baseUrl}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
      otherCompanyDetailsUrl = `${baseUrl}${ROOT}/${referenceNumber}${OTHER_COMPANY_DETAILS_CHANGE}`;
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe(COMPANY_NAME, () => {
    const fieldId = COMPANY_NAME;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${OTHER_COMPANY_DETAILS_CHANGE}`, () => {
        cy.navigateToUrl(checkYourAnswersUrl);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: OTHER_COMPANY_DETAILS_CHANGE, fieldId });
      });
    });

    describe('form submission with a new answer', () => {
      const newValueInput = `${application.REQUESTED_JOINTLY_INSURED_PARTY[fieldId]} additional text`;

      beforeEach(() => {
        cy.navigateToUrl(checkYourAnswersUrl);
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        summaryList.field(fieldId).changeLink().click();

        cy.assertUrl(`${otherCompanyDetailsUrl}#${fieldId}-label`);

        cy.changeAnswerField({ newValueInput }, field(fieldId).input());

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId });
      });

      it('should render the new answer', () => {
        cy.assertSummaryListRowValue(summaryList, fieldId, newValueInput);
      });
    });
  });

  describe(COMPANY_NUMBER, () => {
    const fieldId = COMPANY_NUMBER;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${OTHER_COMPANY_DETAILS_CHANGE}`, () => {
        cy.navigateToUrl(checkYourAnswersUrl);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: OTHER_COMPANY_DETAILS_CHANGE, fieldId });
      });
    });

    describe('form submission with a new answer', () => {
      const newValueInput = `${application.REQUESTED_JOINTLY_INSURED_PARTY[fieldId]}100`;

      beforeEach(() => {
        cy.navigateToUrl(checkYourAnswersUrl);
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        summaryList.field(fieldId).changeLink().click();

        cy.assertUrl(`${otherCompanyDetailsUrl}#${fieldId}-label`);

        cy.changeAnswerField({ newValueInput }, field(fieldId).input());

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId });
      });

      it('should render the new answer', () => {
        cy.assertSummaryListRowValue(summaryList, fieldId, newValueInput);
      });
    });
  });

  describe.only(COUNTRY_CODE, () => {
    const fieldId = COUNTRY_CODE;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${OTHER_COMPANY_DETAILS_CHANGE}`, () => {
        cy.navigateToUrl(checkYourAnswersUrl);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: OTHER_COMPANY_DETAILS_CHANGE, fieldId });
      });
    });

    describe('form submission with a new answer', () => {
      const newValueInput = BRA.NAME;

      beforeEach(() => {
        cy.navigateToUrl(checkYourAnswersUrl);
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        summaryList.field(fieldId).changeLink().click();

        cy.assertUrl(`${otherCompanyDetailsUrl}#${fieldId}-label`);

        cy.keyboardInput(autoCompleteField(fieldId).input(), newValueInput);
        cy.clickSubmitButton();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId });
      });

      it('should render the new answer', () => {
        cy.assertSummaryListRowValue(summaryList, fieldId, newValueInput);
      });
    });
  });
});
