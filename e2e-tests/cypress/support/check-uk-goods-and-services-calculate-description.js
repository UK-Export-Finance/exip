import { ukGoodsOrServicesCalculateDescription } from '../e2e/partials';
import { UK_GOODS_AND_SERVICES_CALCULATE_DESCRIPTION, PAGES } from '../../content-strings';

const CONTENT_STRINGS = UK_GOODS_AND_SERVICES_CALCULATE_DESCRIPTION;

const checkSummaryText = () => {
  ukGoodsOrServicesCalculateDescription.summary().should('exist');

  ukGoodsOrServicesCalculateDescription.summary().invoke('text').then((text) => {
    expect(text.trim()).equal(CONTENT_STRINGS.INTRO);
  });
};

const checkSummaryClickRevealsContent = () => {
  ukGoodsOrServicesCalculateDescription.summary().click();

  ukGoodsOrServicesCalculateDescription.list.intro().should('be.visible');
};

const checkDescriptionContentIntro = () => {
  ukGoodsOrServicesCalculateDescription.list.intro().invoke('text').then((text) => {
    expect(text.trim()).equal(CONTENT_STRINGS.LIST_INTRO);
  });
};

const checkDescriptionContentListItems = () => {
  ukGoodsOrServicesCalculateDescription.list.item1().invoke('text').then((text) => {
    expect(text.trim()).equal(CONTENT_STRINGS.LIST[0].TEXT);
  });

  ukGoodsOrServicesCalculateDescription.list.item2().invoke('text').then((text) => {
    expect(text.trim()).equal(CONTENT_STRINGS.LIST[1].TEXT);
  });

  ukGoodsOrServicesCalculateDescription.list.item2ChildList.item1().invoke('text').then((text) => {
    expect(text.trim()).equal(CONTENT_STRINGS.LIST[1].CHILD_LIST[0].TEXT);
  });

  ukGoodsOrServicesCalculateDescription.list.item2ChildList.item2().invoke('text').then((text) => {
    expect(text.trim()).equal(CONTENT_STRINGS.LIST[1].CHILD_LIST[1].TEXT);
  });

  ukGoodsOrServicesCalculateDescription.list.item3().invoke('text').then((text) => {
    expect(text.trim()).equal(CONTENT_STRINGS.LIST[2].TEXT);
  });

  ukGoodsOrServicesCalculateDescription.list.item4().invoke('text').then((text) => {
    expect(text.trim()).equal(CONTENT_STRINGS.LIST[3].TEXT);
  });
};

const checkDescriptionContent = () => {
  checkDescriptionContentIntro();
  checkDescriptionContentListItems();
};

module.exports = {
  checkSummaryText,
  checkSummaryClickRevealsContent,
  checkDescriptionContent,
};
