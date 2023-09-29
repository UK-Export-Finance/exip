import partials from '../../../../../../../partials';
import { summaryList } from '../../../../../../../pages/shared';
import { FIELD_IDS, ROUTES, COMPANIES_HOUSE_NUMBER_NO_FINANCIAL_YEAR_END_DATE } from '../../../../../../../constants';
import getSummaryListField from '../../../../../../../commands/insurance/get-summary-list-field';
import { DEFAULT } from '../../../../../../../content-strings';
import { EXPORTER_BUSINESS_FIELDS as FIELDS } from '../../../../../../../content-strings/fields/insurance/business';

const {
  ROOT,
  EXPORTER_BUSINESS: {
    CHECK_YOUR_ANSWERS,
  },
} = ROUTES.INSURANCE;

const {
  INSURANCE: {
    EXPORTER_BUSINESS: {
      COMPANY_HOUSE: {
        FINANCIAL_YEAR_END_DATE,
      },
    },
  },
} = FIELD_IDS;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.business;

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

      url = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
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
