import { confirmEmailPage } from '../../../pages/insurance/account/create';
import { INSURANCE_ROUTES as ROUTES } from '../../../constants/routes/insurance';
import { PAGES } from '../../../content-strings';

const CONTENT_STRINGS = PAGES.INSURANCE.ACCOUNT.CREATE.CONFIRM_EMAIL;

const { wrongEmail } = confirmEmailPage.havingProblems;

const { REQUEST_NEW, WRONG_EMAIL } = CONTENT_STRINGS.HAVING_PROBLEMS;

const { YOU_CAN, LINK, IF_NOT_RECEIVED } = REQUEST_NEW;
const { ENTERED_INCORRECTLY, CREATE_ACCOUNT_AGAIN } = WRONG_EMAIL;

const checkYourEmail = () => {
  const expected = CONTENT_STRINGS.CHECK_YOUR_EMAIL;

  cy.checkText(confirmEmailPage.checkYourEmail(), expected);
};

const havingProblemsSection = {
  heading: () => {
    const expected = CONTENT_STRINGS.HAVING_PROBLEMS.HEADING;

    cy.checkText(confirmEmailPage.havingProblems.heading(), expected);
  },
  requestNewLink: (accountId) => {
    cy.checkText(confirmEmailPage.havingProblems.requestNew.youCan(), YOU_CAN);

    cy.checkLink(
      confirmEmailPage.havingProblems.requestNew.link(),
      `${LINK.HREF}?id=${accountId}`,
      LINK.TEXT,
    );

    cy.checkText(confirmEmailPage.havingProblems.requestNew.ifNotReceived(), IF_NOT_RECEIVED);
  },
  enteredWrongEmail: () => {
    cy.checkText(confirmEmailPage.havingProblems.wrongEmail.enteredIncorrectly(), ENTERED_INCORRECTLY);
  },
  createAccountLink: () => {
    cy.checkLink(
      wrongEmail.createAccountAgainLink(),
      ROUTES.ACCOUNT.CREATE.YOUR_DETAILS,
      CREATE_ACCOUNT_AGAIN.TEXT,
    );
  },
};

export default (accountId) => {
  checkYourEmail();

  havingProblemsSection.heading();
  havingProblemsSection.requestNewLink(accountId);
  havingProblemsSection.enteredWrongEmail();
  havingProblemsSection.createAccountLink();
};
