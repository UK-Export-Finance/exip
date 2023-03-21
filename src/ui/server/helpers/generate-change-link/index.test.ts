import generateChangeLink from '.';
import { ROUTES } from '../../constants';

const { INSURANCE_ROOT } = ROUTES.INSURANCE;

describe('server/helpers/generate-change-link', () => {
  const referenceNumber = 123;
  const rootUrl = `${INSURANCE_ROOT}/${referenceNumber}`;
  const route = '/test';
  const routeCheckAndChange = '/test-check-and-change';
  const anchorTag = '#field-label';

  describe('when checkAndChange is set to true', () => {
    it('should return a url with the check and change link returned', () => {
      const checkAndChange = true;

      const response = generateChangeLink(route, routeCheckAndChange, anchorTag, referenceNumber, checkAndChange);

      const expected = `${rootUrl}${routeCheckAndChange}${anchorTag}`;

      expect(response).toEqual(expected);
    });
  });

  describe('when checkAndChange is set to false', () => {
    it('should return a url with the original route link returned', () => {
      const checkAndChange = false;

      const response = generateChangeLink(route, routeCheckAndChange, anchorTag, referenceNumber, checkAndChange);

      const expected = `${rootUrl}${route}${anchorTag}`;

      expect(response).toEqual(expected);
    });
  });
});
