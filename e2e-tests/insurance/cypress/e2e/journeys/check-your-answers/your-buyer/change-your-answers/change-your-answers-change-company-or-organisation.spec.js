import { submitButton, status, summaryList } from '../../../../../../../pages/shared';
import partials from '../../../../../../../partials';
import { WEBSITE_EXAMPLES, FIELD_VALUES } from '../../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { companyOrOrganisationPage } from '../../../../../../../pages/insurance/your-buyer';
import { YOUR_BUYER_FIELDS as FIELDS } from '../../../../../../../content-strings/fields/insurance/your-buyer';
import application from '../../../../../../../fixtures/application';

const {
  ROOT,
  CHECK_YOUR_ANSWERS: {
    YOUR_BUYER,
  },
  YOUR_BUYER: {
    COMPANY_OR_ORGANISATION_CHECK_AND_CHANGE,
  },
} = INSURANCE_ROUTES;

const {
  COMPANY_OR_ORGANISATION: {
    NAME,
    ADDRESS,
    REGISTRATION_NUMBER,
    WEBSITE,
    FIRST_NAME,
    LAST_NAME,
    POSITION,
    EMAIL,
    CAN_CONTACT_BUYER,
  },
} = INSURANCE_FIELD_IDS.YOUR_BUYER;

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswers;

const getFieldVariables = (fieldId, referenceNumber) => ({
  route: COMPANY_OR_ORGANISATION_CHECK_AND_CHANGE,
  checkYourAnswersRoute: YOUR_BUYER,
  newValueInput: '',
  fieldId,
  referenceNumber,
  summaryList,
  changeLink: summaryList.field(fieldId).changeLink,
});

context('Insurance - Check your answers - Company or organisation - Your buyer page - Summary list', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType({ referenceNumber });

      task.link().click();

      // To get past "Eligibility" check your answers page
      cy.submitCheckYourAnswersForm();

      // To get past "Policy and exports" check your answers page
      cy.submitCheckYourAnswersForm();

      // To get past "Your business" check your answers page
      cy.submitCheckYourAnswersForm();

      url = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${YOUR_BUYER}`;

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
        cy.changeAnswerField(fieldVariables, companyOrOrganisationPage[fieldId].input());
      });

      it(`should redirect to ${YOUR_BUYER}`, () => {
        cy.assertChangeAnswersPageUrl(referenceNumber, YOUR_BUYER, fieldId);
      });

      it('should render the new answer and retain a `completed` status tag', () => {
        fieldVariables.newValue = fieldVariables.newValueInput;
        cy.checkChangeAnswerRendered(fieldVariables);

        cy.checkTaskStatusCompleted(status());
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

        fieldVariables.newValueInput = 'Address test 2';
        cy.changeAnswerField(fieldVariables, companyOrOrganisationPage[fieldId].input());
      });

      it(`should redirect to ${YOUR_BUYER}`, () => {
        cy.assertChangeAnswersPageUrl(referenceNumber, YOUR_BUYER, fieldId);
      });

      it('should render the new answer and retain a `completed` status tag', () => {
        const expectedKey = FIELDS.COMPANY_OR_ORGANISATION[fieldId].SUMMARY.TITLE;

        const row = summaryList.field(fieldId);

        cy.checkText(
          row.key(),
          expectedKey,
        );

        // as html, cannot use checkText so checking contains following fields
        row.value().contains(fieldVariables.newValueInput);

        cy.checkTaskStatusCompleted(status());
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
        cy.changeAnswerField(fieldVariables, companyOrOrganisationPage[fieldId].input());
      });

      it(`should redirect to ${YOUR_BUYER}`, () => {
        cy.assertChangeAnswersPageUrl(referenceNumber, YOUR_BUYER, fieldId);
      });

      it('should render the new answer and retain a `completed` status tag', () => {
        fieldVariables.newValue = fieldVariables.newValueInput;
        cy.checkChangeAnswerRendered(fieldVariables);

        cy.checkTaskStatusCompleted(status());
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
        cy.changeAnswerField(fieldVariables, companyOrOrganisationPage[fieldId].input());
      });

      it(`should redirect to ${YOUR_BUYER}`, () => {
        cy.assertChangeAnswersPageUrl(referenceNumber, YOUR_BUYER, fieldId);
      });

      it('should render the new answer and retain a `completed` status tag', () => {
        fieldVariables.newValue = fieldVariables.newValueInput;
        cy.checkChangeAnswerRendered(fieldVariables);

        cy.checkTaskStatusCompleted(status());
      });
    });
  });

  describe(FIRST_NAME, () => {
    const fieldId = FIRST_NAME;
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
      const newAnswerFirstName = 'Jim';
      const newAnswerLastName = 'Jim';
      const newAnswerPosition = 'Worker';

      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.keyboardInput(companyOrOrganisationPage[fieldId].input(), newAnswerFirstName);
        cy.keyboardInput(companyOrOrganisationPage[LAST_NAME].input(), newAnswerLastName);
        cy.keyboardInput(companyOrOrganisationPage[POSITION].input(), newAnswerPosition);

        submitButton().click();
      });

      it(`should redirect to ${YOUR_BUYER}`, () => {
        cy.assertChangeAnswersPageUrl(referenceNumber, YOUR_BUYER, fieldId);
      });

      it('should render the new answer and retain a `completed` status tag', () => {
        const expectedKey = FIELDS.COMPANY_OR_ORGANISATION[fieldId].SUMMARY.TITLE;

        const row = summaryList.field(fieldId);

        cy.checkText(
          row.key(),
          expectedKey,
        );

        // as html, cannot use checkText so checking contains following fields
        row.value().contains(newAnswerFirstName);
        row.value().contains(newAnswerLastName);
        row.value().contains(newAnswerPosition);
        row.value().contains(application.BUYER[EMAIL]);

        cy.checkTaskStatusCompleted(status());
      });
    });
  });

  describe(CAN_CONTACT_BUYER, () => {
    const fieldId = CAN_CONTACT_BUYER;
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

        companyOrOrganisationPage[fieldId].noRadioInput().click();

        submitButton().click();
      });

      it(`should redirect to ${YOUR_BUYER}`, () => {
        cy.assertChangeAnswersPageUrl(referenceNumber, YOUR_BUYER, fieldId);
      });

      it('should render the new answer and retain a `completed` status tag', () => {
        fieldVariables.newValue = FIELD_VALUES.NO;
        cy.checkChangeAnswerRendered(fieldVariables);

        cy.checkTaskStatusCompleted(status());
      });
    });
  });
});
