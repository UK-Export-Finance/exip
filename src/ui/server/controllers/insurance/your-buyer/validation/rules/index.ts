import organisationNameRules from './organisation-name';
import addressRules from './address';
import countryRules from './country';
import { ValidationErrors } from '../../../../../../types';

const rules = [organisationNameRules, addressRules, countryRules] as Array<() => ValidationErrors>;

export default rules;
