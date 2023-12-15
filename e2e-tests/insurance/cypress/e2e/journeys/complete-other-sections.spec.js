import completeOtherSectionsPage from '../../../../pages/insurance/complete-other-sections';
import { PAGES } from '../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';

const {
  ROOT: INSURANCE_ROOT,
  ALL_SECTIONS,
  COMPLETE_OTHER_SECTIONS,
  CHECK_YOUR_ANSWERS,
} = INSURANCE_ROUTES;

const CONTENT_STRINGS = PAGES.INSURANCE.COMPLETE_OTHER_SECTIONS;

context('Insurance - Complete other sections page', () => {
  const insuranceRoute = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}`;

  let referenceNumber;
  let completeOtherSectionsUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      // go to a page with a new application that will trigger a redirect to this page.
      cy.navigateToUrl(`${insuranceRoute}/${referenceNumber}${CHECK_YOUR_ANSWERS.ELIGIBILITY}`);

      completeOtherSectionsUrl = `${insuranceRoute}/${referenceNumber}${COMPLETE_OTHER_SECTIONS}`;

      cy.assertUrl(completeOtherSectionsUrl);
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
      currentHref: `${INSURANCE_ROOT}/${referenceNumber}${COMPLETE_OTHER_SECTIONS}`,
      hasAForm: false,
      assertBackLink: false,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(completeOtherSectionsUrl);
    });

    it('renders intro copy', () => {
      cy.checkText(completeOtherSectionsPage.intro(), CONTENT_STRINGS.INTRO);
    });

    it('renders `can access other sections` copy', () => {
      cy.checkText(completeOtherSectionsPage.canAccessOtherSections(), CONTENT_STRINGS.CAN_ACCESS_OTHER_SECTIONS);
    });

    it('renders a link to the task list', () => {
      const expectedHref = `${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      cy.checkLink(completeOtherSectionsPage.taskListLink(), expectedHref, CONTENT_STRINGS.TASK_LIST);
    });
  });
});
