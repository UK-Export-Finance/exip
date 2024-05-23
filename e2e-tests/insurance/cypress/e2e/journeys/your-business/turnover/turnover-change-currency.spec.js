import { field as fieldSelector } from '../../../../../../pages/shared';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { EXPORTER_BUSINESS as FIELD_IDS } from '../../../../../../constants/field-ids/insurance/business';
import { EXPORTER_BUSINESS_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/business';
import { assertCurrencyFormFields } from '../../../../../../shared-test-assertions';
import { NON_STANDARD_CURRENCY_NAME } from '../../../../../../fixtures/currencies';

const {
  TURNOVER: { ESTIMATED_ANNUAL_TURNOVER },
} = FIELD_IDS;

const {
  ROOT,
  EXPORTER_BUSINESS: { TURNOVER_ROOT },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Your business - Turnover page - As an Exporter I want to change the currency of my annual turnover', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startYourBusinessSection({});

      cy.completeAndSubmitCompanyDetails({});
      cy.completeAndSubmitNatureOfYourBusiness();

      url = `${baseUrl}${ROOT}/${referenceNumber}${TURNOVER_ROOT}`;

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

  describe('prefixes should be displayed based on the chosen currency', () => {
    const { prefixAssertions } = assertCurrencyFormFields({ fieldId: ESTIMATED_ANNUAL_TURNOVER });

    prefixAssertions();
  });

  describe('the currency should be included in the legend', () => {
    beforeEach(() => {
      // submit alternative currency form
      cy.clickSubmitButton();
    });

    it('should render the turnover legend with the alternative currency', () => {
      const field = fieldSelector(ESTIMATED_ANNUAL_TURNOVER);

      cy.assertHeadingWithCurrencyName({
        pageTitle: FIELDS.TURNOVER[ESTIMATED_ANNUAL_TURNOVER].LEGEND,
        currencyName: NON_STANDARD_CURRENCY_NAME,
        selector: field.legend(),
        withQuestionMark: true,
      });
    });
  });
});
