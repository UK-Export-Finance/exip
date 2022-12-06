import {
  headingCaption,
  heading,
  inlineErrorMessage,
  submitButton,
  saveAndBackButton,
} from '../../../../pages/shared';
import { insurance } from '../../../../pages';
import partials from '../../../../partials';
import {
  BUTTONS,
  ERROR_MESSAGES,
  LINKS,
  ORGANISATION,
  PAGES,
  TASKS,
} from '../../../../../../content-strings';
import { FIELDS } from '../../../../../../content-strings/fields/insurance/policy-and-exports';
import { ROUTES, FIELD_IDS } from '../../../../../../constants';
import getReferenceNumber from '../../../../helpers/get-reference-number';

const CONTENT_STRINGS = PAGES.INSURANCE.POLICY_AND_EXPORTS.TYPE_OF_POLICY;

const FIELD_ID = FIELD_IDS.INSURANCE.POLICY_AND_EXPORTS.POLICY_TYPE;

const singlePolicyField = insurance.policyAndExport.typeOfPolicy[FIELD_ID].single;
const multiplePolicyField = insurance.policyAndExport.typeOfPolicy[FIELD_ID].multi;

const goToPageDirectly = (referenceNumber) => {
  cy.visit(`${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.POLICY_AND_EXPORTS.TYPE_OF_POLICY}`, {
    auth: {
      username: Cypress.config('basicAuthKey'),
      password: Cypress.config('basicAuthSecret'),
    },
  });
};

