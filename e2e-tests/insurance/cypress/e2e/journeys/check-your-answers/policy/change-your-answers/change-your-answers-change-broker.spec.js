import {
  field,
  submitButton,
  status,
  summaryList,
} from '../../../../../../../pages/shared';
import partials from '../../../../../../../partials';
import { brokerPage } from '../../../../../../../pages/insurance/policy';
import { POLICY_FIELDS as FIELDS } from '../../../../../../../content-strings/fields/insurance/policy';
import { FIELD_VALUES } from '../../../../../../../constants';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';

const {
  ROOT,
  CHECK_YOUR_ANSWERS: {
    TYPE_OF_POLICY,
  },
  POLICY: {
    BROKER_CHECK_AND_CHANGE,
  },
} = INSURANCE_ROUTES;

const {
  BROKER: {
    USING_BROKER,
    NAME,
    ADDRESS_LINE_1,
    ADDRESS_LINE_2,
    TOWN,
    COUNTY,
    POSTCODE,
    EMAIL,
  },
} = INSURANCE_FIELD_IDS.POLICY;

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswers;

const getFieldVariables = (fieldId, referenceNumber) => ({
  route: BROKER_CHECK_AND_CHANGE,
  checkYourAnswersRoute: TYPE_OF_POLICY,
  newValueInput: '',
  fieldId,
  referenceNumber,
  summaryList,
  changeLink: summaryList.field(fieldId).changeLink,
});

context('Insurance - Check your answers - Broker - Policy - Summary list', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType({ referenceNumber, usingBroker: true });

      task.link().click();

      // // To get past "Policy" check your answers page
      // cy.submitCheckYourAnswersForm();

      url = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${TYPE_OF_POLICY}`;

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

  describe(NAME, () => {
    const fieldId = NAME;

    let fieldVariables = getFieldVariables(fieldId, referenceNumber);

    describe('when clicking the `change` link', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it(`should redirect to ${BROKER_CHECK_AND_CHANGE}`, () => {
        cy.navigateToUrl(url);
        fieldVariables = getFieldVariables(fieldId, referenceNumber);

        cy.checkChangeLinkUrl(fieldVariables, referenceNumber);
      });
    });

    describe('form submission with a new answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        fieldVariables.newValueInput = 'Test name 2';
        cy.changeAnswerField(fieldVariables, field(fieldId).input());
      });

      it(`should redirect to ${TYPE_OF_POLICY}`, () => {
        cy.assertChangeAnswersPageUrl({ referenceNumber, route: TYPE_OF_POLICY, fieldId });
      });

      it('should render the new answer and retain a `completed` status tag', () => {
        fieldVariables.newValue = fieldVariables.newValueInput;
        cy.checkChangeAnswerRendered(fieldVariables);

        cy.checkTaskStatusCompleted(status());
      });
    });
  });

  describe('Address', () => {
    const fieldId = ADDRESS_LINE_1;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${BROKER_CHECK_AND_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: BROKER_CHECK_AND_CHANGE, fieldId });
      });
    });

    describe('form submission with a new answer', () => {
      const addressLine1 = '25 test';
      const addressLine2 = '25 test 2';
      const town = 'Test London';
      const country = 'Test London';
      const postcode = 'SW1A 2AA';

      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.keyboardInput(field(fieldId).input(), addressLine1);
        cy.keyboardInput(field(ADDRESS_LINE_2).input(), addressLine2);
        cy.keyboardInput(field(TOWN).input(), town);
        cy.keyboardInput(field(COUNTY).input(), country);
        cy.keyboardInput(field(POSTCODE).input(), postcode);

        submitButton().click();
      });

      it(`should redirect to ${TYPE_OF_POLICY}`, () => {
        cy.assertChangeAnswersPageUrl({ referenceNumber, route: TYPE_OF_POLICY, fieldId });
      });

      it('should render the new answer and retain a `completed` status tag', () => {
        const expectedKey = FIELDS.BROKER[fieldId].SUMMARY.TITLE;

        const row = summaryList.field(fieldId);

        cy.checkText(
          row.key(),
          expectedKey,
        );

        // as html, cannot use checkText so checking contains following fields
        row.value().contains(addressLine1);
        row.value().contains(addressLine2);
        row.value().contains(town);
        row.value().contains(country);
        row.value().contains(postcode);

        cy.checkTaskStatusCompleted(status());
      });
    });
  });

  describe(EMAIL, () => {
    const fieldId = EMAIL;

    let fieldVariables = getFieldVariables(fieldId, referenceNumber);

    describe('when clicking the `change` link', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it(`should redirect to ${BROKER_CHECK_AND_CHANGE}`, () => {
        cy.navigateToUrl(url);
        fieldVariables = getFieldVariables(fieldId, referenceNumber);

        cy.checkChangeLinkUrl(fieldVariables, referenceNumber);
      });
    });

    describe('form submission with a new answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        fieldVariables.newValueInput = 'testing321@test.com';
        cy.changeAnswerField(fieldVariables, field(fieldId).input());
      });

      it(`should redirect to ${TYPE_OF_POLICY}`, () => {
        cy.assertChangeAnswersPageUrl({ referenceNumber, route: TYPE_OF_POLICY, fieldId });
      });

      it('should render the new answer and retain a `completed` status tag', () => {
        fieldVariables.newValue = fieldVariables.newValueInput;
        cy.checkChangeAnswerRendered(fieldVariables);

        cy.checkTaskStatusCompleted(status());
      });
    });
  });

  describe(USING_BROKER, () => {
    const fieldId = USING_BROKER;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${BROKER_CHECK_AND_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: BROKER_CHECK_AND_CHANGE, fieldId });
      });
    });

    describe('form submission with a new answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        brokerPage[fieldId].noRadioInput().click();

        submitButton().click();
      });

      it(`should redirect to ${TYPE_OF_POLICY}`, () => {
        cy.assertChangeAnswersPageUrl({ referenceNumber, route: TYPE_OF_POLICY, fieldId });
      });

      it('should render the new answer, not render the optional broker sections and retain a `completed` status tag', () => {
        cy.checkText(summaryList.field(fieldId).value(), FIELD_VALUES.NO);

        summaryList.field(NAME).key().should('not.exist');
        summaryList.field(NAME).value().should('not.exist');
        summaryList.field(NAME).changeLink().should('not.exist');

        summaryList.field(ADDRESS_LINE_1).key().should('not.exist');
        summaryList.field(ADDRESS_LINE_1).value().should('not.exist');
        summaryList.field(ADDRESS_LINE_1).changeLink().should('not.exist');

        summaryList.field(EMAIL).key().should('not.exist');
        summaryList.field(EMAIL).value().should('not.exist');
        summaryList.field(EMAIL).changeLink().should('not.exist');

        cy.checkTaskStatusCompleted(status());
      });
    });
  });
});
