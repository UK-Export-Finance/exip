import {
  policyTypePage,
  checkYourAnswersPage,
} from '../../pages';
import partials from '../../partials';
import CONSTANTS from '../../../../constants';

const {
  FIELD_IDS,
  FIELD_VALUES,
  ROUTES,
} = CONSTANTS;

const {
  POLICY_TYPE,
  SINGLE_POLICY_TYPE,
  MULTI_POLICY_TYPE,
  POLICY_LENGTH,
  SINGLE_POLICY_LENGTH,
  MULTI_POLICY_LENGTH,
} = FIELD_IDS;

const submissionData = {
  [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.SINGLE,
  [POLICY_LENGTH]: '3',
};

context('Change your answers after checking answers - Policy type and length', () => {
  let row;

  before(() => {
    cy.login();
    cy.submitAnswersHappyPath();
    cy.url().should('include', ROUTES.CHECK_YOUR_ANSWERS);
    row = checkYourAnswersPage.summaryLists.policy[SINGLE_POLICY_TYPE];
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  it(`clicking 'change' redirects to ${ROUTES.POLICY_TYPE_CHANGE}`, () => {
    row.changeLink().click();

    const expectedUrl = `${ROUTES.POLICY_TYPE_CHANGE}#${SINGLE_POLICY_TYPE}`;
    cy.url().should('include', expectedUrl);
  });

  it('renders a back button with correct link', () => {
    partials.backLink().should('exist');

    const expected = `${Cypress.config('baseUrl')}${ROUTES.CHECK_YOUR_ANSWERS}`;
    partials.backLink().should('have.attr', 'href', expected);
  });

  it('has originally submitted `policy type` (single)', () => {
    policyTypePage[POLICY_TYPE].single.input().should('be.checked');
  });

  it('auto focuses the input', () => {
    policyTypePage[POLICY_TYPE].single.input().should('have.focus');
  });

  it(`has originally submitted 'policy length' (${submissionData[POLICY_LENGTH]})`, () => {
    policyTypePage[SINGLE_POLICY_LENGTH].input().should('have.attr', 'value', submissionData[POLICY_LENGTH]);
  });

  it(`redirects to ${ROUTES.CHECK_YOUR_ANSWERS} when submitting new answers`, () => {
    policyTypePage[POLICY_TYPE].multi.input().click();
    policyTypePage[MULTI_POLICY_LENGTH].input().type('8');
    policyTypePage.submitButton().click();

    cy.url().should('include', ROUTES.CHECK_YOUR_ANSWERS);
  });

  it('renders the new answers in `Check your answers` page (multi, 8 months)', () => {
    row = checkYourAnswersPage.summaryLists.policy[MULTI_POLICY_TYPE];

    row.value().invoke('text').then((text) => {
      const expected = FIELD_VALUES.POLICY_TYPE.MULTI;

      expect(text.trim()).equal(expected);
    });

    row = checkYourAnswersPage.summaryLists.policy[MULTI_POLICY_LENGTH];

    row.value().invoke('text').then((text) => {
      const expected = '8 months';

      expect(text.trim()).equal(expected);
    });
  });

  describe('change `Policy type` and `Policy length` for a second time (multi 8 months, to single 5 months)', () => {
    before(() => {
      row = checkYourAnswersPage.summaryLists.policy[MULTI_POLICY_TYPE];

      row.changeLink().click();

      const expectedUrl = `${ROUTES.POLICY_TYPE_CHANGE}#${MULTI_POLICY_TYPE}`;
      cy.url().should('include', expectedUrl);
    });

    it('renders a back button with correct link', () => {
      partials.backLink().should('exist');

      const expected = `${Cypress.config('baseUrl')}${ROUTES.CHECK_YOUR_ANSWERS}`;
      partials.backLink().should('have.attr', 'href', expected);
    });

    it('has previously submitted `policy type` (multi)', () => {
      policyTypePage[POLICY_TYPE].multi.input().should('be.checked');
    });

    it('auto focuses the input', () => {
      policyTypePage[POLICY_TYPE].multi.input().should('have.focus');
    });

    it('has previously submitted `policy length` (8 months)', () => {
      policyTypePage[MULTI_POLICY_LENGTH].input().should('have.attr', 'value', '8');
    });

    it(`redirects to ${ROUTES.CHECK_YOUR_ANSWERS} when submitting new answers`, () => {
      policyTypePage[POLICY_TYPE].single.input().click();
      policyTypePage[SINGLE_POLICY_LENGTH].input().clear().type('5');
      policyTypePage.submitButton().click();

      cy.url().should('include', ROUTES.CHECK_YOUR_ANSWERS);
    });

    it('renders the new answers in `Check your answers` page (single policy, 5 months)', () => {
      row = checkYourAnswersPage.summaryLists.policy[SINGLE_POLICY_TYPE];

      row.value().invoke('text').then((text) => {
        const expected = FIELD_VALUES.POLICY_TYPE.SINGLE;

        expect(text.trim()).equal(expected);
      });

      row = checkYourAnswersPage.summaryLists.policy[SINGLE_POLICY_LENGTH];

      row.value().invoke('text').then((text) => {
        const expected = '5 months';

        expect(text.trim()).equal(expected);
      });
    });
  });

  describe('change only `Policy length` (single policy type, 5 months to 7 months)', () => {
    before(() => {
      row = checkYourAnswersPage.summaryLists.policy[SINGLE_POLICY_LENGTH];
      row.changeLink().click();

      const expectedUrl = `${ROUTES.POLICY_TYPE_CHANGE}#${SINGLE_POLICY_LENGTH}`;
      cy.url().should('include', expectedUrl);
    });

    it('renders a back button with correct link', () => {
      partials.backLink().should('exist');

      const expected = `${Cypress.config('baseUrl')}${ROUTES.CHECK_YOUR_ANSWERS}`;
      partials.backLink().should('have.attr', 'href', expected);
    });

    it('auto focuses the input', () => {
      policyTypePage[SINGLE_POLICY_LENGTH].input().should('have.focus');
    });

    it(`redirects to ${ROUTES.CHECK_YOUR_ANSWERS} when submitting new answers`, () => {
      policyTypePage[POLICY_TYPE].single.input().click();
      policyTypePage[SINGLE_POLICY_LENGTH].input().clear().type('7');
      policyTypePage.submitButton().click();

      cy.url().should('include', ROUTES.CHECK_YOUR_ANSWERS);
    });

    it('renders the new answer in `Check your answers` page (single policy, 7 months)', () => {
      row = checkYourAnswersPage.summaryLists.policy[SINGLE_POLICY_LENGTH];

      row.value().invoke('text').then((text) => {
        const expected = '7 months';

        expect(text.trim()).equal(expected);
      });
    });
  });

  describe('change only `Policy length` (multi policy type, 7 months to 6 months)', () => {
    before(() => {
      // change back to multi policy
      row = checkYourAnswersPage.summaryLists.policy[SINGLE_POLICY_TYPE];
      row.changeLink().click();

      policyTypePage[POLICY_TYPE].multi.input().click();
      policyTypePage[MULTI_POLICY_LENGTH].input().type('4');
      policyTypePage.submitButton().click();

      // click `change` (policy length)
      row = checkYourAnswersPage.summaryLists.policy[MULTI_POLICY_LENGTH];
      row.changeLink().click();

      const expectedUrl = `${ROUTES.POLICY_TYPE_CHANGE}#${MULTI_POLICY_LENGTH}`;
      cy.url().should('include', expectedUrl);
    });

    it('renders a back button with correct link', () => {
      partials.backLink().should('exist');

      const expected = `${Cypress.config('baseUrl')}${ROUTES.CHECK_YOUR_ANSWERS}`;
      partials.backLink().should('have.attr', 'href', expected);
    });

    it('auto focuses the input', () => {
      policyTypePage[MULTI_POLICY_LENGTH].input().should('have.focus');
    });

    it(`redirects to ${ROUTES.CHECK_YOUR_ANSWERS} when submitting new answers`, () => {
      policyTypePage[POLICY_TYPE].multi.input().click();
      policyTypePage[MULTI_POLICY_LENGTH].input().clear().type('6');
      policyTypePage.submitButton().click();

      cy.url().should('include', ROUTES.CHECK_YOUR_ANSWERS);
    });

    it('renders the new answer in `Check your answers` page (multi policy, 6 months)', () => {
      row = checkYourAnswersPage.summaryLists.policy[MULTI_POLICY_LENGTH];

      row.value().invoke('text').then((text) => {
        const expected = '6 months';

        expect(text.trim()).equal(expected);
      });
    });
  });
});
