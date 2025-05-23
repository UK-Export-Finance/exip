import { summaryList } from '../../../../../../pages/shared';
import { FIELD_VALUES } from '../../../../../../constants';
import { EXPORTER_BUSINESS as FIELD_IDS } from '../../../../../../constants/field-ids/insurance/business';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const { HAS_CREDIT_CONTROL } = FIELD_IDS;

const {
  ROOT,
  EXPORTER_BUSINESS: { CREDIT_CONTROL_CHANGE, CHECK_YOUR_ANSWERS },
} = INSURANCE_ROUTES;

const fieldId = HAS_CREDIT_CONTROL;

const baseUrl = Cypress.config('baseUrl');

context(
  'Insurance - Your business - Change your answers - Credit control - Yes to no - As an exporter, I want to change my answers to the credit control section',
  () => {
    let referenceNumber;
    let url;

    before(() => {
      cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
        referenceNumber = refNumber;

        cy.completeAndSubmitYourBusinessForms({ stopSubmittingAfter: 'creditControl', hasCreditControlProcess: true });

        url = `${baseUrl}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
      });
    });

    beforeEach(() => {
      cy.saveSession();
    });

    after(() => {
      cy.deleteApplication(referenceNumber);
    });

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${CREDIT_CONTROL_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: CREDIT_CONTROL_CHANGE, fieldId });
      });
    });

    describe('form submission with a new answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.completeAndSubmitCreditControlForm({ hasCreditControlProcess: false });
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId });
      });

      it('should render the new answer', () => {
        cy.assertSummaryListRowValue(summaryList, fieldId, FIELD_VALUES.NO);
      });
    });
  },
);
