import { field as fieldSelector, headingCaption } from '../../../../../../../pages/shared';
import { multipleContractPolicyExportValuePage } from '../../../../../../../pages/insurance/policy';
import { LINKS, PAGES } from '../../../../../../../content-strings';
import { POLICY_FIELDS as FIELDS } from '../../../../../../../content-strings/fields/insurance/policy';
import { FIELD_VALUES } from '../../../../../../../constants';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/policy';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import application from '../../../../../../../fixtures/application';
import { GBP, SYMBOLS } from '../../../../../../../fixtures/currencies';

const CONTENT_STRINGS = PAGES.INSURANCE.POLICY.MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE;

const {
  ROOT: INSURANCE_ROOT,
  ALL_SECTIONS,
  POLICY: { MULTIPLE_CONTRACT_POLICY, MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE, NAME_ON_POLICY },
} = INSURANCE_ROUTES;

const { EXPORT_VALUE } = FIELDS;

const {
  EXPORT_VALUE: {
    MULTIPLE: { TOTAL_SALES_TO_BUYER, MAXIMUM_BUYER_WILL_OWE },
  },
} = POLICY_FIELD_IDS;

const policyType = FIELD_VALUES.POLICY_TYPE.MULTIPLE;

const baseUrl = Cypress.config('baseUrl');

context(
  'Insurance - Policy - Multiple contract policy - Export value page - As an exporter, I want to provide the details of the multiple contract policy that I need a cover for',
  () => {
    let referenceNumber;
    let url;

    before(() => {
      cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
        referenceNumber = refNumber;

        cy.completeAndSubmitPolicyForms({ stopSubmittingAfter: 'multipleContractPolicy', policyType });

        url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE}`;

        cy.assertUrl(url);
      });
    });

    beforeEach(() => {
      cy.saveSession();
    });

    after(() => {
      cy.deleteApplication(referenceNumber);
    });

    it('should render core page elements', () => {
      cy.corePageChecks({
        pageTitle: `${CONTENT_STRINGS.PAGE_TITLE} ${GBP.name}`,
        currentHref: `${INSURANCE_ROOT}/${referenceNumber}${MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE}`,
        backLink: `${INSURANCE_ROOT}/${referenceNumber}${MULTIPLE_CONTRACT_POLICY}`,
      });
    });

    describe('page tests', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it('should render a heading caption', () => {
        cy.checkText(headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
      });

      it('should render `total sales to buyer` label, hint, prefix and input', () => {
        const fieldId = TOTAL_SALES_TO_BUYER;
        const field = fieldSelector(fieldId);

        cy.checkText(field.label(), EXPORT_VALUE.MULTIPLE[fieldId].LABEL);

        cy.checkText(field.hint(), EXPORT_VALUE.MULTIPLE[fieldId].HINT);

        cy.assertPrefix({ fieldId: TOTAL_SALES_TO_BUYER, value: SYMBOLS.GBP });

        field.input().should('exist');
      });

      describe('`maximum buyer will owe` field', () => {
        const fieldId = MAXIMUM_BUYER_WILL_OWE;
        const field = multipleContractPolicyExportValuePage[fieldId];
        const { HINT } = EXPORT_VALUE.MULTIPLE[fieldId];

        it('should render a label', () => {
          cy.checkText(field.label(), EXPORT_VALUE.MULTIPLE[fieldId].LABEL);

          cy.assertPrefix({ fieldId, value: SYMBOLS.GBP });
        });

        it('should render a prefix', () => {
          cy.assertPrefix({ fieldId, value: SYMBOLS.GBP });
        });

        it('should render a `for example` hint', () => {
          cy.checkText(field.hint.forExample(), HINT.FOR_EXAMPLE);
        });

        it('should render an `initial credit limit` hint intro', () => {
          cy.checkText(field.hint.initialCreditLimit.intro(), HINT.INITIAL_CREDIT_LIMIT.INTRO);
        });

        it('should render an `initial credit limit` hint link', () => {
          const expectedHref = LINKS.EXTERNAL.SMALL_EXPORT_BUILDER;
          const expectedText = HINT.INITIAL_CREDIT_LIMIT.LINK.TEXT;

          cy.checkLink(field.hint.initialCreditLimit.link(), expectedHref, expectedText);
        });

        it('should render a `no decimals` hint', () => {
          cy.checkText(field.hint.noDecimals(), HINT.NO_DECIMALS);
        });

        it('should render an input', () => {
          field.input().should('exist');
        });
      });
    });

    describe('form submission', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it(`should redirect to ${NAME_ON_POLICY}`, () => {
        cy.completeAndSubmitExportValueForm({});

        const expectedUrl = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${NAME_ON_POLICY}`;
        cy.assertUrl(expectedUrl);
      });

      it('should retain the `type of policy` task status as `in progress` after submitting the form', () => {
        cy.navigateToUrl(`${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`);

        cy.checkTaskPolicyStatusIsInProgress();
      });

      describe('when going back to the page', () => {
        it('should have the submitted values', () => {
          cy.navigateToUrl(url);

          cy.checkValue(fieldSelector(TOTAL_SALES_TO_BUYER), application.POLICY[TOTAL_SALES_TO_BUYER]);
          cy.checkValue(fieldSelector(MAXIMUM_BUYER_WILL_OWE), application.POLICY[MAXIMUM_BUYER_WILL_OWE]);
        });
      });
    });
  },
);
