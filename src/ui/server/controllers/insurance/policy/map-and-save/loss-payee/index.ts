import hasFormData from '../../../../../helpers/has-form-data';
import mapSubmittedData from '../../map-submitted-data/loss-payee';
import saveLossPayee from '../../save-data/nominated-loss-payee';
import shouldNullifyLossPayeeFinancialUkData from '../../../../../helpers/should-nullify-loss-payee-financial-uk-data';
import shouldNullifyLossPayeeFinancialInternationalData from '../../../../../helpers/should-nullify-loss-payee-financial-international-data';
import nullifyLossPayeeFinancialUkData from '../../../../../helpers/nullify-loss-payee-financial-uk-data';
import nullifyLossPayeeFinancialinternationalData from '../../../../../helpers/nullify-loss-payee-financial-international-data';
import saveUk from '../../save-data/loss-payee-financial-details-uk';
import saveInternational from '../../save-data/loss-payee-financial-details-international';
import { Application, RequestBody, ValidationErrors } from '../../../../../../types';

/**
 * mapAndSave nominatedLossPayee
 * Map and save any valid nominatedLossPayee fields
 * @param {RequestBody} formBody: Form body
 * @param {Application}
 * @param {Object} Validation errors
 * @returns {Boolean}
 */
const lossPayee = async (formBody: RequestBody, application: Application, validationErrors?: ValidationErrors) => {
  try {
    if (hasFormData(formBody)) {
      console.info('Mapping and saving application - policy - loss payee');

      const { isAppointed, location } = formBody;

      const populatedData = mapSubmittedData(formBody);

      let saveResponse;

      if (validationErrors) {
        saveResponse = await saveLossPayee.nominatedLossPayee(application, populatedData, validationErrors.errorList);
      } else {
        saveResponse = await saveLossPayee.nominatedLossPayee(application, populatedData);
      }

      if (!saveResponse) {
        return false;
      }

      const { nominatedLossPayee } = application;

      /**
       * If LOSS_PAYEE_FINANCIAL_UK data should be nullified,
       * Nullify and save the data.
       */
      if (shouldNullifyLossPayeeFinancialUkData(isAppointed, location, nominatedLossPayee)) {
        console.info('Mapping and saving application - policy - loss payee - nullifying financial UK data');

        const nullifiedData = nullifyLossPayeeFinancialUkData();

        saveResponse = await saveUk.lossPayeeFinancialDetailsUk(application, nullifiedData);

        if (!saveResponse) {
          return false;
        }
      }

      /**
       * If LOSS_PAYEE_FINANCIAL_INTERNATIONAL data should be nullified,
       * Nullify and save the data.
       */
      if (shouldNullifyLossPayeeFinancialInternationalData(isAppointed, location, nominatedLossPayee)) {
        console.info('Mapping and saving application - policy - loss payee - nullifying financial international data');

        const nullifiedData = nullifyLossPayeeFinancialinternationalData();

        saveResponse = await saveInternational.lossPayeeFinancialDetailsInternational(application, nullifiedData);

        if (!saveResponse) {
          return false;
        }
      }

      return true;
    }

    return true;
  } catch (err) {
    console.error('Error mapping and saving application - policy - loss payee %O', err);

    return false;
  }
};

export default {
  lossPayee,
};
