import { PAGES } from '../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';

const CONTENT_STRINGS = PAGES.INSURANCE.ELIGIBILITY.LONG_TERM_COVER_EXIT;

const {
  ELIGIBILITY: { COVER_PERIOD, LONG_TERM_COVER_EXIT },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context(
  'Insurance - Eligibility - Long term cover page - I want to check if I can use online service to apply for UKEF Export Insurance Policy for my export transaction',
  () => {
    let url;

    before(() => {
      cy.completeAndSubmitEligibilityForms({ formToStopAt: 'coverPeriod', coverPeriodIsUnderThreshold: false });

      url = `${baseUrl}${LONG_TERM_COVER_EXIT}`;

      cy.assertUrl(url);
    });

    beforeEach(() => {
      cy.saveSession();
    });

    it('renders core page elements', () => {
      cy.corePageChecks({
        pageTitle: CONTENT_STRINGS.PAGE_TITLE,
        currentHref: LONG_TERM_COVER_EXIT,
        backLink: COVER_PERIOD,
        hasAForm: false,
        assertAuthenticatedHeader: false,
        assertSaveAndBackButtonDoesNotExist: true,
      });
    });

    describe('page tests', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it('should render intro text', () => {
        cy.checkIntroText(CONTENT_STRINGS.INTRO);
      });

      it('should render `apply through PDF` copy and link', () => {
        cy.assertApplyThroughPDFCopyAndLink({});
      });

      it('should render `talk to your nearest EFM` copy and link', () => {
        cy.assertTalkToEFMCopyAndLink({});
      });

      it('should render `contact UKEF team` copy', () => {
        cy.assertContactUkefTeam({});
      });
    });
  },
);
