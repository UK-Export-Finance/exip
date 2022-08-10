import { FIELDS, LINKS, PAGES } from '../../content-strings';
import { FIELD_IDS, ROUTES } from '../../constants';
import { AnswersContent, AnswersFieldGroups, SummaryListItem, SummaryListItemData } from '../../../types';

const {
  BUYER_COUNTRY,
  CONTRACT_VALUE,
  CREDIT_PERIOD,
  MAX_AMOUNT_OWED,
  MULTI_POLICY_LENGTH,
  MULTI_POLICY_TYPE,
  PERCENTAGE_OF_COVER,
  SINGLE_POLICY_TYPE,
  SINGLE_POLICY_LENGTH,
  HAS_MINIMUM_UK_GOODS_OR_SERVICES,
  VALID_COMPANY_BASE,
} = FIELD_IDS;

/*
 * generateFieldGroups
 * Create all field groups for govukSummaryList
 * The following fields depend on the submitted answers and design ordering requirements:
 * - Tried private cover (must have the correct yes/no input ID)
 * - Policy type depending on the Policy type (must have single/multi input ID)
 * - Policy length depending on the Policy type (must have single/multi input ID)
 * - Contract value or Max contract value depending on the Policy type
 * - Credit period if Policy type is multi
 */
const generateFieldGroups = (answers: AnswersContent) => {
  const fieldGroups = {
    EXPORT_DETAILS: [],
    POLICY_DETAILS: [],
  } as AnswersFieldGroups;

  fieldGroups.EXPORT_DETAILS = [
    {
      id: BUYER_COUNTRY,
      ...FIELDS[BUYER_COUNTRY],
      href: `${ROUTES.BUYER_COUNTRY_CHANGE}#heading`,
      value: {
        text: answers[BUYER_COUNTRY].text,
      },
    },
    {
      id: VALID_COMPANY_BASE,
      ...FIELDS[VALID_COMPANY_BASE],
      href: `${ROUTES.COMPANY_BASED_CHANGE}#heading`,
      value: {
        text: answers[VALID_COMPANY_BASE].text,
      },
    },
    {
      id: HAS_MINIMUM_UK_GOODS_OR_SERVICES,
      ...FIELDS[HAS_MINIMUM_UK_GOODS_OR_SERVICES],
      href: `${ROUTES.HAS_MINIMUM_UK_GOODS_OR_SERVICES_CHANGE}#heading`,
      value: {
        text: answers[HAS_MINIMUM_UK_GOODS_OR_SERVICES].text,
      },
    },
  ];

  if (answers[SINGLE_POLICY_TYPE]) {
    fieldGroups.POLICY_DETAILS = [
      {
        id: SINGLE_POLICY_TYPE,
        ...FIELDS[SINGLE_POLICY_TYPE],
        href: `${ROUTES.POLICY_TYPE_CHANGE}#heading`,
        value: {
          text: answers[SINGLE_POLICY_TYPE].text,
        },
      },
      {
        id: SINGLE_POLICY_LENGTH,
        ...FIELDS[SINGLE_POLICY_LENGTH],
        href: `${ROUTES.POLICY_TYPE_CHANGE}#${SINGLE_POLICY_LENGTH}-label`,
        value: {
          text: answers[SINGLE_POLICY_LENGTH].text,
        },
      },
      {
        id: CONTRACT_VALUE,
        ...FIELDS[CONTRACT_VALUE],
        href: `${ROUTES.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${CONTRACT_VALUE}-label`,
        value: {
          text: answers[CONTRACT_VALUE].text,
        },
      },
      {
        id: PERCENTAGE_OF_COVER,
        ...FIELDS[PERCENTAGE_OF_COVER],
        href: `${ROUTES.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${PERCENTAGE_OF_COVER}-label`,
        value: {
          text: answers[PERCENTAGE_OF_COVER].text,
        },
      },
    ];
  }

  if (answers[MULTI_POLICY_TYPE]) {
    fieldGroups.POLICY_DETAILS = [
      {
        id: MULTI_POLICY_TYPE,
        ...FIELDS[MULTI_POLICY_TYPE],
        href: `${ROUTES.POLICY_TYPE_CHANGE}#heading`,
        value: {
          text: answers[MULTI_POLICY_TYPE].text,
        },
      },
      {
        id: MULTI_POLICY_LENGTH,
        ...FIELDS[MULTI_POLICY_LENGTH],
        href: `${ROUTES.POLICY_TYPE_CHANGE}#${MULTI_POLICY_LENGTH}-label`,
        value: {
          text: answers[MULTI_POLICY_LENGTH].text,
        },
      },
      {
        id: MAX_AMOUNT_OWED,
        ...FIELDS[MAX_AMOUNT_OWED],
        href: `${ROUTES.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${MAX_AMOUNT_OWED}-label`,
        value: {
          text: answers[MAX_AMOUNT_OWED].text,
        },
      },
      {
        id: PERCENTAGE_OF_COVER,
        ...FIELDS[PERCENTAGE_OF_COVER],
        href: `${ROUTES.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${PERCENTAGE_OF_COVER}-label`,
        value: {
          text: answers[PERCENTAGE_OF_COVER].text,
        },
      },
      {
        id: CREDIT_PERIOD,
        ...FIELDS[CREDIT_PERIOD],
        href: `${ROUTES.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${CREDIT_PERIOD}-label`,
        value: {
          text: answers[CREDIT_PERIOD].text,
        },
      },
    ];
  }

  return fieldGroups;
};

/*
 * getKeyText
 * Get the summary text to display in a key
 * for govukSummaryList component
 */
const getKeyText = (fieldId: string) => FIELDS[fieldId]?.SUMMARY?.TITLE;

/*
 * generateSummaryListRows
 * Map an array of fields with values in submitted data object
 * for govukSummaryList component
 */
const generateSummaryListRows = (fields: Array<SummaryListItemData>): Array<SummaryListItem> =>
  fields.map(
    (field: SummaryListItemData): SummaryListItem =>
      ({
        key: {
          text: getKeyText(field.id),
          classes: `${field.id}-key`,
        },
        value: {
          text: field.value.text,
          classes: `${field.id}-value`,
        },
        actions: {
          items: [
            {
              href: field.href,
              text: LINKS.CHANGE,
              visuallyHiddenText: getKeyText(field.id),
              attributes: {
                'data-cy': `${field.id}-change-link`,
              },
            },
          ],
        },
      } as SummaryListItem),
  );

/*
 * answersSummaryList
 * Create multiple summary lists
 */
const answersSummaryList = (answersContent: AnswersContent) => {
  const fieldGroups = generateFieldGroups(answersContent);

  const summaryList = {
    EXPORT: {
      GROUP_TITLE: PAGES.CHECK_YOUR_ANSWERS_PAGE.GROUP_HEADING_EXPORT,
      ROWS: generateSummaryListRows(fieldGroups.EXPORT_DETAILS),
    },
    POLICY: {
      GROUP_TITLE: PAGES.CHECK_YOUR_ANSWERS_PAGE.GROUP_HEADING_POLICY,
      ROWS: generateSummaryListRows(fieldGroups.POLICY_DETAILS),
    },
  };

  return summaryList;
};

export { generateFieldGroups, getKeyText, generateSummaryListRows, answersSummaryList };
