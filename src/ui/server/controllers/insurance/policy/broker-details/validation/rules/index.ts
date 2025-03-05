import nameRules from './name';
import emailRules from './email';
import isBasedInUkRules from './is-based-in-uk';
import postcodeRules from './postcode';
import buildingNumberOrNameRules from './building-number-or-name';
import { ValidationErrors } from '../../../../../../../types';

const rules = [nameRules, emailRules, isBasedInUkRules, postcodeRules, buildingNumberOrNameRules];

const validationRules = rules as Array<() => ValidationErrors>;

export default validationRules;
