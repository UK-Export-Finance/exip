import partials from '../../../../../../partials';
import { field as fieldSelector } from '../../../../../../pages/shared';
import { PAGES } from '../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';

const {
  ROOT,
  EXPORTER_BUSINESS: { ENTER_COMPANIES_HOUSE_NUMBER },
} = INSURANCE_ROUTES;

const CONTENT_STRINGS = PAGES.INSURANCE.EXPORTER_BUSINESS.ENTER_COMPANIES_HOUSE_NUMBER;

const {
  ELIGIBILITY: { COMPANIES_HOUSE_NUMBER: FIELD_ID },
} = INSURANCE_FIELD_IDS;

const field = fieldSelector(FIELD_ID);

const baseUrl = Cypress.config('baseUrl');

context(
  'Insurance - Your business - Enter Companies House number - As an Exporter, I want to enter my Companies House number, So that I can apply for credit insurance with UKEF',
  () => {
    let referenceNumber;
    let url;

    before(() => {
      cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
        referenceNumber = refNumber;

        cy.startYourBusinessSection({});

        url = `${baseUrl}${ROOT}/${referenceNumber}${ENTER_COMPANIES_HOUSE_NUMBER}`;

        cy.navigateToUrl(url);

        cy.assertUrl(url);
      });
    });

    beforeEach(() => {
      cy.saveSession();
    });

    after(() => {
      cy.deleteApplication(referenceNumber);
    });

    it('renders core page elements', () => {
      cy.corePageChecks({
        pageTitle: CONTENT_STRINGS.PAGE_TITLE,
        currentHref: `${ROOT}/${referenceNumber}${ENTER_COMPANIES_HOUSE_NUMBER}`,
        backLink: `${ROOT}/${referenceNumber}${ENTER_COMPANIES_HOUSE_NUMBER}#`,
      });
    });

    describe('page tests', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it('renders a heading caption', () => {
        cy.checkText(partials.headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
      });

      it(`should render a ${FIELD_ID} input`, () => {
        field.input().should('exist');
      });
    });
  },
);
