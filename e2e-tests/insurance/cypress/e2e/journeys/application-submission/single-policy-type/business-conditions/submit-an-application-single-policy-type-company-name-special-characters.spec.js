import { COMPANIES_HOUSE_NUMBER_SPECIAL_CHARACTERS_NAME } from '../../../../../../../constants/examples/companies-house-number-examples';

context('Insurance - submit an application - Single policy - Company name with special characters', () => {
  let referenceNumber;

  before(() => {
    cy.completeSignInAndSubmitAnApplication({
      createApplicationViaApi: false,
      companyNumber: COMPANIES_HOUSE_NUMBER_SPECIAL_CHARACTERS_NAME,
    }).then((refNumber) => {
      referenceNumber = refNumber;
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it('should successfully submit the application and redirect to `application submitted`', () => {
    cy.assertApplicationSubmittedUrl(referenceNumber);
  });
});
