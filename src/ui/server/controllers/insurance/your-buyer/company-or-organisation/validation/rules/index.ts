import organisationNameRules from './organisation-name';
import addressRules from './address';
import registrationNumberRule from './registration-number';
import websiteRule from './website';

import { ValidationErrors } from '../../../../../../../types';

const rules = [organisationNameRules, addressRules, registrationNumberRule, websiteRule] as Array<() => ValidationErrors>;

export default rules;
