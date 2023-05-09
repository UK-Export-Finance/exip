import { turnover } from '../../../../pages/your-business';
import partials from '../../../../partials';
import { EXPORTER_BUSINESS_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/business';
import { ROUTES, FIELD_IDS } from '../../../../../../constants';
import application from '../../../../../fixtures/application';

const {
  TURNOVER: {
    FINANCIAL_YEAR_END_DATE,
  },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const {
  ROOT,
  EXPORTER_BUSINESS: {
    TURNOVER,
  },
} = ROUTES.INSURANCE;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.business;

const fieldId = FINANCIAL_YEAR_END_DATE;
const field = turnover[fieldId];

context(`Insurance - Your business - Turnover page - when ${fieldId} exists`, () => {
  let referenceNumber;
  let url;

  beforeEach(() => {
    cy.clearCookies();
    Cypress.session.clearAllSavedSessions();

    cy.completeSignInAndGoToApplication().then((refNumber) => {
      referenceNumber = refNumber;

      task.link().click();

      cy.completeAndSubmitCompanyDetails();
      cy.completeAndSubmitYourContact();
      cy.completeAndSubmitNatureOfYourBusiness();

      url = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${TURNOVER}`;

      cy.url().should('eq', url);
    });
  });

  after(() => {
    cy.deleteAccountAndApplication(referenceNumber);
  });

  it(`should display ${FINANCIAL_YEAR_END_DATE} section`, () => {
    field.value().should('exist');
    cy.checkText(field.value(), application.EXPORTER_COMPANY[fieldId]);

    cy.checkText(field.label(), FIELDS.TURNOVER[fieldId].LABEL);

    field.hint().contains(FIELDS.TURNOVER[fieldId].HINT);
  });
});

context(`Insurance - Your business - Turnover page - when ${fieldId} does not exist`, () => {
  let referenceNumber;

  before(() => {
    cy.clearCookies();
    Cypress.session.clearAllSavedSessions();

    cy.completeSignInAndGoToApplication().then((refNumber) => {
      referenceNumber = refNumber;

      task.link().click();

      const url = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${TURNOVER}`;

      cy.navigateToUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteAccountAndApplication(referenceNumber);
  });

  it(`should not display ${FINANCIAL_YEAR_END_DATE} section`, () => {
    field.value().should('not.exist');
    field.hint().should('not.exist');
    field.label().should('not.exist');
  });
});
