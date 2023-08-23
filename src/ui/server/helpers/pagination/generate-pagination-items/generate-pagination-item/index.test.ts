import generatePaginationItem from '.';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';

const { DASHBOARD_PAGE } = INSURANCE_ROUTES;

describe('server/helpers/pagination/generate-pagination-items/generate-pagination-item', () => {
  it('should return an object', () => {
    const mockNumber = 3;
    const mockCurrent = true;

    const result = generatePaginationItem({
      number: mockNumber,
      current: mockCurrent,
    });

    const expected = {
      number: mockNumber,
      current: mockCurrent,
      href: `${DASHBOARD_PAGE}/${mockNumber}`,
    };

    expect(result).toEqual(expected);
  });

  describe('when ellipsis is true', () => {
    it('should return an object with just ellipsis', () => {
      const result = generatePaginationItem({ ellipsis: true });

      const expected = {
        ellipsis: true,
      };

      expect(result).toEqual(expected);
    });
  });
});
