import { countryRules } from './country';
import { ValidationErrors } from '../../../../../../types';
import { organisationNameRules } from './organisation-name';
import { addressRules } from './address';

const rules = [countryRules, organisationNameRules, addressRules] as Array<() => ValidationErrors>;

export default rules;
