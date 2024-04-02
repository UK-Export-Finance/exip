import {
  headingCaption,
  noRadio,
  yesNoRadioHint,
  yesRadio,
} from '../../../../../../pages/shared';
import { FIELD_VALUES } from '../../../../../../constants';
import { PAGES } from '../../../../../../content-strings';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/export-contract';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const CONTENT_STRINGS = PAGES.INSURANCE.EXPORT_CONTRACT.AGENT;

const {
  ROOT: INSURANCE_ROOT,
  EXPORT_CONTRACT: { HOW_WILL_YOU_GET_PAID, AGENT },
} = INSURANCE_ROUTES;

const { USING_AGENT: FIELD_ID } = FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Export contract - Agent page - As an Exporter, I want to state whether another party helped me win my export contract, So that I can provide underwriters with all required pre-requisite information as part of my application', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      // go to the page we want to test.
      cy.startInsuranceExportContractSection({});
      cy.completeAndSubmitAboutGoodsOrServicesForm({});
      cy.completeAndSubmitHowYouWillGetPaidForm({});

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${AGENT}`;
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
      currentHref: `${INSURANCE_ROOT}/${referenceNumber}${AGENT}`,
      backLink: `${INSURANCE_ROOT}/${referenceNumber}${HOW_WILL_YOU_GET_PAID}`,
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
});
