import {
  ApplicationBroker,
  ApplicationBusiness,
  ApplicationCompany,
  ApplicationExportContract,
  ApplicationNominatedLossPayee,
  ApplicationPolicy,
  ApplicationPolicyContact,
} from './application';
import { Country } from './country';
import { Currency } from './currency';

interface SummaryListCardTitle {
  text: string;
}

interface SummaryListCard {
  title: SummaryListCardTitle;
}

type SummaryListItemDataFieldSummary = {
  TITLE: string;
};

type SummaryListItemDataInputField = {
  id: string;
  title?: string;
  SUMMARY?: SummaryListItemDataFieldSummary;
};

type SummaryListItemDataInput = {
  data?: object;
  field: SummaryListItemDataInputField;
  href?: string;
  renderChangeLink?: boolean;
  renderAddLink?: boolean;
  title?: string;
  value?: string;
};

type SummaryListItemData = {
  id: string;
  href?: string;
  renderChangeLink?: boolean;
  renderAddLink?: boolean;
  title?: string;
  value?: string;
};

type SummaryListItemKey = {
  text: string;
  classes: string;
};

type SummaryListItemValue = {
  text: string;
  classes: string;
};

type SummaryListItemActionsItemAttributes = {
  'data-cy': string;
};

type SummaryListItemActionsItem = {
  attributes?: SummaryListItemActionsItemAttributes;
  classes?: string;
  href?: string;
  text?: string;
  visuallyHiddenText?: string;
};

type SummaryListItemActions = {
  items: Array<SummaryListItemActionsItem>;
};

interface SummaryListItem {
  actions: SummaryListItemActions;
  classes?: string;
  key: SummaryListItemKey;
  value: SummaryListItemValue;
}

type SummaryListGroupData = {
  title: string;
  fields: Array<SummaryListItemData>;
};

interface SummaryListGroup {
  card: SummaryListCard;
  rows: Array<SummaryListItem>;
}

interface SummaryListParamsCore {
  referenceNumber: number;
  checkAndChange?: boolean;
}

interface SummaryListParamsBusiness extends SummaryListParamsCore {
  company: ApplicationCompany;
  business: ApplicationBusiness;
}

interface SummaryListParamsExportContract extends SummaryListParamsCore {
  exportContract: ApplicationExportContract;
  totalContractValueOverThreshold: boolean;
  countries: Array<Country>;
  currencies: Array<Currency>;
}

interface SummaryListParamsPolicy extends SummaryListParamsCore {
  policy: ApplicationPolicy;
  policyContact: ApplicationPolicyContact;
  broker: ApplicationBroker;
  nominatedLossPayee: ApplicationNominatedLossPayee;
  currencies: Array<Currency>;
  countries: Array<Country>;
}

export {
  SummaryListItem,
  SummaryListItemActions,
  SummaryListItemActionsItemAttributes,
  SummaryListItemActionsItem,
  SummaryListItemData,
  SummaryListItemDataInput,
  SummaryListItemDataInputField,
  SummaryListItemDataFieldSummary,
  SummaryListItemKey,
  SummaryListItemValue,
  SummaryListGroup,
  SummaryListGroupData,
  SummaryListParamsBusiness,
  SummaryListParamsExportContract,
  SummaryListParamsPolicy,
};
