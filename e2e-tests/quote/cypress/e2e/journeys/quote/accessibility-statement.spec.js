import { accessibilityStatementPage } from '../../../../../pages';
import partials from '../../../../../partials';
import { PAGES } from '../../../../../content-strings';
import { ROUTES } from '../../../../../constants';

const {
  usingOurService,
  feedbackAndContact,
  reportingProblems,
  enforcementProcedure,
  technicalInfo,
  complianceStatus,
  improvingAccessibility,
  preperationOfStatement,
} = accessibilityStatementPage;

const CONTENT_STRINGS = PAGES.ACCESSIBILITY_STATEMENT_PAGE;

const {
  USING_OUR_SERVICE,
  FEEDBACK_AND_CONTACT,
  REPORTING_PROBLEMS,
  ENFORCEMENT_PROCEDURE,
  TECHNICAL_INFO,
  COMPLIANCE_STATUS,
  IMPROVING_ACCESSIBILITY,
  PREPERATION_OF_STATEMENT,
} = CONTENT_STRINGS;

const baseUrl = Cypress.config('baseUrl');

context('Accessibility statement page - Quote', () => {
  beforeEach(() => {
    cy.login();

    partials.footer.supportLinks.accessibilityStatement().click();
    cy.assertUrl(`${baseUrl}${ROUTES.ACCESSIBILITY_STATEMENT}`);

    cy.saveSession();
  });

  it('renders core page elements', () => {
    cy.clearCookies();

    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: ROUTES.ACCESSIBILITY_STATEMENT,
      backLink: ROUTES.QUOTE.BUYER_COUNTRY,
      hasAForm: false,
      assertAuthenticatedHeader: false,
      isInsurancePage: false,
    });
  });

  describe('using our service', () => {
    it('renders a heading', () => {
      cy.checkText(usingOurService.heading(), USING_OUR_SERVICE.HEADING);
    });

    it('renders an intro', () => {
      cy.checkText(usingOurService.intro(), USING_OUR_SERVICE.INTRO);
    });

    it('renders a list', () => {
      cy.checkText(usingOurService.listItem1(), USING_OUR_SERVICE.LIST[0]);
      cy.checkText(usingOurService.listItem2(), USING_OUR_SERVICE.LIST[1]);
      cy.checkText(usingOurService.listItem3(), USING_OUR_SERVICE.LIST[2]);
      cy.checkText(usingOurService.listItem4(), USING_OUR_SERVICE.LIST[3]);
      cy.checkText(usingOurService.listItem5(), USING_OUR_SERVICE.LIST[4]);
    });

    describe('outro', () => {
      it('renders AbilityNet link and outro copy', () => {
        cy.checkLink(
          usingOurService.abilityNet.link(),
          USING_OUR_SERVICE.OUTRO.ABILITY_NET.LINK.HREF,
          USING_OUR_SERVICE.OUTRO.ABILITY_NET.LINK.TEXT,
        );

        cy.checkText(usingOurService.abilityNet.outro(), USING_OUR_SERVICE.OUTRO.ABILITY_NET.DESCRIPTION);
      });
    });
  });

  describe('compliance status', () => {
    it('renders a heading', () => {
      cy.checkText(complianceStatus.heading(), COMPLIANCE_STATUS.HEADING);
    });

    it('renders an intro', () => {
      cy.checkText(complianceStatus.intro(), COMPLIANCE_STATUS.INTRO);
    });

    it('renders a link', () => {
      cy.checkLink(
        complianceStatus.link(),
        COMPLIANCE_STATUS.GUIDLINES_LINK.HREF,
        COMPLIANCE_STATUS.GUIDLINES_LINK.TEXT,
      );
    });

    it('renders an outro', () => {
      cy.checkText(complianceStatus.outro(), COMPLIANCE_STATUS.OUTRO);
    });

    it('renders a list', () => {
      cy.checkText(complianceStatus.listItem1(), `${COMPLIANCE_STATUS.LIST[0]} ${COMPLIANCE_STATUS.LIST[1]}`);
      cy.checkText(complianceStatus.listItem2(), `${COMPLIANCE_STATUS.LIST[2]} ${COMPLIANCE_STATUS.LIST[3]}`);
    });
  });

  describe('feedback and contact', () => {
    it('renders a heading', () => {
      cy.checkText(feedbackAndContact.heading(), FEEDBACK_AND_CONTACT.HEADING);
    });

    it('renders an intro', () => {
      cy.checkText(feedbackAndContact.intro(), FEEDBACK_AND_CONTACT.INTRO);
    });

    it('renders an outro', () => {
      cy.checkText(feedbackAndContact.outro(), FEEDBACK_AND_CONTACT.OUTRO);
    });

    it('renders a list', () => {
      cy.checkText(feedbackAndContact.listItem1(), FEEDBACK_AND_CONTACT.LIST[0]);
      cy.checkText(feedbackAndContact.listItem2(), FEEDBACK_AND_CONTACT.LIST[1]);
    });
  });

  describe('reporting problems', () => {
    it('renders a heading', () => {
      cy.checkText(reportingProblems.heading(), REPORTING_PROBLEMS.HEADING);
    });

    it('renders an description', () => {
      cy.checkText(reportingProblems.description(), REPORTING_PROBLEMS.DESCRIPTION);
    });
  });

  describe('enforcement procedure', () => {
    it('renders a heading', () => {
      cy.checkText(enforcementProcedure.heading(), ENFORCEMENT_PROCEDURE.HEADING);
    });

    it('renders an description', () => {
      cy.checkText(enforcementProcedure.description(), ENFORCEMENT_PROCEDURE.DESCRIPTION);
    });

    it('renders a link', () => {
      cy.checkLink(
        enforcementProcedure.link(),
        ENFORCEMENT_PROCEDURE.CONTACT.HREF,
        ENFORCEMENT_PROCEDURE.CONTACT.TEXT,
      );
    });
  });

  describe('technical info', () => {
    it('renders a heading', () => {
      cy.checkText(technicalInfo.heading(), TECHNICAL_INFO.HEADING);
    });

    it('renders an description', () => {
      cy.checkText(technicalInfo.description(), TECHNICAL_INFO.DESCRIPTION);
    });
  });

  describe('improving accessibility', () => {
    it('renders a heading', () => {
      cy.checkText(improvingAccessibility.heading(), IMPROVING_ACCESSIBILITY.HEADING);
    });

    it('renders an description', () => {
      cy.checkText(improvingAccessibility.description(), IMPROVING_ACCESSIBILITY.DESCRIPTION);
    });
  });

  describe('preperation of statement', () => {
    it('renders a heading', () => {
      cy.checkText(preperationOfStatement.heading(), PREPERATION_OF_STATEMENT.HEADING);
    });

    it('renders a list', () => {
      cy.checkText(preperationOfStatement.listItem1(), PREPERATION_OF_STATEMENT.LIST[0]);
      cy.checkText(preperationOfStatement.listItem2(), PREPERATION_OF_STATEMENT.LIST[1]);
    });
  });
});
