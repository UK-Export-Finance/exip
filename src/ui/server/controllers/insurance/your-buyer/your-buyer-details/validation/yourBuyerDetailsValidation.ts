import generateValidationErrors from '../../../../../helpers/validation';
import { RequestBody } from '../../../../../../types';
import { yourBuyerPageVariables } from '../../../../../content-strings/fields/insurance/your-buyer';

export const yourBuyerDetailsValidation = (responseBody: RequestBody) => {
  const { countryName } = responseBody;
  const YOUR_BUYER_PAGE_VARIABLE = yourBuyerPageVariables;
  let updatedErrors;
  if (!countryName) {
    updatedErrors = generateValidationErrors(YOUR_BUYER_PAGE_VARIABLE.FIELDS.BUYER_COUNTRY.ID, YOUR_BUYER_PAGE_VARIABLE.FIELDS.BUYER_COUNTRY.ERROR_MESSAGE);
  }
  return updatedErrors;
};
