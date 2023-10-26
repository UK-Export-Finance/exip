import partials from '../../../../../../../partials';
import { summaryList } from '../../../../../../../pages/shared';
import { COMPANIES_HOUSE_NUMBER_NO_FINANCIAL_YEAR_END_DATE } from '../../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import getSummaryListField from '../../../../../../../commands/insurance/get-summary-list-field';
import { DEFAULT } from '../../../../../../../content-strings';
import { EXPORTER_BUSINESS_FIELDS as FIELDS } from '../../../../../../../content-strings/fields/insurance/business';

const {
  ROOT,
  EXPORTER_BUSINESS: {
    CHECK_YOUR_ANSWERS,
  },
} = INSURANCE_ROUTES;

const {
  COMPANIES_HOUSE: { FINANCIAL_YEAR_END_DATE },
} = INSURANCE_FIELD_IDS;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.business;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Your business - Check your answers - Summary list - When a company does not have a financial year end date', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      task.link().click();

      cy.completeAndSubmitCompaniesHouseSearchForm({ referenceNumber, companyNumber: COMPANIES_HOUSE_NUMBER_NO_FINANCIAL_YEAR_END_DATE });
      cy.completeAndSubmitCompanyDetails();
      cy.completeAndSubmitNatureOfYourBusiness();
      cy.completeAndSubmitTurnoverForm();
      cy.completeAndSubmitBrokerForm({ usingBroker: true });

      url = `${baseUrl}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
    });
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it(`should display ${FINANCIAL_YEAR_END_DATE} as "${DEFAULT.EMPTY}" in summary list`, () => {
    const fieldId = FINANCIAL_YEAR_END_DATE;

    const { expectedKey } = getSummaryListField(fieldId, FIELDS);
    const expectedValue = DEFAULT.EMPTY;

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue);
  });
});
