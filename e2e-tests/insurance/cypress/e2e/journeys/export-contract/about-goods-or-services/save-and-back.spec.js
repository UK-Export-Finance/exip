import { aboutGoodsOrServicesPage } from '../../../../../../pages/insurance/export-contract';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/export-contract';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import application from '../../../../../../fixtures/application';

const {
  ROOT: INSURANCE_ROOT,
  ALL_SECTIONS,
  EXPORT_CONTRACT: { ABOUT_GOODS_OR_SERVICES },
} = INSURANCE_ROUTES;

const {
  ABOUT_GOODS_OR_SERVICES: { DESCRIPTION: FIELD_ID },
} = FIELD_IDS;

const field = aboutGoodsOrServicesPage[FIELD_ID];

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Export contract - About goods or services page - Save and go back', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsuranceExportContractSection({});

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${ABOUT_GOODS_OR_SERVICES}`;
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

    it(`should redirect to ${ALL_SECTIONS}`, () => {
      const expected = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      cy.assertUrl(expected);
    });

    it('should retain the `export contract` task status as `not started`', () => {
      cy.checkTaskExportContractStatusIsNotStartedYet();
    });
  });

  describe('when submitting an answer and submitting the form via `save and go back` button', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      // submit the form via 'save and go back' button
      cy.keyboardInput(field.textarea(), application.EXPORT_CONTRACT[FIELD_ID]);
      cy.clickSaveAndBackButton();
    });

    it(`should redirect to ${ALL_SECTIONS}`, () => {
      const expected = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      cy.assertUrl(expected);
    });

    it('should update the `export contract` task status to `in progress`', () => {
      cy.checkTaskExportContractStatusIsInProgress();
    });

    it('should have the originally submitted answer selected when going back to the page after submission', () => {
      cy.navigateToUrl(url);

      // submit the form via 'save and go back' button
      cy.keyboardInput(field.textarea(), application.EXPORT_CONTRACT[FIELD_ID]);
      cy.clickSaveAndBackButton();

      // go back to the page via the task list
      cy.startInsuranceExportContractSection({});

      field.textarea().should('have.value', application.EXPORT_CONTRACT[FIELD_ID]);
    });
  });

  describe(`when removing a previously submitted '${FIELD_ID}' value`, () => {
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

    it(`should redirect to ${ALL_SECTIONS}`, () => {
      const expected = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      cy.assertUrl(expected);
    });

    it('should update the `export contract` task status to `not started`', () => {
      cy.checkTaskExportContractStatusIsNotStartedYet();
    });

    it(`should have no value in '${FIELD_ID}' when going back to the page`, () => {
      cy.startInsuranceExportContractSection({});

      field.textarea().should('have.value', '');
    });
  });
});
