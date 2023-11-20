import {
  submitButton, yesRadioInput, noRadioInput, field,
} from '../../../../../../pages/shared';
import { FIELD_VALUES } from '../../../../../../constants';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const {
  EXPORTER_BUSINESS: {
    YOUR_COMPANY: { ALTERNATIVE_TRADING_NAME },
  },
} = INSURANCE_FIELD_IDS;

const {
  ROOT,
  EXPORTER_BUSINESS: {
    COMPANY_DETAILS,
  },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

describe(`Insurance - Your business - Company details page - submit ${ALTERNATIVE_TRADING_NAME} as '${FIELD_VALUES.YES}'`, () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      url = `${baseUrl}${ROOT}/${referenceNumber}${COMPANY_DETAILS}`;

      cy.startYourBusinessSection();

      cy.completeCompanyDetailsForm({});

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe(`when submitting ${ALTERNATIVE_TRADING_NAME} as '${FIELD_VALUES.YES}'`, () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.completeCompanyDetailsForm({
        differentTradingName: true,
      });

      submitButton().click();
    });

    it('should render valid submitted values when going back to the page', () => {
      cy.navigateToUrl(url);

      yesRadioInput().first().should('be.checked');

      cy.checkValue(field(ALTERNATIVE_TRADING_NAME), 'test');
    });
  });

  describe(`when submitting ${ALTERNATIVE_TRADING_NAME} as '${FIELD_VALUES.NO}'`, () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.completeCompanyDetailsForm({});

      submitButton().click();
    });

    it(`should not have ${ALTERNATIVE_TRADING_NAME} input populated`, () => {
      cy.navigateToUrl(url);

      noRadioInput().first().should('be.checked');

      // check input is not populated
      yesRadioInput().first().click();
      cy.checkValue(field(ALTERNATIVE_TRADING_NAME), '');
    });
  });

  describe(`when changing ${ALTERNATIVE_TRADING_NAME} to '${FIELD_VALUES.NO}'`, () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.completeCompanyDetailsForm({
        differentTradingName: true,
      });

      submitButton().click();

      // back to page
      cy.navigateToUrl(url);
      // change answer to no
      cy.completeCompanyDetailsForm({});
      submitButton().click();
    });

    it(`should not have ${ALTERNATIVE_TRADING_NAME} input populated`, () => {
      cy.navigateToUrl(url);

      // check input is not populated
      yesRadioInput().first().click();
      cy.checkValue(field(ALTERNATIVE_TRADING_NAME), '');
    });
  });
});
