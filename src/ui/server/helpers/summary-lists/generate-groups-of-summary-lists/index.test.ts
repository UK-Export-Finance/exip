import generateGroupsOfSummaryLists from '.';
import generateSummaryListRows from '../generate-summary-list-rows';

describe('server/helpers/summary-lists/generate-groups-of-summary-lists', () => {
  const mockGroupsData = [
    {
      title: 'Group A',
      fields: [{ id: 'field0' }, { id: 'field1' }],
    },
  ];

  it('returns an array of groups mapped to with a card object and rows via generateSummaryListRows', () => {
    const result = generateGroupsOfSummaryLists(mockGroupsData);

    const expected = mockGroupsData.map((group) => ({
      card: {
        title: {
          text: group.title,
        },
      },
      rows: generateSummaryListRows(group.fields),
    }));

    expect(result).toEqual(expected);
  });
});
