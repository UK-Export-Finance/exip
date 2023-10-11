import partials from '../../../../../../../partials';
import { FIELD_IDS, ROUTES } from '../../../../../../../constants';
import checkSummaryList from '../../../../../../../commands/insurance/check-your-buyer-summary-list';

const {
  ROOT,
  YOUR_BUYER: {
    CHECK_YOUR_ANSWERS,
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

const task = taskList.prepareApplication.tasks.buyer;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Your buyer - Check your answers - Summary list - your buyer', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.deleteAccount();

    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      task.link().click();

      cy.completeAndSubmitCompanyOrOrganisationForm({});
      cy.completeAndSubmitWorkingWithBuyerForm({});

      url = `${baseUrl}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
    });
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it(`should render a ${NAME} summary list row`, () => {
    checkSummaryList[NAME]({});
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
