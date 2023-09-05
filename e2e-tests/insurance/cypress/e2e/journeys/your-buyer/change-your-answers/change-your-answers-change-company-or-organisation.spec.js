import partials from '../../../../../../partials';
import {
  FIELD_IDS,
  FIELD_VALUES,
  ROUTES,
  WEBSITE_EXAMPLES,
} from '../../../../../../constants';
import { companyOrOrganisationPage } from '../../../../../../pages/insurance/your-buyer';
import { submitButton, summaryList } from '../../../../../../pages/shared';
import { YOUR_BUYER_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/your-buyer';
import application from '../../../../../../fixtures/application';

const {
  INSURANCE: {
    YOUR_BUYER: {
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
    },
  },
} = FIELD_IDS;

const {
  ROOT,
  YOUR_BUYER: {
    COMPANY_OR_ORGANISATION_CHANGE,
    CHECK_YOUR_ANSWERS,
  },
} = ROUTES.INSURANCE;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.buyer;

context('Insurance - Your buyer - Change your answers - Company or organisation - As an exporter, I want to change my answers to the company or organisation section', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication().then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      task.link().click();

      cy.completeAndSubmitCompanyOrOrganisationForm({});
      cy.completeAndSubmitWorkingWithBuyerForm({});

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
    const fieldId = NAME;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${COMPANY_OR_ORGANISATION_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl(referenceNumber, COMPANY_OR_ORGANISATION_CHANGE, NAME);
      });
    });

    describe('form submission with a new answer', () => {
      const newAnswer = 'Test name 2';

      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.keyboardInput(companyOrOrganisationPage[fieldId].input(), newAnswer);

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

  describe(ADDRESS, () => {
    const fieldId = ADDRESS;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${COMPANY_OR_ORGANISATION_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl(referenceNumber, COMPANY_OR_ORGANISATION_CHANGE, ADDRESS);
      });
    });

    describe('form submission with a new answer', () => {
      const newAnswer = 'Address test 2';

      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.keyboardInput(companyOrOrganisationPage[fieldId].input(), newAnswer);

        submitButton().click();
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.assertChangeAnswersPageUrl(referenceNumber, CHECK_YOUR_ANSWERS, fieldId);
      });

      it('should render the new answer', () => {
        const expectedKey = FIELDS.COMPANY_OR_ORGANISATION[fieldId].SUMMARY.TITLE;

        const row = summaryList.field(fieldId);

        cy.checkText(
          row.key(),
          expectedKey,
        );

        // as html, cannot use checkText so checking contains following fields
        row.value().contains(newAnswer);
      });
    });
  });

  describe(REGISTRATION_NUMBER, () => {
    const fieldId = REGISTRATION_NUMBER;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${COMPANY_OR_ORGANISATION_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl(referenceNumber, COMPANY_OR_ORGANISATION_CHANGE, REGISTRATION_NUMBER);
      });
    });

    describe('form submission with a new answer', () => {
      const newAnswer = '99999';

      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.keyboardInput(companyOrOrganisationPage[fieldId].input(), newAnswer);

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

  describe(WEBSITE, () => {
    const fieldId = WEBSITE;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${COMPANY_OR_ORGANISATION_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl(referenceNumber, COMPANY_OR_ORGANISATION_CHANGE, WEBSITE);
      });
    });

    describe('form submission with a new answer', () => {
      const newAnswer = WEBSITE_EXAMPLES.VALID_UKEF;

      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.keyboardInput(companyOrOrganisationPage[fieldId].input(), newAnswer);

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

  describe(FIRST_NAME, () => {
    const fieldId = FIRST_NAME;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${COMPANY_OR_ORGANISATION_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl(referenceNumber, COMPANY_OR_ORGANISATION_CHANGE, FIRST_NAME);
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

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.assertChangeAnswersPageUrl(referenceNumber, CHECK_YOUR_ANSWERS, fieldId);
      });

      it('should render the new answer', () => {
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
      });
    });
  });

  describe(CAN_CONTACT_BUYER, () => {
    const fieldId = CAN_CONTACT_BUYER;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${COMPANY_OR_ORGANISATION_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl(referenceNumber, COMPANY_OR_ORGANISATION_CHANGE, CAN_CONTACT_BUYER);
      });
    });

    describe('form submission with a new answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        companyOrOrganisationPage[fieldId].noRadioInput().click();

        submitButton().click();
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.assertChangeAnswersPageUrl(referenceNumber, CHECK_YOUR_ANSWERS, fieldId);
      });

      it('should render the new answer', () => {
        cy.assertSummaryListRowValue(summaryList, fieldId, FIELD_VALUES.NO);
      });
    });
  });
});
