import organisationNameRules from './organisation-name';
import addressRules from './address';
import countryRules from './country';
import websiteRule from './website';
import { ValidationErrors } from '../../../../../../types';

const rules = [organisationNameRules, addressRules, countryRules, websiteRule] as Array<() => ValidationErrors>;

export default rules;
