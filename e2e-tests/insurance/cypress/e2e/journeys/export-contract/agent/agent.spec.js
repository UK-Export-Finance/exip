import {
  field as fieldSelector,
  headingCaption,
  noRadio,
  noRadioInput,
  yesNoRadioHint,
  yesRadio,
} from '../../../../../../pages/shared';
import { FIELD_VALUES } from '../../../../../../constants';
import { ERROR_MESSAGES, PAGES } from '../../../../../../content-strings';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/export-contract';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const CONTENT_STRINGS = PAGES.INSURANCE.EXPORT_CONTRACT.AGENT;

const {
  ROOT,
  ALL_SECTIONS,
  EXPORT_CONTRACT: {
    HOW_WILL_YOU_GET_PAID, AGENT, AGENT_DETAILS, CHECK_YOUR_ANSWERS,
  },
} = INSURANCE_ROUTES;

const { USING_AGENT: FIELD_ID } = FIELD_IDS;

const ERROR_MESSAGE = ERROR_MESSAGES.INSURANCE.EXPORT_CONTRACT[FIELD_ID].IS_EMPTY;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Export contract - Agent page - As an Exporter, I want to state whether another party helped me win my export contract, So that I can provide underwriters with all required pre-requisite information as part of my application', () => {
  let referenceNumber;
  let url;
  let agentDetailsUrl;
  let checkYourAnswersUrl;
  let allSectionsUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      // go to the page we want to test.
      cy.startInsuranceExportContractSection({});
      cy.completeAndSubmitAboutGoodsOrServicesForm({});
      cy.completeAndSubmitHowYouWillGetPaidForm({});

      url = `${baseUrl}${ROOT}/${referenceNumber}${AGENT}`;
      agentDetailsUrl = `${baseUrl}${ROOT}/${referenceNumber}${AGENT_DETAILS}`;
      checkYourAnswersUrl = `${baseUrl}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
      allSectionsUrl = `${baseUrl}${ROOT}/${referenceNumber}${ALL_SECTIONS}`;

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
      currentHref: `${ROOT}/${referenceNumber}${AGENT}`,
      backLink: `${ROOT}/${referenceNumber}${HOW_WILL_YOU_GET_PAID}`,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('renders a heading caption', () => {
      cy.checkText(headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
    });

    describe(`renders ${FIELD_ID} label and inputs`, () => {
      it('renders a hint', () => {
        cy.checkText(yesNoRadioHint(), CONTENT_STRINGS.HINT);
      });

      it('renders `yes` and `no` radio buttons in the correct order', () => {
        cy.assertYesNoRadiosOrder({ noRadioFirst: true });
      });

      it('renders `no` radio button', () => {
        cy.checkText(noRadio().label(), FIELD_VALUES.NO);

        cy.checkRadioInputNoAriaLabel(CONTENT_STRINGS.PAGE_TITLE);
      });

      it('renders `yes` radio button', () => {
        yesRadio().input().should('exist');

        cy.checkText(yesRadio().label(), FIELD_VALUES.YES);

        cy.checkRadioInputYesAriaLabel(CONTENT_STRINGS.PAGE_TITLE);
      });
    });

    it('renders a `save and back` button', () => {
      cy.assertSaveAndBackButton();
    });
  });

  describe('form submission', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    describe('when submitting an empty form', () => {
      it(`should display validation errors if ${FIELD_ID} radio is not selected`, () => {
        const radioField = {
          ...fieldSelector(FIELD_ID),
          input: noRadioInput,
        };

        cy.submitAndAssertRadioErrors({
          field: radioField,
          expectedErrorMessage: ERROR_MESSAGE,
        });
      });
    });

    describe(`when selecting no for ${FIELD_ID}`, () => {
      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.completeAndSubmitAgentForm({ usingAgent: false });

        cy.assertUrl(checkYourAnswersUrl);
      });

      it('should update the `export contract` task status to `completed`', () => {
        cy.navigateToUrl(allSectionsUrl);

        cy.checkTaskExportContractStatusIsComplete();
      });

      describe('when going back to the page', () => {
        it('should have the submitted value', () => {
          cy.navigateToUrl(url);

          cy.assertNoRadioOptionIsChecked();
        });
      });
    });

    describe(`when selecting yes for ${FIELD_ID}`, () => {
      it(`should redirect to ${AGENT_DETAILS}`, () => {
        cy.completeAndSubmitAgentForm({ usingAgent: true });

        cy.assertUrl(agentDetailsUrl);
      });

      it('should retain the `export contract` task status as `in progress`', () => {
        cy.navigateToAllSectionsUrl(referenceNumber);

        cy.checkTaskExportContractStatusIsInProgress();
      });

      describe('when going back to the page', () => {
        it('should have the submitted value', () => {
          cy.navigateToUrl(url);

          cy.assertYesRadioOptionIsChecked();
        });
      });
    });
  });
});
