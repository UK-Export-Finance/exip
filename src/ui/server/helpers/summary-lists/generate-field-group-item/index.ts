import getKeyText from '../get-key-text';
import { SummaryListItemData } from '../../../../types';

type FieldSummary = {
  TITLE: string;
};

type TheField = {
  id: string;
  title?: string;
  SUMMARY?: FieldSummary;
};

type TempObjectType = {
  field: TheField;
  data: object;
  renderChangeLink?: boolean;
  href?: string;
};

const getSummaryListItemDataValue = (data: object, fieldId: string, customValue?: string): string => {
  if (customValue) {
    return customValue;
  }

  if (data[fieldId]) {
    if (data[fieldId].text) {
      return data[fieldId].text;
    }

    return data[fieldId];
  }

  return '-';
};

const generateSummaryListItemData = (obj: TempObjectType, customValue?: string): SummaryListItemData => {
  const { field, data } = obj;

  const mapped = {
    id: field.id,
    title: getKeyText(field),
  } as SummaryListItemData;

  if (customValue) {
    mapped.value = getSummaryListItemDataValue(data, field.id, customValue);
  } else {
    mapped.value = getSummaryListItemDataValue(data, field.id);
  }

  if (obj.href && obj.renderChangeLink) {
    mapped.renderChangeLink = obj.renderChangeLink;
    mapped.href = obj.href;
  }

  return mapped;
};

export default generateSummaryListItemData;
