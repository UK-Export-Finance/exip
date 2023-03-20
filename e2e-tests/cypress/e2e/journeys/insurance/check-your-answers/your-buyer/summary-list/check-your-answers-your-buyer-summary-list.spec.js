import { submitButton } from '../../../../../pages/shared';
import partials from '../../../../../partials';
import { ROUTES, FIELD_IDS } from '../../../../../../../constants';
import checkSummaryList from '../../../../../../support/insurance/check-your-buyer-summary-list';

const {
  ROOT,
  CHECK_YOUR_ANSWERS: {
    YOUR_BUYER,
  },
} = ROUTES.INSURANCE;

const {
  INSURANCE: {
    YOUR_BUYER: {
      COMPANY_OR_ORGANISATION: {
        NAME,
        ADDRESS,
        REGISTRATION_NUMBER,
        WEBSITE,
        FIRST_NAME,
        CAN_CONTACT_BUYER,
      },
      WORKING_WITH_BUYER: {
        CONNECTED_WITH_BUYER,
        TRADED_WITH_BUYER,
      },
    },
  },
} = FIELD_IDS;

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswersAndSubmit;

context('Insurance - Check your answers - Your buyer - Summary list', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication().then((refNumber) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType();

      task.link().click();

      // to get past eligibility check your answers page
      submitButton().click();
      // to get past policy and exports check your answers page
      submitButton().click();
      // to get past your business check your answers page
      submitButton().click();

      url = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${YOUR_BUYER}`;

      cy.url().should('eq', url);
    });
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);
  });

  after(() => {
    cy.deleteAccount();
  });

  it(`should render a ${NAME} summary list row`, () => {
    checkSummaryList[NAME]();
  });

  it(`should render a ${ADDRESS} summary list row`, () => {
    checkSummaryList[ADDRESS]();
  });

  it(`should render a ${REGISTRATION_NUMBER} summary list row`, () => {
    checkSummaryList[REGISTRATION_NUMBER]();
  });

  it(`should render a ${WEBSITE} summary list row`, () => {
    checkSummaryList[WEBSITE]();
  });

  it(`should render a ${FIRST_NAME} summary list row`, () => {
    checkSummaryList[FIRST_NAME]();
  });

  it(`should render a ${CAN_CONTACT_BUYER} summary list row`, () => {
    checkSummaryList[CAN_CONTACT_BUYER]();
  });

  it(`should render a ${CONNECTED_WITH_BUYER} summary list row`, () => {
    checkSummaryList[CONNECTED_WITH_BUYER]();
  });

  it(`should render a ${TRADED_WITH_BUYER} summary list row`, () => {
    checkSummaryList[TRADED_WITH_BUYER]();
  });
});
