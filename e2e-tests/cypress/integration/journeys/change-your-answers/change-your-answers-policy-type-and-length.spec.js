import {
  tellUsAboutYourDealPage,
  checkYourAnswersPage,
} from '../../pages';
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
  [POLICY_LENGTH]: '13',
};

context('Change your answers after checking answers - Policy type and length', () => {
  let row;

  before(() => {
    cy.login();
    cy.submitAnswersHappyPath();
    cy.url().should('include', ROUTES.CHECK_YOUR_ANSWERS);
    row = checkYourAnswersPage.summaryLists.deal[SINGLE_POLICY_TYPE];
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  it(`clicking 'change' redirects to ${ROUTES.TELL_US_ABOUT_YOUR_DEAL_CHANGE}`, () => {
    row.changeLink().click();

    const expectedUrl = `${ROUTES.TELL_US_ABOUT_YOUR_DEAL_CHANGE}#${SINGLE_POLICY_TYPE}`;
    cy.url().should('include', expectedUrl);
  });

  it('has originally submitted `policy type` (single)', () => {
    tellUsAboutYourDealPage[POLICY_TYPE].single.input().should('be.checked');
  });

  it('auto focuses the input', () => {
    tellUsAboutYourDealPage[POLICY_TYPE].single.input().should('have.focus');
  });

  it(`has originally submitted 'policy length' (${submissionData[POLICY_LENGTH]})`, () => {
    tellUsAboutYourDealPage[SINGLE_POLICY_LENGTH].input().should('have.attr', 'value', submissionData[POLICY_LENGTH]);
  });

  it(`redirects to ${ROUTES.CHECK_YOUR_ANSWERS} when submitting new answers`, () => {
    tellUsAboutYourDealPage[POLICY_TYPE].multi.input().click();
    tellUsAboutYourDealPage[MULTI_POLICY_LENGTH].input().type('10');
    tellUsAboutYourDealPage.submitButton().click();

    cy.url().should('include', ROUTES.CHECK_YOUR_ANSWERS);
  });

  it('renders the new answers in `Check your answers` page (multi policy, 10 months)', () => {
    row = checkYourAnswersPage.summaryLists.deal[MULTI_POLICY_TYPE];

    row.value().invoke('text').then((text) => {
      const expected = FIELD_VALUES.POLICY_TYPE.MULTI;

      expect(text.trim()).equal(expected);
    });

    row = checkYourAnswersPage.summaryLists.deal[MULTI_POLICY_LENGTH];

    row.value().invoke('text').then((text) => {
      const expected = '10 months';

      expect(text.trim()).equal(expected);
    });
  });

  describe('change `Policy type` and `Policy length` for a second time', () => {
    row = checkYourAnswersPage.summaryLists.deal[MULTI_POLICY_TYPE];

    before(() => {
      row.changeLink().click();

      const expectedUrl = `${ROUTES.TELL_US_ABOUT_YOUR_DEAL_CHANGE}#${MULTI_POLICY_TYPE}`;
      cy.url().should('include', expectedUrl);
    });

    it('has previously submitted `policy type` (multi)', () => {
      tellUsAboutYourDealPage[POLICY_TYPE].multi.input().should('be.checked');
    });

    it('auto focuses the input', () => {
      tellUsAboutYourDealPage[POLICY_TYPE].multi.input().should('have.focus');
    });

    it('has previously submitted `policy length` (10 months)', () => {
      tellUsAboutYourDealPage[MULTI_POLICY_LENGTH].input().should('have.attr', 'value', '10');
    });

    it(`redirects to ${ROUTES.CHECK_YOUR_ANSWERS} when submitting new answers`, () => {
      tellUsAboutYourDealPage[POLICY_TYPE].single.input().click();
      tellUsAboutYourDealPage[SINGLE_POLICY_LENGTH].input().clear().type('15');
      tellUsAboutYourDealPage.submitButton().click();

      cy.url().should('include', ROUTES.CHECK_YOUR_ANSWERS);
    });

    it('renders the new answers in `Check your answers` page (single policy, 15 months)', () => {
      row = checkYourAnswersPage.summaryLists.deal[SINGLE_POLICY_TYPE];

      row.value().invoke('text').then((text) => {
        const expected = FIELD_VALUES.POLICY_TYPE.SINGLE;

        expect(text.trim()).equal(expected);
      });

      row = checkYourAnswersPage.summaryLists.deal[SINGLE_POLICY_LENGTH];

      row.value().invoke('text').then((text) => {
        const expected = '15 months';

        expect(text.trim()).equal(expected);
      });
    });
  });
});

describe('change only `Policy length` (single policy type)', () => {
  const row = checkYourAnswersPage.summaryLists.deal[SINGLE_POLICY_LENGTH];

  before(() => {
    row.changeLink().click();

    const expectedUrl = `${ROUTES.TELL_US_ABOUT_YOUR_DEAL_CHANGE}#${SINGLE_POLICY_LENGTH}`;
    cy.url().should('include', expectedUrl);
  });

  it('auto focuses the input', () => {
    tellUsAboutYourDealPage[SINGLE_POLICY_LENGTH].input().should('have.focus');
  });

  it(`redirects to ${ROUTES.CHECK_YOUR_ANSWERS} when submitting new answers`, () => {
    tellUsAboutYourDealPage[POLICY_TYPE].single.input().click();
    tellUsAboutYourDealPage[SINGLE_POLICY_LENGTH].input().clear().type('15');
    tellUsAboutYourDealPage.submitButton().click();

    cy.url().should('include', ROUTES.CHECK_YOUR_ANSWERS);
  });
});

describe('change only `Policy length` (multi policy type)', () => {
  let row;

  before(() => {
    // change back to multi policy
    row = checkYourAnswersPage.summaryLists.deal[SINGLE_POLICY_TYPE];
    row.changeLink().click();

    tellUsAboutYourDealPage[POLICY_TYPE].multi.input().click();
    tellUsAboutYourDealPage.submitButton().click();

    // click `change` (policy length)
    row = checkYourAnswersPage.summaryLists.deal[MULTI_POLICY_LENGTH];
    row.changeLink().click();

    const expectedUrl = `${ROUTES.TELL_US_ABOUT_YOUR_DEAL_CHANGE}#${MULTI_POLICY_LENGTH}`;
    cy.url().should('include', expectedUrl);
  });

  it('auto focuses the input', () => {
    tellUsAboutYourDealPage[MULTI_POLICY_LENGTH].input().should('have.focus');
  });

  it(`redirects to ${ROUTES.CHECK_YOUR_ANSWERS} when submitting new answers`, () => {
    tellUsAboutYourDealPage[POLICY_TYPE].multi.input().click();
    tellUsAboutYourDealPage[MULTI_POLICY_LENGTH].input().clear().type('10');
    tellUsAboutYourDealPage.submitButton().click();

    cy.url().should('include', ROUTES.CHECK_YOUR_ANSWERS);
  });
});
