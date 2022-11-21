import partials from '../e2e/partials';
import { UK_GOODS_AND_SERVICES_DESCRIPTION } from '../../content-strings';

const CONTENT_STRINGS = UK_GOODS_AND_SERVICES_DESCRIPTION;

const checkDescriptionSummaryText = () => {
  partials.ukGoodsOrServicesDescription.summary().should('exist');

  partials.ukGoodsOrServicesDescription.summary().invoke('text').then((text) => {
    expect(text.trim()).equal(CONTENT_STRINGS.INTRO);
  });
};

const checkDescriptionSummaryClickRevealsContent = () => {
  partials.ukGoodsOrServicesDescription.summary().click();

  partials.ukGoodsOrServicesDescription.includes.intro().should('be.visible');
};

const checkDescriptionContentSections = {
  includes: () => {
    partials.ukGoodsOrServicesDescription.includes.intro().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.INCLUDES.INTRO);
    });

    partials.ukGoodsOrServicesDescription.includes.listItem1().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.INCLUDES.PRODUCTS);
    });

    partials.ukGoodsOrServicesDescription.includes.listItem2().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.INCLUDES.MANUFACTURED);
    });

    partials.ukGoodsOrServicesDescription.includes.listItem3().invoke('text').then((text) => {
      const expected = `${CONTENT_STRINGS.INCLUDES.STAFFING_COSTS.LINK.TEXT} ${CONTENT_STRINGS.INCLUDES.STAFFING_COSTS.TEXT}`;
      expect(text.trim()).equal(expected);
    });

    partials.ukGoodsOrServicesDescription.includes.listItem3Link().should('have.attr', 'href', CONTENT_STRINGS.INCLUDES.STAFFING_COSTS.LINK.HREF);

    partials.ukGoodsOrServicesDescription.includes.listItem4().invoke('text').then((text) => {
      const expected = `${CONTENT_STRINGS.INCLUDES.NON_PHYSICAL_ASSETS.LINK.TEXT} ${CONTENT_STRINGS.INCLUDES.NON_PHYSICAL_ASSETS.TEXT}`;
      expect(text.trim()).equal(expected);
    });

    partials.ukGoodsOrServicesDescription.includes.listItem4Link().should('have.attr', 'href', CONTENT_STRINGS.INCLUDES.NON_PHYSICAL_ASSETS.LINK.HREF);

    partials.ukGoodsOrServicesDescription.includes.canCountAs().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.INCLUDES.CAN_COUNT_AS);
    });
  },
  doesNotCount: () => {
    partials.ukGoodsOrServicesDescription.doesNotCount.heading().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.DOES_NOT_COUNT.HEADING);
    });

    partials.ukGoodsOrServicesDescription.doesNotCount.copy().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.DOES_NOT_COUNT.TEXT);
    });
  },
  staffingCosts: () => {
    partials.ukGoodsOrServicesDescription.staffingCosts.heading().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.STAFFING_COSTS.HEADING);
    });

    partials.ukGoodsOrServicesDescription.staffingCosts.copy().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.STAFFING_COSTS.TEXT);
    });

    partials.ukGoodsOrServicesDescription.staffingCosts.listItem1().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.STAFFING_COSTS.LIST[0].TEXT);
    });

    partials.ukGoodsOrServicesDescription.staffingCosts.listItem2().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.STAFFING_COSTS.LIST[1].TEXT);
    });

    partials.ukGoodsOrServicesDescription.staffingCosts.listItem3().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.STAFFING_COSTS.LIST[2].TEXT);
    });
  },
  nonPhysicalAssets: () => {
    partials.ukGoodsOrServicesDescription.nonPhysicalAssets.heading().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.NON_PHYSICAL_ASSETS.HEADING);
    });

    partials.ukGoodsOrServicesDescription.nonPhysicalAssets.copy().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.NON_PHYSICAL_ASSETS.TEXT);
    });
  },
  notSure: () => {
    partials.ukGoodsOrServicesDescription.notSure.heading().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.NOT_SURE.HEADING);
    });

    partials.ukGoodsOrServicesDescription.notSure.details().invoke('text').then((text) => {
      const expected = `${CONTENT_STRINGS.NOT_SURE.BODY_1} ${CONTENT_STRINGS.NOT_SURE.LINK.TEXT} ${CONTENT_STRINGS.NOT_SURE.BODY_2}`;

      expect(text.trim()).equal(expected);
    });
  },
};

const checkDescriptionContent = () => {
  checkDescriptionContentSections.includes();
  checkDescriptionContentSections.doesNotCount();
  checkDescriptionContentSections.staffingCosts();
  checkDescriptionContentSections.nonPhysicalAssets();
  checkDescriptionContentSections.notSure();
};

export {
  checkDescriptionSummaryText,
  checkDescriptionSummaryClickRevealsContent,
  checkDescriptionContent,
};
