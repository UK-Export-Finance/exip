import { addMonths, format } from 'date-fns';
import { checkYourAnswersEligibility, checkYourAnswersNeedToStartNewApplication } from '../../../../../../pages/insurance/check-your-answers';
import partials from '../../../../../../partials';
import { BUTTONS, PAGES } from '../../../../../../content-strings';
import { ROUTES, APPLICATION, DATE_FORMAT } from '../../../../../../constants';

const {
  ROOT: INSURANCE_ROOT,
  ALL_SECTIONS,
  ELIGIBILITY: { EXPORTER_LOCATION },
  CHECK_YOUR_ANSWERS: { ELIGIBILITY, START_NEW_APPLICATION },
} = ROUTES.INSURANCE;

const CONTENT_STRINGS = PAGES.INSURANCE.CHECK_YOUR_ANSWERS.START_NEW_APPLICATION;

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswers;

const { inset, linkButtons } = checkYourAnswersNeedToStartNewApplication;

context('Insurance - Check your answers - Need to start new application page', () => {
  let referenceNumber;
  let url;
  let eligibilityUrl;
  let allSectionsUrl;

  before(() => {
    cy.deleteAccount();

    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType({ referenceNumber });

      // go to the check your answers - policy page
      task.link().click();

      // go to "you need to start a new application" page
      checkYourAnswersEligibility.bannerLink().click();

      url = `${INSURANCE_ROOT}/${referenceNumber}${START_NEW_APPLICATION}`;

      cy.assertUrl(`${Cypress.config('baseUrl')}${url}`);

      eligibilityUrl = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${ELIGIBILITY}`;

      allSectionsUrl = `${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`;
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
      currentHref: url,
      backLink: eligibilityUrl,
      assertSubmitButton: false,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('renders inset text with submission deadline', () => {
      cy.checkText(inset.intro(), CONTENT_STRINGS.INSET);

      const timestamp = addMonths(new Date(), APPLICATION.SUBMISSION_DEADLINE_IN_MONTHS);

      const expectedDeadline = format(new Date(timestamp), DATE_FORMAT.DEFAULT);

      cy.checkText(inset.applicationDeadline(), expectedDeadline);
    });

    it('renders a `start new application` link button', () => {
      cy.checkLink(linkButtons.startNewApplication(), EXPORTER_LOCATION, BUTTONS.START_A_NEW_APPLICATION);
    });

    it('renders a `return to my existing application` link button', () => {
      cy.checkLink(linkButtons.returnToExistingApplication(), allSectionsUrl, BUTTONS.RETURN_TO_EXISTING_APPLICATION);
    });
  });
});
