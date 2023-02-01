import { turnover } from '../../../../pages/your-business';
import partials from '../../../../partials';
import { EXPORTER_BUSINESS_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/exporter-business';
import { ROUTES, FIELD_IDS } from '../../../../../../constants';
import getReferenceNumber from '../../../../helpers/get-reference-number';
import application from '../../../../../fixtures/application';

const {
  TURNOVER: {
    FINANCIAL_YEAR_END_DATE,
  },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const {
  ROOT,
  START,
  EXPORTER_BUSINESS: {
    TURNOVER,
  },
} = ROUTES.INSURANCE;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.exporterBusiness;

context('Insurance - Your business - Turnover page - when financialYearEnd exists', () => {
  let referenceNumber;

  before(() => {
    cy.navigateToUrl(START);

    cy.submitInsuranceEligibilityAndStartApplication();

    task.link().click();

    cy.completeAndSubmitCompanyDetails();
    cy.completeAndSubmitNatureOfYourBusiness();

    getReferenceNumber().then((id) => {
      referenceNumber = id;

      const url = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${TURNOVER}`;

      cy.url().should('eq', url);
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  it(`should display ${FINANCIAL_YEAR_END_DATE} section`, () => {
    const fieldId = FINANCIAL_YEAR_END_DATE;
    const field = turnover[fieldId];

    field.value().should('exist');
    cy.checkText(field.value(), application.EXPORTER_COMPANY[fieldId]);

    cy.checkText(field.label(), FIELDS.TURNOVER[fieldId].LABEL);

    field.hint().contains(FIELDS.TURNOVER[fieldId].HINT);
  });
});

context('Insurance - Your business - Turnover page - when financialYearEnd does not exist', () => {
  let referenceNumber;

  before(() => {
    cy.navigateToUrl(START);

    cy.submitInsuranceEligibilityAndStartApplication();

    getReferenceNumber().then((id) => {
      referenceNumber = id;

      const url = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${TURNOVER}`;

      cy.navigateToUrl(url);

      cy.url().should('eq', url);
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  it(`should not display ${FINANCIAL_YEAR_END_DATE} section`, () => {
    const fieldId = FINANCIAL_YEAR_END_DATE;
    const field = turnover[fieldId];

    field.value().should('not.exist');
    field.hint().should('not.exist');
    field.label().should('not.exist');
  });
});
