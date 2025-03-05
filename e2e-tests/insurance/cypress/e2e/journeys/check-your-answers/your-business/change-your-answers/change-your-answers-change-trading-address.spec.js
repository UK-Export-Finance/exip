import { status, summaryList } from '../../../../../../../pages/shared';
import { FIELD_VALUES } from '../../../../../../../constants';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import application from '../../../../../../../fixtures/application';

const {
  ROOT,
  CHECK_YOUR_ANSWERS: { YOUR_BUSINESS },
  EXPORTER_BUSINESS: { COMPANY_DETAILS_CHECK_AND_CHANGE, COMPANY_DETAILS_CHANGE, ALTERNATIVE_TRADING_ADDRESS_CHECK_AND_CHANGE },
} = INSURANCE_ROUTES;

const {
  EXPORTER_BUSINESS: {
    YOUR_COMPANY: { HAS_DIFFERENT_TRADING_ADDRESS },
    ALTERNATIVE_TRADING_ADDRESS: { FULL_ADDRESS },
  },
} = INSURANCE_FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

const getFieldVariables = (fieldId, referenceNumber, route = COMPANY_DETAILS_CHECK_AND_CHANGE) => ({
  route,
  checkYourAnswersRoute: YOUR_BUSINESS,
  newValueInput: '',
  fieldId,
  referenceNumber,
  summaryList,
  changeLink: summaryList.field(fieldId).changeLink,
});

context(`Insurance - Change your answers - ${HAS_DIFFERENT_TRADING_ADDRESS} and ${FULL_ADDRESS} - Your business - Change your answers`, () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType({});

      cy.clickTaskCheckAnswers();

      url = `${baseUrl}${ROOT}/${referenceNumber}${YOUR_BUSINESS}`;

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

  describe(`do NOT change any answers (${HAS_DIFFERENT_TRADING_ADDRESS} remains as "no"`, () => {
    const fieldId = HAS_DIFFERENT_TRADING_ADDRESS;

    describe('form submission with a new answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.clickSubmitButton();
      });

      it(`should redirect to ${YOUR_BUSINESS} and retain a 'completed' status tag`, () => {
        cy.assertChangeAnswersPageUrl({ referenceNumber, route: YOUR_BUSINESS, fieldId });

        cy.checkTaskStatusCompleted(status);
      });
    });
  });

  describe(`change ${HAS_DIFFERENT_TRADING_ADDRESS} from "no" to "yes"`, () => {
    const fieldId = HAS_DIFFERENT_TRADING_ADDRESS;

    let fieldVariables = getFieldVariables(fieldId, referenceNumber, COMPANY_DETAILS_CHECK_AND_CHANGE);

    describe('when clicking the `change` link', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it(`should redirect to ${COMPANY_DETAILS_CHECK_AND_CHANGE}`, () => {
        cy.navigateToUrl(url);

        fieldVariables = getFieldVariables(fieldId, referenceNumber);

        cy.checkChangeLinkUrl(fieldVariables, referenceNumber, fieldId);
      });
    });

    describe('form submission with a new answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.completeAndSubmitCompanyDetails({ differentTradingAddress: true });
      });

      it(`should redirect to ${ALTERNATIVE_TRADING_ADDRESS_CHECK_AND_CHANGE}`, () => {
        cy.assertChangeAnswersPageUrl({ referenceNumber, route: ALTERNATIVE_TRADING_ADDRESS_CHECK_AND_CHANGE, fieldId });
      });

      it('should render the new answer and retain a `completed` status tag', () => {
        cy.completeAndSubmitAlternativeTradingAddressForm({});

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: YOUR_BUSINESS, fieldId });

        const expectedFullAddress = application.DIFFERENT_TRADING_ADDRESS[FULL_ADDRESS];

        cy.checkText(summaryList.field(fieldId).value(), expectedFullAddress);

        cy.checkTaskStatusCompleted(status);
      });
    });
  });

  describe(`change ${FULL_ADDRESS}`, () => {
    const fieldId = HAS_DIFFERENT_TRADING_ADDRESS;
    const newAnswer = 'Mock address 2';

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${ALTERNATIVE_TRADING_ADDRESS_CHECK_AND_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: COMPANY_DETAILS_CHECK_AND_CHANGE, fieldId });
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

      it(`should redirect to ${YOUR_BUSINESS}`, () => {
        cy.assertChangeAnswersPageUrl({ referenceNumber, route: YOUR_BUSINESS, fieldId });
      });

      it('should render the new answer and retain a `completed` status tag', () => {
        cy.assertSummaryListRowValue(summaryList, fieldId, newAnswer);

        cy.checkTaskStatusCompleted(status);
      });
    });
  });

  describe(`change ${HAS_DIFFERENT_TRADING_ADDRESS} from "yes" to "no"`, () => {
    const fieldId = HAS_DIFFERENT_TRADING_ADDRESS;

    let fieldVariables = getFieldVariables(fieldId, referenceNumber, COMPANY_DETAILS_CHECK_AND_CHANGE);

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${COMPANY_DETAILS_CHANGE}`, () => {
        cy.navigateToUrl(url);

        fieldVariables = getFieldVariables(fieldId, referenceNumber);

        cy.checkChangeLinkUrl(fieldVariables, referenceNumber, fieldId);
      });
    });

    describe('form submission with a new answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.completeAndSubmitCompanyDetails({});
      });

      it(`should redirect to ${YOUR_BUSINESS}`, () => {
        cy.checkChangeLinkUrl(fieldVariables, referenceNumber, fieldId);
      });

      it('should render the new answer and retain a `completed` status tag', () => {
        const expected = FIELD_VALUES.NO;
        cy.assertSummaryListRowValue(summaryList, fieldId, expected);

        cy.checkTaskStatusCompleted(status);
      });
    });
  });
});
