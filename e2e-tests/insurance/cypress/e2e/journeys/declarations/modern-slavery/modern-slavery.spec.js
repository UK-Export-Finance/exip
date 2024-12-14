import { headingCaption } from '../../../../../../pages/shared';
import { modernSlaveryPage } from '../../../../../../pages/insurance/declarations';
import { PAGES } from '../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const CONTENT_STRINGS = PAGES.INSURANCE.DECLARATIONS.MODERN_SLAVERY;

const {
  ROOT: INSURANCE_ROOT,
  DECLARATIONS: { MODERN_SLAVERY },
} = INSURANCE_ROUTES;

const {
  intro: { answerTheQuestions, guidingPrinciplesLink, ifYouSayNo },
} = modernSlaveryPage;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Declarations - Modern slavery page - TODO EMS-4023', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${MODERN_SLAVERY}`;

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
      currentHref: `${INSURANCE_ROOT}/${referenceNumber}${MODERN_SLAVERY}`,
      backLink: `${INSURANCE_ROOT}/${referenceNumber}${MODERN_SLAVERY}#`,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('renders a heading caption', () => {
      cy.checkText(headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
    });

    describe('intro', () => {
      it('should render `answer the questions` copy', () => {
        cy.checkText(answerTheQuestions(), CONTENT_STRINGS.INTRO.ANSWER_THE_QUESTIONS);
      });

      it('should render a `guiding principles` link', () => {
        cy.checkLink(guidingPrinciplesLink(), '#', CONTENT_STRINGS.INTRO.GUIDING_PRINCIPLES_LINK.TEXT);
      });

      it('should render `if you say no` copy', () => {
        cy.checkText(ifYouSayNo(), CONTENT_STRINGS.INTRO.IF_YOU_SAY_NO);
      });
    });
  });
});
