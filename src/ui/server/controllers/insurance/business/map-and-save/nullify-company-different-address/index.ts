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
      console.error('No save response received from saveAddress.companyDifferentTradingAddress %s', application.id);

      return false;
    }

    return saveResponse;
  } catch (error) {
    console.error('Error mapping and saving application - business - company details - nullifying different trading address data %o', error);

    return false;
  }
};

export default {
  companyDifferentTradingAddress,
};
