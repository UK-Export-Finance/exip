import { FIELD_VALUES } from '../../../../../../constants';
import {
  field,
  summaryList,
} from '../../../../../../pages/shared';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const {
  EXPORTER_BUSINESS: {
    YOUR_COMPANY: {
      TRADING_ADDRESS: FIELD_ID,
    },
    ALTERNATIVE_TRADING_ADDRESS: { FULL_ADDRESS },
  },
} = INSURANCE_FIELD_IDS;

const {
  ROOT,
  EXPORTER_BUSINESS: {
    COMPANY_DETAILS_CHANGE,
    ALTERNATIVE_TRADING_ADDRESS_ROOT,
    CHECK_YOUR_ANSWERS,
  },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context(`Insurance - Your business - Change your answers - Company details - ${FIELD_ID} - Yes to no - As an exporter, I want to change my answers to the company details section`, () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.clearCookies();

    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startYourBusinessSection({});

      cy.completeAndSubmitCompanyDetails({ differentTradingAddress: true });
      cy.completeAndSubmitAlternativeTradingAddressForm({});

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

  describe('when clicking the `change` link', () => {
    it(`should redirect to ${COMPANY_DETAILS_CHANGE}`, () => {
      cy.navigateToUrl(url);

      summaryList.field(FIELD_ID).changeLink().click();

      cy.assertChangeAnswersPageUrl({ referenceNumber, route: COMPANY_DETAILS_CHANGE, fieldId: FIELD_ID });
    });
  });

  describe('after changing the answer from yes to no', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
      summaryList.field(FIELD_ID).changeLink().click();

      cy.completeAndSubmitCompanyDetails({ differentTradingAddress: false });

      cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId: FIELD_ID });
    });

    it(`should render new ${FIELD_ID} answer and change link, with no ${FULL_ADDRESS} field`, () => {
      cy.assertSummaryListRowValue(summaryList, FIELD_ID, FIELD_VALUES.NO);
      cy.assertSummaryListRowDoesNotExist(summaryList, FULL_ADDRESS);
    });

    describe(`when changing the answer again from no to yes and going back to ${ALTERNATIVE_TRADING_ADDRESS_ROOT}}`, () => {
      it(`should have an empty field ${FULL_ADDRESS} value`, () => {
        summaryList.field(FIELD_ID).changeLink().click();

        cy.completeAndSubmitCompanyDetails({ differentTradingAddress: true });

        cy.checkText(field(FULL_ADDRESS).textarea(), '');
      });
    });
  });
});
