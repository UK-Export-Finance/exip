type SummaryListItemData = {
  id: string;
  href?: string;
  renderChangeLink?: boolean;
  title?: string;
  value?: string;
};

interface SummaryListField {
  text: string;
}

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

export {
  SummaryListField,
  SummaryListItem,
  SummaryListItemActions,
  SummaryListItemActionsItemAttributes,
  SummaryListItemActionsItem,
  SummaryListItemData,
  SummaryListItemKey,
  SummaryListItemValue,
};
