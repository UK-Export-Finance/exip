import { field } from '../../../../../../pages/shared';
import { FIELD_VALUES } from '../../../../../../constants';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import application from '../../../../../../fixtures/application';

const {
  EXPORTER_BUSINESS: {
    YOUR_COMPANY: { DIFFERENT_TRADING_NAME },
  },
} = INSURANCE_FIELD_IDS;

const {
  ROOT,
  EXPORTER_BUSINESS: {
    COMPANY_DETAILS,
  },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

const { YOUR_COMPANY } = application;

describe(`Insurance - Your business - Company details page - submit ${DIFFERENT_TRADING_NAME} as '${FIELD_VALUES.YES}'`, () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      url = `${baseUrl}${ROOT}/${referenceNumber}${COMPANY_DETAILS}`;

      cy.startYourBusinessSection({});

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

  describe(`when submitting ${DIFFERENT_TRADING_NAME} as '${FIELD_VALUES.YES}'`, () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.completeAndSubmitCompanyDetails({
        differentTradingName: true,
      });
    });

    it('should render valid submitted values when going back to the page', () => {
      cy.navigateToUrl(url);

      cy.assertYesRadioOptionIsChecked(0);

      cy.checkValue(field(DIFFERENT_TRADING_NAME), YOUR_COMPANY[DIFFERENT_TRADING_NAME]);
    });
  });

  describe(`when submitting ${DIFFERENT_TRADING_NAME} as '${FIELD_VALUES.NO}'`, () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.completeAndSubmitCompanyDetails({});
    });

    it(`should not have ${DIFFERENT_TRADING_NAME} input populated`, () => {
      cy.navigateToUrl(url);

      cy.assertNoRadioOptionIsChecked(0);

      // check input is not populated
      cy.clickYesRadioInput();
      cy.checkValue(field(DIFFERENT_TRADING_NAME), '');
    });
  });

  describe(`when changing ${DIFFERENT_TRADING_NAME} to '${FIELD_VALUES.NO}'`, () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.completeAndSubmitCompanyDetails({
        differentTradingName: true,
      });

      // back to page
      cy.navigateToUrl(url);
      // change answer to no
      cy.completeAndSubmitCompanyDetails({});
    });

    it(`should not have ${DIFFERENT_TRADING_NAME} input populated`, () => {
      cy.navigateToUrl(url);

      // check input is not populated
      cy.clickYesRadioInput();
      cy.checkValue(field(DIFFERENT_TRADING_NAME), '');
    });
  });
});
