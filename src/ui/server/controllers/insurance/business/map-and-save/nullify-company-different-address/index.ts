import nullifyCompanyDifferentTradingAddress from '../../../../../helpers/nullify-company-different-trading-address-data';
import saveAddress from '../../save-data/company-different-trading-address';
import { Application } from '../../../../../../types';

/**
 * companyDifferentTradingAddress
 * Nullify Company "different trading address" data.
 * @param {Application} application
 * @returns {Promise<boolean>}
 */
const companyDifferentTradingAddress = async (application: Application) => {
  try {
    console.info('Mapping and saving application - business - company details - nullifying different trading address data');

    const nullifiedData = nullifyCompanyDifferentTradingAddress();

    const saveResponse = await saveAddress.companyDifferentTradingAddress(application, nullifiedData);

    if (!saveResponse) {
      return false;
    }
  } catch (err) {
    console.error('Error mapping and saving application - business - company details - nullifying different trading address data %O', err);

    return false;
  }
};

export default {
  companyDifferentTradingAddress,
};
