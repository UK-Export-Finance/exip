import { ukGoodsOrServicesDescription } from '../e2e/partials';
import { UK_GOODS_AND_SERVICES_DESCRIPTION, PAGES } from '../../content-strings';

const CONTENT_STRINGS  = UK_GOODS_AND_SERVICES_DESCRIPTION;

const checkSummaryText = () => {
  ukGoodsOrServicesDescription.summary().should('exist');

  ukGoodsOrServicesDescription.summary().invoke('text').then((text) => {
    expect(text.trim()).equal(CONTENT_STRINGS.INTRO);
  });
};

const checkSummaryClickRevealsContent = () => {
  ukGoodsOrServicesDescription.summary().click();

  ukGoodsOrServicesDescription.includes.intro().should('be.visible');
};

const checkDescriptionContentSections = {
  includes: () => {
    ukGoodsOrServicesDescription.includes.intro().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.INCLUDES.INTRO);
    });

    ukGoodsOrServicesDescription.includes.listItem1().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.INCLUDES.PRODUCTS);
    });

    ukGoodsOrServicesDescription.includes.listItem2().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.INCLUDES.MANUFACTURED);
    });

    ukGoodsOrServicesDescription.includes.listItem3().invoke('text').then((text) => {
      const expected = `${CONTENT_STRINGS.INCLUDES.STAFFING_COSTS.LINK.TEXT} ${CONTENT_STRINGS.INCLUDES.STAFFING_COSTS.TEXT}`;
      expect(text.trim()).equal(expected);
    });

    ukGoodsOrServicesDescription.includes.listItem3Link().should('have.attr', 'href', CONTENT_STRINGS.INCLUDES.STAFFING_COSTS.LINK.HREF);

    ukGoodsOrServicesDescription.includes.listItem4().invoke('text').then((text) => {
      const expected = `${CONTENT_STRINGS.INCLUDES.NON_PHYSICAL_ASSETS.LINK.TEXT} ${CONTENT_STRINGS.INCLUDES.NON_PHYSICAL_ASSETS.TEXT}`;
      expect(text.trim()).equal(expected);
    });

    ukGoodsOrServicesDescription.includes.listItem4Link().should('have.attr', 'href', CONTENT_STRINGS.INCLUDES.NON_PHYSICAL_ASSETS.LINK.HREF);

    ukGoodsOrServicesDescription.includes.canCountAs().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.INCLUDES.CAN_COUNT_AS);
    });
  },
  doesNotCount: () => {
    ukGoodsOrServicesDescription.doesNotCount.heading().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.DOES_NOT_COUNT.HEADING);
    });

    ukGoodsOrServicesDescription.doesNotCount.copy().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.DOES_NOT_COUNT.TEXT);
    });
  },
  staffingCosts: () => {
    ukGoodsOrServicesDescription.staffingCosts.heading().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.STAFFING_COSTS.HEADING);
    });

    ukGoodsOrServicesDescription.staffingCosts.copy().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.STAFFING_COSTS.TEXT);
    });

    ukGoodsOrServicesDescription.staffingCosts.listItem1().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.STAFFING_COSTS.LIST[0].TEXT);
    });

    ukGoodsOrServicesDescription.staffingCosts.listItem2().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.STAFFING_COSTS.LIST[1].TEXT);
    });

    ukGoodsOrServicesDescription.staffingCosts.listItem3().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.STAFFING_COSTS.LIST[2].TEXT);
    });
  },
  nonPhysicalAssets: () => {
    ukGoodsOrServicesDescription.nonPhysicalAssets.heading().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.NON_PHYSICAL_ASSETS.HEADING);
    });

    ukGoodsOrServicesDescription.nonPhysicalAssets.copy().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.NON_PHYSICAL_ASSETS.TEXT);
    });
  },
  notSure: () => {
    ukGoodsOrServicesDescription.notSure.heading().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.NOT_SURE.HEADING);
    });

    ukGoodsOrServicesDescription.notSure.details().invoke('text').then((text) => {
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

module.exports = {
  checkSummaryText,
  checkSummaryClickRevealsContent,
  checkDescriptionContent,
};
