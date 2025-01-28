import { body } from '../../../../../../pages/shared';
import { insurance } from '../../../../../../pages';
import { PAGES } from '../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const CONTENT_STRINGS = PAGES.INSURANCE.ELIGIBILITY.ELIGIBLE_TO_APPLY_ONLINE;

const {
  ELIGIBILITY: { ELIGIBLE_TO_APPLY_ONLINE, CHECK_YOUR_ANSWERS, HAVE_AN_ACCOUNT },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

const { eligibleToApplyOnlinePage } = insurance.eligibility;

const { PRIVACY } = CONTENT_STRINGS;

context(
  'Insurance - Eligibility - You are eligible to apply online page - I want to check if I can use online service to apply for UKEF Export Insurance Policy for my export transaction',
  () => {
    let url;

    before(() => {
      cy.completeAndSubmitAllInsuranceEligibilityAnswers({});

      cy.submitCheckYourAnswers();

      url = `${baseUrl}${ELIGIBLE_TO_APPLY_ONLINE}`;

      cy.assertUrl(url);
    });

    beforeEach(() => {
      cy.saveSession();
    });

    it('renders core page elements', () => {
      cy.corePageChecks({
        pageTitle: CONTENT_STRINGS.PAGE_TITLE,
        currentHref: ELIGIBLE_TO_APPLY_ONLINE,
        backLink: CHECK_YOUR_ANSWERS,
        submitButtonCopy: CONTENT_STRINGS.SUBMIT_BUTTON,
        assertAuthenticatedHeader: false,
        assertSaveAndBackButtonDoesNotExist: true,
      });
    });

    describe('page tests', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it('renders inset text', () => {
        cy.checkText(eligibleToApplyOnlinePage.insetText(), CONTENT_STRINGS.INSET);
      });

      it('renders body text', () => {
        cy.checkText(body(), CONTENT_STRINGS.BODY);
      });

      it('should render `privacy` copy and link', () => {
        cy.checkText(eligibleToApplyOnlinePage.privacy.intro(), PRIVACY.INTRO);

        cy.checkText(eligibleToApplyOnlinePage.privacy.notice(), `${PRIVACY.PRIVACY_NOTICE.LINK.TEXT} ${PRIVACY.PRIVACY_NOTICE.TEXT}`);

        cy.checkLink(eligibleToApplyOnlinePage.privacy.noticeLink(), PRIVACY.PRIVACY_NOTICE.LINK.HREF, PRIVACY.PRIVACY_NOTICE.LINK.TEXT);
      });

      it('renders `continue submit` text', () => {
        cy.checkText(eligibleToApplyOnlinePage.continueSubmit(), CONTENT_STRINGS.CONTINUE_SUBMIT);
      });

      describe('form submission', () => {
        it(`should redirect to ${HAVE_AN_ACCOUNT}`, () => {
          cy.clickSubmitButton();

          const expectedUrl = `${baseUrl}${HAVE_AN_ACCOUNT}`;

          cy.assertUrl(expectedUrl);
        });
      });
    });
  },
);
