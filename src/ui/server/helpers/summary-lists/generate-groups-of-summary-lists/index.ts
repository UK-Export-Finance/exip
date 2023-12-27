import generateSummaryListRows from '../generate-summary-list-rows';
import { SummaryListGroupData, SummaryListGroup } from '../../../../types';

/**
 * generateGroupsOfSummaryLists
 * Map an array of groups with titles and fields for multiple govukSummaryList components
 * @param {Array} Array of groups with titles and fields
 * @returns {Array} Array of groups with titles and fields/answers, in data structure for govukSummaryList
 */
const generateGroupsOfSummaryLists = (groupsData: Array<SummaryListGroupData>): Array<SummaryListGroup> => {
  const mappedGroups = groupsData.map((group) => ({
    card: {
      title: {
        text: group.title,
      },
    },
    rows: generateSummaryListRows(group.fields),
  })) as Array<SummaryListGroup>;

  return mappedGroups;
};

export default generateGroupsOfSummaryLists;
