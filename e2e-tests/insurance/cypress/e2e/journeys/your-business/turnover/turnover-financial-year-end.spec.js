import { turnover } from '../../../../../../pages/your-business';
import partials from '../../../../../../partials';
import { EXPORTER_BUSINESS_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/business';
import { ROUTES, FIELD_IDS, COMPANIES_HOUSE_NUMBER_NO_FINANCIAL_YEAR_END_DATE } from '../../../../../../constants';
import { formatDate } from '../../../../../../helpers/date';
import application from '../../../../../../fixtures/application';

const {
  TURNOVER: {
    FINANCIAL_YEAR_END_DATE,
  },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const {
  ROOT,
  EXPORTER_BUSINESS: {
    COMPANIES_HOUSE_NUMBER,
    TURNOVER,
  },
} = ROUTES.INSURANCE;

const {
  TURNOVER: {
    [FINANCIAL_YEAR_END_DATE]: { DATE_FORMAT },
  },
} = FIELDS;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.business;

const fieldId = FINANCIAL_YEAR_END_DATE;
const field = turnover[fieldId];

const baseUrl = Cypress.config('baseUrl');

const timestamp = application.EXPORTER_COMPANY[fieldId];
const expectedValue = formatDate(timestamp, DATE_FORMAT);

context(`Insurance - Your business - Turnover page - when ${fieldId} exists`, () => {
  let referenceNumber;
  let url;

  beforeEach(() => {
    cy.clearCookies();
    Cypress.session.clearAllSavedSessions();

    cy.completeSignInAndGoToApplication().then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      task.link().click();

      cy.completeAndSubmitCompaniesHouseSearchForm({ referenceNumber });
      cy.completeAndSubmitCompanyDetails();
      cy.completeAndSubmitNatureOfYourBusiness();

      url = `${baseUrl}${ROOT}/${referenceNumber}${TURNOVER}`;

      cy.assertUrl(url);
    });
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it(`should display ${FINANCIAL_YEAR_END_DATE} section`, () => {
    field.value().should('exist');
    cy.checkText(field.value(), expectedValue);

    cy.checkText(field.label(), FIELDS.TURNOVER[fieldId].LABEL);

    field.hint().contains(FIELDS.TURNOVER[fieldId].HINT);
  });
});

context(`Insurance - Your business - Turnover page - when ${fieldId} does not exist`, () => {
  let referenceNumber;

  before(() => {
    cy.clearCookies();
    Cypress.session.clearAllSavedSessions();

    cy.completeSignInAndGoToApplication().then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      task.link().click();

      cy.completeAndSubmitCompaniesHouseSearchForm({ referenceNumber, companyNumber: COMPANIES_HOUSE_NUMBER_NO_FINANCIAL_YEAR_END_DATE });
      cy.completeAndSubmitCompanyDetails();
      cy.completeAndSubmitNatureOfYourBusiness();

      const url = `${baseUrl}${ROOT}/${referenceNumber}${TURNOVER}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it(`should not display ${FINANCIAL_YEAR_END_DATE} section`, () => {
    field.value().should('not.exist');
    field.hint().should('not.exist');
    field.label().should('not.exist');
  });
});

context(`Insurance - Your business - Turnover page - submitting a company with ${fieldId} and resubmitting with company without ${fieldId}`, () => {
  let referenceNumber;

  before(() => {
    cy.clearCookies();
    Cypress.session.clearAllSavedSessions();

    cy.completeSignInAndGoToApplication().then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      task.link().click();

      cy.completeAndSubmitCompaniesHouseSearchForm({ referenceNumber });
      cy.completeAndSubmitCompanyDetails();
      cy.completeAndSubmitNatureOfYourBusiness();

      const url = `${baseUrl}${ROOT}/${referenceNumber}${TURNOVER}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it(`should display ${FINANCIAL_YEAR_END_DATE} section on company with ${FINANCIAL_YEAR_END_DATE}`, () => {
    field.value().should('exist');

    cy.checkText(field.value(), expectedValue);

    cy.checkText(field.label(), FIELDS.TURNOVER[fieldId].LABEL);

    field.hint().contains(FIELDS.TURNOVER[fieldId].HINT);
  });

  it(`should not display ${FINANCIAL_YEAR_END_DATE} section when resubmitting companies house number without companies house number`, () => {
    const url = `${baseUrl}${ROOT}/${referenceNumber}${COMPANIES_HOUSE_NUMBER}`;

    cy.navigateToUrl(url);

    cy.completeAndSubmitCompaniesHouseSearchForm({ referenceNumber, companyNumber: COMPANIES_HOUSE_NUMBER_NO_FINANCIAL_YEAR_END_DATE });
    cy.completeAndSubmitCompanyDetails();
    cy.completeAndSubmitNatureOfYourBusiness();

    field.value().should('not.exist');
    field.hint().should('not.exist');
    field.label().should('not.exist');
  });
});
