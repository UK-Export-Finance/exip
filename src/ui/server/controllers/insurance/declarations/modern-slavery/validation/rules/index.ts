import willAdhereToAllRequirementsRule from './will-adhere-to-all-requirements';
import cannotAdhereToAllRequirementsRules from './conditional-reasons/cannot-adhere-to-all-requirements';
import hasNoOffensesOrInvestigationsRule from './has-no-offenses-or-investigations';
import offensesOrInvestigationsRules from './conditional-reasons/offenses-or-investigations';
import isNotAwareOfExistingSlavery from './is-not-aware-of-existing-slavery';
import awareOfExistingSlaveryRules from './conditional-reasons/aware-of-existing-slavery';
import { ValidationErrors } from '../../../../../../../types';

const rules = [
  willAdhereToAllRequirementsRule,
  cannotAdhereToAllRequirementsRules,
  hasNoOffensesOrInvestigationsRule,
  offensesOrInvestigationsRules,
  isNotAwareOfExistingSlavery,
  awareOfExistingSlaveryRules,
];

const validationRules = rules as Array<() => ValidationErrors>;

export default validationRules;
