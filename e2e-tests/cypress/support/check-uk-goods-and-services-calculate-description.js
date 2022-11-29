import partials from '../e2e/partials';
import { UK_GOODS_AND_SERVICES_CALCULATE_DESCRIPTION } from '../../content-strings';

const CONTENT_STRINGS = UK_GOODS_AND_SERVICES_CALCULATE_DESCRIPTION;

const checkCalculateDescriptionSummaryText = () => {
  partials.ukGoodsOrServicesCalculateDescription.summary().should('exist');

  partials.ukGoodsOrServicesCalculateDescription.summary().invoke('text').then((text) => {
    expect(text.trim()).equal(CONTENT_STRINGS.INTRO);
  });
};

const checkCalculateDescriptionSummaryClickRevealsContent = () => {
  partials.ukGoodsOrServicesCalculateDescription.summary().click();

  partials.ukGoodsOrServicesCalculateDescription.list.intro().should('be.visible');
};

const checkDescriptionContentIntro = () => {
  partials.ukGoodsOrServicesCalculateDescription.list.intro().invoke('text').then((text) => {
    expect(text.trim()).equal(CONTENT_STRINGS.LIST_INTRO);
  });
};

const checkDescriptionContentListItems = () => {
  partials.ukGoodsOrServicesCalculateDescription.list.item1().invoke('text').then((text) => {
    expect(text.trim()).equal(CONTENT_STRINGS.LIST[0].TEXT);
  });

  partials.ukGoodsOrServicesCalculateDescription.list.item2().invoke('text').then((text) => {
    expect(text.trim()).equal(CONTENT_STRINGS.LIST[1].TEXT);
  });

  partials.ukGoodsOrServicesCalculateDescription.list.item2ChildList.item1().invoke('text').then((text) => {
    expect(text.trim()).equal(CONTENT_STRINGS.LIST[1].CHILD_LIST[0].TEXT);
  });

  partials.ukGoodsOrServicesCalculateDescription.list.item2ChildList.item2().invoke('text').then((text) => {
    expect(text.trim()).equal(CONTENT_STRINGS.LIST[1].CHILD_LIST[1].TEXT);
  });

  partials.ukGoodsOrServicesCalculateDescription.list.item3().invoke('text').then((text) => {
    expect(text.trim()).equal(CONTENT_STRINGS.LIST[2].TEXT);
  });

  partials.ukGoodsOrServicesCalculateDescription.list.item4().invoke('text').then((text) => {
    expect(text.trim()).equal(CONTENT_STRINGS.LIST[3].TEXT);
  });
};

const checkCalculateDescriptionDescriptionContent = () => {
  checkDescriptionContentIntro();
  checkDescriptionContentListItems();
};

export {
  checkCalculateDescriptionSummaryText,
  checkCalculateDescriptionSummaryClickRevealsContent,
  checkCalculateDescriptionDescriptionContent,
};
