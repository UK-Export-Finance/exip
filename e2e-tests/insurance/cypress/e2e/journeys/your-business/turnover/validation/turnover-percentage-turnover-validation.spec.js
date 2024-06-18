import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { ROUTES } from '../../../../../../../constants';
import { EXPORTER_BUSINESS as FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/business';
import { percentageFieldValidation } from '../../../../../../../shared-test-assertions';

const {
  TURNOVER: {
    PERCENTAGE_TURNOVER: FIELD_ID,
  },
} = FIELD_IDS;

const {
  [FIELD_ID]: ERROR_MESSAGES_OBJECT,
} = ERROR_MESSAGES.INSURANCE.EXPORTER_BUSINESS;

const baseUrl = Cypress.config('baseUrl');

describe(`Insurance - Your business - Turnover page - form validation - ${FIELD_ID}`, () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startYourBusinessSection({});

      cy.completeAndSubmitCompanyDetails({});
      cy.completeAndSubmitNatureOfYourBusiness();

      url = `${baseUrl}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.TURNOVER_ROOT}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  percentageFieldValidation({
    fieldId: FIELD_ID,
    errorIndex: 1,
    errorMessages: ERROR_MESSAGES_OBJECT,
    totalExpectedErrors: 2,
    totalExpectedOtherErrorsWithValidPercentage: 1,
  });
});
