import { field as fieldSelector, headingCaption } from '../../../../../../../pages/shared';
import { PAGES } from '../../../../../../../content-strings';
import { POLICY_FIELDS as FIELDS } from '../../../../../../../content-strings/fields/insurance/policy';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/policy';
import application from '../../../../../../../fixtures/application';
import { GBP, SYMBOLS } from '../../../../../../../fixtures/currencies';

const CONTENT_STRINGS = PAGES.INSURANCE.POLICY.SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE;

const {
  ROOT,
  ALL_SECTIONS,
  POLICY: { SINGLE_CONTRACT_POLICY, SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE, NAME_ON_POLICY },
} = INSURANCE_ROUTES;

const {
  CONTRACT_POLICY: {
    SINGLE: { TOTAL_CONTRACT_VALUE, REQUESTED_CREDIT_LIMIT },
  },
} = POLICY_FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context(
  'Insurance - Policy - Single contract policy - Total contract value page - As an exporter, I want to provide the details of the single contract policy that I need cover for',
  () => {
    let referenceNumber;
    let url;

    before(() => {
      cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
        referenceNumber = refNumber;

        cy.completeAndSubmitPolicyForms({ formToStopAt: 'singleContractPolicy' });

        url = `${baseUrl}${ROOT}/${referenceNumber}${SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE}`;

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
        pageTitle: `${CONTENT_STRINGS.PAGE_TITLE} ${GBP.name}?`,
        currentHref: `${ROOT}/${referenceNumber}${SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE}`,
        backLink: `${ROOT}/${referenceNumber}${SINGLE_CONTRACT_POLICY}`,
      });
    });

    describe('page tests', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it('renders a heading caption', () => {
        cy.checkText(headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
      });

      it(`renders ${TOTAL_CONTRACT_VALUE} hint, prefix and input`, () => {
        const fieldId = TOTAL_CONTRACT_VALUE;
        const field = fieldSelector(fieldId);

        cy.checkText(field.hint(), FIELDS.CONTRACT_POLICY.SINGLE[fieldId].HINT);

        cy.assertPrefix({ fieldId, value: SYMBOLS.GBP });

        field.input().should('exist');
      });

      it(`renders ${REQUESTED_CREDIT_LIMIT} hint, prefix and input`, () => {
        const fieldId = REQUESTED_CREDIT_LIMIT;
        const field = fieldSelector(fieldId);

        cy.checkText(field.hintIntro(), FIELDS.CONTRACT_POLICY.SINGLE[fieldId].HINT.INTRO);
        cy.checkText(field.hintOutro(), FIELDS.CONTRACT_POLICY.SINGLE[fieldId].HINT.OUTRO);

        cy.assertPrefix({ fieldId, value: SYMBOLS.GBP });

        field.input().should('exist');
      });
    });

    describe('form submission', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        cy.completeAndSubmitTotalContractValueForm({});
      });

      it(`should redirect to ${NAME_ON_POLICY}`, () => {
        const expectedUrl = `${baseUrl}${ROOT}/${referenceNumber}${NAME_ON_POLICY}`;
        cy.assertUrl(expectedUrl);
      });

      it('should retain the `type of policy` task status as `in progress` after submitting the form', () => {
        cy.navigateToUrl(`${ROOT}/${referenceNumber}${ALL_SECTIONS}`);

        cy.checkTaskPolicyStatusIsInProgress();
      });

      describe('when going back to the page', () => {
        it('should have the submitted values', () => {
          cy.navigateToUrl(url);

          cy.checkValue(fieldSelector(TOTAL_CONTRACT_VALUE), application.POLICY[TOTAL_CONTRACT_VALUE]);

          cy.checkValue(fieldSelector(REQUESTED_CREDIT_LIMIT), application.POLICY[REQUESTED_CREDIT_LIMIT]);
        });
      });
    });
  },
);
