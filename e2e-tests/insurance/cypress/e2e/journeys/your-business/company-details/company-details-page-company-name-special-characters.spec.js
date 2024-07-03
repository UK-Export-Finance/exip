import { COMPANIES_HOUSE_NUMBER_SPECIAL_CHARACTERS_NAME } from '../../../../../../constants/examples/companies-house-number-examples';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import assertCompaniesHouseSummaryList from '../../../../../../commands/insurance/assert-companies-house-summary-list';

const {
  ROOT,
  EXPORTER_BUSINESS: { COMPANY_DETAILS_ROOT },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context(
  'Insurance - Your business - Company details page - Company name with special characters - As an Exporter I want to my companies details So that I can apply for UKEF Export Insurance policy',
  () => {
    let referenceNumber;
    let url;

    before(() => {
      cy.completeSignInAndGoToApplication({
        createApplicationViaApi: false,
        companyNumber: COMPANIES_HOUSE_NUMBER_SPECIAL_CHARACTERS_NAME,
      }).then(({ referenceNumber: refNumber }) => {
        referenceNumber = refNumber;

        cy.startYourBusinessSection({});

        url = `${baseUrl}${ROOT}/${referenceNumber}${COMPANY_DETAILS_ROOT}`;

        cy.assertUrl(url);
      });
    });

    beforeEach(() => {
      cy.saveSession();
    });

    after(() => {
      cy.deleteApplication(referenceNumber);
    });

    it('should render `company name` key and value', () => {
      assertCompaniesHouseSummaryList.name({ withSpecialCharacters: true });
    });
  },
);
