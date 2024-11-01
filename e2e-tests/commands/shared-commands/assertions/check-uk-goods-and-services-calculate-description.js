import { ukGoodsOrServicesCalculateDescription } from '../../../partials';
import { UK_GOODS_AND_SERVICES_CALCULATE_DESCRIPTION } from '../../../content-strings';

const CONTENT_STRINGS = UK_GOODS_AND_SERVICES_CALCULATE_DESCRIPTION;

const checkCalculateDescriptionSummaryText = () => {
  cy.checkText(ukGoodsOrServicesCalculateDescription.summary(), CONTENT_STRINGS.INTRO);

  ukGoodsOrServicesCalculateDescription.details().should('not.have.attr', 'open');
};

const checkCalculateDescriptionSummaryClickRevealsContent = () => {
  ukGoodsOrServicesCalculateDescription.summary().click();
  ukGoodsOrServicesCalculateDescription.details().should('have.attr', 'open');
};

const checkDescriptionContentListItems = () => {
  cy.checkText(ukGoodsOrServicesCalculateDescription.list.item1(), CONTENT_STRINGS.LIST[0].TEXT);

  cy.checkText(ukGoodsOrServicesCalculateDescription.list.item2(), CONTENT_STRINGS.LIST[1].TEXT);

  cy.checkText(ukGoodsOrServicesCalculateDescription.list.item2ChildList.item1(), CONTENT_STRINGS.LIST[1].CHILD_LIST[0].TEXT);

  cy.checkText(ukGoodsOrServicesCalculateDescription.list.item2ChildList.item2(), CONTENT_STRINGS.LIST[1].CHILD_LIST[1].TEXT);

  cy.checkText(ukGoodsOrServicesCalculateDescription.list.item3(), CONTENT_STRINGS.LIST[2].TEXT);

  cy.checkText(ukGoodsOrServicesCalculateDescription.list.item4(), CONTENT_STRINGS.LIST[3].TEXT);
};

const checkCalculateDescriptionDescriptionContent = () => {
  checkDescriptionContentListItems();
};

export { checkCalculateDescriptionSummaryText, checkCalculateDescriptionSummaryClickRevealsContent, checkCalculateDescriptionDescriptionContent };
