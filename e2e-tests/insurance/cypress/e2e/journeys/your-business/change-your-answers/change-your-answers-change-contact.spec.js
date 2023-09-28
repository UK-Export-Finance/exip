import partials from '../../../../../../partials';
import { yourContactPage } from '../../../../../../pages/your-business';
import { submitButton, summaryList } from '../../../../../../pages/shared';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const {
  ROOT,
  EXPORTER_BUSINESS: {
    CONTACT_CHANGE,
    CHECK_YOUR_ANSWERS,
  },
} = INSURANCE_ROUTES;

const {
  CONTACT: {
    NAME,
    POSITION,
  },
} = INSURANCE_FIELD_IDS.EXPORTER_BUSINESS;

const { EMAIL, FIRST_NAME, LAST_NAME } = INSURANCE_FIELD_IDS.ACCOUNT;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.business;

context('Insurance - Your business - Change your answers - Contact- As an exporter, I want to change my answers to the contact section', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      task.link().click();

      cy.completeAndSubmitCompaniesHouseSearchForm({ referenceNumber });
      cy.completeAndSubmitCompanyDetails();
      cy.completeAndSubmitYourContact({});
      cy.completeAndSubmitNatureOfYourBusiness();
      cy.completeAndSubmitTurnoverForm();
      cy.completeAndSubmitBrokerForm({});

      url = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe(NAME, () => {
    const fieldId = `contact-${NAME}`;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${CONTACT_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl(referenceNumber, CONTACT_CHANGE, FIRST_NAME);
      });
    });

    describe('form submission with a new answer', () => {
      const newAnswerFirstName = 'Tom';
      const newAnswerLastName = 'James';

      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.keyboardInput(yourContactPage.field(FIRST_NAME).input(), newAnswerFirstName);
        cy.keyboardInput(yourContactPage.field(LAST_NAME).input(), newAnswerLastName);

        submitButton().click();
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.assertChangeAnswersPageUrl(referenceNumber, CHECK_YOUR_ANSWERS, FIRST_NAME);
      });

      it('should render the new answer', () => {
        cy.assertSummaryListRowValue(summaryList, fieldId, `${newAnswerFirstName} ${newAnswerLastName}`);
      });
    });
  });

  describe(EMAIL, () => {
    const fieldId = `contact-${EMAIL}`;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${CONTACT_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl(referenceNumber, CONTACT_CHANGE, EMAIL);
      });
    });

    describe('form submission with a new answer', () => {
      const newAnswer = 'test@test.com';

      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.keyboardInput(yourContactPage.field(EMAIL).input(), newAnswer);

        submitButton().click();
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.assertChangeAnswersPageUrl(referenceNumber, CHECK_YOUR_ANSWERS, EMAIL);
      });

      it('should render the new answer', () => {
        cy.assertSummaryListRowValue(summaryList, fieldId, newAnswer);
      });
    });
  });

  describe(POSITION, () => {
    const fieldId = POSITION;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${CONTACT_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl(referenceNumber, CONTACT_CHANGE, fieldId);
      });
    });

    describe('form submission with a new answer', () => {
      const newAnswer = 'CEO';

      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.keyboardInput(yourContactPage.field(fieldId).input(), newAnswer);

        submitButton().click();
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.assertChangeAnswersPageUrl(referenceNumber, CHECK_YOUR_ANSWERS, fieldId);
      });

      it('should render the new answer', () => {
        cy.assertSummaryListRowValue(summaryList, fieldId, newAnswer);
      });
    });
  });
});
