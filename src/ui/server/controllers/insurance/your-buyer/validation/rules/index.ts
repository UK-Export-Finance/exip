import organisationNameRules from './organisation-name';
import addressRules from './address';
import countryRules from './country';
import websiteRule from './website';
import firstNameRule from './first-name';
import lastNameRule from './last-name';
import { ValidationErrors } from '../../../../../../types';

const rules = [organisationNameRules, addressRules, countryRules, websiteRule, firstNameRule, lastNameRule] as Array<() => ValidationErrors>;

export default rules;
