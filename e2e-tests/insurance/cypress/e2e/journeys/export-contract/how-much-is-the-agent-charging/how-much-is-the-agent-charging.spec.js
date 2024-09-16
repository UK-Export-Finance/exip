import { field as fieldSelector, headingCaption } from '../../../../../../pages/shared';
import { PAGES } from '../../../../../../content-strings';
import { EXPORT_CONTRACT_FIELDS as FIELD_STRINGS } from '../../../../../../content-strings/fields/insurance/export-contract';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/export-contract';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const CONTENT_STRINGS = PAGES.INSURANCE.EXPORT_CONTRACT.HOW_MUCH_IS_THE_AGENT_CHARGING;

const {
  ROOT,
  EXPORT_CONTRACT: { HOW_MUCH_IS_THE_AGENT_CHARGING, CHECK_YOUR_ANSWERS },
} = INSURANCE_ROUTES;

const {
  AGENT_CHARGES: { FIXED_SUM_AMOUNT: FIELD_ID },
} = FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context(
  "Insurance - Export contract - How much is the agent charging page - As an exporter, I want to state what my agent's charges are, So that UKEF, the legal team and the British Embassy are aware of expenses incurred in my export contract bid",
  () => {
    let referenceNumber;
    let url;
    let checkYourAnswersUrl;

    before(() => {
      cy.completeSignInAndGoToApplication({ totalContractValueOverThreshold: true }).then(({ referenceNumber: refNumber }) => {
        referenceNumber = refNumber;

        url = `${baseUrl}${ROOT}/${referenceNumber}${HOW_MUCH_IS_THE_AGENT_CHARGING}`;
        checkYourAnswersUrl = `${baseUrl}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;

        cy.navigateToUrl();
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
        currentHref: `${ROOT}/${referenceNumber}${HOW_MUCH_IS_THE_AGENT_CHARGING}`,
        backLink: '#',
      });
    });

    describe('page tests', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it('renders a heading caption', () => {
        cy.checkText(headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
      });

      it(`renders ${FIELD_ID} hint and input`, () => {
        const field = fieldSelector(FIELD_ID);

        cy.checkText(field.hint(), FIELD_STRINGS.AGENT_CHARGES[FIELD_ID]);

        field.input().should('exist');
      });

      it('renders a `save and back` button', () => {
        cy.assertSaveAndBackButton();
      });
    });

    describe('form submission', () => {
      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.navigateToUrl(url);

        cy.completeAndSubmitHowMuchIsTheAgentChargingForm({});

        cy.assertUrl(checkYourAnswersUrl);
      });
    });
  },
);
