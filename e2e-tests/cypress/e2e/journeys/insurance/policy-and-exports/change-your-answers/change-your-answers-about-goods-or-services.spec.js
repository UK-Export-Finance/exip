import { submitButton } from '../../../../pages/shared';
import { aboutGoodsOrServicesPage, checkYourAnswersPage } from '../../../../pages/insurance/policy-and-export';
import partials from '../../../../partials';
import { FIELD_IDS, FIELD_VALUES, ROUTES } from '../../../../../../constants';
import { INSURANCE_ROOT } from '../../../../../../constants/routes/insurance';
import application from '../../../../../fixtures/application';
import countries from '../../../../../fixtures/countries';

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

const { summaryList } = checkYourAnswersPage;

context('Insurance - Policy and exports - Change your answers - About goods or services- As an exporter, I want to change my answers to the type of policy and exports section', () => {
  let referenceNumber;

  before(() => {
    cy.navigateToUrl(ROUTES.INSURANCE.START);

    cy.submitInsuranceEligibilityAndStartApplication();

    task.link().click();

    cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.SINGLE);
    cy.completeAndSubmitSingleContractPolicyForm();
    cy.completeAndSubmitAboutGoodsOrServicesForm();

    cy.getReferenceNumber().then((id) => {
      referenceNumber = id;

      const expected = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
      cy.url().should('eq', expected);
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  describe(DESCRIPTION, () => {
    const fieldId = DESCRIPTION;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${ABOUT_GOODS_OR_SERVICES_CHANGE}`, () => {
        summaryList[fieldId].changeLink().click();

        cy.assertChangeAnswersPageUrl(referenceNumber, ABOUT_GOODS_OR_SERVICES_CHANGE, fieldId);
      });
    });

    describe('form submission with a new answer', () => {
      const newAnswer = `${application.POLICY_AND_EXPORTS[fieldId]} additional text`;

      before(() => {
        aboutGoodsOrServicesPage[fieldId].input().clear().type(newAnswer);

        submitButton().click();
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.assertChangeAnswersPageUrl(referenceNumber, CHECK_YOUR_ANSWERS, fieldId);
      });

      it('should render the new answer', () => {
        const expected = newAnswer;

        cy.assertSummaryListRowValue(summaryList, fieldId, expected);
      });
    });
  });

  describe(FINAL_DESTINATION, () => {
    const fieldId = FINAL_DESTINATION;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${ABOUT_GOODS_OR_SERVICES_CHANGE}`, () => {
        summaryList[fieldId].changeLink().click();

        cy.assertChangeAnswersPageUrl(referenceNumber, ABOUT_GOODS_OR_SERVICES_CHANGE, fieldId);
      });
    });

    describe('form submission with a new answer', () => {
      const newAnswer = countries[0].isoCode;

      before(() => {
        aboutGoodsOrServicesPage[fieldId].input().select(newAnswer);

        submitButton().click();
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.assertChangeAnswersPageUrl(referenceNumber, CHECK_YOUR_ANSWERS, fieldId);
      });

      it('should render the new answer', () => {
        const expected = countries[0].name;

        cy.assertSummaryListRowValue(summaryList, fieldId, expected);
      });
    });
  });
});
