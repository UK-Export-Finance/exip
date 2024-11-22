import { field, summaryList } from '../../../../../../../pages/shared';
import { FIELD_VALUES } from '../../../../../../../constants';
import { POLICY_FIELDS as FIELDS } from '../../../../../../../content-strings/fields/insurance/policy';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/policy';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { mockAddress1 } from '../../../../../../../fixtures/addresses';

const {
  USING_BROKER,
  BROKER_DETAILS: { NAME, EMAIL, FULL_ADDRESS },
} = POLICY_FIELD_IDS;

const {
  ROOT,
  POLICY: { BROKER_CHANGE, BROKER_DETAILS_CHANGE, CHECK_YOUR_ANSWERS },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Change your answers - Broker - As an exporter, I want to change my answers to the broker section', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePolicySection({ usingBroker: true });

      url = `${baseUrl}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe(NAME, () => {
    const fieldId = NAME;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${BROKER_DETAILS_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: BROKER_DETAILS_CHANGE, fieldId });
      });
    });

    describe('form submission with a new answer', () => {
      const newAnswer = 'Test name 2';

      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.keyboardInput(field(fieldId).input(), newAnswer);

        cy.clickSubmitButton();
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId });
      });

      it('should render the new answer', () => {
        cy.assertSummaryListRowValue(summaryList, fieldId, newAnswer);
      });
    });
  });

  // TODO: EMS-4011
  describe.skip(FULL_ADDRESS, () => {
    const fieldId = FULL_ADDRESS;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${BROKER_DETAILS_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: BROKER_DETAILS_CHANGE, fieldId });
      });
    });

    describe('form submission with a new answer', () => {
      const mockNewAddress = mockAddress1;

      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.keyboardInput(field(fieldId).textarea(), mockNewAddress);

        cy.clickSubmitButton();
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId });
      });

      it('should render the new answer', () => {
        const expectedKey = FIELDS.BROKER_DETAILS[fieldId].SUMMARY.TITLE;

        const row = summaryList.field(fieldId);

        cy.checkText(row.key(), expectedKey);

        row.value().contains(mockNewAddress);
      });
    });
  });

  describe(EMAIL, () => {
    const fieldId = EMAIL;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${BROKER_DETAILS_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: BROKER_DETAILS_CHANGE, fieldId: EMAIL });
      });
    });

    describe('form submission with a new answer', () => {
      const newAnswer = 'testing321@test.com';

      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.keyboardInput(field(fieldId).input(), newAnswer);

        cy.clickSubmitButton();
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId });
      });

      it('should render the new answer', () => {
        cy.assertSummaryListRowValue(summaryList, fieldId, newAnswer, 1);
      });
    });
  });

  describe(USING_BROKER, () => {
    const fieldId = USING_BROKER;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${BROKER_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: BROKER_CHANGE, fieldId: USING_BROKER });
      });
    });

    describe('form submission with a new answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.clickNoRadioInput();

        cy.clickSubmitButton();
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId });
      });

      it('should render the new answer and not render the optional broker sections', () => {
        cy.assertSummaryListRowValue(summaryList, fieldId, FIELD_VALUES.NO);

        summaryList.field(NAME).key().should('not.exist');
        summaryList.field(NAME).value().should('not.exist');
        summaryList.field(NAME).changeLink().should('not.exist');

        summaryList.field(EMAIL).key().eq(1).should('not.exist');
        summaryList.field(EMAIL).value().eq(1).should('not.exist');
        summaryList.field(EMAIL).changeLink().should('not.exist');

        // TODO: EMS-4011
        // summaryList.field(FULL_ADDRESS).key().should('not.exist');
        // summaryList.field(FULL_ADDRESS).value().should('not.exist');
        // summaryList.field(FULL_ADDRESS).changeLink().should('not.exist');
      });
    });
  });
});
