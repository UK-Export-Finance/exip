import { headingCaption, saveAndBackButton } from '../../../../pages/shared';
import { antiBriberyPage } from '../../../../pages/insurance/declarations';
import partials from '../../../../partials';
import { BUTTONS, PAGES } from '../../../../../../content-strings';
import { DECLARATIONS_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/declarations';
import { FIELD_IDS } from '../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

import api from '../../../../../support/api';
import mapKeystoneDocument from '../../../../../support/map-keystone-document';

const { taskList } = partials.insurancePartials;

const CONTENT_STRINGS = PAGES.INSURANCE.DECLARATIONS.ANTI_BRIBERY;

const {
  ROOT: INSURANCE_ROOT,
  DECLARATIONS: {
    CONFIDENTIALITY,
    ANTI_BRIBERY: {
      ROOT: ANTI_BRIBERY_ROOT,
    },
  },
} = INSURANCE_ROUTES;

const FIELD_ID = FIELD_IDS.INSURANCE.DECLARATIONS.AGREE_ANTI_BRIBERY;

context('Insurance - Declarations - Anti-bribery page - As an Exporter, I want the system to provide the details of the anti-bribery and corruption declaration for my export insurance application, So that, while processing my export insurance application. I have clarity on my anti-bribery and corruption declarations', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication().then((refNumber) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType();

      // go to the page we want to test.
      taskList.submitApplication.tasks.declarations.link().click();

      cy.completeAndSubmitDeclarationConfidentiality();

      url = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${ANTI_BRIBERY_ROOT}`;

      cy.url().should('eq', url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteAccount();
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: `${INSURANCE_ROOT}/${referenceNumber}${ANTI_BRIBERY_ROOT}`,
      backLink: `${INSURANCE_ROOT}/${referenceNumber}${CONFIDENTIALITY}`,
    });
  });

  describe('page tests', () => {
    let field;

    beforeEach(() => {
      cy.navigateToUrl(url);

      field = antiBriberyPage[FIELD_ID];
    });

    it('renders a heading caption', () => {
      cy.checkText(headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
    });

    describe('latest confidentiality content', () => {
      let content;

      const {
        intro,
        level1,
        firstLevel2,
        secondLevel2,
      } = antiBriberyPage.listItems;

      before(() => {
        api.declarations.getLatestAntiBribery().then((data) => {
          content = mapKeystoneDocument(data.content.document);
        });
      });

      it('renders an intro paragraph', () => {
        cy.checkText(intro(), content[0].text);
      });

      it('renders level 1 list items', () => {
        cy.checkText(level1.item(1), content[1].text);
        cy.checkText(level1.item(2), content[2].text);
        cy.checkText(level1.item(3), content[3].text);

        cy.checkText(level1.item(4), content[7].text);
        cy.checkText(level1.item(5), content[8].text);
        cy.checkText(level1.item(6), content[9].text);
        cy.checkText(level1.item(7), content[10].text);

        cy.checkText(level1.item(8), content[14].text);
        cy.checkText(level1.item(9), content[15].text);
      });

      it('renders level 2 list items', () => {
        cy.checkText(firstLevel2.item(1), content[4].text);
        cy.checkText(firstLevel2.item(2), content[5].text);
        cy.checkText(firstLevel2.item(3), content[6].text);

        cy.checkText(secondLevel2.item(1), content[11].text);
        cy.checkText(secondLevel2.item(2), content[12].text);
        cy.checkText(secondLevel2.item(3), content[13].text);
      });
    });

    it("renders `I've read and agree` label and input", () => {
      field.label().should('exist');
      cy.checkText(field.label(), FIELDS[FIELD_ID].LABEL);

      field.input().should('exist');
    });

    it('renders a `save and back` button', () => {
      saveAndBackButton().should('exist');

      cy.checkText(saveAndBackButton(), BUTTONS.SAVE_AND_BACK);
    });
  });
});
