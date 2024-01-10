import {
  headingCaption,
  saveAndBackButton,
} from '../../../../../../pages/shared';
import partials from '../../../../../../partials';
import {
  BUTTONS,
  PAGES,
  PRE_CREDIT_PERIOD_DESCRIPTION,
} from '../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const { preCreditPeriodDescription } = partials;

const CONTENT_STRINGS = PAGES.INSURANCE.POLICY.PRE_CREDIT_PERIOD;

const {
  ROOT: INSURANCE_ROOT,
  POLICY: { PRE_CREDIT_PERIOD },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

const story = 'As an exporter, I want to state whether I require pre-credit cover, So that I can be insured against costs accrued for preparation of the good or service I am exporting if needed';

context(`Insurance - Policy - Pre-credit period page - ${story}`, () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${PRE_CREDIT_PERIOD}`;

      cy.navigateToUrl(url);
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
      currentHref: `${INSURANCE_ROOT}/${referenceNumber}${PRE_CREDIT_PERIOD}`,
      backLink: `${url}#`,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('renders a heading caption', () => {
      cy.checkText(headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
    });

    it('renders a `save and back` button', () => {
      cy.checkText(saveAndBackButton(), BUTTONS.SAVE_AND_BACK);
    });

    describe('expandable details - what is the pre-credit period', () => {
      it('renders summary text', () => {
        cy.checkText(preCreditPeriodDescription.summary(), PRE_CREDIT_PERIOD_DESCRIPTION.INTRO);

        preCreditPeriodDescription.details().should('not.have.attr', 'open');
      });

      describe('when clicking the summary text', () => {
        it('should expand the collapsed `description` content', () => {
          cy.checkText(preCreditPeriodDescription.protectsYou(), PRE_CREDIT_PERIOD_DESCRIPTION.PROTECTS_YOU);
          cy.checkText(preCreditPeriodDescription.insuresYou(), PRE_CREDIT_PERIOD_DESCRIPTION.INSURES_YOU);
          cy.checkText(preCreditPeriodDescription.happensBefore(), PRE_CREDIT_PERIOD_DESCRIPTION.HAPPENS_BEFORE);
        });
      });
    });
  });
});