context('Insurance - Policy and exports - Type of policy page - As an exporter, I want to enter the type of policy I need for my export contract', () => {
  let referenceNumber;

  before(() => {
    cy.visit(ROUTES.INSURANCE.START, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });

    cy.submitInsuranceEligibilityAndStartApplication();

    partials.insurance.taskList.prepareApplication.tasks.policyTypeAndExports.link().click();

    getReferenceNumber().then((id) => {
      referenceNumber = id;

      const expected = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.POLICY_AND_EXPORTS.TYPE_OF_POLICY}`;
      cy.url().should('eq', expected);
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  it('passes the audits', () => {
    cy.lighthouse({
      accessibility: 100,
      performance: 75,
      'best-practices': 100,
      seo: 70,
    });
  });

  it('renders a back link with correct url', () => {
    partials.backLink().should('exist');
    partials.backLink().invoke('text').then((text) => {
      expect(text.trim()).equal(LINKS.BACK);
    });

    partials.backLink().click();

    const expectedUrl = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.ALL_SECTIONS}`;

    cy.url().should('include', expectedUrl);

    goToPageDirectly(referenceNumber);
  });

  it('renders an analytics cookies consent banner that can be accepted', () => {
    cy.checkAnalyticsCookiesConsentAndAccept();
  });

  it('renders an analytics cookies consent banner that can be rejected', () => {
    cy.rejectAnalyticsCookies();
  });

  it('renders a phase banner', () => {
    cy.checkPhaseBanner();
  });

  it('renders a page title and heading with caption', () => {
    const expectedPageTitle = `${CONTENT_STRINGS.PAGE_TITLE} - ${ORGANISATION}`;
    cy.title().should('eq', expectedPageTitle);

    headingCaption().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.HEADING_CAPTION);
    });

    heading().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.PAGE_TITLE);
    });
  });

  it('renders an intro paragraph', () => {
    insurance.policyAndExport.typeOfPolicy.intro().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.INTRO);
    });
  });

  it('renders `single` radio input with label and hint text list', () => {
    singlePolicyField.input().should('exist');
    singlePolicyField.label().invoke('text').then((text) => {
      expect(text.trim()).equal(FIELDS[FIELD_ID].OPTIONS.SINGLE.TEXT);
    });

    singlePolicyField.hintList.item1().invoke('text').then((text) => {
      expect(text.trim()).equal(FIELDS[FIELD_ID].OPTIONS.SINGLE.HINT_LIST[0]);
    });

    singlePolicyField.hintList.item2().invoke('text').then((text) => {
      expect(text.trim()).equal(FIELDS[FIELD_ID].OPTIONS.SINGLE.HINT_LIST[1]);
    });

    singlePolicyField.hintList.item3().invoke('text').then((text) => {
      expect(text.trim()).equal(FIELDS[FIELD_ID].OPTIONS.SINGLE.HINT_LIST[2]);
    });

    singlePolicyField.hintList.item4().invoke('text').then((text) => {
      expect(text.trim()).equal(FIELDS[FIELD_ID].OPTIONS.SINGLE.HINT_LIST[3]);
    });
  });

  it('renders `multiple` radio input with label and hint text list', () => {
    multiplePolicyField.input().should('exist');
    multiplePolicyField.label().invoke('text').then((text) => {
      expect(text.trim()).equal(FIELDS[FIELD_ID].OPTIONS.MULTI.TEXT);
    });

    multiplePolicyField.hintList.item1().invoke('text').then((text) => {
      expect(text.trim()).equal(FIELDS[FIELD_ID].OPTIONS.MULTI.HINT_LIST[0]);
    });

    multiplePolicyField.hintList.item2().invoke('text').then((text) => {
      expect(text.trim()).equal(FIELDS[FIELD_ID].OPTIONS.MULTI.HINT_LIST[1]);
    });

    multiplePolicyField.hintList.item3().invoke('text').then((text) => {
      expect(text.trim()).equal(FIELDS[FIELD_ID].OPTIONS.MULTI.HINT_LIST[2]);
    });
  });

  it('renders a submit button', () => {
    submitButton().should('exist');

    submitButton().invoke('text').then((text) => {
      expect(text.trim()).equal(BUTTONS.CONTINUE);
    });
  });

  it('renders a `save and back` button', () => {
    saveAndBackButton().should('exist');

    saveAndBackButton().invoke('text').then((text) => {
      expect(text.trim()).equal(BUTTONS.SAVE_AND_BACK);
    });
  });

  describe('form submission', () => {
    describe('when submitting an empty form', () => {
      it('should render a validation error', () => {
        submitButton().click();

        partials.errorSummaryListItems().should('exist');
        partials.errorSummaryListItems().should('have.length', 1);

        const expectedMessage = ERROR_MESSAGES.INSURANCE.POLICY_AND_EXPORTS[FIELD_ID].IS_EMPTY;

        partials.errorSummaryListItems().first().invoke('text').then((text) => {
          expect(text.trim()).equal(expectedMessage);
        });

        inlineErrorMessage().invoke('text').then((text) => {
          expect(text.trim()).includes(expectedMessage);
        });
      });

      it('should focus on input when clicking summary error message', () => {
        submitButton().click();

        partials.errorSummaryListItemLinks().eq(0).click();
        singlePolicyField.input().should('have.focus');
      });
    });

    describe('when submitting the answer as `single`', () => {
      it(`should redirect to ${ROUTES.INSURANCE.POLICY_AND_EXPORTS.ABOUT_GOODS_OR_SERVICES}`, () => {
        singlePolicyField.input().click();

        submitButton().click();

        const expected = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.POLICY_AND_EXPORTS.ABOUT_GOODS_OR_SERVICES}`;

        cy.url().should('eq', expected);
      });

      describe('when going back to the page', () => {
        it('should have the originally submitted answer selected', () => {
          goToPageDirectly(referenceNumber);

          singlePolicyField.input().should('be.checked');
        });
      });
    });

    describe('when submitting the answer as `multiple`', () => {
      it(`should redirect to ${ROUTES.INSURANCE.POLICY_AND_EXPORTS.ABOUT_GOODS_OR_SERVICES}`, () => {
        multiplePolicyField.input().click();

        submitButton().click();

        const expected = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.POLICY_AND_EXPORTS.ABOUT_GOODS_OR_SERVICES}`;

        cy.url().should('eq', expected);
      });

      describe('when going back to the page', () => {
        it('should have the originally submitted answer selected', () => {
          goToPageDirectly(referenceNumber);

          multiplePolicyField.input().should('be.checked');
        });
      });
    });

    describe('after submitting an answer', () => {
      it('should update the status of task `type of policy and exports` to `in progress`', () => {
        cy.visit(`${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.ALL_SECTIONS}`, {
          auth: {
            username: Cypress.config('basicAuthKey'),
            password: Cypress.config('basicAuthSecret'),
          },
        });

        const task = partials.insurance.taskList.prepareApplication.tasks.policyTypeAndExports;

        task.status().invoke('text').then((text) => {
          const expected = TASKS.STATUS.IN_PROGRESS;

          expect(text.trim()).equal(expected);
        });
      });
    });
  });
});
