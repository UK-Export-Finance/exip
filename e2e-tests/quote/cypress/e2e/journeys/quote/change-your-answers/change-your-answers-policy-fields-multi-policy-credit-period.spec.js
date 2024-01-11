import { backLink, summaryList } from '../../../../../../pages/shared';
import {
  tellUsAboutYourPolicyPage,
} from '../../../../../../pages/quote';
import { FIELD_IDS, ROUTES } from '../../../../../../constants';
import { LINKS } from '../../../../../../content-strings';

const { ELIGIBILITY: { CREDIT_PERIOD } } = FIELD_IDS;

const {
  QUOTE: {
    CHECK_YOUR_ANSWERS,
    TELL_US_ABOUT_YOUR_POLICY_CHANGE,
  },
} = ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Change your answers (policy credit period field) - as an exporter, I want to change the details before submitting the proposal', () => {
  const url = `${baseUrl}${CHECK_YOUR_ANSWERS}`;

  before(() => {
    cy.login();
    cy.submitQuoteAnswersHappyPathMultiplePolicy();
    cy.assertUrl(url);
  });

  let row = summaryList.field(CREDIT_PERIOD);

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);

    row.changeLink().click();
  });

  it(`clicking 'change' redirects to ${TELL_US_ABOUT_YOUR_POLICY_CHANGE} with a hash tag and label ID in the URL so that the element gains focus and user has context of what they want to change`, () => {
    const expectedUrl = `${baseUrl}${TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${CREDIT_PERIOD}-label`;
    cy.assertUrl(expectedUrl);
  });

  it('renders a back link with correct url', () => {
    const expectedHref = `${baseUrl}${CHECK_YOUR_ANSWERS}`;

    cy.checkLink(
      backLink(),
      expectedHref,
      LINKS.BACK,
    );
  });

  it('has originally submitted answer', () => {
    const firstOption = tellUsAboutYourPolicyPage[CREDIT_PERIOD].inputOption().eq(0);
    firstOption.should('have.attr', 'selected', 'selected');

    const secondOption = tellUsAboutYourPolicyPage[CREDIT_PERIOD].inputOption().eq(1);
    secondOption.should('not.have.attr', 'selected');
  });

  it(`redirects to ${CHECK_YOUR_ANSWERS} when submitting a new answer`, () => {
    tellUsAboutYourPolicyPage[CREDIT_PERIOD].input().select('2');

    cy.clickSubmitButton();

    const expectedUrl = `${baseUrl}${CHECK_YOUR_ANSWERS}#${CREDIT_PERIOD}-label`;

    cy.assertUrl(expectedUrl);
  });

  it('renders the new answer in `Check your answers` page', () => {
    cy.clickSubmitButton();

    row = summaryList.field(CREDIT_PERIOD);

    const expected = '2 months';
    cy.checkText(row.value(), expected);
  });
});
