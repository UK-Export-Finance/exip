import { FIELD_VALUES } from '../../../../../../constants';
import { summaryList } from '../../../../../../pages/shared';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import application from '../../../../../../fixtures/application';

const {
  EXPORTER_BUSINESS: {
    YOUR_COMPANY: { HAS_DIFFERENT_TRADING_ADDRESS },
    ALTERNATIVE_TRADING_ADDRESS: { FULL_ADDRESS },
  },
} = INSURANCE_FIELD_IDS;

const {
  ROOT,
  EXPORTER_BUSINESS: { COMPANY_DETAILS_CHANGE, CHECK_YOUR_ANSWERS, ALTERNATIVE_TRADING_ADDRESS_CHANGE },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context(
  `Insurance - Your business - Change your answers - ${HAS_DIFFERENT_TRADING_ADDRESS} and ${FULL_ADDRESS} - As an exporter, I want to change my answers to the trading address / alternative trading address sections`,
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

    describe(`do NOT change any answers (${HAS_DIFFERENT_TRADING_ADDRESS} remains as ${FIELD_VALUES.NO})`, () => {
      const fieldId = HAS_DIFFERENT_TRADING_ADDRESS;

      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.clickSubmitButton();
      });

      it(`should should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId });
      });
    });

    describe(`change ${HAS_DIFFERENT_TRADING_ADDRESS} from ${FIELD_VALUES.NO} to ${FIELD_VALUES.YES}`, () => {
      const fieldId = HAS_DIFFERENT_TRADING_ADDRESS;

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

          cy.completeAndSubmitCompanyDetails({ differentTradingAddress: true });
        });

        it(`should redirect to ${ALTERNATIVE_TRADING_ADDRESS_CHANGE}`, () => {
          cy.assertChangeAnswersPageUrl({ referenceNumber, route: ALTERNATIVE_TRADING_ADDRESS_CHANGE, fieldId });
        });

        it(`should redirect to ${CHECK_YOUR_ANSWERS} and render the new answers`, () => {
          cy.completeAndSubmitAlternativeTradingAddressForm({});

          const expectedAlternativeTradingAddress = application.DIFFERENT_TRADING_ADDRESS[FULL_ADDRESS];
          cy.assertSummaryListRowValue(summaryList, fieldId, expectedAlternativeTradingAddress);
        });
      });
    });

    describe(`change ${FULL_ADDRESS}`, () => {
      const fieldId = HAS_DIFFERENT_TRADING_ADDRESS;
      const newAnswer = 'Mock address 2';

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

          // to get to alternative trading address page
          cy.clickSubmitButton();

          cy.completeAndSubmitAlternativeTradingAddressForm({ address: newAnswer });
        });

        it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
          cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId });
        });

        it('should render the new answer', () => {
          cy.assertSummaryListRowValue(summaryList, fieldId, newAnswer);
        });
      });
    });

    describe(`change ${HAS_DIFFERENT_TRADING_ADDRESS} from ${FIELD_VALUES.YES} to ${FIELD_VALUES.NO}`, () => {
      const fieldId = HAS_DIFFERENT_TRADING_ADDRESS;

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

          cy.completeAndSubmitCompanyDetails({});
        });

        it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
          cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId });
        });

        it('should render the new answer', () => {
          const expected = FIELD_VALUES.NO;
          cy.assertSummaryListRowValue(summaryList, fieldId, expected);
        });
      });
    });
  },
);
