import {
  headingCaption,
  saveAndBackButton,
} from '../../../../../../pages/shared';
import {
  BUTTONS,
  PAGES,
} from '../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const {
  ROOT,
  ALL_SECTIONS,
  POLICY: {
    CHECK_YOUR_ANSWERS,
    LOSS_PAYEE_ROOT,
  },
  EXPORT_CONTRACT,
} = INSURANCE_ROUTES;

const CONTENT_STRINGS = PAGES.INSURANCE.POLICY.CHECK_YOUR_ANSWERS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Check your answers - As an exporter, I want to check my answers to the type of policy section', () => {
  let referenceNumber;
  let url;
  let allSectionsUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePolicySection({});

      url = `${baseUrl}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
      allSectionsUrl = `${ROOT}/${referenceNumber}${ALL_SECTIONS}`;

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
      currentHref: `${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`,
      backLink: `${ROOT}/${referenceNumber}${LOSS_PAYEE_ROOT}`,
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

    it('renders a `save and back` button/link', () => {
      cy.checkLink(
        saveAndBackButton(),
        allSectionsUrl,
        BUTTONS.SAVE_AND_BACK,
      );
    });

    describe('form submission', () => {
      it(`should redirect to ${EXPORT_CONTRACT.ROOT}`, () => {
        cy.navigateToUrl(url);

        cy.clickSubmitButton();

        const expectedUrl = `${baseUrl}${ROOT}/${referenceNumber}${EXPORT_CONTRACT.ROOT}`;
        cy.assertUrl(expectedUrl);
      });
    });
  });
});
