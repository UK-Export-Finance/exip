import { headingCaption, singleInputField } from '../../../../../../pages/shared';
import { confidentialityPage } from '../../../../../../pages/insurance/declarations';
import partials from '../../../../../../partials';
import { PAGES, ERROR_MESSAGES } from '../../../../../../content-strings';
import { DECLARATIONS_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/declarations';
import { FIELD_IDS } from '../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const { taskList } = partials.insurancePartials;

const CONTENT_STRINGS = PAGES.INSURANCE.DECLARATIONS.CONFIDENTIALITY;

const [LATEST_VERSION] = CONTENT_STRINGS.VERSIONS;

const {
  ROOT: INSURANCE_ROOT,
  ALL_SECTIONS,
  DECLARATIONS: { CONFIDENTIALITY, ANTI_BRIBERY: { ROOT: ANTI_BRIBERY_ROOT } },
} = INSURANCE_ROUTES;

const FIELD_ID = FIELD_IDS.INSURANCE.DECLARATIONS.AGREE_CONFIDENTIALITY;

const field = singleInputField(FIELD_ID);

context('Insurance - Declarations - Confidentiality page - As an Exporter, I want to make confidentiality declaration for my export insurance application, So that UKEF can be assured of my agreement with regards to confidentiality while processing my export insurance application', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType({ referenceNumber });

      // go to the page we want to test.
      taskList.submitApplication.tasks.declarationsAndSubmit.link().click();

      url = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${CONFIDENTIALITY}`;

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
      currentHref: `${INSURANCE_ROOT}/${referenceNumber}${CONFIDENTIALITY}`,
      backLink: `${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`,
      lightHouseThresholds: {
        accessibility: 98,
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

    describe('latest confidentiality content', () => {
      const listContent = LATEST_VERSION.LIST;

      const {
        intro,
        level1,
        level2,
        level3,
      } = confidentialityPage.listItems;

      it('renders an intro paragraph', () => {
        cy.checkText(intro(), LATEST_VERSION.INTRO);
      });

      it('renders level 1 list items', () => {
        const level1Content = listContent;

        cy.checkText(level1.item1(), level1Content[0].text);
        cy.checkText(level1.item2(), level1Content[1].text);
        cy.checkText(level1.item3(), level1Content[2].text);
      });

      it('renders level 2 list items', () => {
        const level2Content = listContent[0].children;

        cy.checkText(level2.item1(), level2Content[0].text);
        cy.checkText(level2.item2(), level2Content[1].text);
        cy.checkText(level2.item3(), level2Content[2].text);
        cy.checkText(level2.item4(), level2Content[3].text);
      });

      it('renders level 3 list items', () => {
        const level3Content = listContent[0].children[3].children;

        cy.checkText(level3.item1(), level3Content[0].text);
        cy.checkText(level3.item2(), level3Content[1].text);
      });
    });

    it("renders `I've read and agree` label and input", () => {
      field.input().should('exist');
      cy.checkText(field.label(), FIELDS[FIELD_ID].LABEL);

      field.input().should('exist');
    });

    it('renders a submit button and `save and back` button', () => {
      cy.assertSubmitAndSaveButtons();
    });
  });

  describe('form submission', () => {
    describe('when submitting an empty form', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it('should render a validation error', () => {
        const expectedErrorsCount = 1;

        cy.submitAndAssertRadioErrors(
          field,
          0,
          expectedErrorsCount,
          ERROR_MESSAGES.INSURANCE.DECLARATIONS[FIELD_ID].IS_EMPTY,
          false,
        );
      });
    });

    describe('when submitting a fully completed form', () => {
      it(`should redirect to ${ANTI_BRIBERY_ROOT}`, () => {
        cy.navigateToUrl(url);

        cy.completeAndSubmitDeclarationConfidentiality();

        const expectedUrl = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${ANTI_BRIBERY_ROOT}`;

        cy.assertUrl(expectedUrl);
      });

      describe('when going back to the page', () => {
        it('should have the submitted value', () => {
          cy.navigateToUrl(url);

          cy.completeAndSubmitDeclarationConfidentiality();

          cy.navigateToUrl(url);

          field.input().should('be.checked');
        });
      });
    });
  });
});
