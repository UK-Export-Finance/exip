import partials from '../../../../partials';
import { FIELD_IDS, ROUTES } from '../../../../../../constants';
import { broker, checkYourAnswers } from '../../../../pages/your-business';
import { submitButton } from '../../../../pages/shared';
import { EXPORTER_BUSINESS_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/exporter-business';

const {
  INSURANCE: {
    EXPORTER_BUSINESS: {
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
    },
  },
} = FIELD_IDS;

const {
  ROOT,
  EXPORTER_BUSINESS: {
    BROKER_CHANGE,
    CHECK_YOUR_ANSWERS,
  },
} = ROUTES.INSURANCE;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.exporterBusiness;

const { summaryList } = checkYourAnswers;

context('Insurance - Your business - Change your answers - Broker - As an exporter, I want to change my answers to the broker section', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication().then((refNumber) => {
      referenceNumber = refNumber;

      task.link().click();

      cy.completeAndSubmitCompanyDetails();
      cy.completeAndSubmitNatureOfYourBusiness();
      cy.completeAndSubmitTurnoverForm();
      cy.completeAndSubmitBrokerForm();

      url = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteAccountAndApplication(referenceNumber);
  });

  describe(NAME, () => {
    const fieldId = NAME;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${BROKER_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList[fieldId].changeLink().click();

        cy.assertChangeAnswersPageUrl(referenceNumber, BROKER_CHANGE, NAME);
      });
    });

    describe('form submission with a new answer', () => {
      const newAnswer = 'Test name 2';

      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList[fieldId].changeLink().click();

        cy.keyboardInput(broker[fieldId].input(), newAnswer);

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

  describe('Address', () => {
    const fieldId = ADDRESS_LINE_1;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${BROKER_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList[fieldId].changeLink().click();

        cy.assertChangeAnswersPageUrl(referenceNumber, BROKER_CHANGE, fieldId);
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

        summaryList[fieldId].changeLink().click();

        cy.keyboardInput(broker[fieldId].input(), addressLine1);
        cy.keyboardInput(broker[ADDRESS_LINE_2].input(), addressLine2);
        cy.keyboardInput(broker[TOWN].input(), town);
        cy.keyboardInput(broker[COUNTY].input(), country);
        cy.keyboardInput(broker[POSTCODE].input(), postcode);

        submitButton().click();
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.assertChangeAnswersPageUrl(referenceNumber, CHECK_YOUR_ANSWERS, fieldId);
      });

      it('should render the new answer', () => {
        const expectedKey = FIELDS.BROKER[fieldId].SUMMARY.TITLE;

        const row = summaryList[fieldId];

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
      });
    });
  });

  describe(EMAIL, () => {
    const fieldId = NAME;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${BROKER_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList[fieldId].changeLink().click();

        cy.assertChangeAnswersPageUrl(referenceNumber, BROKER_CHANGE, NAME);
      });
    });

    describe('form submission with a new answer', () => {
      const newAnswer = 'testing321@test.com';

      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList[fieldId].changeLink().click();

        cy.keyboardInput(broker[fieldId].input(), newAnswer);

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

  describe(USING_BROKER, () => {
    const fieldId = USING_BROKER;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${BROKER_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList[fieldId].changeLink().click();

        cy.assertChangeAnswersPageUrl(referenceNumber, BROKER_CHANGE, USING_BROKER);
      });
    });

    describe('form submission with a new answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList[fieldId].changeLink().click();

        broker[fieldId].noRadioInput().click();

        submitButton().click();
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.assertChangeAnswersPageUrl(referenceNumber, CHECK_YOUR_ANSWERS, fieldId);
      });

      it('should render the new answer and not render the optional broker sections', () => {
        cy.assertSummaryListRowValue(summaryList, fieldId, 'No');

        summaryList[NAME].key().should('not.exist');
        summaryList[NAME].value().should('not.exist');
        summaryList[NAME].changeLink().should('not.exist');

        summaryList[ADDRESS_LINE_1].key().should('not.exist');
        summaryList[ADDRESS_LINE_1].value().should('not.exist');
        summaryList[ADDRESS_LINE_1].changeLink().should('not.exist');

        summaryList[EMAIL].key().should('not.exist');
        summaryList[EMAIL].value().should('not.exist');
        summaryList[EMAIL].changeLink().should('not.exist');
      });
    });
  });
});
