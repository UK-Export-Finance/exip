// import generateValidationErrors from '../../../../../helpers/validation';
import { RequestBody, ValidationErrors } from '../../../../../../types';
// import { yourBuyerFiledVariables } from '../../../../../content-strings/fields/insurance/your-buyer';
// import { yourBuyerErrorVariables } from '../../../../../content-strings/error-messages/your-buyer';
import combineValidationRules from '../../../../../helpers/combine-validation-rules';
import validationRules from './rules';
// export const yourBuyerDetailsValidation = (responseBody: RequestBody) => {
//   const { countryName } = responseBody;
//   const YOUR_BUYER_PAGE_VARIABLE = yourBuyerFiledVariables;
//   const YOUR_BUYER_ERROR_VARIABLES = yourBuyerErrorVariables;
//   let updatedErrors;
//   if (!countryName) {
//     updatedErrors = generateValidationErrors(YOUR_BUYER_PAGE_VARIABLE.FIELDS.BUYER_COUNTRY.ID, YOUR_BUYER_ERROR_VARIABLES.COUNTRY_SELECT_ERROR_MESSAGE);
//   }
//   return updatedErrors;
// };

const yourBuyerDetailsValidation = (formBody: RequestBody): ValidationErrors => combineValidationRules(validationRules, formBody);

export default yourBuyerDetailsValidation;
