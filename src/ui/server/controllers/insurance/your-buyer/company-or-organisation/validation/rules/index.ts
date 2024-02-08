import organisationNameRules from './organisation-name';
import addressRules from './address';
import websiteRule from './website';

import { ValidationErrors } from '../../../../../../../types';

const rules = [organisationNameRules, addressRules, websiteRule] as Array<() => ValidationErrors>;

export default rules;
