import { field as fieldSelector, status, summaryList } from '../../../../../../../pages/shared';
import { WEBSITE_EXAMPLES } from '../../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { YOUR_BUYER_FIELDS as FIELDS } from '../../../../../../../content-strings/fields/insurance/your-buyer';

const {
  ROOT,
  CHECK_YOUR_ANSWERS: { YOUR_BUYER },
  YOUR_BUYER: { COMPANY_OR_ORGANISATION_CHECK_AND_CHANGE },
} = INSURANCE_ROUTES;

const {
  COMPANY_OR_ORGANISATION: { NAME, ADDRESS, REGISTRATION_NUMBER, WEBSITE },
} = INSURANCE_FIELD_IDS.YOUR_BUYER;

const getFieldVariables = (fieldId, referenceNumber) => ({
  route: COMPANY_OR_ORGANISATION_CHECK_AND_CHANGE,
  checkYourAnswersRoute: YOUR_BUYER,
  newValueInput: '',
  fieldId,
  referenceNumber,
  summaryList,
  changeLink: summaryList.field(fieldId).changeLink,
});

const baseUrl = Cypress.config('baseUrl');

context(
  'Insurance - Check your answers - Your buyer - Company or organisation - As an exporter, I want to change my answers to the company or organisation section',
  () => {
    let referenceNumber;
    let url;

    before(() => {
      cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
        referenceNumber = refNumber;

        cy.completePrepareApplicationSinglePolicyType({});

        cy.clickTaskCheckAnswers();

        // To get past "Your business" check your answers page
        cy.completeAndSubmitMultipleCheckYourAnswers({ count: 1 });

        url = `${baseUrl}${ROOT}/${referenceNumber}${YOUR_BUYER}`;

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

        it(`should redirect to ${COMPANY_OR_ORGANISATION_CHECK_AND_CHANGE}`, () => {
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
          cy.changeAnswerField(fieldVariables, fieldSelector(fieldId).input());
        });

        it(`should redirect to ${YOUR_BUYER}`, () => {
          cy.assertChangeAnswersPageUrl({ referenceNumber, route: YOUR_BUYER, fieldId });
        });

        it('should render the new answer and retain a `completed` status tag', () => {
          fieldVariables.newValue = fieldVariables.newValueInput;
          cy.checkChangeAnswerRendered({ fieldVariables });

          cy.checkTaskStatusCompleted(status);
        });
      });
    });

    describe(ADDRESS, () => {
      const fieldId = ADDRESS;
      let fieldVariables = getFieldVariables(fieldId, referenceNumber);

      describe('when clicking the `change` link', () => {
        beforeEach(() => {
          cy.navigateToUrl(url);
        });

        it(`should redirect to ${COMPANY_OR_ORGANISATION_CHECK_AND_CHANGE}`, () => {
          cy.navigateToUrl(url);
          fieldVariables = getFieldVariables(fieldId, referenceNumber);

          cy.checkChangeLinkUrl(fieldVariables, referenceNumber);
        });
      });

      describe('form submission with a new answer', () => {
        beforeEach(() => {
          cy.navigateToUrl(url);

          summaryList.field(fieldId).changeLink().click();

          const field = fieldSelector(fieldId);
          const textareaField = { ...field, input: field.textarea };

          fieldVariables.newValueInput = 'Address test 2';
          cy.changeAnswerField(fieldVariables, textareaField.input());
        });

        it(`should redirect to ${YOUR_BUYER}`, () => {
          cy.assertChangeAnswersPageUrl({ referenceNumber, route: YOUR_BUYER, fieldId });
        });

        it('should render the new answer and retain a `completed` status tag', () => {
          const expectedKey = FIELDS.COMPANY_OR_ORGANISATION[fieldId].SUMMARY.TITLE;

          const row = summaryList.field(fieldId);

          cy.checkText(row.key(), expectedKey);

          // as html, cannot use checkText so checking contains following fields
          row.value().contains(fieldVariables.newValueInput);

          cy.checkTaskStatusCompleted(status);
        });
      });
    });

    describe(REGISTRATION_NUMBER, () => {
      const fieldId = REGISTRATION_NUMBER;
      let fieldVariables = getFieldVariables(fieldId, referenceNumber);

      describe('when clicking the `change` link', () => {
        beforeEach(() => {
          cy.navigateToUrl(url);
        });

        it(`should redirect to ${COMPANY_OR_ORGANISATION_CHECK_AND_CHANGE}`, () => {
          cy.navigateToUrl(url);
          fieldVariables = getFieldVariables(fieldId, referenceNumber);

          cy.checkChangeLinkUrl(fieldVariables, referenceNumber);
        });
      });

      describe('form submission with a new answer', () => {
        beforeEach(() => {
          cy.navigateToUrl(url);

          summaryList.field(fieldId).changeLink().click();

          fieldVariables.newValueInput = '99999';
          cy.changeAnswerField(fieldVariables, fieldSelector(fieldId).input());
        });

        it(`should redirect to ${YOUR_BUYER}`, () => {
          cy.assertChangeAnswersPageUrl({ referenceNumber, route: YOUR_BUYER, fieldId });
        });

        it('should render the new answer and retain a `completed` status tag', () => {
          fieldVariables.newValue = fieldVariables.newValueInput;
          cy.checkChangeAnswerRendered({ fieldVariables });

          cy.checkTaskStatusCompleted(status);
        });
      });
    });

    describe(WEBSITE, () => {
      const fieldId = WEBSITE;
      let fieldVariables = getFieldVariables(fieldId, referenceNumber);

      describe('when clicking the `change` link', () => {
        beforeEach(() => {
          cy.navigateToUrl(url);
        });

        it(`should redirect to ${COMPANY_OR_ORGANISATION_CHECK_AND_CHANGE}`, () => {
          cy.navigateToUrl(url);
          fieldVariables = getFieldVariables(fieldId, referenceNumber);

          cy.checkChangeLinkUrl(fieldVariables, referenceNumber);
        });
      });

      describe('form submission with a new answer', () => {
        beforeEach(() => {
          cy.navigateToUrl(url);

          summaryList.field(fieldId).changeLink().click();

          fieldVariables.newValueInput = WEBSITE_EXAMPLES.VALID_UKEF;
          cy.changeAnswerField(fieldVariables, fieldSelector(fieldId).input());
        });

        it(`should redirect to ${YOUR_BUYER}`, () => {
          cy.assertChangeAnswersPageUrl({ referenceNumber, route: YOUR_BUYER, fieldId });
        });

        it('should render the new answer and retain a `completed` status tag', () => {
          fieldVariables.newValue = fieldVariables.newValueInput;
          cy.checkChangeAnswerRendered({ fieldVariables });

          cy.checkTaskStatusCompleted(status);
        });
      });
    });
  },
);
