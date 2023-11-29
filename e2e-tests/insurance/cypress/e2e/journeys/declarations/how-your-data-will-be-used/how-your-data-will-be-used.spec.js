import { headingCaption, singleInputField } from '../../../../../../pages/shared';
import { howYourDataWillBeUsedPage } from '../../../../../../pages/insurance/declarations';
import partials from '../../../../../../partials';
import {
  BUTTONS, PAGES, ERROR_MESSAGES, LINKS,
} from '../../../../../../content-strings';
import { DECLARATIONS_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/declarations';
import { FIELD_IDS } from '../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

import api from '../../../../../../commands/api';
import flattenKeystoneDocument from '../../../../../../commands/flatten-keystone-document';

const { taskList } = partials.insurancePartials;

const CONTENT_STRINGS = PAGES.INSURANCE.DECLARATIONS.HOW_YOUR_DATA_WILL_BE_USED;

const {
  ROOT: INSURANCE_ROOT,
  DECLARATIONS: {
    CONFIRMATION_AND_ACKNOWLEDGEMENTS,
    HOW_YOUR_DATA_WILL_BE_USED,
  },
  APPLICATION_SUBMITTED,
} = INSURANCE_ROUTES;

const FIELD_ID = FIELD_IDS.INSURANCE.DECLARATIONS.AGREE_HOW_YOUR_DATA_WILL_BE_USED;

const baseUrl = Cypress.config('baseUrl');

const field = singleInputField(FIELD_ID);

context('Insurance - Declarations - How your data will be used page - As an Exporter, I want to have details of how my credit insurance application data will be used, So that I can determine if I am okay with the use of my application in that format', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType({ referenceNumber });

      cy.completeAndSubmitCheckYourAnswers();

      // go to the page we want to test.
      taskList.submitApplication.tasks.declarationsAndSubmit.link().click();

      cy.completeAndSubmitDeclarationConfidentiality();
      cy.completeAndSubmitDeclarationAntiBribery();
      cy.completeAndSubmitDeclarationAntiBriberyCodeOfConduct();
      cy.completeAndSubmitDeclarationAntiBriberyExportingWithCodeOfConduct();
      cy.completeAndSubmitDeclarationConfirmationAndAcknowledgements();

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${HOW_YOUR_DATA_WILL_BE_USED}`;

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
      currentHref: `${INSURANCE_ROOT}/${referenceNumber}${CONFIRMATION_AND_ACKNOWLEDGEMENTS}`,
      backLink: `${INSURANCE_ROOT}/${referenceNumber}${HOW_YOUR_DATA_WILL_BE_USED}`,
      assertBackLink: false,
      submitButtonCopy: BUTTONS.SUBMIT_APPLICATION,
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
      let content;

      const {
        paragraph,
        link,
      } = howYourDataWillBeUsedPage;

      before(() => {
        api.declarations.getLatestHowDataWillBeUsed().then((data) => {
          content = flattenKeystoneDocument(data.content.document);
        });
      });

      it('renders paragraphs', () => {
        cy.checkText(paragraph(1), content[0].text);
        cy.checkText(paragraph(2), content[1].text);
        cy.checkText(paragraph(3), content[2].text);
      });

      it('renders a link', () => {
        cy.checkLink(link(3, 1), LINKS.EXTERNAL.ICO_MAKE_A_COMPLAINT, content[3].text);
      });
    });

    it("renders `I've read and agree` label and input", () => {
      cy.checkText(field.label(), FIELDS[FIELD_ID].LABEL);

      field.input().should('exist');
    });

    it('renders a submit button and `save and back` button', () => {
      cy.assertSubmitAndSaveButtons(BUTTONS.SUBMIT_APPLICATION);
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
          singleInputField(FIELD_ID),
          0,
          expectedErrorsCount,
          ERROR_MESSAGES.INSURANCE.DECLARATIONS[FIELD_ID].IS_EMPTY,
          false,
        );
      });
    });

    describe('when submitting a fully completed form', () => {
      it(`should redirect to ${APPLICATION_SUBMITTED}`, () => {
        cy.navigateToUrl(url);

        cy.completeAndSubmitDeclarationHowYourDataWillBeUsed();

        const expectedUrl = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${APPLICATION_SUBMITTED}`;

        cy.assertUrl(expectedUrl);
      });
    });
  });
});
