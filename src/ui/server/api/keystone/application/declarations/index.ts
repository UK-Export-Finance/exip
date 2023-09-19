import getLatestAntiBribery from './get-latest-anti-bribery';
import getLatestConfirmationAndAcknowledgement from './get-latest-confirmation-and-acknowledgement';
import getLatestHowDataWillBeUsed from './get-latest-how-data-will-be-used';
import update from './update';

/**
 * declarations
 * Various API calls for application declarations
 * @returns {Object} API calls
 */
const declarations = {
  getLatestAntiBribery,
  getLatestConfirmationAndAcknowledgement,
  getLatestHowDataWillBeUsed,
  update,
};

export default declarations;
