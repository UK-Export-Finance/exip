import { brokerPage } from '../../../../../../../pages/your-business';
import partials from '../../../../../../../partials';
import { submitButton } from '../../../../../../../pages/shared';
import { ROUTES } from '../../../../../../../constants';
import { EXPORTER_BUSINESS as FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/business';

const {
  BROKER: {
    USING_BROKER: FIELD_ID,
  },
} = FIELD_IDS;

const {
  ROOT,
  EXPORTER_BUSINESS: {
    BROKER,
    CHECK_YOUR_ANSWERS,
  },
} = ROUTES.INSURANCE;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.business;

context('Insurance - Your business - Broker Page - As an Exporter I want to confirm that I am not using a broker for my export Insurance so that UKEF and I can easily collaborate and manage correspondence regarding my export insurance', () => {
  let referenceNumber;

  let checkYourAnswersUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      task.link().click();

      cy.completeAndSubmitCompaniesHouseSearchForm({ referenceNumber });
      cy.completeAndSubmitCompanyDetails();
      cy.completeAndSubmitNatureOfYourBusiness();
      cy.completeAndSubmitTurnoverForm();

      const url = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${BROKER}`;
      checkYourAnswersUrl = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe('when the no radio is selected', () => {
    it(`should  not display validation errors and redirect to ${CHECK_YOUR_ANSWERS}`, () => {
      const field = brokerPage[FIELD_ID];

      field.noRadio().label().click();
      submitButton().click();

      partials.errorSummaryListItems().should('have.length', 0);
      cy.assertUrl(checkYourAnswersUrl);
    });
  });
});
