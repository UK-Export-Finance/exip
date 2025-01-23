import { howWillYouGetPaidPage } from '../../../../../../pages/insurance/export-contract';
import { EXPECTED_MULTI_LINE_STRING } from '../../../../../../constants';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/export-contract';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import application from '../../../../../../fixtures/application';

const {
  ROOT,
  EXPORT_CONTRACT: { HOW_WILL_YOU_GET_PAID },
} = INSURANCE_ROUTES;

const {
  HOW_WILL_YOU_GET_PAID: { PAYMENT_TERMS_DESCRIPTION: FIELD_ID },
} = FIELD_IDS;

const field = howWillYouGetPaidPage[FIELD_ID];

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Export contract - How will you get paid page - Save and go back', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      // go to the page we want to test.
      cy.completeAndSubmitExportContractForms({ stopSubmittingAfter: 'aboutGoodsOrServices' });

      url = `${baseUrl}${ROOT}/${referenceNumber}${HOW_WILL_YOU_GET_PAID}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe('when submitting an empty form via `save and go back` button', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.clickSaveAndBackButton();
    });

    it('should redirect to `all sections`', () => {
      cy.assertAllSectionsUrl(referenceNumber);
    });
  });

  describe('when submitting an answer and submitting the form via `save and go back` button', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      // submit the form via 'save and go back' button
      cy.completeHowYouWillGetPaidForm({});
      cy.clickSaveAndBackButton();
    });

    it('should redirect to `all sections`', () => {
      cy.assertAllSectionsUrl(referenceNumber);
    });

    it('should retain the status of task `export contract` as `in progress`', () => {
      cy.checkTaskExportContractStatusIsInProgress();
    });

    it('should have the originally submitted answer when going back to the page after submission', () => {
      cy.navigateToUrl(url);

      const value = application.EXPORT_CONTRACT.HOW_WILL_YOU_GET_PAID[FIELD_ID];

      // submit the form via 'save and go back' button
      cy.keyboardInput(field.textarea(), value);
      cy.clickSaveAndBackButton();

      /**
       * go back to the page via the task list by:
       * - clicking the task list item
       * - submitting the first 2x forms.
       */
      cy.startInsuranceExportContractSection({});
      cy.completeAndSubmitHowWasTheContractAwardedForm({});

      cy.clickSubmitButton();

      cy.checkTextareaValue({
        fieldId: FIELD_ID,
        expectedValue: EXPECTED_MULTI_LINE_STRING,
      });
    });
  });

  describe(`when removing a previously submitted '${FIELD_ID} value`, () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      // submit a value
      cy.keyboardInput(field.textarea(), 'Test');
      cy.clickSaveAndBackButton();

      // go back to the page
      cy.clickBackLink();

      field.textarea().clear();
      cy.clickSaveAndBackButton();
    });

    it('should redirect to `all sections`', () => {
      cy.assertAllSectionsUrl(referenceNumber);
    });

    it('should retain the status of task `export contract` as `in progress`', () => {
      cy.checkTaskExportContractStatusIsInProgress();
    });

    it(`should have no value in '${FIELD_ID}' when going back to the page`, () => {
      cy.startInsuranceExportContractSection({});
      cy.completeAndSubmitHowWasTheContractAwardedForm({});
      cy.clickSubmitButton();

      cy.checkTextareaValue({
        fieldId: FIELD_ID,
        expectedValue: '',
      });
    });
  });
});
