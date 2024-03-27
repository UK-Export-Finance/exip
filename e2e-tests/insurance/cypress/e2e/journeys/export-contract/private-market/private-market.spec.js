import {
  headingCaption,
  yesNoRadioHint,
  noRadio,
  yesRadio,
} from '../../../../../../pages/shared';
import partials from '../../../../../../partials';
import { FIELD_VALUES } from '../../../../../../constants';
import { PAGES, PRIVATE_MARKET_WHY_DESCRIPTION } from '../../../../../../content-strings';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const { privateMarketWhyDescription } = partials;

const CONTENT_STRINGS = PAGES.INSURANCE.EXPORT_CONTRACT.PRIVATE_MARKET;

const {
  ROOT: INSURANCE_ROOT,
  EXPORT_CONTRACT: { PRIVATE_MARKET },
} = INSURANCE_ROUTES;

const {
  EXPORT_CONTRACT: {
    PRIVATE_MARKET: { ATTEMPTED },
  },
} = INSURANCE_FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Export contract - Private market page - As an exporter, I want to state whether I tried to get insurance through the private market previously, So that UKEF can ensure it is complementing rather than competing with the private market', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${PRIVATE_MARKET}`;

      // go to the page we want to test.
      cy.navigateToUrl(url);
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
      currentHref: `${INSURANCE_ROOT}/${referenceNumber}${PRIVATE_MARKET}`,
      backLink: `${INSURANCE_ROOT}/${referenceNumber}${PRIVATE_MARKET}#`,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('renders a heading caption', () => {
      cy.checkText(headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
    });

    describe(`renders ${ATTEMPTED} label and inputs`, () => {
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
});
