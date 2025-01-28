import { companyDetails } from '../../../../../../pages/your-business';
import { body, field, headingCaption, noRadioInput, yesRadioInput } from '../../../../../../pages/shared';
import { PAGES } from '../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import assertCompaniesHouseSummaryList from '../../../../../../commands/insurance/assert-companies-house-summary-list';

const {
  ROOT,
  EXPORTER_BUSINESS: { ROOT: EXPORTER_BUSINESS_ROOT, COMPANY_DETAILS_ROOT },
} = INSURANCE_ROUTES;

const CONTENT_STRINGS = PAGES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS;

const {
  EXPORTER_BUSINESS: {
    YOUR_COMPANY: { HAS_DIFFERENT_TRADING_ADDRESS, HAS_DIFFERENT_TRADING_NAME, WEBSITE, PHONE_NUMBER, DIFFERENT_TRADING_NAME },
  },
} = INSURANCE_FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context(
  'Insurance - Your business - Company details page - As an Exporter I want to my companies details So that I can apply for UKEF Export Insurance policy',
  () => {
    let referenceNumber;
    let url;

    before(() => {
      cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
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

    it('renders core page elements', () => {
      cy.corePageChecks({
        pageTitle: CONTENT_STRINGS.PAGE_TITLE,
        currentHref: `${ROOT}/${referenceNumber}${COMPANY_DETAILS_ROOT}`,
        backLink: `${ROOT}/${referenceNumber}${EXPORTER_BUSINESS_ROOT}`,
        lightHouseThresholds: {
          'best-practices': 93,
        },
      });
    });

    describe('page tests', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it('renders a heading caption', () => {
        cy.checkText(headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
      });

      it('should render body text', () => {
        cy.checkText(body(), CONTENT_STRINGS.BODY);
      });

      describe('companies house summary list', () => {
        it('should render `company number` key and value', () => {
          assertCompaniesHouseSummaryList.number();
        });

        it('should render `company name` key and value', () => {
          assertCompaniesHouseSummaryList.name({});
        });

        it('should render `company address` key and value', () => {
          assertCompaniesHouseSummaryList.address();
        });

        it('should render `company incorporated` key and value', () => {
          assertCompaniesHouseSummaryList.incorporated();
        });

        it('should render `company SIC codes` key and value', () => {
          assertCompaniesHouseSummaryList.sicCodes();
        });
      });

      it('should render the trading name radios', () => {
        cy.checkText(companyDetails[HAS_DIFFERENT_TRADING_NAME].label(), CONTENT_STRINGS.HAS_DIFFERENT_TRADING_NAME);

        cy.checkRadioInputYesAriaLabel(CONTENT_STRINGS.HAS_DIFFERENT_TRADING_NAME);

        cy.checkRadioInputNoAriaLabel(CONTENT_STRINGS.HAS_DIFFERENT_TRADING_NAME);
      });

      it(`should NOT display a conditional ${DIFFERENT_TRADING_NAME} input without selecting the trading name "yes" radio`, () => {
        field(DIFFERENT_TRADING_NAME).input().should('not.be.visible');
      });

      it(`should render a conditional ${DIFFERENT_TRADING_NAME} input when selecting the trading name "yes" radio`, () => {
        cy.clickYesRadioInput();

        field(DIFFERENT_TRADING_NAME).input().should('be.visible');

        cy.checkText(field(DIFFERENT_TRADING_NAME).label(), CONTENT_STRINGS.DIFFERENT_TRADING_NAME);
        cy.checkText(field(DIFFERENT_TRADING_NAME).hint(), CONTENT_STRINGS.DIFFERENT_TRADING_NAME_HINT);
      });

      it('should render the trading address radios', () => {
        cy.checkText(companyDetails[HAS_DIFFERENT_TRADING_ADDRESS].label(), CONTENT_STRINGS.HAS_DIFFERENT_TRADING_ADDRESS);

        cy.checkAriaLabel(yesRadioInput().eq(1), `${CONTENT_STRINGS.HAS_DIFFERENT_TRADING_ADDRESS} Yes`);

        cy.checkAriaLabel(noRadioInput().eq(1), `${CONTENT_STRINGS.HAS_DIFFERENT_TRADING_ADDRESS} No`);
      });

      it('should render the company website text input', () => {
        cy.checkText(field(WEBSITE).label(), CONTENT_STRINGS.WEBSITE);

        cy.checkAriaLabel(field(WEBSITE).input(), CONTENT_STRINGS.WEBSITE);
      });

      it('should render the phone number text input', () => {
        cy.checkText(field(PHONE_NUMBER).label(), CONTENT_STRINGS.PHONE_NUMBER);

        cy.checkText(field(PHONE_NUMBER).hint(), CONTENT_STRINGS.PHONE_NUMBER_HINT);

        cy.checkAriaLabel(field(PHONE_NUMBER).input(), CONTENT_STRINGS.PHONE_NUMBER);
      });
    });
  },
);
