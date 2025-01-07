import mapNbiIssueAvailable from '.';
import { EXTERNAL_API_DEFINITIONS } from '../../../../constants';

const { CIS } = EXTERNAL_API_DEFINITIONS;

describe('helpers/map-cis-countries/map-cis-country/map-NBI-issue-available', () => {
  describe(`when the NBI issue field is ${CIS.NBI_ISSUE_AVAILABLE.YES}`, () => {
    it('should return true', () => {
      const result = mapNbiIssueAvailable(CIS.NBI_ISSUE_AVAILABLE.YES);

      expect(result).toEqual(true);
    });
  });

  it('should return false', () => {
    const result = mapNbiIssueAvailable(CIS.NBI_ISSUE_AVAILABLE.NO);

    expect(result).toEqual(false);
  });
});
