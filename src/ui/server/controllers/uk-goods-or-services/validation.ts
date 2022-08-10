import { FIELD_IDS } from '../../constants';
import { ERROR_MESSAGES } from '../../content-strings';
import generateValidationErrors from '../../helpers/validation';
import {
  objectHasValues,
  objectHasProperty,
} from '../../helpers/object';
import { RequestBody } from "../../../types";

const validation = (formBody: RequestBody) => {
  let errors;

  const hasErrors = (!objectHasValues(formBody)
    || !objectHasProperty(formBody, FIELD_IDS.HAS_MINIMUM_UK_GOODS_OR_SERVICES));

  if (hasErrors) {
    errors = generateValidationErrors(
      FIELD_IDS.HAS_MINIMUM_UK_GOODS_OR_SERVICES,
      ERROR_MESSAGES[FIELD_IDS.HAS_MINIMUM_UK_GOODS_OR_SERVICES].IS_EMPTY,
    );

    return errors;
  }

  return null;
};

export default validation;
