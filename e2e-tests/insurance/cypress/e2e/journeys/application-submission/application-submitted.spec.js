import applicationSubmittedPage from '../../../../../pages/insurance/applicationSubmitted';
import { PAGES, LINKS } from '../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';

const CONTENT_STRINGS = PAGES.INSURANCE.APPLICATION_SUBMITTED;

const {
  ROOT: INSURANCE_ROOT,
  ELIGIBILITY: { EXPORTER_LOCATION },
  DECLARATIONS: { HOW_YOUR_DATA_WILL_BE_USED },
  APPLICATION_SUBMITTED,
  FEEDBACK,
} = INSURANCE_ROUTES;

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
      assertSubmitButton: false,
    });
  });

  describe('page tests', () => {
    const {
      panel,
      whatHappensNext,
      decisionFromUs,
      actions,
      research,
    } = applicationSubmittedPage;

    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('renders `your reference` copy', () => {
      cy.checkText(panel.yourReference(), CONTENT_STRINGS.YOUR_REFERENCE);
    });

    it('renders the reference number', () => {
      cy.checkText(panel.referenceNumber(), referenceNumber);
    });

    it('renders intro copy', () => {
      cy.checkText(applicationSubmittedPage.intro(), CONTENT_STRINGS.INTRO);
    });

    describe('what happens next', () => {
      it('renders a heading', () => {
        cy.checkText(whatHappensNext.heading(), CONTENT_STRINGS.WHAT_HAPPENS_NEXT.HEADING);
      });

      it('renders `we will contact you` intro copy', () => {
        cy.checkText(whatHappensNext.intro(), CONTENT_STRINGS.WHAT_HAPPENS_NEXT.WILL_CONTACT_YOU.INTRO);
      });

      it('renders a list', () => {
        cy.checkText(whatHappensNext.listItem(1), CONTENT_STRINGS.WHAT_HAPPENS_NEXT.WILL_CONTACT_YOU.LIST[0]);
        cy.checkText(whatHappensNext.listItem(2), CONTENT_STRINGS.WHAT_HAPPENS_NEXT.WILL_CONTACT_YOU.LIST[1]);
      });

      it('renders `climate change factors` copy', () => {
        cy.checkText(whatHappensNext.climateChangeFactors(), CONTENT_STRINGS.WHAT_HAPPENS_NEXT.CLIMATE_CHANGE_FACTORS);
      });
    });

    describe('decision from us', () => {
      it('renders a heading', () => {
        cy.checkText(decisionFromUs.heading(), CONTENT_STRINGS.DECISION_FROM_US.HEADING);
      });

      it('renders `timeframe` copy', () => {
        cy.checkText(decisionFromUs.timeframe(), CONTENT_STRINGS.DECISION_FROM_US.TIMEFRAME);
      });

      it('renders `extra information` copy', () => {
        cy.checkText(decisionFromUs.extraInfo(), CONTENT_STRINGS.DECISION_FROM_US.EXTRA_INFO);
      });
    });

    describe('actions', () => {
      let selector;

      describe('start a new application', () => {
        beforeEach(() => {
          cy.navigateToUrl(url);

          selector = actions.startNewApplication;
        });

        it('renders a link', () => {
          cy.checkLink(
            selector(),
            EXPORTER_LOCATION,
            CONTENT_STRINGS.ACTIONS.START_NEW_APPLICATION.TEXT,
          );
        });

        it(`should redirect to ${EXPORTER_LOCATION}`, () => {
          selector().click();

          const expectedUrl = `${baseUrl}${EXPORTER_LOCATION}`;
          cy.assertUrl(expectedUrl);
        });
      });

      describe('feedback', () => {
        beforeEach(() => {
          cy.navigateToUrl(url);

          selector = actions.giveFeedback;
        });

        it('renders a link', () => {
          cy.checkLink(
            selector(),
            FEEDBACK,
            CONTENT_STRINGS.ACTIONS.GIVE_FEEDBACK.TEXT,
          );
        });
      });
    });

    describe('research', () => {
      it('renders a heading', () => {
        cy.checkText(research.heading(), CONTENT_STRINGS.RESEARCH.HEADING);
      });

      it('renders `carry out` copy', () => {
        cy.checkText(research.carryOut(), CONTENT_STRINGS.RESEARCH.CARRY_OUT);
      });

      it('renders a link to take part', () => {
        cy.checkLink(
          research.takePartLink(),
          LINKS.EXTERNAL.RESEARCH,
          CONTENT_STRINGS.RESEARCH.TAKE_PART.TEXT,
        );
      });

      it('renders a `if you like` copy', () => {
        cy.checkText(research.ifYouLike(), CONTENT_STRINGS.RESEARCH.IF_YOU_LIKE);
      });
    });
  });
});
