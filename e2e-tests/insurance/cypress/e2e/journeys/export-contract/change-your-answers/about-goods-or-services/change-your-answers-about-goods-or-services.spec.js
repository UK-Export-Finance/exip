import { summaryList, autoCompleteField } from '../../../../../../../pages/shared';
import { aboutGoodsOrServicesPage } from '../../../../../../../pages/insurance/export-contract';
import { FIELD_IDS, ROUTES } from '../../../../../../../constants';
import { INSURANCE_ROOT } from '../../../../../../../constants/routes/insurance';
import application from '../../../../../../../fixtures/application';
import { XAD } from '../../../../../../../fixtures/countries';

const {
  EXPORT_CONTRACT: {
    CHECK_YOUR_ANSWERS,
    ABOUT_GOODS_OR_SERVICES_CHANGE,
  },
} = ROUTES.INSURANCE;

const {
  INSURANCE: {
    EXPORT_CONTRACT: {
      ABOUT_GOODS_OR_SERVICES: { DESCRIPTION, FINAL_DESTINATION },
    },
  },
} = FIELD_IDS;

const NEW_COUNTRY_INPUT = XAD.NAME;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Export contract - Change your answers - About goods or services - As an exporter, I want to change my answers to the type of policy section', () => {
  let referenceNumber;
  let checkYourAnswersUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completeExportContractSection({});

      checkYourAnswersUrl = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
      cy.assertUrl(checkYourAnswersUrl);
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
        cy.navigateToUrl(checkYourAnswersUrl);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: ABOUT_GOODS_OR_SERVICES_CHANGE, fieldId });
      });
    });

    describe('form submission with a new answer', () => {
      const newAnswer = `${application.EXPORT_CONTRACT[fieldId]} additional text`;

      beforeEach(() => {
        cy.navigateToUrl(checkYourAnswersUrl);

        summaryList.field(fieldId).changeLink().click();

        cy.keyboardInput(aboutGoodsOrServicesPage[fieldId].textarea(), newAnswer);

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

  describe(FINAL_DESTINATION, () => {
    const fieldId = FINAL_DESTINATION;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${ABOUT_GOODS_OR_SERVICES_CHANGE}`, () => {
        cy.navigateToUrl(checkYourAnswersUrl);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: ABOUT_GOODS_OR_SERVICES_CHANGE, fieldId });
      });
    });

    describe('form submission with a new destination/country answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(checkYourAnswersUrl);

        summaryList.field(fieldId).changeLink().click();

        cy.keyboardInput(autoCompleteField(fieldId).input(), NEW_COUNTRY_INPUT);

        cy.clickSubmitButton();
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId });
      });

      it('should render the new destination/country', () => {
        cy.assertSummaryListRowValue(summaryList, fieldId, NEW_COUNTRY_INPUT);
      });
    });
  });
});
