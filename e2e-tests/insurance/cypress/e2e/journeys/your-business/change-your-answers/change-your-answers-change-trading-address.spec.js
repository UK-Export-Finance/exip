import {

  FIELD_VALUES,
} from '../../../../../../constants';
import {
  field,
  submitButton,
  summaryList,
  noRadioInput,
  yesRadioInput,
} from '../../../../../../pages/shared';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import application from '../../../../../../fixtures/application';
import checkSummaryList from '../../../../../../commands/insurance/check-your-business-summary-list';

const {
  EXPORTER_BUSINESS: {
    YOUR_COMPANY: {
      TRADING_ADDRESS,
    },
    ALTERNATIVE_TRADING_ADDRESS: {
      FULL_ADDRESS,
    },
  },
} = INSURANCE_FIELD_IDS;

const {
  ROOT,
  EXPORTER_BUSINESS: {
    COMPANY_DETAILS_CHANGE,
    CHECK_YOUR_ANSWERS,
    ALTERNATIVE_TRADING_ADDRESS_CHANGE,
  },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context(`Insurance - Your business - Change your answers - ${TRADING_ADDRESS} and ${FULL_ADDRESS} - As an exporter, I want to change my answers to the trading address / alternative trading address sections`, () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.clearCookies();

    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startYourBusinessSection();

      cy.completeAndSubmitCompanyDetails({});
      cy.completeAndSubmitNatureOfYourBusiness();
      cy.completeAndSubmitTurnoverForm();
      cy.completeAndSubmitCreditControlForm({});

      url = `${baseUrl}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe(`change ${TRADING_ADDRESS} from ${FIELD_VALUES.NO} to ${FIELD_VALUES.YES}`, () => {
    const fieldId = TRADING_ADDRESS;

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

        yesRadioInput().eq(1).click();

        submitButton().click();
      });

      it(`should redirect to ${ALTERNATIVE_TRADING_ADDRESS_CHANGE}`, () => {
        cy.assertChangeAnswersPageUrl({ referenceNumber, route: ALTERNATIVE_TRADING_ADDRESS_CHANGE, fieldId });
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS} and render the new answers`, () => {
        cy.completeAndSubmitAlternativeTradingAddressForm();

        const expected = FIELD_VALUES.YES;
        cy.assertSummaryListRowValue(summaryList, fieldId, expected);

        const expectedAlternativeTradingAddress = application.DIFFERENT_TRADING_ADDRESS[FULL_ADDRESS];
        cy.assertSummaryListRowValue(summaryList, FULL_ADDRESS, expectedAlternativeTradingAddress);
      });
    });
  });

  describe(`change ${FULL_ADDRESS}`, () => {
    const fieldId = FULL_ADDRESS;
    const newAnswer = 'Mock address 2';

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${ALTERNATIVE_TRADING_ADDRESS_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: ALTERNATIVE_TRADING_ADDRESS_CHANGE, fieldId });
      });
    });

    describe('form submission with a new answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.keyboardInput(field(FULL_ADDRESS).textarea(), newAnswer);

        submitButton().click();
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId });
      });

      it('should render the new answer', () => {
        cy.assertSummaryListRowValue(summaryList, fieldId, newAnswer);
      });
    });
  });

  describe(`change ${TRADING_ADDRESS} from ${FIELD_VALUES.YES} to ${FIELD_VALUES.NO}`, () => {
    const fieldId = TRADING_ADDRESS;

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

        noRadioInput().eq(1).click();

        submitButton().click();
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId });
      });

      it('should render the new answer', () => {
        const expected = FIELD_VALUES.NO;
        cy.assertSummaryListRowValue(summaryList, fieldId, expected);

        checkSummaryList[FULL_ADDRESS](false);
      });
    });
  });
});
