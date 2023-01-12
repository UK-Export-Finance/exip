import { countryRules } from './country';
import { ValidationErrors } from '../../../../../../types';
import { organisationNameRules } from './organisation-name';

const rules = [countryRules, organisationNameRules] as Array<() => ValidationErrors>;

export default rules;
