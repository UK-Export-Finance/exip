import { startNowLink } from '../../pages/shared';

/**
 * startYourBusinessSection
 * Start the "your business" section of an application.
 * 1) Click the "your business" task list item.
 * 2) Click the "start now" link in the "your business" start page.
 * @param {boolean} viaTaskList: Start the "your business" section from the task list.
 */
const startYourBusinessSection = ({ viaTaskList = true }) => {
  if (viaTaskList) {
    cy.clickTaskBusiness();
  }

  startNowLink().click();
};

export default startYourBusinessSection;
