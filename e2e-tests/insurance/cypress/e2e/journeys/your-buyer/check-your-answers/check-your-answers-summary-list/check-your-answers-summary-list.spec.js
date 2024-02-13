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
      },
      CONNECTION_WITH_BUYER,
      CONNECTION_WITH_BUYER_DESCRIPTION,
    },
  },
} = FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Your buyer - Check your answers - Summary list - your buyer', () => {
  let referenceNumber;
  let url;

  describe(`${CONNECTION_WITH_BUYER} as no`, () => {
    before(() => {
      cy.deleteAccount();

      cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
        referenceNumber = refNumber;

        cy.startInsuranceYourBuyerSection({});

        cy.completeAndSubmitCompanyOrOrganisationForm({});
        cy.completeAndSubmitConnectionToTheBuyerForm({});
        cy.completeAndSubmitTradedWithBuyerForm({});
        cy.completeAndSubmitBuyerFinancialInformationForm({});

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

    it(`should render a ${CONNECTION_WITH_BUYER} summary list row`, () => {
      checkSummaryList[CONNECTION_WITH_BUYER]();
    });

    it(`should not render a ${CONNECTION_WITH_BUYER_DESCRIPTION} summary list row`, () => {
      checkSummaryList[CONNECTION_WITH_BUYER_DESCRIPTION]({ shouldRender: false });
    });

    // TODO: EMS-2628
    // it(`should render a ${TRADED_WITH_BUYER} summary list row`, () => {
    //   checkSummaryList[TRADED_WITH_BUYER]();
    // });
  });

  describe(`${CONNECTION_WITH_BUYER} as yes`, () => {
    before(() => {
      cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
        referenceNumber = refNumber;

        cy.startInsuranceYourBuyerSection({});

        cy.completeAndSubmitCompanyOrOrganisationForm({});
        cy.completeAndSubmitConnectionToTheBuyerForm({ hasConnectionToBuyer: true });
        cy.completeAndSubmitTradedWithBuyerForm({});

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

    it(`should render a ${CONNECTION_WITH_BUYER_DESCRIPTION} summary list row`, () => {
      checkSummaryList[CONNECTION_WITH_BUYER_DESCRIPTION]({});
    });
  });
});
