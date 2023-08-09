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
  SERVICE_LINK,
  USING_OUR_SERVICE,
  FEEDBACK_AND_CONTACT,
  REPORTING_PROBLEMS,
  ENFORCEMENT_PROCEDURE,
  TECHNICAL_INFO,
  COMPLIANCE_STATUS,
  IMPROVING_ACCESSIBILITY,
  PREPERATION_OF_STATEMENT,
} = CONTENT_STRINGS;

const startRoute = ROUTES.QUOTE.START;

context('Accessibility statement page - Quote', () => {
  beforeEach(() => {
    cy.login();

    partials.footer.supportLinks.accessibilityStatement().click();
    cy.assertUrl(`${Cypress.config('baseUrl')}${ROUTES.ACCESSIBILITY_STATEMENT}`);

    cy.saveSession();
  });

  it('renders core page elements', () => {
    cy.clearCookies();

    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: ROUTES.ACCESSIBILITY_STATEMENT,
      backLink: ROUTES.QUOTE.BUYER_COUNTRY,
      assertSubmitButton: false,
      assertAuthenticatedHeader: false,
      isInsurancePage: false,
    });
  });

  it('should render a header with href to quote start', () => {
    partials.header.serviceName().should('have.attr', 'href', startRoute);
  });

  it('renders a service link', () => {
    accessibilityStatementPage.serviceLink().invoke('text').then((text) => {
      expect(text.trim()).equal(SERVICE_LINK.TEXT);
    });

    accessibilityStatementPage.serviceLink().should('have.attr', 'href', SERVICE_LINK.HREF);
  });

  describe('using our service', () => {
    it('renders a heading', () => {
      usingOurService.heading().invoke('text').then((text) => {
        expect(text.trim()).equal(USING_OUR_SERVICE.HEADING);
      });
    });

    it('renders an intro', () => {
      usingOurService.intro().invoke('text').then((text) => {
        expect(text.trim()).equal(USING_OUR_SERVICE.INTRO);
      });
    });

    it('renders a list', () => {
      usingOurService.listItem1().invoke('text').then((text) => {
        expect(text.trim()).equal(USING_OUR_SERVICE.LIST[0]);
      });

      usingOurService.listItem2().invoke('text').then((text) => {
        expect(text.trim()).equal(USING_OUR_SERVICE.LIST[1]);
      });

      usingOurService.listItem3().invoke('text').then((text) => {
        expect(text.trim()).equal(USING_OUR_SERVICE.LIST[2]);
      });

      usingOurService.listItem4().invoke('text').then((text) => {
        expect(text.trim()).equal(USING_OUR_SERVICE.LIST[3]);
      });

      usingOurService.listItem5().invoke('text').then((text) => {
        expect(text.trim()).equal(USING_OUR_SERVICE.LIST[4]);
      });
    });

    describe('outro', () => {
      it('renders AbilityNet link and outro copy', () => {
        usingOurService.abilityNet.link().invoke('text').then((text) => {
          expect(text.trim()).equal(USING_OUR_SERVICE.OUTRO.ABILITY_NET.LINK.TEXT);
        });

        usingOurService.abilityNet.link().should('have.attr', 'href', USING_OUR_SERVICE.OUTRO.ABILITY_NET.LINK.HREF);

        usingOurService.abilityNet.outro().invoke('text').then((text) => {
          expect(text.trim()).equal(USING_OUR_SERVICE.OUTRO.ABILITY_NET.DESCRIPTION);
        });
      });
    });
  });

  describe('feedback and contact', () => {
    it('renders a heading', () => {
      feedbackAndContact.heading().invoke('text').then((text) => {
        expect(text.trim()).equal(FEEDBACK_AND_CONTACT.HEADING);
      });
    });

    it('renders an intro', () => {
      feedbackAndContact.intro().invoke('text').then((text) => {
        expect(text.trim()).equal(FEEDBACK_AND_CONTACT.INTRO);
      });
    });

    it('renders an outro', () => {
      feedbackAndContact.outro().invoke('text').then((text) => {
        expect(text.trim()).equal(FEEDBACK_AND_CONTACT.OUTRO);
      });
    });

    it('renders a list', () => {
      feedbackAndContact.listItem1().invoke('text').then((text) => {
        expect(text.trim()).equal(FEEDBACK_AND_CONTACT.LIST[0]);
      });

      feedbackAndContact.listItem2().invoke('text').then((text) => {
        expect(text.trim()).equal(FEEDBACK_AND_CONTACT.LIST[1]);
      });
    });
  });

  describe('reporting problems', () => {
    it('renders a heading', () => {
      reportingProblems.heading().invoke('text').then((text) => {
        expect(text.trim()).equal(REPORTING_PROBLEMS.HEADING);
      });
    });

    it('renders an description', () => {
      reportingProblems.description().invoke('text').then((text) => {
        expect(text.trim()).equal(REPORTING_PROBLEMS.DESCRIPTION);
      });
    });
  });

  describe('enforcement procedure', () => {
    it('renders a heading', () => {
      enforcementProcedure.heading().invoke('text').then((text) => {
        expect(text.trim()).equal(ENFORCEMENT_PROCEDURE.HEADING);
      });
    });

    it('renders an description', () => {
      enforcementProcedure.description().invoke('text').then((text) => {
        expect(text.trim()).equal(ENFORCEMENT_PROCEDURE.DESCRIPTION);
      });
    });

    it('renders a link', () => {
      enforcementProcedure.link().invoke('text').then((text) => {
        expect(text.trim()).equal(ENFORCEMENT_PROCEDURE.CONTACT.TEXT);
      });

      enforcementProcedure.link().should('have.attr', 'href', ENFORCEMENT_PROCEDURE.CONTACT.HREF);
    });
  });

  describe('technical info', () => {
    it('renders a heading', () => {
      technicalInfo.heading().invoke('text').then((text) => {
        expect(text.trim()).equal(TECHNICAL_INFO.HEADING);
      });
    });

    it('renders an description', () => {
      technicalInfo.description().invoke('text').then((text) => {
        expect(text.trim()).equal(TECHNICAL_INFO.DESCRIPTION);
      });
    });
  });

  describe('compliance status', () => {
    it('renders a heading', () => {
      complianceStatus.heading().invoke('text').then((text) => {
        expect(text.trim()).equal(COMPLIANCE_STATUS.HEADING);
      });
    });

    it('renders an intro', () => {
      complianceStatus.intro().invoke('text').then((text) => {
        expect(text.trim()).equal(COMPLIANCE_STATUS.INTRO);
      });
    });

    it('renders a link', () => {
      complianceStatus.link().invoke('text').then((text) => {
        expect(text.trim()).equal(COMPLIANCE_STATUS.GUIDLINES_LINK.TEXT);
      });

      complianceStatus.link().should('have.attr', 'href', COMPLIANCE_STATUS.GUIDLINES_LINK.HREF);
    });

    it('renders an outro', () => {
      complianceStatus.outro().invoke('text').then((text) => {
        expect(text.trim()).equal(COMPLIANCE_STATUS.OUTRO);
      });
    });
  });

  describe('improving accessibility', () => {
    it('renders a heading', () => {
      improvingAccessibility.heading().invoke('text').then((text) => {
        expect(text.trim()).equal(IMPROVING_ACCESSIBILITY.HEADING);
      });
    });

    it('renders an description', () => {
      improvingAccessibility.description().invoke('text').then((text) => {
        expect(text.trim()).equal(IMPROVING_ACCESSIBILITY.DESCRIPTION);
      });
    });
  });

  describe('preperation of statement', () => {
    it('renders a heading', () => {
      preperationOfStatement.heading().invoke('text').then((text) => {
        expect(text.trim()).equal(PREPERATION_OF_STATEMENT.HEADING);
      });
    });

    it('renders a list', () => {
      preperationOfStatement.listItem1().invoke('text').then((text) => {
        expect(text.trim()).equal(PREPERATION_OF_STATEMENT.LIST[0]);
      });

      preperationOfStatement.listItem2().invoke('text').then((text) => {
        expect(text.trim()).equal(PREPERATION_OF_STATEMENT.LIST[1]);
      });
    });
  });
});
