import { yesRadio, noRadio } from '../../../../../../pages/shared';
import { memberOfAGroup } from '../../../../../../partials';
import { PAGES, MEMBER_OF_A_GROUP_DESCRIPTION, ERROR_MESSAGES } from '../../../../../../content-strings';
import { FIELD_VALUES } from '../../../../../../constants';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const CONTENT_STRINGS = PAGES.INSURANCE.ELIGIBILITY.MEMBER_OF_A_GROUP;

const {
  ELIGIBILITY: { IS_MEMBER_OF_A_GROUP: FIELD_ID },
} = INSURANCE_FIELD_IDS;

const {
  ELIGIBILITY: { PARTY_TO_CONSORTIUM, MEMBER_OF_A_GROUP, CHECK_YOUR_ANSWERS, MEMBER_OF_A_GROUP_EXIT },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context(
  'Insurance - Member of a group page - As a legal adviser, I want to know whether an Exporter was a member of a Group when they procured the export contract So that I know whether other parties are involved in the obtaining of the export contract',
  () => {
    const url = `${baseUrl}${MEMBER_OF_A_GROUP}`;

    before(() => {
      cy.completeAndSubmitEligibilityForms({ stopSubmittingAfter: 'partyToConsortium' });

      cy.assertUrl(url);
    });

    beforeEach(() => {
      cy.saveSession();
    });

    it('renders core page elements', () => {
      cy.corePageChecks({
        pageTitle: CONTENT_STRINGS.PAGE_TITLE,
        currentHref: MEMBER_OF_A_GROUP,
        backLink: PARTY_TO_CONSORTIUM,
        assertAuthenticatedHeader: false,
        assertSaveAndBackButtonDoesNotExist: true,
      });
    });

    describe('page tests', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it('renders `yes` radio button', () => {
        yesRadio().input().should('exist');

        cy.checkText(yesRadio().label(), FIELD_VALUES.YES);
      });

      it('renders `no` radio button', () => {
        cy.checkText(noRadio().label(), FIELD_VALUES.NO);

        cy.checkRadioInputNoAriaLabel(CONTENT_STRINGS.PAGE_TITLE);
      });

      describe(`expandable details - ${MEMBER_OF_A_GROUP_DESCRIPTION.INTRO}`, () => {
        it('renders summary text', () => {
          cy.checkText(memberOfAGroup.summary(), MEMBER_OF_A_GROUP_DESCRIPTION.INTRO);

          memberOfAGroup.details().should('not.have.attr', 'open');
        });

        describe('when clicking the summary text', () => {
          it('should expand the collapsed `details` content', () => {
            memberOfAGroup.summary().click();
            memberOfAGroup.details().should('have.attr', 'open');

            cy.checkText(memberOfAGroup.description(), MEMBER_OF_A_GROUP_DESCRIPTION.DESCRIPTION);
          });
        });
      });
    });

    describe('when submitting an empty form', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it('should render validation errors', () => {
        const expectedErrorsCount = 1;

        cy.submitAndAssertRadioErrors({
          field: yesRadio(FIELD_ID),
          expectedErrorsCount,
          expectedErrorMessage: ERROR_MESSAGES.INSURANCE.ELIGIBILITY[FIELD_ID].IS_EMPTY,
        });
      });
    });

    describe('when submitting the answer as `No`', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        cy.clickNoRadioInput();
        cy.clickSubmitButton();
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        const expectedUrl = `${baseUrl}${CHECK_YOUR_ANSWERS}`;

        cy.assertUrl(expectedUrl);
      });

      describe('when going back to the page', () => {
        it('should have the originally submitted answer selected', () => {
          cy.clickBackLink();

          cy.assertNoRadioOptionIsChecked();
        });
      });
    });

    describe('when submitting the answer as `yes`', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        cy.clickYesRadioInput();
        cy.clickSubmitButton();
      });

      it(`should redirect to ${MEMBER_OF_A_GROUP_EXIT}`, () => {
        const expectedUrl = `${baseUrl}${MEMBER_OF_A_GROUP_EXIT}`;

        cy.assertUrl(expectedUrl);
      });
    });
  },
);
