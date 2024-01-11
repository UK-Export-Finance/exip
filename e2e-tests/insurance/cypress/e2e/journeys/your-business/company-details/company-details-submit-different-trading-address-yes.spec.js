import { FIELD_VALUES } from '../../../../../../constants';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const {
  EXPORTER_BUSINESS: {
    YOUR_COMPANY: { TRADING_ADDRESS },
  },
} = INSURANCE_FIELD_IDS;

const {
  ROOT,
  EXPORTER_BUSINESS: {
    COMPANY_DETAILS,
    ALTERNATIVE_TRADING_ADDRESS_ROOT,
  },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

describe(`Insurance - Your business - Company details page - submit ${TRADING_ADDRESS} as '${FIELD_VALUES.YES}'`, () => {
  let referenceNumber;
  let url;
  let alternativeTradingAddressUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      url = `${baseUrl}${ROOT}/${referenceNumber}${COMPANY_DETAILS}`;
      alternativeTradingAddressUrl = `${baseUrl}${ROOT}/${referenceNumber}${ALTERNATIVE_TRADING_ADDRESS_ROOT}`;

      cy.startYourBusinessSection({});

      cy.completeCompanyDetailsForm({});

      cy.assertUrl(url);
    });
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe(`when submitting ${TRADING_ADDRESS} as '${FIELD_VALUES.YES}'`, () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.completeCompanyDetailsForm({
        differentTradingAddress: true,
      });

      cy.clickSubmitButton();
    });

    it(`should redirect to ${alternativeTradingAddressUrl}`, () => {
      cy.assertUrl(alternativeTradingAddressUrl);
    });
  });
});
