import hasFormData from '../../../../../helpers/has-form-data';
import mapSubmittedData from '../../map-submitted-data/company-details';
import saveCompany from '../../save-data/company-details';
import shouldNullifyCompanyDifferentAddress from '../../../../../helpers/should-nullify-company-different-address';
import nullify from '../nullify-company-different-address';
import { Application, RequestBody, ValidationErrors } from '../../../../../../types';

/**
 * map company details data and calls save functions.
 * If DIFFERENT_TRADING_ADDRESS data should be nullified, nullify and save the data.
 * @param {RequestBody} formBody
 * @param {Object} application
 * @param {Object} validationErrors
 * @returns {Boolean}
 */
const companyDetails = async (formBody: RequestBody, application: Application, validationErrors?: ValidationErrors) => {
  try {
    if (hasFormData(formBody)) {
      console.info('Mapping and saving application - business - company details');

      const populatedData = mapSubmittedData(formBody);

      let saveResponse;

      /**
       * If validation errors, save the data with only valid data.
       * Otherwise, simply save all data.
       */

      if (validationErrors) {
        saveResponse = await saveCompany.companyDetails(application, populatedData, validationErrors.errorList);
      } else {
        saveResponse = await saveCompany.companyDetails(application, populatedData);
      }

      if (!saveResponse) {
        return false;
      }

      /**
       * If DIFFERENT_TRADING_ADDRESS data should be nullified,
       * Nullify and save the data.
       */
      const { hasDifferentTradingAddress } = formBody;

      const {
        company: {
          differentTradingAddress: { fullAddress },
        },
      } = application;

      if (shouldNullifyCompanyDifferentAddress(hasDifferentTradingAddress, fullAddress)) {
        saveResponse = await nullify.companyDifferentTradingAddress(application);

        if (!saveResponse) {
          return false;
        }
      }

      return true;
    }

    return true;
  } catch (error) {
    console.error('Error mapping and saving business - company details section of application %o', error);

    return false;
  }
};

export default { companyDetails };
