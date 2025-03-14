import { VALID_PHONE_NUMBERS, WEBSITE_EXAMPLES } from '../../../../../../constants';
import { field, summaryList } from '../../../../../../pages/shared';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import application from '../../../../../../fixtures/application';

const {
  EXPORTER_BUSINESS: {
    YOUR_COMPANY: { HAS_DIFFERENT_TRADING_ADDRESS, HAS_DIFFERENT_TRADING_NAME, DIFFERENT_TRADING_NAME, WEBSITE, PHONE_NUMBER },
    ALTERNATIVE_TRADING_ADDRESS: { FULL_ADDRESS },
  },
} = INSURANCE_FIELD_IDS;

const {
  ROOT,
  EXPORTER_BUSINESS: { COMPANY_DETAILS_CHANGE, ALTERNATIVE_TRADING_ADDRESS_CHANGE, CHECK_YOUR_ANSWERS },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context(
  'Insurance - Your business - Change your answers - Company details - As an exporter, I want to change my answers to the company details section',
  () => {
    let referenceNumber;
    let url;

    before(() => {
      cy.clearCookies();

      cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
        referenceNumber = refNumber;

        cy.completeAndSubmitYourBusinessForms({ stopSubmittingAfter: 'creditControl' });

        url = `${baseUrl}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
      });
    });

    beforeEach(() => {
      cy.saveSession();
    });

    after(() => {
      cy.deleteApplication(referenceNumber);
    });

    describe(HAS_DIFFERENT_TRADING_NAME, () => {
      const fieldId = HAS_DIFFERENT_TRADING_NAME;

      describe('when clicking the `change` link', () => {
        it(`should redirect to ${COMPANY_DETAILS_CHANGE}`, () => {
          cy.navigateToUrl(url);

          summaryList.field(fieldId).changeLink().click();

          cy.assertChangeAnswersPageUrl({ referenceNumber, route: COMPANY_DETAILS_CHANGE, fieldId });
        });
      });

      describe('form submission with a new answer', () => {
        beforeEach(() => {
          cy.navigateToUrl(url);

          summaryList.field(fieldId).changeLink().click();

          cy.completeAndSubmitCompanyDetails({ differentTradingName: true });
        });

        it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
          cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId });
        });

        it('should render the new answer', () => {
          const { YOUR_COMPANY } = application;
          const expected = YOUR_COMPANY[DIFFERENT_TRADING_NAME];

          cy.assertSummaryListRowValue(summaryList, fieldId, expected);
        });
      });
    });

    describe(HAS_DIFFERENT_TRADING_ADDRESS, () => {
      const fieldId = HAS_DIFFERENT_TRADING_ADDRESS;

      describe('when clicking the `change` link', () => {
        it(`should redirect to ${COMPANY_DETAILS_CHANGE}`, () => {
          cy.navigateToUrl(url);

          summaryList.field(fieldId).changeLink().click();

          cy.assertChangeAnswersPageUrl({ referenceNumber, route: COMPANY_DETAILS_CHANGE, fieldId });
        });
      });

      describe(`form submission with a new answer (change ${HAS_DIFFERENT_TRADING_ADDRESS} from no to yes)`, () => {
        beforeEach(() => {
          cy.navigateToUrl(url);

          summaryList.field(fieldId).changeLink().click();

          cy.completeAndSubmitCompanyDetails({ differentTradingAddress: true });
        });

        it(`should redirect to ${ALTERNATIVE_TRADING_ADDRESS_CHANGE}`, () => {
          cy.assertChangeAnswersPageUrl({ referenceNumber, route: ALTERNATIVE_TRADING_ADDRESS_CHANGE, fieldId });
        });

        it(`should redirect to ${CHECK_YOUR_ANSWERS} after submitting new ${HAS_DIFFERENT_TRADING_ADDRESS} and ${FULL_ADDRESS} answers`, () => {
          cy.completeAndSubmitAlternativeTradingAddressForm({});

          cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId });

          const expectedFullAddress = application.DIFFERENT_TRADING_ADDRESS[FULL_ADDRESS];

          cy.assertSummaryListRowValue(summaryList, HAS_DIFFERENT_TRADING_ADDRESS, expectedFullAddress);
        });
      });
    });

    describe(PHONE_NUMBER, () => {
      const fieldId = PHONE_NUMBER;

      describe('when clicking the `change` link', () => {
        it(`should redirect to ${COMPANY_DETAILS_CHANGE}`, () => {
          cy.navigateToUrl(url);

          summaryList.field(fieldId).changeLink().click();

          cy.assertChangeAnswersPageUrl({ referenceNumber, route: COMPANY_DETAILS_CHANGE, fieldId });
        });
      });

      describe('form submission with a new answer', () => {
        const newAnswer = VALID_PHONE_NUMBERS.LANDLINE.NORMAL;

        beforeEach(() => {
          cy.navigateToUrl(url);

          summaryList.field(fieldId).changeLink().click();

          cy.keyboardInput(field(PHONE_NUMBER).input(), newAnswer);

          cy.clickSubmitButton();
          cy.completeAndSubmitAlternativeTradingAddressForm({});
        });

        it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
          cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId });
        });

        it('should render the new answer', () => {
          cy.assertSummaryListRowValue(summaryList, fieldId, newAnswer);
        });
      });
    });

    describe(WEBSITE, () => {
      const fieldId = WEBSITE;

      describe('when clicking the `change` link', () => {
        it(`should redirect to ${COMPANY_DETAILS_CHANGE}`, () => {
          cy.navigateToUrl(url);

          summaryList.field(fieldId).changeLink().click();

          cy.assertChangeAnswersPageUrl({ referenceNumber, route: COMPANY_DETAILS_CHANGE, fieldId });
        });
      });

      describe('form submission with a new answer', () => {
        const newAnswer = WEBSITE_EXAMPLES.VALID;

        beforeEach(() => {
          cy.navigateToUrl(url);

          summaryList.field(fieldId).changeLink().click();

          cy.keyboardInput(field(WEBSITE).input(), newAnswer);

          cy.clickSubmitButton();
          cy.completeAndSubmitAlternativeTradingAddressForm({});
        });

        it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
          cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId });
        });

        it('should render the new answer', () => {
          cy.assertSummaryListRowValue(summaryList, fieldId, newAnswer);
        });
      });
    });
  },
);
