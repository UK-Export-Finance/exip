import { field as fieldSelector, headingCaption } from '../../../../../../pages/shared';
import { PAGES } from '../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../constants/field-ids/insurance/policy';
import { POLICY_FIELDS as FIELD_STRINGS } from '../../../../../../content-strings/fields/insurance/policy';

const CONTENT_STRINGS = PAGES.INSURANCE.POLICY.LOSS_PAYEE_FINANCIAL_DETAILS;

const {
  LOSS_PAYEE_FINANCIAL_INTERNATIONAL: { BIC_SWIFT_CODE, IBAN },
  FINANCIAL_ADDRESS,
} = POLICY_FIELD_IDS;

const {
  ROOT,
  POLICY: { LOSS_PAYEE_DETAILS_ROOT, LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_ROOT, CHECK_YOUR_ANSWERS },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context(
  "Insurance - Policy - Loss Payee Financial Details - International page - As an exporter, I want to provide UKEF with my loss payee's financial International details So that they can be paid in the event of a claim on the policy",
  () => {
    let referenceNumber;
    let url;
    let checkYourAnswersUrl;

    before(() => {
      cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
        referenceNumber = refNumber;

        // go to the page we want to test.
        cy.completeAndSubmitPolicyForms({ stopSubmittingAfter: 'lossPayeeDetails', isAppointingLossPayee: true, locatedInUK: false });

        url = `${baseUrl}${ROOT}/${referenceNumber}${LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_ROOT}`;
        checkYourAnswersUrl = `${baseUrl}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;

        cy.assertUrl(url);
      });
    });

    beforeEach(() => {
      cy.saveSession();
    });

    after(() => {
      cy.deleteApplication(referenceNumber);
    });

    it('renders core page elements', () => {
      cy.corePageChecks({
        pageTitle: CONTENT_STRINGS.PAGE_TITLE,
        currentHref: `${ROOT}/${referenceNumber}${LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_ROOT}`,
        backLink: `${ROOT}/${referenceNumber}${LOSS_PAYEE_DETAILS_ROOT}`,
      });
    });

    describe('page tests', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it('renders a heading caption', () => {
        cy.checkText(headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
      });

      it('renders a hint', () => {
        const hintFieldId = 'loss-payee-financial-details-international';
        cy.checkText(fieldSelector(hintFieldId).hint(), CONTENT_STRINGS.HINT);
      });

      it(`renders ${BIC_SWIFT_CODE} label and input and hint`, () => {
        const fieldId = BIC_SWIFT_CODE;
        const field = fieldSelector(fieldId);

        cy.checkText(field.label(), FIELD_STRINGS.LOSS_PAYEE_FINANCIAL_INTERNATIONAL[fieldId].LABEL);
        cy.checkText(field.hint(), FIELD_STRINGS.LOSS_PAYEE_FINANCIAL_INTERNATIONAL[fieldId].HINT);
        field.input().should('exist');
      });

      it(`renders ${IBAN} label and input and hint`, () => {
        const fieldId = IBAN;
        const field = fieldSelector(fieldId);

        cy.checkText(field.label(), FIELD_STRINGS.LOSS_PAYEE_FINANCIAL_INTERNATIONAL[fieldId].LABEL);
        cy.checkText(field.hint(), FIELD_STRINGS.LOSS_PAYEE_FINANCIAL_INTERNATIONAL[fieldId].HINT);
        field.input().should('exist');
      });

      it(`renders ${FINANCIAL_ADDRESS} textarea`, () => {
        const fieldId = FINANCIAL_ADDRESS;
        const fieldStrings = FIELD_STRINGS.FINANCIAL_ADDRESS;

        cy.assertTextareaRendering({
          fieldId,
          expectedLabel: fieldStrings.LABEL,
          maximumCharacters: fieldStrings.MAXIMUM,
        });
      });
    });

    describe('form submission', () => {
      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.navigateToUrl(url);

        cy.completeAndSubmitLossPayeeFinancialDetailsInternationalForm({});

        cy.assertUrl(checkYourAnswersUrl);
      });
    });

    describe('when going back to the page', () => {
      it('should have the submitted values', () => {
        cy.navigateToUrl(url);

        cy.assertLossPayeeFinancialInternationalFieldValues({});
      });
    });
  },
);
