import { ukGoodsOrServicesDescription } from '../../../partials';
import { UK_GOODS_AND_SERVICES_DESCRIPTION } from '../../../content-strings';

const CONTENT_STRINGS = UK_GOODS_AND_SERVICES_DESCRIPTION;

const checkDescriptionSummaryText = () => {
  cy.checkText(ukGoodsOrServicesDescription.summary(), CONTENT_STRINGS.INTRO);

  ukGoodsOrServicesDescription.details().should('not.have.attr', 'open');
};

const checkDescriptionSummaryClickRevealsContent = () => {
  ukGoodsOrServicesDescription.summary().click();
  ukGoodsOrServicesDescription.details().should('have.attr', 'open');

  ukGoodsOrServicesDescription.includes.intro().should('be.visible');
};

const checkDescriptionContentSections = {
  includes: () => {
    cy.checkText(ukGoodsOrServicesDescription.includes.intro(), CONTENT_STRINGS.INCLUDES.INTRO);

    cy.checkText(ukGoodsOrServicesDescription.includes.listItem1(), CONTENT_STRINGS.INCLUDES.PRODUCTS);

    cy.checkText(ukGoodsOrServicesDescription.includes.listItem2(), CONTENT_STRINGS.INCLUDES.MANUFACTURED_1);
    cy.checkText(ukGoodsOrServicesDescription.includes.listItem3(), CONTENT_STRINGS.INCLUDES.MANUFACTURED_2);

    const expectedStaffingCostText = `${CONTENT_STRINGS.INCLUDES.STAFFING_COSTS.LINK.TEXT} ${CONTENT_STRINGS.INCLUDES.STAFFING_COSTS.TEXT}`;
    cy.checkText(ukGoodsOrServicesDescription.includes.listItem4(), expectedStaffingCostText);

    cy.checkLink(
      ukGoodsOrServicesDescription.includes.listItem4Link(),
      CONTENT_STRINGS.INCLUDES.STAFFING_COSTS.LINK.HREF,
      CONTENT_STRINGS.INCLUDES.STAFFING_COSTS.LINK.TEXT,
    );

    const expectedPhysicalAssetsText = `${CONTENT_STRINGS.INCLUDES.NON_PHYSICAL_ASSETS.LINK.TEXT} ${CONTENT_STRINGS.INCLUDES.NON_PHYSICAL_ASSETS.TEXT}`;
    cy.checkText(ukGoodsOrServicesDescription.includes.listItem5(), expectedPhysicalAssetsText);

    cy.checkLink(
      ukGoodsOrServicesDescription.includes.listItem5Link(),
      CONTENT_STRINGS.INCLUDES.NON_PHYSICAL_ASSETS.LINK.HREF,
      CONTENT_STRINGS.INCLUDES.NON_PHYSICAL_ASSETS.LINK.TEXT,
    );

    cy.checkText(ukGoodsOrServicesDescription.includes.canCountAs(), CONTENT_STRINGS.INCLUDES.CAN_COUNT_AS);
  },
  doesNotCount: () => {
    cy.checkText(ukGoodsOrServicesDescription.doesNotCount.heading(), CONTENT_STRINGS.DOES_NOT_COUNT.HEADING);

    cy.checkText(ukGoodsOrServicesDescription.doesNotCount.copy(), CONTENT_STRINGS.DOES_NOT_COUNT.TEXT);
  },
  staffingCosts: () => {
    cy.checkText(ukGoodsOrServicesDescription.staffingCosts.heading(), CONTENT_STRINGS.STAFFING_COSTS.HEADING);

    cy.checkText(ukGoodsOrServicesDescription.staffingCosts.copy(), CONTENT_STRINGS.STAFFING_COSTS.TEXT);

    cy.checkText(ukGoodsOrServicesDescription.staffingCosts.listItem1(), CONTENT_STRINGS.STAFFING_COSTS.LIST[0].TEXT);

    cy.checkText(ukGoodsOrServicesDescription.staffingCosts.listItem2(), CONTENT_STRINGS.STAFFING_COSTS.LIST[1].TEXT);

    cy.checkText(ukGoodsOrServicesDescription.staffingCosts.listItem3(), CONTENT_STRINGS.STAFFING_COSTS.LIST[2].TEXT);
  },
  nonPhysicalAssets: () => {
    cy.checkText(ukGoodsOrServicesDescription.nonPhysicalAssets.heading(), CONTENT_STRINGS.NON_PHYSICAL_ASSETS.HEADING);

    cy.checkText(ukGoodsOrServicesDescription.nonPhysicalAssets.copy(), CONTENT_STRINGS.NON_PHYSICAL_ASSETS.TEXT);
  },
  notSure: () => {
    cy.checkText(ukGoodsOrServicesDescription.notSure.heading(), CONTENT_STRINGS.NOT_SURE.HEADING);

    const expected = `${CONTENT_STRINGS.NOT_SURE.BODY_1} ${CONTENT_STRINGS.NOT_SURE.LINK.TEXT} ${CONTENT_STRINGS.NOT_SURE.BODY_2}`;
    cy.checkText(ukGoodsOrServicesDescription.notSure.details(), expected);
  },
};

const checkDescriptionContent = () => {
  checkDescriptionContentSections.includes();
  checkDescriptionContentSections.doesNotCount();
  checkDescriptionContentSections.staffingCosts();
  checkDescriptionContentSections.nonPhysicalAssets();
  checkDescriptionContentSections.notSure();
};

export { checkDescriptionSummaryText, checkDescriptionSummaryClickRevealsContent, checkDescriptionContent };
