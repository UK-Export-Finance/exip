import {
  field as fieldSelector,
  headingCaption,
  yesNoRadioHint,
  noRadio,
  noRadioInput,
  yesRadio,
} from '../../../../../../pages/shared';
import partials from '../../../../../../partials';
import { FIELD_VALUES } from '../../../../../../constants';
import { ERROR_MESSAGES, PAGES, PRIVATE_MARKET_WHY_DESCRIPTION } from '../../../../../../content-strings';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/export-contract';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const { privateMarketWhyDescription } = partials;

const CONTENT_STRINGS = PAGES.INSURANCE.EXPORT_CONTRACT.PRIVATE_MARKET;

const {
  ROOT,
  ALL_SECTIONS,
  EXPORT_CONTRACT: {
    PRIVATE_MARKET, HOW_WILL_YOU_GET_PAID, DECLINED_BY_PRIVATE_MARKET, AGENT,
  },
} = INSURANCE_ROUTES;

const {
  PRIVATE_MARKET: { ATTEMPTED: FIELD_ID },
} = FIELD_IDS;

const ERROR_MESSAGE = ERROR_MESSAGES.INSURANCE.EXPORT_CONTRACT.PRIVATE_MARKET[FIELD_ID].IS_EMPTY;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Export contract - Private market page - As an exporter, I want to state whether I tried to get insurance through the private market previously, So that UKEF can ensure it is complementing rather than competing with the private market', () => {
  let referenceNumber;
  let url;
  let declinedByPrivateMarketUrl;
  let agentUrl;
  let allSectionsUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({ totalContractValueOverThreshold: true }).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      url = `${baseUrl}${ROOT}/${referenceNumber}${PRIVATE_MARKET}`;
      agentUrl = `${baseUrl}${ROOT}/${referenceNumber}${AGENT}`;
      declinedByPrivateMarketUrl = `${baseUrl}${ROOT}/${referenceNumber}${DECLINED_BY_PRIVATE_MARKET}`;
      allSectionsUrl = `${baseUrl}${ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      // go to the page we want to test.
      cy.startInsuranceExportContractSection({});
      cy.completeAndSubmitAboutGoodsOrServicesForm({});
      cy.completeAndSubmitHowYouWillGetPaidForm({});
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
      currentHref: `${ROOT}/${referenceNumber}${PRIVATE_MARKET}`,
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

    describe('expandable details - private market - why description', () => {
      const {
        INTRO,
        WE_OFFER,
        HERE_TO_HELP,
        SHARING_INFORMATION,
      } = PRIVATE_MARKET_WHY_DESCRIPTION;

      it('renders summary text', () => {
        cy.checkText(privateMarketWhyDescription.summary(), INTRO);

        privateMarketWhyDescription.details().should('not.have.attr', 'open');
      });

      describe('when clicking the summary text', () => {
        it('should expand the collapsed `description` content', () => {
          cy.checkText(privateMarketWhyDescription.weOffer(), WE_OFFER);
          cy.checkText(privateMarketWhyDescription.hereToHelp(), HERE_TO_HELP);
          cy.checkText(privateMarketWhyDescription.sharingInformation(), SHARING_INFORMATION);
        });
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
      it(`should redirect to ${AGENT} page`, () => {
        cy.completeAndSubmitPrivateMarketForm({ attempted: false });

        cy.assertUrl(agentUrl);
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
      it(`should redirect to ${DECLINED_BY_PRIVATE_MARKET} page`, () => {
        cy.completeAndSubmitPrivateMarketForm({ attemptedPrivateMarketCover: true });

        cy.assertUrl(declinedByPrivateMarketUrl);
      });

      it('should update the `export contract` task status to `completed`', () => {
        cy.navigateToUrl(allSectionsUrl);

        cy.checkTaskExportContractStatusIsComplete();
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
