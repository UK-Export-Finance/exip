import applicationSubmittedPage from '../../../../../pages/insurance/applicationSubmitted';
import { CONTACT_DETAILS } from '../../../../../constants';
import { PAGES, LINKS } from '../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';

const CONTENT_STRINGS = PAGES.INSURANCE.APPLICATION_SUBMITTED;

const {
  ROOT: INSURANCE_ROOT,
  DECLARATIONS: { HOW_YOUR_DATA_WILL_BE_USED },
  APPLICATION_SUBMITTED,
  FEEDBACK,
} = INSURANCE_ROUTES;

const {
  panel,
  whatHappensNext,
  decisionFromUs,
  helpUsImprove,
} = applicationSubmittedPage;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - application submitted page', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndSubmitAnApplication({}).then((refNumber) => {
      referenceNumber = refNumber;

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${APPLICATION_SUBMITTED}`;

      cy.assertApplicationSubmittedUrl(referenceNumber);
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
      currentHref: `${INSURANCE_ROOT}/${referenceNumber}${APPLICATION_SUBMITTED}`,
      backLink: `${INSURANCE_ROOT}/${referenceNumber}${HOW_YOUR_DATA_WILL_BE_USED}`,
      assertBackLink: false,
      hasAForm: false,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('renders `your reference` copy', () => {
      cy.checkText(panel.yourReference(), CONTENT_STRINGS.YOUR_REFERENCE);
    });

    it('renders the reference number', () => {
      cy.checkText(panel.referenceNumber(), referenceNumber);
    });

    describe('what happens next', () => {
      it('renders a heading', () => {
        cy.checkText(whatHappensNext.heading(), CONTENT_STRINGS.WHAT_HAPPENS_NEXT.HEADING);
      });

      it('renders an intro', () => {
        cy.checkText(whatHappensNext.intro(), CONTENT_STRINGS.WHAT_HAPPENS_NEXT.INTRO);
      });

      it('renders `we will send email` copy', () => {
        cy.checkText(whatHappensNext.willSendEmail(), CONTENT_STRINGS.WHAT_HAPPENS_NEXT.WILL_SEND_EMAIL);
      });

      it('renders `may also contact` copy', () => {
        cy.checkText(whatHappensNext.mayAlsoContact(), CONTENT_STRINGS.WHAT_HAPPENS_NEXT.MAY_ALSO_CONTACT);
      });
    });

    describe('decision from us', () => {
      it('renders a heading', () => {
        cy.checkText(decisionFromUs.heading(), CONTENT_STRINGS.DECISION_FROM_US.HEADING);
      });

      it('renders `timeframe` copy', () => {
        cy.checkText(decisionFromUs.timeframe(), CONTENT_STRINGS.DECISION_FROM_US.TIMEFRAME);
      });

      it('renders `questions` intro', () => {
        cy.checkText(decisionFromUs.questions.intro(), CONTENT_STRINGS.DECISION_FROM_US.HAVE_ANY_QUESTIONS.INTRO);
      });

      it('renders `questions` link', () => {
        cy.checkLink(
          decisionFromUs.questions.link(),
          `mailto:${CONTACT_DETAILS.EMAIL.UNDERWRITING}`,
          CONTACT_DETAILS.EMAIL.UNDERWRITING,
        );
      });
    });

    describe('help us improve', () => {
      it('renders a heading', () => {
        cy.checkText(helpUsImprove.heading(), CONTENT_STRINGS.HELP_US_IMPROVE.HEADING);
      });

      it('renders `carry out` copy', () => {
        cy.checkText(helpUsImprove.carryOut(), CONTENT_STRINGS.HELP_US_IMPROVE.CARRY_OUT);
      });

      it('renders a `take part` link', () => {
        cy.checkLink(
          helpUsImprove.takePartLink(),
          LINKS.EXTERNAL.RESEARCH,
          CONTENT_STRINGS.HELP_US_IMPROVE.TAKE_PART.TEXT,
        );
      });

      it('renders a `if you like` copy', () => {
        cy.checkText(helpUsImprove.ifYouLike(), CONTENT_STRINGS.HELP_US_IMPROVE.IF_YOU_LIKE);
      });

      it('renders a `feedback` intro', () => {
        cy.checkText(helpUsImprove.feedback.intro(), CONTENT_STRINGS.HELP_US_IMPROVE.FEEDBACK.INTRO);
      });

      it('renders a `feedback` link', () => {
        cy.checkLink(
          helpUsImprove.feedback.link(),
          FEEDBACK,
          `${CONTENT_STRINGS.HELP_US_IMPROVE.FEEDBACK.LINK.TEXT}.`,
        );
      });
    });
  });
});
