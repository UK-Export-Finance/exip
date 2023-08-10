import { completeAndSubmitBuyerCountryForm } from '../../../../support/forms';
import {
  completeAndSubmitBuyerBodyForm,
  completeAndSubmitExporterLocationForm,
  completeAndSubmitUkContentForm,
} from '../../../../support/quote/forms';
import { submitButton } from '../../../pages/shared';
import { policyTypePage } from '../../../pages/quote';
import {
  LINKS,
  FIELDS,
  PAGES,
} from '../../../../../content-strings';
import { ROUTES, FIELD_IDS } from '../../../../../constants';

const CONTENT_STRINGS = PAGES.QUOTE.POLICY_TYPE;

const { POLICY_TYPE } = FIELD_IDS;

context('Policy type page - as an exporter, I want to get UKEF export insurance quote based on the export policy - provide policy type', () => {
  const url = ROUTES.QUOTE.POLICY_TYPE;

  before(() => {
    cy.login();

    completeAndSubmitBuyerCountryForm();
    completeAndSubmitBuyerBodyForm();
    completeAndSubmitExporterLocationForm();
    completeAndSubmitUkContentForm();

    cy.assertUrl(url);
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: ROUTES.QUOTE.POLICY_TYPE,
      backLink: ROUTES.QUOTE.UK_GOODS_OR_SERVICES,
      assertAuthenticatedHeader: false,
      isInsurancePage: false,
      lightHouseThresholds: {
        // accessibility threshold is reduced here because
        // the radio component from design system has an invalid aria attribute.
        // this is out of our control
        accessibility: 90,
      },
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('renders `policy type` radio inputs with labels and hints', () => {
      const fieldId = POLICY_TYPE;
      const field = policyTypePage[fieldId];

      field.single.input().should('exist');
      cy.checkText(field.single.label(), FIELDS[fieldId].OPTIONS.SINGLE.TEXT);

      cy.checkText(field.single.hint(), FIELDS[fieldId].OPTIONS.SINGLE.HINT);

      field.multiple.input().should('exist');
      cy.checkText(field.multiple.label(), FIELDS[fieldId].OPTIONS.MULTIPLE.TEXT);

      cy.checkText(field.multiple.hint(), FIELDS[fieldId].OPTIONS.MULTIPLE.HINT);
    });

    it('should not render policy length inputs by default', () => {
      const singlePolicyLength = policyTypePage[FIELD_IDS.SINGLE_POLICY_LENGTH];
      singlePolicyLength.input().should('not.be.visible');
    });

    describe('when clicking `single` policy type', () => {
      it('should reveal policy length input with label and hint', () => {
        const singlePolicyType = policyTypePage[POLICY_TYPE].single;
        singlePolicyType.label().click();

        const singlePolicyLengthId = FIELD_IDS.SINGLE_POLICY_LENGTH;
        const singlePolicyLength = policyTypePage[singlePolicyLengthId];

        singlePolicyLength.label().should('be.visible');
        singlePolicyLength.hint().should('be.visible');
        singlePolicyLength.input().should('be.visible');

        cy.checkText(singlePolicyLength.label(), FIELDS[singlePolicyLengthId].LABEL);

        singlePolicyLength.hint().invoke('text').then((text) => {
          expect(text.trim()).includes(FIELDS[singlePolicyLengthId].HINT[0][0].text);
          expect(text.trim()).includes(FIELDS[singlePolicyLengthId].HINT[0][1].text);
          expect(text.trim()).includes(FIELDS[singlePolicyLengthId].HINT[0][2].text);
        });

        const expectedHref = LINKS.EXTERNAL.NBI_FORM;
        const expectedText = FIELDS[singlePolicyLengthId].HINT[0][1].text;

        cy.checkLink(
          singlePolicyLength.hintLink(),
          expectedHref,
          expectedText,
        );
      });
    });

    describe('when clicking `multiple` policy type', () => {
      it('should reveal inset text and link', () => {
        const multiPolicyType = policyTypePage[POLICY_TYPE].multiple;
        multiPolicyType.label().click();

        const field = FIELDS[POLICY_TYPE];

        const [insetText] = field.OPTIONS.MULTIPLE.INSET;

        multiPolicyType.inset.text().invoke('text').then((text) => {
          expect(text.trim()).includes(insetText[0].text);
          expect(text.trim()).includes(insetText[1].text);
          expect(text.trim()).includes(insetText[2].text);
        });

        const expectedHref = LINKS.EXTERNAL.NBI_FORM;
        const expectedText = insetText[1].text;

        cy.checkLink(
          multiPolicyType.inset.link(),
          expectedHref,
          expectedText,
        );
      });
    });

    describe('when form is valid', () => {
      it(`should redirect to ${ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY}`, () => {
        policyTypePage[POLICY_TYPE].single.input().click();
        cy.keyboardInput(policyTypePage[FIELD_IDS.SINGLE_POLICY_LENGTH].input(), '8');

        submitButton().click();

        cy.assertUrl(ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY);
      });
    });
  });
});
