import { FIELD_IDS } from '../../../../../constants';
import partials from '../../../../../partials';
import dashboardPage from '../../../../../pages/insurance/dashboard';
import mockApplication from '../../../../../fixtures/application';
import mockNameWithSpecialCharacters from '../../../../../fixtures/name-with-special-characters';

const {
  INSURANCE: {
    YOUR_BUYER: {
      COMPANY_OR_ORGANISATION: { NAME: BUYER_NAME },
    },
  },
} = FIELD_IDS;

const { taskList } = partials.insurancePartials;

const nameWithSpecialCharacters = mockNameWithSpecialCharacters(mockApplication.BUYER[BUYER_NAME]);

context('Insurance - Name fields - Dashboard fields should render special characters without character codes after submission', () => {
  let referenceNumber;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      taskList.prepareApplication.tasks.buyer.link().click();

      cy.completeAndSubmitCompanyOrOrganisationForm({
        buyerName: nameWithSpecialCharacters,
      });

      partials.header.navigation.applications().click();
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it("should render special characters in the dashboard's buyer name field", () => {
    cy.checkText(
      dashboardPage.table.body.firstRow.buyerName(),
      nameWithSpecialCharacters,
    );
  });
});
