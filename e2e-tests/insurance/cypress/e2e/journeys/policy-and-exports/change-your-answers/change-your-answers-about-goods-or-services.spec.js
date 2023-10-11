import { submitButton, summaryList, countryInput } from '../../../../../../pages/shared';
import { aboutGoodsOrServicesPage } from '../../../../../../pages/insurance/policy-and-export';
import partials from '../../../../../../partials';
import { FIELD_IDS, ROUTES } from '../../../../../../constants';
import { INSURANCE_ROOT } from '../../../../../../constants/routes/insurance';
import application from '../../../../../../fixtures/application';
import countries from '../../../../../../fixtures/countries';

const {
  POLICY_AND_EXPORTS: {
    CHECK_YOUR_ANSWERS,
    ABOUT_GOODS_OR_SERVICES_CHANGE,
  },
} = ROUTES.INSURANCE;

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      ABOUT_GOODS_OR_SERVICES: { DESCRIPTION, FINAL_DESTINATION },
    },
  },
} = FIELD_IDS;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.policyTypeAndExports;

context('Insurance - Policy and exports - Change your answers - About goods or services- As an exporter, I want to change my answers to the type of policy and exports section', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      task.link().click();

      cy.completePolicyAndExportSection({});

      url = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe(DESCRIPTION, () => {
    const fieldId = DESCRIPTION;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${ABOUT_GOODS_OR_SERVICES_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl(referenceNumber, ABOUT_GOODS_OR_SERVICES_CHANGE, fieldId);
      });
    });

    describe('form submission with a new answer', () => {
      const newAnswer = `${application.POLICY_AND_EXPORTS[fieldId]} additional text`;

      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.keyboardInput(aboutGoodsOrServicesPage[fieldId].textarea(), newAnswer);

        submitButton().click();
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.assertChangeAnswersPageUrl(referenceNumber, CHECK_YOUR_ANSWERS, fieldId);
      });

      it('should render the new answer', () => {
        const expected = newAnswer;

        cy.assertSummaryListRowValueNew(summaryList, fieldId, expected);
      });
    });
  });

  describe(FINAL_DESTINATION, () => {
    const fieldId = FINAL_DESTINATION;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${ABOUT_GOODS_OR_SERVICES_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl(referenceNumber, ABOUT_GOODS_OR_SERVICES_CHANGE, fieldId);
      });
    });

    describe('form submission with a new answer', () => {
      const newAnswer = countries[0].name;

      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.keyboardInput(countryInput.field(fieldId).input(), newAnswer);

        submitButton().click();
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.assertChangeAnswersPageUrl(referenceNumber, CHECK_YOUR_ANSWERS, fieldId);
      });

      it('should render the new answer', () => {
        const expected = countries[0].name;

        cy.assertSummaryListRowValueNew(summaryList, fieldId, expected);
      });
    });
  });
});
