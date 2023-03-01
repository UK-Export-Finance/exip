import organisationNameRules from './organisation-name';
import addressRules from './address';
import countryRules from './country';
import websiteRule from './website';
import firstNameRule from './first-name';
import lastNameRule from './last-name';
import positionRule from './position';
import emailRules from './email';
import canContactBuyerRule from './can-contact-buyer';
import { ValidationErrors } from '../../../../../../types';

const rules = [
  organisationNameRules,
  addressRules,
  countryRules,
  websiteRule,
  firstNameRule,
  lastNameRule,
  positionRule,
  emailRules,
  canContactBuyerRule,
] as Array<() => ValidationErrors>;

export default rules;
