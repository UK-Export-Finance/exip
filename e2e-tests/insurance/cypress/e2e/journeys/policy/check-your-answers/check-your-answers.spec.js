import {
  headingCaption,
  submitButton,
  saveAndBackButton,
} from '../../../../../../pages/shared';
import partials from '../../../../../../partials';
import {
  BUTTONS,
  PAGES,
} from '../../../../../../content-strings';
import { ROUTES } from '../../../../../../constants';
import { INSURANCE_ROOT } from '../../../../../../constants/routes/insurance';

const {
  POLICY,
  EXPORTER_BUSINESS: {
    COMPANIES_HOUSE_NUMBER,
  },
} = ROUTES.INSURANCE;

const CONTENT_STRINGS = PAGES.INSURANCE.POLICY.CHECK_YOUR_ANSWERS;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.policy;

context('Insurance - Policy - Check your answers - As an exporter, I want to check my answers to the type of policy section', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      task.link().click();

      cy.completePolicySection({});

      url = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${POLICY.CHECK_YOUR_ANSWERS}`;

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
      currentHref: `${INSURANCE_ROOT}/${referenceNumber}${POLICY.CHECK_YOUR_ANSWERS}`,
      backLink: `${INSURANCE_ROOT}/${referenceNumber}${POLICY.NAME_ON_POLICY}`,
      submitButtonCopy: BUTTONS.CONTINUE_NEXT_SECTION,
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

    describe('form submission', () => {
      it(`should redirect to ${COMPANIES_HOUSE_NUMBER}`, () => {
        cy.navigateToUrl(url);

        submitButton().click();

        const expectedUrl = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${COMPANIES_HOUSE_NUMBER}`;
        cy.assertUrl(expectedUrl);
      });
    });
  });
});
