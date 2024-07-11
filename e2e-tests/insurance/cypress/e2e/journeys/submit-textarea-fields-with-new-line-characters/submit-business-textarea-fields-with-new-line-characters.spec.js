import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';
import { EXPORTER_BUSINESS as EXPORTER_BUSINESS_FIELD_IDS } from '../../../../../constants/field-ids/insurance/business';
import {
  MULTI_LINE_STRING,
  EXPECTED_MULTI_LINE_STRING,
} from '../../../../../constants';

const {
  ROOT,
  EXPORTER_BUSINESS: {
    ALTERNATIVE_TRADING_ADDRESS_ROOT,
  },
} = INSURANCE_ROUTES;

const {
  ALTERNATIVE_TRADING_ADDRESS: {
    FULL_ADDRESS,
  },
} = EXPORTER_BUSINESS_FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Textarea fields - `Business` textarea fields should render new lines without character codes after submission', () => {
  let referenceNumber;
  let alternativeTradingAddressUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      /**
       * Set the default state of the business section,
       * so that an alternative trading address is required.
       */
      cy.startYourBusinessSection({});
      cy.completeCompanyDetailsForm({ differentTradingAddress: true });

      alternativeTradingAddressUrl = `${baseUrl}${ROOT}/${referenceNumber}${ALTERNATIVE_TRADING_ADDRESS_ROOT}`;
    });
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe(FULL_ADDRESS, () => {
    describe('when submitting the textarea field with new lines va the `enter` key and going back to the page', () => {
      beforeEach(() => {
        cy.saveSession();

        cy.navigateToUrl(alternativeTradingAddressUrl);

        cy.completeAndSubmitAlternativeTradingAddressForm({
          address: MULTI_LINE_STRING,
        });

        cy.clickBackLink();
      });

      it('should render new line characters exactly as they were submitted', () => {
        cy.checkTextareaValue({
          fieldId: FULL_ADDRESS,
          expectedValue: EXPECTED_MULTI_LINE_STRING,
        });
      });
    });
  });
});
