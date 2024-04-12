import { autoCompleteField, field, summaryList } from '../../../../../../../pages/shared';
import { EXPECTED_SINGLE_LINE_STRING } from '../../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import FIELD_IDS from '../../../../../../../constants/field-ids/insurance/export-contract';
import application from '../../../../../../../fixtures/application';
import { XAD } from '../../../../../../../fixtures/countries';

const {
  ROOT,
  EXPORT_CONTRACT: {
    CHECK_YOUR_ANSWERS,
    AGENT_DETAILS_CHANGE,
  },
} = INSURANCE_ROUTES;

const {
  AGENT_DETAILS: { NAME, FULL_ADDRESS, COUNTRY_CODE },
} = FIELD_IDS;

const NEW_COUNTRY_INPUT = XAD.NAME;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Export contract - Change your answers - Agent details - As an Exporter, I want to be able to review my input regarding whether an agent helped me win the export contract, So that I can be assured I am providing UKEF with the right information', () => {
  let referenceNumber;
  let checkYourAnswersUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completeExportContractSection({
        isUsingAgent: true,
      });

      checkYourAnswersUrl = `${baseUrl}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;

      cy.assertUrl(checkYourAnswersUrl);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe(NAME, () => {
    const fieldId = NAME;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${AGENT_DETAILS_CHANGE}`, () => {
        cy.navigateToUrl(checkYourAnswersUrl);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: AGENT_DETAILS_CHANGE, fieldId });
      });
    });

    describe('form submission with a new answer', () => {
      const newAnswer = `${application.EXPORT_CONTRACT.AGENT_DETAILS[fieldId]} additional text`;

      beforeEach(() => {
        cy.navigateToUrl(checkYourAnswersUrl);

        summaryList.field(fieldId).changeLink().click();

        cy.keyboardInput(field(fieldId).input(), newAnswer);

        cy.clickSubmitButton();
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId });
      });

      it('should render the new answer', () => {
        cy.assertSummaryListRowValue(summaryList, fieldId, newAnswer);
      });
    });
  });

  describe(FULL_ADDRESS, () => {
    const fieldId = FULL_ADDRESS;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${AGENT_DETAILS_CHANGE}`, () => {
        cy.navigateToUrl(checkYourAnswersUrl);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: AGENT_DETAILS_CHANGE, fieldId });
      });
    });

    describe('form submission with a new answer', () => {
      const newAnswer = `${application.EXPORT_CONTRACT.AGENT_DETAILS[fieldId]} additional text`;

      beforeEach(() => {
        cy.navigateToUrl(checkYourAnswersUrl);

        summaryList.field(fieldId).changeLink().click();

        cy.keyboardInput(field(fieldId).textarea(), newAnswer);

        cy.clickSubmitButton();
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId });
      });

      it('should render the new answer', () => {
        const row = summaryList.field(fieldId);

        row.value().contains(EXPECTED_SINGLE_LINE_STRING);
      });
    });
  });

  describe(COUNTRY_CODE, () => {
    const fieldId = COUNTRY_CODE;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${AGENT_DETAILS_CHANGE}`, () => {
        cy.navigateToUrl(checkYourAnswersUrl);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: AGENT_DETAILS_CHANGE, fieldId });
      });
    });

    describe('form submission with a new destination/country answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(checkYourAnswersUrl);

        summaryList.field(fieldId).changeLink().click();

        cy.keyboardInput(autoCompleteField(fieldId).input(), NEW_COUNTRY_INPUT);

        cy.clickSubmitButton();
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId });
      });

      it('should render the new destination/country', () => {
        cy.assertSummaryListRowValue(summaryList, fieldId, NEW_COUNTRY_INPUT);
      });
    });
  });
});
